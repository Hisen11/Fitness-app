import { getApp } from './auth.js';
import fastify from 'fastify';
import goalRoutes from '../../api/goals';

const app = fastify({ logger: true });

// const app = getApp();

// app.listen(3000, (err , address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server running at ${address}`);
// });

// Krijo rregullat e rrugeve për `app`
async function startServer() {
  const fastify = Fastify();

  // Regjistro plugin-in për qëllimet
  fastify.register(goalRoutes);

  await fastify.listen({ port: 3000 });
}

startServer().catch(console.error);




// app.get('/', async (request, reply) => {
//   return { message: 'Hello from Meeee!' };
// });

// Përdor listen për me nis serverin e backenidt
const start = async () => {
  try {
    await app.listen({ port: 4000 });
    console.log('Server is running on http://localhost:4000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();