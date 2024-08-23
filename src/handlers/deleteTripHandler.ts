import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";

export async function deleteTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
  try{
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
  }catch(err){
    console.error(err);
    reply.code(500).send({
      error: "Internal error while processing the data. Try again in a few minutes."
    });
  }
}