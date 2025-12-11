# GubinNET Concept Documentation

## Overview

GubinNET — это модульная CMS для Node.js, созданная для разработчиков, которые ценят контроль и производительность. С темной админкой "Carbon Dark", простой установкой через npx и философией "инструмент, а не игрушка", она позволяет собирать сайты из необходимых модулей (магазин, блог, SEO), оставляя полную свободу в создании фронтенда.

**Слоган**: "Собери свой сайт. По-настоящему."

## Key Philosophy and USP (Unique Selling Proposition)

The name "Gubin" sounds substantial, Russian, and somewhat "brutal". This becomes the foundation of the concept.

**Concept**: "Tool, not toy"

GubinNET is a CMS for masters of their craft, who create sites for business, not for hobby. Target audience: web masters, small studios, freelancers, small and medium business owners who need a reliable, transparent and controllable tool.

Three pillars of GubinNET:

1. **Predictability**: No "magic", code should be understandable and logical.
2. **Control**: Developer always knows where and what is happening. Minimum hidden processes.
3. **Performance**: Fast out of the box, without unnecessary frills.

## Architectural Concept: "Core + Modules"

This is a classic approach, but it's important to present it properly.

- **Core (Core Gubin)**: Minimalist. Only basic functions: user management, settings, module system, API. No ready-made frontend. Dark admin design is a must-have feature, as a sign of belonging to "professionals".

- **Modules (Gubin Modules)**: Each module is an independent npm package that connects to the core.
  - `@gubinet/module-blog` — Blog with tags, categories, comments
  - `@gubinet/module-shop` — Store (cart, products, categories, orders)
  - `@gubinet/module-seo` — Sitemap, meta tags, robots.txt management
  - `@gubinet/module-pages` — Page management
  - `@gubinet/theme-dark` — Dark theme for admin panel

**Important**: Modules should be "wooden" (by analogy with "wooden" blocks in constructor). That is, they are not overloaded with unnecessary functionality, but they are easy to modify and combine.

## Technical Concept and Stack

- **Command to start**: `npx create-gubinet-app my-site` — immediately creates a project with selected modules
- **Backend**: Node.js + Fastify (faster and lighter than Express) or Express (larger community). Database — Prisma ORM with support for PostgreSQL, SQLite (for quick projects), MySQL. This will provide type safety and convenient DB work.
- **Admin panel**: Don't make a monolithic React/Vue inside. Better REST API of the core, and admin panel as a separate SPA application on the same Node (or even on another port). Can use Vite + React with components like Shadcn/ui in dark theme. This will allow easy updates and customization of the admin panel.
- **Frontend (public part)**: Return data through API (REST or tRPC for strict typing), and rendering is left to the developer. They can use any framework: Next.js, Nuxt, Astro or even pure JS. GubinNET does not impose its vision of frontend, it only provides data.
- **Configuration**: All configuration in .env files and separate gubin.config.js. No hidden settings in DB initially.

## Dark Design Concept: "Carbon Dark"

- **Color palette**: Deep gray (#0f172a), not black. Accent color — saturated orange (#f97316) or blue (#3b82f6), which is associated with reliability.
- **Interface**: Minimalist, with clear boundaries, lots of monospace fonts for settings and code (to emphasize "instrumentality").
- **Slogan in admin**: "Собери, что нужно. Ничего лишнего." ("Build what you need. Nothing extra.")

## Launch Plan (Roadmap)

- **MVP**: Core with installer (npx), pages module, basic admin panel with user management, API for getting page data
- **Version 0.2.0**: Blog module, basic SEO module
- **Version 0.5.0**: Basic shop module (products and cart without payment), improved API and documentation
- **Version 1.0.0**: Plugin/hook system, module marketplace/catalog, data migration tools

## How to Stand Out? (Key Differentiators)

- **"Gubin CLI"**: In addition to project creation, add commands for generating modules, DB migrations, deployment
- **Honest documentation**: With code examples, without fluff. Section "How it works inside"
- **Community**: Make the module creation process as simple as possible. Encourage creation of "niche" modules (restaurant menu, doctor appointments, equipment catalog)
- **Performance as a feature**: The main site should always have a graph comparing response times with other CMS

## Repository Structure

```
/workspace/
├── package.json              # Main package file with dependencies
├── README.md                 # Main documentation
├── gubin.config.js           # Configuration file
├── index.js                  # Main entry point
├── core/                     # Core system modules
│   ├── server.js             # Server initialization
│   ├── modules.js            # Module loading system
│   ├── api.js                # API routes
│   └── admin.js              # Admin panel registration
├── modules/                  # Example modules
│   └── pages/                # Pages module
│       └── index.js
├── themes/                   # Example themes
│   └── dark/                 # Dark theme
│       └── index.js
└── cli/                      # CLI tools
    ├── create-gubinet-app.js # Project scaffolding tool
    └── package.json
```

## Installation and Usage

For users to create a new project:
```bash
npx create-gubinet-app my-site
```

Then:
```bash
cd my-site
npm run dev
```

The system will follow the philosophy: "Собери, что нужно. Ничего лишнего." (Build what you need. Nothing extra.)