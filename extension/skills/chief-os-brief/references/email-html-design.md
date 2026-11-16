# Email HTML Design

Outlook-compatible summary email, built from the current JSON ([rendering rules](output-briefing.md#2-render)).

## Look

Use `chief-os-design`: Palette hex values inline (never `oklch`): Warm Paper page background, Ink text and links, White for the Overview, tasks and message cards without a task. Cards with a task take the pastels, rotated per `chief-os-design`: Card, by item order across email, calendar, chat and recap cards. Mail clients lack alpha, so use the solid Hairline and Muted text colours. `border-radius:6px`; don't nest card surfaces.

## Markup

- Table layout only: `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, `border="0"`. Spacing via cell `padding`, critical styles inline on every element. No margins, grid, flexbox, pseudo-elements, JavaScript, webfonts, SVG, background or data-URL images, gradients, dark surfaces or fixed heights.
- An outer 100% table holds one centred wrapper (`align="center"`, `width="680"`, `style="width:100%; max-width:680px;"`) containing everything, including the hidden preheader and the footer. Nested tables use `width="100%"` only.
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`, repeated inline on every text cell. Declare no base `font-size`; size deviations in `em`: page heading 1.875 (600, lh 1.1), section heading 1.125 (600, lh 1.25), card title 0.875 (600, lh 1.25), metadata 0.75 in Muted text. Body `line-height:1.5`.
- Add `word-break:break-word` to subjects and links, `lang="en"` and a meaningful `<title>`.

## Content

1. Quiet `Daily Assistant` label, greeting and local date.
2. Overview (White, 1px hairline border, no shadow).
3. Tasks (White, compact rows split by hairlines; `[ ]` active, `[x]` completed in the plain-text alternative).
4. Email, Calendar, Teams Chat and Meeting Recaps: a heading then content-height cards. Each card: metadata, subject, summary, author, then a hairline and the `Next step` label with the recommended action.
5. Empty sections show the muted empty state.

Link the subject (Ink, 600, underlined, with an accessible label such as `Open email: <subject>`) only for a verified absolute `https://` URL; otherwise plain text. Don't rely on colour alone for status. The image is never inline; it reaches the reader only as the attachment.
