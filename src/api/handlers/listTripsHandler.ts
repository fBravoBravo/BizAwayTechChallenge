import fastify from "fastify";
import { initializeDbConnection } from "../../database/datbaseConnector.js";
import { Trip } from "../../types.js";

export  async function listTripsHandler(request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
  try{
    const timeStart = performance.now();
    const db = initializeDbConnection();
    const { tripIds } = request.query as { tripIds: string };
    const tripIdsArray = tripIds?.split(',');

    console.log(`tripIds: ${tripIds}`);

    // If the query parameter tripIds is present, we will return only the trips with the ids provided.
    if (tripIds) {
      const tripIdsQuery = tripIdsArray.map(id => `id = '${id}'`).join(' OR ');
      console.log(`tripIdsQuery: ${tripIdsQuery}`);
      const rows = await new Promise((resolve, reject) => {

        db.all(`SELECT * FROM trip WHERE ${tripIdsQuery}`, [], (err, rows) => {
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
  }catch(err){
    console.error(err);
    reply.code(500).send({
      error: "Internal error while processing the data. Try again in a few minutes."
    });
  }
}