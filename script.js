// Minimal JS: confetti on Stripe success + video click-to-play

function launchConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#6366f1', '#a855f7', '#ef4444', '#10b981', '#fbbf24'][Math.floor(Math.random() * 5)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confettiFall 3s ease-out forwards';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }, 250);
}

// Trigger confetti on Stripe success
if (window.location.search.includes('success=true')) {
    setTimeout(launchConfetti, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    // Update urgency badge month to current month
    const badge = document.querySelector('.pricing-card.featured .card-badge');
    if (badge) {
        const month = new Date().toLocaleString('en-US', { month: 'long' });
        badge.textContent = `⏳ Limited spots this ${month}`;
    }

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

    // Animated number counter on scroll
    const observerOptions = { threshold: 0.5, rootMargin: '0px' };
    const animateNumber = (element, target, suffix = '') => {
        const duration = 1500;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                if (text.includes('$1,200')) {
                    animateNumber(entry.target, 1200, '+');
                    setTimeout(() => entry.target.textContent = '$1,200+', 1500);
                } else if (text.includes('2-3x')) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 0.1;
                        if (count >= 3) {
                            entry.target.textContent = '2-3x';
                            clearInterval(interval);
                        } else {
                            entry.target.textContent = count.toFixed(1) + 'x';
                        }
                    }, 50);
                } else if (text.includes('48')) {
                    animateNumber(entry.target, 48, ' hours');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.roi-stat-number').forEach(el => numberObserver.observe(el));

    // Fun emoji bursts on ROI stats
    document.querySelectorAll('.roi-stat').forEach(stat => {
        stat.addEventListener('click', function(e) {
            const emoji = this.getAttribute('data-emoji');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const count = Math.floor(Math.random() * 4) + 5;
            for (let i = 0; i < count; i++) {
                const emojiEl = document.createElement('span');
                emojiEl.className = 'emoji-burst';
                emojiEl.textContent = emoji;
                emojiEl.style.left = x + 'px';
                emojiEl.style.top = y + 'px';
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = Math.random() * 80 + 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rotate = Math.random() * 360 - 180;
                emojiEl.style.setProperty('--tx', tx + 'px');
                emojiEl.style.setProperty('--ty', ty + 'px');
                emojiEl.style.setProperty('--rotate', rotate + 'deg');
                this.appendChild(emojiEl);
                setTimeout(() => emojiEl.remove(), 1000);
            }
        });
    });

    // Click-to-play with Loom fallback to demo video
    document.querySelectorAll('.video-thumb[data-loom-id]').forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            const loomId = this.getAttribute('data-loom-id');
            const demoUrl = this.getAttribute('data-demo-url');
            if (loomId && !loomId.startsWith('YOUR_LOOM_ID')) {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.loom.com/embed/${loomId}`;
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('webkitallowfullscreen', '');
                iframe.setAttribute('mozallowfullscreen', '');
                iframe.setAttribute('allowfullscreen', '');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                this.innerHTML = '';
                this.appendChild(iframe);
                this.style.cursor = 'default';
            } else if (demoUrl) {
                const video = document.createElement('video');
                video.src = demoUrl;
                video.controls = true;
                video.playsInline = true;
                video.muted = false;
                video.style.position = 'absolute';
                video.style.top = '0';
                video.style.left = '0';
                video.style.width = '100%';
                video.style.height = '100%';
                this.innerHTML = '';
                this.appendChild(video);
                this.style.cursor = 'default';
            }
        });
    });

    // Show audits sticky CTA on mobile when audits section is in view
    const auditSection = document.getElementById('audit-examples');
    if (auditSection) {
        const auditsStickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.innerWidth <= 768) {
                    document.body.classList.add('audits-in-view');
                } else {
                    document.body.classList.remove('audits-in-view');
                }
            });
        }, { threshold: 0.15 });
        auditsStickyObserver.observe(auditSection);
    }

    // Floating audit video: open/close and embed
    const floatingBtn = document.getElementById('floatingAudit');
    const floatingModal = document.getElementById('floatingAuditModal');
    const floatingBody = floatingModal ? floatingModal.querySelector('.floating-video-body') : null;
    const openFloating = () => {
        if (!floatingModal || !floatingBtn || !floatingBody) return;
        // Embed content
        const loomId = floatingBtn.getAttribute('data-loom-id');
        const demoUrl = floatingBtn.getAttribute('data-demo-url');
        floatingBody.innerHTML = '';
        if (loomId && !loomId.startsWith('YOUR_LOOM_ID')) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.loom.com/embed/${loomId}`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('webkitallowfullscreen', '');
            iframe.setAttribute('mozallowfullscreen', '');
            iframe.setAttribute('allowfullscreen', '');
            floatingBody.appendChild(iframe);
        } else if (demoUrl) {
            const video = document.createElement('video');
            video.src = demoUrl;
            video.controls = true;
            video.playsInline = true;
            floatingBody.appendChild(video);
        }
        floatingModal.classList.add('open');
        floatingModal.setAttribute('aria-hidden', 'false');
    };
    const closeFloating = () => {
        if (!floatingModal || !floatingBody) return;
        floatingModal.classList.remove('open');
        floatingModal.setAttribute('aria-hidden', 'true');
        floatingBody.innerHTML = '';
    };
    if (floatingBtn && floatingModal && floatingBody) {
        floatingBtn.addEventListener('click', openFloating);
        floatingModal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element && target.hasAttribute('data-close')) {
                closeFloating();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeFloating();
        });
    }

    // How it works: tiny pop on step numbers when in view (one time)
    const stepsGrid = document.querySelector('.steps-grid');
    if (stepsGrid) {
        const stepItems = Array.from(stepsGrid.querySelectorAll('.step-item'));
        let triggered = false;
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !triggered) {
                    triggered = true;
                    stepItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('pop');
                            setTimeout(() => item.classList.remove('pop'), 450);
                        }, i * 120);
                    });
                }
            });
        }, { threshold: 0.4 });
        stepsObserver.observe(stepsGrid);
    }

    // Timed free call popup (session-scoped)
    const modal = document.getElementById('callModal');
    const openModal = () => {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };
    if (modal && !sessionStorage.getItem('rtux_call_popup_shown')) {
        const timer = setTimeout(() => {
            sessionStorage.setItem('rtux_call_popup_shown', '1');
            openModal();
        }, 45000); // 45 seconds

        // Close handlers
        modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target instanceof Element && target.hasAttribute('data-close')) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
});

function toggleProcess() {
    const steps = document.getElementById('processSteps');
    const icon = document.getElementById('toggleIcon');
    
    steps.classList.toggle('open');
    icon.classList.toggle('open');
}

// removed duplicate confetti and DOMContentLoaded handlers; consolidated above
