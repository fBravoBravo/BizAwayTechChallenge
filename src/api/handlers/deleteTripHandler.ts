import fastify from "fastify";
import { initializeDbConnection } from "../../database/datbaseConnector.js";

export async function deleteTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
  try{
    const { tripId } = request.params as { tripId: string };

    if (!tripId) {
      reply.code(400).send({
        error: "Please provide a valid tripId."
      });

      return;
    }

    const uuidRegex = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
      );

    if (!uuidRegex.test(tripId)) {
      reply.code(400).send({
        error: "Please provide a valid tripId."
      });

      return;
    }

    const db = initializeDbConnection();

    const trip = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM trip WHERE id = ?', [tripId], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    if (!trip) {
      db.close();
      reply.code(404).send({
        error: `Trip with id ${tripId} not found.`
      });

      return;
    }

    await new Promise((resolve, reject) => {
      db.run('DELETE FROM trip WHERE id = ?', [tripId], (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });

    db.close();

    reply.code(200).send({
      message: `Trip with id ${tripId} has been deleted.`
    });
  }catch(err){
    console.error(err);
    reply.code(500).send({
      error: "Internal error while processing the data. Try again in a few minutes."
    });
  }
}