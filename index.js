/**
 * GubinNET Core Server
 * 
 * This is the main entry point for the GubinNET CMS core.
 * Following our philosophy: "Tool, not toy" - predictable, controlled, performant.
 */

const fastify = require('fastify')({ logger: true });
require('dotenv').config();

// Load configuration
const config = require('./gubin.config.js');

// Register core plugins
fastify.register(require('./core/server'));

// Register module system
fastify.register(require('./core/modules'));

// Register API routes
fastify.register(require('./core/api'));

// Register admin panel
fastify.register(require('./core/admin'));

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'ok', 
    service: config.core.name,
    version: config.core.version,
    timestamp: new Date().toISOString()
  };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    
    console.log(`\\n${config.core.name} v${config.core.version}`);
    console.log(`Dark Admin Panel: http://localhost:${process.env.PORT || 3000}${config.core.adminPath}`);
    console.log(`API Base: http://localhost:${process.env.PORT || 3000}${config.core.apiPrefix}`);
    console.log(`\\nPhilosophy: "Собери, что нужно. Ничего лишнего."`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = fastify;