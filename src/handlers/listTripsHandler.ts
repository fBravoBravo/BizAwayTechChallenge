import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";

export  async function listTripsHandler(_:any, reply: fastify.FastifyReply)  {
    // TODO remake this endpoint to return only one trip or all the trips if no parameter is provided
    const db = initializeDbConnection();
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM trip', [], (err, rows) => {
      if (err) {
        reject(err);
      }
      console.log(`Rows: ${rows.length}`);
      resolve(rows);
    });
    });

    db.close();
    reply.code(200).send(rows);
  }