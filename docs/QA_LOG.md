# QA log

## Baseline and evidence policy

Baseline commit `fb56e76`. Previous redesign recorded 58 passing Node/jsdom tests, typecheck, lint and production build. These are historical results, not new execution results. No previous real-browser visual review was available. Browser evidence and current checks will be appended during this milestone.

## Visual scorecard — pending inspection

| Category                  | Score      | Evidence required                              |
| ------------------------- | ---------- | ---------------------------------------------- |
| Premium visual quality    | Unverified | Actual hero composition screenshots            |
| Originality / direction   | Unverified | Observed service-led spatial composition       |
| Immediate understanding   | Unverified | Review desktop/mobile first screen and nav     |
| Meaningful interactivity  | Pending    | Current interaction tests and browser trial    |
| Responsive/mobile quality | Unverified | 390 / 768 / 1440px rendering                   |
| Design-system consistency | Pending    | Token/font/source audit and visual check       |
| Performance/accessibility | Pending    | Keyboard/fallback tests; measured browser data |

Scores are subjective 1–5 reviews, never proof of objective excellence. A score below 4 requires refinement; unobserved categories are not scored. Core Web Vitals are unmeasured.

## V9 checkpoint — executed results

Date: 2026-11-13 (Asia/Calcutta). Existing React/Vite stack retained.

| Check actually executed                        | Result                                 |
| ---------------------------------------------- | -------------------------------------- |
| `npm run typecheck`                            | Pass                                   |
| `npm run lint`                                 | Pass                                   |
| `npm run test:unit`                            | 5 pass                                 |
| `npm run test:integration`                     | 69 pass across six files               |
| Total                                          | **74 pass**                            |
| Targeted rerun after studio presentation edits | 33 navigation + 13 studio checks pass  |
| Targeted scene wrapper checks                  | 4 pass, mocked renderer lifecycle only |
| `npm run build`                                | Pass                                   |
| `git diff --check`                             | Pass                                   |
| Typography source audit                        | Syne only; no Outfit/Geist references  |

### What these checks establish

- Three-mode showcase DOM behavior: default CREATE, original/edited, play/pause/scrub, BUILD wireframe/device/menu state, AI progression, service-selection handoff.
- Capability paths: unsupported WebGL, reduced motion, data saving, mobile opt-in, reported renderer/context failure, thrown lazy scene error and functional HTML fallback. These tests mock browser/GPU capability and renderer behavior.
- Renderer wrapper lifecycle: update without recreating, fresh callbacks, initialization failure forwarding, unmount and StrictMode disposal.
- Workshop defer/load/selection and homepage Lab business/module interactions and route handoff.
- Existing service demos, route rendering, navigation keyboard focus, project brief, discovery recommendations and truthful inquiry validation.

### Renderer source review and corrections

- On-demand requestAnimationFrame rendering; no idle rotation or persistent particle loop.
- Rendering stops outside viewport or when the document is hidden. A reduced-motion request suppresses decorative pointer/transition motion.
- Pixel ratio capped to 1 on narrow devices / 1.5 otherwise; portrait texture width reduced to 512px, landscape to 1024px.
- Camera fit derives from stage aspect ratio and known workbench bounds. This was corrected after projection arithmetic indicated the primary frame might appear too small. **It has not been visually verified.**
- Added a shared cleanup path used on both unmount and partial setup failure: RAF, observer/listener/image callbacks, materials, textures, geometry, scene, renderer, context and canvas.
- BUILD menu and viewport states synchronize with rendered scene content, not merely labels.

### Bundle evidence, not performance scores

Vite output: initial application JS approximately **98.68 kB gzip**, separate optional Three.js/scene chunk **123.81 kB gzip**, separate service demo JS **8.75 kB gzip**. Studio, Project Lab, discovery, contact and supporting routes are split. Engine loading is gated by capability, visibility and presentation preference. The base HTML stays available during loading/failure. Real LCP, INP, CLS, FPS and GPU memory are **unmeasured**.

## Browser review attempt and blocker

Selected managed environment: `ccarenv_b64_Y2NhcmVudl8wOTRlMDNjMWQ4OWM4MTkxOGNhMmRlNTc2YjkxMDU5YQ`; status connected/running, desktop capability enabled but observed desktop state unknown.

- `cua.getState()` failed: **the gaas-browser node_repl sandbox cannot be disabled**.
- `sites-preview start /workspace/startup/makendless` failed: **relay could not open browser port 4173: timed out waiting for relay readiness**.
- `sites-preview status` confirmed **Sites preview stopped**.

No successful live application URL was returned. No browser screenshots, GPU output, responsive layout/overflow, browser console or motion appearance has been inspected. The build and jsdom tests do not satisfy those acceptance gates. Infrastructure was not bypassed.

## Updated review scorecard

| Category                  | Score              | Reason / limitation                                                                                                      |
| ------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Premium visual quality    | Unverified         | No real rendered screenshots                                                                                             |
| Originality / direction   | Unverified         | Custom service workbench implemented; actual composition unseen                                                          |
| Immediate understanding   | Unverified         | Required copy/nav exist, but five-second visitor review not performed                                                    |
| Meaningful interactivity  | 4/5 provisional    | Tests observe stateful effects and handoff for each service; real GPU/browser usability still needs review               |
| Responsive/mobile quality | Unverified         | CSS and device fallback present; actual 360–1440px inspection blocked                                                    |
| Design-system consistency | 4/5 provisional    | Exact tokens, shared navigation/service configuration and Syne hierarchy checked in source; rendered cohesion unverified |
| Performance/accessibility | Unverified overall | Keyboard/capability/lifecycle tests pass; full browser accessibility and performance not measured                        |

No overall visual acceptance is granted. Provisional scores are source/DOM review judgments, not claims of premium quality.

## Reproduce the outstanding review

Use Node 24, run `npm ci` then `npm run dev`, and open Vite’s printed URL. Test 1440, 1024, 768, 390 and 360px. On a WebGL2-capable desktop the spatial view is attempted automatically; mobile/data-saving/reduced-motion default to the flat view, with explicit spatial opt-in where supported.

Capture: CREATE original/edited/playhead, BUILD wireframe/finished/mobile/menu, AI initial and human-review step, mobile menu, three studio pages, Workshop, all four homepage Lab modules together, full Project Lab, discovery and inquiry. Test reduced motion and disabled WebGL. Change modes, leave/re-enter viewport and navigate away/back; check context/resource cleanup with browser tools. Confirm narrow layouts do not overflow and all controls remain reachable. Record observed issues and 1–5 scores only after this review, refine anything below 4, then measure performance under mobile throttling.
