import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";
import { Trip } from "../types.js";
import { Database } from "sqlite3";

export async function createTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  try {
    const { origin, destination, cost, duration, type, display_name } = request.body as Trip;

    const timeStart = performance.now();

    if (!origin || !destination || !cost || !duration || !type || !display_name) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
    }

    const db = initializeDbConnection();
    

    // check if already exits in database
    const tripExists = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM trip WHERE origin = ? AND destination = ? AND cost = ? AND duration = ? AND type = ? AND display_name = ?', [origin, destination, cost, duration, type, display_name], (err, row: string[]) => {
        if (err) {
          reject(err);
        }

        if (row.length === 0) {
          resolve(false);
        }

        resolve(true);
      });
    }) as boolean;


    // Guard to check if the trip already exists.
    if (tripExists) {
      db.close();
      const timeEnd = performance.now();
      const jsonResponse = {
      elapsedTime: `${Math.round(timeEnd - timeStart)} ms`,
      message: "Trip already exits."
    }

    reply.code(204).send(jsonResponse);
    }


    await new Promise((_, reject) => {
      db.run('INSERT INTO trip (origin, destination, cost, duration, type, display_name) VALUES (?, ?, ?, ?, ?, ?)', [origin, destination, cost, duration, type, display_name], (err) => {
        if (err) {
          reject(err);
        }
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