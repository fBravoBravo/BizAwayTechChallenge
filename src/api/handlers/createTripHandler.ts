import fastify from "fastify";
import { initializeDbConnection } from "../../database/datbaseConnector.js";
import { Trip } from "../../types.js";
import { randomUUID } from "crypto";

/**
 * Create a new trip
 * @param {fastify.FastifyRequest} request - The request object
 * @param {fastify.FastifyReply} reply - The reply object
 */
export async function createTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  try {
    const { origin, destination, cost, duration, type, display_name } = request.body as Trip;

    const timeStart = performance.now();

    console.log(JSON.stringify(request.body));

    if (!origin || !destination || !cost || !duration || !type || !display_name) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
    }

    const db = initializeDbConnection();

    const uuid = randomUUID();

    await new Promise((resolve, reject) => {
      db.run('INSERT INTO trip (ID, origin, destination, cost, duration, type, display_name) VALUES (?, ?, ?, ?, ?, ?, ?)', [uuid, origin, destination, cost, duration, type, display_name], (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });

    db.close();

    const timeEnd = performance.now();

    const jsonResponse = {
      elapsedTime: `${Math.round(timeEnd - timeStart)} ms`,
      message: "Trip has been created."
    }

    reply.code(201).send(jsonResponse);
    } catch (error) {
      console.error(error);
      reply.code(500).send({
            error: "Internal error while processing the data. Try again in a few minutes."
          });
      return;
    }
  }