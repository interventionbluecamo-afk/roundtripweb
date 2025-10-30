function toggleProcess() {
    const steps = document.getElementById('processSteps');
    const icon = document.getElementById('toggleIcon');
    
    steps.classList.toggle('open');
    icon.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
    // Auto-open process steps on mobile for better UX
    if (window.innerWidth <= 768) {
        const steps = document.getElementById('processSteps');
        const icon = document.getElementById('toggleIcon');
        if (steps && icon) {
            steps.classList.add('open');
            icon.classList.add('open');
        }
    }
    
    // Update year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Fun emoji bursts on ROI stats
    const roiStats = document.querySelectorAll('.roi-stat');
    
    roiStats.forEach(stat => {
        stat.addEventListener('click', function(e) {
            const emoji = this.getAttribute('data-emoji');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create 5-8 emojis
            const count = Math.floor(Math.random() * 4) + 5;
            
            for (let i = 0; i < count; i++) {
                const emojiEl = document.createElement('span');
                emojiEl.className = 'emoji-burst';
                emojiEl.textContent = emoji;
                emojiEl.style.left = x + 'px';
                emojiEl.style.top = y + 'px';
                
                // Random direction and rotation
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = Math.random() * 80 + 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rotate = Math.random() * 360 - 180;
                
                emojiEl.style.setProperty('--tx', tx + 'px');
                emojiEl.style.setProperty('--ty', ty + 'px');
                emojiEl.style.setProperty('--rotate', rotate + 'deg');
                
                this.appendChild(emojiEl);
                
                // Remove after animation
                setTimeout(() => emojiEl.remove(), 1000);
            }
        });
    });

});
