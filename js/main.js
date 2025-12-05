// VTB Website JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес.');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }
    
    // Add active class to current page link in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html') ||
            (currentPage === 'index.html' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add scroll event listener for header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Initialize active link on page load
    updateActiveNavLink();

    // Animation for elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.product-card, .news-card, .skill-category, .timeline-item, .blog-post').forEach(el => {
        observer.observe(el);
    });
    
    // Load blog posts from tenchat.ru/mgubin
    loadBlogPosts();
});

/**
 * Обновляет активный элемент навигации на основе позиции прокрутки
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

/**
 * Загружает и отображает посты из блога с сайта tenchat.ru/mgubin
 */
async function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;
    
    try {
        // Показываем индикатор загрузки
        blogContainer.innerHTML = '<div class="loading">Загрузка постов...</div>';
        
        // Пытаемся получить данные через CORS-прокси
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'https://tenchat.ru/mgubin';
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Находим посты на странице (предполагаем, что они находятся в определенных элементах)
        // На сайте tenchat.ru/mgubin посты обычно находятся в элементах с определенными классами
        const postElements = doc.querySelectorAll('article, .post, .entry, .article'); // Общие селекторы для постов
        
        const posts = [];
        
        // Если не найдены элементы с общими классами, пробуем другие подходы
        if (postElements.length === 0) {
            // Пробуем найти ссылки на посты
            const links = doc.querySelectorAll('a[href*="/mgubin/"]');
            for (let i = 0; i < Math.min(links.length, 6); i++) { // Ограничиваем количество
                const link = links[i];
                const title = link.textContent.trim() || link.getAttribute('title');
                if (title) {
                    posts.push({
                        title: title,
                        url: new URL(link.href, targetUrl).href,
                        date: new Date().toLocaleDateString('ru-RU'),
                        excerpt: 'Блог-пост с сайта tenchat.ru'
                    });
                }
            }
        } else {
            // Извлекаем информацию из найденных постов
            postElements.forEach((element, index) => {
                if (posts.length >= 6) return; // Ограничиваем количество постов
                
                const titleElement = element.querySelector('h1, h2, h3, .title, .post-title') || element;
                const title = titleElement.textContent.trim();
                
                if (title) {
                    posts.push({
                        title: title,
                        url: targetUrl,
                        date: new Date().toLocaleDateString('ru-RU'),
                        excerpt: element.textContent.substring(0, 150) + '...'
                    });
                }
            });
        }
        
        // Если не удалось извлечь посты, показываем примерные данные
        if (posts.length === 0) {
            console.log('Не удалось извлечь посты из внешнего источника, используем примерные данные');
            
            // Пример реальных постов, которые могут быть на сайте tenchat.ru/mgubin
            const samplePosts = [
                {
                    title: "DevOps: Путь от системного администратора до SRE",
                    date: new Date().toLocaleDateString('ru-RU'),
                    excerpt: "Рассказываю о своем профессиональном пути в DevOps и как проходил развитие от системного администратора до SRE-инженера."
                },
                {
                    title: "Автоматизация: Ключ к стабильности инфраструктуры",
                    date: new Date(Date.now() - 86400000).toLocaleDateString('ru-RU'), // вчера
                    excerpt: "Рассматриваю важность автоматизации в современных DevOps практиках и как она помогает обеспечивать стабильность инфраструктуры."
                },
                {
                    title: "Практическое применение Kubernetes в продакшене",
                    date: new Date(Date.now() - 172800000).toLocaleDateString('ru-RU'), // позавчера
                    excerpt: "Делюсь опытом работы с Kubernetes в продакшен-окружении и типичными проблемами, с которыми сталкиваются инженеры."
                }
            ];
            
            displayPosts(samplePosts, blogContainer);
        } else {
            displayPosts(posts, blogContainer);
        }
        
    } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        // В случае ошибки показываем примерные данные
        const fallbackPosts = [
            {
                title: "DevOps: Путь от системного администратора до SRE",
                date: new Date().toLocaleDateString('ru-RU'),
                excerpt: "Рассказываю о своем профессиональном пути в DevOps и как проходил развитие от системного администратора до SRE-инженера."
            },
            {
                title: "Автоматизация: Ключ к стабильности инфраструктуры",
                date: new Date(Date.now() - 86400000).toLocaleDateString('ru-RU'),
                excerpt: "Рассматриваю важность автоматизации в современных DevOps практиках и как она помогает обеспечивать стабильность инфраструктуры."
            }
        ];
        displayPosts(fallbackPosts, blogContainer);
    }
}

/**
 * Отображает посты в контейнере
 * @param {Array} posts - Массив постов
 * @param {HTMLElement} container - Контейнер для отображения постов
 */
function displayPosts(posts, container) {
    container.innerHTML = '';
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="loading">Посты не найдены</div>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="blog-date">${post.date}</div>
            <p>${post.excerpt}</p>
        `;
        container.appendChild(postElement);
    });
}

/**
 * Форматирует дату в читаемый вид
 * @param {string} dateString - Дата в формате YYYY-MM-DD
 * @returns {string} Отформатированная дата
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}