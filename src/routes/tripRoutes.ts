import fastify from "fastify";
import { processRequest } from "../helpers/requestProcessor.js";
import { initializeDbConnection } from "../database/datbaseConnector.js";


const allowedIATAcodes  = [
    "ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW",
    "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO",
    "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO",
    "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM",
    "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"
];

export async function tripRoutes (fastify: fastify.FastifyInstance){
  fastify.get('exploreTrips', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
    const timeStart = performance.now();

    //TODO guard to check if the params are present.
    const {origin, destination, sort_by} = request.query as { origin: string, destination: string, sort_by: "fastest" | "cheapest" };

    console.log(origin, destination, sort_by);

    if (!origin || !destination || !sort_by) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
    }

    if (sort_by !== "fastest" && sort_by !== "cheapest") {
      reply.code(400).send({
        error: "Please provide a valid value for sort_by."
      });
    }

    if (!allowedIATAcodes.includes(origin) || !allowedIATAcodes.includes(destination)) {
      //TODO expand this with further information about the errors in the IATA codes.
      reply.code(400).send({
        error: "Please provide valid IATA codes for origin and destination."
      });
    }
    
    const trips = await (processRequest(origin, destination, sort_by));  
      if (trips.error) {
          reply.code(500).send({
            error: "Internal error while processing the data. Try again in a few minutes."
          });
      }

    
  
    const timeEnd = performance.now();

    const jsonResponse = {
      elapsedTime: `${Math.round(timeEnd - timeStart)} ms`,
      numberOfResults: trips.tripData? trips.tripData.length : 0,
      tripData: {
        sort_by,
        trips: trips.tripData
      }
    }

    reply.code(200).send(jsonResponse);
  })


   //list all trips
  fastify.get('/listTrips', async (_, reply: fastify.FastifyReply) => {
    // TODO list all trips
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
  });
  // delete a trip
  fastify.delete('/:tripId', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
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
  });
  // create a trip
  fastify.post('/create', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
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
  });
}