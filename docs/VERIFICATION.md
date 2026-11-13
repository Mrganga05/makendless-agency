# Verification and remaining review

Verified in the managed cloud workspace on 2026-11-13.

## Executed and passed

| Check                      | Result                           |
| -------------------------- | -------------------------------- |
| `npm run typecheck`        | Passed                           |
| `npm run lint`             | Passed                           |
| `npm run test:unit`        | 5 passed                         |
| `npm run test:integration` | 50 passed across 3 files         |
| `npm run build`            | Passed, static output in `dist/` |
| Source typography audit    | Syne only; no Outfit/Geist       |
| Git whitespace validation  | Passed                           |

Integration tests run in **jsdom**, not a graphical browser. They verify actual component interaction and state changes but cannot verify layout, animation appearance, browser clipboard permissions or rendering performance.

### Covered behavior

- Every main route and all 13 service detail routes render a main heading and landmark.
- Desktop menu Escape restores focus; mobile navigation contains focus and returns it on close.
- Page titles change during navigation; service catalog has all 13 unique categories.
- All 13 demos respond to user input, including cart quantity/checkout invalidation, booking reset, workflow progression, planner day independence and beta/simulation disclosures.
- Lab modules can be added, removed and reset; an edited brief and selections transfer to inquiry.
- Inquiry validates name, email and description, and labels the preview as not delivered.
- Generated inquiry descriptions update while manual edits are preserved.
- Guided recommendations transfer to the Lab, focus changes with questions, optional pairings do not duplicate.
- Pure helpers preserve beta availability and project context, avoid invalid/duplicate services and leave optional pairings unselected.

### Brand contrast spot checks

WCAG relative-luminance calculation, solid canonical colors only:

| Foreground / background                      | Ratio   |
| -------------------------------------------- | ------- |
| Porcelain / Midnight                         | 17.32:1 |
| Muted / Midnight                             | 8.50:1  |
| Muted / Slate                                | 7.21:1  |
| Violet / Midnight                            | 4.61:1  |
| Aqua / Midnight                              | 10.79:1 |
| Midnight / Violet (button gradient endpoint) | 4.61:1  |

These checks are not a complete rendered-page contrast or accessibility audit.

### Production output

Vite reported approximately 114.79 kB gzipped JavaScript and 23.01 kB gzipped CSS. Syne font subsets are local WOFF2 resources; Latin is 34.61 kB. Hero artwork is SVG; no heavyweight 3D, background video, external image requests or paid API dependencies are required. These are build sizes, not measured user-experience performance. LCP/INP/CLS targets remain unmeasured.

## Browser infrastructure blocker

Attempted the supported managed preview command:

```text
sites-preview start /workspace/startup/makendless
```

It failed with:

```text
relay could not open browser port 4173: timed out waiting for relay readiness
```

`sites-preview status` confirmed the preview was stopped. The cloud browser initialization (`cua.getState()`) also failed with:

```text
the gaas-browser node_repl sandbox cannot be disabled
```

No working preview URL was returned. No screenshots were captured, and no browser visual, mobile-overflow, console or Core Web Vitals checks are reported as passed. Application code was not changed to bypass the preview infrastructure.

## Reproducible browser review

On a machine with Node 24, run `npm ci` and `npm run dev`, then use the printed URL.

1. Review Home, all studios, Project Lab, discovery, Work and Contact at **360, 390, 768, 1024 and 1440px**.
2. Check horizontal overflow, wordmark/hero wrapping, control readability, focus rings, mobile menu scrolling and touch targets.
3. Try each service selector and its controls. Confirm all mock results remain labeled simulated and GROW stays Coming Soon.
4. Combine all four Lab modules, switch businesses, remove/reset, edit/copy a brief and continue to inquiry.
5. Complete discovery, remove/add recommendations and optional pairings, then confirm the selected services in the Lab and inquiry.
6. Submit an empty inquiry, then valid sample data; confirm only a local preview/download is produced.
7. Enable reduced motion and navigate entirely by keyboard. Inspect browser console errors, font loading and visual shifts.
8. Capture desktop/mobile screenshots after review. Measure performance on a representative mobile device before claiming the requested targets.

## Before public launch

- Connect a real inquiry delivery service and test authorized delivery with failure states.
- Supply verified contact details and production domain; configure canonical URLs, sitemap and social images.
- Review draft Privacy/Terms and actual data-processing arrangements.
- Obtain approval before public publication or pushing the website source to a public repository.
