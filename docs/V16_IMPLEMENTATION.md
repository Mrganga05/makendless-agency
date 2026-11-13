# MAKENDLESS V16 — implementation record

Recorded 13 November 2026. Branch: `implementation/v16-service-architecture`. The owner’s [V16 brief](CREATIVE_BRIEF_V16.md) and three-division update supersede the older homepage plans and service list.

Working implementation checkpoint: `3224103` — seven-section homepage, all service/demo changes and verified interaction coverage. The following documentation checkpoint records the evidence and remaining acceptance work.

V16 branches from V14 checkpoint `54748312df9c882f6cc8411f27280303fb206217`. Scope checkpoint `f6332ba` preserves the V16 brief and service contract before implementation. V12/main remains recoverable at `aaec63520e00b010a16534227d188d90a91c6a35`; the research lab and V14 records remain in Git.

## Homepage and visual direction

Exactly seven direct main sections remain: `home`, `studios`, `showcase`, `solutions`, `packages`, `process`, `start`. The global footer follows the final invitation. Selected Work, Project Lab and About are removed from the homepage composition; their independent routes, reusable components and relevant state logic remain.

The sequence is cinematic hero → rich three-choice studio gallery → immersive service stage → bright customer stories → light editorial packages → calmer process/FAQ → cinematic closing. Existing Syne, Atelier tokens, recoverable Glass, finite reveal/mask/state motion and optional physical rendering remain.

Three studio destinations now share a balanced desktop composition and stacked mobile rules. Each is a native link with a distinct media composition: CREATE title treatment/timeline, BUILD responsive website/device, GROW illustrative campaign. Preview controls are outside the links. Pointer and keyboard focus update the active treatment; all three destinations remain discoverable without hover.

These are authored compositions, not browser-approved visual results.

## Service architecture and interactions

- CREATE contains five video editing services; BUILD contains five website services; GROW contains four digital marketing services, all Beta / Coming Soon. The exact contract is in [service notes](V16_SERVICE_NOTES.md).
- T4 is retired without reuse. Its old route redirects to BUILD. Project state filters invalid service IDs, deduplicates choices and clears stale brief content when removing invalid selections. The setter keeps a stable identity for dependent effects.
- T6 introduces an editable landing-page concept and local form validation; M4 introduces a clearly fictional report with channel/period controls, chart/table and editable observations. M3 remains a separate local-business profile example.
- Hero modes are Video Editing, Websites and Digital Marketing; Transformation names the website mode Website Development. Campaign objective, creative and feed/story placement produce independent real state changes, including synchronized optional 3D.
- The new shared CampaignPreview replaces former workflow/assistant demonstrations in the hero, Transformation, standalone Project Lab and Work concept. Two homepage instances keep independent state and unique form/SVG IDs.
- Solutions recommend creator, local-business, startup and online-store services. Marketing recommendations are explicit optional Beta choices, unselected by default in the current homepage. Exploration does not modify the project; continuing carries only the selected recommendations.
- Packages show Video Editing, Website Development and Digital Marketing Beta, with deliverables, scope factors and optional services. No prices are invented. Beta routes to Explore Beta and never implies a submitted registration.
- The standalone Project Lab retains optional website, booking, promotional film and illustrative campaign modules, example opt-in, reset, generated/editable/copyable briefs and inquiry handoff. Reset preserves unrelated project context.
- Navigation, metadata, service pages, recommendations, retained older components, supporting pages, footer, generated brief and sitemap source follow the revised architecture. Marketing actions use future-interest/draft language.
- Work retains its old campaign anchor alias for inbound links, but displays an illustrative campaign rather than the retired workflow.

## Spatial, motion and loading

The renderer shares campaign state with HTML. Its fictional café feed/story screens update objective text, creative texture and placement prominence. Physical glass edges, generated reflections, authored lights, bounded camera transitions and scene cleanup remain. Details and limits are in [spatial notes](V16_SPATIAL_NOTES.md).

The optional Three.js chunk remains lazy loaded. Native HTML controls work without WebGL, under reduced motion and after renderer failure. No new dependency was added. Existing content/demo route splitting remains.

Final production build reports a roughly 501 kB minified optional spatial chunk (128 kB gzip), just over Vite's 500 kB warning threshold. That warning is retained and disclosed; it is not a measured device-performance result.

## Source-review refinements

1. Split campaign CSS selectors by placement and creative so changing to the story creative does not accidentally force portrait placement.
2. Stabilized the normalized project setter with useCallback after regression tests exposed an update loop in effect-based callers.
3. Preserved unique generated IDs across both homepage campaign instances and tested their independent state.
4. Kept homepage marketing recommendations optional and unselected, used Explore Beta for the Beta package, and used interest-draft language on marketing service CTAs.
5. Preserved the retired service route as a redirect and rejected stale IDs instead of silently mapping them to new paid services.

An independent source review found no blocking campaign/3D synchronization or Beta-label defect. It did not inspect actual GPU output.

## Acceptance and delivery

TypeScript, lint, behavior tests and production build pass; [V16 QA](V16_QA.md) records exact evidence. The supported preview relay and browser entry point both failed. Actual desktop/mobile screenshots, visual critique/refinement, GPU inspection, touch/assistive-technology testing and Core Web Vitals remain outstanding. No visual score or preview URL is fabricated.

Current implementation is saved on its V16 branch; main is not merged or deployed. Local instructions are in [README](../README.md). The source archive is `/workspace/startup/makendless-v16.zip`.

No inquiry-delivery backend is connected. Customer messages, payments, bookings, live campaigns and real analytics are not performed. Draft legal content and unapproved business inputs remain clearly identified.
