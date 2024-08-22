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

    try {
        tripData = await fetchTrip(origin, destination);
        //TODO be careful with empty list of trips in the sort.
    } catch (error) {
        returnObject.error = true;
        return returnObject;
    }

    if (sort_by === "fastest") {
      tripData.sort((a, b) => a.duration - b.duration);
    }

    if (sort_by === "cheapest") {
      tripData.sort((a, b) => a.cost - b.cost);
    }

    returnObject.tripData = tripData;
    
    return returnObject;
}