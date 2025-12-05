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
    
    // Function to open a window with specified title and content
    window.openWindow = function(title, content) {
        document.getElementById('window-title').textContent = title;
        document.getElementById('window-content').innerHTML = '<div class="file-content">' + content + '</div>';
        document.getElementById('window').style.display = 'block';
    }

    // Function to close the window
    window.closeWindow = function() {
        document.getElementById('window').style.display = 'none';
    }

    // Make the document window draggable
    const docWindow = document.getElementById('window');
    const docHeader = document.querySelector('.window-header');
    
    let isDocDragging = false;
    let docCurrentX;
    let docCurrentY;
    let docInitialX;
    let docInitialY;
    let docXOffset = 0;
    let docYOffset = 0;
    
    if(docHeader) {
        docHeader.addEventListener("mousedown", docDragStart);
    }
    
    document.addEventListener("mouseup", docDragEnd);
    document.addEventListener("mousemove", docDrag);
    
    function docDragStart(e) {
        docInitialX = e.clientX - docXOffset;
        docInitialY = e.clientY - docYOffset;
        
        if (e.target === docHeader || e.target.parentElement === docHeader) {
            isDocDragging = true;
        }
    }
    
    function docDragEnd() {
        docInitialX = docCurrentX;
        docInitialY = docCurrentY;
        isDocDragging = false;
    }
    
    function docDrag(e) {
        if (isDocDragging) {
            e.preventDefault();
            
            docCurrentX = e.clientX - docInitialX;
            docCurrentY = e.clientY - docInitialY;
            
            docXOffset = docCurrentX;
            docYOffset = docCurrentY;
            
            setDocTranslate(docCurrentX, docCurrentY, docWindow);
        }
    }
    
    function setDocTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
});