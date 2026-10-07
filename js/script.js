document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.getElementById('nav-links');
  const links = [...navLinks.querySelectorAll('a')];

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const setMenu = (open) => {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  links.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Header scroll effect
  const onScroll = () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(5, 6, 8, 0.95)';
      header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
      header.style.padding = '0';
    } else {
      header.style.background = 'rgba(5, 6, 8, 0.8)';
      header.style.boxShadow = 'none';
      header.style.padding = '10px 0';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active section highlighting
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => {
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => s && sectionObserver.observe(s));

  // Elegant reveal animation
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { 
        entry.target.classList.add('visible'); 
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // Contact form handling
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.')
  };

  const validateField = (field) => {
    const error = rules[field.name](field.value);
    document.getElementById(field.name + '-error').textContent = error;
    return !error;
  };

  if (form) {
    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener('blur', (e) => validateField(e.target));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      const results = Object.keys(rules).map((name) => validateField(form.elements[name]));
      
      if (results.includes(false)) return;
      
      status.textContent = 'Message sent successfully. I will get back to you soon.';
      form.reset();
    });
  }
});
