# MAKENDLESS motion and spatial system — V11

Motion explains a change: an idea becomes a composition, a structure becomes a page, or a chosen capability joins a project. It must not obscure a task. Approved Syne letterforms and the wordmark never scramble, bounce or distort.

## Shared controller

`src/components/MotionSystem.tsx` is mounted once. Declare one meaningful region with `data-motion`; use `data-motion-key` only when a changed result merits a new entrance. The IntersectionObserver starts one entrance on viewport entry; MutationObserver registers lazy routes and newly constructed modules. A finished entrance does not restart on every scroll. Detached regions are released. No hidden styles are applied before JavaScript runs.

Reduced-motion preference changes cancel active entrances and prism passes. Offscreen or hidden-document entrances stop. Narrow screens use a short opacity settlement, at most 400ms, without masking controls or shifting depth. Missing IntersectionObserver/WAAPI leaves static readable content. The controller does not create a scroll loop, scroll hijacking, permanent `will-change`, global pointer listener, or animation library.

## Eight families

| Family / purpose                                                | Trigger and initial → final state                                                                                      | Technique / duration                                                                               | Mobile / reduced motion                                                                      | Performance budget                                                                                             |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 01 Kinetic typography: establish a headline or decisive phrase  | First view; masked baseline → fully readable resting text. V5 replay/tempo controls produce word-specific arrangements | `typography`: WAAPI clip-path + independent translate, 640ms; V5 scoped word masks/graphic builds  | ≤400ms subtle opacity; reduced motion immediate final composition                            | One meaningful heading region; no per-frame React typing or scramble                                           |
| 02 Transformation graphics: show construction                   | Selected business/service/format or process step; partial composition → complete meaningful output                     | `transform`: clip/scale, 600ms; local SVG paths, format branches and wireframe toggles             | Stable stacked layers; reduced motion changes state immediately                              | No canvas necessary; animate selected output only                                                              |
| 03 Cinematic masks: reveal media                                | Enter viewport or select a world/case treatment; cropped image window → full intended frame                            | `mask`: bounded clip/scale, 740ms                                                                  | Brief opacity; reduced motion static window                                                  | Local images with intrinsic dimensions and lazy loading below fold; no video downloads                         |
| 04 Prism light: signal a material plane                         | First view of marked plane; faint streak crosses once and clears                                                       | `prism`: 800ms opacity envelope plus CSS background-position sweep in a contained pseudo-element   | Sweep omitted on narrow/reduced-motion devices                                               | No blur filter, particles, ambient loop or pointer-tracked glow                                                |
| 05 Spatial transitions: reveal service relationships            | CREATE/BUILD/AI or explicitly opened study; coherent scene settles to service-specific camera and objects              | `spatial`: WAAPI 620ms DOM entrance; raw Three.js finite camera/group easing and demand redraw     | HTML fallback by default; reduced motion bypasses decorative lerp                            | Lazy shared engine, capped DPR/textures; dispose old resources on rebuild/unmount; no canvas for every section |
| 06 Micro-motion: confirm intent                                 | Hover, focus, pressed/selected; icon/border/check responds to actual action                                            | CSS 180–250ms icon translate, selected underline and material response                             | Touch uses selected state; reduced motion immediate feedback                                 | Transform/color only; no magnetic pointer dependency                                                           |
| 07 Editorial storytelling: connect a choice with an explanation | Enter region or process/question change; small directional mask → settled narrative                                    | `editorial`: WAAPI 520ms; connected process/map states                                             | Brief opacity; reduced motion immediate content                                              | Native scrolling; no pinned text walls or continuous scroll sampling                                           |
| 08 Functional media: demonstrate editing                        | Explicit play/scrub/frame/format/step; source → edited caption, timeline, graphic or sequence                          | `media`: 360ms content settlement plus component-owned timed playback, timelines and preview state | Explicit controls and static meaningful frame; reduced motion suppresses decorative playback | Stop/pause work on hidden/offscreen/unmount; no autoplay sound; time-limited playback                          |

## Where the language is applied

- Home: typography in positioning/headings; mask in worlds and film work; actual service transformation in Workshop; independent Lab construction; spatial browser study; editorial process; single prism horizon.
- CREATE: source/edited caption framing, podcast highlight timeline, ad treatments, format branching, editable motion-type sequences. V5 has explicit replay and tempo controls.
- BUILD: wireframe/site and usable collection, cart/checkout, mock booking, routing steps, illustrative optimization. Optional shared study is mounted only when requested.
- GROW: campaign preview, per-day Reel/Carousel/Story layout, local presence checklist. All remain beta and illustrative.
- Project routes: selected modules assemble, inquiry steps update, contact readiness responds. No actual remote request, booking or sale occurs.
- Work: editorial case studies expand into meaningful content; one optional service scene at a time. About, FAQ, service detail and footer use appropriate restrained entrances.

## Three.js architecture

`LiveShowcase` owns accessible state and capability preference. Its `study` variant reuses the same lazy `SpatialScene`/`createLivingScene` implementation for internal pages. Each mounted scene is bounded and disposed; routes do not retain scenes. CREATE prioritizes portrait media, source and timeline. BUILD prioritizes desktop/mobile surfaces whose textures match finished/menu state. AI prioritizes the current human-reviewed workflow step. Geometry illustrates a service, never random floating shapes.

No post-processing pipeline, particles or continuous idle rotation. Camera and pointer changes invalidate a bounded render; hidden/offscreen canvases stop. Mobile/data-saving/reduced-motion choose the HTML preview first. Explicit 3D opt-in still respects reduced-motion transitions. WebGL load, render, context or chunk failure leaves useful controls and fallback content.

## Review limits

Durations above are implementation values, not visually approved timings. Automated lifecycle/state tests are not motion recordings. Real mobile smoothness, GPU memory, visual continuity, focus visibility through transitions and the ten V11 acceptance gates require the outstanding browser review documented in QA_LOG.md.

## V12 homepage application

V12 changes the homepage sequence and palette while preserving the reusable lifecycle. The homepage now uses nine distinct experiences: service media → porcelain gallery → dark transformation stage → customer journey → scope/estimate guide → original concept work → example-first Lab → calm process/FAQ → dark closing. Internal-page art direction remains V11 pending homepage visual approval.

Hero scene colors derive from PRISM_ATELIER in src/theme.ts when `theme="atelier"`; shared internal studies retain Glass Prism. Hero depth supports the media and its raw/edited, website and automation states. The same engine remains lazy and demand-rendered. The BUILD photograph is deferred until that mode is selected.

The gallery's original type film is finite and user-started; reduced motion advances discrete frames. V1 output format changes actual aspect ratio. Solutions change a complete customer-specific composition. Package selection changes one scope sheet with restrained feedback. Portfolio motion is replayable typography; appointment changes have meaningful state. Lab builds only selected capabilities while its clearly labeled initial example remains outside the project selection. Process uses a calm progression instead of the earlier technical diagram.

All new homepage colors use centralized tokens and derived states. Actual motion timing, visual rhythm, mobile framing and GPU quality remain subject to the outstanding browser review; source and jsdom checks do not establish those qualities.
