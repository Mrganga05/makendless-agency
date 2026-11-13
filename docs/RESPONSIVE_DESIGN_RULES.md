# Responsive design rules — Lab V3

These are implementation and review requirements, not a record of passed device tests. See [visual QA](VISUAL_QA_CHECKLIST.md) for the evidence gate.

## Viewport matrix

| Inner viewport width | Main review emphasis |
| --- | --- |
| 360 CSS px | Headline wrapping, navigation, controls, scene labels and primary action. |
| 390 CSS px | Same content with different line breaks; touch spacing and media crop. |
| 768 CSS px | Tablet recomposition, navigation transition, balanced scene and explanation. |
| 1024 CSS px | Compact desktop density, section alignment and reachable controls. |
| 1440 CSS px | Wide composition, bounded line lengths and intentional negative space. |

The lab's iframe simulator sets these **actual inner viewport widths**, so media queries run against the selected width. The frame sits at its CSS width in a horizontally scrollable region when it is wider than the host. It does not emulate a physical touch screen, mobile browser chrome, safe areas, device pixel ratio, CPU, GPU, battery use or mobile network. Verify the measured inner width before recording a screenshot.

## Recompose the content

1. Keep the main message and action available before optional detail. Stack the scene and explanation when their minimum useful widths no longer fit. Preserve meaningful DOM and keyboard order.
2. Keep controls beside their affected result or immediately below it. Allow labels and toolbars to wrap. Do not conceal essential actions behind hover.
3. Give grid and flex children permission to shrink where appropriate; investigate long labels and fixed widths rather than hiding document overflow.
4. Deliberately crop media around its subject. For raster assets, use `picture` for art direction and `srcset`/`sizes` for resolution choices. Validate each crop and asset request; a large desktop image reduced by CSS still downloads its large file ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)).

## Type, zoom and input

Use bounded fluid typography with relative-unit limits and an explicit readable minimum. Avoid locking text into fixed-height containers. `clamp()` is a sizing tool, not an accessibility test ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)).

Verify text enlargement through 200% without lost content or controls ([WCAG resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)). Additionally check reflow at 320 CSS px, or the equivalent 1280px viewport at 400% zoom; the five lab presets alone do not establish that requirement ([WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)).

Use 44×44 CSS px as the project's preferred primary-control target. WCAG 2.2 AA's target-size criterion is 24×24 CSS px with defined exceptions, so do not describe 44px as the AA minimum. Check target spacing as well as size ([W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)).

Tab through controls at each layout change. Ensure visible focus and prevent sticky UI from obscuring the focused component ([focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)). Provide buttons or keyboard operation alongside drag-based demonstrations.

## Motion, fallback and measurement

Review normal motion, operating-system reduced motion, and the lab's forced fallback independently. The static scene must preserve the message and controls. Reserve media/scene space before loading; compare initial and settled layouts. Lower visual complexity only when the essential demonstration remains understandable.

Record browser, viewport, zoom, device, network and run conditions with performance measurements. Core Web Vitals targets are LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile; a local run is not field evidence ([web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)). Frame rate, memory and GPU behavior require separate observation. Do not infer any of them from bundle size or the simulator.
