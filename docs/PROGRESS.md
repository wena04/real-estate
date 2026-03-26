# Westwood Homes Website Progress

Last updated: 2026-03-26

## Current Status
- Core MVP website is implemented and deploys on Vercel.
- Production branch is `mvp`.
- Inquiry backend is active through `api/inquiry.js` (Resend).
- Client review branches are published for Vercel Preview deployments (see “Vercel: Preview vs Production”).

## Recent commits / changelog (high level)

- `e6a5170` **ui: remove footer contact copy buttons**
  - Removed the phone/email **Copy** buttons from the footer contact panel to reduce UI clutter.
  - Files: `src/components/layout/Footer.jsx`, `src/components/layout/Footer.css`
- `887e3be` **demo: v3 client draft**
  - Consolidated the latest homepage layout work into a shareable draft build for client review (used for `v3` preview branches).
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`, `src/components/layout/Footer.jsx`, `src/components/layout/Footer.css`
- `936dfbd` **ui: left-align contact card, softer gray panel, tighter layout**
  - Tightened contact form spacing and improved readability and alignment.
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- `ef5c0c6` **fix: contact Get directions button uses white label text**
  - Fixed link/button styling specificity so “Get directions” stays readable.
  - Files: `src/pages/HomePage.css`
- `c08a714` **fix: remove duplicate list markers on custom bullet rows**
  - Fixed double-bullet rendering for compact bullet lists.
  - Files: `src/pages/HomePage.css`
- `17d41b8` **revert: restore Services to full-text two-column layout**
  - Reverted the Services section back to the full content layout (kept original wording).
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- `132da2c` **chore: add project card taglines and section images**
  - Added `cardTagline` fields for project cards and introduced section images for Services/Investors.
  - Files: `src/data/projects.json`, `public/assets/sections/services/services-feature.png`, `public/assets/sections/investors/investors-feature.png`
- `71d55ae` **ui: apply tabbed showcase layout to Services**
  - Implemented (later reverted) a tabbed/feature Services presentation experiment.
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- `0c461d4` **ui: unify contact section into single card with footer strip**
  - Unified contact UI into a single card with a compact details strip.
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- `838924f` **ui: restructure homepage sections to reduce chunkiness**
  - Overall spacing/layout refinement to make sections easier to scan.
  - Files: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- `3783e90` **ui: keep project card titles default color**
  - Adjusted project card title color treatment for consistency.
  - Files: `src/components/projects/ProjectCard.css`
- `90c639f` **ui: use red tagline as project card title**
  - Experimented with using the red tagline as the project card title (later superseded by styling updates).
  - Files: `src/components/projects/ProjectCard.jsx`, `src/components/projects/ProjectCard.css`

## Project Intent

Build a polished, modern frontend MVP for Westwood Homes (Bellevue/Seattle area) that:

- feels premium and easy to scan
- showcases projects with interactive browsing
- supports clear contact conversion
- is easy for future AI/dev contributors to continue

## Current Product Direction

- **Style:** modern black/charcoal (minimal, professional)
- **Architecture:** React + Vite + React Bootstrap (single-page sections)
- **Content model:** JSON-driven (`src/data/`)
- **Assets:** organized in `public/assets/`
- **Map:** Leaflet + OpenStreetMap with custom markers
- **Inquiries:** Vercel serverless endpoint sends inquiry emails
- **Deployment target:** Vercel previews/production, GitHub Pages optional for archived demo

## Latest Repo Scan Snapshot

Updated after a fresh repo pass, including deployment/config files and docs.

- Vite base path is environment-aware in `vite.config.js`:
  - default (`npm run build`) -> `/` (Vercel)
  - GitHub Pages (`npm run build:gh`) -> `/real-estate/`
- `package.json` includes dual-build scripts:
  - `build`
  - `build:gh`
  - `deploy:gh`
- GitHub Pages workflow (`.github/workflows/deploy.yml`) builds with `build:gh` on `main`
- Backend inquiry endpoint exists in:
  - `api/inquiry.js`
- Frontend submit helper exists in:
  - `src/utils/sendInquiry.js`

## Key Decisions Already Made

- Use display names for projects (no public full addresses on listings/cards)
- Merge all major pages into one home experience with section anchors
- Keep CTA/contact behavior consistent in-page
- Keep project cards image-first without project detail page navigation
- Add interactive card hover effects where appropriate
- Keep non-click informational cards visually distinct from button-like elements

## Current Implementation Status

### Done

- Single-page navigation implemented via top tab anchors:
  - `Home`
  - `Homeowners`
  - `Services`
  - `Investors`
  - `Projects`
  - `Contact`
- Homeowners/Services/Investors content consolidated into their single sections.
- Contact moved into the footer:
  - Footer includes contact form (General Contact) + phone/email + office address + explicit “Get directions”.
  - Copy buttons for phone/email were removed (keep the contact area clean).
- Project section supports:
  - map + cards in one section
  - multi-select Program/Status filters
  - filter hint text and selected-count indicators
  - reset filters
  - results count
  - limited initial card render with "Show more projects" (performance)
- Custom map pin + popup styling implemented
- Project card hover overlay preserved (without detail-page CTA)
- Iconography added across concept/service cards
- Section spacing, hero sizing, and typography tuned for visual rhythm
- Serif heading stack applied for a more premium editorial tone
- Inquiry email backend connected (Resend via Vercel function)
- `.gitignore` updated for local source asset dump files
- `.vercelignore` added to prevent oversized/local files from being uploaded by Vercel CLI
- Removed obsolete multi-page files and unused page-level CSS/components
- Sections updated to “builder homepage” rhythm:
  - Services/Investors/Homeowners use a large section image above the copy block.
  - Projects section layout kept as-is (header + grid + map); the Projects intro now spans the full container width (override `#projects .section-header { max-width: none; }`).

### In Progress / Active Focus

- Content polish and conversion tuning:
  - refine section copy for client tone
  - optional contact reassurance text near forms
- Deployment workflow hardening:
  - confirm production branch policy in Vercel
  - maintain stable "v0" archive strategy if needed

### Pending / Next Suggested Steps

1. **Finalize deployment strategy**
   - Confirm Vercel Production Branch is set to `mvp` (not `main`)
   - Push latest MVP code to `mvp` and verify production deployment source branch
2. **Versioned client review flow**
   - Create version branches (`v1`, `v2`, `v3`, etc.)
   - Share Vercel Preview deployment links for review
3. **Content polish**
   - Optional: refine project descriptions and section copy with stakeholder-reviewed text
   - Optional: add validation/UX copy to reduce incomplete submissions
4. **QA and accessibility**
   - Keyboard navigation check for map and filter interactions
   - Contrast audit on all themed components

## Vercel Session Notes (Current)

- User completed:
  - `vercel login` (successful)
  - `vercel link` to existing project (successful)
- User encountered:
  - `write EPIPE` during local CLI deploy
  - `File size limit exceeded (100 MB)` due to local large archive in repo root
- Mitigation completed:
  - Added `.vercelignore` for large local archives/source dump files
- Recommended flow:
  - prefer Git push deploys via Vercel Git integration over local `vercel --prod` CLI for this repo

## Vercel: Preview vs Production

### Production (official site)
- **Branch:** `mvp`
- **Domain:** `westwoodnw.com` / `www.westwoodnw.com` (Vercel “Production” deployment)

### Client review / draft previews
- Create a branch like `v3` (or `v4`, etc.) and push it to GitHub.
- Vercel will generate a **Preview Deployment URL** for that branch.
- Share the Preview URL with the client.

### If a Preview URL asks for login
That’s Vercel **Deployment Protection** for Preview deployments.

In Vercel:
- Project → Settings → Deployment Protection
- Disable protection for **Preview** deployments (leave Production protected if desired)
- Redeploy the branch (`v3`) so the new setting applies

## Team/AI Handoff Notes

- Prefer editing JSON content (`src/data/`) over hardcoding.
- Avoid exposing internal/full addresses on public project cards.
- Keep project cards image-forward and lightweight (no project detail route).
- Keep one-page section-anchor navigation behavior intact.
- Keep contact copy/call/directions actions in the footer contact section.
- Preserve responsive behavior when modifying card grids/hero sections.

## Important Paths

- App routes/layout: `src/App.jsx`
- Global theme/tokens: `src/index.css`
- Home page: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- Navbar/footer (anchor nav): `src/components/Navbar.jsx`, `src/components/Footer.jsx`
- Projects map component: `src/components/ProjectMap.jsx`
- Inquiry backend: `api/inquiry.js`
- Inquiry frontend utility: `src/utils/sendInquiry.js`
- Data: `src/data/siteContent.json`, `src/data/projects.json`, `src/data/locations.json`

...
