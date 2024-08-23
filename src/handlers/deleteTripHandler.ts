import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";

export async function deleteTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const { tripId } = request.params as { tripId: string };

    if (!tripId) {
      reply.code(400).send({
        error: "Please provide a valid tripId."
      });
    }

    const db = initializeDbConnection();

    await new Promise((_, reject) => {
      db.run('DELETE FROM trip WHERE id = ?', [tripId], (err) => {
        if (err) {
          reject(err);
        }
      });
    });

    db.close();

    reply.code(200).send({
      message: `Trip with id ${tripId} has been deleted.`
    });
  }