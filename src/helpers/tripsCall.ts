import { Trip } from "../types.js";

/**
 * Fetch trip data from the API
 * @param {string} origin - Origin of the trip
 * @param {string} destination - Destination of the trip
 * @returns {Promise<Trip[]>} - List of trips
 */
export async function fetchTrip (origin: string, destination: string): Promise<Trip[]> {
 const options = {
    method: 'GET',
    headers: {
        'x-api-key': 'API_KEY',
        'Content-Type': 'application/json',
    },
    }
  const response = await fetch(`https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips?origin=${origin}&destination=${destination}`, options);
  const trip = await response.json() as Trip[];
  return trip;
}