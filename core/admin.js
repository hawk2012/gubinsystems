/**
 * GubinNET Admin Panel Registration
 * 
 * Registers the dark-themed admin panel that follows our design philosophy:
 * "Carbon Dark" theme with monospace fonts and minimalistic interface.
 */

const fp = require('fastify-plugin');
const path = require('path');

const adminModule = async (fastify, opts) => {
  const config = fastify.config || require('../gubin.config.js');
  
  // Serve static assets for admin panel
  // In a real implementation, this would serve the built admin SPA
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'admin-dist'),
    prefix: config.core.adminPath, // Administrative interface prefix
    decorateReply: false
  });
  
  // Admin-specific routes
  fastify.get(`${config.core.adminPath}`, async (request, reply) => {
    // In a real implementation, this would serve the admin dashboard
    return {
      message: 'GubinNET Admin Panel',
      theme: config.admin.theme,
      title: config.admin.title,
      philosophy: 'Tool, not toy - Built for professionals',
      motto: 'Собери, что нужно. Ничего лишнего.'
    };
  });
  
  fastify.get(`${config.core.adminPath}/info`, async (request, reply) => {
    return {
      name: config.core.name,
      version: config.core.version,
      theme: config.admin.theme,
      modules: fastify.modules ? fastify.modules.loaded : [],
      philosophy: 'Tool, not toy - Predictable, Controllable, Performant',
      motto: 'Собери, что нужно. Ничего лишнего.'
    };
  });
  
  console.log(`[GubinNET Core] Admin panel registered at ${config.core.adminPath} with ${config.admin.theme} theme`);
};

module.exports = fp(adminModule);