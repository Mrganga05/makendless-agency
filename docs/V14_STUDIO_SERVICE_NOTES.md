# V14 studio and service implementation

The V14 task authorizes adapting lab engineering into the actual website. This change preserves all thirteen service IDs, names and business deliverables in `src/data.ts`. It does not claim thirteen newly invented demos: the existing distinct demonstrations were already functional, so they were retained, refined and retested.

## Studio discovery

`src/components/v14/StudioWorlds.tsx` adds three connected but different compositions:

- CREATE: a dark original waveform/title-sequence composition. “The frame” and “The story” switch the actual typography treatment.
- BUILD: a light fictional workspace site whose desktop/mobile controls change its structure and framing.
- GROW: a lilac editorial content-direction sequence with Plan/Tell/Connect states. Beta / Coming Soon stays visible.

Each has a real studio route, native pressed-state buttons and a static readable state. The narrow layout changes the asymmetrical desktop grid into a single sequence. The same destination compositions now introduce `/studios`.

Studio and service routes receive larger editorial headings, clearer service indexes, centralized theme tokens and light deliverables sections. The retained Glass Prism family remains recoverable through the global theme configuration. No lab shell or lab CSS is imported.

## Service coverage retained and tested

| Service | Distinct meaningful interaction                                                                                                                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V1      | Raw/edit comparison, caption style, format, crop, finite illustration playback, reduced-motion still frames.                                                                                                                                               |
| V2      | Podcast highlight selection and removable output clips.                                                                                                                                                                                                    |
| V3      | Creative ad treatments change composition and message.                                                                                                                                                                                                     |
| V4      | One source changes into destination-specific format, duration and copy.                                                                                                                                                                                    |
| V5      | Editable kinetic headline, motion treatment, graphic language and replay.                                                                                                                                                                                  |
| T1      | Wireframe/finished website, desktop/mobile, actual collection navigation.                                                                                                                                                                                  |
| T2      | Product choice, multi-product quantity management and mock checkout. Existing fictional dollar amounts were removed for V14; no pricing is invented.                                                                                                       |
| T3      | Service/date/time selection and truthful local mock booking; edits invalidate confirmation.                                                                                                                                                                |
| T4      | **Upgraded:** editable inquiry, deterministic keyword classification, visible routing, editable draft and explicit human-review acknowledgement. Empty input/draft cannot advance; editing input resets downstream progress. No model or message delivery. |
| T5      | Independent hierarchy, responsive-layout and visual-consistency improvements without speed claims.                                                                                                                                                         |
| M1      | Platform, objective and audience change a simulated campaign concept. No campaign launches.                                                                                                                                                                |
| M2      | Editable per-day content and format previews, with working carousel/story frames.                                                                                                                                                                          |
| M3      | Profile-completeness selections and separately labeled fictional analytics.                                                                                                                                                                                |

The service-detail final inquiry action now carries that exact service into shared project state even when the visitor did not first press “Add to my project”. Existing studio inquiry/add/remove behavior and deliverables remain intact. GROW records future interest only.

## Evidence and remaining checks

Scoped tests cover all thirteen service families and the new studio/workflow/inquiry behavior. The final test counts are recorded in the parent V14 delivery log. Source-level contrast precautions include opaque backing for small film labels and ink-on-light tokens; rendered overlap and all browser states still need review.

The parent task's browser tool and preview relay failed. No desktop/mobile screenshots, GPU inspection, physical-device testing, screen-reader output or visual quality score is claimed. In a working browser, inspect the three worlds at 360/390/768/1024/1440px, 200% text zoom, each studio's service selector, the ecommerce cart, date picker, edited workflow and the service-to-inquiry transfer. Check the full page and inline demonstrations separately, with both theme families and reduced motion.
