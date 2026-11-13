# Homepage Experience Rebuild — V12

## Scope and checkpoint

Baseline: `0a51945` (V11, synchronized with origin/main). Work is isolated on `feat/prism-atelier-v12`; the prior active brief and plan are archived as CREATIVE_BRIEF_V11.md and IMPLEMENTATION_PLAN_V11.md. V12 is retained verbatim in CREATIVE_BRIEF.md and takes precedence over the previous full-site direction.

This milestone rebuilds the homepage first. Syne, the wordmark, all 13 service definitions, existing destinations and shared project state are preserved. Internal page layouts remain unchanged. Two narrow shared-function changes support the homepage: V1 gains output aspect-ratio selection, and Contact accepts a generated brief with no selected services. Neither is a redesign of the internal pages.

The brief refers to seven reviewed screenshots, but this message supplied only the text attachment. Those images were not received or inspected. The current repository was the before reference. The managed browser and preview were retried and failed; actual visual acceptance remains open.

## Audit findings

- The previous homepage reused dark compositions, a three-world selector, mountain/coffee concepts and a process diagram. It omitted customer-specific journeys and useful package/estimate guidance.
- Working demos, ProjectProvider, brief helpers, routing, form validation and fallback logic are retained.
- No approved prices, currency, starting rates, revision counts or guarantees are present in service data/README. Packages describe typical deliverables and scope factors; a tailored-estimate action transfers intent to inquiry.
- The existing HomeExperiences component remains available for existing coverage; the new homepage uses dedicated components under src/components/home. Studios index continues to use its existing exhibition, per the homepage-first scope.

## Storyboard

| Section / customer question                  | Composition and meaningful response                                                                                                                                                                                                    | Mobile / fallback / cost                                                                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Hero — who are you?                        | Dark, large service media beside the approved headline; CREATE editing transformation, BUILD website, AI inquiry path. Atelier palette reaches both HTML and Three.js. Two clear primary journey links.                                | Flat preview by default on narrow/reduced-motion/save-data; controls remain native; no duplicate lower project actions. Engine lazy, bounded camera motion; coffee texture only requested in BUILD. |
| 2 Services — what do you offer?              | Porcelain gallery: original type film, offset responsive product page, horizontal beta planning environment. Different compositions and real previews, direct studio links.                                                            | Stacked discovery, 44px controls, finite film or discrete reduced-motion frames. No external assets.                                                                                                |
| 3 Transformation — can I see the difference? | One dark stage switches between V1, T1 and T4. Compare raw/edited, captions, framing, playback and 9:16/1:1/16:9 output; wireframe/site; stepped automation.                                                                           | Defer service code until near viewport or explicit request; one demo at a time; no ornamental canvas.                                                                                               |
| 4 Solutions — is this relevant?              | Four editorial customer journeys with creator, local-business, startup and store compositions. Selecting a journey previews only; explicit action adds optional suggestions and retains its context in project notes.                  | Real mock controls, no questionnaire, no promised outcomes. Existing notes/goals/services remain intact.                                                                                            |
| 5 Packages — how is scope priced?            | Three service-entry rows, selectable project formats and one readable scope sheet. Typical deliverables, factors and estimate process; no fictional figures or SaaS tiers.                                                             | Format buttons wrap; explicit estimate action adds approved service IDs and project-format note, then opens inquiry.                                                                                |
| 6 Work — can I trust the craft?              | Original motion-typography and working appointment concepts, distinct large compositions and expandable rationale. No reused mountain/coffee imagery.                                                                                  | Native disclosures, resettable appointment state; one-shot type replay; clearly concept work.                                                                                                       |
| 7 Lab — what about my own project?           | Attractive labeled website/booking example while real selection is empty. Four original business identities; selected website/booking/promo/assistant modules construct independently. Brief generation/edit/copy/inquiry on homepage. | Compact stacked workspace; example never implies purchase. Native controls; finite media and scripted assistant; reset retains unrelated project context.                                           |
| 8 Process + FAQ — what happens next?         | Calm light four-step progression with useful outcomes; six native FAQ disclosures about scope, information, revisions, handover and maintenance. No technical diagrams.                                                                | Direct buttons/details; no canvas or animation-dependent information. Unapproved policies remain to be agreed.                                                                                      |
| 9 Invitation — how do I begin?               | Dark closing with exact requested message, one project CTA and a restrained line signature into the existing footer.                                                                                                                   | Simple mobile composition, no ambient loops.                                                                                                                                                        |

## Theme experiment

PRISM_ATELIER and GLASS_PRISM live in src/theme.ts. HOME_THEME is the single homepage palette setting. RouteTheme applies homepage variables/aliases and removes brand overrides on internal navigation. src/atelier-theme.css styles only the homepage shell. New homepage component styles reference centralized variables instead of distributing hex values.

Atelier: night #0C1024, surface #202342, porcelain #F6F7FC, violet #6F45F6, aqua #08BBD4, white #F6F8FF, muted-dark #B7C0DB, ink #13172B, muted-light #52607B. Derived violet/aqua ink colors provide legible light-surface states; violet-light supports small emphasis on dark. Exact contrast calculations are in QA_LOG.md. They are not a whole-site accessibility certification.

## Implementation and review status

| Phase                        | Status                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| 0 Audit/checkpoint           | Complete in source; before image references unavailable                                         |
| 1 Color experiment           | Tokens, recoverable palette and calculated contrast implemented; rendered review pending        |
| 2 Nine-section architecture  | Implemented; order/landmarks/IDs verified by integration checks                                 |
| 3 Hero + Services            | Implemented; interactions and palette path checked; GPU/visual review pending                   |
| 4 Transformation + Solutions | Implemented; format, previews and handoff tested                                                |
| 5 Packages + Work            | Implemented; honest scope and interactive concepts tested                                       |
| 6 Lab + trust                | Implemented; unselected example, actual modules, brief/copy/inquiry tested                      |
| 7 Motion and 3D              | Existing lifecycle reused; finite/reduced-motion paths tested; visual timing unverified         |
| 8 Mobile art direction       | Responsive recomposition implemented; actual viewport/overflow review blocked                   |
| 9 QA                         | 119 automated tests, lint and typecheck pass; production build passes; browser evidence blocked |
| 10 Delivery                  | Validated source checkpoint with GitHub sync/archive delivery; no hosting deployment            |

## Three source-supported refinement priorities

These are source findings, not a substitute for the requested visual critique:

1. Gallery/Lab preview action labels were too small (9–10px). Increased meaningful action labels to 11px while retaining 44px hit areas.
2. Mobile hero stacked redundant discipline labels and a second discovery footer above/around the media. Removed those repeats on narrow layouts to shorten the introduction without shrinking the demonstration.
3. A selected customer journey could be lost behind an existing goal or business type. Explicit adoption now appends the chosen journey to notes without overwriting user context.

Also corrected generated-brief disclosure linkage and an inquiry edge case where an unselected generated brief was not displayed. The integration checks exercise both.

## Outstanding content and visual acceptance

Owner-approved price amounts/currency/scope exclusions, revision policy, turnaround commitments, verified client work and contact/delivery configuration remain unsupplied. They are not invented or required to use the local concept site. Public deployment still requires authorization.

Run the local site and inspect 1440/1024/768/390/360px. Capture the full homepage and interaction states, identify the three weakest rendered sections, refine them and review again. Verify overflow, readable controls, real WebGL output, context loss, keyboard/reduced motion and mobile performance. No visual completion, screenshots or performance scores can be claimed until this occurs.
