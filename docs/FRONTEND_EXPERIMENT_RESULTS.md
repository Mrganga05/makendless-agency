# MAKENDLESS — frontend experiment results

Recorded 13 November 2026. Deliverable: [local Frontend Creative Lab](../experiments/frontend-lab/README.md), under `experiments/frontend-lab/` on `research/frontend-creative-lab`. Baseline: V12 commit `aaec63520e00b010a16534227d188d90a91c6a35`.

**Implemented and behavior-tested; visual acceptance is pending.** No prototype is approved for production. The managed browser could not open, so this report does not claim rendered screenshots, physical-device testing, convincing GPU output or measured Core Web Vitals. The original [V3 brief](FRONTEND_LAB_BRIEF.md) is retained verbatim.

## Delivered experiments

| Experiment                | Hypothesis and implemented behavior                                                                                                                                                                                                            | Verified evidence                                                                                                                                                              | Principal unresolved question                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 01 — Hero directions      | A: original silent vector product-film study with source/edit, framing and finite playback. B: optional embedded spatial interface. C: editable editorial heading with working mini-site and human-review sequence. Only one mounts at a time. | 9 hero tests cover state changes, cleanup, visibility, reduced motion, selected mounting and real prototype actions.                                                           | Which first screen communicates the business most clearly, and which composition remains convincing at every width? No winner selected. |
| 02 — Material & light     | Framed interface display and a physical glass/satin lens; camera, material, light, roughness and transmission controls. Dynamic Three import, on-demand rendering, adaptive SVG view and explicit opt-in.                                      | 6 mocked-renderer tests cover fallback controls, option updates, opt-in, import cancellation, failures and disposal calls. Source audit found explicit owned-resource cleanup. | Real transmission, shader/device behavior, framing, context recovery, memory and GPU cost need actual browser measurement.              |
| 03 — Motion language      | A shared finite playhead composes type, masking, SVG path and scene changes. Working film/site/workflow states, hold/replay/scrub and observed narrative chapters.                                                                             | 6 tests cover time/state behavior, reduced motion, visibility and observer cleanup.                                                                                            | Actual rhythm, frame pacing, text readability and scroll continuity remain unobserved.                                                  |
| 04 — Live components      | Native-range video comparison; wireframe/finished HTML website with local validated form; inspectable inquiry → classification → routing → draft → human review.                                                                               | 9 tests verify real actions, empty/invalid states, classification/routing, editable drafts and invalidation. No external sends or AI API requests.                             | Touch/assistive-technology behavior, visual finish, narrow layout and discoverability need browser/device review.                       |
| 05 — Section compositions | Dark studio sequence; light editorial CREATE/BUILD/GROW service selection; interactive local project with optional booking and scripted chat modules.                                                                                          | 3 tests cover functional selectors, project assembly and local outcomes.                                                                                                       | Are the three compositions distinctive yet coherent? Source differences alone cannot answer this.                                       |
| 06 — Responsive review    | Intrinsic iframe widths 360/390/768/1024/1440; theme/motion/fallback propagation; manual eleven-category JSON export.                                                                                                                          | 4 tests verify viewport/configuration changes, iframe navigation tracking and exported evidence. Scores are keyed to their review configuration.                               | Inspect real full-shell and embedded layouts. An iframe does not emulate touch hardware, device GPU, browser UI or network conditions.  |

Shared gallery: **4 additional tests** verify selected lazy mounting, real destinations, settings, embed behavior and the skip link. All demonstrated projects are labeled concepts/simulations. GROW remains Beta / Coming Soon. Production services, routes and inquiry logic are untouched.

## Checks actually completed

Final implementation check, from `experiments/frontend-lab/`:

| Command                  | Result                      | Scope                                                                                                            |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm run typecheck`      | Passed                      | Strict lab TypeScript, including tests and build/test config.                                                    |
| `npm run lint`           | Passed                      | Lab source, tests and TypeScript config files.                                                                   |
| `npm test`               | **41 passed, 7 test files** | jsdom interaction/lifecycle tests; WebGL renderer mocked.                                                        |
| `npm run build`          | Passed                      | Vite 6.4.6 production-mode lab bundle in its own `dist/`.                                                        |
| Production baseline diff | No differences              | Root `src/`, `public/`, `tests/`, package/lock, index and build/lint/TypeScript configuration compared with V12. |

The existing production test suite was not rerun: those source/config/test inputs were unchanged. New work is limited to the experiment directory and project guidance. No dependencies were added and no public website deployment occurred.

### Build-cost evidence

Vite's build report uses decimal kB; these are asset sizes, not network/device timings:

| Emitted asset group                 |           Uncompressed |                  Gzip |
| ----------------------------------- | ---------------------: | --------------------: |
| Main lab JavaScript                 |              232.39 kB |              72.96 kB |
| Hero module JavaScript              |               15.12 kB |               5.29 kB |
| Spatial controls module JavaScript  |                8.08 kB |               3.15 kB |
| Deferred Three/renderer module      |              490.14 kB |             123.30 kB |
| Motion / Live / Sections JavaScript | 9.42 / 18.50 / 8.45 kB | 3.68 / 6.19 / 3.16 kB |
| Responsive review JavaScript        |                5.17 kB |               2.34 kB |

These exclude CSS, font files, shared icon chunks and HTML. Fonts are locally bundled Syne Variable subsets; no remote imagery is required. Three is a substantial optional cost. Lazy loading is visible in emitted chunks and source boundaries; an actual browser waterfall is still needed to verify request timing, caching and loading experience. Do not interpret bytes or test duration as LCP, INP, CLS, FPS or GPU-memory results.

## Source and behavior critique → refinements

An independent integration review produced concrete corrections before the final checks:

- Fixed the skip link so it focuses the current experiment without changing routes.
- Kept manual ratings tied to experiment, viewport, palette, effective reduced motion and fallback setting. Synced in-frame route changes so a Live review cannot be exported as Hero. Internal hero/scene selection still belongs in the review notes.
- Corrected paper-on-paper outer hero text and wrong muted tokens on light surfaces. Gave embedded spatial controls an explicit paper panel.
- Changed canvas/SVG font declarations to the loaded `Syne Variable` family. Changed the spatial illustration/texture CTA background to the light accent; declared opaque token contrast is at least 9.20:1, as recorded in spatial notes. This does not establish every rendered contrast state.
- Removed rapidly changing implicit live-status output from time/progress readouts; retained useful native range value text and deliberate state feedback.
- Corrected stale held sequence state and checked finite playback, hidden/offscreen stops, observers, listeners and renderer ownership.
- Replaced the sidebar with a horizontal index at widths ≤1100px so the full gallery avoids the identified 768px compression risk. This is a source-based preventive refinement; its rendered quality remains to be checked.

Useful repeatable patterns: native controls plus derived state; explicit state invalidation after input edits; bounded playheads; content visible without animation; optional Three with readable fallback; review records tied to a known configuration.

Deferred choices: no hero winner, no palette replacement, no production section-order decision, no new animation framework, no elaborate postprocessing. No concept was rejected on purported visual evidence; none was available. The two palette candidates and three hero directions remain available for an honest comparison.

## Browser execution limitation

Actual attempts during this task:

1. `sites-preview start /workspace/startup/makendless/experiments/frontend-lab` failed: `sites-preview: relay could not open browser port 4173: timed out waiting for relay readiness`.
2. The browser control entry point `cua.getState()` failed: `the gaas-browser node_repl sandbox cannot be disabled`.
3. Final `sites-preview status`: `Sites preview stopped`.

No real screenshots or interaction recordings were captured. DOM tests are not screenshots. No GPU/browser/device/assistive-technology/performance result is inferred from them. The local launch command and reproducible steps are provided in the lab README so the outstanding inspection can be completed in a working browser.

## Eleven-category scorecard

**U = Unverified**, not a zero, pass or hidden estimate. N/A applies only where the lab tool itself has no 3D composition. Interaction tests establish specified behavior, but do not justify a holistic quality rating. Enter 1–5 only after observing the criterion with evidence.

| Criterion                  | 01 Heroes | 02 Spatial | 03 Motion | 04 Live | 05 Sections | 06 Review |
| -------------------------- | --------- | ---------- | --------- | ------- | ----------- | --------- |
| Visual composition         | U         | U          | U         | U       | U           | U         |
| Originality                | U         | U          | U         | U       | U           | U         |
| Professional finish        | U         | U          | U         | U       | U           | U         |
| Brand consistency          | U         | U          | U         | U       | U           | U         |
| Clear communication        | U         | U          | U         | U       | U           | U         |
| Motion choreography        | U         | U          | U         | U       | U           | U         |
| 3D quality where relevant  | U         | U          | N/A       | N/A     | N/A         | N/A       |
| Actual interaction quality | U         | U          | U         | U       | U           | U         |
| Mobile presentation        | U         | U          | U         | U       | U           | U         |
| Performance                | U         | U          | U         | U       | U           | U         |
| Accessibility              | U         | U          | U         | U       | U           | U         |

Use the [visual QA checklist](VISUAL_QA_CHECKLIST.md) and export reviews with browser/device, exact configuration, concept/state, evidence names and concrete defects. Any score below 4 requires a specific improvement and another review. The next priorities are: (1) rendered hierarchy and mobile overflow; (2) actual spatial appearance and GPU lifecycle; (3) touch/keyboard/assistive-technology and frame/performance measurement. Do not begin the full redesign as if these gates had passed.

The [integration roadmap](FRONTEND_IMPLEMENTATION_PLAN.md) explains how reviewed, approved patterns could become one production slice at a time. Specialist findings and primary research sources remain in the linked guides and lab notes. This is persistent project knowledge, not a claim that the model has been retrained.
