# MAKENDLESS — frontend integration roadmap

Recorded 13 November 2026 for the Frontend Specialization V3 brief. The first deliverable is the isolated [Frontend Creative Lab](../experiments/frontend-lab/README.md). Production V12 remains at baseline `aaec63520e00b010a16534227d188d90a91c6a35`; the research branch is `research/frontend-creative-lab`. This document proposes future work; it does not approve production integration or publication.

## Decisions supported by this iteration

1. Use a gallery with one mounted experiment and lazy module boundaries. This keeps inactive demonstrations out of the DOM and defers Three until needed. Loading/error states remain ordinary HTML.
2. Use native inputs and derived React state for comparison, selectors and configurators. Separate the visitor's action from presentation animation. Effects own actual external systems—observers, timers, renderer and listeners—rather than duplicate derived state.
3. Keep 3D optional. A framed interface and material lens give depth a demonstrable job. DOM controls and an adaptive SVG view survive renderer failure. The hardware and visual cost remains an acceptance question.
4. Use finite, user-controlled motion and explicit cleanup. No autonomous background spectacle, sound or automatic sending. Apply live system reduced-motion changes to logic as well as CSS.
5. Treat a review as evidence tied to a particular configuration. Do not assign a winner, a visual score or a performance claim from unit tests or source appearance.
6. Keep the existing dependency stack. Native CSS/SVG/WAAPI/Three suffice for these hypotheses. Introduce Motion/GSAP/R3F only after a concrete integration need and measured tradeoff.

These are engineering findings, not proof that every composition is ready for customers. See [results](FRONTEND_EXPERIMENT_RESULTS.md) for verification and unresolved limits.

## Gate 1 — complete observed review

Run the lab locally using its README. Review all experiments at 360/390/768/1024/1440px, both standalone and inside the full shell. Capture real screenshots and reproducible interaction sequences. Include long content, 200% zoom, keyboard-only input, touch, live reduced motion, disabled WebGL, slow loading, hidden tabs, offscreen transitions and repeated navigation. Run context-loss/retry and real GPU memory/frame checks.

Use the eleven-category scorecard; mark inapplicable 3D N/A, leave unobserved criteria unverified. Every score below 4 requires a concrete fix and another observed review. Record the three weakest areas, not just a favorite screenshot. No prototype clears this gate yet because interactive browser infrastructure was unavailable during implementation.

Measure LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 as targets. Local traces are diagnostic; field thresholds refer to the 75th percentile and cannot be established by an isolated lab or bundle-size report. Preserve measurement conditions and distinguish lab traces from real-user data.

## Gate 2 — select purpose and direction

Compare A's media demonstration, B's optional spatial display and C's editorial interaction using the same viewports/settings. Ask whether each makes “Creative & Technology Studio — Video Editing, Websites & AI” clear in the first screen. Select one lead idea; do not combine all three heroes or transplant research controls into the customer interface.

Glass Prism remains the favored family in the latest brief. Prism Atelier, experimental surface adjustments and the future ten-section outline remain proposals. Preserve Syne, MAKENDLESS, CREATE / BUILD / GROW, all 13 services, GROW Beta / Coming Soon, routes and inquiry/project logic. Obtain the owner's design selection within the later website implementation task.

Potential hypotheses, **not a ranked winner**:

- A may best explain CREATE through an immediate source/edit comparison. Replace vector concept media with authorized, optimized real work only when supplied.
- B may suit a deeper BUILD/project experience if material and camera changes improve understanding enough to justify GPU/download cost.
- C may provide the clearest low-cost landing composition if the editable idea helps a visitor explore services without distracting from the CTA.

## Gate 3 — integrate one vertical slice

In a separate authorized change, adapt the chosen hero and one service demonstration to production data and inquiry routes. Reuse verified state/lifecycle patterns rather than copying the whole lab shell. Keep fallback DOM first, stable media dimensions, accessible controls and production theme tokens. Retain actual contact delivery limitations; do not turn the sample human-review workflow into a claim of a deployed AI service.

Run existing production tests and the new behavior checks that cover real integration risk. Inspect desktop/mobile browser output before expanding the design. Review download waterfall, first render, CPU and GPU cost. If costs regress, simplify the effect or keep it behind explicit opt-in.

## Gate 4 — compose the whole website

Only after the vertical slice succeeds, review the proposed ten-section outline against existing V12 content. Give each section a distinct purpose and visual rhythm; choose among cinematic, editorial and interactive compositions based on content. Keep navigation short, CTA destinations real, and practical service information easy to find.

Selected Work needs genuine authorized projects or clearly labeled concepts. Packages and Pricing need owner-approved facts. Do not fill these gaps with fabricated clients, numbers, testimonials, outcomes or prices. Build public forms only with a real authorized delivery path and truthful states.

## Gate 5 — acceptance and release

Complete functional, visual, keyboard/touch, accessibility and performance review; record remaining defects. Commit the reviewed implementation separately. Publish only under explicit deployment authorization. Do not merge or publish this lab as a substitute for the reviewed production change.

## Reading trail

- [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect): derive render values and handle user actions directly; synchronize with external systems in effects.
- [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): asynchronous visibility is useful for activation/pauses, not a pixel-precise animation timeline.
- [web.dev — Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds): threshold definitions and 75th-percentile interpretation.
- [WAI-ARIA — Slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/): keyboard semantics and touch-assistive-technology caveats. Native range inputs plus explicit source/edit choices keep an alternate interaction path.

Specialist sources and access limitations are retained in the lab's notes. These documents preserve project knowledge; they do not retrain the underlying model.
