import * as fastify from 'fastify';
import { tripRoutes } from './tripRoutes.js';
import { authenticationRoutes } from './authenticationRoutes.js';


export async function routes (fastify: fastify.FastifyInstance) {
  fastify.register(tripRoutes, { prefix: '/trips' }); 
  //TODO delete this if authentication is not implemented.
  fastify.register(authenticationRoutes, { prefix: '/authentication' });
}









