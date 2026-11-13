# MAKENDLESS — Prism Atelier

A responsive creative and technology studio website built with React, TypeScript and Vite. The V12 homepage uses the Prism Atelier palette, self-hosted Syne (400–800), an open service stage, original interactive concepts, and light/dark editorial sections. Internal pages retain the previous Glass Prism direction until the homepage receives visual approval.

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

The compiled website is in `dist/`. Configure your static host to serve `index.html` for application routes. Do not deploy without owner approval. Public website hosting has not been configured. The source is available in the GitHub repository after the owner-authorized push.

## What is implemented

- Nine-section homepage: cinematic hero → porcelain service gallery → transformation stage → customer-specific journeys → package/estimate guide → original concept work → example-first Project Lab → process and FAQs → project invitation. Compact Studios / Work / Project Lab / About navigation.
- CREATE, BUILD and GROW studio pages with all **13 approved service categories** and a detail route for each.
- Reusable lazy Three.js service stage (hero and explicitly opened studio/work studies): default CREATE editing frame/timeline, BUILD wireframe/device/menu states, AI workflow. Accessible HTML controls/fallbacks, reduced-motion/data-saving/mobile handling, on-demand rendering and resource cleanup. Real GPU appearance remains unverified.
- Thirteen functional demonstrations with distinct presentation and motion: before/after editing with captions/framing/output format, podcast highlights, ad treatments, content formats, editable motion typography with tempo/replay, website transformation and usable sample collection, mock storefront/cart/checkout, mock bookings, stepped automation, illustrative optimization, campaign planning, per-day Reel/Carousel/Story planning with real frame previews, and local presence.
- Homepage Lab starts with an attractive, explicitly unselected example. It supports generate/edit/copy brief and inquiry handoff directly on the homepage. Example services enter the real project only after an explicit selection.
- Living Project Lab: four business types; website, booking, promotional video and assistant modules; add/remove/reset; optional dismissible pairings; editable brief generation, copy and inquiry handoff.
- Optional customer journeys and scope-based packages preserve project context and transfer relevant service IDs. No approved prices are supplied; packages explain deliverables, scope factors and the tailored-estimate process.
- Five-step rule-based discovery with editable recommendations. No paid AI or hidden API calls.
- Accessible inquiry validation, local inquiry preview and downloadable draft. **No delivery backend is connected. Nothing is sent.**
- Interactive concept case studies, editorial About, four-step process, searchable FAQ, clearly marked draft Privacy/Terms and a useful not-found page.
- Eight documented motion families: kinetic typography, construction, masks, prism light, spatial changes, micro feedback, editorial progression and functional media. A shared controller manages viewport/lazy-route entrances, focused controls, reduced motion and cleanup.
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

Latest verification: typecheck, lint and production build pass; **119 tests pass** (5 helper tests and 114 DOM integration tests). See `docs/QA_LOG.md` for current evidence and limits. `AGENTS.md` and `docs/CREATIVE_BRIEF.md` contain the active V12 homepage-first instructions; historical reports remain for context.

**Browser visual review is outstanding.** The managed preview relay timed out and the cloud browser tool failed to initialize. Desktop/mobile screenshots, real viewport overflow checks, browser console review and performance measurements could not be collected. This is not a claim of WCAG compliance or achieved Core Web Vitals.

## Project structure

- `src/styles.css`: canonical brand tokens, global Syne typography, homepage, navigation and responsive rules.
- `src/data.ts`: brand configuration, all approved service definitions, studio metadata and business types.
- `src/project.tsx`: in-memory shared project selections.
- `src/brief.ts`: brief generation, deterministic recommendations and optional pairings.
- `src/components/ServiceDemo.tsx`: the 13 demonstrations.
- `src/pages/`: routed homepage, studio, Project Lab, discovery, inquiry and supporting content.
- `src/components/LiveShowcase.tsx`, `src/showcase-state.ts`: accessible hero controls, capability fallback and typed shared state.
- `src/components/SpatialScene.tsx`, `src/three/living-scene.ts`: lazily loaded Three.js presentation and lifecycle.
- `src/components/HomeExperiences.tsx`: retained V11 experience components and regression coverage; V12 uses the new home directory.
- `src/navigation.ts`: centralized primary navigation and studio destinations.
- `src/components/MotionSystem.tsx`, `src/motion.css`: shared entrance lifecycle and focused/reduced-motion handling.
- `src/theme.ts`, `src/components/RouteTheme.tsx`, `src/atelier-theme.css`: centralized Atelier/Glass palettes and homepage-only theme application.
- `src/components/home/`, `src/homepage-atelier.css`, `src/home-*.css`: the nine-section homepage and real customer/project interactions.
- `src/pages/Studios.tsx`: deferred existing studio index; its prior layout and CSS stay off the homepage path.
- `src/universe.css`: prior internal-page atmosphere.
- `src/living-home.css`, `src/studio-worlds.css`, `src/flows.css`, `src/supporting.css`, `src/footer.css`: page-specific compositions.
- `docs/MOTION_SYSTEM.md`: motion registry, spatial rules and review limits.
- `public/images/`: locally bundled concept photography; sources and licensing in `docs/REDESIGN.md`.
- `tests/`: behavioral, routing, keyboard and state-transfer regression coverage.
- `docs/`: audit, implementation notes and verification/continuation checklist.

## Data, assets and production setup

Visitor state is held in React memory and resets on refresh. The demo does not persist inquiries, use analytics, call an AI service or process payments. Clipboard copy is initiated by the visitor and includes a manual fallback message. Fonts are served locally through the build. Syne is licensed under SIL OFL 1.1; Lucide uses ISC; Three.js uses MIT. License notices ship in `public/licenses/`. Original visual compositions are implemented in this repository. Unsplash photography is bundled locally for fictional concept projects; source/license links are recorded in `docs/REDESIGN.md`.

Before a real launch, connect and test a delivery backend, provide verified business contact information, review legal documents, replace or supplement concept work with approved real work, and complete browser QA. Service scope, timelines and prices remain subject to discussion.

No production domain is assumed. Route titles and descriptions update client-side; initial HTML includes default Open Graph metadata. A production deployment may benefit from prerendering for link unfurlers. After confirming a domain, generate the sitemap from the project directory:

```bash
SITE_URL=https://your-confirmed-domain.example node scripts/generate-sitemap.mjs
```

This writes `dist/sitemap.xml` and updates `dist/robots.txt`; rerun after each build. Add verified canonical URLs and social sharing images when the production origin is established.

## Theme and approval status

Prism Atelier combines #0C1024 dark media surfaces and #F6F7FC porcelain galleries with #6F45F6 violet actions and #08BBD4 aqua detail. All homepage values and accessible derived states live in `src/theme.ts`. `HOME_THEME` selects `atelier`; changing it to `glass` restores the previous brand palette as an alternate option. Internal navigation removes the homepage brand overrides. Syne and the wordmark remain unchanged.

Calculated core text/button contrast pairs exceed 4.5:1; this does not verify all rendered states or WCAG compliance. Browser screenshots and responsive visual approval are still unavailable. The brief references seven screenshots that were not included in the received attachment.

Still requiring owner-supplied approval before claiming them: price figures/currency, exact revision and turnaround policies, verified client work/testimonials, and production contact/delivery configuration. The site uses truthful concepts and a tailored-estimate path in their absence. No public deployment has occurred.
