import fastify from "fastify";
import { initializeDbConnection } from "../database/datbaseConnector.js";

export async function createTripHandler (request: fastify.FastifyRequest, reply: fastify.FastifyReply)  {
    const { origin, destination, departureDate, returnDate, price } = request.body as { origin: string, destination: string, departureDate: string, returnDate: string, price: number };

    if (!origin || !destination || !departureDate || !returnDate || !price) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
    }

    const db = initializeDbConnection();

    await new Promise((_, reject) => {
      db.run('INSERT INTO trip (origin, destination, departureDate, returnDate, price) VALUES (?, ?, ?, ?, ?)', [origin, destination, departureDate, returnDate, price], (err) => {
        if (err) {
          reject(err);
        }
      });
    });

    db.close();

    reply.code(201).send({
      message: "Trip has been created."
    });
  }