# Westwood Homes Website

Minimal modern React website for Westwood Homes, structured as a multi-page marketing site for Homeowners, Services, Investors, Projects, and Contact.

## Tech Stack
- Vite + React
- React Router
- React Bootstrap + custom CSS
- Static JSON content model (`src/data/*.json`)

## Run Locally
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

Build for GitHub Pages subpath:
```bash
npm run build:gh
```

## Information Architecture
- `/` Home (video hero, value tiles, metrics, featured projects)
- `/homeowners/unlock-lot`
- `/homeowners/sell-home`
- `/homeowners/feasibility-review`
- `/services/design-build`
- `/services/development-consulting`
- `/services/construction-management`
- `/investors/join`
- `/investors/overview`
- `/projects`
- `/projects/:slug`
- `/contact`

## Content + Asset Organization (Option 1)
This v1 is designed for easy maintenance without a backend.

### Content files
- `src/data/siteContent.json` - brand, contact info, homepage metrics, hero video placeholder path
- `src/data/projects.json` - project cards/details (uses display names like `SE 44th PL Single Family`)
- `src/data/locations.json` - map-ready coordinate payload

### Media files
Current build uses placeholder media links with TODO notes for swapping.

Recommended placement for client assets:
- `public/assets/logo/`
- `public/assets/video/`
- `public/assets/projects/<project-slug>/`

## Contact Info in Site
- Address: `1530 140th Ave NE, Ste 117 Bellevue, WA 98005`
- Phone: `(425) 426-9999`
- Email: `kevin@westwoodnw.com`

## Deployment
This repo supports both Vercel (recommended active demos) and GitHub Pages (subpath archive demo).

### Vercel (recommended)
- Build command: `npm run build`
- Output directory: `dist`
- DNS: managed at Squarespace, pointed to Vercel records

### GitHub Pages (subpath)
- Build command: `npm run build:gh`
- Base path is automatically `/real-estate/` in this mode
- Workflow: `.github/workflows/deploy.yml`

Lead forms are placeholder currently; connect later via Vercel Function / Formspree / Resend.

## Maintenance Workflow
1. Update project/content JSON in `src/data/`
2. Add/replace media in `public/assets/`
3. Commit + deploy

Deployment steps and dual-host setup details:
- `docs/PROGRESS.md`

## Placeholder Markers
Search for `TODO:` in `src/data/projects.json` and `src/data/siteContent.json` to find all asset replacement points.
