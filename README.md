# Art Explorer

An interactive Year 5–6 art curriculum app: **Elements of Art & Principles of Design**,
built around a term map plus fully interactive weekly lessons (Line, Shape & Form, Colour),
each with a Teacher Mode lesson-plan view and a Faith & Values reflection.

This is a **zero-build** app — it runs directly in the browser with no `npm install` or
bundler required. React and Babel are loaded from a CDN, and the JSX components are
compiled to JavaScript live in the browser.

## Running it

### Option A — GitHub Pages (recommended)

1. Push this folder to a GitHub repository.
2. In the repo settings, enable **GitHub Pages** for the branch/folder this lives in
   (Settings → Pages → Deploy from a branch).
3. Visit the published URL — `index.html` is the entry point.

### Option B — Run locally

Because the components are loaded via `fetch` (Babel Standalone compiles each
`components/*.js` file on load), you can't just double-click `index.html` — most
browsers block local file fetches for security. Instead, serve the folder:

```bash
# Python (built into most machines)
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

## What's inside

```
index.html                     — entry point, loads React/Babel from CDN + all components
components/
  icons.js                     — small dependency-free icon set (replaces lucide-react)
  storage-shim.js              — implements the app's storage API using localStorage
  term-map.js                  — the 10-week colour-wheel term map
  week1-line.js                — Week 1: Line (5 interactive lessons)
  week2-shape-form.js          — Week 2: Shape & Form (5 interactive lessons)
  week3-colour.js              — Week 3: Colour (5 interactive lessons)
  app.js                       — navigation shell that switches between the above
```

**Data & progress:** each student's/browser's progress, portfolio pieces, and lesson
completion are saved in the browser's `localStorage`, so they persist between visits on
the same device. There's no server or account system — this is intentionally simple for
classroom use (e.g. one device per student, or a shared classroom device).

## Extending it (Weeks 4–10)

Each week component is fully self-contained (data + activities + lesson plans + Faith &
Values reflections all in one file). To add a new week:

1. Duplicate `components/week3-colour.js` as a starting template.
2. Update its `DAYS` data, activity components, and the exported component name.
3. Add a `<script type="text/babel" data-presets="react" src="components/weekN-xxx.js">`
   line to `index.html`.
4. Add it to the `pages` array and the render list in `components/app.js`.

## A note on performance

Because this uses Babel Standalone to compile JSX in the browser rather than a build
step, there's a brief compile pause on first load (typically well under a second, but
noticeable on older devices). If that ever becomes a problem, the same component files
can be run through a real bundler (e.g. [Vite](https://vitejs.dev/)) with only very
minor changes — swap the `window.storage`/global-icon wiring for real `import`
statements again, add `export default`, and let Vite pre-compile everything into a
single optimised bundle.

## Printable worksheets

The companion printable booklet (`Elements of Art Booklet.pdf`, in `docs/`) mirrors
each week's lessons with hands-on worksheets, growing chapter by chapter alongside the
app.

---

*Soli Deo Gloria*
