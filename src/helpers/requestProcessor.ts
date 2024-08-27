import { cache } from "../constants.js";
import { Trip } from "../types.js";
import { fetchTrip } from "./tripsCall.js";

export async function processRequest (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    // Call API for data about the trip.
    let tripData;
    const returnObject: {
        error: boolean,
        tripData?: Trip[];
    } = {
        error: false
    }
    const cacheKey = `${origin}-${destination}-${sort_by}`;
    const cachedData = cache.cache.get(cacheKey);

    if (cachedData) {
        tripData = cachedData as Trip[];
    }else{
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