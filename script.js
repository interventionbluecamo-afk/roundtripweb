document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  const yearEl = document.getElementById('year');
  const auditTop = document.getElementById('cta-audit-top');
  const auditInline = document.getElementById('cta-audit-inline');
  const auditBottom = document.getElementById('cta-audit-bottom');
  const auditSticky = document.getElementById('cta-audit-sticky');
  const CONTACT_EMAIL = 'hello@roundtripux.com';
  const planButtons = document.querySelectorAll('[data-mailto-plan]');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function openNav() {
    nav.setAttribute('data-collapsed', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    nav.setAttribute('data-collapsed', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return nav.getAttribute('data-collapsed') === 'false';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      isOpen() ? closeNav() : openNav();
    });

    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        closeNav();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        closeNav();
        toggle.focus();
      }
    });

    // Close the menu when resizing to desktop to ensure accurate state
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener('change', (ev) => {
      if (ev.matches) {
        closeNav();
      }
    });
  }

  function buildAuditMailto() {
    const subject = encodeURIComponent('Free 2‑minute video audit request');
    const currentUrl = window.location.href;
    const body = encodeURIComponent([
      `Website URL: ${currentUrl}`,
      'Monthly traffic (approx): ',
      'Main goal (calls/bookings): ',
      '',
      'Extra context: '
    ].join('\n'));
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  [auditTop, auditInline, auditBottom, auditSticky].forEach((el) => {
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = buildAuditMailto();
      });
    }
  });

  planButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = el.getAttribute('data-mailto-plan') || 'Selected Plan';
      const subject = encodeURIComponent(`Round Trip UX — ${plan}`);
      const currentUrl = window.location.href;
      const body = encodeURIComponent([
        `I'm interested in: ${plan}`,
        `Website URL: ${currentUrl}`,
        'Monthly traffic (approx): ',
        'Main goal (calls/bookings): ',
        '',
        'Extra context: '
      ].join('\n'));
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  });
});


