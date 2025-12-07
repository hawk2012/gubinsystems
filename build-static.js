const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Создаем папку dist для сборки
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Копируем статические файлы
const assetsDir = path.join(__dirname, 'assets');
const distAssetsDir = path.join(distDir, 'assets');

// Функция для рекурсивного копирования папки
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Копируем assets
copyDir(assetsDir, distAssetsDir);

// Копируем изображения
const imagesDir = path.join(__dirname, 'images');
const distImagesDir = path.join(distDir, 'images');
if (fs.existsSync(imagesDir)) {
    copyDir(imagesDir, distImagesDir);
}

// Копируем CNAME если он существует
const cnamePath = path.join(__dirname, 'CNAME');
if (fs.existsSync(cnamePath)) {
    fs.copyFileSync(cnamePath, path.join(distDir, 'CNAME'));
}

// Копируем _config.yml.bak как _config.yml
const configPath = path.join(__dirname, '_config.yml.bak');
const distConfigPath = path.join(distDir, '_config.yml');
if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, distConfigPath);
}

// Собираем HTML-файлы из EJS-шаблонов
const viewsDir = path.join(__dirname, 'views');

// Читаем шаблон layout
const layoutPath = path.join(viewsDir, 'layout.ejs');
const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');

const pages = [
    { route: 'index.html', template: 'index.ejs', title: 'Михаил Губин - DevOps в Финтехе', currentPage: 'home' },
    { route: 'experience.html', template: 'experience.ejs', title: 'Опыт работы - Михаил Губин', currentPage: 'experience' },
    { route: 'skills.html', template: 'skills.ejs', title: 'Навыки - Михаил Губин', currentPage: 'skills' },
    { route: 'contacts.html', template: 'contacts.ejs', title: 'Контакты - Михаил Губин', currentPage: 'contacts' },
    { route: '404.html', template: '404.ejs', title: 'Страница не найдена', currentPage: '404' }
];

pages.forEach(page => {
    const templatePath = path.join(viewsDir, page.template);
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    
    // Рендерим содержимое страницы
    const renderedContent = ejs.render(templateContent, {
        title: page.title,
        currentYear: new Date().getFullYear(),
        currentPage: page.currentPage
    });

    // Заменяем body в layout на содержимое страницы
    let html = layoutTemplate.replace('<%- body %>', renderedContent);
    
    // Обновляем данные для layout
    html = ejs.render(html, {
        title: page.title,
        currentYear: new Date().getFullYear(),
        currentPage: page.currentPage
    });

    // Обновляем пути к ресурсам для статического хостинга
    let updatedHtml = html.replace(/\/css\/style\.css/g, 'assets/css/style.css')
                         .replace(/\/js\/main\.js/g, 'assets/js/main.js')
                         .replace(/\/devops\.pdf/g, 'assets/devops.pdf')
                         .replace(/href="\/([^"]*)"/g, (match, route) => {
                             if (route === '') return 'href="index.html"';
                             return `href="${route}.html"`;
                         });

    const pagePath = path.join(distDir, page.route);
    fs.writeFileSync(pagePath, updatedHtml);
});

console.log('Static build completed successfully!');