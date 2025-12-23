// Mac-style Desktop JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Update clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;
    }
    
    updateClock();
    setInterval(updateClock, 60000); // Update every minute
    
    // Desktop icon click handlers
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        icon.addEventListener('dblclick', function() {
            const app = this.getAttribute('data-app');
            openApp(app);
        });
        
        // Single click to select
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            // Remove selection from other icons
            desktopIcons.forEach(i => i.style.backgroundColor = '');
            // Highlight clicked icon
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
    });
    
    // Dock item click handlers
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', function() {
            const app = this.getAttribute('data-app');
            
            // Handle social media links in dock
            if (app === 'social' || app === 'linkedin' || app === 'github' || app === 'twitter') {
                let socialUrl = '';
                switch(app) {
                    case 'social':
                        socialUrl = 'https://vk.ru/mgubin';
                        break;
                    case 'linkedin':
                        socialUrl = 'https://linkedin.com/in/mikhailgubin';
                        break;
                    case 'github':
                        socialUrl = 'https://github.com/hawk2012';
                        break;
                    case 'twitter':
                        socialUrl = 'https://twitter.com/';
                        break;
                }
                
                if (socialUrl) {
                    window.open(socialUrl, '_blank');
                    return;
                }
            }
            
            openApp(app);
        });
    });
    
    // Window controls
    const closeButtons = document.querySelectorAll('.control.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const window = this.closest('.window');
            window.style.display = 'none';
        });
    });
    
    // Minimize functionality
    const minimizeButtons = document.querySelectorAll('.control.minimize');
    minimizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const window = this.closest('.window');
            window.style.display = 'none';
        });
    });
    
    // Prevent default context menu on desktop
    document.querySelector('.desktop').addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Click on desktop to deselect icons
    document.querySelector('.desktop').addEventListener('click', function(e) {
        if (!e.target.closest('.desktop-icon')) {
            desktopIcons.forEach(i => i.style.backgroundColor = '');
        }
    });
    
    // Function to open applications
    function openApp(appName) {
        // Close all windows first
        document.querySelectorAll('.window').forEach(window => {
            window.style.display = 'none';
        });
        
        // Check if it's a PDF file
        if (appName === 'skills' || appName === 'career' || appName === 'description') {
            // Open PDF files in new tabs
            let pdfFile = '';
            if (appName === 'skills') pdfFile = 'umienia.pdf.html';
            if (appName === 'career') pdfFile = 'kariera.pdf.html';
            if (appName === 'description') pdfFile = 'opisanie.pdf.html';
            
            window.open(pdfFile, '_blank');
            return;
        }
        
        // Show the requested app window
        const appWindow = document.getElementById(`${appName}-window`);
        if (appWindow) {
            appWindow.style.display = 'block';
            
            // Bring window to front
            appWindow.style.zIndex = '1000';
            
            // Add click event to bring window to front when clicked
            appWindow.addEventListener('mousedown', function() {
                // Find highest z-index
                let highestZ = 0;
                document.querySelectorAll('.window').forEach(w => {
                    const z = parseInt(w.style.zIndex) || 0;
                    if (z > highestZ) highestZ = z;
                });
                
                // Set this window to one higher than highest
                this.style.zIndex = highestZ + 1;
            });
        }
    }
    
    // Add drag functionality to windows
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        
        if (header) {
            let isDragging = false;
            let offsetX, offsetY;
            
            header.addEventListener('mousedown', function(e) {
                if (e.target.classList.contains('control')) return;
                
                isDragging = true;
                const rect = window.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                // Bring window to front
                let highestZ = 0;
                document.querySelectorAll('.window').forEach(w => {
                    const z = parseInt(w.style.zIndex) || 0;
                    if (z > highestZ) highestZ = z;
                });
                window.style.zIndex = highestZ + 1;
                
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    window.style.left = (e.clientX - offsetX) + 'px';
                    window.style.top = (e.clientY - offsetY) + 'px';
                }
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
            });
        }
    });
    
    // Add window resize functionality (simplified)
    windows.forEach(window => {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        // For simplicity, we'll just add a maximize button effect
        const maximizeButton = window.querySelector('.control.maximize');
        if (maximizeButton) {
            maximizeButton.addEventListener('click', function() {
                const isMaximized = window.style.width === '100%';
                
                if (isMaximized) {
                    // Restore to original size
                    window.style.width = '700px';
                    window.style.height = '500px';
                    window.style.top = '100px';
                    window.style.left = '100px';
                } else {
                    // Maximize
                    window.style.width = 'calc(100% - 40px)';
                    window.style.height = 'calc(100% - 120px)';
                    window.style.top = '25px';
                    window.style.left = '20px';
                }
            });
        }
    });
    
    // Add some initial animations
    setTimeout(() => {
        document.querySelector('.dock').style.transform = 'translateX(-50%) scale(1)';
        document.querySelector('.dock').style.opacity = '1';
    }, 500);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Cmd + Space for Spotlight (just as an example)
    if (e.metaKey && e.key === ' ') {
        e.preventDefault();
        alert('Spotlight search would open here');
    }
});