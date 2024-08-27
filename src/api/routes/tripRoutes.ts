import fastify from 'fastify';
import { exploreTripsHandler } from '../handlers/exploreTrips.js';
import { listTripsHandler } from '../handlers/listTripsHandler.js';
import { deleteTripHandler } from '../handlers/deleteTripHandler.js';
import { createTripHandler } from '../handlers/createTripHandler.js';

export async function tripRoutes(fastify: fastify.FastifyInstance) {
  //write swagger js docs for the route below
  /**
   * @swagger
   * /exploreTrips:
   *   get:
   *     description: Get all trips
   *     responses:
   *       200:
   *         description: Success
   */
  fastify.get('/exploreTrips', exploreTripsHandler);
  /**
   * @swagger
   * /exploreTrips:
   *   get:
   *     description: Get all trips
   *     responses:
   *       200:
   *         description: Success
   */

  fastify.get('/listTrips', listTripsHandler);
  /**
   * @swagger
   * /delete/{tripId}:
   *   delete:
   *     description: Deletes the trip with the given id
   *     responses:
   *       201:
   *         description: The trip with id as {tripId} has been deleted
   *         content: 
   *               application/json:
   *                 schema:
   *                 type: object
   *                 properties:
   *                  message:
    *                  type: string
    *                  example: Trip with id {tripId} has been deleted
    *      400:
   *         description: If no tripId is provided or if the tripId is not a valid uuid format
   *         content: 
   *               application/json:
   *                 schema:
   *                 type: object
   *                 properties:
   *                  error:
    *                  type: string
    *                  example: Please provide a valid tripId
    *      404:
    *        description: the trip id to delete can not be found in the database
   *         content: 
   *               application/json:
   *                 schema:
   *                 type: object
   *                 properties:
   *                  error:
    *                  type: string
    *                  example: Trip with id ${tripId} not found
    *     500:
    *       description: Internal server error
    *       content:
    *             application/json:
    *               schema:
    *               type: object
    *               properties:
    *               error:
    *               type: string
    *               example: Internal error while processing the data. Try again in a few minutes.
   */
  fastify.delete('/:tripId', deleteTripHandler);
  /**
 * @swagger
 * /create:
 *   post:
 *     description: Create a new trip
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *      400:
 *        description: Bad request
 *        content:
 *      500:
 *        description: Internal server error
 *        content:
 */
  fastify.post('/create', createTripHandler);
}
