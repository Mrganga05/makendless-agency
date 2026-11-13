# MAKENDLESS V14 — implementation record

The owner authorized the complete frontend upgrade in [CREATIVE_BRIEF_V14.md](CREATIVE_BRIEF_V14.md). This supersedes the earlier lab-only scope. Work is on `implementation/v14-living-experience`, branching from lab checkpoint `cc438843dfc8dea70fe092ea0fc552cd96e75c17`. V12 remains recoverable at `aaec63520e00b010a16534227d188d90a91c6a35`.

## Direction

The ten sections follow attract → explain → demonstrate → personalize → build trust → convert. Each has a distinct job: the cinematic headline and living service stage; three studio worlds; a dominant transformation preview; client-specific solutions; selected concepts; scope-led packages; the living business configurator; studio philosophy; process/FAQ; a closing invitation.

The lab supplied tested patterns: native controls, derived state, downstream invalidation, lazy imports, finite animation, reduced-motion alternatives, resource ownership and optional physical materials. Its compositions had no actual browser approval. They are adapted here as V14 implementation candidates, not represented as proven visual winners.

Atelier is applied site-wide through `theme.ts`, `SiteThemeProvider` and `RouteTheme`; Glass remains available through `?theme=glass`. The query affects this tab's app state and survives in-app route navigation. Use `?theme=atelier` to switch back, or change `HOME_THEME` for the default. Nothing is saved to storage. Main page navigation stays customer-focused; palette test controls are not added to it.

Syne, the wordmark, all 13 service IDs/names and GROW Beta / Coming Soon remain established requirements. Project selections carry into the existing local inquiry draft. There is no delivery backend and no invented submission success.

## Browser review status

The actual production checkout was passed to `sites-preview start /workspace/startup/makendless` before implementation. It failed with `sites-preview: relay could not open browser port 4173: timed out waiting for relay readiness`. The browser entry point `cua.getState()` independently failed with `the gaas-browser node_repl sandbox cannot be disabled`. `sites-preview status` reported `Sites preview stopped`.

The preview workflow permits a retry only after a concrete repair or evidence of recovery. No repairable application defect was reported. Repeating the same infrastructure failure at each milestone would not constitute testing. Source checks, interaction tests and builds continue; actual desktop/mobile screenshots, rendered criticism, GPU profiling and device measurements remain outstanding. No visual score or preview URL is invented.

## Checkpoints and remaining review

- Scope checkpoint: `657fca5` records the unmodified V14 brief and current project instructions.
- Visual-system checkpoint: `02bc09a` applies the configurable palette across routes, refines global navigation/footer and gives the inquiry form an editorial paper surface. Two palette lifecycle/navigation tests and scoped lint pass.
- Complete frontend checkpoint: `784eab7` delivers all ten sections, the connected hero/3D stage, studio/service refinements and shared Project Lab. Final source checks pass: 149 tests (5 helper + 144 DOM), TypeScript, full lint and production build. Detailed evidence and remaining acceptance review are in [V14_QA.md](V14_QA.md).

For a working browser, inspect every section individually and in sequence at 360, 390, 768, 1024 and 1440px. Repeat both palettes, reduced motion, disabled WebGL, keyboard-only navigation and touch. Focus specifically on the combined DOM/3D composition, typography wrapping, preview readability and whether consecutive sections feel varied without losing coherence. The optional renderer must earn its download/GPU cost in real measurement.

Run local development from the repository root with `npm ci` then `npm run dev`. Open the URL printed by Vite. Root `npm run build` creates the website build. The preserved lab remains separate: `npm run dev --prefix experiments/frontend-lab`.

This task saves working source and Git checkpoints. It does not publicly deploy the website, send customer messages or turn draft Privacy/Terms into approved policies.
