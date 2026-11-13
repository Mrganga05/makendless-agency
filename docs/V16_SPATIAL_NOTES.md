# V16 spatial service presentation

The production Living Stage now presents **CREATE / Video Editing**, **BUILD / Website Development**, and **GROW / Digital Marketing — Beta / Coming Soon**. The optional renderer reads the same service and campaign state as the semantic HTML preview. It does not expose an advertising account or publish anything.

## Replaced content

Removed the former workflow diagram, progress nodes, routing/draft labels and workflow-specific state from `src/three/living-scene.ts`. The GROW scene is a creative campaign presentation: a feed display and a portrait story display for the fictional **still.** café.

The shared `ShowcaseState.campaign` controls:

- **Objective:** awareness, website visits or customer inquiries. Headline, objective label and illustrative action come from the same `campaignObjectives` map as the HTML preview.
- **Creative:** an original vector coffee cup or the locally bundled coffee photograph. The artwork changes inside both placement textures.
- **Placement:** feed or story. The selected display becomes more prominent in the spatial arrangement and receives an explicit selected-placement label.

Both textures show **GROW — BETA / COMING SOON** and label the campaign as illustrative/not published. They contain no advertising results, customer data, campaign spend or performance metrics. Essential labels, controls and complete copy remain in the HTML; the decorative canvas is `aria-hidden`.

## Preserved technical design

The physical glass inspection edge, generated reflection environment, rounded media framing and authored lighting remain. Mode changes still drive a bounded camera/light transition. The campaign is a coherent media composition, not an arbitrary object collection or a replacement dashboard.

The existing lazy activation, adaptive HTML fallback, capped drawing resolution, reduced-motion snapping, offscreen/hidden suspension, finite settling and resource ownership are retained. Replacing modes disposes old textures/materials/geometries. Initialization/draw/context failure returns to the host's working HTML presentation. No new rendering library, external texture source or additional canvas was added.

## Verification

Scoped checks on 13 November 2026:

- `npx vitest run tests/living-renderer.test.tsx tests/spatial-lifecycle.test.tsx` — **13 tests passed**.
- ESLint on the renderer, React wrapper and both owned test files — passed.

The new regression checks shared objective/action text, Beta labels, placement-driven scene geometry, creative changes, absence of retired service content, finite frame completion and renderer reuse. Existing lifecycle coverage verifies cleanup, reduced motion, failure handling, offscreen suspension and stale callback suppression.

These tests use real Three scene objects with a **mocked WebGL driver**. They do not establish shader output, physical material appearance, GPU memory use, contrast over actual rendered layers or desktop/mobile visual quality. No browser screenshot was produced by this subtask. Final visual acceptance must inspect both palettes, all service modes and all campaign controls at the required viewport sizes, including disabled WebGL and reduced motion.
