# MAKENDLESS — V14 Living Experience

A React/TypeScript/Vite creative and technology studio website. V14 implements the ten-section customer journey, an interactive CREATE / BUILD / AI hero, three studio worlds, optional physical 3D, working service demonstrations and project-to-inquiry flows. Syne and MAKENDLESS branding are retained. Atelier is the current testable direction; Glass remains recoverable.

**The frontend is implemented and behavior-tested. Visual acceptance remains pending:** this environment's browser and preview relay failed. No desktop/mobile screenshots, GPU inspection, WCAG compliance or achieved Core Web Vitals are claimed. See [V14 QA](docs/V14_QA.md).

## Run on your computer

Use Node.js 24 (the helper tests use native TypeScript support). In your existing repository:

```bash
git fetch origin
git switch implementation/v14-living-experience
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Stop with Ctrl+C. For a source ZIP, extract it, open the extracted root folder, and start with `npm ci`.

For a built preview:

```bash
npm run build
npm run preview
```

The compiled website is in `dist/`. The local source is `/workspace/startup/makendless`. The preserved research gallery is separate: `npm run dev --prefix experiments/frontend-lab`.

## What to explore

The homepage has ten sections, in this order:

1. **Living Hero:** switch CREATE / BUILD / AI; compare treatments, operate the sample site and step through a human-reviewed workflow.
2. **Three Studios:** cinematic CREATE, responsive BUILD and editorial GROW. Every world opens a dedicated route.
3. **Live Transformation:** a dominant service stage with meaningful comparison, layout and automation controls.
4. **Client Solutions:** creator, local business, startup and online store concepts; edit the recommendations before using them.
5. **Selected Work:** clearly labeled original concepts with working media/type treatments and real inquiry paths.
6. **Packages:** Video Content, Websites & Digital Products, AI & Automation; deliverables, scope factors and optional additions, without invented prices.
7. **Living Project Lab:** Salon, Café/Restaurant, Gym/Fitness and General Business previews; add/remove website, booking, promotional film and simulated assistant modules; generate, edit, copy and carry a brief into inquiry.
8. **Behind MAKENDLESS:** a typography-led studio introduction using genuine positioning, without invented people or biographies.
9. **Process & FAQ:** Discover, Design, Create, Deliver; practical answers without fabricated turnaround/revision policies.
10. **Final Invitation:** a direct project CTA and complete footer navigation.

All 13 service routes remain available, with distinct working demonstrations: video editing, podcast clips, ad treatments, repurposing, kinetic typography, website transformation, mock store/cart/checkout, mock booking, editable workflow, illustrative optimization, simulated campaigns, editable content calendar and local presence. GROW stays **Beta / Coming Soon**.

The optional Three.js stage uses physical transmission, generated reflections and finite camera/material changes tied to service state. It is lazy loaded and has reduced-motion/mobile/data-saving handling, explicit cleanup and HTML fallback. The Project Lab uses CSS perspective around its actual HTML interface, not a second WebGL scene.

## Themes and review

Append `?theme=glass` to the local URL to inspect Glass Prism or `?theme=atelier` for Atelier. The chosen palette survives in-app navigation for that session. Reloading a URL without a theme uses `HOME_THEME` in `src/theme.ts`. There is no persisted preference or customer-facing theme dashboard.

Review 360, 390, 768, 1024 and 1440px; keyboard, touch, 200% text zoom, reduced motion, disabled WebGL, loading/error states and all inquiry handoffs. Check actual visual rhythm across consecutive sections. Use [V14 QA](docs/V14_QA.md) for exact remaining checks and evidence limits.

## Routes

| Destination                | Route                                                         |
| -------------------------- | ------------------------------------------------------------- |
| Homepage                   | `/`                                                           |
| Studios                    | `/studios`                                                    |
| CREATE / BUILD / GROW      | `/studios/create`, `/studios/build`, `/studios/grow`          |
| Service details            | `/services/V1`–`V5`, `/services/T1`–`T5`, `/services/M1`–`M3` |
| Project Lab                | `/project-lab`                                                |
| Guided discovery           | `/find-solution`                                              |
| Concept work / About / FAQ | `/work`, `/about`, `/faq`                                     |
| Inquiry draft              | `/contact`                                                    |
| Draft legal pages          | `/privacy`, `/terms`                                          |

`/create`, `/build` and `/grow` redirect to canonical studio paths. A future static host must fall back to `index.html` for application routes.

## Checks and project knowledge

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

- [Implementation record and checkpoints](docs/V14_IMPLEMENTATION.md)
- [Verification and remaining review](docs/V14_QA.md)
- [Spatial implementation](docs/V14_SPATIAL_NOTES.md)
- [All-service coverage](docs/V14_STUDIO_SERVICE_NOTES.md)
- [Motion registry](docs/V14_MOTION.md)
- [Original V14 brief](docs/CREATIVE_BRIEF_V14.md)

New homepage composition lives in `src/components/v14/` and `src/v14-*.css`. Central business data remains in `src/data.ts`; `src/project.tsx` and `src/brief.ts` own shared selections and brief generation. Older homepage components and their regression coverage are retained as history but are no longer the homepage entry point. The lab remains isolated in `experiments/frontend-lab/`.

## Honest demo boundaries

Visitor state stays in React memory and resets on refresh. **No inquiry backend is connected: nothing is sent.** The form validates and offers a local preview/download. Booking, checkout, chat and workflows are simulations; no payments, AI calls, analytics or external messages occur. Concepts are not client work. Photography is used in labeled concept compositions; sources/licensing are recorded in [REDESIGN.md](docs/REDESIGN.md). Syne OFL, Lucide ISC and Three MIT notices ship in `public/licenses/`.

A real launch still needs approved contact/delivery configuration, legal review, authorized real portfolio assets when available, and actual browser/device QA. No public website deployment occurred in this task. V12 and the research lab remain recoverable in Git.
