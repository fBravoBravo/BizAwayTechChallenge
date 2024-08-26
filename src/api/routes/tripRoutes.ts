import fastify from "fastify";
import { exploreTripsHandler } from "../handlers/exploreTrips.js";
import { listTripsHandler } from "../handlers/listTripsHandler.js";
import { deleteTripHandler } from "../handlers/deleteTripHandler.js";
import { createTripHandler } from "../handlers/createTripHandler.js";




export async function tripRoutes (fastify: fastify.FastifyInstance){
  //explore trips
  fastify.get('/exploreTrips', exploreTripsHandler);
   //list all trips
  fastify.get('/listTrips',listTripsHandler);
  // delete a trip
  fastify.delete('/:tripId', deleteTripHandler);
  //TODO add an update trip endpoint
  // create a trip
  fastify.post('/create', createTripHandler);
}