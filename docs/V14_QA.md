# MAKENDLESS V14 — verification and acceptance

Recorded 13 November 2026. Implementation branch: `implementation/v14-living-experience`. Working frontend checkpoint: `784eab7`. Source scope is the actual website, not a lab-only prototype. No public website deployment occurred.

**Implemented and behavior-tested, with visual acceptance outstanding.** Browser tools failed before the redesign could be rendered. This report does not equate a passing build with an exceptionally polished design. It records what can actually be established and the precise outstanding review.

## Implementation milestone evidence

| Phase                     | Delivered                                                                                                                                              | Evidence / acceptance status                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 0 Audit                   | Read V14, project guidance, service catalog, lab source/notes, route/state flows; preserved V12/lab Git history                                        | Browser startup attempted and failed; source audit completed.                                                            |
| 1 Visual system           | Site-wide Atelier tokens, recoverable Glass URL override, Syne, navigation/footer and light inquiry treatment                                          | Two palette/navigation/cleanup tests; calculated opaque text/button pairs pass.                                          |
| 2–3 Architecture and hero | Ten sections in required order; exact hero message; CREATE comparison/captions/crop, BUILD functional site, AI editable workflow; optional physical 3D | Architecture/inquiry tests, 17 hero/showcase tests and renderer coverage. Actual composition and GPU quality unverified. |
| 4 Studios                 | Three different interactive world compositions with real studio destinations and visible GROW Beta                                                     | World interaction and route tests; narrow-grid rules authored, not visually approved.                                    |
| 5 Transformation          | A large shared demonstration with real service switching, finite playback, wireframe/device navigation and human-review workflow                       | State, invalidation, fallback and reduced-motion tests.                                                                  |
| 6 Solutions/work/packages | Four client types, editable recommendations, labeled concept projects, scoped package groups and additions                                             | Seven business-section tests; inquiry transfer preserves context and clears stale brief.                                 |
| 7 Project Lab             | Four businesses, optional website/booking/film/chat, explicit example adoption, reset/explore, generate/edit/copy/continue                             | Six new Lab tests plus nine project/inquiry/discovery flow tests.                                                        |
| 8 About/process/final CTA | Genuine typography-led studio introduction, four steps, practical FAQ and direct closing invitation                                                    | Links/landmarks/FAQ and inquiry paths tested; no fabricated team or policy content.                                      |
| 9 Service experiences     | All 13 distinct demonstrations retained/refined, clearer studio/detail presentation, inquiry transfer fix                                              | Seventeen studio/demo tests plus supporting and V14 service tests. No catalog deletion or rename.                        |
| 10 Motion                 | Finite caption and film sequences, state construction, mode/camera changes, shared viewport entrances and feedback                                     | Existing motion lifecycle tests plus new playback/renderer tests; visual rhythm and device frame cost unverified.        |
| 11 Responsive review      | Deliberate authored breakpoints, stacked mobile hero/worlds, native controls, compact fallback                                                         | Source and DOM checks only. Actual 360/390/768/1024/1440px review remains open.                                          |
| 12 Functional QA          | TypeScript, lint, unit/DOM tests, production build, token checks and source review                                                                     | All completed checks pass; browser/device/AT/CWV checks unavailable.                                                     |
| 13 Delivery               | Source checkpoints, documentation, local instructions and source archive                                                                               | No genuine preview URL or screenshots available.                                                                         |

## Exact automated results

From the repository root, final source snapshot:

- `npm run typecheck` — passed.
- `npm run lint` — passed, including retained lab source.
- `npm test` — **149 tests passed**: 5 Node helper tests and 144 jsdom integration/component tests across 19 files.
- `npm run build` — passed with TypeScript project compilation and Vite 6.4.6.
- `git diff --check` — passed.
- Baseline comparison against `cc43884`: `src/data.ts`, `src/project.tsx`, `src/brief.ts`, package and lockfile unchanged. The 13 service IDs/names, business model and dependencies are preserved.
- Declared `--home-*` references in new V14, showcase and site-theme CSS all resolve to central palette keys.

Tests cover route titles/landmarks, all 13 service destinations, keyboard menu handling, selected-service transfer, inquiry validation and unsent local drafts, editable recommendations, package additions, booking/chat reset, brief copying/manual fallback, finite playback, reduced-motion logic, renderer initialization/failure/disposal and stale callbacks. Retained older component tests remain regression coverage; their count is not presented as 149 new V14 tests.

The Three scene graph is tested with a mocked WebGL driver. It does not execute actual shaders or prove GPU memory release on hardware. DOM tests do not establish actual focus visibility, screen-reader speech, CSS overflow, touch behavior or visual finish.

## Concrete review findings and fixes

The implementation received an independent source review. Corrections before final checks:

1. Raised critical hero availability and demo/workflow labels to readable source sizes. GROW Beta is now 10px in normal flow, not 6px absolutely positioned. Final readability still needs rendered inspection.
2. Kept hero HTML geometry stable when the optional renderer becomes ready/fails. The canvas enhances its reserved composition instead of shrinking the real interface asynchronously.
3. Made the selected hero mode feed the inquiry service. The untouched default demonstration does not silently select a paid service.
4. Preserved classification/draft review as explicit local actions; edits invalidate stale downstream workflow state.
5. Preserved unrelated project selections/context on Lab reset; invalidated old booking/chat/brief feedback after relevant changes.
6. Removed invented storefront currency amounts while retaining working product quantities/cart/mock checkout.
7. Fixed service-detail final CTA so it carries the current service into inquiry.
8. Corrected pale inquiry-draft text on its new paper background and dark About word-art text over a retained dark gradient. Both now use matching centralized surface/text tokens with enough selector specificity to survive lazy CSS imports.

No visual review score is assigned from these source findings.

## Color calculations

WCAG relative-luminance calculations for opaque declared token pairs:

| Pair                   | Atelier |   Glass |
| ---------------------- | ------: | ------: |
| White / night          | 17.74:1 | 17.32:1 |
| Muted dark / night     | 10.38:1 |  8.50:1 |
| Ink / paper            | 16.56:1 | 17.32:1 |
| Muted light / paper    |  5.92:1 |  6.85:1 |
| White / primary action |  5.13:1 |  6.43:1 |
| Violet ink / paper     |  7.37:1 |  7.00:1 |
| Ink / light violet     |  8.66:1 |  9.59:1 |

All exceed 4.5:1. These calculations do not test every state, alpha blend, photo overlap, canvas texture, focus boundary or disabled control. They are not an overall accessibility claim.

## Build cost, not performance claims

Final Vite output, decimal kB:

| Asset                             | Uncompressed |      Gzip |
| --------------------------------- | -----------: | --------: |
| Main JavaScript                   |    359.95 kB | 111.62 kB |
| Initial CSS                       |    132.53 kB |  24.43 kB |
| Optional SpatialScene/Three chunk |    499.94 kB | 127.70 kB |
| Service demo JavaScript           |     40.55 kB |  11.76 kB |
| Supporting route JavaScript       |     30.84 kB |  10.17 kB |
| Inquiry route JavaScript          |      9.57 kB |   3.40 kB |

The build also includes fonts, photographs and route CSS. Existing photograph files are roughly 350 KiB mountain and 138 KiB coffee. Lazy chunks are emitted; their real request timing/cache behavior must be checked in a browser waterfall. The renderer is a material cost and should stay optional. Existing shared route CSS remains a simplification opportunity after rendered regression review.

No LCP, INP, CLS, FPS, Lighthouse score or device-memory number was measured. Targets remain LCP≤2.5s, INP≤200ms and CLS≤0.1; field thresholds refer to 75th-percentile real-user results.

## Actual browser blockers

At the start of this task, the actual website checkout was supplied to:

`sites-preview start /workspace/startup/makendless`

It failed: `sites-preview: relay could not open browser port 4173: timed out waiting for relay readiness`.

The cloud browser entry point `cua.getState()` independently failed: `the gaas-browser node_repl sandbox cannot be disabled`.

The subsequent status command returned `Sites preview stopped`. No source/config defect was identified that would repair this infrastructure. The supported preview workflow prohibits replacing or bypassing it and permits retries after a concrete repair/evidence of recovery. No repeated failed calls are counted as visual review. No screenshots, recordings, preview URL, browser console trace or physical-device result exist for this task.

## Required visual/device acceptance pass

Run `npm ci` and `npm run dev` with Node 24, then open the printed localhost URL. Use both `?theme=atelier` and `?theme=glass`.

1. Inspect the ten-section sequence at 360/390/768/1024/1440px, plus 200% text zoom and 320px reflow. Check headline wrapping, fixed/sticky navigation, media crops, horizontal overflow, meaningful hierarchy, touch targets and CTA visibility. Capture actual screenshots.
2. In hero and Transformation, compare all three modes, source/edit split, captions/crop, six-second playback, website device/menu, empty/edited inquiry, draft and human review. Verify still/reduced mode preserves understanding.
3. Navigate all 13 service detail pages and the three studio worlds. Check keyboard/focus, the cart/checkout, date/time changes, campaign/calendar/local-profile states and Beta labels.
4. Exercise client recommendations and every package→inquiry path. In Project Lab, combine/remove all four modules, change business/date/time/question, reset, edit/copy a brief and continue. Confirm nothing claims delivery or booking.
5. Inspect actual material/refraction and alignment around HTML. Test no-WebGL, context loss, hidden/offscreen behavior, rapid mode switching, repeated navigation and resource cleanup in real browser/GPU tools.
6. Measure waterfall, layout shifts, input latency and painting on representative mobile hardware. Use real assistive technology. Fix the three weakest observed areas, capture new evidence and repeat relevant checks.

Score each major experience 1–5 only after observation across visual originality, composition, art direction, brand, motion, meaningful 3D, interaction, user understanding, mobile, accessibility, performance and business usefulness. **All 12 subjective categories are currently Unverified** for actual rendered review; irrelevant 3D may be N/A. Every observed score below 4 requires a concrete refinement and recheck. Do not convert passing tests into aesthetic scores.

## Remaining product limits

The inquiry flow is a clearly labeled local demo because no backend/contact destination is supplied. It validates and creates a downloadable draft; it never says a message was sent. Real customer sending, public hosting, approved legal policy, pricing, real team imagery and client portfolio evidence require their actual inputs/authorization. These gaps are not filled with fabricated claims.
