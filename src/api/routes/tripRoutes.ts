import fastify from 'fastify';
import { exploreTripsHandler } from '../handlers/exploreTrips.js';
import { listTripsHandler } from '../handlers/listTripsHandler.js';
import { deleteTripHandler } from '../handlers/deleteTripHandler.js';
import { createTripHandler } from '../handlers/createTripHandler.js';

export async function tripRoutes(fastify: fastify.FastifyInstance) {
  fastify.get(
    '/exploreTrips',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            origin: { type: 'string' },
            destiny: { type: 'string' },
            sort_by: { type: 'string'},
          },
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
        params: {
          type: 'object',
          properties: {
            tripIds: { type: 'string' },
          },
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
  fastify.delete(
    '/:tripId',
    {
      schema: {
        tags: ['Trips'],
        description:
          'Given a trip id, it deletes the trip from the database',
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string', description: "Trip with id ${tripId} has been deleted." },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Provide a valid trip id' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Trip id not found in database' },
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
    deleteTripHandler,
  );
  fastify.post('/create', {
      schema: {
        tags: ['Trips'],
        description:
          'Creates a new trip entry in the database',
        response: {
          201: {
            type: 'object',
            properties: {
              elapsedTime: { type: 'string', description: 'Time taken to create the trip' },
              message: { type: 'string', description: "Trip has been created." },
            },
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Please provide all the required parameters.' },
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
    },createTripHandler);
}
