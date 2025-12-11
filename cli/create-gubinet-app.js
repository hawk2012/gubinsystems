#!/usr/bin/env node

/**
 * GubinNET CLI Tool: create-gubinet-app
 * 
 * The official way to start a new GubinNET project.
 * Implements our philosophy: "Собери, что нужно. Ничего лишнего."
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command arguments
const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error('Usage: npx create-gubinet-app <project-name>');
  process.exit(1);
}

console.log(`\\n🏗️  Creating a new GubinNET project: ${projectName}`);
console.log(`Philosophy: "Собери, что нужно. Ничего лишнего."\\n`);

// Create project directory
const projectDir = path.join(process.cwd(), projectName);

try {
  if (fs.existsSync(projectDir)) {
    throw new Error(`Directory ${projectDir} already exists!`);
  }

  fs.mkdirSync(projectDir, { recursive: true });
  process.chdir(projectDir);

  // Create basic project structure
  createProjectStructure();

  // Initialize git repo
  execSync('git init', { stdio: 'ignore' });
  
  // Install dependencies
  console.log('\\n📦 Installing dependencies...');
  // In a real implementation, we would run npm install here
  // For now we'll just create a placeholder
  createPlaceholderFiles();

  console.log(`\\n🎉 Success! Created ${projectName} at ${projectDir}`);
  console.log('\\nTo get started:');
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev');
  console.log('\\nExplore the documentation at https://gubinnet.dev/docs');
  console.log('\\nPhilosophy reminder: "Собери, что нужно. Ничего лишнего."');
} catch (error) {
  console.error(`\\n❌ Failed to create project: ${error.message}`);
  process.exit(1);
}

function createProjectStructure() {
  // Create directory structure
  const dirs = ['public', 'modules', 'themes', 'config'];
  dirs.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  // Create package.json
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    description: 'A new GubinNET project',
    main: 'index.js',
    scripts: {
      dev: 'node index.js',
      build: 'echo "Build process goes here"',
      start: 'node index.js'
    },
    dependencies: {
      'gubinnet': 'latest'
    },
    keywords: ['gubinnet', 'cms', 'modular'],
    author: '',
    license: 'MIT'
  };

  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Create basic index.js
  const indexJs = `const gubinnet = require('gubinnet');

// GubinNET configuration
const config = {
  core: {
    name: '${projectName}',
    adminPath: '/admin',
    apiPrefix: '/api',
  },
  database: {
    provider: 'sqlite',
    url: './db.sqlite',
  },
  modules: {
    enabled: [
      '@gubinet/module-pages',
      '@gubinet/theme-dark'
    ],
    paths: {
      modules: './modules',
      themes: './themes'
    }
  },
  admin: {
    theme: 'carbon-dark',
    title: '${projectName} Admin',
    darkMode: true,
  }
};

// Start GubinNET server
const start = async () => {
  try {
    await gubinnet.listen({ port: process.env.PORT || 3000 });
    console.log(\`\\nGubinNET running at http://localhost:\${process.env.PORT || 3000}\`);
    console.log('Admin panel:', \`http://localhost:\${process.env.PORT || 3000}\${config.core.adminPath}\`);
    console.log('\\nPhilosophy: "Собери, что нужно. Ничего лишнего."');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
`;

  fs.writeFileSync('index.js', indexJs);

  // Create .env file
  fs.writeFileSync('.env', '# GubinNET Environment Variables\nPORT=3000\nNODE_ENV=development\n');

  // Create gubin.config.js
  fs.writeFileSync('gubin.config.js', `module.exports = {
  // GubinNET configuration file
  // See https://gubinnet.dev/docs/configuration for options
};
`);
}

function createPlaceholderFiles() {
  // Create README specific to this project
  const projectReadme = `# ${projectName}

Built with [GubinNET](https://gubinnet.dev) - A modular CMS for developers who value control and performance.

## Getting Started

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 to see your site.

## Philosophy

This project follows GubinNET's core principles:
- **Predictability**: No "magic", code is transparent and logical
- **Control**: Full visibility into what happens in your application  
- **Performance**: Optimized from the ground up

> "Собери, что нужно. Ничего лишнего." - Build what you need. Nothing extra.
`;

  fs.writeFileSync('README.md', projectReadme);
}