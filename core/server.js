/**
 * GubinNET Core Server Module
 * 
 * Implements the foundational server functionality following our philosophy:
 * Predictability, Control, and Performance
 */

const fp = require('fastify-plugin');

const serverModule = async (fastify, opts) => {
  // Register essential plugins
  fastify.register(require('@fastify/cors'), {
    origin: process.env.CORS_ORIGIN || '*'
  });

  fastify.register(require('@fastify/compress'));

  // Add request logging middleware
  fastify.addHook('onRequest', (request, reply, done) => {
    console.log(`${new Date().toISOString()} - ${request.method} ${request.url}`);
    done();
  });

  // Add response time header
  fastify.addHook('onSend', async (request, reply) => {
    const responseTime = Date.now() - request.id;
    reply.header('X-Response-Time', `${responseTime}ms`);
  });

  // Register core utilities
  fastify.decorate('gubin', {
    name: 'GubinNET Core',
    version: '0.1.0',
    philosophy: 'Tool, not toy - Predictable, Controllable, Performant',
    motto: 'Собери, что нужно. Ничего лишнего.'
  });

  // Initialize database connection
  fastify.decorate('db', {});
  
  console.log('[GubinNET Core] Server module initialized');
};

module.exports = fp(serverModule);