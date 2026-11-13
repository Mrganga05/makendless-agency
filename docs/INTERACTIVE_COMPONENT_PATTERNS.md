# Interactive component patterns

Status: isolated research prototypes in `experiments/frontend-lab/src/LiveLab.tsx`. These examples have no production imports, external requests, sending behavior or customer-data storage.

## Make the result of an action visible

A useful demonstration gives visitors something specific to change and makes the result legible. Experiment 04 has three different compositions because the services have different jobs.

| Study                  | Visitor action                                                                     | Actual result                                                                                                                 | Boundary                                                    |
| ---------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Video editing          | Compare source/edited treatment; change caption and framing; play or scrub         | One original SVG scene changes color, crop, caption design and position in a finite sequence                                  | Vector concept, not client footage or a video encoding tool |
| Website transformation | Switch wireframe/finished and desktop/mobile; explore objects; try a visit request | The same working HTML site changes visual treatment and layout; navigation, object selection and validation remain functional | Fictional exhibition; request only produces a local draft   |
| AI workflow            | Edit an inquiry, classify, inspect routing, edit draft, review                     | Ordered deterministic rules produce an inspectable proposed route and editable reply                                          | No AI model, real assignment, message or booking            |

The comparison uses a native `input[type=range]` and three preset buttons. A person who cannot perform a drag can select Before, Split or After. Caption and framing use native buttons with `aria-pressed`. The position range exposes a meaningful time value. A compact composition status describes changes; elapsed time is deliberately **not** an automatic live announcement.

## Keep state truthful

React's [state structure guidance](https://react.dev/learn/choosing-the-state-structure) recommends avoiding duplicated and contradictory state. The workflow stores the inquiry and a single stage index. Classification, routing and the default draft are derived from that inquiry. Editing the inquiry returns to the first stage and clears custom draft/review state. Editing the draft clears review acknowledgement. Reset retains the visitor's inquiry while clearing derived progress.

This is a deliberately inspectable simulation. Its visible rules specify priority: booking words, then creative production words, then website words; unmatched requests need human clarification. A production classifier would require a substantially different evaluation and data-handling design. Do not interpret this prototype as evidence of production AI accuracy.

The website request has a similarly small contract: an empty name produces an associated error and receives focus; a valid name produces a local draft; editing either field invalidates the draft. It never claims an appointment is confirmed.

## Bound motion and resource use

The vector sequence starts only when requested, runs for six seconds, and stops at the end. Scrubbing pauses it. Document visibility and an intersection observer pause it when hidden or offscreen. Switching studies unmounts the current component, cleaning its timer and observer. It does not resume without a new user action.

The shared reduced-motion setting changes playback into a three-frame manual selector and removes CSS transitions. No GPU renderer, external image or font request is needed by these components, so the GPU fallback setting does not remove any of their functionality.

## Use platform controls first

[MDN's range input reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range) informed the bounded `min`, `max`, `step`, visible labels and controlled values. The [WAI slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) informed meaningful value text and the keyboard/touch review checklist. Native inputs retain browser keyboard behavior without reimplementing arrow-key handlers or introducing a custom drag surface.

The website preview retains content and behavior in wireframe mode. Mobile mode changes composition, not browser zoom. Narrow viewport CSS also reflows the surrounding tools. Controls have at least 44px block size and visible focus styles. The five workflow stages are an ordered list with `aria-current="step"`, rather than decorative dots presented as navigational controls.

## Verification and limits

`tests/live.test.tsx` checks comparison presets and independent controls, finite user-triggered playback, pause on scrub/hidden document, manual reduced-motion frames, working website navigation and preserved content across display modes, validation/focus/invalidated form previews, ordered classification and human triage, human-review gating and invalidation, reset, and single-study mounting.

Tests operate on DOM behavior in jsdom. They do not prove rendered contrast, visual balance, screen-reader announcements, native range keyboard behavior, touch assistive-technology behavior or low-end-device performance. Before promotion, inspect both palettes at desktop, tablet and phone widths; verify the native sliders with keyboard and a touch screen reader; confirm offscreen pause in a rendered browser; review caption legibility at all comparison positions. Record screenshots and real-device observations in the lab review record. No production readiness or performance score is claimed here.

## Reuse recommendation

Retain the visible-result interaction model, minimal state, derived workflow and user-controlled finite playback. Refine composition after rendered review. Any production use should replace fictional content with approved media and connect real requests only after the user has specified the intended service behavior.
