# Living Digital Universe — V11 implementation

## Audit and preserved baseline

Checkpoint: `f8d01c3` on main; working branch `feat/living-universe-v11`. The pre-change suite passed all 74 tests in this turn. React 19, TypeScript, Vite, CSS, SVG and the existing raw Three.js renderer remain the stack. No new library, service, font, payment or backend is needed.

Source audit found the main presentation weaknesses: the hero was enclosed by a large dashboard frame; the same framed photo composition recurred; internal routes retained prior gray panels and repeated cards; motion lacked a common lifecycle; the social planner changed its format label without constructing a different output. Existing project state, demos, navigation, routes, brief generation and inquiry validation are useful and preserved.

The V11 brief is active verbatim in CREATIVE_BRIEF.md. V9 and the older operating system are archived. Keep the exact approved wordmark, Syne, Glass Prism tokens, hero copy and all 13 services. GROW remains Beta / Coming Soon. Concepts, simulations and local-only inquiries stay labeled.

## Storyboard and implementation decisions

| Experience                    | Purpose and composition                                                                     | Response and depth                                                                                                                                 | Mobile/fallback/cost                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                          | Explain video, websites and AI beside an open service stage; no surrounding dashboard frame | Original/edited timeline, wireframe/finished/device/menu, five-step workflow; camera entrance and relevant lighting in one reusable Three.js scene | Accessible HTML controls and matching preview; narrow/reduced-motion/save-data default flat; engine lazy, capped DPR and demand frames |
| Studios exhibition            | Three editorial studio entries paired with one large selected world                         | Selection reveals a photo-motion composition, layered café page or beta planning sequence                                                          | Stacked exhibition on narrow screens; SVG/CSS/photo only                                                                               |
| Workshop                      | A tool selection rail and generous live work area                                           | Edit the reel, navigate a website, or step/reset an inquiry flow; results change, not only labels                                                  | Lazy service module near viewport, manual open fallback; no engine required                                                            |
| Homepage Lab                  | Choose a business and see selected capabilities construct an experience                     | Website, mock booking, illustrative film and scripted assistant independently join the composition; shared selection continues to full Lab         | Stable DOM controls, layered CSS framing, paused/offscreen film; all combinations remain usable                                        |
| Selected work                 | Large cinematic frame and offset small-business browser study                               | Leads to named concept case studies with actual source/sequence/device interactions                                                                | Linear mobile sequence; one optional spatial study on Work, explicitly opened                                                          |
| Process                       | Four editorial checkpoints beside a diagram of the idea taking shape                        | Each step changes the SVG composition, explanation and expected handover                                                                           | Native buttons and polite text update; static diagram under reduced motion; no canvas                                                  |
| Final invitation/footer       | A clear next step over a restrained perspective horizon, then useful destinations           | One light pass and purposeful link feedback                                                                                                        | No perpetual animation; preserved wordmark                                                                                             |
| CREATE / BUILD / GROW         | Film / product / planning identities with one focused demo at a time                        | All 13 services have specific stateful outputs; optional reusable spatial study on CREATE/BUILD                                                    | Selectors remain directly reachable; stack/flatten on narrow screens; beta always visible                                              |
| Project Lab                   | Open illuminated stage with business-specific website and independently constructed modules | Shared service selection, valid mock booking, scripted assistant, editable/copyable brief and inquiry handoff                                      | Frames simplify; interactions remain DOM; business changes clear stale demo state                                                      |
| Discovery                     | Connected answer map and a focused question                                                 | Five-step rule-based recommendations with editable selection                                                                                       | Vertical progress and accessible current step; no remote AI                                                                            |
| Contact                       | Live readiness rail beside a readable inquiry sheet                                         | Required-field validation and local preview/download; manual description editing preserved                                                         | Single column; no delivery backend or implied message sent                                                                             |
| About / FAQ / service details | Studio statement, calm question index and service-specific editorial compositions           | Deep links, progressive details and real demos                                                                                                     | Text-first fallbacks, no ornamental canvas                                                                                             |

## Phase status

| Phase | Work                                                          | Status                                                           |
| ----- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| 0     | Audit, checkpoint, preserve identity and behavior             | Complete in source; baseline tests passed                        |
| 1     | Motion/spatial/lighting system                                | Implemented; timing and appearance await browser review          |
| 2     | Open cinematic Living Stage                                   | Implemented; functional checks passed; actual GPU review pending |
| 3     | Seven distinct homepage sections                              | Implemented; responsive visual review pending                    |
| 4–6   | CREATE 5 / BUILD 5 / GROW 3                                   | Implemented; all 17 service integration tests pass               |
| 7     | Project Lab, business construction and handoff                | Implemented; 9 bounded flow tests passed                         |
| 8     | Work, About, discovery, FAQ, contact, service details, footer | Implemented; route and supporting interaction checks pass        |
| 9     | Motion consistency and lifecycle                              | Implemented; source review and 7 lifecycle tests pass            |
| 10    | Performance/accessibility engineering                         | Source/DOM checks pass; device measurements unverified           |
| 11    | Actual desktop/mobile visual review                           | Blocked by managed preview/browser infrastructure                |
| 12    | Functional QA                                                 | 97 tests, typecheck, lint, build and whitespace checks pass      |
| 13    | Save/source delivery                                          | Validated source checkpoint; GitHub sync and archive included in delivery                        |

## Visual acceptance remains open

The supported preview was attempted in this turn and failed at relay readiness. The browser tool also failed to initialize. Do not infer visual quality from successful compilation or jsdom. No actual 360/390/768/1024/1440px render, screenshot, GPU frame or measured Core Web Vital is available. The implementation remains a reviewable V11 checkpoint, not a completed visual quality sign-off.

Once browser access works, follow the exact reproduction checklist in QA_LOG.md. Inspect all major routes and modes, critique composition and motion, refine observed weaknesses, then score the ten V11 gates. The source implementation is intentionally spread across the full site even though the visual gate is blocked.
