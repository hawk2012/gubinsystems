/**
 * GubinNET Module System
 * 
 * Implements the modular architecture allowing developers to add functionality
 * as independent npm packages. Following our "wooden blocks" approach -
 * simple, combinable, customizable.
 */

const fp = require('fastify-plugin');
const fs = require('fs');
const path = require('path');

const modulesModule = async (fastify, opts) => {
  const config = fastify.config || require('../gubin.config.js');
  
  // Initialize module registry
  fastify.decorate('modules', {
    registry: new Map(),
    loaded: [],
    
    register(moduleName, moduleFn) {
      this.registry.set(moduleName, moduleFn);
      console.log(`[GubinNET Modules] Registered module: ${moduleName}`);
    },
    
    async loadEnabledModules() {
      const enabledModules = config.modules.enabled || [];
      
      for (const moduleName of enabledModules) {
        try {
          console.log(`[GubinNET Modules] Loading module: ${moduleName}`);
          
          // Attempt to load module
          let modulePath;
          try {
            // First try to resolve as installed package
            modulePath = require.resolve(moduleName);
          } catch (e) {
            // If not found, try local path
            modulePath = path.join(process.cwd(), config.modules.paths.modules, moduleName.replace('@gubinet/', ''));
          }
          
          const moduleFn = require(modulePath);
          await fastify.register(moduleFn);
          this.loaded.push(moduleName);
          
          console.log(`[GubinNET Modules] Successfully loaded: ${moduleName}`);
        } catch (error) {
          console.error(`[GubinNET Modules] Failed to load module ${moduleName}:`, error.message);
        }
      }
    }
  });
  
  // Load all enabled modules after initialization
  fastify.addHook('onReady', async () => {
    await fastify.modules.loadEnabledModules();
  });
  
  console.log('[GubinNET Core] Module system initialized');
};

module.exports = fp(modulesModule);