import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type Piscina from "piscina";
export default async function createBlackList(
	nThreads: number,
	nIPs: number,
	piscina: Piscina.Piscina,
): Promise<string[]> {
	if (nIPs < nThreads)
		throw new Error("Number of IPs must be greater than number of Threads");
	const result: string[] = [];
	let start = 0;
	const chunk = Math.floor(nIPs / nThreads);
	const rest = nIPs % nThreads;
	const __dirname = dirname(fileURLToPath(import.meta.url));

	for (let i = 0; i < nThreads; i++) {
		const end = start + chunk;
		const ips: string[] = await piscina
			.run(
				{ start, end: end - 1 },
				{ filename: resolve(__dirname, "generateIps") },
			)
			.then((result: string[]) => {
				return result;
			});
		result.push(...ips);
		start = end;
	}
	if (rest > 0)
		piscina
			.run(
				{ start, end: start + rest },
				{ filename: resolve(__dirname, "../workers/generateIps") },
			)
			.then((ips) => result.push(...ips));
	return result;
}
