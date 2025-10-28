// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isCollapsed = nav.getAttribute('data-collapsed') === 'true';
    nav.setAttribute('data-collapsed', !isCollapsed);
    menuToggle.setAttribute('aria-expanded', isCollapsed);
  });
}

// Update year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
