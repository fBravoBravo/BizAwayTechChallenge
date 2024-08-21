import { fetchTrip } from "./tripsCall";

export async function processRequest (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    // Call API for data about the trip.
    const tripData = await fetchTrip(origin, destination);

    if (sort_by === "fastest") {
      // Sort by fastest
      tripData.sort((a, b) => a.duration - b.duration);
      return tripData;
    }

    if (sort_by === "cheapest") {
      // Sort by cheapest
      tripData.sort((a, b) => a.cost - b.cost);
      return tripData;
    }
}