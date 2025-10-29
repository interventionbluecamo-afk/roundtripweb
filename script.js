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
});
