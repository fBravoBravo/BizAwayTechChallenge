import Fastify, { FastifyRegisterOptions } from 'fastify'
import { routes } from './api/routes/routes.js';
import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = Fastify({
  logger: true
})

const swaggerOptions = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'BizAway Tech challenge',
      description: 'This is a simple API for the BizAway Tech challenge',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'Trips', description: 'Trip related end-points' },
    ],
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
} as FastifyRegisterOptions<SwaggerOptions>;

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

server.register(fastifySwagger, swaggerOptions);
server.register(fastifySwaggerUi, swaggerUiOptions);

server.register(routes, { prefix: '/api', });

server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})