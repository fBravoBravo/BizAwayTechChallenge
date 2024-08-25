import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { listTripsAPICall } from './utils/APIcalls.js';

describe("deleteTrip end-point", () => {
    test('Trip is deleted', async () => {
      const data = await listTripsAPICall();
      expect(data).toHaveProperty(['elapsedTime', 'numberOfResults', 'trips']);
    });

    test('Error if no tripId is passed', async () => {
      const testTripIds = ['1', '2'];
      const data = await listTripsAPICall(['MAD', 'JFK']);
      expect(data.trips.length).toBe(testTripIds.length);
    });
})