// Ubuntu 24 GNOME Desktop Simulation
document.addEventListener('DOMContentLoaded', function() {
    // Simulate typing effect in terminal
    const terminalOutput = document.querySelector('.terminal-output');
    const prompts = document.querySelectorAll('.terminal-prompt');
    
    // Add click functionality to desktop icons
    const iconWrappers = document.querySelectorAll('.icon-wrapper');
    iconWrappers.forEach(icon => {
        icon.addEventListener('click', function() {
            const label = this.querySelector('.icon-label').textContent;
            alert(`Opening ${label}...`);
        });
    });
    
    // Add click functionality to dock icons
    const dockIcons = document.querySelectorAll('.dock-icon');
    dockIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Update system clock
    function updateClock() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            day: '2-digit', 
            month: 'short',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        };
        const dateTimeStr = now.toLocaleDateString('en-US', options)
            .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2 $1, $3')
            .replace(/(\w+ \d+), (\d{4})/, '$1 $3')
            .replace(/(\d+:\d+)\s*AM|PM/, (match, time) => time + (now.getHours() >= 12 ? ' PM' : ' AM'));
        
        document.querySelector('.date-time').textContent = dateTimeStr;
    }
    
    // Initialize and update clock every minute
    updateClock();
    setInterval(updateClock, 60000);
    
    // Add terminal interaction simulation
    terminalOutput.addEventListener('click', function() {
        const lastPrompt = document.querySelector('.terminal-prompt:last-child');
        if (lastPrompt && !lastPrompt.textContent.includes('$ $')) {
            const newPrompt = document.createElement('div');
            newPrompt.className = 'terminal-prompt';
            newPrompt.innerHTML = '<span class="prompt-user">user</span>@<span class="prompt-host">ubuntu</span>:<span class="prompt-path">~</span>$ ';
            terminalOutput.appendChild(newPrompt);
            newPrompt.scrollIntoView();
        }
    });
    
    // Add window dragging functionality
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalHeader = document.querySelector('.terminal-header');
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    terminalHeader.addEventListener("mousedown", dragStart);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", drag);
    
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === terminalHeader || e.target.classList.contains('window-title') || 
            e.target.classList.contains('window-buttons') || e.target.classList.contains('close-btn') ||
            e.target.classList.contains('minimize-btn') || e.target.classList.contains('maximize-btn')) {
            isDragging = true;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        
        isDragging = false;
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, terminalWindow);
        }
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
    
    // Add window button functionality
    document.querySelector('.close-btn').addEventListener('click', function() {
        terminalWindow.style.display = 'none';
    });
    
    document.querySelector('.minimize-btn').addEventListener('click', function() {
        terminalWindow.style.height = '30px';
        terminalWindow.querySelector('.terminal-content').style.display = 'none';
    });
});