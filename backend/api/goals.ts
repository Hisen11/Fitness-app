import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

export default async function goalRoutes(fastify: FastifyInstance) {
  // Endpoint për të marrë qëllimet e përdoruesit
  fastify.get('/api/goals', async (request, reply) => {
    const userId = request.user.id; // ID e përdoruesit nga JWT

    try {
      const goals = await prisma.goal.findMany({
        where: { userId },
        orderBy: { targetDate: 'asc' }, // Opsionale: Renditje sipas datës
      });
      reply.send(goals);
    } catch (error) {
      reply.status(500).send({ error: 'Nuk mund të merren qëllimet.' });
    }
  });

  // Endpoint për të shtuar një qëllim të ri
  fastify.post('/api/goals', async (request, reply) => {
    const { description, targetDate } = request.body;
    const userId = request.user.id; // ID e përdoruesit nga JWT

    try {
      const newGoal = await prisma.goal.create({
        data: {
          userId,
          description,
          targetDate: new Date(targetDate),
          completed: false,
        },
      });
      reply.send(newGoal);
    } catch (error) {
      reply.status(500).send({ error: 'Nuk mund të shtohet qëllimi.' });
    }
  });
}
