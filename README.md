# MAKENDLESS — Glass Prism

A responsive creative and technology studio website built with React, TypeScript and Vite. The visual identity uses the official Glass Prism palette, self-hosted Syne (400–800), original SVG/CSS artwork, and restrained motion.

## Run locally

Use Node.js 24 (the helper tests use Node’s native TypeScript support).

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

The compiled website is in `dist/`. Configure your static host to serve `index.html` for application routes. Do not deploy without owner approval. This work has not been publicly deployed or pushed to GitHub.

## What is implemented

- Homepage with original folded-glass hero artwork, pointer response, distinct studio previews, interactive capability demonstrations, miniature project teaser, concept work, process and inquiry actions.
- CREATE, BUILD and GROW studio pages with all **13 approved service categories** and a detail route for each.
- Thirteen functional demonstrations: before/after editing with captions/framing, podcast highlights, ad treatments, content formats, motion typography, website transformation, mock storefront/cart/checkout, mock bookings, stepped automation, illustrative optimization, campaign planning, content planning and local presence.
- Living Project Lab: four business types; website, booking, promotional video and assistant modules; add/remove/reset; optional dismissible pairings; editable brief generation, copy and inquiry handoff.
- Five-step rule-based discovery with editable recommendations. No paid AI or hidden API calls.
- Accessible inquiry validation, local inquiry preview and downloadable draft. **No delivery backend is connected. Nothing is sent.**
- Concept portfolio, About, four-step process, FAQ, clearly marked draft Privacy/Terms and a useful not-found page.
- Keyboard-accessible menus, mobile focus containment, route focus handling, reduced-motion alternatives and touch-oriented layouts.

All portfolio projects and business examples are explicitly conceptual. GROW is **Beta / Coming Soon** throughout. No client achievements, testimonials or real performance metrics are invented.

## Routes

| Destination           | Route                                                         |
| --------------------- | ------------------------------------------------------------- |
| Home                  | `/`                                                           |
| Studios               | `/studios`                                                    |
| CREATE / BUILD / GROW | `/studios/create`, `/studios/build`, `/studios/grow`          |
| Service details       | `/services/V1`–`V5`, `/services/T1`–`T5`, `/services/M1`–`M3` |
| Project Lab           | `/project-lab`                                                |
| Guided discovery      | `/find-solution`                                              |
| Concept portfolio     | `/work`                                                       |
| About                 | `/about`                                                      |
| Start a Project       | `/contact`                                                    |
| FAQ                   | `/faq`                                                        |
| Draft legal pages     | `/privacy`, `/terms`                                          |

`/create`, `/build` and `/grow` redirect to the canonical studio paths.

## Checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Latest verification: typecheck, lint and production build pass; **55 tests pass** (5 helper tests and 50 DOM integration tests). See `docs/VERIFICATION.md` for the tested behaviors and important limits.

**Browser visual review is outstanding.** The managed preview relay timed out and the cloud browser tool failed to initialize. Desktop/mobile screenshots, real viewport overflow checks, browser console review and performance measurements could not be collected. This is not a claim of WCAG compliance or achieved Core Web Vitals.

## Project structure

- `src/styles.css`: canonical brand tokens, global Syne typography, homepage, navigation and responsive rules.
- `src/data.ts`: brand configuration, all approved service definitions, studio metadata and business types.
- `src/project.tsx`: in-memory shared project selections.
- `src/brief.ts`: brief generation, deterministic recommendations and optional pairings.
- `src/components/ServiceDemo.tsx`: the 13 demonstrations.
- `src/pages/`: routed homepage, studio, Project Lab, discovery, inquiry and supporting content.
- `public/assets/prism.svg`: original hero artwork.
- `tests/`: behavioral, routing, keyboard and state-transfer regression coverage.
- `docs/`: audit, implementation notes and verification/continuation checklist.

## Data, assets and production setup

Visitor state is held in React memory and resets on refresh. The demo does not persist inquiries, use analytics, call an AI service or process payments. Clipboard copy is initiated by the visitor and includes a manual fallback message. Fonts are served locally through the build. Syne is licensed under SIL OFL 1.1; Lucide uses ISC. Original visual compositions are implemented in this repository; no third-party stock media is used.

Before a real launch, connect and test a delivery backend, provide verified business contact information, review legal documents, replace or supplement concept work with approved real work, and complete browser QA. Service scope, timelines and prices remain subject to discussion.

No production domain is assumed. Route titles and descriptions update client-side; initial HTML includes default Open Graph metadata. A production deployment may benefit from prerendering for link unfurlers. After confirming a domain, generate the sitemap from the project directory:

```bash
SITE_URL=https://your-confirmed-domain.example node scripts/generate-sitemap.mjs
```

This writes `dist/sitemap.xml` and updates `dist/robots.txt`; rerun after each build. Add verified canonical URLs and social sharing images when the production origin is established.
