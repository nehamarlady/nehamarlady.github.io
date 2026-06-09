document.addEventListener("DOMContentLoaded", () => {
  /*  1. Navbar: scroll shadow + active link  */
  const navbar = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /*  2. Mobile nav: close on link click  */
  const navMenu = document.getElementById("navMenu");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        let bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (!bsCollapse) {
          bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });
        }
        bsCollapse.hide();
      }
    });
  });

  /*  3. Typewriter — looping JS-driven animation  */
  const twEl = document.getElementById("typewriter");
  const phrases = [
    "Build",
    "Scale",
    "Innovate",
  ];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (twEl && !prefersReducedMotion) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 60;
    const DELETE_SPEED = 35;
    const PAUSE_END = 1800;
    const PAUSE_START = 400;

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

    twEl.textContent = "";
    setTimeout(tick, 600);
  } else if (twEl) {
    // Reduced motion: show static text, toggle CSS class to stop cursor blinking
    twEl.textContent = phrases[0];
    document.querySelector(".tw-cursor")?.classList.add("tw-cursor--hidden");
  }

  /*  4. Scroll-reveal animation  */

  const revealElements = document.querySelectorAll(
    ".project-card, .about-avatar-wrap, .stat-chip, .accordion-item, .contact-card",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.replace("reveal-hidden", "revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach((el, i) => {
    // Only the dynamic stagger delay lives here — everything else is in CSS
    el.style.setProperty("--reveal-delay", `${i * 0.05}s`);
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
  });

  /*  5. Contact form validation & submission  */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const formSuccess = document.getElementById("formSuccess");
  const formError = document.getElementById("formError");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      formSuccess.classList.add("d-none");
      formError.classList.add("d-none");

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const subject = document.getElementById("contactSubject").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      btnText.classList.add("d-none");
      btnSpinner.classList.remove("d-none");
      submitBtn.disabled = true;

      try {
        const response = await fetch("https://formspree.io/f/meewgdwa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        btnText.classList.remove("d-none");
        btnSpinner.classList.add("d-none");
        submitBtn.disabled = false;

        if (response.ok) {
          formSuccess.classList.remove("d-none");
          form.reset();
          form.classList.remove("was-validated");
          formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
          setTimeout(() => formSuccess.classList.add("d-none"), 6000);
        } else {
          formError.classList.remove("d-none");
        }
      } catch (err) {
        btnText.classList.remove("d-none");
        btnSpinner.classList.add("d-none");
        submitBtn.disabled = false;
        formError.classList.remove("d-none");
      }
    });
  }
});
