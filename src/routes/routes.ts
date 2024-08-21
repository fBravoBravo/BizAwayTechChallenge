import * as fastify from 'fastify';
import { processRequest } from '../helpers/requestProcessor';


const allowedIATAcodes  = [
    "ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW",
    "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO",
    "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO",
    "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM",
    "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"
];

export async function routes (fastify: fastify.FastifyInstance, options: fastify.FastifyPluginOptions) {
  fastify.get('/exploreDestination', async (request: fastify.FastifyRequest, reply: fastify.FastifyReply) => {
    const timeStart = performance.now();

    //TODO guard to check if the params are present.
    const {origin, destination, sort_by} = request.params as { origin: string, destination: string, sort_by: "fastest" | "cheapest" };

    if (!origin || !destination || !sort_by) {
      reply.code(400).send({
        error: "Please provide all the required parameters."
      });
      return reply;
    }

    if (sort_by !== "fastest" && sort_by !== "cheapest") {
      reply.code(400).send({
        error: "Please provide a valid value for sort_by."
      });
    }

    if (!allowedIATAcodes.includes(origin) || !allowedIATAcodes.includes(destination)) {
      //TODO expand this with further information about the errors in the IATA codes.
      reply.code(400).send({
        error: "Please provide valid IAT codes for origin and destination."
      });
    }


    let tripOptions, jsonResponse; 
    
    try {
      tripOptions = await (processRequest(origin, destination, sort_by));  
      if (tripOptions.error) {
        jsonResponse = {
          error: tripOptions
        }
        
      }
    } catch (error) {
    }
    
  
    const timeEnd = performance.now();

    jsonResponse = {
      elapsedTime: timeEnd - timeStart,
      tripData: {
        sort_by,
        tripOptions: tripOptions
      }
    }

    reply.code(200).send(jsonResponse);
    
  })
}