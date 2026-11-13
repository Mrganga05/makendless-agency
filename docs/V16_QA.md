# MAKENDLESS V16 — verification and remaining acceptance

Recorded 13 November 2026. Branch: `implementation/v16-service-architecture`.

Verified working source checkpoint: `3224103`.

**The service architecture and frontend behavior are implemented and tested. Actual visual acceptance is incomplete.** Automated checks do not establish the exceptional polish requested by the owner.

## Completed checks

| Check                   | Evidence                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript              | `npm run typecheck` passes                                                                                                                              |
| Repository lint         | `npm run lint` passes, including retained lab source                                                                                                    |
| Node helpers            | 5 tests pass                                                                                                                                            |
| React/DOM integration   | Full run: 153 tests across 21 files pass; one additional dual-campaign independence test was then added, and its entire 3-test architecture file passed |
| Final unique test count | 154 DOM + 5 Node = **159 tests**; retained regression tests are included, not presented as all newly added                                              |
| Route/CTA follow-up     | 40 route and service continuity tests pass after the final marketing CTA wording refinement                                                             |
| Production bundle       | `npm run build` passes with Vite 6.4.6                                                                                                                  |
| Whitespace              | `git diff --check` passes                                                                                                                               |
| Source copy audit       | No whole-word AI, automation, automate or assistant terms in production TS/TSX or index metadata                                                        |
| Dependencies/research   | Package manifest, lockfile and isolated lab unchanged                                                                                                   |

The final source uses the seven main homepage sections in the approved order. The architecture test also verifies one H1, unique IDs, independent campaign state and preserved Project Lab navigation. Route coverage renders the service catalog and independent pages, checks titles/landmarks, rejects retired customer-facing terminology, and verifies the T4 redirect.

Behavior coverage includes video comparison/captions/finite playback, actual website controls, campaign objective/creative/placement/reset, service-selection transfer, package additions and Beta exploration, optional recommendations, landing-form validation/invalidation, separate reporting and local-presence demos, Lab reset/context preservation, editable/copyable briefs and clearly unsent inquiry drafts.

Spatial tests use real Three scene objects with a **mocked WebGL driver**. They check shared campaign text/state, placement geometry, creative repaint, finite settling, failure fallback and disposal. They do not execute shaders or verify GPU appearance/memory on hardware.

## Findings fixed

- Changing campaign creative previously shared a class name with story placement. Distinct creative/placement selectors now keep those controls independent.
- Normalizing project selections initially replaced the stable setter with a new function each render. An effect-based caller exposed an update loop; useCallback now preserves setter identity.
- Retired and duplicate service IDs are filtered at the project boundary, preserving other context and invalidating a stale brief. T4 is never repurposed as T6.
- Marketing remains optional future interest; current homepage packages use Explore Beta and service-detail closing actions prepare an interest draft.
- Two campaign instances share no IDs or state despite appearing together on the homepage.

These are source/behavior findings. No aesthetic score is inferred from them.

## Exact browser blockers

The V16 run attempted the actual checkout with:

```text
sites-preview start /workspace/startup/makendless
sites-preview: relay could not open browser port 4173: timed out waiting for relay readiness
```

The browser entry point independently returned:

```text
await cua.getState()
the gaas-browser node_repl sandbox cannot be disabled
```

The managed environment reported connected/running, but those entry points still failed. No application defect was identified as the cause. The supported preview route was not bypassed with another server/browser path. No desktop/mobile screenshot, browser console trace, GPU capture, recording or real preview URL was produced.

## Required visual/device pass

Use Node 24, `npm ci`, `npm run dev`, then open the printed localhost URL. Compare both `?theme=atelier` and `?theme=glass`.

1. Inspect 360, 390, 768, 1024 and 1440px, 200% text zoom and narrow reflow. Check hero headline wrapping, all three studio destinations, preview scale, package readability, footer continuity, navigation, touch targets and horizontal overflow.
2. Compare the seven sections in sequence. Capture actual screenshots; critique hierarchy, imagery, visual variety, spacing and clarity. Refine the weakest observed areas and repeat.
3. Operate both hero and Transformation in all modes, including campaign objective/creative/placement. Test keyboard/focus, source/edit, caption/crop, finite playback, sample website menu and wireframe/mobile variants.
4. Exercise all fourteen services and current package/recommendation paths. Confirm all GROW states are visibly Beta and cannot imply launched delivery, published campaigns or submitted interest.
5. In Project Lab, combine/remove modules, change business/booking/campaign, reset, generate/edit/copy and continue a brief. Verify preserved unrelated context and local inquiry validation/download.
6. Inspect actual physical materials and alignment. Test no WebGL/context loss, reduced motion, hidden/offscreen state, rapid switching and repeated mounting. Profile actual device frame cost and GPU resources.
7. Measure network/loading, layout shift and input responsiveness on representative mobile hardware; use real assistive technology. The 501 kB minified optional spatial chunk (128 kB gzip) triggers Vite's size warning despite lazy loading; evaluate its cost in that measurement.

Visual originality, composition, art direction, brand expression, motion, meaningful 3D, mobile appearance, accessibility and device performance remain **unverified**, without invented ratings or achieved Core Web Vitals.

## Product boundaries

No public deployment occurred. Inquiry sending still needs a real approved backend/contact destination. Legal pages remain drafts. No prices, clients, testimonials, advertising results or company policies were invented. Concepts and reporting figures are explicitly illustrative; all GROW services remain Beta / Coming Soon.
