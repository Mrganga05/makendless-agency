# MAKENDLESS — V16 Living Experience

A React/TypeScript/Vite creative and technology studio website, organized around **CREATE — Video Editing**, **BUILD — Website Development** and **GROW — Digital Marketing (Beta / Coming Soon)**.

V16 implements the approved seven-section homepage and revised fourteen-service catalog throughout navigation, studio/detail pages, recommendations, packages, Project Lab and inquiry drafts. Syne, purposeful 3D, finite motion and Prism Atelier remain; Glass Prism is recoverable.

**Source and behavior checks pass. Visual acceptance remains pending:** the managed preview relay and browser failed to start. Desktop/mobile screenshots, real GPU rendering, device performance and accessibility acceptance are not claimed. See [V16 QA](docs/V16_QA.md).

## Run on your computer

Use Node.js 24. In your existing repository:

```bash
git fetch origin
git switch implementation/v16-service-architecture
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Stop with Ctrl+C. For a source ZIP, extract it, open its root folder and start with `npm ci`.

For a built preview:

```bash
npm run build
npm run preview
```

The compiled website is in `dist/`. The workspace checkout is `/workspace/startup/makendless`. The preserved research gallery is separate: `npm run dev --prefix experiments/frontend-lab`.

## What to explore

The homepage contains these seven main sections:

1. **Cinematic Hero:** the approved headline, video comparison/captions, an actual sample website, and an illustrative Digital Marketing Beta campaign. Optional physical 3D follows the same controls.
2. **Three Studios:** three large native destinations with a title-sequence treatment, responsive device composition and campaign direction. GROW displays Beta / Coming Soon.
3. **Live Transformation:** video source/edit and finite playback; website wireframe/finished, desktop/mobile and menu navigation; campaign objective, creative and feed/story placement.
4. **Solutions for You:** creator, local business, startup and online store previews with editable recommendations. Marketing is optional future interest.
5. **Packages & Pricing:** Video Editing, Website Development and Digital Marketing Beta. Scope and deliverables replace invented prices; Beta uses Explore Beta.
6. **How We Work + FAQ:** Discover, Design, Create, Deliver and practical expandable answers.
7. **Final CTA + Footer:** the closing invitation and complete site navigation.

Work, Project Lab and About remain independent pages. The standalone Project Lab combines optional website, booking, promotional video and clearly illustrative marketing modules; generate, edit, copy and carry a brief into inquiry. No configurator is mounted as a homepage section.

Fourteen service demonstrations are available, including a new editable landing page with a validated local form, separate local business profile preview and fictional marketing report with channel/period filtering and editable observations.

## Routes and services

| Destination                       | Route                                                |
| --------------------------------- | ---------------------------------------------------- |
| Homepage / studios                | `/`, `/studios`                                      |
| CREATE / BUILD / GROW             | `/studios/create`, `/studios/build`, `/studios/grow` |
| CREATE services                   | `/services/V1`–`V5`                                  |
| BUILD services                    | `/services/T1`, `T2`, `T3`, `T5`, `T6`               |
| GROW services — Beta              | `/services/M1`–`M4`                                  |
| Project Lab / guided discovery    | `/project-lab`, `/find-solution`                     |
| Concept work / About / FAQ        | `/work`, `/about`, `/faq`                            |
| Inquiry draft / draft legal pages | `/contact`, `/privacy`, `/terms`                     |

T4 is retired, not reused. Its old detail URL redirects to BUILD, and stale selections are discarded before generating a brief. T6 is Landing Page Development; M4 is Marketing Analytics & Reporting. See the [complete catalog](docs/V16_SERVICE_NOTES.md).

`/create`, `/build` and `/grow` redirect to canonical studio paths. A static host must fall back to `index.html` for application routes. Sitemap generation requires a confirmed production origin.

## Themes and verification

Append `?theme=glass` to inspect Glass Prism or `?theme=atelier` for Atelier. The palette survives in-app navigation for that session. Reloading without a theme uses `HOME_THEME` in `src/theme.ts`.

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Review 360, 390, 768, 1024 and 1440px, keyboard/touch, text zoom, reduced motion, disabled WebGL, loading/error states and inquiry handoffs in an actual browser. The [QA record](docs/V16_QA.md) distinguishes automated evidence from outstanding visual/device checks.

- [V16 implementation and checkpoints](docs/V16_IMPLEMENTATION.md)
- [V16 service catalog and demonstrations](docs/V16_SERVICE_NOTES.md)
- [V16 spatial implementation](docs/V16_SPATIAL_NOTES.md)
- [Current brand/theme status](docs/BRAND_AND_THEME_STATUS.md)
- [Original V16 brief](docs/CREATIVE_BRIEF_V16.md)
- [Earlier V14 record — historical](docs/V14_IMPLEMENTATION.md)

Current composition reuses `src/components/v14/` and `src/v14-*.css` filenames. Central business data lives in `src/data.ts`; `src/project.tsx` and `src/brief.ts` own selections and brief generation. Older reusable components and their tests remain, but are not mounted as extra homepage sections. The lab stays isolated in `experiments/frontend-lab/`.

## Demo boundaries

Visitor state stays in React memory and resets on refresh. **No inquiry backend is connected: nothing is sent.** The inquiry validates and offers a local preview/download. Booking, checkout and campaign/reporting demonstrations are simulations. No payments, ad accounts, external publishing, real analytics collection or messages are triggered.

Concepts are not client work. Photography sources/licensing are in [REDESIGN.md](docs/REDESIGN.md); Syne OFL, Lucide ISC and Three MIT notices ship in `public/licenses/`.

A real launch still needs approved delivery configuration and legal content, real portfolio material when available, and browser/device QA. This implementation does not publicly deploy the website. V12, lab and V14 checkpoints remain recoverable in Git.
