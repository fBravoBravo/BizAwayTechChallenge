import fastify from "fastify";
import { processRequest } from "../../helpers/requestProcessor.js";
import { fetchIATAcodesFromDB } from "../../helpers/fetchIATAcodesFromDB.js";


export async function exploreTripsHandler(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const timeStart = performance.now();

    const {origin, destination, sort_by} = request.query as { origin: string, destination: string, sort_by: "fastest" | "cheapest" };

    console.log(origin, destination, sort_by);

    if (!origin || !destination || !sort_by) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
    }

    if (sort_by !== "fastest" && sort_by !== "cheapest") {
      reply.code(400).send({
        error: "Please provide a valid value for sort_by."
      });
    }

    const allowedIATAcodes = await fetchIATAcodesFromDB();

    if (!allowedIATAcodes.includes(origin) || !allowedIATAcodes.includes(destination)) {
      reply.code(400).send({
        error: "Please provide valid IATA codes for origin and destination."
      });
    }
    
    const trips = await (processRequest(origin, destination, sort_by));  
      if (trips.error) {
          reply.code(500).send({
            error: "Internal error while processing the data. Try again in a few minutes."
          });
      }

    const timeEnd = performance.now();

    const jsonResponse = {
      elapsedTime: `${Math.round(timeEnd - timeStart)} ms`,
      numberOfResults: trips.tripData? trips.tripData.length : 0,
      tripData: {
        sort_by,
        trips: trips.tripData
      }
    }

    reply.code(200).send(jsonResponse);
  }