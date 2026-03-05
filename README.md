# Nishant Kamal – Portfolio

Personal portfolio website for Nishant Kamal, Site Reliability Engineer.  
Live at **[nishantkamal.com](https://nishantkamal.com)**

## Tech Stack

- **Next.js 14** (App Router, static export)
- **Tailwind CSS 3**
- **React 18**
- **GitHub Pages** (deployment via GitHub Actions)

## Project Structure

```
src/
├── app/
│   ├── layout.js       # Root layout, fonts, metadata
│   ├── page.js         # Home page — assembles all sections
│   ├── globals.css     # Design tokens, global styles
│   └── sitemap.js      # Auto-generated sitemap
└── components/
    ├── Navbar.js
    ├── Hero.js
    ├── Stats.js
    ├── About.js
    ├── Skills.js
    ├── Projects.js
    ├── Education.js
    ├── Contact.js
    └── Footer.js       # (unused — footer lives in layout.js)
```

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm run dev

# Production build (generates ./out for static export)
npm run build

# Lint
npm run lint
```

## Deployment

This site deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

The workflow:
1. Runs `npm install` + `npm run build`
2. Uploads the `./out` folder as a Pages artifact
3. Deploys to `nishantkamal.com`

`next.config.js` uses `output: "export"` which generates the static `./out` folder required by Pages.

## Public Assets

Place these files in `/public`:

| File | Purpose |
|------|---------|
| `profile.png` | Hero section profile photo (recommended 380×380px) |
| `og-image.png` | Social sharing preview image (1200×630px) |
| `resume.pdf` | Linked from navbar Resume button |

## Notes

- `next/font` is **not used** — incompatible with `output: "export"`. Fonts are loaded via `<link>` in `layout.js`.
- `framer-motion` and `react-icons` have been removed from dependencies — they were installed but never used.
- Next.js version should be kept at **14.2.29+** to avoid the critical security vulnerability in 14.2.5.
