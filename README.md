# Muhammad Farhan — Portfolio Website

A production-ready personal portfolio website for **Muhammad Farhan**, a B.E. Software
Engineering undergraduate at Mehran University of Engineering and Technology (MUET) and
an aspiring software developer.

## 1. Project overview

A single-page React portfolio featuring a gradient hero, capability cards, skills, a
filterable project gallery, an education/journey timeline, achievements, a call-to-action,
and a working contact form powered by Netlify Forms. It requires no backend, database,
WordPress, or paid API — everything is static and deploys straight to Netlify.

## 2. Technology stack

- React 18 + Vite
- Plain modern JavaScript (JSX)
- Custom responsive CSS (no Bootstrap/Tailwind)
- [lucide-react](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for reveal animations
- Netlify Forms for the contact form (no backend code)
- ESLint for linting
- [archiver](https://www.npmjs.com/package/archiver) for the ZIP packaging script

## 3. Folder structure

```
├── public/                # Static files copied as-is to dist/
│   ├── assets/            # og-cover.svg, and where you add the real profile photo
│   ├── resume.html        # Standalone printable resume page
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── _redirects
├── scripts/
│   └── create-zips.mjs    # Builds the two deployable ZIP files
├── src/
│   ├── assets/            # Bundled SVG assets (e.g. placeholder portrait)
│   ├── components/        # Reusable UI building blocks
│   ├── sections/          # One component per page section
│   ├── data/              # Content data (services, skills, projects, timeline)
│   ├── hooks/              # useTypewriter, useActiveSection, useScrollTop
│   ├── styles/             # Design tokens, base styles, shared animations
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── netlify.toml
├── vite.config.js
├── .eslintrc.cjs
└── package.json
```

## 4. Installation

```bash
npm install
```

## 5. Development

```bash
npm run dev
```

Opens the site locally (Vite prints the local URL, typically `http://localhost:5173`).

## 6. Linting

```bash
npm run lint
```

## 7. Production build

```bash
npm run build
```

Outputs the static site into `dist/`.

## 8. Local preview of the production build

```bash
npm run preview
```

## 9. ZIP generation

```bash
npm run package
```

This runs `npm run build` and then `node scripts/create-zips.mjs`, which creates:

- `deliverables/muhammad-farhan-portfolio-netlify.zip` — contents of `dist/` at the
  **archive root** (so `index.html` sits at the top level, not inside a `dist/` folder).
  This is the file to drag-and-drop onto Netlify.
- `deliverables/muhammad-farhan-portfolio-source.zip` — full source code, excluding
  `node_modules`, `.git`, `dist`, and `deliverables`.

The script deletes any previous ZIPs before creating new ones and exits with a non-zero
status if anything fails.

## 10. Netlify deployment — drag and drop

1. Run `npm run package` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Unzip `muhammad-farhan-portfolio-netlify.zip` and drag the **contents** of that folder
   (not the zip itself, and not a parent folder) onto the drop zone.
4. Netlify will assign a `*.netlify.app` subdomain immediately.

## 11. Netlify deployment — GitHub

1. Push this project (the source, not `dist/`) to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repo.
3. Build command: `npm run build`. Publish directory: `dist`. (Already set in
   `netlify.toml`, so Netlify should auto-detect these.)
4. Deploy. Every push to the connected branch will trigger a new build.

Because `public/_redirects` and the `[[redirects]]` rule in `netlify.toml` both send every
path to `index.html` with a 200 status, refreshing any URL (e.g. a deep link into a
section) will keep working after deployment.

## 12. How to replace the placeholder profile image

The Hero and About sections both look for:

```
/assets/muhammad-farhan-profile.png
```

To use a real photo:

1. Add your photo to `public/assets/muhammad-farhan-profile.png` (same filename, PNG
   format recommended).
2. Rebuild (`npm run build`) or just refresh in dev mode.

If the file is missing, both sections automatically fall back to a bundled SVG placeholder
showing the "MF" initials, so the site never breaks or shows a broken image icon.

## 13. How to update projects

Edit `src/data/projects.js`. Each project object supports:

- `title`, `category`, `description`, `technologies`
- `thumbnail` — one of the local SVG icon variants in
  `src/components/ProjectThumbnail.jsx` (`shop`, `portfolio`, `attendance`, `records`,
  `java`, `database`, `quiz`, `library`)
- `demoStatus` — `'coming-soon'`, `'current-website'`, or `'github'`, which controls which
  demo button renders
- `details` — the `overview`, `role`, and `features` shown in the project details modal

## 14. How to update contact details

Edit `src/data/siteData.js` — the `personal` object holds the name, email, phone/WhatsApp
number and link, LinkedIn, GitHub, university, degree, and current status used throughout
the site.

## 15. How Netlify Forms works here

- The React form in `src/sections/Contact.jsx` posts to `/` with
  `Content-Type: application/x-www-form-urlencoded` and includes a hidden `form-name`
  field matching `portfolio-contact`.
- Because Netlify's build-time form detection only scans static HTML, a matching hidden
  form (with the same field names and the honeypot field) is also included directly in
  `index.html`. This lets Netlify register the form during the build even though the real
  form is rendered by React at runtime.
- After deployment, submissions appear under **Site settings → Forms** in the Netlify
  dashboard.
- The honeypot field (`bot-field`) plus `netlify-honeypot="bot-field"` provides basic spam
  protection.

## 16. How to change the canonical domain after deployment

Once Netlify assigns (or you configure) your domain, update:

- `<link rel="canonical" ...>`, Open Graph `og:url`, and Twitter meta tags in `index.html`
- `Sitemap:` line in `public/robots.txt`
- The two `<loc>` URLs in `public/sitemap.xml`
- The `"url"` field in the JSON-LD block in `index.html`

## 17. Troubleshooting

- **Blank page after deploy**: confirm the Netlify publish directory is `dist` and that
  `public/_redirects` was included in the build output.
- **Contact form not appearing in Netlify dashboard**: redeploy after confirming the
  hidden static form in `index.html` still matches the field names in
  `src/sections/Contact.jsx` exactly (`name`, `email`, `phone`, `opportunity`, `subject`,
  `message`, `bot-field`).
- **Icons not rendering**: check that the icon name used in `src/data/services.js` matches
  an exported icon from `lucide-react`.
- **Animations not playing**: Framer Motion animations use `whileInView`, so they only
  trigger once an element scrolls into the viewport; this is expected behavior, not a bug.
- **ESLint failing on an unused variable**: the project treats warnings as acceptable but
  build-breaking errors (e.g. undefined variables, unreachable code) should be fixed
  before deploying.

---

Built with React and deployed on Netlify. Designed and developed for Muhammad Farhan.
