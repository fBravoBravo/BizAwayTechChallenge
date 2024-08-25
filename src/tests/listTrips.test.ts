import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { exploreTripsAPICall } from './utils/APIcalls.js';

describe("listTrips end-point", () => {
    test('Response contains correct properties', async () => {
      const data = await exploreTripsAPICall('MAD', 'JFK', 'fastest');
      expect(data).toHaveProperty(['elapsedTime', 'numberOfResults', 'tripData']);
    });
})