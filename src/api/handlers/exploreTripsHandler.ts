import fastify from "fastify";
import { fetchIATAcodesFromDB } from "../../helpers/fetchIATAcodesFromDB.js";
import { Trip } from "../../types.js";
import { cache } from "../../constants.js";
import { fetchTrip } from "../../helpers/tripsCall.js";

/**
 * Explore trips
 * @param {fastify.FastifyRequest} request - The request object
 * @param {fastify.FastifyReply} reply - The reply object
 */

export async function exploreTripsHandler(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const timeStart = performance.now();

    const {origin, destination, sort_by} = request.query as { origin: string, destination: string, sort_by: "fastest" | "cheapest" };

    console.log(origin, destination, sort_by);

    if (!origin || !destination || !sort_by) {
      let missingParams = [];
      if (!origin) missingParams.push("origin");
      if (!destination) missingParams.push("destination");
      if (!sort_by) missingParams.push("sort_by");

      reply.code(400).send({
        error: `Please provide all the required parameters. Missing parameters: ${missingParams.join(", ")}`
      });
    }

    if (sort_by !== "fastest" && sort_by !== "cheapest") {
      reply.code(400).send({
        error: "Please provide a valid value for sort_by."
      });
    }

    const allowedIATAcodes = await fetchIATAcodesFromDB();

    console.log(JSON.stringify(allowedIATAcodes));

    if (!allowedIATAcodes.includes(origin) || !allowedIATAcodes.includes(destination)) {
      reply.code(400).send({
        error: "Please provide valid IATA codes for origin and destination."
      });
    }
    
    const trips = await (exploreTripProcessor(origin, destination, sort_by));  
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



  /**
 * Process the request for the trip
 * @param {string} origin - Origin of the trip
 * @param {string} destination - Destination of the trip
 * @param {string} sort_by - Sort the trip by fastest or cheapest
 * @returns {Promise<{error: boolean, tripData?: Trip[]}>} - Returns an object with error status and trip data
 */
async function exploreTripProcessor (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    // Call API for data about the trip.
    let tripData;
    const returnObject: {
        error: boolean,
        tripData?: Trip[];
    } = {
        error: false
    }
    const cacheKey = `${origin}-${destination}`;
    const cachedData = cache.cache.get(cacheKey);

    if (cachedData) {
        console.log("Data is cached");
        tripData = cachedData as Trip[];
    }else{
        console.log("Data is not cached, making call to fetch it");
        try {
        tripData = await fetchTrip(origin, destination);
        // If the data is not cached, cache it for 1 minute.
        cache.set(cacheKey, tripData, 60000);
        } catch (error) {
            console.error(error);
            returnObject.error = true;
            return returnObject;
        }
    }

    if (sort_by === "fastest") {
      tripData.sort((a, b) => { return a.duration - b.duration });
    }

    if (sort_by === "cheapest") {
      tripData.sort((a, b) => {return a.cost - b.cost});
    }

    returnObject.tripData = tripData;
    
    return returnObject;
}