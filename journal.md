# Development Journal — Personal Portfolio Website

**Student:** Neha Marlady
**Course:** Web Development — Portland State University
**GitHub Repo:** https://github.com/nehamarlady/nehamarlady.github.io
**Deployed Site:** https://nehamarlady.github.io

---

## Session 1 — Project Setup, HTML Structure & Bootstrap Navbar


### What I Built

- Created the project folder structure with three files: `index.html`, `styles.css`, and `main.js`
- Linked Bootstrap 5.3.2 CSS via CDN in `<head>` and added both the Bootstrap JS bundle and `main.js` using the `defer` attribute so scripts load without blocking page render
- Added Google Fonts — Space Grotesk, Inter, and JetBrains Mono — via `<link rel="preconnect">` and `<link>` tags in `<head>`
- Wrote the full HTML skeleton with all five sections: navbar, hero, about, experience, projects, contact and footer
- Built the sticky navbar using Bootstrap's `navbar`, `navbar-expand-lg`, and `fixed-top` classes. The brand mark is "NM." where the dot is styled teal using `.brand-dot { color: var(--teal) }`
- Added the hamburger toggle for mobile using `data-bs-toggle="collapse"` and `data-bs-target="#navMenu"` with `aria-controls` and `aria-expanded` attributes
- Navbar links: About, Experience, Projects, Contact — each is an anchor link to a section `id`

### Issues & How I Fixed Them

- **Scripts in `<head>` without `defer`:** Initially placed `<script>` tags in `<head>` without `defer`. JS ran before the DOM existed so `getElementById()` returned `null` and nothing worked. Fixed by adding the `defer` attribute to both script tags — the browser downloads them in the background and only executes them after the DOM is fully parsed, without blocking render.
- **Bootstrap navbar default white background:** Bootstrap's default navbar background clashed with the dark theme. Fixed with a custom CSS rule: `background: rgba(15, 23, 42, 0.82)` and `backdrop-filter: blur(16px)` so it is semi-transparent and blurs content behind it.

### Sources Used

- [Bootstrap 5.3 Docs — Navbar](https://getbootstrap.com/docs/5.3/components/navbar/)
- [Bootstrap 5.3 Docs — Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Google Fonts](https://fonts.google.com/)

---

## Session 2 — CSS Design Tokens, Hero Section & Typewriter Animation



### What I Built

- Defined all colours, fonts, and spacing as CSS custom properties in `:root {}`. For example: `--navy: #0f172a`, `--teal: #14b8a6`, `--muted: #b8c7d9`, `--font-display: "Space Grotesk"`. Changing the entire palette only requires editing one place.
- Styled the hero section with a dot-grid background using `radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)` tiled at `32px 32px`, and a teal ambient glow using a `::before` pseudo-element with `position: absolute`
- Centred the hero on desktop using `justify-content-center` on the Bootstrap row and `text-center` on the column. The `.hero-sub` paragraph uses `mx-auto` with `max-width: 560px`
- The typewriter line is an `<h2 class="typewriter-line">` containing two sibling spans: `<span id="typewriter" class="typewriter-text">` for the text content and `<span class="tw-cursor">|</span>` for the blinking cursor. Keeping them as separate elements means the cursor always sits right next to the last typed character
- Built a looping JS typewriter in `main.js` using `setTimeout()` and a `tick()` function. The `phrases` array is `["Build", "Scale", "Innovate"]`. The function increments `charIndex` to reveal characters and decrements it to delete, cycling through phrases with `phraseIndex = (phraseIndex + 1) % phrases.length`
- Cursor blink is a CSS `@keyframes` animation on `opacity` — no JS needed
- Added a `prefers-reduced-motion` check: `window.matchMedia("(prefers-reduced-motion: reduce)").matches`. If true, the first phrase is shown statically and `.tw-cursor--hidden` class is added to hide the cursor

### Issues & How I Fixed Them

- **CSS typewriter only ran once:** First attempt used a CSS animation (`max-width: 0 → 100%`) with `animation-fill-mode: forwards`. This plays once and stops. Fixed by rewriting as a JS `setTimeout()` loop with an `isDeleting` boolean flag that cycles through phrases indefinitely.
- **Cursor stuck at far right edge:** The cursor was always at the far right of the element, not next to the typed text. Root cause: the typewriter span was `display: block` inside an `h1`, so its width was always 100% of the container. Fixed by moving the typewriter to its own `<h2 class="typewriter-line">` so the span's width matches the actual text content.
- **Layout jumping when text was empty:** Between phrases when the span is empty, the line collapsed to zero height causing content below to jump. Fixed by adding `min-height: 1.2em` to `.typewriter-line` to always reserve vertical space.

### Sources Used

- [MDN — CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Tricks — Complete Guide to Custom Properties](https://css-tricks.com/a-complete-guide-to-custom-properties/)
- [MDN — setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## Session 3 — About Section, Avatar Ring Animation & Bootstrap Accordion


### What I Built

- Built the about section with a two-column Bootstrap grid: `col-lg-4` for the photo and `col-lg-8` for the text. On mobile Bootstrap stacks them automatically
- The avatar column uses `d-flex justify-content-center` so the photo is always horizontally centred at every screen size
- Added the GitHub avatar inside `.about-avatar-wrap` — a `position: relative; display: flex` container with explicit `width: 200px; height: 200px`
- Created a spinning dashed ring using an empty `<div class="avatar-ring">` inside the wrapper. It is `position: absolute` with `top: -10px; left: -10px; width: calc(100% + 20px); height: calc(100% + 20px)` so it is always 20px larger than the photo. Animated with:
  ```css
  animation: spin-slow 36s linear infinite;
  @keyframes spin-slow { to { transform: rotate(360deg) } }
  ```
- Built the Experience section using Bootstrap 5's **Accordion** component — not covered in class. Each job role is an `accordion-item` containing an `accordion-button` (the clickable header) and `accordion-collapse` (the body panel). `data-bs-parent="#experienceAccordion"` ensures only one panel is open at a time
- Overrode Bootstrap's default accordion white background and dark text to match the navy theme using `.custom-accordion` CSS rules

### Issues & How I Fixed Them

- **Avatar ring was invisible:** Used `inset: -8px` on an empty `<div>` with no explicit dimensions — the browser rendered it as 0×0. Fixed by giving `.about-avatar-wrap` explicit `width: 200px; height: 200px` and switching the ring to `top/left/calc()` sizing.
- **Solid ring looked stationary:** A `border: solid` ring is a perfect circle which looks the same at every angle. Fixed by using `border: 2px dashed var(--teal)` so the dash pattern visibly moves as it spins.
- **Ring off-centre on mobile:** The avatar shrank to `160px` in the media query but the wrapper stayed `200px`. Fixed by adding both `.about-avatar-wrap { width: 160px; height: 160px }` and `.about-avatar { width: 160px; height: 160px }` inside `@media (max-width: 768px)` so they shrink together.
- **Bootstrap accordion button text turned dark on expand:** Bootstrap's default `:not(.collapsed)` styles were overriding the colour. Fixed with `.custom-accordion .accordion-button:not(.collapsed) { color: var(--off-white) }` and a `:focus` rule to replace Bootstrap's blue box-shadow with a teal one.


## Session 4 — Projects Section & Scroll-Reveal with IntersectionObserver


### What I Built

- Built five project cards in a Bootstrap grid (`col-md-6 col-lg-4`): Smart City Info, LLM Code Documenter, Sectionwise RAG Loader, Tax Flowchart Helper, and Flask Agent Application. Each card has a `.project-icon`, tech tag pills, `.project-desc`, and a `.project-link` to GitHub
- Added a sixth ghost CTA card (`project-card-ghost`) with `border-style: dashed` and `background: transparent` linking to the GitHub repositories tab
- Project tag hover colour change is handled entirely by CSS using the `.project-card:hover .tag` descendant selector — no JavaScript event listeners needed
- Implemented scroll-reveal using the **IntersectionObserver API** — not covered in class. It detects when elements scroll into view without needing continuous `scroll` event listeners
- In `main.js`:
  ```js
  revealElements.forEach((el, i) => {
    el.style.setProperty("--reveal-delay", `${i * 0.05}s`);
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
  });
  ```
- In `styles.css`, `.reveal-hidden` sets `opacity: 0; transform: translateY(20px)` with a transition using `var(--reveal-delay)`. When the observer fires, JS calls `classList.replace("reveal-hidden", "revealed")`. All visual values live in CSS — JS only toggles the class name and sets the dynamic delay value

### Issues & How I Fixed Them

- **Inline style manipulation in JS:** Early versions set `el.style.opacity`, `el.style.transform`, and even injected a `<style>` tag at runtime to define `.revealed`. This mixes concerns and makes styles hard to find. Fixed by moving all visual properties to `styles.css` and having JS only toggle class names. The one exception is `--reveal-delay` which must be in JS because it depends on a loop index.
- **`prefers-reduced-motion` wildcard affecting all users:** The block contained `* { transition-duration: 0.01ms !important }` which suppressed transitions for every user in some browsers. Fixed by replacing it with targeted rules only on the specific animated elements: `.reveal-hidden, .revealed { transition: none }`.


## Session 5 — Contact Form & Formspree Integration


### What I Built

- Built the contact form with four fields: Name, Email, Subject, Message — using Bootstrap's `form-control` inputs, `form-label` labels, and `invalid-feedback` divs for inline error messages. The `<form>` has `novalidate` so Bootstrap's custom validation styles are used instead of browser defaults
- Validation uses the HTML5 Constraint Validation API: `form.checkValidity()` returns `false` if any `required` field is empty or invalid. Adding `was-validated` to the form triggers Bootstrap's red/green border styles automatically
- Form submits to Formspree via:
  ```js
  fetch("https://formspree.io/f/meewgdwa", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, subject, message })
  });
  ```
- Loading state: button text hidden, Bootstrap `spinner-border` shown, `submitBtn.disabled = true` to prevent double-submits
- On `response.ok`: `form.reset()`, `was-validated` removed, green success alert shown and auto-hides after 6 seconds via `setTimeout()`
- On failure: red error alert shown with a `mailto:nehamarladycs@gmail.com` fallback link

### Issues & How I Fixed Them

- **Formspree returning HTML instead of JSON:** Formspree returned an HTML redirect. Missing `Accept: application/json` header — Formspree requires both `Content-Type` and `Accept` headers to return JSON. Fixed by adding `Accept: "application/json"` to the headers.
- **Validation styles reappearing after reset:** `form.reset()` clears values but not the `was-validated` class, so Bootstrap re-showed validation styles on the next interaction. Fixed by calling `form.classList.remove("was-validated")` immediately after `form.reset()`.

### Sources Used

- [Formspree — AJAX / Fetch Submission](https://help.formspree.io/hc/en-us/articles/360013470814)


## Session 6 — Mobile Responsiveness, Navbar Behaviour & Accessibility


### What I Built

- Added `scroll` event listener in `main.js`: `navbar.classList.toggle("scrolled", window.scrollY > 50)`. The `scrolled` class tightens padding from `1rem` to `0.6rem` and shifts the border-bottom to a teal tint
- Active link highlighting: scroll handler checks each section's `offsetTop` against `window.scrollY` and toggles the `active` class on the matching nav link
- Mobile navbar close-on-click: added a `click` listener to each nav link that calls `bootstrap.Collapse.getInstance(navMenu)` and then `.hide()` to close the menu when a link is tapped
- Added `@media (max-width: 768px)` CSS: `#navMenu` gets a solid `#0f172a` background, `box-shadow`, `border-radius`, and `#mainNav` gets `z-index: 9999` so the dropdown floats above page content
- Accessibility fixes applied:
  - **Typewriter heading semantics:** `<p class="typewriter-line">` was styled with the same large bold font as `h1`, triggering a "text appears to be a heading" warning. Fixed by changing the tag to `<h2 class="typewriter-line">` — correct heading hierarchy
  - **Footer brand heading warning:** `<p class="footer-brand">` with `font-weight: 700` and `font-size: 1.1rem` was flagged. Reduced to `font-weight: 600` and `font-size: 1rem`, and added `aria-hidden="true"` since it is decorative
  - **Colour contrast:** `--muted` bumped from `#94a3b8` to `#b8c7d9` (~7.2:1 on navy). `--muted-dark` bumped from `#64748b` to `#8fa3bb` (~4.8:1) — both pass WCAG AA
  - **Redundant link:** Ghost CTA card URL changed from `github.com/nehamarlady` to `github.com/nehamarlady?tab=repositories` — a distinct destination

### Issues & How I Fixed Them

- **Mobile navbar overlapping page content:** Bootstrap's collapse pushes content down rather than floating over it. Fixed by giving `#navMenu` a solid background, `box-shadow`, and `z-index: 9999` on `#mainNav`.
- **`bootstrap.Collapse.getInstance()` returning null:** If the user clicks a link before Bootstrap initialises the collapse element, `getInstance()` returns `null` and `.hide()` throws an error. Fixed with a fallback: `if (!bsCollapse) { bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false }); }`.
- **`aria-hidden` not suppressing heading warning:** The linter checks visual CSS heuristics (font size and weight thresholds), not ARIA attributes. `aria-hidden="true"` had no effect. Fixed by reducing the font styling below the linter's threshold.



## All Outside Sources

| Source | Type | Used For |
|---|---|---|
| [Bootstrap 5.3 Documentation](https://getbootstrap.com/docs/5.3/) | Docs | Navbar, accordion, grid, forms, utilities |
| [Bootstrap Icons 1.11](https://icons.getbootstrap.com/) | Library | All icons throughout the site |
| [Google Fonts](https://fonts.google.com/) | Library | Space Grotesk, Inter, JetBrains Mono |
| [MDN — CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) | Docs | Design token pattern in `:root` |
| [CSS Tricks — Custom Properties Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/) | Article | CSS design token architecture |
| [MDN — CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) | Docs | Typewriter, ring spin, blink keyframes |
| [MDN — CSS transform: rotate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate) | Docs | Avatar ring spin animation |
| [MDN — setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) | Docs | JS typewriter loop |
| [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Docs | Accessibility motion preference |
| [MDN — IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Docs | Scroll-reveal animation |
| [MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | Docs | Contact form Formspree submission |
| [MDN — HTML Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) | Docs | Form `checkValidity()` and `was-validated` |
| [MDN — CSSStyleDeclaration.setProperty()](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) | Docs | Setting `--reveal-delay` in JS |
| [Bootstrap 5.3 — Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) | Docs | Experience section accordion |
| [Bootstrap 5.3 — Form Validation](https://getbootstrap.com/docs/5.3/forms/validation/) | Docs | Contact form validation styles |
| [Bootstrap 5.3 — Collapse JS API](https://getbootstrap.com/docs/5.3/components/collapse/#via-javascript) | Docs | Mobile navbar close on link click |
| [Formspree — AJAX Submission](https://help.formspree.io/hc/en-us/articles/360013470814) | Docs | Contact form `fetch()` integration |
| [WCAG 2.1 — Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) | Standard | Colour contrast compliance |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Tool | Checking contrast ratios |
| [W3C HTML Validator](https://validator.w3.org/) | Tool | HTML validation |
| [GitHub Pages Documentation](https://docs.github.com/en/pages) | Docs | Deployment setup |