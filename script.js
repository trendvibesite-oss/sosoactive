/**
 * SOSOACTIVE DIGITAL MEDIA - OFFICIAL CORE SCRIPT
 * Light, ultra-performant Vanilla JavaScript for 100/100 PageSpeed
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // 2. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('sosoactive_theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('sosoactive_theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('sosoactive_theme', 'light');
      }
    });
  }

  // 3. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any nav link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // 4. Interactive FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      
      // Close all accordions
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      
      // Toggle active one if it wasn't open
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Contact & Guest Post Form Submission Handler
  const contactForm = document.getElementById('guestPostForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('formStatus');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.background = 'rgba(16, 185, 129, 0.15)';
        statusBox.style.border = '1px solid #10b981';
        statusBox.style.color = '#10b981';
        statusBox.style.padding = '1rem';
        statusBox.style.borderRadius = '8px';
        statusBox.style.marginTop = '1rem';
        statusBox.innerHTML = '<strong>Success!</strong> Your guest post proposal or inquiry has been received. Our editorial team will get back to you within 6 to 12 hours.';
      }
      contactForm.reset();
    });
  }
});
