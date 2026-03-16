# Westwood Homes Website Progress

## Project Intent

Build a polished, modern frontend MVP for Westwood Homes (Bellevue/Seattle area) that:

- feels premium and easy to scan
- showcases projects with interactive browsing
- supports clear contact conversion
- is easy for future AI/dev contributors to continue

## Current Product Direction

- **Style:** modern black/charcoal (minimal, professional)
- **Architecture:** React + Vite + React Router + React Bootstrap
- **Content model:** JSON-driven (`src/data/`)
- **Assets:** organized in `public/assets/`
- **Map:** Leaflet + OpenStreetMap with custom markers
- **Deployment target:** Vercel previews for option comparison, GitHub Pages optional for stable demo

## Key Decisions Already Made

- Use display names for projects (no public full addresses on listings/cards)
- Keep CTA language and contact routing consistent via `/contact`
- Merge About content into Home (single clearer narrative)
- Add richer project detail pages with gallery slider and custom copy
- Add interactive card hover effects where appropriate
- Keep non-click informational cards visually distinct from button-like elements

## Current Implementation Status

### Done

- Multi-page routing implemented (`Home`, `Homeowners`, `Services`, `Investors`, `Projects`, `Contact`)
- Contact page redesigned to two-column layout (form + dark info panel)
- Click/copy interactions implemented for phone + email
- Address links to map navigation URL
- Project list and map filtering UX improved
- Custom map pin + popup styling implemented
- Project detail pages upgraded:
  - image carousel
  - thumbnail strip
  - status-based + project-specific description content
- Project card hover overlay now includes title, context, and "View details"
- Iconography added across concept/service cards
- Section spacing and hero sizing tuned for better rhythm
- `.gitignore` updated for local source asset dump files

### In Progress / Active Focus

- Final visual consistency pass (micro-adjustments):
  - typography rhythm
  - hover intensity tuning
  - spacing calibration on dense sections

### Pending / Next Suggested Steps

1. **Finalize deployment strategy**
   - Use Vercel branch previews for multiple client options
   - Keep one stable demo URL for latest approved MVP
2. **Versioned client review flow**
   - Create demo branches (`demo/v1`, `demo/v2`, etc.)
   - Share side-by-side preview links
3. **Content polish**
   - Replace placeholder form submission alerts with backend/form service
   - Optional: refine project descriptions with stakeholder-reviewed copy
4. **QA and accessibility**
   - Keyboard navigation check for slider/map interactions
   - Contrast audit on all themed components

## Team/AI Handoff Notes

- Prefer editing JSON content (`src/data/`) over hardcoding.
- Avoid exposing internal/full addresses on public project cards.
- Keep project CTA wording consistent: **"View details"**.
- Keep contact CTA destination consistent: `/contact`.
- Preserve responsive behavior when modifying card grids/hero sections.

## Important Paths

- App routes/layout: `src/App.jsx`
- Global theme/tokens: `src/index.css`
- Home page: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`
- Projects list/map: `src/pages/ProjectsPage.jsx`, `src/components/ProjectMap.jsx`
- Project detail: `src/pages/ProjectDetailPage.jsx`, `src/pages/ProjectDetailPage.css`
- Contact page: `src/pages/ContactPage.jsx`, `src/pages/ContactPage.css`
- Data: `src/data/siteContent.json`, `src/data/projects.json`, `src/data/locations.json`

