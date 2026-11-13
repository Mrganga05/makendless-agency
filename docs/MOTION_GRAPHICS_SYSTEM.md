# MAKENDLESS motion graphics system — frontend lab

Status: original, isolated proposals. This document describes Experiment 03 (MotionLab) and Experiment 05 (SectionLab), not approved production behavior. Research accessed 2026-11-13. The lab deliberately uses existing React, CSS, SVG and native Web Animations API capabilities, with no additional animation package.

## Motion serves a readable state

The useful final frame is visible at entry. Visitors can play, pause, scrub, edit the headline, hold a composition, or change the scene. A six-second sequence establishes an idea, composes its image, connects the parts and resolves. It plays once when requested. No introduction gates content, automatic looping, scroll hijacking or pointer-only control is required.

The playhead is semantic React state, not an inaccessible movie. Film reveals an original folded ribbon and kinetic heading. Website moves between a structure study and a finished fictional shop; its collection control changes actual content. Workflow shows the current processing stage and explicitly ends at human review without sending a message. All three are concept studies, not client work.

## Research translated into implementation

| Primary source                                                                                                             | Engineering lesson                                                         | Implementation decision                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Motion React animation](https://motion.dev/docs/react-animation)                                                          | Declarative targets and variants can express state and coordinated motion. | Keep state authoritative. The lab does not need shared-layout/exit orchestration, so importing another library would not improve this bounded sequence.                                      |
| [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/)                                                                   | A timeline can coordinate phases and expose seek/replay controls.          | Use one normalized 0–100 playhead and named phases. Consider GSAP if later work needs many independently timed layers or professionally authored complex timelines.                          |
| [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API) | Animation objects provide explicit playback and cancellation.              | Use a cancellable 520ms mask/opacity/translation entrance when changing scenes; cancel it on focused interaction, replacement and unmount. Skip it with reduced motion or unsupported WAAPI. |
| [MDN SVG pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength)                      | Path-distance calculations can be normalized.                              | Set pathLength to 100 and derive dash offset directly from the playhead rather than measuring SVG geometry repeatedly.                                                                       |
| [MDN CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path)                       | Clipping defines a visible region without changing the underlying content. | Reveal the original vector artwork and heading with inset masks. Retain an accessible heading name throughout the reveal.                                                                    |
| [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)                    | Viewport intersections can be observed asynchronously.                     | Change the three-chapter narrative from actual viewport evidence, with independent native buttons as a fallback; pause playback when its stage leaves view.                                  |

These are implementation inferences from documentation, not claims that these libraries were visually compared or benchmarked in this lab.

## Choreography and costs

| Family               | Timing and ownership                                   | Purpose / cost guard                                                                                                                          |
| -------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Playhead             | One increment every 60ms, up to 100; six seconds total | Semantic updates remain bounded. CSS interpolates mask, transform and SVG dash changes for 60ms. Actual frame performance remains unmeasured. |
| Scene entrance       | 520ms, cubic-bezier(.2,.7,.2,1), native WAAPI          | A brief compositional handoff; never blocks buttons. No persistent animation object is retained after cleanup.                                |
| Narrative frame      | 350ms opacity and 5px translation                      | Signals a chapter change. All three text chapters remain present and readable.                                                                |
| Cinematic framing    | 650ms transform                                        | Wide/tight input changes the original object's crop and the film's headline; it is not an endless decorative loop.                            |
| Service/module entry | 300–350ms opacity/translation                          | Clarifies a new service or added module. Existing controls remain stable.                                                                     |

Avoid animating blur, animated box shadow, large layout dimensions or filters on every playhead tick. The film has one static drop shadow; its mobile/GPU cost has not been measured. There is no canvas or WebGL dependency in these two experiments. The gallery renders only its active experiment.

## Accessibility and fallback contract

- Reduced motion keeps the artwork and headline visible, disables CSS/WAAPI movement and replaces timed playback with discrete frame advancement. Scrubbing, editing, service choices, project assembly and sample booking continue to work.
- Native buttons, range input and text input expose keyboard input and state. Active selections use aria-pressed; the range exposes percent and current phase. Progress output has aria-live="off" to avoid announcements every 60ms.
- The heading's accessible name does not disappear during the decorative text mask. The workflow includes visible prose describing its current stage.
- No observation support: chapter text and selection controls still work. No WAAPI support: scene switching renders its final state immediately. Forced HTML fallback requires no alternate renderer because these experiments already use HTML/SVG/CSS.
- Playback pauses offscreen, on document visibility loss, at the final frame, or when held. Timers, visibility listeners, observers and WAAPI instances have effect cleanup. A new playhead input clears held-frame confirmation.
- At 700px and below, the film rearranges type above its artwork, transport wraps, story columns stack without a sticky frame, service choices form a three-column index, and project controls precede the preview. Controls use minimum 44px targets. These are authored rules, not a substitute for viewport inspection.

## Three section studies

**Cinematic dark studio:** a quiet statement next to original sculptural artwork. Wide/tight controls change framing and the displayed message. No fictional client credit is implied.

**Bright editorial services:** a numbered CREATE / BUILD / GROW index changes the featured composition and explanatory copy. GROW remains Beta / Coming Soon. The next link leads to the lab's live component gallery.

**Interactive project presentation:** website, booking and scripted assistant modules are assembled in a local example. Booking requires a sample time and says that nothing is booked. Changing or removing choices invalidates stale confirmation. The project description contains the selected components without fabricated pricing. No submission, storage or external service is involved.

The comparison hypothesis is that these different spatial structures make mood, discovery and scope easier to distinguish. Visual success remains subject to actual review.

## Evidence and acceptance

Scoped automated run: `npm run test -- tests/motion.test.tsx tests/sections.test.tsx` from `experiments/frontend-lab` — 9 tests passed. They exercise scene switching, actual collection content, workflow stages, finite replay, held-frame consistency, offscreen pause/cleanup, observer-driven/manual narrative, reduced-motion input, WAAPI cancellation, service availability, module assembly, scripted conversation, empty state and booking invalidation.

This is DOM/state evidence in jsdom. Intersection Observer and WAAPI are mocked for lifecycle assertions. It does not establish actual scrolling geometry, mask rendering, screen-reader speech, contrast, visual composition, mobile readability, sustained frame rate or GPU behavior.

Before selecting a design for production, inspect 360, 390, 768, 1024 and 1440px layouts; exercise keyboard focus and native scrolling; compare normal and reduced-motion modes; record actual browser screenshots/video; and measure the animation on a representative mobile device. Record blockers honestly in the lab's shared QA log. Do not assign a visual approval from these tests.
