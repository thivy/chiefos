# Email HTML Design

Outlook-compatible design for the summary email. Read this file in full and the [shared rendering rules](output-briefing.md#2-render); build from the current JSON, not a previous run.

## Design Tokens

Apply the `chief-os-design` skill: Palette, and its hex values as inline hex values. Never use `oklch`. Warm Paper is the message background, Ink is for text and links, and White is for the Overview, the task surfaces, and the message cards without a task. Message cards with a task take the pastels.

Mail clients do not support alpha, so use the solid Hairline for quiet borders and rules, and the solid Muted text for metadata and empty states, as the Tints of that Palette set.

Apply the `chief-os-design` skill: Card for the rotation of the pastels, by item order across email, calendar, chat, and meeting recap cards.

## Structure

- Set `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, and `border="0"` on layout tables.
- Put spacing on table cells with inline `padding`. Do not depend on margins, CSS grid, flexbox, columns, pseudo-elements, or JavaScript.
- Put critical visual styles inline on every element. A small reset in `<style>` may improve responsive rendering, but the output must remain readable if it is stripped.
- Use `border-radius:6px`. Do not nest one card surface inside another card surface.
- Use `word-break:break-word` on long subject text and links so mobile layouts do not overflow.

## Layout Width

- Outer presentation table: `width="100%"`, warm paper background and page gutter padding only, no direct content.
- Exactly one centred wrapper: `align="center"`, `width="680"`, `style="width:100%; max-width:680px;"`. All content, including preheader and footer, belongs inside it. Keep the width attribute for Word-based Outlook, which ignores `max-width`.
- Every nested table uses `width="100%"` only; never repeat `680` below the wrapper.
- Do not use `100vw`, percentage widths above `100%`, fixed pixel widths on cells, `min-width`, or a second `max-width` value.

## Typography

Preserve the mail client's default text size and the reader's size preference.

- Repeat `font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` inline on every text-bearing cell; table inheritance is unreliable.
- No Inter, webfonts, or `system-ui`, which Word-based Outlook may render as serif.
- Declare no base `font-size` on `body`, wrapper, or body copy cells.
- Size every deviation relative to that inherited base with `em`, never `px`, `pt`, `rem`, `%`, `vw`, `clamp()`, or `!important`:

| Role            | Style                                                   |
| --------------- | ------------------------------------------------------- |
| Body copy       | no `font-size`; `line-height:1.5`                       |
| Page heading    | `font-size:1.875em; font-weight:600; line-height:1.1`   |
| Section heading | `font-size:1.125em; font-weight:600; line-height:1.25`  |
| Card title      | `font-size:0.875em; font-weight:600; line-height:1.25`  |
| Metadata        | `font-size:0.75em; line-height:1.35`, Muted text colour |

## Content Layout

1. Render a quiet `Daily Assistant` label, then the greeting and local date.
2. Render Overview on white with a `1px` hairline border and no shadow.
3. Render Tasks on white as compact rows separated by hairlines. Use `[ ]` for active and `[x]` for completed tasks in the plain-text alternative.
4. Render Email, Calendar, Teams Chat, and Meeting Recaps as separate headings followed by content-height cards.
5. Colour the message cards in source order, as the Card rotation above sets.
6. Place metadata first, followed by subject, summary, author details, then the `Next step` label and the recommended action below a hairline rule.
7. Show the [empty state](output-briefing.md#2-render) as muted body copy when a section is empty.

## Links and Accessibility

- Link the subject when a verified absolute `https://` source URL exists. Keep the subject as plain text otherwise.
- Use the Ink colour, `font-weight:600`, and `text-decoration:underline` for links so they remain recognisable without brand colours.
- Include descriptive text such as `Open email: <subject>` in the link's accessible label when the mail API preserves accessibility attributes.
- Do not rely on colour alone for status, source, or completion.
- Add `lang="en"` to the document root and include a meaningful `<title>`.
- Put the hidden preheader before the main content inside the wrapper; never hide meaningful briefing content.

## Compatibility Constraints

- Do not embed a client-side application, framework runtime, or script payload.
- Do not use external fonts, remote stylesheets, SVG, background images, data URLs, video, forms, or animated content.
- Do not use CSS gradients or dark surfaces.
- Do not use fixed heights for cards or rows.
- Do not include generated imagery inline. The artifact image reaches the reader only as the verified mail attachment.
