import fastify from "fastify";
import { initializeDbConnection } from "../../database/datbaseConnector.js";

export async function deleteTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
  try{
    const { tripId } = request.params as { tripId: string };

    console.log(tripId);
    //TODO validate somehow the trip id is a valid uuid.
    if (!tripId || tripId.length < 10) {
      reply.code(400).send({
        error: "Please provide a valid tripId."
      });

      return;
    }

    console.log("outside the no tripid guard")

    //TODO handle not found ids in trips.

    const db = initializeDbConnection();

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