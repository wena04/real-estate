# Westwood Homes — Real Estate Website

A modern, single-page marketing website for **Westwood Homes**, a Bellevue-based custom home builder. Built with React, React Bootstrap, and custom CSS featuring a dark green luxury color scheme.

## Tech Stack

- **Vite** — fast build tool and dev server
- **React 19** — UI framework
- **React Bootstrap** — responsive layout and components
- **React Icons** — lightweight icon library (Feather icons)
- **Custom CSS** — design tokens, animations, and branding
- **Google Fonts** — Playfair Display (headings) + Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/wena04/real-estate.git
cd real-estate
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
real-estate/
├── index.html                 # Entry HTML with Google Fonts
├── vite.config.js             # Vite configuration
├── package.json
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # Root component with scroll animations
│   ├── App.css                # App-level styles
│   ├── index.css              # Global styles, CSS variables, utilities
│   └── components/
│       ├── Navbar.jsx / .css  # Sticky navbar with scroll transparency
│       ├── Hero.jsx / .css    # Full-viewport hero with CTA buttons
│       ├── About.jsx / .css   # Company info + value prop cards
│       ├── Services.jsx / .css # Service offerings grid
│       ├── Portfolio.jsx / .css # Filterable project grid with hover overlays
│       ├── Contact.jsx / .css  # Contact form + info panel
│       └── Footer.jsx / .css   # Footer with links and copyright
├── public/
├── LICENSE
└── README.md
```

## Color Scheme

| Role | Color | Hex |
|------|-------|-----|
| Primary (forest green) | Navbar, headings, buttons | `#1a3c34` |
| Secondary (emerald) | Accents, hover states | `#2d6a4f` |
| Accent (muted gold) | Highlights, borders | `#b8a068` |
| Background (warm cream) | Main sections | `#faf9f6` |
| Background (sage gray) | Alternating sections | `#f0f2ef` |
| Dark (charcoal-green) | Footer, overlays | `#0f2b24` |

## Project Status & Roadmap

### Completed

- [x] Project scaffolding (Vite + React)
- [x] Global CSS design system (variables, typography, buttons, animations)
- [x] Sticky Navbar with scroll transparency + mobile hamburger
- [x] Full-viewport Hero section with background image and CTAs
- [x] About section with image, description, and value prop cards
- [x] Services section with icon cards
- [x] Portfolio section with filter tabs and Cordillera-style hover overlays
- [x] Contact section with form and info panel
- [x] Footer with nav links and contact info

### In Progress

- [ ] Test responsive behavior across screen sizes
- [ ] Replace placeholder images with actual project photos
- [ ] Update phone number with real number

### Planned / Future

- [ ] Add actual form submission (e.g., EmailJS, Formspree, or backend API)
- [ ] Add individual project detail pages/modals
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] Performance audit (image optimization, lazy loading)
- [ ] Deployment (Vercel, Netlify, or similar)
- [ ] Add Google Analytics or similar tracking
- [ ] Investor section / login portal
- [ ] Blog / Insights page

## License

MIT License — see [LICENSE](LICENSE) for details.
