import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { listTripsAPICall } from './utils/APIcalls.js';
import { deleteFromDB, getTripsFromDB, insertTestTripInDB } from './utils/databaseCalls.js';

describe("listTrips end-point", () => {
    test('Request with no parameters returns all trips', async () => {
      const data = await listTripsAPICall();
      const { trips } = data;
      expect(trips.length).toBeGreaterThan(0);
    });

    test('Request with specific tripIds returns only those trips', async () => {
      const firstTripid = await insertTestTripInDB();
      const secondTripid = await insertTestTripInDB();
      const data = await listTripsAPICall([firstTripid, secondTripid]);
      
      console.log(JSON.stringify(data));
      const { trips } = data;

      expect(trips.length).toBe(2);

      deleteFromDB(firstTripid);
      deleteFromDB(secondTripid);
    });
})