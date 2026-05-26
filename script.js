const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu  = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Abre/fecha menu mobile
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('aberto');
  navMenu.classList.toggle('aberto');
});

// Fecha menu ao clicar num link + scroll suave
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      hamburger.classList.remove('aberto');
      navMenu.classList.remove('aberto');
      const alvo = document.querySelector(href);
      if (alvo) {
        const offset = navbar.offsetHeight;
        const topo = alvo.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topo, behavior: 'smooth' });
      }
    }
  });
});

// Destaca link ativo + encolhe nav ao rolar
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 40
    ? '0 4px 24px rgba(0,0,0,0.4)'
    : 'none';

  let atual = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - navbar.offsetHeight - 20) {
      atual = s.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
  });
});
