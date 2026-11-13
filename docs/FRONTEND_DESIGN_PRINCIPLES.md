# Frontend design principles — Lab V3

Status: research guidance and hypotheses, 13 November 2026. The [lab brief](FRONTEND_LAB_BRIEF.md) governs this practice phase. These documents preserve project knowledge; they do not represent model retraining or approval of a production redesign.

## Purpose before treatment

A visitor should understand **MAKENDLESS — Creative & Technology Studio**, find Video Editing and Websites & AI, and recognize **CREATE • BUILD • GROW**. An interaction should explain a service, expose a decision, or demonstrate a transformation. An animated decoration alone does not satisfy that purpose.

Give each composition one dominant visual, one readable promise, and one clear next action. Place supporting controls near the result they affect. Keep navigational labels literal. This is a project hypothesis for reducing the confusion reported by the owner, not a universal conversion claim.

## Compare genuinely different compositions

| Experiment | Design hypothesis | What a reviewer must inspect |
| --- | --- | --- |
| Cinematic media hero | A large framed media treatment makes creative production tangible. | Subject legibility, CTA visibility, treatment controls, honest sample labeling. |
| Spatial hero | A controllable scene can explain the studio's connected creative and technical work. | Meaning of the object, material separation, legible HTML explanation, fallback quality. |
| Editorial motion hero | Large type and deliberate sequencing can make the message memorable. | First-frame clarity, line breaks, reading order, motion restraint. |
| Section rhythm | Dark cinematic, bright editorial, and project-led layouts can make the scroll easier to follow. | Changes in composition, density and scale; changing background color alone is insufficient. |

Compare at the same viewport, with equivalent brand information and reachable actions. Do not select a winner from source code, component names, or a successful build.

## Composition and typography

Use Syne with deliberate weight, line height and line length. Align text, media, and controls to a common spacing system while varying their proportions. CSS Grid supports coordinated rows and columns; intrinsic track sizing helps content determine space. It does not make a layout editorial by itself ([Grid guidance](https://web.dev/learn/css/grid)).

Use bounded fluid sizes where appropriate; `clamp()` provides minimum, preferred, and maximum values. Check actual wrapping and text enlargement instead of assuming the function guarantees readability ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)).

Art direction must preserve the subject at narrow widths. A mobile crop and a smaller image file solve different problems; plan both when real raster media is available ([responsive images](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)).

## Live interactions and motion

Every control needs a visible consequence, an understandable current state, and a way to recover or reset. Keyboard, touch and reduced-motion users need the same essential information. Keep the AI workflow explicitly rule based and human reviewed; generated demo copy is not a real client inquiry or a sent message.

Motion should explain entrance, continuity, selection or feedback. Review the still composition first. Honor the operating system's reduced-motion preference by removing or replacing non-essential movement; large panning or scaling can cause discomfort ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)).

## Evidence and integration

Technical documentation establishes constraints and APIs, not proof that an experiment looks luxurious or improves sales. Source review, automated checks, browser observation, and real-device measurement are separate evidence types. Label each accurately in the [results](FRONTEND_EXPERIMENT_RESULTS.md).

Use the [brand status](BRAND_AND_THEME_STATUS.md), [responsive rules](RESPONSIVE_DESIGN_RULES.md), and [visual checklist](VISUAL_QA_CHECKLIST.md) before proposing production integration. Keep all changes in the isolated lab until actual review supports a specific recommendation. No invented client work, results, testimonials, prices, availability or performance scores.
