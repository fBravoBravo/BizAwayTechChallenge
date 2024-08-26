import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { createTripsAPICall } from './utils/APIcalls.js';

describe("createTrip end-point", () => {
    test('Trip is created', async () => {
      const data = await createTripsAPICall('MAD', 'AGP', 100, 100, 'flight', 'MAD to AGP');
      const { message } = data;
      expect(message).toBe("Trip has been created.");
    });

    test('If not all parameters are passed the trip is not created', async () => {
      const data = await createTripsAPICall('MAD', 'JFK');
      console.log(JSON.stringify(data));
      expect(data).toHaveProperty(['error']);
    });
})