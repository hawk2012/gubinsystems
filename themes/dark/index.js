/**
 * GubinNET Carbon Dark Theme (@gubinet/theme-dark)
 * 
 * The signature dark theme for GubinNET admin panel.
 * Features deep gray (#0f172a) background with orange (#f97316) accents,
 * monospace fonts for settings, and minimalistic interface.
 */

const fp = require('fastify-plugin');

const themeModule = async (fastify, opts) => {
  // Theme information
  const themeInfo = {
    name: 'Carbon Dark',
    version: '1.0.0',
    colors: {
      background: '#0f172a',     // Deep gray, not black
      surface: '#1e293b',        // Lighter gray for surfaces
      textPrimary: '#f1f5f9',    // Light text
      textSecondary: '#94a3b8',  // Muted text
      accent: '#f97316',         // Orange accent color
      success: '#22c55e',        // Green for success
      warning: '#f59e0b',        // Amber for warnings
      error: '#ef4444'           // Red for errors
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      monoFontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      baseSize: '14px'
    }
  };

  // Register theme assets (in a real implementation, this would serve CSS/JS files)
  fastify.decorate('theme', themeInfo);

  // Add theme info to admin routes
  fastify.addHook('onRoute', (routeOptions) => {
    if (routeOptions.path.startsWith('/admin')) {
      // Enhance admin routes with theme information
      const originalHandler = routeOptions.handler;
      if (originalHandler) {
        routeOptions.handler = async (request, reply) => {
          // In a real implementation, this would inject theme CSS
          // and enhance the response with theme information
          return await originalHandler(request, reply);
        };
      }
    }
  });

  console.log(`[GubinNET Carbon Dark Theme] Theme loaded: ${themeInfo.name}`);
  console.log(`[GubinNET Carbon Dark Theme] Philosophy: "Собери, что нужно. Ничего лишнего."`);
};

module.exports = fp(themeModule);