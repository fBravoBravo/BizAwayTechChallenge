import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";
import { Trip } from "../types.js";

export  async function listTripsHandler(request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  //TODO Error handling for this endpoint.
    const timeStart = performance.now();
    const db = initializeDbConnection();
    const { tripIds } = request.query as { tripIds: string[] };


    // If the query parameter tripIds is present, we will return only the trips with the ids provided.
    if (tripIds) {
      const rows = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM trip WHERE id IN (?)', [tripIds], (err, rows) => {
          if (err) {
            reject(err);
          }
          console.log(`Rows: ${rows.length}`);
          resolve(rows);
        });
      });
      db.close();
      reply.code(200).send(rows);
      return;
    }

    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM trip', [], (err, rows) => {
      if (err) {
        reject(err);
      }
      console.log(`Rows: ${rows.length}`);
      resolve(rows as Trip[]);
    });
    }) as Trip[];

    const timeEnd = performance.now();

    const jsonResponse = {
      elapsedTime: `${Math.round(timeEnd - timeStart)} ms`,
      numberOfResults: rows.length,
      trips: rows
    }

    db.close();
    reply.code(200).send(jsonResponse);
  }