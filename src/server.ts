import Fastify from "fastify";
import routes from './routes/routes.js';

const fastify = Fastify({ 
    logger: true,
});


// Register routes
fastify.register(routes);


fastify.listen({
    host:'0.0.0.0',
    port: 3000}, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
})