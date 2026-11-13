# Visual QA checklist — Lab V3

This is a review procedure and blank scorecard. It does not certify that any experiment has been visually reviewed. Current run evidence belongs in [Frontend experiment results](FRONTEND_EXPERIMENT_RESULTS.md).

## Evidence record

For each observation, record experiment and revision, reviewer, date, browser/version, viewport width×height, device pixel ratio, zoom, theme, motion preference, fallback state and input method. Attach the actual screenshot or recording and write reproducible steps, expected behavior, observed behavior and remaining issue. Record inaccessible tools or failed captures explicitly.

The lab's review state is keyed by **experiment, viewport width, palette, effective reduced-motion setting and forced-fallback setting**. Changing any of those selects a separate record; ratings and notes must not carry across different settings. Returning to the same combination restores its entries while the responsive-lab component remains mounted. Export each reviewed combination before leaving that lab view or refreshing; the in-memory records are not durable storage. Also name the selected hero/study and interaction state in the notes because those internal variants are not separate record keys.

Source inspection can verify an implementation choice; unit tests can verify state transitions. Neither can establish visual balance, perceived polish, mobile presentation or animation smoothness. A screenshot establishes a frame, not the complete behavior of an interaction. An iframe is a viewport test surface, not a real-device or GPU benchmark.

## Review sequence

- [ ] Read the purpose and expected customer understanding before interacting.
- [ ] Capture the initial and settled desktop state; inspect hierarchy, typography, composition and CTA visibility.
- [ ] Compare all three hero directions at equivalent widths and content states. Name strengths and weaknesses using actual captures.
- [ ] Check 360, 390, 768, 1024 and 1440 CSS px inner widths. Check 320px reflow and text enlargement separately.
- [ ] Inspect media cropping, headline breaks, line lengths, overflow, crowded controls and section transitions.
- [ ] Complete every demo with keyboard and pointer. Confirm state feedback, reset, empty/error states and repeated use.
- [ ] Check touch operation on a real device when available. No essential hover-only action; target spacing remains usable.
- [ ] Inspect focus order and visibility, including underneath sticky controls and inside any overlay. Check accessible names and announcements with assistive technology where available.
- [ ] Compare normal motion, reduced motion and forced fallback. Essential content remains present without animation or WebGL.
- [ ] Observe 3D materials, lighting, depth, text readability, resize behavior and fallback; record actual renderer errors and device conditions.
- [ ] Test text contrast on real backgrounds and interactive states; confirm exact computed ratios without rounding failures upward.
- [ ] Record measured loading, responsiveness and stability separately from frame rate/GPU observations. Identify lab versus field data.
- [ ] Check service accuracy, all 13 catalog entries, GROW availability and demo labels. No unsupported commercial claims.
- [ ] Make a concrete revision for every observed score below 4, then repeat the affected review.

## Eleven-category scorecard

Use one row set per experiment, width, palette, motion and fallback combination. Enter a score only after observing the evidence relevant to that category. The lab UI calls untouched fields **Unreviewed**; this document calls the corresponding evidence status **Unverified**. Neither is zero, and neither may be replaced by a guessed score. Use N/A only when a category truly does not apply, with a reason; absence of testing is not N/A.

| Category | Initial rating | Evidence needed / reviewer notes |
| --- | --- | --- |
| Visual composition | Unverified | Actual desktop/mobile frames; hierarchy and balance. |
| Originality | Unverified | Observed composition and distinct concept; record reference limits. |
| Professional finish | Unverified | Alignment, typography, state consistency and artifact inspection. |
| Brand consistency | Unverified | Rendered wordmark, Syne, palette usage, philosophy and service labels. |
| Clear communication | Unverified | First-screen comprehension and understandable action/result. |
| Motion choreography | Unverified | Observed timing, continuity, restraint and reduced-motion behavior. |
| 3D quality, where relevant | Unverified | Actual scene and fallback; lighting/material/depth readability. |
| Actual interaction quality | Unverified | Completed user tasks with visible feedback and recovery. |
| Mobile presentation | Unverified | Narrow viewport frames plus explicit real-device limits. |
| Performance | Unverified | Measurements with conditions and repeatability; no invented numbers. |
| Accessibility | Unverified | Keyboard, zoom, contrast and assistive-technology observations; scope stated. |

Rating anchors: **1** unusable or fundamentally unclear; **2** major defects; **3** usable with conspicuous weaknesses; **4** strong observed result with only minor issues; **5** exceptional for the stated task and tested conditions. A 5 does not mean universally perfect. Each numerical rating requires an evidence reference and one concrete observation. Do not average away a failed critical interaction or an unverified category.

## Integration gate

An automated pass does not close visual review. Keep unobserved experiments provisional. Recommend a production direction only after comparing real output, recording required refinements, checking relevant accessibility and performance behavior, and distinguishing that recommendation from owner acceptance. Follow [responsive rules](RESPONSIVE_DESIGN_RULES.md) and [brand status](BRAND_AND_THEME_STATUS.md) when reviewing.
