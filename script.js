// ============ MOBILE NAV ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink(){
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if(link){
      if(scrollPos >= top && scrollPos < top + height){
        navItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ============ NAVBAR BACKGROUND ON SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 20){
    navbar.style.background = 'rgba(0,0,0,0.85)';
  } else {
    navbar.style.background = 'rgba(0,0,0,0.55)';
  }
});

// ============ SCROLL-TRIGGERED FADE ANIMATIONS ============
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
