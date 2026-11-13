# MAKENDLESS Frontend Creative Lab

An isolated research gallery for the Frontend Specialization V3 brief. These are working proposals, not a new production homepage. The V12 website stays unchanged. No experiment has been publicly deployed.

## Run locally

Requires Node.js 20.19+ (Node 22 LTS recommended) and npm. From the repository root:

```sh
git fetch origin
git switch research/frontend-creative-lab
npm ci
npm run dev --prefix experiments/frontend-lab
```

Open the localhost URL printed by Vite. Stop with Ctrl+C. The lab uses the **repository's installed dependencies**; do not run a separate dependency installation inside this folder. For a downloaded source archive, extract it, open its root directory, and start at `npm ci`.

For a built preview:

```sh
npm run build --prefix experiments/frontend-lab
npm run preview --prefix experiments/frontend-lab
```

Root `npm run dev` still starts the existing V12 website. The lab build goes only to `experiments/frontend-lab/dist/`; it does not overwrite root `dist/`.

## Open and compare

Use the gallery index or add a route to the local URL:

| Route          | What to try                                                                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/#heroes`     | A: source/edit, crop and finite playback; B: material/camera display; C: edit the heading, open the mini-site and advance the human-review example. Only one concept mounts at a time. |
| `/#spatial`    | Compare glass/satin, camera, lighting, roughness and transmission. Small screens and reduced motion start with an illustration and explicit 3D opt-in.                                 |
| `/#motion`     | Scrub/play the composed sequence, change direction/scene and follow the scroll chapters.                                                                                               |
| `/#live`       | Compare video treatments; operate the wireframe/finished site and local form; edit an inquiry, classify/route/draft, then explicitly review.                                           |
| `/#sections`   | Compare a dark studio sequence, light editorial services and a state-driven project presentation.                                                                                      |
| `/#responsive` | Open an actual iframe CSS viewport at 360, 390, 768, 1024 or 1440px; record observations and export a local JSON scorecard.                                                            |

Use the global palette, Reduce motion and Force HTML fallback controls. OS reduced motion remains effective even with the manual checkbox off. Review the complete gallery at narrow widths too: the embedded preview does not include its navigation shell. An iframe is not a physical device or GPU/network emulator.

Review entries are separated by experiment, width, palette, reduced motion and fallback settings. Returning to a configuration restores its entries during this mount. Navigating away from Responsive Review or reloading clears them: **export before leaving**. Name the selected hero/scene and interaction steps in the notes. No scores are supplied automatically, and no review is sent anywhere.

The cinematic examples are original vector motion studies, not captured footage. PULSE and exhibition/listening concepts are illustrative projects. The rule-based workflow makes no AI API request. Forms and drafts stay local; no inquiries, bookings or messages are sent. GROW stays Beta / Coming Soon.

## Verify

From the repository root:

```sh
npm run typecheck --prefix experiments/frontend-lab
npm run lint --prefix experiments/frontend-lab
npm test --prefix experiments/frontend-lab
npm run build --prefix experiments/frontend-lab
```

Tests exercise meaningful state, lifecycle and fallback behavior with jsdom and a mocked 3D engine. They do not prove visual quality, GPU output, touch/screen-reader support or Core Web Vitals.

The managed preview relay timed out and the browser tool failed during authoring. No screenshots or visual quality scores were produced. Complete the browser/device checklist before selecting a direction or integrating production code.

## Project knowledge

- [Original brief](../../docs/FRONTEND_LAB_BRIEF.md)
- [Results and evidence limits](../../docs/FRONTEND_EXPERIMENT_RESULTS.md)
- [Integration roadmap](../../docs/FRONTEND_IMPLEMENTATION_PLAN.md)
- [Visual QA checklist](../../docs/VISUAL_QA_CHECKLIST.md)
- [Design references](notes/design-references.md), [hero hypotheses](notes/hero-concepts.md), [3D references](notes/spatial-references.md), [motion references](notes/motion-references.md), [interaction references](notes/live-references.md)

Source is contained in `src/`; tests are in `tests/`. No production modules are imported. React, TypeScript, Vite, Three.js, native HTML, CSS, SVG and browser animation APIs are reused from the installed stack. Motion, GSAP, React Three Fiber and Drei were studied; none was added just for this lab.
