# MAKENDLESS — 3D engineering guide

This is a research guide for the isolated frontend lab, not production approval. Implemented example: `experiments/frontend-lab/src/SpatialLab.tsx` and `spatial-renderer.ts`. Research sources and access limits: [spatial-references.md](../experiments/frontend-lab/notes/spatial-references.md).

## Give depth a job

Use 3D to explain an interface, a material, a product configuration, or a media composition. Start with a readable static composition and a reason to inspect another view. The lab presents a MAKENDLESS interface on a framed display; a physical material lens makes glass, satin, roughness, lighting, and perspective directly comparable. It has no arbitrary floating object or perpetual rotation.

Keep meaningful text, controls, status, and service navigation in HTML. The interface texture is illustrative artwork; a future production CTA must remain an actual DOM link. Canvas is not the page's navigation or sole information source.

## Material and lighting decisions

- `MeshPhysicalMaterial` provides real transmission with `opacity: 1`, `ior: 1.46`, and nonzero thickness. Glass transmission is adjustable. Satin sets transmission to zero and uses a metallic, rougher surface. Crossing the zero-transmission boundary marks the material for a shader update.
- A generated RoomEnvironment is converted with PMREM to supply useful reflections without an external HDR download. Key and fill lights have selectable studio/warm colors. This is an art-directed lighting study, not measured material calibration.
- There is one transmissive object. The textured interface is opaque so it can appear in the transmission pass. Layered transparent objects, chromatic aberration, bloom, soft shadow accumulators, and multiple refraction passes are excluded from this experiment's scope.
- `transmissionResolutionScale: 0.6` and capped device pixel ratio are initial quality settings, **not measured performance conclusions**. Inspect the glass edge and detail at actual target sizes before accepting them.

## Rendering and lifecycle ownership

`SpatialLab` imports the engine only when the stage is near view and enabled. Small screens, Save-Data, and reduced-motion preferences begin with the SVG view and offer explicit 3D opt-in. The shell's forced fallback disposes the current engine. Unmount cancellation prevents late dynamic imports from creating an orphan scene.

The renderer owns the scene, resource set, observers, listeners, and animation request. It renders after an input, resize, palette/font change, or visibility return. Camera/hover motion eases for at most 700ms and snaps to its final state; an idle scene requests no frames. Offscreen and hidden tabs cancel pending frames. Reduced-motion mode uses immediate camera changes and disables pointer tilt.

Resize uses the canvas's CSS dimensions, updates perspective aspect/projection, and changes the drawing buffer. DPR is capped at 1.5, or 1.25 for narrow stages. A ResizeObserver is used where available, with a window resize listener as fallback.

Disposal cancels RAF, disconnects observers, removes event listeners, and disposes all owned textures, materials, geometries, the environment render target, and renderer. The PMREM generator and source room are disposed immediately after environment generation. The WebGL context is explicitly released when the experiment is removed. A context-loss event or draw failure returns to the accessible illustration with a manual retry, rather than starting an automatic failure loop.

## Fallback and input contract

The native buttons/range inputs remain outside WebGL and operate in either mode. Material buttons expose `aria-pressed`; sliders have labels and values. Transmission is disabled for satin because that material is opaque. Camera and lighting presets provide keyboard/touch equivalents for the visual study. Pointer tilt is a small optional desktop enhancement.

The SVG fallback changes composition, color, lens coverage, and camera projection with the controls. It is explicitly labeled as an illustration. It cannot demonstrate physical refraction; do not describe its opacity effect as equivalent to WebGL transmission.

Embedded mode omits the experiment heading and keeps material/camera controls for Hero B. Full experiment mode adds lighting and numeric roughness/transmission controls.

## Verification and acceptance

The lab's mocked-renderer tests verify fallback controls, state updates without engine recreation, opt-in reduced motion, cancellation during import, engine disposal, initialization failure, and the renderer failure callback. They do **not** execute shaders, prove GPU cleanup, or assess appearance.

Before any production use, complete a real WebGL review at desktop and mobile sizes: inspect initial framing, texture readability, glass refraction over the striped artwork, both material/lighting presets, keyboard focus and all controls, context loss/retry, tab/offscreen pauses, reduced motion, forced fallback, and repeated mount/unmount. Record actual browser/renderer/device evidence. Use GPU/memory profiling and real frame timing before making performance claims. Check the fallback with WebGL disabled and Save-Data where supported.

At authoring time, the managed browser was unavailable. No visual quality score, FPS claim, screenshot result, or production-readiness claim is implied by passing TypeScript, build, or mocked tests.
