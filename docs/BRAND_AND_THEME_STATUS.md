# Brand and theme status — V16

Current instructions are the owner's service update and [V16 architecture brief](CREATIVE_BRIEF_V16.md). They supersede the old thirteen-service catalog and ten-section homepage. Production now follows the seven-section structure; Work, Project Lab and About remain independent routes.

## Current identity and catalog

| Item         | Current requirement                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Brand        | MAKENDLESS — Creative & Technology Studio                                                                |
| Philosophy   | CREATE • BUILD • GROW                                                                                    |
| Typography   | Syne, retained throughout                                                                                |
| CREATE       | Video Editing: short-form, long-form/podcasts, promotional/advertisement, repurposing, motion graphics   |
| BUILD        | Website Development: business, e-commerce, landing pages, booking/web applications, redesign/maintenance |
| GROW         | Digital Marketing: ads, social management, local business marketing, analytics/reporting                 |
| Availability | Every GROW service remains Beta / Coming Soon; interest is not a booking                                 |
| Catalog      | Fourteen services. T4 retired; T6 and M4 added. See [service contract](V16_SERVICE_NOTES.md).            |

The public website no longer offers AI assistants or automation. Historical research and earlier version records may describe retired features; they are not the current service catalog.

## Palette status

Prism Atelier is the preferred **testable** direction, retained from V14. Glass Prism remains recoverable through `?theme=glass`; use `?theme=atelier` to switch back. `HOME_THEME` in `src/theme.ts` supplies the default. A source default does not constitute final visual approval.

| Token      | Glass Prism | Prism Atelier |
| ---------- | ----------- | ------------- |
| night      | `#0A0B1B`   | `#0C1024`     |
| surface    | `#1D1B3A`   | `#202342`     |
| paper      | `#EAF2FF`   | `#F6F7FC`     |
| violet     | `#8B5CF6`   | `#6F45F6`     |
| aqua       | `#22D3EE`   | `#08BBD4`     |
| white      | `#EAF2FF`   | `#F6F8FF`     |
| mutedDark  | `#A4AAC7`   | `#B7C0DB`     |
| ink        | `#0A0B1B`   | `#13172B`     |
| mutedLight | `#4B526C`   | `#52607B`     |

This is a core token subset, not measured contrast for every rendered state. Central tokens also include readable accent/action variants, lines and washes.

The isolated lab compares experimental variants. Its Glass light-surface values differ from production: paper `#F2F5FC`, ink `#13172B`, muted `#52607B`. Read the lab token file when reproducing its contrast calculations. Lab terminology such as `accent` and `muted` does not match all production token names.

Measure actual foreground/background pairs, including focus, disabled and selected states. WCAG normal text requires 4.5:1 and large text 3:1; do not round a failing value upward. Token calculations do not establish contrast over glass, moving imagery or all rendered layers ([W3C explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).

## Evidence and history

Meaningful 3D, media composition and motion remain requirements. No actual V16 browser screenshots or GPU inspection exist because the managed preview/browser failed. See [V16 QA](V16_QA.md); design quality remains unverified until observed.

The lab's older preference for Glass, its proposals, and the V14 architecture are historical. Earlier versions remain in Git and their dated documents. Do not restore their old service descriptions into the current public website. Do not invent client work, testimonials, prices, service availability or submitted messages.
