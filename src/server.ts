import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import piscina from "fastify-piscina";
import routes from "./routes/routes.js";

const fastify = Fastify({
	logger: true,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register routes
fastify.register(routes);

// Register Piscina plugin
fastify.register(piscina, {
	filename: resolve(__dirname, "workers/worker.js"),
	piscinaOptions: {
		size: 4,
	},
});

fastify.listen(
	{
		host: "0.0.0.0",
		port: 3000,
	},
	(err, address) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
		fastify.log.info(`server listening on ${address}`);
	},
);
