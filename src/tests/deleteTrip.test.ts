import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { deleteTripsAPICall } from './utils/APIcalls.js';
import { insertTestTripInDB } from './utils/databaseCalls.js';

describe.sequential("deleteTrip end-point", () => {
    test('Trip is deleted', async () => {
      const tripId = await insertTestTripInDB();
      const data = await deleteTripsAPICall(tripId);
      expect(data).toHaveProperty(['message']);
    });

    test('Error if no tripId is passed', async () => {
      const data = await deleteTripsAPICall();
      console.log(JSON.stringify(data));
      expect(data).toHaveProperty(['error']);
    });
})