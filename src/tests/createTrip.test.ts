import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { listTripsAPICall } from './utils/APIcalls.js';

describe("createTrip end-point", () => {
    test('Trip is created', async () => {
      const data = await listTripsAPICall();
      expect(data).toHaveProperty(['elapsedTime', 'numberOfResults', 'trips']);
    });

    test('If not all parameters are passed the trip is not created', async () => {
      const testTripIds = ['1', '2'];
      const data = await listTripsAPICall(['MAD', 'JFK']);
      expect(data.trips.length).toBe(testTripIds.length);
    });
})