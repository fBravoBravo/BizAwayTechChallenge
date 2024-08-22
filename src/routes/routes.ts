import * as fastify from 'fastify';
import { fetchTrip } from '../helpers/tripsCall.js';
import { Trip } from '../types.js';
import { processRequest } from '../helpers/requestProcessor.js';


const allowedIATAcodes  = [
    "ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW",
    "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO",
    "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO",
    "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM",
    "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"
];

export async function routes (fastify: fastify.FastifyInstance, options: fastify.FastifyPluginOptions) {
  fastify.get('/exploreDestination', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
    const timeStart = performance.now();

    //TODO guard to check if the params are present.
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

    if (!allowedIATAcodes.includes(origin) || !allowedIATAcodes.includes(destination)) {
      //TODO expand this with further information about the errors in the IATA codes.
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
  })
}


