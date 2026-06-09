document.addEventListener('DOMContentLoaded', () => {

  /*  1. Navbar: scroll shadow + active link  */
  const navbar   = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /*  2. Mobile nav: close on link click  */
  const navMenu = document.getElementById('navMenu');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        let bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (!bsCollapse) {
          bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });
        }
        bsCollapse.hide();
      }
    });
  });


  /*  3. Typewriter — looping JS-driven animation  */
  const twEl = document.getElementById('typewriter');
  const phrases = [
    'I build backends that think.',
    'I craft APIs that scale.',
    'I turn ideas into products.',
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (twEl && !prefersReducedMotion) {
    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;

    const TYPE_SPEED   = 60;
    const DELETE_SPEED = 35;
    const PAUSE_END    = 1800;
    const PAUSE_START  = 400;

    function tick() {
      const current = phrases[phraseIndex];

      if (!isDeleting) {
        charIndex++;
        twEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(tick, PAUSE_END);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        twEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_START);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    }

    twEl.textContent = '';
    setTimeout(tick, 600);

  } else if (twEl) {
    twEl.textContent = phrases[0];
    const cursor = document.querySelector('.tw-cursor');
    if (cursor) cursor.style.animation = 'none';
  }

});
