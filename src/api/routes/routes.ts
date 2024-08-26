import * as fastify from 'fastify';
import { tripRoutes } from './tripRoutes.js';


export async function routes (fastify: fastify.FastifyInstance) {
  fastify.register(tripRoutes, { prefix: '/trips' }); 
}









