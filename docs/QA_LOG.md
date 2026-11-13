# QA log

## Current V11 checkpoint — 2026-11-13

Baseline `f8d01c3`; baseline 74 tests passed before this redesign. V11 now changes the full seven-section homepage, open hero stage, 13 service demonstrations, Project Lab, discovery, inquiry, concept studies, About, FAQ, service details and footer. The approved Syne wordmark/headline and exact service data remain.

| Executed check                            | Result                            |
| ----------------------------------------- | --------------------------------- |
| Typecheck and full ESLint                 | Pass                              |
| Helper tests                              | 5 pass                            |
| Navigation/routes/lazy anchors            | 35 pass                           |
| Shared project/discovery/inquiry flows    | 9 pass                            |
| CREATE/BUILD/GROW demonstrations          | 17 pass                           |
| Hero capability/interaction/fallback      | 11 pass                           |
| Supporting concept/FAQ/About interactions | 5 pass                            |
| Homepage Workshop/Lab                     | 4 pass                            |
| Motion lifecycle/focus/reduced-motion     | 7 pass                            |
| Mocked spatial wrapper lifecycle          | 4 pass                            |
| Total                                     | **97 pass** (92 jsdom + 5 helper) |
| Production build and Git whitespace check | Pass                              |

### Integration findings resolved

- Deep links to concept anchors now wait for the lazy destination to mount, with a bounded observer and route-change cleanup. Both anchors have regression coverage.
- Entrances cancel around focused controls and skip already-focused regions; keyboard use cannot trigger a clipped interactive ancestor.
- Removed obsolete global forced card radius and caption padding that overrode the new service presentation.
- M2 changes actual Reel/Carousel/Story composition and frame content while remembering each day's selected format.
- V1 has explicit finite preview playback and reduced-motion discrete frames. Tests cover document hiding. Homepage promotional media is finite and pauses when hidden/offscreen.
- Inquiry regression verifies editing any required field clears a ready preview/download and invalid resubmission focuses the relevant input. The existing invalidation logic was already correct; no unnecessary form rewrite was made.
- Source review found no remaining concrete integration blockers. This is not a rendered visual approval.

### Bundle evidence

Production output: initial application JS **327.28 kB / 102.12 kB gzip**; separate optional Three.js scene **485.78 kB / 123.97 kB gzip**; deferred service demos **38.59 kB / 11.15 kB gzip**. Initial CSS approximately **94.35 kB / 18.70 kB gzip**. Route CSS/JS remain split. No additional dependencies were introduced. These file sizes do not measure browser speed or GPU cost.

### Browser attempts in this V11 turn

- Environment status: running, connected, observed configuration current; shared desktop enabled but state unknown.
- `sites-preview start /workspace/startup/makendless`: **relay could not open browser port 4173: timed out waiting for relay readiness**.
- `cua.getState()`: **the gaas-browser node_repl sandbox cannot be disabled**.
- `sites-preview status`: **Sites preview stopped**.

No successful preview URL, browser screenshots, actual GPU render, console inspection, viewport/overflow verification or performance measurements were obtained. Managed preview infrastructure was not bypassed. The supported Sites/runtime workflow was used for local source work; no hosted deployment occurred.

### V11 acceptance and next review

Visual composition, motion appearance, 3D appearance, five-second customer clarity, rendered consistency and mobile quality remain **unverified**. Functional behavior has automated evidence; full accessibility and performance remain **unverified**. No visual scores are assigned and the brief's final quality gate is still open.

Run `npm ci` and `npm run dev` locally with Node 24. Review 1440, 1024, 768, 390 and 360px. Capture the open hero in all modes; complete seven-section homepage; every studio demo (especially V5 and M2); Project Lab with all four modules and each business; discovery; edited/invalid/valid inquiry; each expanded concept study; About; filtered FAQ; mobile menu; footer. Test keyboard, reduced motion, flat/WebGL modes, explicit internal spatial studies, hidden tabs, scene route unmount and anchor navigation. Refine observed issues before visual sign-off. Measure LCP/INP/CLS and GPU behavior on a mid-range phone; targets 2.5s/200ms/0.1 are still unmeasured.

The historical V9 record below remains evidence for its checkpoint only.

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
