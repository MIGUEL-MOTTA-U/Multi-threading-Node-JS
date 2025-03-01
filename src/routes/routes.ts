import type { FastifyInstance } from "fastify";
import bye from "./bye.js";
import hello from "./hello.js";
async function routes(fastify: FastifyInstance) {
	fastify.get("/", async (_request, reply) => {
		reply.send({ hello: "world" });
	});
	fastify.get("/hello", hello);
	fastify.get("/bye", bye);
}
export default routes;
