import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { listTripsAPICall } from './utils/APIcalls.js';
import { deleteFromDB, getTripsFromDB, insertTestTripInDB } from './utils/databaseCalls.js';
import { Trip } from '../types.js';

describe("listTrips end-point", () => {
    test('Request with no parameters returns all trips', async () => {
      const databaseTrips = await getTripsFromDB() as Trip[];
      console.log(databaseTrips);
      const data = await listTripsAPICall();
      const { trips } = data;
      expect(trips.length).toBe(databaseTrips.length - 1);
    });

    test('Request with specific tripIds returns only those trips', async () => {
      const firstTripid = await insertTestTripInDB();
      const secondTripid = await insertTestTripInDB();
      console.log(`firstTripid: ${firstTripid}`);
      console.log(`secondTripid: ${secondTripid}`);
      const data = await listTripsAPICall([firstTripid, secondTripid]);

      console.log(JSON.stringify(data));
      const { trips } = data;

      console.log(`Trips: ${trips}`);
      expect(trips[0].id).toBe(firstTripid);
      expect(trips[1].id).toBe(secondTripid);

      deleteFromDB(firstTripid);
      deleteFromDB(secondTripid);
    });
})