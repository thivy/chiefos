# Output HTML Design

The design source for `briefing.html`, per `output-briefing.md`. It is the Daily Briefing visual language, so every rule below assumes a browser and the full design system.

Write the result as one standalone document with a single `<style>` block. Do not depend on Tailwind, a build step, a framework runtime, or any remote asset.

## Design Tokens

Declare these on `:root`. The `oklch` value is the source of truth; the hex is the fallback for older engines.

| Token      | Custom property | `oklch`                      | Hex fallback | Use                                 |
| ---------- | --------------- | ---------------------------- | ------------ | ----------------------------------- |
| Warm Paper | `--background`  | `oklch(0.978 0.013 56.256)`  | `#fff6f0`    | Page background                     |
| Ink        | `--foreground`  | `oklch(0.258 0.038 59.8)`    | `#311f10`    | All text, icon strokes, corner dots |
| White      | `--card`        | `oklch(1 0 0)`               | `#ffffff`    | Overview and Tasks card surfaces    |
| Sage       | `--card-sage`   | `oklch(0.857 0.05 122.449)`  | `#cad6b2`    | Message card surface                |
| Lemon      | `--card-lemon`  | `oklch(0.915 0.09 90.159)`   | `#fae19d`    | Message card surface                |
| Lilac      | `--card-lilac`  | `oklch(0.824 0.036 303.716)` | `#cac0d9`    | Message card surface                |
| Sand       | `--card-sand`   | `oklch(0.856 0.051 67.059)`  | `#e7caad`    | Message card surface                |
| Sky        | `--card-sky`    | `oklch(0.858 0.045 237.412)` | none         | Reserved, outside the rotation      |
| Blush      | `--card-blush`  | `oklch(0.853 0.047 17.284)`  | none         | Reserved, outside the rotation      |
| Focus ring | `--ring`        | `oklch(0.705 0.015 286.067)` | `#b0aeb6`    | Keyboard focus only                 |
| Avatar     | `--avatar`      | `oklch(0.987 0.022 95.277)`  | `#fffbeb`    | Empty avatar circle                 |

Derive every tint from Ink with an alpha, never a separate grey:

| Derived     | Value                                                     | Use                 |
| ----------- | --------------------------------------------------------- | ------------------- |
| Card border | `color-mix(in oklch, var(--foreground) 5%, transparent)`  | Card outline        |
| Hairline    | `color-mix(in oklch, var(--foreground) 10%, transparent)` | Rule above Action   |
| Muted text  | `color-mix(in oklch, var(--foreground) 60%, transparent)` | Captions, metadata  |
| Title text  | `color-mix(in oklch, var(--foreground) 70%, transparent)` | Card titles         |
| Done text   | `color-mix(in oklch, var(--foreground) 40%, transparent)` | Completed task icon |

Radius comes from one root value: `--radius: 0.625rem`. Cards and links use `calc(var(--radius) * 0.6)`, which is `0.375rem`. Nothing else sets a radius except the fully round avatar, corner dots, and task icons.

Sage, Lemon, Lilac, and Sand are peers, not status colours. Rotate them strictly by item index across the combined message list, in that order. Sky and Blush exist as tokens but stay out of the rotation.

## Typography

Set `font-family: "Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` once on `body` and let it inherit. Inter is the intended face; the stack degrades cleanly when it is not installed. Do not load a remote font stylesheet.

Page base is `line-height: 1.5rem`. The scale below is the resolved output of the artifact's fluid type, so use these values directly:

| Role         | Size                            | Line height | Weight | Tracking   | Colour     |
| ------------ | ------------------------------- | ----------- | ------ | ---------- | ---------- |
| `display-lg` | `clamp(1.875rem, 5vw, 3rem)`    | `1.08`      | `600`  | `-0.05em`  | Ink        |
| `display-md` | `clamp(1.25rem, 4vw, 1.875rem)` | `1.1`       | `600`  | `-0.025em` | Ink        |
| `display-sm` | `clamp(1.125rem, 3vw, 1.25rem)` | `1.15`      | `550`  | `-0.025em` | Ink        |
| `display-xs` | `0.875rem`                      | `1.2`       | `550`  | `0`        | Ink        |
| `content`    | `1rem`                          | inherit     | `400`  | `0`        | Ink        |
| `caption`    | `0.875rem`                      | `1.2`       | `550`  | `0`        | Muted text |
| `card-title` | `0.875rem`                      | `1.2`       | `600`  | `0`        | Title text |

`display-xs`, `content`, `caption`, and `card-title` are fixed sizes. In the artifact they are written as clamps that collapse to a single value, so do not reintroduce a fluid range for them. Only the three `display` sizes above `xs` actually scale.

Apply `text-wrap: balance` to every `display` role and to card content, and `text-wrap: pretty` to task labels.

Semantic elements, matching the artifact: `display-lg`, `display-md`, and `display-sm` render as `h1`; `display-xs` as `span`; `content` and `card-title` as `div`; `caption` as `p`. Use one real `h1` per document and demote the rest to styled `div` elements so the outline stays honest.

## Layout

- Page wrapper: `margin-inline: auto`, `max-width: 64rem`, `padding-inline: 1rem`, dropping to `0` at `64rem` and above.
- Greeting block: `padding-block: 1.5rem`, plain heading, no card.
- Headline block: `padding-block: 2rem`, `display-lg`, reading `<person_name>, here's a clear, focused snapshot for <date>.`
- Summary row: CSS grid, `gap: 1rem`, one column by default, two columns from `40rem`, eight columns from `64rem`. Overview card spans five columns, Tasks card spans three.
- Message cards: CSS multi-column with `column-width: 24rem` and `column-gap: 1rem`. Give every card `margin-bottom: 1rem` and `break-inside: avoid`.

Card spacing uses two fluid values, both taken from the artifact:

- Padding: `clamp(1rem, 3vw, 1.5rem)` inline, `clamp(1.5rem, 4vw, 2.25rem)` block.
- Gap between card sections: `clamp(1rem, 3vw, 1.5rem)`.

## Card Anatomy

Every card is `position: relative`, a flex column, with the card border, `border-radius: 0.375rem`, and a soft shadow. The Overview card drops the shadow; the Tasks card sits on White at 60% opacity; message cards take their rotated pastel.

Order inside a card is fixed:

1. **Corner marks.** A `pointer-events: none` overlay at `opacity: 0.4` covering the card. It holds four 2x2 dot grids inset `0.5rem` from each corner. Each dot is `0.125rem`, fully round, filled with Ink, with `0.125rem` between dots. In each grid, hide the dot nearest that corner so the three visible dots form an L pointing away from it. Hide the index `3` dot at top left, `2` at top right, `1` at bottom left, and `0` at bottom right, counting row-major from the top left.
2. **Header.** Source metadata on one row: an icon at `opacity: 0.6`, then a `caption` label, then a `caption` timestamp pushed to the far end. Gap is `0.375rem`, and the metadata row grows to fill the header.
3. **Content.** A flex column with `gap: 0.5rem`. `card-title` carries the subject, followed by the summary as body copy.
4. **Footer.** The avatar, a `2.25rem` round circle filled with the avatar token, then the author name as `display-xs` above the author role as `caption`. Omit the footer when neither name nor role is known.
5. **Action.** Only when a recommended action exists. A full-width hairline rule, then a lightbulb icon, the label `Action`, and the action text at `0.875rem`.

## Tasks

Each task is a row with `align-items: flex-start` and `gap: 0.5rem`.

- Leading icon is `1rem`, round, and coloured Muted text. Use the source icon for an active task, the circle icon when the task has no usable source, and the check-circle icon when completed. A completed icon shifts to Done text.
- Label fills the remaining width at `0.875rem` with `text-wrap: pretty`. A completed label takes `text-decoration: line-through` and `opacity: 0.5`.
- Trim the label's leading half-line with `text-box-trim: trim-start` and `text-box-edge: cap alphabetic` so the first line sits level with the icon. Treat this as progressive enhancement; the row must still read correctly without it.

## Icons

Draw every icon as inline SVG in the Lucide style: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, rendered at `1rem`. Icons inherit colour from their container, so never hard-code a stroke value.

| Context            | Icon            |
| ------------------ | --------------- |
| Email item         | Mail            |
| Chat item          | Message circle  |
| Calendar item      | Calendar        |
| Meeting recap item | Video           |
| Overview header    | Pencil sparkles |
| Tasks header       | List todo       |
| Recommended action | Lightbulb       |
| Completed task     | Circle check    |
| Sourceless task    | Circle          |

## Links and Accessibility

- When an item has a verified absolute `https://` URL, wrap the whole card or the whole task row in an anchor with `target="_blank"` and `rel="noopener noreferrer"`. Render the anchor as `display: block`, `color: inherit`, `text-decoration: none`, with the card radius.
- Give that anchor a visible keyboard focus state only: a `2px` focus ring in the ring colour with a `2px` offset, applied through `:focus-visible`, never on hover or mouse focus.
- Render the subject as plain text when no verified URL exists. Never invent one.
- Do not rely on colour alone for source, status, or completion. The icon and the label always carry the meaning.
- Set `lang="en"` on the root and give the document a meaningful `<title>`.
- Include `scroll-behavior: smooth` on `html`, wrapped so it becomes `auto` under `prefers-reduced-motion: reduce`.

## Constraints

- No Tailwind, no framework runtime, no build step, no script payload, and no embedded briefing JSON.
- No remote stylesheets, remote fonts, tracking pixels, iframes, forms, or video.
- No dark surfaces, gradients, or fixed card heights. Cards grow to fit their content.
- No inline image data. The artifact image is delivered only as the mail attachment described in step 8 of `SKILL.md`.
- Escape `&`, `<`, and `>` in every value taken from the briefing, and `"` in every attribute value, before it reaches the markup.

## Verify Before Output

Check the generated file against every item and repair it before reporting success.

- The document is standalone: one `<style>` block, no remote asset, no script.
- Every colour resolves from a `:root` custom property. No literal hex appears outside that `:root` block.
- Message cards cycle Sage, Lemon, Lilac, Sand strictly by index, with no colour used to signal status.
- Only the three `display` roles above `xs` use `clamp()`. No collapsed or inverted clamp survives.
- Every card carries its corner overlay, with exactly three visible dots per corner.
- Every item with a verified URL is wrapped in an anchor carrying `rel="noopener noreferrer"`, and every focus ring is `:focus-visible` only.
- Empty collections render the empty state rather than an empty card or a dropped section.
- No unresolved placeholder text remains.
