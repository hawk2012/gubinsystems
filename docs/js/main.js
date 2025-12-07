// Update time for Moscow and Tashkent
function updateTime() {
    // Moscow time (UTC+3)
    const moscowTime = new Date().toLocaleString("ru-RU", { 
        timeZone: "Europe/Moscow",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Tashkent time (UTC+5)
    const tashkentTime = new Date().toLocaleString("ru-RU", { 
        timeZone: "Asia/Tashkent",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.getElementById('moscow-time').textContent = `Москва: ${moscowTime}`;
    document.getElementById('tashkent-time').textContent = `Ташкент: ${tashkentTime}`;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

// Contact form submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert
    alert(`Спасибо за ваше сообщение, ${name}! Мы свяжемся с вами по адресу ${email} в ближайшее время.`);
    
    // Reset form
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle tech details visibility when clicking on cards
document.querySelectorAll('.card').forEach(card => {
    const techDetails = card.querySelector('.tech-details');
    if (techDetails) {
        const header = card.querySelector('h3');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                techDetails.style.display = techDetails.style.display === 'none' ? 'block' : 'none';
            });
        }
    }
});