// 1. Navbar shadow when page is scrolled
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// 2. Hamburger mobile menu toggle
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
  var isOpen = mobileMenu.classList.toggle('open');
  hamburger.textContent = isOpen ? '✕' : '☰';
});

// Close mobile menu when a link is clicked
var mobLinks = document.querySelectorAll('.mob-link');
mobLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    hamburger.textContent = '☰';
  });
});


// 3. Scroll-to-top button
var scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// 4. Project cards fade in when scrolled into view
var projectCards = document.querySelectorAll('.project-card');

var cardObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var card  = entry.target;
      var delay = parseInt(card.getAttribute('data-index')) * 200;
      setTimeout(function () {
        card.classList.add('visible');
      }, delay);
      cardObserver.unobserve(card);
    }
  });
}, { threshold: 0.15 });

projectCards.forEach(function (card) {
  cardObserver.observe(card);
});


// 5. Highlight active nav link based on scroll position
var sections   = document.querySelectorAll('section[id]');
var navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  var scrollPos = window.scrollY + 100;

  sections.forEach(function (section) {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navAnchors.forEach(function (a) {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + section.id) {
          a.classList.add('active');
        }
      });
    }
  });
});


// 6. Skill card click flash effect
var skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(function (card) {
  card.addEventListener('click', function () {
    this.style.borderColor = '#ff6584';
    this.style.boxShadow   = '0 0 16px rgba(255,101,132,0.3)';
    var self = this;
    setTimeout(function () {
      self.style.borderColor = '';
      self.style.boxShadow   = '';
    }, 600);
  });
});


// 7. Typing effect for hero tagline
var words   = ['Developer.', 'Problem Solver.', 'CS Student.', 'Tech Enthusiast.'];
var typedEl = document.getElementById('typed-text');
var wIndex  = 0;
var cIndex  = 0;
var deleting = false;

function typeEffect() {
  var current = words[wIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, cIndex + 1);
    cIndex++;
    if (cIndex === current.length) {
      setTimeout(function () {
        deleting = true;
        typeEffect();
      }, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, cIndex - 1);
    cIndex--;
    if (cIndex === 0) {
      deleting = false;
      wIndex   = (wIndex + 1) % words.length;
    }
  }

  var speed = deleting ? 70 : 110;
  setTimeout(typeEffect, speed);
}

// Start typing after 1 second
setTimeout(typeEffect, 1000);