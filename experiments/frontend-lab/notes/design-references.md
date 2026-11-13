# Design reference log

Reviewed 13 November 2026 through published documentation text. No reference-site screenshots or live visual interactions were inspected in this research pass. These are bounded technical findings, not claims that a particular design improves conversion or looks premium.

## Primary documentation actually read

| Exact reviewed URL | Finding and lab application | Limit |
| --- | --- | --- |
| https://web.dev/learn/css/grid | Grid coordinates two-dimensional layout and intrinsic sizing. Use it to align asymmetric media/text compositions. | Does not prescribe an attractive composition. |
| https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp | Bound a fluid value with minimum and maximum. Use for type and spacing experiments. | Does not guarantee good line breaks or zoom behavior. |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images | Art direction and resolution switching are distinct. Match crops and responsive raster sources to layout. | No new production media assets or actual crops were visually evaluated here. |
| https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | Text contrast uses defined thresholds and unrounded values. Evaluate actual foreground/background pairs. | Token pairs alone cannot establish page conformance. |
| https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | AA target sizing has a 24px minimum and exceptions; larger controls can improve usability. Use the project's preferred 44px primary targets. | CSS dimensions do not prove real touch usability. |
| https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | Author-created sticky/overlay content must not entirely hide focused controls. Inspect keyboard paths. | This criterion alone does not cover all focus or keyboard requirements. |
| https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html | Text must support enlargement without lost content/function. Inspect controls as well as body copy. | Requires actual browser testing. |
| https://www.w3.org/WAI/WCAG22/Understanding/reflow.html | Reflow includes a 320 CSS px equivalent width for ordinary vertical content. Test beyond the five lab presets. | Defined two-dimensional-content exceptions are not a general overflow exemption. |
| https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion | Read the device motion preference and reduce or replace non-essential movement. | CSS support alone does not verify every animation or 3D loop. |
| https://web.dev/articles/defining-core-web-vitals-thresholds | LCP, INP and CLS measure different user-experience aspects; field thresholds use the 75th percentile. | Build size and one local trace cannot establish field performance. |

W3C Understanding documents explain their linked success criteria. Reviewing this subset is not a complete WCAG audit. Documentation retrieval does not establish compatibility on the lab's target devices.

## Creative showcase access and limits

| URL / attempt | Actual result | Permitted conclusion |
| --- | --- | --- |
| https://www.siteinspire.com/about | Direct retrieval returned HTTP 403. | No SiteInspire visual or editorial analysis claimed. |
| https://www.awwwards.com/about-us/ | Direct retrieval timed out. | No showcase browsing or individual-site review claimed. |
| https://www.awwwards.com/mobile-excellence-guidelines.pdf | Search-index excerpt was readable; direct PDF retrieval timed out. | Excerpt mentions manual checking, visible CTAs, readable type and appropriate targets. Treat only as a historical checklist lead; some listed performance metrics are obsolete. Current performance targets come from web.dev above. |
| https://pwa-book.awwwards.com/chapter-4 | Search-index excerpt readable; direct page returned HTTP 502. | Excerpt suggests aligning visuals with brand and customer needs. No live interaction or layout was reviewed. |

CSS Design Awards, Godly and Figma Community were named in the brief but not reviewed in this pass. Do not imply otherwise. Once browser access works, select individual examples and record their URL, capture, first-screen hierarchy, navigation, scroll rhythm, mobile adaptation and a specific transferable principle. Do not copy their branded artwork, layouts or code.

## Original lab hypotheses to evaluate

The cinematic, spatial and editorial heroes test three different ways to explain MAKENDLESS. Dark/light/project section studies test changes in composition and density. Functional comparisons test whether a visitor can understand a transformation by manipulating it. These are original project hypotheses based on the brief and technical constraints; they are not findings from inaccessible showcase sites. Actual outcomes belong in [Frontend experiment results](../../../docs/FRONTEND_EXPERIMENT_RESULTS.md), with review procedure in the [visual QA checklist](../../../docs/VISUAL_QA_CHECKLIST.md).
