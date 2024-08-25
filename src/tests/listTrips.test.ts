import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { listTripsAPICall } from './utils/APIcalls.js';

describe("listTrips end-point", () => {
    test('Request with no parameters returns all trips', async () => {
      const data = await listTripsAPICall();
      expect(data).toHaveProperty(['elapsedTime', 'numberOfResults', 'trips']);
    });

    test('Request with specific tripIds returns only those trips', async () => {
      const testTripIds = ['1', '2'];
      const data = await listTripsAPICall(['MAD', 'JFK']);
      expect(data.trips.length).toBe(testTripIds.length);
    });
})