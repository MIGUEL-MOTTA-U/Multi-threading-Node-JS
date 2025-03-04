import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { FastifyInstance } from "fastify";
import bye from "./bye.js";
import hello from "./hello.js";

async function routes(fastify: FastifyInstance) {
	const dirWorkers = dirname(fileURLToPath(import.meta.url));
	fastify.get("/", async (_request, reply) => {
		reply.send({ hello: "world" });
	});

	fastify.get("/hello", hello);

	fastify.get("/bye", bye);

	fastify.get("/threads-1", async (_request, _reply) => {
		const worker = resolve(dirWorkers, "../workers/worker");
		const tasks: Promise<number>[] = [];
		for (let i = 0; i < 10; i++) {
			const task = fastify.piscina
				.run({ number: 15, name: `${i}` }, { filename: worker })
				.then((calculus) => {
					return calculus.result;
				})
				.catch((error) => {
					return error;
				});
			tasks.push(task);
		}

		// Other example of threads with in a different file:
		for (let i = 0; i < 10; i++) {
			fastify.piscina.run(`Thread ${i}`, {
				filename: resolve(dirWorkers, "../workers/worker2"),
			});
		}

		const results = await Promise.all(tasks);
		return { success: true, results };
	});
}
export default routes;
