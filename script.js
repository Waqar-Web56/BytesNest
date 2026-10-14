(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (year) year.textContent = new Date().getFullYear();

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  const setTheme = (theme) => {
    const light = theme === 'light';
    document.body.classList.toggle('light-theme', light);
    document.documentElement.style.colorScheme = light ? 'light' : 'dark';
    if (themeIcon) themeIcon.textContent = light ? '☾' : '☼';
    themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    try { localStorage.setItem('bytesnest-theme', theme); } catch (_) {}
  };
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('bytesnest-theme') || 'dark'; } catch (_) {}
  setTheme(savedTheme);
  themeToggle?.addEventListener('click', () => setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light'));

  const updateBackTop = () => backToTop?.classList.toggle('visible', window.scrollY > 450);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  // Scroll progress bar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  const updateBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  // Spotlight hover effect on service cards
  document.querySelectorAll('.service-card').forEach(card => card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // ---- Contact form ----
  // Default: opens WhatsApp or the email app with the message pre-filled (no backend needed).
  // Optional: set data-endpoint on the form to a Formspree URL to also send directly.
  if (form) {
    const msg = document.getElementById('message');
    const counter = document.getElementById('charCount');
    const setNote = (text, cls) => { if (formNote) { formNote.textContent = text; formNote.className = 'form-note' + (cls ? ' ' + cls : ''); } };
    const showError = (id, text) => {
      const el = form.querySelector('[data-for="' + id + '"]');
      const input = document.getElementById(id);
      if (el) el.textContent = text;
      input?.classList.toggle('invalid', !!text);
      input?.setAttribute('aria-invalid', text ? 'true' : 'false');
    };
    const validators = {
      name: v => v.trim().length < 2 ? 'Please enter your name.' : '',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
      phone: v => !v.trim() || /^[+()\d\s-]{7,20}$/.test(v.trim()) ? '' : 'Use digits, spaces, + or - only.',
      message: v => v.trim().length < 10 ? 'Please add a few more details (at least 10 characters).' : ''
    };
    const validate = () => {
      let firstBad = null;
      Object.keys(validators).forEach(id => {
        const err = validators[id](document.getElementById(id).value);
        showError(id, err);
        if (err && !firstBad) firstBad = id;
      });
      if (firstBad) document.getElementById(firstBad).focus();
      return !firstBad;
    };
    Object.keys(validators).forEach(id => {
      const el = document.getElementById(id);
      el.addEventListener('blur', () => showError(id, validators[id](el.value)));
      el.addEventListener('input', () => { if (el.classList.contains('invalid')) showError(id, validators[id](el.value)); });
    });
    msg?.addEventListener('input', () => { if (counter) counter.textContent = msg.value.length + ' / 1000'; });

    const buildText = () => {
      const f = id => document.getElementById(id).value.trim();
      const lines = ['Hi BytesNest, I would like to discuss a project.', '',
        'Name: ' + f('name'), 'Email: ' + f('email')];
      if (f('phone')) lines.push('Phone: ' + f('phone'));
      if (f('service')) lines.push('Service: ' + f('service'));
      if (f('budget')) lines.push('Budget: ' + f('budget'));
      lines.push('', 'Project details:', f('message'));
      return lines.join('\n');
    };

    let channel = 'whatsapp';
    form.querySelectorAll('button[type="submit"]').forEach(b => b.addEventListener('click', () => { channel = b.dataset.channel || 'whatsapp'; }));

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (form.querySelector('[name="_gotcha"]').value) return; // honeypot
      if (!validate()) { setNote('Please fix the highlighted fields.', 'err'); return; }
      const text = buildText();
      const endpoint = (form.dataset.endpoint || '').trim();

      if (endpoint) {
        const btns = form.querySelectorAll('button[type="submit"]');
        btns.forEach(b => b.classList.add('loading'));
        try {
          const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
          if (!res.ok) throw new Error('bad status');
          form.reset(); if (counter) counter.textContent = '0 / 1000';
          setNote('Thanks! Your message was sent. I will reply as soon as I can.', 'ok');
        } catch (_) {
          setNote('Could not send right now. Please use WhatsApp or email instead.', 'err');
        } finally { btns.forEach(b => b.classList.remove('loading')); }
        return;
      }

      if (channel === 'email') {
        const subject = 'Project inquiry from ' + document.getElementById('name').value.trim();
        window.location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
        setNote('Opening your email app… if nothing happens, write to ' + form.dataset.email + ' directly.', 'ok');
      } else {
        window.open('https://wa.me/' + form.dataset.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        setNote('Opening WhatsApp with your message ready to send.', 'ok');
      }
    });
  }
})();
