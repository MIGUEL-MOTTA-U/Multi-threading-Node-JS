import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { FastifyInstance } from "fastify";
import bye from "./bye.js";
import hello from "./hello.js";
import type Piscina from "piscina";
const dirWorkers = dirname(fileURLToPath(import.meta.url));

async function createBlackList(nThreads:number, nIPs:number, piscina: Piscina.Piscina): Promise<string[]> {
	console.log("Creating black list");
	const something = piscina.run( {nThreads, nIPs} , { filename: resolve(dirWorkers, "../workers/worker3") })
	.then((result) => {
		return result;
	})
	.catch((error) => {
		return error;
	});
	return something;
}

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

	/**
	 * This route is to test the black list with threads
	 */
	fastify.get("/black-list", async (request, _reply) => {
		const ioT = request.query as { nThreads: number; nIPs: number };
		const nThreads = ioT.nThreads as number;
		
		
		const nIPs = ioT.nIPs as number;
		console.log(`Number of threads: ${nThreads}`);
		console.log(`Number of IPs: ${nIPs}`);
		const blackList = await createBlackList(nThreads, nIPs, fastify.piscina).then((result) => {
			return result;
		});

		return { success: true , result: blackList };
	});
}
export default routes;
