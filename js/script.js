// Terminal animation and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Terminal scrolling effect
    const terminalContent = document.querySelector('.terminal-content');
    const commands = Array.from(terminalContent.querySelectorAll('.command'));
    
    // Clone commands to create a continuous loop effect
    commands.forEach(cmd => {
        const clone = cmd.cloneNode(true);
        terminalContent.appendChild(clone);
    });
    
    // Add hover effect to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 12px 24px rgba(0, 255, 157, 0.5), inset 0 0 30px rgba(0, 255, 157, 0.6)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(0, 255, 157, 0.2)';
        });
    });
    
    // Add scroll animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add subtle glossy animation when section comes into view
                setTimeout(() => {
                    entry.target.style.boxShadow = entry.target.style.boxShadow.replace('0 0 0', '0 0 15px');
                }, 300);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease';
        observer.observe(section);
    });
    
    // Add glossy effect on scroll for sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax effect to hero section
        document.querySelector('.hero').style.transform = `translateY(${rate}px)`;
        
        // Add subtle glow effect to sections as user scrolls
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                const scrollFactor = Math.min(1, (window.innerHeight - rect.top) / window.innerHeight);
                const glowIntensity = Math.floor(scrollFactor * 20);
                
                // Update the shine animation for sections based on scroll
                if (section.classList.contains('skills') || 
                    section.classList.contains('about') || 
                    section.classList.contains('experience') || 
                    section.classList.contains('education')) {
                    section.style.boxShadow = `0 0 ${glowIntensity}px rgba(${section.classList.contains('skills') ? '0, 255, 157' : '0, 102, 255'}), inset 0 0 ${glowIntensity}px rgba(${section.classList.contains('skills') ? '0, 255, 157' : '0, 102, 255'}, 0.1)`;
                }
            }
        });
    });
    
    // Add subtle animation to contact links
    const contactLinks = document.querySelectorAll('.contacts a');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.7)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
});