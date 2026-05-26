var navbar    = document.getElementById('navbar');
var hamburger = document.getElementById('hamburger');
var navMenu   = document.getElementById('navMenu');
var navLinks  = document.querySelectorAll('.nav-link');
var sections  = document.querySelectorAll('section');

// Abre e fecha menu mobile
hamburger.addEventListener('click', function() {
  var aberto = navMenu.classList.toggle('aberto');
  hamburger.classList.toggle('aberto', aberto);
  // Garante que o botão fica sempre por cima do menu
  hamburger.style.zIndex = aberto ? '10000' : '';
  document.body.style.overflow = aberto ? 'hidden' : '';
});

// Clique num link: fecha menu e navega
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = link.getAttribute('href');
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      navMenu.classList.remove('aberto');
      hamburger.classList.remove('aberto');
      hamburger.style.zIndex = '';
      document.body.style.overflow = '';
      var alvo = document.querySelector(href);
      if (alvo) {
        var offset = navbar.offsetHeight;
        var topo = alvo.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topo, behavior: 'smooth' });
      }
    }
  });
});

// Scroll: sombra no nav + link ativo
window.addEventListener('scroll', function() {
  navbar.style.boxShadow = window.pageYOffset > 40
    ? '0 4px 16px rgba(30,45,74,0.12)'
    : '0 2px 12px rgba(30,45,74,0.08)';

  var atual = '';
  sections.forEach(function(s) {
    if (window.pageYOffset >= s.offsetTop - navbar.offsetHeight - 30) {
      atual = s.id;
    }
  });

  navLinks.forEach(function(link) {
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
  });
});
