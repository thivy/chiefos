# PowerPoint Design System

The binding style for every deck: canvas, tokens, colours, fonts, grid and cards. Layout and composition are free within it.

## Principles

- 16:9 canvas, 13.333 × 7.5 in. One communication objective per slide, with an assertion title.
- Use hierarchy, alignment, scale, contrast and white space before containers. Cards only where grouping, containment or comparison is meaningful, in the [card style](#card-style).
- Prefer a photo, chart, table or direct statement over a decorative diagram.
- Never stretch images, logos, icons or charts. Nothing overlaps unintentionally or leaves the safe area. Keep content editable.

## Tokens

| Token | Value | Token | Value |
| --- | ---: | --- | ---: |
| `margin-x` | 0.67 in | `space-1` | 0.08 in |
| `margin-top` | 0.46 in | `space-2` | 0.14 in |
| `margin-bottom` | 0.42 in | `space-3` | 0.22 in |
| `title-zone-height` | 0.82 in | `space-4` | 0.34 in |
| `footer-zone-height` | 0.24 in | `space-5` | 0.50 in |
| `column-gap` | 0.28 in | `radius-sm` | 0.06 in (cards, labels) |
| `row-gap` | 0.22 in | `radius-md` | 0.12 in (large panels) |
| `line-hairline` | 0.75 pt | `line-standard` | 1.25 pt (diagrams, connectors) |

## Colours

The palette is `chief-os-design`: Palette (names and solid hex values; slides need no alpha for text). Roles:

| Role | Palette name | Use |
| --- | --- | --- |
| `background` | Warm Paper | Slide background |
| `foreground`, `brand`, `dark-surface` | Ink | Text, icons, primary emphasis, dark or image-overlay slides |
| `muted` | Muted Text | Secondary text |
| `subtle` | White | Quiet panels, table bands |
| `border` | Hairline | Rules and light outlines (never to hold meaning) |
| `brand-soft`, `positive` | Sage | Light surface, positive or complete |
| `warning` | Lemon | Caution or unresolved |
| `critical` | Sand | Critical or negative |
| `accent` | Lilac | Second accent, categorical series |
| `on-dark` | Warm Paper | Text on dark surfaces |

A shape or data mark in a pastel carries an Ink outline or direct label (cards are exempt). At most one primary colour and two accents per slide. Semantic colours keep one meaning across the deck, and status also carries a label and icon, never colour alone.

## Typography

Installed fonts only; no remote or packaged fonts.

- **Sans:** Segoe UI Variable, using the Display family for titles, section dividers and large metrics, Text for body, tables, captions and chart labels, and Small only for compact metadata. Fallback: Segoe UI, Aptos, Arial. Use the complete installed family name (for example `Semibold`) where PowerPoint exposes it.
- **Serif:** Georgia, selectively for editorial title slides, quotations, storytelling and short emphasis. Never in dense tables, chart labels, diagrams or small metadata, and never mixed with Segoe in one sentence. Use only faces that are installed.

| Role | Size | Family | Max |
| --- | --- | --- | --- |
| `hero-title` | 40–54 pt | Georgia | 3 lines |
| `section-title` | 34–44 pt | Georgia | 3 lines |
| `slide-title` | 26–32 pt | Georgia | 2 lines |
| `large-number` | 48–76 pt | Segoe Display | 1 line |
| `large-statement` | 28–38 pt | Georgia | 4 lines |
| `subheading` | 18–22 pt | Segoe Text | 2 lines |
| `body` | 16–20 pt | Segoe Text | 6 lines per block |
| `body-compact` | 14–16 pt | Segoe Text | exception |
| `caption` | 11–13 pt | Segoe Text/Small | 2 lines |

Never shrink body text below 14 pt; re-plan or split instead. Sentence case; all caps only for labels of four words or fewer.

## Grid

Safe frame x = 0.67 to 12.663 in (width 11.993 in). Title at y = 0.46 in; content from y = 1.52 in to 7.08 in, or to 6.62 in with a footer (y = 6.84–7.08 in). The title region is not for content unless the layout removes it. Use a 12-column grid with 0.28 in gutters (columns about 0.743 in) and snap major regions to it. Common splits: 12, 6/6, 5/7, 7/5, 4/8, 8/4, 4/4/4, 3/6/3, 3/3/3/3, 2/10. No more than four primary columns; five or more peers need a matrix, timeline, table, grouping, or more slides.

Keep to one primary message, one dominant visual, three to five supporting points, at most two secondary callouts, two bullet levels and four regions. Leave meaningful open space, align to one edge per region, and keep repeated elements in the same position across slides.

## Card style

Apply `chief-os-design`: Card for the surface, colours, and parts and order. Use cards only in L09, L11, L15, L16, L22, L23 and L24, never on a dark surface.

- Radius `radius-sm`; outline `line-hairline` in Ink at 95% transparency; soft shadow: Ink at 85% transparency, 6 pt blur, 2 pt down. Rotation restarts from Sage on each slide. Status cards (L23) use `positive`, `warning` or `critical` with a label and icon. A summary card is the context beside a chart or list.
- Padding `space-3`, part gap `space-2`. Corner marks: dots 0.03 in wide with 0.03 in gaps, `space-1` from each corner, at 60% transparency, grouped as one decorative object. Header: `caption` label with an optional 16–20 pt icon. Content: `subheading` title and `body-compact` text, at most four lines (shorten, don't cut off). Footer: name in `caption` at weight 550, then role; add a round picture only when a real one exists, never an empty avatar. Next step: `line-hairline` rule in Ink at 90% transparency, then the action in `body-compact` at weight 550. No toggle.
- An image in L05 or L07 takes the card shape with no padding, marks or text, cropped to fill.
- Group each card's surface, marks and text and name the group, so animation and Morph move it as one.
