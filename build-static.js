const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes to render
const routes = [
    { path: '/', template: 'index', data: { 
        title: 'Михаил Губин - DevOps в Финтехе',
        currentYear: new Date().getFullYear(),
        currentPage: 'home'
    }},
    { path: '/experience', template: 'experience', data: { 
        title: 'Опыт работы - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'experience'
    }},
    { path: '/skills', template: 'skills', data: { 
        title: 'Навыки - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'skills'
    }},
    { path: '/contacts', template: 'contacts', data: { 
        title: 'Контакты - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'contacts'
    }}
];

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Create directories for subpages
const subdirs = ['experience', 'skills', 'contacts'];
subdirs.forEach(dir => {
    const dirPath = path.join(distDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

// Render each route to static HTML
routes.forEach(route => {
    app.render(route.template, route.data, (err, html) => {
        if (err) {
            console.error(`Error rendering ${route.template}:`, err);
            return;
        }
        
        let filePath;
        if (route.path === '/') {
            filePath = path.join(distDir, 'index.html');
        } else {
            const dirName = route.path.substring(1); // Remove leading slash
            filePath = path.join(distDir, dirName, 'index.html');
        }
        
        fs.writeFileSync(filePath, html);
        console.log(`Generated: ${filePath}`);
    });
});

// Copy public folder to dist
const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

try {
    copyRecursiveSync(path.join(__dirname, 'public'), distDir);
    console.log('Copied public folder to dist');
} catch (err) {
    console.error('Error copying public folder:', err);
}