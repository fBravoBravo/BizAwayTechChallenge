import { describe } from 'node:test';
import { test, expect } from 'vitest';
import { exploreTripsAPICall } from './utils/APIcalls.js';

describe("exploreTrips end-point", () => {
    test('Response contains correct properties', async () => {
      const data = await exploreTripsAPICall('MAD', 'JFK', 'fastest');
      expect(data).toHaveProperty(['elapsedTime', 'numberOfResults', 'tripData']);
    });
    
    test('Sort by cheapest is ordered correctly', async () => {
      const data = await exploreTripsAPICall('MAD', 'JFK', 'cheapest');
      const { tripData } = data;

      expect(tripData[0].cost).toBeLessThan(tripData[tripData.length - 1].cost);
    }); 

    test('Sort by fastest is ordered correctly', async () => {
      const data = await exploreTripsAPICall('MAD', 'JFK', 'fastest');
      const { tripData } = data;

      expect(tripData[0].duration).toBeLessThan(tripData[tripData.length - 1].duration);
    });
    
    test('Error if query parameters are missing', async () => {
        const options = {
        method: 'GET',
      }
      // Sending request with no parameters
      const result = await fetch(`http://localhost:3000/tripExplorer`, options);
      const data = await result.json();

      expect(data).toHaveProperty(['error']);
    });
  
    test('Error if correct parameters are passed but they are not allowed', async () => {
      // Sending request with AGP as destination (AGP is not in the allowed list of IATA codes).
      const data = await exploreTripsAPICall('MAD', 'AGP', 'fastest');
      expect(data).toHaveProperty(['error']);
    }); 
})