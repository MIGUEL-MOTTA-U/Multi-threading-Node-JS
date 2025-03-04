import "fastify";
import type { Piscina } from "piscina";
declare module "fastify" {
	interface FastifyInstance {
		piscina: Piscina;
	}
}
