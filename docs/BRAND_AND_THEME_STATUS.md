# Brand and theme status — Lab V3 / V14 update

**Current V14 direction:** the owner now requests Prism Atelier as the preferred testable website implementation, retaining Glass Prism as recoverable. See [V14 brief](CREATIVE_BRIEF_V14.md) and [implementation record](V14_IMPLEMENTATION.md). The lab-era status below is retained as history; it is not a prohibition on the newly authorized redesign.

Source of current intent: [Frontend Lab V3 brief](FRONTEND_LAB_BRIEF.md), especially sections 2, 10 and 20. Recorded 13 November 2026. **Implementation status and owner approval are different facts.**

## Preserve

| Item                         | Status                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| MAKENDLESS spelling          | Established brand; preserve exactly.                                                                  |
| Creative & Technology Studio | Established category.                                                                                 |
| CREATE • BUILD • GROW        | Established philosophy and service grouping.                                                          |
| Syne typography              | Explicitly required by the latest brief.                                                              |
| CREATE                       | Video Editing & Creative Production.                                                                  |
| BUILD                        | Websites, IT Services & AI Solutions.                                                                 |
| GROW                         | Digital Marketing; Beta / Coming Soon. Do not imply currently available delivery.                     |
| Complete service catalog     | Retain all 13 services; a focused experiment may demonstrate a subset without redefining the catalog. |

The production catalog in `src/data.ts` contains:

| CREATE — 5                             | BUILD — 5                                 | GROW — 3, Beta / Coming Soon       |
| -------------------------------------- | ----------------------------------------- | ---------------------------------- |
| Short-Form Video Editing               | Business Website Design & Development     | Meta & Google Ads Management       |
| Long-Form & Podcast Editing            | E-commerce Website Development            | Social Media Content Management    |
| Promotional & Ad Video Editing         | Booking Systems & Custom Web Applications | Local Digital Presence & Analytics |
| Content Repurposing & Creator Packages | Business Automation & AI Assistants       | —                                  |
| Motion Graphics & AI-Assisted Editing  | Website Maintenance & Optimization        | —                                  |

## Palette status

**Glass Prism:** legacy brand family, currently favored in the latest brief. **Prism Atelier:** richer direction under evaluation. Both may be compared in the isolated lab. Neither the most recently displayed lab theme nor an implementation default constitutes new production approval.

The existing V12 `src/theme.ts` sets `HOME_THEME` to `atelier` and retains both palettes. That describes checked-in behavior, not a decision made during this practice phase. Leave production configuration unchanged. This table records core **production source tokens**, not the complete lab palette or measured contrast results:

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

The isolated `experiments/frontend-lab/src/theme.ts` compares experimental variants. Its Glass selection overrides three production values for the lab's light surfaces:

| Meaning                 | Production Glass token/value | Experimental lab Glass token/value |
| ----------------------- | ---------------------------- | ---------------------------------- |
| Light background        | `paper: #EAF2FF`             | `paper: #F2F5FC`                   |
| Dark text               | `ink: #0A0B1B`               | `ink: #13172B`                     |
| Secondary text on light | `mutedLight: #4B526C`        | `muted: #52607B`                   |

The lab uses `accent` for production `violet`, `accentLight` for `violetLight`, and `muted` for `mutedLight`; these are lab token names. Its Atelier values match the corresponding production tokens. The lab is a smaller token set and does not reproduce every production state color. These overrides are experiments, not changes to the approved brand or production configuration. Read the lab token file when reproducing lab contrast calculations.

Measure actual foreground/background pairs, including hover, selected, disabled and focus states. WCAG's normal-text threshold is 4.5:1 and large-text threshold 3:1; do not round a failing value upward. A token calculation does not verify translucent surfaces, moving backgrounds, every rendered state, or overall accessibility ([W3C contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).

## Still proposals

The ten-section future homepage outline, hero winner, new palette variants, 3D direction and motion style remain proposals pending observed comparison. Lab scenes and sample projects are original demonstrations, not evidence of client delivery. No fake clients, testimonials, metrics, prices, shipping AI integration or marketing availability. Keep technical research controls and review notes out of future customer-facing flows unless they help the customer make a meaningful choice.
