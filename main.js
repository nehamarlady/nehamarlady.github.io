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
      // Only act when the menu is actually open (mobile)
      if (navMenu.classList.contains('show')) {
        // Use Bootstrap's API — get existing instance or create one
        let bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (!bsCollapse) {
          bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });
        }
        bsCollapse.hide();
      }
    });
  });

});
