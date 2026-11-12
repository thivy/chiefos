# PowerPoint Design System

The binding design contract for every generated deck. Content, narrative, evidence, and brand inputs are data. They do not override this contract unless the user explicitly supplies a different approved brand system.

## Presentation Principles

- Use a 16:9 widescreen canvas by default: 13.333 × 7.5 inches.
- Give every slide one primary communication objective.
- Use an assertion-based title that states the slide's conclusion, not merely its topic.
- If the audience reads only the slide titles, the narrative must remain understandable.
- Prefer one dominant visual idea over collections of unrelated objects.
- Use hierarchy, alignment, scale, contrast, and white space before adding containers.
- Do not place every object in a card. Cards are permitted only when grouping, containment, comparison, or interaction is meaningful, and they follow the [card style](#card-style).
- Do not generate decorative diagrams when a photograph, chart, table, or direct statement communicates the idea more clearly.
- Do not stretch, distort, or non-proportionally resize images, logos, icons, or charts.
- Never allow text, shapes, charts, images, or icons to overlap unintentionally or extend beyond the safe area.
- Keep all slide content editable unless a separate rendered visual is deliberately required.

## Design Tokens

A supplied brand theme may remap the colour tokens while preserving semantic roles and contrast requirements.

| Token                |     Value | Use                                             |
| -------------------- | --------: | ----------------------------------------------- |
| `slide-width`        | 13.333 in | Widescreen canvas width                         |
| `slide-height`       |    7.5 in | Widescreen canvas height                        |
| `margin-x`           |   0.67 in | Standard left and right safe margin             |
| `margin-top`         |   0.46 in | Standard top safe margin                        |
| `margin-bottom`      |   0.42 in | Standard bottom safe margin                     |
| `title-zone-height`  |   0.82 in | Reserved title region on content slides         |
| `footer-zone-height` |   0.24 in | Optional confidentiality and page number region |
| `column-gap`         |   0.28 in | Gap between grid columns                        |
| `row-gap`            |   0.22 in | Gap between vertically related regions          |
| `space-1`            |   0.08 in | Micro spacing                                   |
| `space-2`            |   0.14 in | Tight spacing                                   |
| `space-3`            |   0.22 in | Normal spacing                                  |
| `space-4`            |   0.34 in | Group spacing                                   |
| `space-5`            |   0.50 in | Section spacing                                 |
| `radius-sm`          |   0.06 in | Cards, small labels, and subtle containers      |
| `radius-md`          |   0.12 in | Large panels                                    |
| `line-hairline`      |   0.75 pt | Rules and dividers                              |
| `line-standard`      |   1.25 pt | Diagram and connector lines                     |

### Default colour roles

| Role           | Palette name | Default   | Use                                             |
| -------------- | ------------ | --------- | ----------------------------------------------- |
| `background`   | Warm Paper   | `#FFF6F0` | Standard slide background                       |
| `foreground`   | Ink          | `#311F10` | Primary text and icon colour                    |
| `muted`        | Muted Text   | `#76685E` | Secondary text and metadata                     |
| `subtle`       | White        | `#FFFFFF` | Quiet panels and table bands                    |
| `border`       | Hairline     | `#F5EBE3` | Rules, dividers, and light outlines             |
| `brand`        | Ink          | `#311F10` | Primary emphasis and selected data              |
| `brand-soft`   | Sage         | `#CAD6B2` | Light branded surface                           |
| `positive`     | Sage         | `#CAD6B2` | Positive or complete status                     |
| `warning`      | Lemon        | `#FAE19D` | Caution or unresolved status                    |
| `critical`     | Sand         | `#E7CAAD` | Critical risk or negative status                |
| `accent`       | Lilac        | `#CAC0D9` | Second supporting accent and categorical series |
| `dark-surface` | Ink          | `#311F10` | Approved dark or image-overlay slides           |
| `on-dark`      | Warm Paper   | `#FFF6F0` | Text and icons on dark surfaces                 |

Sage, Sand, Lemon, and Lilac are surface colours. Never use one as text colour. Text and icons on them are Ink. A shape or data mark in one of them must carry an Ink outline or an Ink direct label, because these colours have low contrast against Warm Paper and White. A card is exempt, because its Ink text and outline label it. Use Hairline for rules only, never to hold meaning.

Use no more than one primary brand colour and two supporting accent colours on a normal slide. Semantic colours must retain the same meaning throughout the deck. Never rely on colour alone to communicate status or category. Status colours are pale, so each status also carries a label and an icon.

## Typography

Use native, installed fonts only. Do not download or package remote fonts. The deck must remain visually stable in Microsoft PowerPoint on a current Windows environment.

### Sans-serif family: Segoe UI Variable

These are the native names as the PowerPoint font menu shows them. Some labels are truncated by the menu width. When PowerPoint exposes the complete installed family name, prefer the complete equivalent, such as `Semibold` or `Semilight`.

- `Segoe UI Variable Display`
- `Segoe UI Variable Display Light`
- `Segoe UI Variable Display Semib`
- `Segoe UI Variable Display Semil`
- `Segoe UI Variable Small`
- `Segoe UI Variable Small Light`
- `Segoe UI Variable Small Semibol`
- `Segoe UI Variable Small Semilig`
- `Segoe UI Variable Text`
- `Segoe UI Variable Text Light`
- `Segoe UI Variable Text Semibold`
- `Segoe UI Variable Text Semiligh`

Use the families by optical purpose:

- **Display:** slide titles, section dividers, hero statements, and large metrics.
- **Text:** body copy, chart labels, tables, captions, and speaker-facing detail.
- **Small:** compact metadata and labels only when legibility is preserved.

Fallback stack: `Segoe UI Variable`, `Segoe UI`, `Aptos`, `Arial`.

### Serif family: Georgia

Use `Georgia` as the native serif family. Where the environment exposes a variable or expanded family, use `Georgia Pro` or the installed Georgia variable equivalent while preserving the same role. Fallback stack: `Georgia`, `Times New Roman`.

Resolve the available Georgia faces at render time. Use regular, italic, bold, or bold italic only when installed. Never invent a style name that the target environment does not show.

Use Georgia selectively for:

- editorial title slides
- quotations
- human-centred storytelling
- section-opening statements
- short emphasis phrases

Do not mix Segoe and Georgia inside the same sentence. Do not use Georgia for dense tables, chart labels, technical diagrams, or small metadata.

### Type scale

| Role              |     Size | Line spacing | Preferred family |  Weight | Maximum              |
| ----------------- | -------: | -----------: | ---------------- | ------: | -------------------- |
| `hero-title`      | 40–54 pt |    0.95–1.05 | Georgia          | 400–600 | 3 lines              |
| `section-title`   | 34–44 pt |     1.0–1.08 | Georgia          | 400–600 | 3 lines              |
| `slide-title`     | 26–32 pt |    1.05–1.12 | Segoe Display    | 550–650 | 2 lines              |
| `large-number`    | 48–76 pt |      0.9–1.0 | Segoe Display    | 600–700 | 1 line               |
| `large-statement` | 28–38 pt |     1.0–1.12 | Georgia          | 400–600 | 4 lines              |
| `subheading`      | 18–22 pt |      1.1–1.2 | Segoe Text       | 550–650 | 2 lines              |
| `body`            | 16–20 pt |     1.15–1.3 | Segoe Text       |     400 | 6 lines per block    |
| `body-compact`    | 14–16 pt |    1.15–1.25 | Segoe Text       |     400 | Controlled exception |
| `caption`         | 11–13 pt |    1.15–1.25 | Segoe Text/Small | 400–550 | 2 lines              |

Never reduce normal body text below 14 pt to make content fit. Re-plan or split the slide instead. Use sentence case. Avoid all caps except for labels of four words or fewer, with increased character spacing.

## Master Grid

### Content frame

For a standard content slide:

- Canvas: 13.333 × 7.5 in.
- Safe content frame: x = 0.67 to 12.663 in.
- Standard content width: 11.993 in.
- Standard title begins at x = 0.67 in, y = 0.46 in.
- Main content begins at y = 1.52 in.
- Main content ends by y = 7.08 in when no footer is present.
- With a footer (`y = 6.84 to 7.08 in`), main content ends by y = 6.62 in.

The title region must not be used by charts, images, diagrams, or body text unless the selected layout explicitly removes the standard title region.

### Twelve-column grid

Use a 12-column grid with 0.28 in gutters inside the standard content width.

- Usable content width: 11.993 in.
- Total gutter width: 11 × 0.28 = 3.08 in.
- Approximate column width: 0.743 in.

Snap all major content regions to this grid. Small annotations may sit within a column but must align to a major edge.

### Approved column patterns

| Pattern           | Grid span            | Approximate proportion | Use                                           |
| ----------------- | -------------------- | ---------------------: | --------------------------------------------- |
| Full width        | `12`                 |                   100% | Hero visual, chart, table, timeline           |
| Equal halves      | `6 / 6`              |                50 / 50 | Comparison, text and image, before and after  |
| Text-led split    | `5 / 7`              |                42 / 58 | Explanation with a larger visual              |
| Visual-led split  | `7 / 5`              |                58 / 42 | Dominant chart or image with commentary       |
| Narrow-wide       | `4 / 8`              |                33 / 67 | Context column plus primary evidence          |
| Wide-narrow       | `8 / 4`              |                67 / 33 | Main visual plus implications or actions      |
| Equal thirds      | `4 / 4 / 4`          |           33 / 33 / 33 | Three pillars, three metrics, three options   |
| Emphasised centre | `3 / 6 / 3`          |           25 / 50 / 25 | Central recommendation or key metric          |
| Four columns      | `3 / 3 / 3 / 3`      |                25 each | Four steps or compact metric set              |
| Sidebar           | `2 / 10` or `10 / 2` |                17 / 83 | Labels, legend, navigation, or narrow context |

Do not use more than four primary columns on one slide. A slide with five or more peer items must use a different structure, such as a matrix, timeline, table, grouped diagram, or more than one slide.

## Content Density

Default limits per slide:

- One primary message
- One dominant visual
- Three to five supporting points
- Two secondary callouts at most
- Six body-text lines per text block
- Twelve words per ordinary bullet where practical
- Two bullet levels maximum
- Four primary regions maximum

When content exceeds these limits, first simplify, group, visualise, move detail to speaker notes, or split the material across slides. Shrinking fonts is the last resort and may not violate the typography minimums.

## Composition Rules

- Align objects to the 12-column grid or to a clear local alignment system.
- Use one dominant alignment edge per region.
- Keep peer objects the same size unless size encodes importance or quantity.
- Use visual asymmetry deliberately. Balance visual weight rather than centring every element.
- Leave at least 8–12% of the slide as meaningful open space on standard slides.
- Avoid orphan words in titles and large statements where a small width adjustment can balance the line.
- Keep repeated elements in identical positions across slides when they perform the same function.
- Do not repeat the same layout on more than three consecutive slides unless repetition has narrative value.

## Card Style

The one container style of the deck, taken from the cards of the `chiefos` app: its [design tokens](../../chief-os-brief/references/output-html-design.md#design-tokens) and [card anatomy](../../chief-os-brief/references/output-html-design.md#card-anatomy). The slide values below adapt that style to the slide canvas. Where this section is silent, follow the app.

Use a card only where the principles allow it: grouping, containment, or comparison of peer items. The layouts that may use one are L09, L11, L15, L16, L22, L23, and L24. Never nest a card in a card, and never put a card on a dark surface.

### Shape and surface

- A rounded rectangle with `radius-sm`, a `line-hairline` Ink outline at 95% transparency, and a soft outer shadow: Ink at 85% transparency, 6 pt blur, 2 pt down. No gradient.
- **Peer cards** take a pastel. Rotate Sage, Lemon, Lilac, and Sand strictly in that order, in reading order, and start again from Sage on each slide. The four are peers, not status colours.
- **Status cards** (L23) take the `positive`, `warning`, or `critical` role instead of the rotation, with a label and an icon, as the colour rules require.
- A **summary card**, which only supports the slide, such as the context beside a chart, is White with no shadow and no corner marks.
- Peer cards in one row share one height and one top edge.
- Use no colour outside the palette.

### Anatomy

Padding is `space-3` on every side, and the gap between parts is `space-2`. The order is fixed, and a card uses each part that it has content for:

1. **Corner marks.** Four 2 × 2 grids of round Ink dots, 0.03 in wide with 0.03 in gaps, `space-1` from each corner, at 60% transparency. Hide dot 3 at top left, 2 at top right, 1 at bottom left, and 0 at bottom right, in row-major order, which leaves three dots per corner. Group them as one decorative object behind the text, and mark it decorative.
2. **Header.** One or two `caption` lines: a short label such as a category, owner, date, or step number, with an optional 16–20 pt icon before it. Keep each line to one line.
3. **Content.** The title in `subheading`, then the supporting text in `body-compact`, at most four lines. Shorten the text instead of cutting it off.
4. **Footer.** Only when the card concerns a person: the name in `caption` at weight 550 above the role in `caption`. Add a round picture only when a real one is supplied. Never draw an empty avatar.
5. **Next step.** Only when an action is owed: a full-width `line-hairline` rule in Ink at 90% transparency, then a lightbulb icon with the `caption` label `Next step`, then the action in `body-compact` at weight 550. In a row of peer cards, align this part to the bottom of each card.

The toggle of the app has no slide equivalent. Do not add one.

### Text colour

All text on a pastel is Ink. Muted Text is for White cards and Warm Paper only, because it is too faint on a pastel.

### Image card

An image in L05 or L07 takes the card shape with no padding, no marks, and no text: the same radius, outline, and shadow, with the picture cropped to fill it.

### Build

Group each card's surface, marks, and text, and name the group, so that one animation moves them together and Morph can match them.
