import fastify from "fastify";
import { initializeDbConnection } from "../../database/datbaseConnector.js";
import { Trip } from "../../types.js";


/**
 * List all trips
 * @param {fastify.FastifyRequest} request - The request object
 * @param {fastify.FastifyReply} reply - The reply object
 */
export  async function listTripsHandler(request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  try{
    const timeStart = performance.now();
    const db = initializeDbConnection();
    const { ids } = request.query as { ids: string };
    const tripIdsArray = ids?.split(',');


    // If the query parameter tripIds is present, we will return only the trips with the ids provided.
    if (ids) {
      const tripIdsQuery = tripIdsArray.map(id => `id = '${id}'`).join(' OR ');
      const rows = await new Promise((resolve, reject) => {

        db.all(`SELECT * FROM trip WHERE ${tripIdsQuery}`, [], (err, rows) => {
          if (err) {
            reject(err);
          }
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
      return;
    }

    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM trip', [], (err, rows) => {
      if (err) {
        reject(err);
      }
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
  }catch(err){
    console.error(err);
    reply.code(500).send({
      error: "Internal error while processing the data. Try again in a few minutes."
    });
  }
}