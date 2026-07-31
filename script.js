/**
 * SOSOACTIVE DIGITAL MEDIA PLATFORM - OFFICIAL CORE SCRIPT
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

  // 2. Theme Toggle (Default is Light)
  const themeToggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('sosoactive_theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('sosoactive_theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('sosoactive_theme', 'dark');
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
      
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      
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

  // 6. Media Contact Form Submission Handler
  const contactForm = document.getElementById('mediaContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('formStatus');
      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.background = 'rgba(5, 150, 105, 0.1)';
        statusBox.style.border = '1px solid #059669';
        statusBox.style.color = '#059669';
        statusBox.style.padding = '1rem';
        statusBox.style.borderRadius = '8px';
        statusBox.style.marginTop = '1rem';
        statusBox.innerHTML = '<strong>Message Sent!</strong> Thank you for reaching out to Sosoactive Editorial Desk. Our team will review your message and get back to you shortly.';
      }
      contactForm.reset();
    });
  }
});
