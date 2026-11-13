# V14 spatial presentation

Implemented in `src/three/living-scene.ts` and the lifecycle wrapper `src/components/SpatialScene.tsx`. The hero owns the adaptive activation, flat/3D choice and real HTML service interface. This is an optional spatial enhancement of actual CREATE / BUILD / AI service state, not a canvas replacement for the website.

## Adapted from the lab

The lab supplied useful renderer-ownership and material techniques: one `MeshPhysicalMaterial` with nonzero transmission, thickness and IOR; an internally generated RoomEnvironment/PMREM reflection map; finite rendering; explicit resource disposal; live reduced-motion response; and the loaded Syne Variable family for texture text. The production composition is different from the lab's material-control test bench. Research controls and lab styles are not imported.

The framing uses rounded metal screen edges, an understated studio horizon, and one refractive inspection edge beside the main HTML preview. CREATE presents source, treatment and a moving edit marker; BUILD presents a responsive website and device; AI presents the five-stage human-review path. Native controls, editable text, sample website controls and primary content remain in the DOM above the canvas. The 3D view is supplementary and `aria-hidden`.

Mode changes update geometry, light color, lens placement and a bounded camera transition together. Comparison position, caption treatment, crop, edit progress, website treatment/device/menu and workflow state also update the supporting textures. Long inquiry/draft excerpts are shortened only inside the decorative texture; the full text remains in HTML.

All colors are derived from the selected central `homePalettes` tokens. No external HDR, particle system, bloom stack, video decoder, new package or paid asset is needed. The material environment is authored lighting, not measured real-world material calibration.

## Lifecycle and cost bounds

- The host lazy-loads the scene when appropriate. Compact viewports, Save-Data, reduced motion, unsupported WebGL and initialization failures retain the working HTML composition; explicit spatial opt-in remains possible where supported.
- Scene rendering starts on initialization, state change, texture/font readiness, resize, visibility return or pointer input. There is no idle render loop. Camera entrance settles within 680ms; pointer/light motion within 650ms. Reduced motion goes directly to the final frame and suppresses pointer motion.
- CSS dimensions drive the drawing buffer and a composition-fitting camera. DPR is capped at 1.5, or 1.25 for stages narrower than 600px. The transmissive pass uses `transmissionResolutionScale=0.55`. These settings are initial limits, not performance benchmarks.
- Geometry/material/texture resources are owned and disposed when mode content is replaced or the renderer is removed. The environment render target is also disposed; its generator and source room are released after creation.
- Context loss, draw failures, missing texture context and image failures immediately cancel work, remove listeners/observers, release resources/context and report fallback once. Later state updates do nothing. Late callbacks from an old React mount or palette are ignored.
- The pointer listener is attached to the containing stage, with no interception of the semantic HTML controls. Only mouse input adds the small optional response. Touch does not require tilt or hover.

Project Lab keeps its interactive business site in a separate CSS perspective frame. It does not claim to be WebGL and does not instantiate a second GPU scene merely for decoration.

## Verification and remaining review

Automated tests exercise the React wrapper and the actual Three scene graph with a **mocked WebGL driver**. They cover handle updates, theme replacement, StrictMode disposal, stale callbacks, physical material configuration, finite frame scheduling, resource release, offscreen suspension, context loss, draw/texture failure and reduced motion. This establishes source/behavior contracts; it does not execute shaders or prove GPU performance or visual quality.

The managed browser failed during V14 startup. No actual WebGL screenshot, mobile GPU result, material-quality score, FPS or memory benchmark is claimed. Before visual acceptance, inspect the amount of visible frame/lens around the DOM preview at 360/390/768/1024/1440px, all three modes and both palettes. Verify glass edges and texture detail, context-loss recovery, real pointer/touch interaction, repeated mounting, actual requests and GPU memory. Simplify or disable the enhancement if it does not improve the service presentation enough to justify its cost.
