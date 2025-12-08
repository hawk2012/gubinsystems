// Terminal animation - cycle through terminal text
function initTerminalAnimation() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;
    
    // Clone the content to create a seamless scrolling effect
    const originalContent = terminalContent.innerHTML;
    terminalContent.innerHTML = originalContent + originalContent;
}

// Initialize terminal animation when page loads
document.addEventListener('DOMContentLoaded', initTerminalAnimation);

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements to animate on scroll
document.querySelectorAll('.exp-item, .skill-item, .edu-item, .glass-block').forEach(el => {
    observer.observe(el);
});

// Add animation class to elements when they come into view
document.querySelectorAll('.exp-item, .skill-item, .edu-item, .glass-block').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Add hover effects for glossy items
document.querySelectorAll('.skill-item, .exp-item, .edu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform.replace('translateY(-3px)', '') + ' translateY(-3px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = this.style.transform.replace('translateY(-3px)', '');
    });
});

// Smooth scrolling for anchor links (in case we add them later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});