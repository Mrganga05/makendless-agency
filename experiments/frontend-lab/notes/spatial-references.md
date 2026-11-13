# Spatial material study — source record

Research date: 2026-11-13. These sources were retrieved as readable documentation through web lookup. Their embedded examples were **not visually inspected**. No source artwork or reference layout was copied.

| Source | Finding used in this experiment |
| --- | --- |
| [Three.js MeshPhysicalMaterial](https://threejs.org/docs/pages/MeshPhysicalMaterial.html) | Physical transmission retains reflection; opacity remains 1. Thickness and IOR are meaningful material controls. Advanced physical shading adds per-pixel cost and benefits from an environment map. |
| [Three.js rendering on demand](https://threejs.org/manual/pages/rendering-on-demand.html) | Deduplicate requested frames and redraw after changes instead of running a permanent loop. Camera easing has a finite deadline and reaches its target. |
| [Three.js responsive design](https://threejs.org/manual/pages/responsive.html) | CSS size and drawing-buffer resolution differ. Update camera aspect and drawing-buffer size together; cap DPR rather than blindly multiplying pixel cost. |
| [Three.js cleanup](https://threejs.org/manual/pages/cleanup.html) | Three.js does not automatically free WebGL resources. Track and dispose owned geometries, materials, textures, render targets, and renderer. |
| [Three.js disposing objects](https://threejs.org/manual/pages/how-to-dispose-of-objects.html) | Render targets own additional framebuffer resources. Texture/material disposal must be explicit; renderer memory information is diagnostic, not proof that every nonzero count leaks. |
| [React Three Fiber scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | `frameloop="demand"` and invalidation express the same ownership principle as the implemented raw Three.js scheduler. Idle scenes should settle. |
| [React Three Fiber Canvas API](https://r3f.docs.pmnd.rs/api/canvas) | Rendering mode and DPR are explicit configuration choices. A React renderer is useful when a larger declarative scene graph warrants it. |
| [Drei MeshTransmissionMaterial](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material) | Refraction can require an additional scene pass. Samples, buffer resolution, backside rendering, and multiple transmissive objects materially change cost. Avoid adding these effects without a demonstrated visual need. |

## Access and version limits

- Legacy `https://threejs.org/manual/en/cleanup.html`, `/rendering-on-demand.html`, and `/responsive.html` returned 404 during research. The current `/manual/pages/` URLs above were accessible. The old `docs/#api/en/materials/MeshPhysicalMaterial` URL returned the documentation index; the current `/docs/pages/MeshPhysicalMaterial.html` page was used instead.
- Current online documentation can describe features newer than the installed Three.js r180. The implementation uses the repository's existing `three` and `@types/three` packages; `transmissionResolutionScale` was verified in the installed type declarations. No package upgrades or R3F/drei dependency additions were made.
- Browser inspection was unavailable when this source record was written. The shared browser initialization reported `the gaas-browser node_repl sandbox cannot be disabled`; the managed preview browser also timed out. These are environment limits, not evidence that the scene works visually.

## Original interpretation

The BUILD service becomes an interface mounted in a framed display. An acrylic inspection lens sits over a high-contrast graphic within that interface. Switching to satin deliberately hides the artwork underneath, making surface selection an observable comparison. Camera and light presets reveal depth without idle spinning. The fallback is explicitly an SVG composition, not a simulation of optical refraction.

Raw Three.js is sufficient for a single owner-managed scene in this repository. R3F remains a reasonable future choice for a substantially larger React-composed scene; drei's extra transmission effects are deferred until actual GPU review demonstrates their benefit.

## Source checks after integration review

Canvas font strings and SVG CSS explicitly use `"Syne Variable", Syne, sans-serif`, matching the installed font package's family name. A source-color luminance calculation found the atelier texture CTA's original dark-on-accent pairing at 3.46:1. Its background now uses `accentLight` in both texture and fallback, giving 9.20:1 in atelier and 9.59:1 in glass. Body text against paper is at least 16.24:1, muted text at least 5.80:1, and the satin label at least 7.65:1 across the two source palettes. These calculations cover declared solid color pairs, not rasterized WebGL pixels, lighting, antialiasing, or an actual visual audit.
