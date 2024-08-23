import * as fastify from 'fastify';
import { tripRoutes } from './tripRoutes.js';
import { authenticationRoutes } from './authenticationRoutes.js';




export async function routes (fastify: fastify.FastifyInstance) {
  fastify.register(tripRoutes, { prefix: '/trips' });

  fastify.register(authenticationRoutes, { prefix: '/authentication' });

}









