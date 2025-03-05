import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { FastifyInstance } from "fastify";
import createBlackList from "../workers/worker3.js";
import bye from "./bye.js";
import hello from "./hello.js";
const dirWorkers = dirname(fileURLToPath(import.meta.url));

async function routes(fastify: FastifyInstance) {
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

	/**
	 * This route is to test the black list with threads
	 */
	fastify.get("/black-list", async (request, reply) => {
		const ioT = request.query as { nThreads: number; nIPs: number };
		const nThreads = ioT.nThreads as number;
		const nIPs = ioT.nIPs as number;
		console.log(`Number of threads: ${nThreads}`);
		console.log(`Number of IPs: ${nIPs}`);
		const blackList = await createBlackList(nThreads, nIPs, fastify.piscina)
			// Promise control
			.then((result: string[]) => {
				return { succes: true, result };
			})
			// Promise error control
			.catch((error: Error) => {
				console.log("\nError in black list");
				console.error(error);
				return reply.status(400).send(error.message);
			});

		return reply.status(200).send(blackList);
	});
}
export default routes;
