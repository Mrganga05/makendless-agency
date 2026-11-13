# MAKENDLESS creative engineering

The current task phase is isolated frontend research and practice, governed by [FRONTEND_LAB_BRIEF.md](docs/FRONTEND_LAB_BRIEF.md). The V12 website remains the production baseline; [CREATIVE_BRIEF.md](docs/CREATIVE_BRIEF.md) records that earlier homepage request. Do not treat a new experiment or theme proposal as approval to redesign production.

## Persistent guidance

Read only the guides relevant to the task:

- [Design principles](docs/FRONTEND_DESIGN_PRINCIPLES.md), [brand/theme status](docs/BRAND_AND_THEME_STATUS.md), [responsive rules](docs/RESPONSIVE_DESIGN_RULES.md).
- [3D engineering](docs/THREED_ENGINEERING_GUIDE.md), [motion graphics](docs/MOTION_GRAPHICS_SYSTEM.md), [interactive patterns](docs/INTERACTIVE_COMPONENT_PATTERNS.md).
- [Experiment results](docs/FRONTEND_EXPERIMENT_RESULTS.md), [visual QA](docs/VISUAL_QA_CHECKLIST.md), [integration roadmap](docs/FRONTEND_IMPLEMENTATION_PLAN.md).

## Preserve

- MAKENDLESS spelling, Syne, the wordmark, CREATE / BUILD / GROW, all 13 approved services in src/data.ts, GROW Beta / Coming Soon, routes and project/inquiry logic.
- Never invent pricing, client work, testimonials, results, policies or message delivery. Label concepts and simulations. The inquiry has no delivery backend.
- Keep experiments in experiments/frontend-lab; do not import or overwrite production components/styles/builds. Reuse installed dependencies rather than adding overlapping libraries.
- Glass Prism is the favored family in the latest brief; Prism Atelier is under evaluation. Preserve current production configuration. Palette and section-order experiments are proposals, not approval.

## Workflow and evidence

Follow RESEARCH → CONCEPT → PROTOTYPE → RUN → INSPECT → CRITIQUE → REFINE → TEST → INTEGRATE. Use primary technical references and record access failures. Define the component's purpose, composition, meaningful interaction, motion, mobile/fallback behavior and cost before implementing complex work.

Keep native controls usable without WebGL or animation. Use finite/on-demand rendering, lazy loading, explicit media playback, reduced-motion alternatives and lifecycle cleanup. Test keyboard, touch behavior, empty/loading/error states and state invalidation. Do not use decorative effects to hide weak composition.

Inspect 360/390/768/1024/1440px in an actual browser when tools permit. A viewport simulator is not a real device. Mocked GPU/DOM tests, bundle sizes and compilation do not prove visual quality, accessibility or Core Web Vitals. Mark unobserved ratings unverified; below 4 requires a specific refinement. Record exact tool blockers instead of inventing screenshots or scores.

Keep Git checkpoints and production isolation. No paid tools, public deployment or external messages without authorization. This research phase does not authorize production integration. Carry only tested and visually reviewed candidates into a later authorized task. These documents preserve project knowledge; they do not retrain the model.
