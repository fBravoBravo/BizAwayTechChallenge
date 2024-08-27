import fastify from 'fastify';
import { exploreTripsHandler } from '../handlers/exploreTrips.js';
import { listTripsHandler } from '../handlers/listTripsHandler.js';
import { deleteTripHandler } from '../handlers/deleteTripHandler.js';
import { createTripHandler } from '../handlers/createTripHandler.js';
import { error } from 'console';

export async function tripRoutes(fastify: fastify.FastifyInstance) {
  fastify.get(
    '/exploreTrips',
    {
      schema: {
        querystring: {
          origin: { type: 'string', required: true },
          destination: { type: 'string',required: true },
          sort_by: { type: 'string', required: true },
        },
        tags: ['Trips'],
        description: 'Given an origin,destiny and how you want to sort the results, it returns all trips available for that itinerary',
        response: {
          200: {
            type: 'object',
            properties: {
              elapsedTime: { type: 'string' },
              numberOfResults: { type: 'number' },
              tripData: {
                type: 'object',
                properties: {
                  sort_by: { type: 'string' },
                  trips: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        origin: { type: 'string' },
                        destination: { type: 'string' },
                        cost: { type: 'number' },
                        duration: { type: 'number' },
                        type: { type: 'string' },
                        id: { type: 'string' },
                        display_name: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Bad Request' },
            },
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Internal Server Error' },
            },
          },
        },
      },
    },
    exploreTripsHandler,
  );
  fastify.get(
    '/listTrips',
    {
      schema: {
        querystring: {
          tripIds: { type: 'string', required: false },
        },
        tags: ['Trips'],
        description:
          'If no query parameter is provided, it returns all trips available. If the query parameter tripIds is present, it returns only the trips with the ids provided.',
        response: {
          200: {
            type: 'object',
            properties: {
              elapsedTime: { type: 'string' },
              numberOfResults: { type: 'number' },
              trips: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    origin: { type: 'string' },
                    destination: { type: 'string' },
                    cost: { type: 'number' },
                    duration: { type: 'number' },
                    type: { type: 'string' },
                    id: { type: 'string' },
                    display_name: { type: 'string' },
                  },
                },
              },
            },
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Internal Server Error' },
            },
          },
        },
      },
    },
    listTripsHandler,
  );
  fastify.delete('/:tripId', deleteTripHandler);
  fastify.post('/create', createTripHandler);
}
