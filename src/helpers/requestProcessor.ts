import { Trip } from "../types";
import { fetchTrip } from "./tripsCall";

export async function processRequest (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    // Call API for data about the trip.
    let tripData;
    const returnObject: {
        error: boolean,
        tripData?: Trip[] | string;
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

    if (tripData.length === 0) {
        returnObject.tripData = "No trips found for the given origin and destination.";
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