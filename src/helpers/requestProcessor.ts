import { Trip } from "../types";
import { fetchTrip } from "./tripsCall";

export async function processRequest (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    // Call API for data about the trip.
    let tripData;
    const returnObject: {
        success: boolean,
        error?: "API" | "internal",
        tripData?: Trip[];
    } = {
        success: false,
        error: "internal"
    }

    try {
        tripData = await fetchTrip(origin, destination);
    } catch (error) {
        returnObject.error = "API";
        return returnObject;
    }

    if (sort_by === "fastest") {
      tripData.sort((a, b) => a.duration - b.duration);
    }

    if (sort_by === "cheapest") {
      tripData.sort((a, b) => a.cost - b.cost);
    }

    returnObject.success = true;
    returnObject.tripData = tripData;
    return returnObject;
}