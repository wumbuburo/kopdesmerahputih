// Mobile menu toggle with improved accessibility
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

const toggleMenu = () => {
  const isActive = mainNav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isActive);
  menuToggle.classList.toggle('active'); // Ini sudah ada di CSS Anda
  header.classList.toggle('menu-active'); // Tambahkan ini
  
  menuToggle.innerHTML = isActive 
    ? '<i class="fas fa-times" aria-hidden="true"></i>' 
    : '<i class="fas fa-bars" aria-hidden="true"></i>';
  
  document.body.style.overflow = isActive ? 'hidden' : '';
};

menuToggle.addEventListener('click', toggleMenu);

// Close mobile menu when clicking on a link (delegated event)
document.addEventListener('click', (e) => {
  if (window.innerWidth >= 768) return;
  
  if (e.target.closest('nav a')) {
    mainNav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
  }
});

// Enhanced smooth scrolling with offset calculation
const smoothScroll = (e) => {
  if (e.target.closest('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: targetPosition - headerHeight,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      history.pushState(null, null, targetId);
    }
  }
};

document.addEventListener('click', smoothScroll);

// Optimized scroll effects with throttling
let lastScroll = 0;
const header = document.querySelector('header');

const handleScroll = () => {
  // Header shadow effect
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    header.style.boxShadow = currentScroll > lastScroll 
      ? '0 5px 15px rgba(0,0,0,0.2)' 
      : '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
  
  // Animation on scroll
  const elements = document.querySelectorAll('section, .footer-container');
  const triggerPoint = window.innerHeight * 0.75;
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    element.style.opacity = elementTop < triggerPoint ? 1 : 0;
    element.style.transform = elementTop < triggerPoint ? 'translateY(0)' : 'translateY(20px)';
  });
};

// Initialize with requestAnimationFrame for better performance
const initAnimations = () => {
  document.querySelectorAll('section, .footer-container').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });
  
  requestAnimationFrame(() => {
    handleScroll();
  });
};

// Improved viewport height calculation for mobile
const setVhUnit = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Debounce resize events
let resizeTimeout;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setVhUnit();
    handleScroll();
  }, 100);
};

// Event listeners with passive where possible
window.addEventListener('load', initAnimations, { passive: true });
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleResize, { passive: true });

// Initial setup
setVhUnit();
menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
menuToggle.setAttribute('aria-controls', 'mainNav');