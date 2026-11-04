# Westwood Homes Website

A single-page marketing website with project photos, an interactive project map,
homeowner/services content, investor signup, and a general contact form.

## Development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The development and preview commands serve the frontend. Test inquiry delivery
on Vercel or use Vercel local development to run the serverless API.

## Deployment

Deploy through Vercel's GitHub integration using `npm run build`, output directory
`dist`, and the repository root. The GitHub Pages workflow and subpath build
scripts have been retired.

The existing project's documented production branch is `mvp`. Bringing `main`
up to date does not change that Vercel setting; check Project Settings before
changing the production branch. Other branches can generate preview deployments.

Set these server-side environment variables in Vercel, then redeploy:

- `RESEND_API_KEY`: API key for the email service.
- `INQUIRY_TO_EMAIL`: inbox that receives inquiries.
- `INQUIRY_FROM_EMAIL`: sender on a domain verified in the corresponding Resend account.

Configure Production and Preview scopes as needed. Keep real keys out of Git.
Domain registration and DNS are managed in Squarespace; the website is hosted
on Vercel. Preserve existing Google email records when changing website DNS.

## Maintenance

- Page content and sections: `src/pages/HomePage.jsx`.
- Business details: `src/data/siteContent.json`.
- Project data and map locations: `src/data/projects.json` and `locations.json`.
- Media: `public/assets/`.
- Navigation and contact footer: `src/components/layout/`.
- Email endpoint: `api/inquiry.js`.

Implementation history is recorded in `docs/PROGRESS.md`.
The prepared client package is available as `START-HERE.md` and
`westwood-homes.zip` in the repository's client-handoff release attachments.
