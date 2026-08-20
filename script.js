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

  // 6. Blog Search & Category Filtering Functionality
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogItems = document.querySelectorAll('.blog-post-item');

  if (blogSearchInput && blogItems.length > 0) {
    blogSearchInput.addEventListener('input', () => {
      const query = blogSearchInput.value.toLowerCase().trim();
      blogItems.forEach(item => {
        const title = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
        const excerpt = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
        if (title.includes(query) || excerpt.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});

// Category Filter Helper Function
function filterBlogs(cat) {
  const items = document.querySelectorAll('.blog-post-item');
  const catButtons = document.querySelectorAll('.cat-chip');

  catButtons.forEach(btn => btn.classList.remove('active'));
  
  // Highlight clicked button
  event.target.classList.add('active');

  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (cat === 'all' || itemCat === cat) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

