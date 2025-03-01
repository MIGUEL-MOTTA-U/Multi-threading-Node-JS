import type { FastifyRequest, FastifyReply } from "fastify";
async function bye(_request:FastifyRequest, reply:FastifyReply) {
    reply.send({ bye: 'world' });
}
export default bye;