// New Year's Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add New Year's body class
    document.body.classList.add('newyear-body');
    
    // Create snowflakes
    function createSnowflakes() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'newyear-theme';
        document.body.appendChild(snowContainer);
        
        // Create multiple snowflakes
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = '❄';
                
                // Random position
                const startPosition = Math.random() * 100;
                snowflake.style.left = `${startPosition}vw`;
                
                // Random size
                const size = 0.5 + Math.random() * 1.0;
                snowflake.style.fontSize = `${size}em`;
                
                // Random animation duration
                const duration = 5 + Math.random() * 10;
                snowflake.style.animation = `fall ${duration}s linear forwards`;
                
                // Random delay
                const delay = Math.random() * 5;
                snowflake.style.animationDelay = `${delay}s`;
                
                snowContainer.appendChild(snowflake);
                
                // Remove snowflake after animation completes to prevent memory issues
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.parentNode.removeChild(snowflake);
                    }
                }, duration * 1000 + delay * 1000);
            }, i * 300); // Stagger creation
        }
    }
    
    // Add festive decorations
    function addFestiveDecorations() {
        const decorations = ['🎄', '🎁', '✨', '🌟', '🎅', '🤶', '🦌', '⛄'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const decor = document.createElement('div');
                decor.className = 'festive-element';
                decor.innerHTML = decorations[Math.floor(Math.random() * decorations.length)];
                
                // Position randomly around the edges
                const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
                let top, left;
                
                switch(side) {
                    case 0: // top
                        top = -30;
                        left = Math.random() * 100;
                        break;
                    case 1: // right
                        top = Math.random() * 100;
                        left = 100;
                        break;
                    case 2: // bottom
                        top = 100;
                        left = Math.random() * 100;
                        break;
                    case 3: // left
                        top = Math.random() * 100;
                        left = -10;
                        break;
                }
                
                decor.style.top = `${top}%`;
                decor.style.left = `${left}%`;
                
                // Random animation delay
                decor.style.animationDelay = `${Math.random() * 3}s`;
                
                document.body.appendChild(decor);
            }, i * 1000);
        }
    }
    
    // Add festive hover effects to links and buttons
    function addFestiveHoverEffects() {
        const hoverables = document.querySelectorAll('a, .skill-item, .kb-card, .article-link, .card-link, h1, h2, h3');
        hoverables.forEach(element => {
            element.classList.add('festive-hover');
        });
    }
    
    // Apply festive styles to headers
    function applyFestiveHeaders() {
        const h1Elements = document.querySelectorAll('h1');
        const h2Elements = document.querySelectorAll('h2');
        const h3Elements = document.querySelectorAll('h3');
        
        h1Elements.forEach(h => h.classList.add('newyear-h1'));
        h2Elements.forEach(h => h.classList.add('newyear-h2'));
        h3Elements.forEach(h => h.classList.add('newyear-h3'));
    }
    
    // Apply festive styles to skill items
    function applyFestiveSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            skill.classList.add('festive-skill-item');
        });
    }
    
    // Add New Year's banner
    function addNewYearBanner() {
        const banner = document.createElement('div');
        banner.className = 'newyear-banner';
        banner.innerHTML = '🎉 С Новым 2026 Годом! 🎉 Пусть этот год принесет вам успехи в DevOps и новые достижения! 🎊';
        document.body.insertBefore(banner, document.body.firstChild);
    }
    
    // Initialize all New Year's effects
    createSnowflakes();
    addFestiveDecorations();
    addFestiveHoverEffects();
    applyFestiveHeaders();
    applyFestiveSkills();
    addNewYearBanner();
    
    // Recreate snowflakes periodically to maintain the effect
    setInterval(() => {
        createSnowflakes();
    }, 15000); // Every 15 seconds
});