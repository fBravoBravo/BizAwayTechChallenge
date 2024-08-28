import { cache } from "../constants.js";
import { Trip } from "../types.js";
import { fetchTrip } from "./tripsCall.js";

/**
 * Process the request for the trip
 * @param {string} origin - Origin of the trip
 * @param {string} destination - Destination of the trip
 * @param {string} sort_by - Sort the trip by fastest or cheapest
 * @returns {Promise<{error: boolean, tripData?: Trip[]}>} - Returns an object with error status and trip data
 */
export async function processRequest (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
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