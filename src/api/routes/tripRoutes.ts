import fastify from "fastify";
import { exploreTripsHandler } from "../handlers/exploreTrips.js";
import { listTripsHandler } from "../handlers/listTripsHandler.js";
import { deleteTripHandler } from "../handlers/deleteTripHandler.js";
import { createTripHandler } from "../handlers/createTripHandler.js";


export async function tripRoutes (fastify: fastify.FastifyInstance){
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

  fastify.get('/listTrips',listTripsHandler);
  /**
   * @swagger
   * /exploreTrips:
   *   delete:
   *     description: Get all trips
   *     responses:
   *       200:
   *         description: Success
   */
  fastify.delete('/:tripId', deleteTripHandler);
  /**
   * @swagger
   * /exploreTrips:
   *   get:
   *     description: Get all trips
   *     responses:
   *       200:
   *         description: Success
   */
  fastify.post('/create', createTripHandler);
}