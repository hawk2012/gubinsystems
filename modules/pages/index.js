/**
 * GubinNET Pages Module (@gubinet/module-pages)
 * 
 * A simple pages module that allows creation and management of static pages.
 * This demonstrates our "wooden blocks" approach - simple, combinable, customizable.
 */

const fp = require('fastify-plugin');

const pagesModule = async (fastify, opts) => {
  // Simple in-memory storage for demonstration
  // In a real implementation, this would use the database
  let pages = [
    {
      id: 1,
      title: 'Home',
      slug: '/',
      content: '# Welcome to GubinNET\\n\\nThis is your first page.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'About',
      slug: '/about',
      content: '# About Us\\n\\nThis is the about page.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // API routes for pages
  fastify.get('/api/pages', async (request, reply) => {
    return pages;
  });

  fastify.get('/api/pages/:slug', async (request, reply) => {
    const { slug } = request.params;
    const page = pages.find(p => p.slug === slug);
    
    if (!page) {
      reply.status(404).send({ error: 'Page not found' });
      return;
    }
    
    return page;
  });

  fastify.post('/api/pages', async (request, reply) => {
    const { title, slug, content } = request.body;
    
    // Simple validation
    if (!title || !slug || !content) {
      reply.status(400).send({ error: 'Title, slug, and content are required' });
      return;
    }

    const newPage = {
      id: pages.length + 1,
      title,
      slug,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    pages.push(newPage);
    return newPage;
  });

  fastify.put('/api/pages/:id', async (request, reply) => {
    const { id } = request.params;
    const { title, slug, content } = request.body;
    
    const pageIndex = pages.findIndex(p => p.id == id);
    
    if (pageIndex === -1) {
      reply.status(404).send({ error: 'Page not found' });
      return;
    }

    pages[pageIndex] = {
      ...pages[pageIndex],
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(content !== undefined && { content }),
      updatedAt: new Date()
    };

    return pages[pageIndex];
  });

  fastify.delete('/api/pages/:id', async (request, reply) => {
    const { id } = request.params;
    const initialLength = pages.length;
    pages = pages.filter(p => p.id != id);
    
    if (pages.length === initialLength) {
      reply.status(404).send({ error: 'Page not found' });
      return;
    }

    reply.status(204).send();
  });

  console.log('[GubinNET Pages Module] Module loaded successfully');
};

module.exports = fp(pagesModule);