## Mobile‑first Starter

This is a minimal, accessible, mobile‑first starter you can deploy anywhere (static HTML/CSS/JS).

### Run locally

- Open `index.html` directly in a browser, or
- Serve the folder with a static server to enable proper routing and caching headers:

```bash
npx serve -s .
```

### Structure

- `index.html`: semantic layout with responsive header/nav, sections, and footer
- `styles.css`: mobile‑first styles, CSS variables, light/dark, reduced‑motion
- `script.js`: accessible nav toggle, ESC to close, small UX niceties

### Customize

- Update the brand text in the header and the hero copy.
- Adjust colors in `:root` variables within `styles.css`.
- Add sections or components following existing patterns.

### Deploy

- GitHub Pages: push to `main` and enable Pages on `/` (root).
- Netlify/Vercel: import the repo; framework = static, build = none, output = root.


