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
  if (event && event.target) {
    event.target.classList.add('active');
  }

  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (cat === 'all' || itemCat === cat) {
      item.dataset.filterHidden = 'false';
    } else {
      item.dataset.filterHidden = 'true';
    }
  });

  currentBlogPage = 1;
  renderBlogPagination();
}

// 7. Interactive Blog Grid Pagination (6 Posts per page: 3 columns x 2 rows)
let currentBlogPage = 1;
const blogPostsPerPage = 6;

function renderBlogPagination() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;
  
  const allCards = Array.from(grid.querySelectorAll('.blog-post-item'));
  const visibleCards = allCards.filter(card => card.dataset.filterHidden !== 'true');
  
  const totalPages = Math.max(1, Math.ceil(visibleCards.length / blogPostsPerPage));
  
  if (currentBlogPage > totalPages) currentBlogPage = totalPages;
  if (currentBlogPage < 1) currentBlogPage = 1;

  allCards.forEach(card => {
    if (card.dataset.filterHidden === 'true') {
      card.style.display = 'none';
    }
  });

  visibleCards.forEach((card, index) => {
    const startIdx = (currentBlogPage - 1) * blogPostsPerPage;
    const endIdx = startIdx + blogPostsPerPage;
    if (index >= startIdx && index < endIdx) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  const pagNav = document.getElementById('blogPagination');
  if (pagNav) {
    if (totalPages <= 1) {
      pagNav.style.display = 'none';
    } else {
      pagNav.style.display = 'flex';
      let pagHtml = `<button class="pagination-btn ${currentBlogPage === 1 ? 'disabled' : ''}" onclick="changeBlogPage(-1)" ${currentBlogPage === 1 ? 'disabled' : ''}>&laquo; Previous</button>`;
      
      for (let i = 1; i <= totalPages; i++) {
        pagHtml += `<button class="pagination-num ${i === currentBlogPage ? 'active' : ''}" onclick="setBlogPage(${i})">${i}</button>`;
      }
      
      pagHtml += `<button class="pagination-btn ${currentBlogPage === totalPages ? 'disabled' : ''}" onclick="changeBlogPage(1)" ${currentBlogPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
      pagNav.innerHTML = pagHtml;
    }
  }
}

function setBlogPage(pageNum) {
  currentBlogPage = pageNum;
  renderBlogPagination();
  const grid = document.getElementById('blogGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function changeBlogPage(direction) {
  currentBlogPage += direction;
  renderBlogPagination();
  const grid = document.getElementById('blogGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogPagination();
});


