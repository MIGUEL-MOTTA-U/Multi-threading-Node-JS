import type { FastifyReply, FastifyRequest } from "fastify";

async function hello(_request:FastifyRequest, reply:FastifyReply) {
    reply.send("Hello World from route hello");
}

export default hello;