// Midnight Ops / Dark CI/CD Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add CI/CD pipeline visualization
    addPipelineVisualization();
    
    // Add terminal effects to skill items
    enhanceSkillItems();
    
    // Add deployment status animations
    addDeploymentAnimations();
});

function addPipelineVisualization() {
    // Create a pipeline visualization above the skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const pipelineContainer = document.createElement('div');
        pipelineContainer.className = 'pipeline';
        pipelineContainer.innerHTML = `
            <div class="pipeline-step success">
                <div>DEV</div>
                <div class="status-success">✓</div>
            </div>
            <div class="pipeline-connector success"></div>
            <div class="pipeline-step running">
                <div>TEST</div>
                <div class="status-running">●</div>
            </div>
            <div class="pipeline-connector running"></div>
            <div class="pipeline-step pending">
                <div>STAGE</div>
                <div class="status-pending">○</div>
            </div>
            <div class="pipeline-connector"></div>
            <div class="pipeline-step pending">
                <div>PROD</div>
                <div class="status-pending">○</div>
            </div>
        `;
        skillsSection.parentNode.insertBefore(pipelineContainer, skillsSection);
    }
}

function enhanceSkillItems() {
    // Add terminal-style effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        // Add a terminal-style prefix to each skill
        const originalText = skill.textContent;
        skill.innerHTML = `<span class="terminal-info">[DEVOPS]</span> ${originalText}`;
        
        // Add click effect to copy to clipboard
        skill.addEventListener('click', function() {
            // Visual feedback
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = 'rgba(46, 160, 67, 0.3)';
            setTimeout(() => {
                this.style.backgroundColor = originalBg;
            }, 300);
        });
    });
}

function addDeploymentAnimations() {
    // Add subtle deployment animations to job items
    const jobItems = document.querySelectorAll('.job');
    jobItems.forEach((job, index) => {
        // Add a subtle glow effect based on deployment status
        setTimeout(() => {
            job.style.animation = 'fadeIn 0.5s ease-in';
        }, index * 200); // Stagger the animations
    });
}

// Add a "Stealth Mode" toggle as requested in the requirements
function addStealthMode() {
    // Create stealth mode toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Stealth Mode';
    toggleBtn.className = 'btn btn-secondary';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.zIndex = '1000';
    toggleBtn.style.padding = '8px 15px';
    
    let stealthActive = false;
    toggleBtn.addEventListener('click', function() {
        stealthActive = !stealthActive;
        if (stealthActive) {
            document.body.style.filter = 'brightness(0.7) contrast(1.2)';
            // Reduce all animations
            document.body.classList.add('stealth-mode');
            this.textContent = 'Stealth ON';
            this.style.backgroundColor = 'rgba(248, 81, 73, 0.2)';
        } else {
            document.body.style.filter = '';
            document.body.classList.remove('stealth-mode');
            this.textContent = 'Stealth Mode';
            this.style.backgroundColor = '';
        }
    });
    
    document.body.appendChild(toggleBtn);
}

// Initialize stealth mode after DOM is fully loaded
window.addEventListener('load', addStealthMode);