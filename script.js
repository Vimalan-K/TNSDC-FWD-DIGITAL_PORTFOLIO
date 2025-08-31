// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

// Counter animation
function animateCounter(element, target, duration = 2000, suffix = '+') {
   let start = 0;
   const increment = target / (duration / 16);
   
   function updateCounter() {
      start += increment;
      if (start < target) {
         if (suffix === '%') {
            element.textContent = start.toFixed(1) + suffix;
         } else if (suffix.includes('M')) {
            element.textContent = Math.floor(start) + suffix;
         } else {
            element.textContent = Math.floor(start).toLocaleString() + suffix;
         }
         requestAnimationFrame(updateCounter);
      } else {
         if (suffix === '%') {
            element.textContent = target + suffix;
         } else if (suffix.includes('M')) {
            element.textContent = target + suffix;
         } else {
            element.textContent = target.toLocaleString() + suffix;
         }
      }
   }
   
   updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
         
         // Animate counters when they come into view
         if (entry.target.classList.contains('stat-number')) {
            const text = entry.target.textContent;
            let number, suffix;
            
            if (text.includes('280M')) {
               number = 280;
               suffix = 'M';
            } else if (text.includes('12M')) {
               number = 12;
               suffix = 'M+';
            } else if (text.includes('3M')) {
               number = 3;
               suffix = 'M';
            } else if (text.includes('99.9%')) {
               number = 99.9;
               suffix = '%';
            } else if (text.includes('B')) {
               number = parseInt(text.replace(/[^\d]/g, ''));
               suffix = 'B+';
            } else {
               number = parseInt(text.replace(/[^\d]/g, ''));
               suffix = '+';
            }
            
            animateCounter(entry.target, number, 2000, suffix);
         }
      }
   });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .project-card, .timeline-item, .stat-number').forEach(el => {
   el.style.opacity = '0';
   el.style.transform = 'translateY(30px)';
   el.style.transition = 'all 0.6s ease';
   observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
   const navbar = document.querySelector('.navbar');
   if (window.scrollY > 100) {
      navbar.style.background = 'rgba(27, 94, 32, 0.98)';
   } else {
      navbar.style.background = 'rgba(27, 94, 32, 0.95)';
   }
});

// Loading animation for hero stats
window.addEventListener('load', () => {
   setTimeout(() => {
      const heroStats = document.querySelectorAll('.hero-stats .stat-number');
      heroStats.forEach((stat, index) => {
         setTimeout(() => {
            const text = stat.textContent;
            let number, suffix;
            
            if (text.includes('B')) {
               number = 8;
               suffix = 'B+';
            } else if (text.includes('13')) {
               number = 13000;
               suffix = '+';
            } else if (text.includes('8,000')) {
               number = 8000;
               suffix = '+';
            } else if (text.includes('68')) {
               number = 68000;
               suffix = '+';
            }
            
            if (number) {
               animateCounter(stat, number, 2000, suffix);
            }
         }, index * 200);
      });
   }, 1000);
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
const revealSection = function(entries, observer) {
   const [entry] = entries;
   
   if (!entry.isIntersecting) return;
   
   entry.target.classList.remove('section-hidden');
   observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
   root: null,
   threshold: 0.15,
});

revealSections.forEach(function(section) {
   sectionObserver.observe(section);
   section.classList.add('section-hidden');
});

// Navbar toggle functionality
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
   navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
   });
}

// Close navbar on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
   link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
         navbarCollapse.classList.remove('show');
      }
   });
});

// Add active class to navigation links
window.addEventListener('scroll', () => {
   const sections = document.querySelectorAll('section[id]');
   const navLinks = document.querySelectorAll('.nav-link');
   
   let current = '';
   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
         current = section.getAttribute('id');
      }
   });
   
   navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
         link.classList.add('active');
      }
   });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('animate');
      }
   });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
   timelineObserver.observe(item);
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .project-card').forEach(card => {
   card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
   });
   
   card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
   });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
   const scrolled = window.pageYOffset;
   const parallax = document.querySelector('.hero-section');
   const speed = scrolled * 0.5;
   
   if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`;
   }
});

// Add loading class to body
document.addEventListener('DOMContentLoaded', function() {
   document.body.classList.add('loaded');
});

// Footer year update
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('footer p');
if (footerYear && currentYear > 2024) {
   footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}