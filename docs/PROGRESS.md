# Westwood Homes Website Progress

Last updated: 2026-11-03 (America/Los_Angeles)

## Current status

- The website is a React/Vite single-page marketing site with project cards,
  a Leaflet map, homeowner/services content, investor signup, and footer contact.
- There are two rendered inquiry forms: investor signup and footer contact.
  `api/inquiry.js` also accepts structured homeowner inquiry fields.
- Hosting is on Vercel. The existing production branch is documented as `mvp`;
  its account-level setting has not been independently inspected because the
  connector still requires authorization for the existing Vercel team.
- `main` was fast-forwarded to `mvp`, and both branches received `0150373`
  (GitHub Pages retirement and prototype credit). GitHub reported a successful
  Vercel deployment, and the public site served the credit.
- GitHub Pages branch publishing is now set to workflow-managed mode. The Pages
  deployment workflow, `gh-pages` dependency, subpath base, and `build:gh` /
  `deploy:gh` scripts were removed. The redundant generated Pages run was cancelled.
- Dependency maintenance is being published to both `main` and `mvp` with this
  progress update; see versions and verification below.

## Kevin's ownership handoff

### Accounts and approach agreed with the owner

- Kevin's account/contact email is `Kevin@westwoodnw.com`.
- Kevin has no coding experience. The package includes beginner Mac setup,
  Homebrew installation, Git/Node.js/GitHub CLI, GitHub Desktop, browser sign-ins,
  and guidance for opening the extracted source in Muse or another agent.
- Muse is assumed to be installed already. No specific Muse capabilities have
  been verified; the guide includes a manual/agent-workspace fallback.
- The client will create a fresh private GitHub repository and a new Vercel
  project in his own accounts. Use `main` in the new repo and Vercel project.
- Extract the prepared ZIP and push its contents at the repository root with
  fresh Git history. Do not fork, mirror, or transfer this development repository.
- Kevin needs a client-controlled Resend account, a verified sender domain, an
  API key stored server-side in Vercel, and confirmed delivery to his inbox.
- Keep the current Vercel project/site available until the replacement, email,
  domain assignment, HTTPS and redirects are verified. Delete the old project
  only after acceptance; it is not a prerequisite for the new setup.

### Client deliverables

- Local source package: `_local/client-handoff/westwood-homes/`.
- Send only `START-HERE.md` and `westwood-homes.zip` to Kevin. The ZIP also contains
  `HANDOFF.md`, `START-HERE.md`, `README.md`, source, API, lockfile and 90 media assets.
- Desktop copies: `~/Desktop/START-HERE.md` and `~/Desktop/westwood-homes.zip`.
- GitHub release: https://github.com/wena04/real-estate/releases/tag/client-handoff-2026-11-03
- Both files are attached to that release. The ZIP exceeds GitHub's ordinary
  Git-file size limit, so it is a release asset, not a committed repository file.
- GitHub's automatically generated Source code archives are different from the
  prepared `westwood-homes.zip` and contain the development repository snapshot.
- The client ZIP excludes this progress document, Git history, private migration
  notes, local account links/settings, actual environment files/keys, dependencies
  and build output. `.env.example` contains safe placeholders only.
- By explicit request, the public footer says: “Initial prototype developed by
  Anthony Wen.” This is the intentional exception to removal of personal references.
- The 120-file ZIP contains project photos, logos, association badges, section
  images and the hero video. The client video was renamed `home-hero.mp4`, with
  the corresponding content path updated. Unused legacy components were omitted.
- ZIP archives are ignored by Git and Vercel inside the prepared client package.

### Receiving-agent instructions

- `HANDOFF.md` starts with a ChatGPT-specific instruction to discover/connect
  GitHub, Vercel, Resend and Squarespace plugins/MCP, guide Kevin through approvals,
  verify access, then continue setup. Ordinary chat may lack local file/shell access.
- Official remote Resend MCP endpoint: `https://mcp.resend.com/mcp`.
- The Squarespace plugin tools inspected here do not expose DNS management;
  the receiving agent must check its own tools and use the exact dashboard if needed.
- Set Require Password off in Kevin's new Vercel project. Vercel Authentication
  is separate; verify public production URLs while signed out without bypass tokens.
- Troubleshooting covers CLI upload errors, wrong production branches, unpushed
  changes, login gates, Resend test-sender restrictions, environment scopes,
  local frontend-only servers, delivery versus API acceptance, and cached DNS.

## Domain and DNS facts checked

### Ownership and provider

- Public RDAP confirms registrar Squarespace Domains II LLC.
- The user confirmed Kevin controls the domain in Squarespace using his email.
  Registrar ownership transfer is unnecessary for the chosen hosting migration.
- Domain dashboard: https://account.squarespace.com/domains/managed/westwoodnw.com
- Exact DNS page: https://account.squarespace.com/domains/managed/westwoodnw.com/dns/dns-settings
- Registration data listed expiration November 25, 2026; Kevin should confirm
  actual renewal/auto-renew and billing in his account.
- Existing nameservers are `ns-cloud-b1.googledomains.com` through
  `ns-cloud-b4.googledomains.com`; keep registration/DNS at Squarespace.
- Public HTTPS checks returned a 307 root-to-`www` redirect and a 200 on `www`,
  both identifying Vercel. Preserve the current canonical `www` behavior.

### Signed-in DNS inspection

After the user signed in, the DNS page was inspected read-only. One preset and
18 custom records were visible. No DNS values or presets were changed.

- Preset: Squarespace Domain Connect; CNAME `_domainconnect` points to
  `_domainconnect.domains.squarespace.com`, TTL 1 hour. Keep it.
- No website-default preset or Google Workspace preset was visible. Google email
  records are custom records, not a preset to delete.
- Custom records below use TTL 4 hours:
  - A `@` → `216.198.79.1`.
  - CNAME `www` → `51ebdff734fa53b6.vercel-dns-017.com`.
  - TXT `_vercel` → existing verification challenge for `www`.
  - Five MX records at `@` for Google (`aspmx` priority 1, `alt1`/`alt2` priority 5,
    `alt3`/`alt4` priority 10).
  - TXT `google._domainkey` with the existing Google DKIM public key.
  - CNAME `tr4bdwokp35p` → `gv-uxks62j7rb545b.dv.googlehosted.com`.
  - TXT `_dmarc` → `v=DMARC1; p=none;`.
  - MX `send` → `feedback-smtp.us-east-1.amazonses.com`, priority 10.
  - TXT `send` → `v=spf1 include:amazonses.com ~all`.
  - TXT `resend._domainkey` with the existing Resend DKIM public key.
  - CNAME `test` → `ext-cust.squarespace.com`.
  - Two TXT values at `_certum` and one TXT at `verify`; continued purpose unknown.

Use the destination Vercel project's required A/CNAME/verification values. Keep a
working value if unchanged; replace obsolete routing selectively. Preserve Google
email and unrelated records. Compare the new Resend account's required records,
coordinate any DKIM/API-key cutover and test receipt. Do not delete all custom
records or the Domain Connect preset. The handoff contains this exact inventory
and a keep/replace decision table. Snapshot the full current values at cutover.

The existing source Vercel project/team assignment remains an authenticated check
pending team authorization. Public DNS alone does not prove that assignment.

## Dependency update — 2026-11-03

All 13 direct packages were checked against npm's latest stable dist-tags.
Seven packages were upgraded; the other six were already current. Compatible
transitive updates were resolved and the root/client lockfiles synchronized.

| Package | Before | Updated |
| --- | --- | --- |
| React / React DOM | 19.2.4 | 19.3.1 |
| React Icons | 5.5.0 | 5.7.0 |
| React Router DOM | 7.13.1 | 7.18.5 |
| Resend | 6.9.4 | 6.37.0 |
| Vite | 7.3.1 | 8.3.5 |
| Vite React plugin | 5.1.4 | 6.2.1 |

Already latest: `@vercel/analytics` 2.0.1, `@vercel/speed-insights` 2.0.0,
Bootstrap 5.3.8, Leaflet 1.9.4, React Bootstrap 2.10.10, React Leaflet 5.0.0.
The package engine requirement is now explicitly Node.js >=22.12.0; the beginner
Mac guide installs Node.js 24. Vite's migration guide and React plugin compatibility
were reviewed. The simple existing Vite configuration required no API changes.

### Verification

- Root install/update completed; npm reported zero vulnerabilities.
- `npm ls --depth=0` shows the expected direct versions without dependency errors.
- Production builds passed for the root project and the clean client package.
- Clean client `npm ci` passed using the synchronized lockfile.
- Browser checks on the built site passed: project expansion, Leaflet interaction,
  contact navigation, image loading, playable video and footer credit.
- Two visible forms were confirmed: investor signup and footer contact. Earlier
  handoff text referring to a third homeowner form has been corrected.
- Updated Resend SDK tested with mocked transport: three accepted inquiry source
  payloads, serialized reply-to, missing-key handling, method rejection and provider
  rejection all passed. No live inquiry email was sent during this maintenance.
- Local static preview logs include expected missing Vercel Analytics/Speed Insights
  endpoints, which are provided by hosting rather than the local frontend server.
- npm reported an optional `fsevents` install-script approval notice on this Mac;
  both builds and the clean client install passed without broadening script permissions.
- Client archive integrity, asset references, exclusions, known-secret checks,
  Desktop copy checksums and GitHub upload digests are checked when refreshing
  the handoff release. Build output and installed dependencies stay out of the ZIP.

## Remaining client cutover work

1. Kevin creates/signs into his GitHub, Vercel and Resend accounts.
2. His agent extracts the source, creates the clean private repo and pushes `main`.
3. Deploy his new Vercel project and configure client-owned Resend settings.
4. Confirm successful live email receipt through both visible forms.
5. Coordinate any Vercel cross-team verification and apply only required website
   DNS / Resend changes through Kevin's existing Squarespace account.
6. Confirm HTTPS, redirects, production updates, renewal billing and public access.
7. After acceptance, retire the previous Vercel project and personal credentials.

No client account migration, DNS cutover or new-client ownership transfer has
been performed. The handoff is prepared; the owner actions above remain.

## Useful paths

- Main page: `src/pages/HomePage.jsx`, `src/pages/HomePage.css`.
- Header/footer: `src/components/layout/`.
- Map/cards: `src/components/projects/`.
- Content: `src/data/siteContent.json`, `projects.json`, `locations.json`.
- Media: `public/assets/`.
- Email handler/client helper: `api/inquiry.js`, `src/utils/sendInquiry.js`.
- Root README: current Vercel-only build/deployment instructions.

## Previously resolved deployment problems

- CLI deploys encountered `write EPIPE` and an oversized local archive upload.
  Prefer Vercel Git integration and keep handoff/raw archives outside app source.
- Earlier project iterations used a GitHub Pages subpath and versioned preview
  branches. Pages publishing has now been retired; new client production uses `main`.
- Preview authentication and password gates are distinct from ordinary site routing.
  Verify the intended public URLs while signed out, including inquiry access.
