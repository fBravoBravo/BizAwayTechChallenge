import * as fastify from 'fastify';
import { tripRoutes } from './tripRoutes.js';


export async function routes (fastify: fastify.FastifyInstance) {
  /**
   * @swagger
   * /exploreTrips:
   *   get:
   *     description: Get all trips
   *     responses:
   *       200:
   *         summary: testing
   *         description: Success
   *       400:
   *        description: Bad request
   */
  fastify.register(tripRoutes, { prefix: '/trips' }); 
}









