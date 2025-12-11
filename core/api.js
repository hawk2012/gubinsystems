/**
 * GubinNET Core API Routes
 * 
 * Provides clean, predictable API endpoints following our philosophy of
 * transparency and control. No "magic" - everything is explicit and clear.
 */

const fp = require('fastify-plugin');

const apiModule = async (fastify, opts) => {
  const config = fastify.config || require('../gubin.config.js');
  
  // Base API routes
  fastify.get(`${config.core.apiPrefix}/info`, async (request, reply) => {
    return {
      name: config.core.name,
      version: config.core.version,
      modules: fastify.modules ? fastify.modules.loaded : [],
      philosophy: 'Tool, not toy - Predictable, Controllable, Performant',
      motto: 'Собери, что нужно. Ничего лишнего.'
    };
  });
  
  // Placeholder for future API routes
  // These will be extended by individual modules
  
  console.log('[GubinNET Core] API module initialized');
};

module.exports = fp(apiModule);