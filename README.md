# Neha Marlady — Personal Portfolio Website

A professional single-page portfolio website built with HTML, CSS, Bootstrap 5 and Vanilla JavaScript. The site highlights my background, work experience, projects and includes a working contact form.

🔗 **Live Site:** https://nehamarlady.github.io
📁 **GitHub Repo:** https://github.com/nehamarlady/nehamarlady.github.io

---

## About the Project

It is a single-page website with smooth scroll navigation across five sections — About, Experience, Projects, Contact, and a Hero landing area.

**Key features:**
- Looping typewriter animation in the hero section
- Bootstrap 5 Accordion for the Experience section
- Scroll-reveal animations using the IntersectionObserver API
- Spinning avatar ring built with CSS `@keyframes`
- Contact form wired to Formspree with loading state and validation
- Fully responsive — tested at 375px, 768px, and 1440px

---

## File Structure

```
nehamarlady.github.io/
├── index.html       — Full single-page HTML with all sections
├── styles.css       — All custom styles and CSS custom properties
├── main.js          — All JavaScript interactions
└── README.md        — This file
```

---

## How to Run

**No build tools or installations needed.** All dependencies are loaded via CDN.

### Option 1 — Open directly in browser

1. Clone or download the repository:
   ```bash
   git clone https://github.com/nehamarlady/nehamarlady.github.io.git
   ```
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)

### Option 2 — Local server (recommended)

Running via a local server avoids any browser restrictions on local file access.

**Using Python:**
```bash
cd nehamarlady.github.io
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Using VS Code:**
Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html`, and select **Open with Live Server**.

---

## Technologies Used

| Technology | Version | How It's Used |
|---|---|---|
| HTML5 | — | Page structure and semantic markup |
| CSS3 | — | Custom styles, animations, CSS custom properties |
| JavaScript (ES6+) | — | Typewriter loop, scroll-reveal, form submission, navbar behaviour |
| Bootstrap | 5.3.2 | Grid layout, navbar, accordion, form components, utilities |
| Bootstrap Icons | 1.11.3 | Icons used throughout the site |
| Space Grotesk | — | Display / heading font (Google Fonts) |
| Inter | — | Body text font (Google Fonts) |
| JetBrains Mono | — | Monospace font for tags and labels (Google Fonts) |
| Formspree | — | Contact form backend (no server needed) |

---

## Outside Sources

| Source | Used For |
|---|---|
| [Bootstrap 5.3 Docs](https://getbootstrap.com/docs/5.3/) | Navbar, accordion, grid, forms, utilities |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | All icons |
| [Google Fonts](https://fonts.google.com/) | Space Grotesk, Inter, JetBrains Mono |
| [MDN — CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) | Design token pattern |
| [MDN — CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) | Typewriter, ring spin, blink keyframes |
| [MDN — setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) | JS typewriter loop |
| [MDN — IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Scroll-reveal animation |
| [MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | Contact form submission |
| [MDN — HTML Constraint Validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) | Form validation |
| [Bootstrap 5.3 — Collapse JS API](https://getbootstrap.com/docs/5.3/components/collapse/#via-javascript) | Mobile navbar close on link click |
| [Formspree — AJAX Submission](https://help.formspree.io/hc/en-us/articles/360013470814) | Contact form fetch() integration |
| [CSS Tricks — Custom Properties Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/) | CSS design token architecture |
| [WCAG 2.1 — Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) | Colour contrast compliance |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Checking contrast ratios |
| [W3C HTML Validator](https://validator.w3.org/) | HTML validation |
| [GitHub Pages Docs](https://docs.github.com/en/pages) | Deployment setup |

---

## Deployment

The site is deployed using **GitHub Pages** from the `main` branch.

1. Push all files to a public repository named `nehamarlady.github.io`
2. Go to **Settings → Pages → Source**
3. Select branch `main` and click **Save**
4. Site is live at `https://nehamarlady.github.io`

---

# Lighthouse Scores
 
![Lighthouse Scores](lighthouse.png)
 
| Category | Score |
|---|---|
| Performance | 97 |
| Accessibility | 94 |
| Best Practices | 100 |
| SEO | 100 |
 
---

## Contact

**Neha Marlady**
- GitHub: [github.com/nehamarlady](https://github.com/nehamarlady)
- LinkedIn: [linkedin.com/in/nehamarlady](https://www.linkedin.com/in/nehamarlady/)
- Email: nehamarladycs@gmail.com