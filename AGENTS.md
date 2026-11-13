# MAKENDLESS creative engineering

The current authorized task is V16, governed by [CREATIVE_BRIEF_V16.md](docs/CREATIVE_BRIEF_V16.md) and the owner's service update. The homepage must have exactly seven sections: Hero, Studios, Transformation, Solutions, Packages, Process/FAQ, Final CTA/Footer. Preserve independent Work, Project Lab and About routes. Customer-facing divisions are only CREATE Video Editing, BUILD Website Development and GROW Digital Marketing Beta / Coming Soon. Remove AI/automation services and demonstrations throughout the actual website while retaining purposeful 3D and motion.

## Persistent guidance

Read only the guides relevant to the task. For current V16 decisions, start with [implementation record](docs/V16_IMPLEMENTATION.md), [QA evidence](docs/V16_QA.md) and [service contract](docs/V16_SERVICE_NOTES.md); older lab-only scope, service lists and homepage structures are historical:

- [Design principles](docs/FRONTEND_DESIGN_PRINCIPLES.md), [brand/theme status](docs/BRAND_AND_THEME_STATUS.md), [responsive rules](docs/RESPONSIVE_DESIGN_RULES.md).
- [3D engineering](docs/THREED_ENGINEERING_GUIDE.md), [motion graphics](docs/MOTION_GRAPHICS_SYSTEM.md), [interactive patterns](docs/INTERACTIVE_COMPONENT_PATTERNS.md).
- [Experiment results](docs/FRONTEND_EXPERIMENT_RESULTS.md), [visual QA](docs/VISUAL_QA_CHECKLIST.md), [integration roadmap](docs/FRONTEND_IMPLEMENTATION_PLAN.md).

Service ID contract: retain V1–V5 (V5 is Motion Graphics), T1/T2/T3/T5, and M1–M3 (M3 is Local Business Digital Marketing); add T6 Landing Page Development and M4 Marketing Analytics & Reporting. Retire T4 and redirect its old detail URL to BUILD. Never reinterpret an old automation selection as a new paid service.

## Preserve

- MAKENDLESS spelling, Syne, the wordmark, CREATE / BUILD / GROW, the revised 14 services in src/data.ts, GROW Beta / Coming Soon, routes and project/inquiry logic.
- Never invent pricing, client work, testimonials, results, policies or message delivery. Label concepts and simulations. The inquiry has no delivery backend.
- Preserve experiments/frontend-lab as research. Adapt patterns into production src/ without importing the lab shell or its CSS. Reuse installed dependencies rather than adding overlapping libraries.
- V14 requests Prism Atelier as the preferred testable direction, with Glass Prism recoverable. Centralize tokens and retain Syne. Seven-section architecture follows V16; no permanent palette approval is implied.

## Workflow and evidence

Follow RESEARCH → CONCEPT → PROTOTYPE → RUN → INSPECT → CRITIQUE → REFINE → TEST → INTEGRATE. Use primary technical references and record access failures. Define the component's purpose, composition, meaningful interaction, motion, mobile/fallback behavior and cost before implementing complex work.

Keep native controls usable without WebGL or animation. Use finite/on-demand rendering, lazy loading, explicit media playback, reduced-motion alternatives and lifecycle cleanup. Test keyboard, touch behavior, empty/loading/error states and state invalidation. Do not use decorative effects to hide weak composition.

Inspect 360/390/768/1024/1440px in an actual browser when tools permit. A viewport simulator is not a real device. Mocked GPU/DOM tests, bundle sizes and compilation do not prove visual quality, accessibility or Core Web Vitals. Mark unobserved ratings unverified; below 4 requires a specific refinement. Record exact tool blockers instead of inventing screenshots or scores.

Save reviewable Git checkpoints on implementation/v16-service-architecture. No paid tools, public deployment or external messages without authorization. Complete browser review when available; document exact environment blockers and continue source/behavior checks when unavailable. These documents preserve project knowledge; they do not retrain the model.
