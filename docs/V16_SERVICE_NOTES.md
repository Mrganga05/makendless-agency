# V16 catalog and service demonstration update

The active catalog now has fourteen services, grouped into exactly three customer-facing divisions. Existing relevant IDs remain stable. The retired T4 ID is not reused for landing pages; old selections must be discarded, and the old route is handled by the application redirect.

| Division                                     | Current service IDs and names                                                                                                                                              |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CREATE — Video Editing                       | V1 Short-Form Video Editing; V2 Long-Form & Podcast Editing; V3 Promotional & Ad Video Editing; V4 Content Repurposing; V5 Motion Graphics                                 |
| BUILD — Website Development                  | T1 Business Website Development; T2 E-commerce Website Development; T6 Landing Page Development; T3 Booking Websites & Web Applications; T5 Website Redesign & Maintenance |
| GROW — Digital Marketing, Beta / Coming Soon | M1 Meta & Google Ads Management; M2 Social Media Management; M3 Local Business Digital Marketing; M4 Marketing Analytics & Reporting                                       |

The typed catalog, generated brief and sitemap use these current IDs. Service labels/descriptions/deliverables, guided discovery goals and optional recommendations follow the same structure. Marketing choices in discovery show Beta / Coming Soon; generated briefs explicitly describe them as expressions of interest. The catalog does not imply a launched advertising, publishing or reporting service.

## Distinct new or revised demonstrations

- **T6 landing page:** an original product-launch/visit page with editable headline, actual purpose-dependent CTA, responsive layout switch and a validated local sample form. Editing the email, headline or purpose clears stale preview feedback. No email is sent or registered, and no product is sold.
- **M3 local business:** profile-completeness controls feed a separate illustrative search-listing view. It no longer doubles as the analytics service. No actual business profile or location is modified.
- **M4 reporting:** channel and sample-period controls change a clearly fictional chart and accessible data table. The report total is derived from that selected sample. Editable observations can be prepared locally; input changes invalidate the prepared state and empty notes cannot prepare a report. All sample figures are explicitly invented to explain the layout, not actual customer results, measurements or predictions.
- **V5 motion:** retained editable typography, graphic language and finite replay, with customer copy focused only on motion graphics.

The existing short-form, podcast, promotional, repurposing, website, cart, booking, redesign/maintenance, campaign and calendar demos retain their meaningful controls. Booking's outdated consultation category now names landing pages. No new dependency or external request was introduced.

## Verification

Scoped completed checks: 21 DOM tests pass (`studios.test.tsx` plus `v16-catalog.test.tsx`); all 5 Node brief/recommendation tests pass; owned TypeScript-source ESLint and diff checks pass. Tests cover current service membership, rejection of retired selections, truthful beta brief text, landing form validation/invalidation, separate local profile behavior and report filtering/preparation.

These are source and jsdom behavior checks. They do not establish rendered layout, physical-device interaction, browser font wrapping, screen-reader speech, or visual quality. The root task records final integrated checks and browser availability separately.
