# Sangork Global Solutions — Tech Noir Website

A responsive static website concept with a premium dark UI, AI-inspired visual effects, service cards, approach section, testimonials, and contact CTA.

## Run locally
No build tools required. Open `index.html` in a browser, or run a local server from this directory:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files
- `index.html` — complete static page
- `styles.css` — responsive Tech Noir design system
- `script.js` — mobile navigation, year, testimonial card rotation
- `assets/design-concept.png` — generated visual concept reference
- `src/components/Hero.jsx` — React + Tailwind hero component
- `src/components/Services.jsx` — React + Tailwind service cards
- `tailwind.config.js` — custom theme tokens
- `package.json` — optional React/Vite setup

## Before production
Replace demo testimonials, project counts, email address, and any illustrative metrics with verified company information. Add a real privacy policy, accessibility QA, analytics consent where required, and connect the contact form/CTA to your CRM or backend.

## React + Tailwind starter
The runnable React starter is in `react-starter/` so it can be developed independently from the zero-build static HTML version.

```bash
cd react-starter
npm install
npm run dev
```
