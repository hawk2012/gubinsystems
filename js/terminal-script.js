// Terminal-inspired DevOps Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Type writer effect for the logo
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.className = 'logo-terminal';
                cursor.innerHTML = '|';
                element.appendChild(cursor);
            }
        }
        
        type();
    }
    
    // Initialize typewriter effect for logo if it exists
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        const logoText = logoElement.textContent.trim();
        logoElement.innerHTML = '';
        typeWriter(logoElement, 'Михаил Губин');
    }
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '0%';
            bar.style.width = width;
        });
    }
    
    // Check if elements are in viewport and trigger animations
    function checkScrollAnimations() {
        const skillSection = document.querySelector('.skills');
        if (skillSection) {
            const rect = skillSection.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                animateSkillBars();
                // Remove the scroll event listener to prevent multiple triggers
                window.removeEventListener('scroll', checkScrollAnimations);
            }
        }
    }
    
    // Initial check
    checkScrollAnimations();
    
    // Add scroll listener for animations
    window.addEventListener('scroll', checkScrollAnimations);
    
    // Contact command functionality
    const contactCommands = document.querySelectorAll('.contact-command');
    contactCommands.forEach(command => {
        command.addEventListener('click', function() {
            const commandText = this.querySelector('.command').textContent;
            let url = '';
            
            if (commandText.includes('ssh')) {
                url = 'mailto:platform@gubin.systems';
                window.location.href = url;
            } else if (commandText.includes('curl')) {
                url = 'https://linkedin.com/in/mikhail-gubin';
                window.open(url, '_blank');
            } else if (commandText.includes('github')) {
                url = 'https://github.com/hawk2012';
                window.open(url, '_blank');
            } else if (commandText.includes('telegram')) {
                url = 'https://t.me/mgubin';
                window.open(url, '_blank');
            }
            
            // Show copied notification
            showCopiedNotification(commandText);
        });
    });
    
    // Show copied notification
    function showCopiedNotification(text) {
        const notification = document.createElement('div');
        notification.className = 'copied-notification';
        notification.textContent = '[Copied to clipboard]';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--terminal-green);
            color: var(--terminal-bg);
            padding: 10px 15px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    // Terminal console functionality
    const consoleBtn = document.querySelector('.console-btn');
    const consoleWindow = document.querySelector('.console-window');
    const consoleInput = consoleWindow ? consoleWindow.querySelector('input') : null;
    const consoleContent = consoleWindow ? consoleWindow.querySelector('.console-content') : null;
    
    if (consoleBtn) {
        consoleBtn.addEventListener('click', function() {
            if (consoleWindow.style.display === 'flex') {
                consoleWindow.style.display = 'none';
            } else {
                consoleWindow.style.display = 'flex';
                // Add welcome message
                if (consoleContent) {
                    consoleContent.innerHTML = '> Welcome to Mikhail Gubin\'s terminal<br>> Type "help" for available commands<br>';
                }
            }
        });
    }
    
    if (consoleInput) {
        consoleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                executeCommand(command);
                this.value = '';
            }
        });
    }
    
    function executeCommand(command) {
        if (!consoleContent) return;
        
        consoleContent.innerHTML += `$ ${command}<br>`;
        
        let response = '';
        switch(command) {
            case 'help':
                response = 'Available commands: help, status, whoami, skills, experience, contact, joke, clear';
                break;
            case 'status':
                response = 'System status: All systems operational. DevOps pipeline running smoothly.';
                break;
            case 'whoami':
                response = 'mikhail_gubin_devops_engineer';
                break;
            case 'skills':
                response = 'Kubernetes, Docker, AWS, Terraform, GitLab CI, Jenkins, Prometheus, Grafana...';
                break;
            case 'experience':
                response = 'Senior DevOps Engineer at FINSTAR FINANCIAL GROUP, SRE at Spargo Technologies...';
                break;
            case 'contact':
                response = 'platform@gubin.systems | github.com/hawk2012 | vk.ru/mgubin';
                break;
            case 'joke':
                response = 'Why do Java developers wear glasses? Because they don\'t C#!';
                break;
            case 'clear':
                consoleContent.innerHTML = '';
                return;
            default:
                response = `Command not found: ${command}. Type 'help' for available commands.`;
        }
        
        consoleContent.innerHTML += response + '<br>';
        consoleContent.scrollTop = consoleContent.scrollHeight;
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Сообщение отправлено!\nИмя: ${name}\nEmail: ${email}\nТема: ${subject}\nСообщение: ${message}`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Initialize the first section to be visible
    if (sections.length > 0) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }
});

// Add CSS for the copied notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
    
    .copied-notification {
        animation: fadeInOut 2s ease-in-out;
    }
`;
document.head.appendChild(style);