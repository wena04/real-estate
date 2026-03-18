# Westwood Homes Website Progress

Last updated: 2026-03-18

## Current Status
- Core MVP website is implemented and deploys on Vercel.
- Production branch is `mvp`.
- Inquiry form backend is active through `api/inquiry.js` using Resend.
- Local environment variables are configured for inquiry email testing.

## Completed Recently
- Integrated and validated Resend-based email send flow for inquiries.
- Added safe env-variable workflow for local development.
- Confirmed serverless inquiry endpoint returns success when properly configured.
- Moved deployment and DNS setup toward Vercel + Squarespace third-party DNS model.

## In Progress
- Final domain routing verification for `westwoodnw.com` and `www.westwoodnw.com`.
- Final DNS cleanup of legacy records not needed for the new site.
- Final confirmation of production email sender/recipient settings in Vercel.

## Next Steps
1. Confirm both apex and `www` domains show valid configuration in Vercel.
2. Keep Google Workspace and Resend DNS records intact during cutover.
3. Verify inquiry form submission end-to-end on production domain.
4. Perform final QA pass on responsive layout, navigation, and contact flow.

## Important Paths
- App entry: `src/App.jsx`
- Home page UI: `src/pages/HomePage.jsx`
- Global styles: `src/index.css`
- Inquiry API endpoint: `api/inquiry.js`
- Inquiry client helper: `src/utils/sendInquiry.js`
# Westwood Homes Website Progress

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
- Homeowners/Services/Investors content consolidated into their single sections
- Contact section supports:
  - click-to-call and click-to-email
  - copy buttons for phone/email
  - office address link + explicit "Get directions" button
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
   - Create demo branches (`demo/v1`, `demo/v2`, etc.)
   - Share side-by-side preview links
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

## Team/AI Handoff Notes

- Prefer editing JSON content (`src/data/`) over hardcoding.
- Avoid exposing internal/full addresses on public project cards.
- Keep project cards image-forward and lightweight (no project detail route).
- Keep one-page section-anchor navigation behavior intact.
- Keep contact copy/call/directions actions in the contact section.
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
