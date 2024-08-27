import Fastify from 'fastify'
import { routes } from './api/routes/routes.js';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = Fastify({
  logger: true
})

const swaggerOptions = {
    swagger: {
        info: {
            title: "BizAway tech challenge API documentation",
            description: `Author: Francisco Bravo Bravo
                          Documentation for the API of the BizAway tech challenge.`,
            version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{ name: "Default", description: "Default" }],
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);

server.register(routes, { prefix: '/api' });

server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})