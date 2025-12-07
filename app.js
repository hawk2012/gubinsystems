const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'assets')));

// Additional routes for specific assets if needed
app.get('/devops.pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'devops.pdf'));
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Михаил Губин - DevOps в Финтехе',
        currentYear: new Date().getFullYear(),
        currentPage: 'home'
    });
});

app.get('/experience', (req, res) => {
    res.render('experience', { 
        title: 'Опыт работы - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'experience'
    });
});

app.get('/skills', (req, res) => {
    res.render('skills', { 
        title: 'Навыки - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'skills'
    });
});

app.get('/contacts', (req, res) => {
    res.render('contacts', { 
        title: 'Контакты - Михаил Губин',
        currentYear: new Date().getFullYear(),
        currentPage: 'contacts'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Страница не найдена',
        currentYear: new Date().getFullYear(),
        currentPage: '404'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});