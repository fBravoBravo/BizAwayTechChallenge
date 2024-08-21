

import * as fastify from 'fastify';
import { processRequest } from '../helpers/requestProcessor';

export async function routes (fastify: fastify.FastifyInstance, options: fastify.FastifyPluginOptions) {
  fastify.get('/exploreDestination', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
    const timeStart = performance.now();
    const {origin, destination, sort_by} = request.params as { origin: string, destination: string, sort_by: "fastest" | "cheapest" };

    const response = await (processRequest(origin, destination, sort_by));

    const timeEnd = performance.now();

    const jsonResponse = {
      elapsedTime: timeEnd - timeStart,
      tripData: {
        origin,
        destination,
        sort_by
      }
    }

    reply.code(200).send(jsonResponse);
    
  })
}