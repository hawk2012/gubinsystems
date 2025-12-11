/**
 * GubinNET Configuration File
 * 
 * This configuration allows developers to customize their GubinNET instance
 * without hidden settings in database - keeping with our philosophy of control and transparency.
 */

module.exports = {
  // Core settings
  core: {
    name: 'GubinNET',
    version: '0.1.0',
    adminPath: '/admin', // Path to admin panel
    apiPrefix: '/api',   // Prefix for all API routes
  },

  // Database configuration
  database: {
    provider: 'sqlite', // Supported: postgresql, mysql, sqlite
    url: process.env.DATABASE_URL || './db.sqlite',
  },

  // Module configuration
  modules: {
    enabled: [
      '@gubinet/module-pages',
      '@gubinet/module-users',
      '@gubinet/theme-dark'
    ],
    paths: {
      modules: './modules', // Directory where modules are stored
      themes: './themes'    // Directory where themes are stored
    }
  },

  // Admin panel settings
  admin: {
    theme: 'carbon-dark', // Default dark theme
    title: 'GubinNET Admin',
    logo: null, // Custom logo URL
    darkMode: true,
  },

  // Performance settings
  performance: {
    cache: {
      enabled: true,
      ttl: 300, // Time to live in seconds
    },
    compression: true,
  },

  // Security settings
  security: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    rateLimit: {
      max: 1000, // Max requests per windowMs
      windowMs: 15 * 60 * 1000, // Window size in milliseconds
    }
  }
};