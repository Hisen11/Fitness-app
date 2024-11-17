import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
// import fastify from 'fastify';
// import jwt from '@fastify/jwt';

const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

let instance= typeof app || null ;

export function getApp() {
  if (instance) return instance;
  
  instance = app;
  return app;
}

app.post('/login', async (request, reply) => {
  const { username, password } = request.body
  
  // Këtu mund të bësh verifikimin e përdoruesit 
  
  const token = app.jwt.sign({ username });
  return { token };
});

app.get('/protected', async (request, reply) => {
  try {
    await request.jwtVerify();
    return { message: 'Protected route' };
  } catch (err) {
    return reply.send(err);
  }
});
