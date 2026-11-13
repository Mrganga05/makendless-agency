# Implementation plan — Living Experience V9

## Audit and reconciliation

Baseline: `fb56e76` on main. React 19 + TypeScript + Vite 6, React Router 7, CSS, self-hosted Syne. No prior AGENTS.md. Existing source has 13 working service demos, 3 studio destinations, service details, shared project context, Project Lab, guided discovery, concept portfolio, FAQ/legal/about and demo inquiry. No backend or verified production domain. Existing 58-test suite uses Node and jsdom; earlier browser review was blocked by cloud tools.

The new creative brief supersedes the preceding minimal-nav/photo-hero choices: restore a compact Studios menu and Project Lab link; default the hero to video editing; add BUILD and AI modes and genuine service-led 3D. Keep working demos, routes, data and inquiry logic. The existing cafe-first hero is to be replaced; later homepage sections remain pending the first visual review gate.

## Phases

| Phase | Scope                                           | Status                                                       |
| ----- | ----------------------------------------------- | ------------------------------------------------------------ |
| 1     | Audit and persistent instructions               | Installed; current findings above                            |
| 2     | Centralized architecture and compact navigation | In progress                                                  |
| 3     | Lazy 3D Living Showcase + HTML fallbacks        | In progress                                                  |
| 4     | Complete seven-section homepage sequence        | Planned after initial visual review                          |
| 5–7   | CREATE 5 / BUILD 5 / GROW 3 demos               | Existing functional baseline retained; visual review pending |
| 8     | Living Project Lab                              | Existing functionality retained; visual review pending       |
| 9     | Guided discovery and pairings                   | Existing functionality retained                              |
| 10    | Supporting pages and inquiry                    | Existing functionality retained; inquiry remains demo        |
| 11    | Visual refinement                               | Pending genuine desktop/mobile review                        |
| 12    | Full checks and deliverables                    | Initial-milestone checks pending                             |

## Component decisions

V9 supersedes the active creative brief; V1 is archived in docs/CREATIVE_OPERATING_SYSTEM_V1.md. V9 retains the same primary navigation and three uncluttered hero modes, with GROW clearly available as a beta destination. Hero uses the exact V9 headline and CTAs. All seven homepage experiences will be integrated after the core showcase controls pass checks; visual acceptance stays pending if browser tools cannot start.

### Navigation

Purpose: reach the right studio or project tool in one deliberate action. Immediate message: video, websites/AI and forthcoming marketing. Composition: a single compact three-item disclosure, standard links, one project CTA. Native keyboard controls, Escape/outside-click close, mobile dialog focus management. No visual dependency on animation or WebGL. Performance cost: only DOM and existing icons.

### Living Showcase

Purpose: demonstrate editing, website transformation and human-reviewed automation. Immediate message: what changes when MAKENDLESS works on an idea. Composition: one spatial workbench with a large media/page surface, useful source/timeline/workflow context and prismatic rails. Default CREATE; HTML controls update both the 3D and flat preview. BUILD switches wireframe/finished; AI advances the inquiry→classification→routing→draft→human-review path. Use illustrative photo motion, no fabricated customer results.

Mobile/reduced-motion/data-saving devices retain a polished functional HTML view; optional spatial rendering where suitable. Load Three.js only after capability/visibility checks. Cap resolution, render on demand, avoid postprocessing and perpetual loops, dispose textures/materials/geometry/renderer on unmount, recover to HTML on load/error/context loss. Static controls remain accessible independently of the canvas.

## First milestone review gate

Complete functional initial hero/nav/studio changes, run available checks and attempt the supported browser preview. If browser infrastructure is unavailable, save the stable code and exact blocker; keep visual quality unverified and later design phases pending. Do not interpret a green build as passing this gate.

## Implemented checkpoint (V9)

- Phase 1: root AGENTS.md installed; V1 archived; full V9 retained verbatim as active creative brief.
- Phase 2: centralized nav metadata; compact Studios disclosure; Work, Project Lab, About and project CTA; mobile focus handling and scroll surface.
- Phase 3: raw Three.js client-only renderer and typed state. CREATE has a vertical edited frame, source panel and playhead. BUILD changes finished/wireframe, device emphasis and sample menu. AI changes workflow card and connected stage emphasis. Accessible HTML previews and controls remain functional without WebGL.
- Phase 4: seven-part homepage integrated: hero → interactive studio selector → lazy Workshop → shared-state Lab introduction → selected concepts → interactive four-step process → final inquiry CTA.
- Phases 5–7: all existing 13 demos retained, reorganized into full-width studio stages with compact selectors, progressive service detail disclosure and relevant inquiry actions. No category or beta availability removed.
- Phases 8–10: working project/discovery/portfolio/supporting/inquiry logic preserved, lazy-routed. Homepage Lab uses the same project state; full brief generation remains on the Project Lab route.
- Phase 11: source review refined camera fitting, texture resolution, listener/observer teardown and reduced-motion handling. **Real visual refinement remains blocked**, so the final visual direction and supporting-page polish are not accepted as complete.
- Phase 12/13: 74 automated checks pass; build/typecheck/lint pass. Supported application preview was attempted but failed at the relay; no running browser preview or screenshots are delivered. See QA_LOG.md for exact evidence and local review steps.

## Resume here

1. On a machine with a working browser, run the local app and review the actual WebGL scene at 1440px, then 1024/768/390/360px.
2. Capture screenshots of all three hero modes, CREATE/BUILD, full homepage and Project Lab. Compare against V9 gates before approving the composition.
3. Test device capability paths, context loss, keyboard navigation, touch and reduced motion in a real browser.
4. Refine weak observed layouts and media presentation; complete supporting-page visual cohesion using that evidence.
5. Measure Core Web Vitals and renderer cost on a mid-range phone. No performance target is currently verified.
6. Connect real inquiry delivery only with approved configuration; current contact remains an explicitly labeled local demo.
