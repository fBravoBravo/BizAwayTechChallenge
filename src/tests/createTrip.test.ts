import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { createTripsAPICall } from './utils/APIcalls.js';

describe.sequential("createTrip end-point", () => {
    test('Trip is created', async () => {
      const data = await createTripsAPICall('TEST', 'TEST', 100, 100, 'flight', 'test');
      const { message } = data;
      expect(message).toBe("Trip has been created.");
    });

    test('If not all parameters are passed the trip is not created', async () => {
      const data = await createTripsAPICall('TEST', 'TEST');
      console.log(JSON.stringify(data));
      expect(data).toHaveProperty(['error']);
    });
})