# Email HTML Design

The design source for the summary email. Every rule is written for email delivery, so the result renders reliably in Outlook and other common mail clients.

Read this file in full before writing any markup, and build the body from it alone rather than from memory or a previous run. The `Verify Before Output` checklist at the end is the gate the email must pass before it is sent.

## Design Tokens

| Token      | Value                            | Use                        |
| ---------- | -------------------------------- | -------------------------- |
| Warm Paper | `rgb(255, 246, 240)` / `#fff6f0` | Message background         |
| Ink        | `rgb(49, 31, 16)` / `#311f10`    | Text and link color        |
| White      | `rgb(255, 255, 255)` / `#ffffff` | Overview and todo surfaces |
| Sage       | `rgb(202, 214, 178)` / `#cad6b2` | Message card surface       |
| Sand       | `rgb(231, 202, 173)` / `#e7caad` | Message card surface       |
| Lemon      | `rgb(250, 225, 157)` / `#fae19d` | Message card surface       |
| Lilac      | `rgb(202, 192, 217)` / `#cac0d9` | Message card surface       |
| Hairline   | `rgb(245, 235, 227)` / `#f5ebe3` | Quiet borders and rules    |

Pastels are peers, not status colors. Rotate them by item order across email, calendar, chat, and meeting recap cards.

## Structure

- Set `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, and `border="0"` on layout tables.
- Put spacing on table cells with inline `padding`. Do not depend on margins, CSS grid, flexbox, columns, pseudo-elements, or JavaScript.
- Put critical visual styles inline on every element. A small reset in `<style>` may improve responsive rendering, but the output must remain readable if it is stripped.
- Use `border-radius:6px`. Do not nest one card surface inside another card surface.
- Use `word-break:break-word` on long subject text and links so mobile layouts do not overflow.

## Layout Width

The body is `680px` wide. This is a hard constraint, not a preference.

- Use one outer presentation table at `width="100%"` for the warm paper page. It carries the page background and page gutter padding only. Never place a heading, card, or any other content directly in it.
- Nest exactly one wrapper table inside it, using `align="center"`, `width="680"`, and `style="width:100%; max-width:680px;"`. Every visible element, including the preheader, greeting, section headings, cards, and footer, sits inside this wrapper.
- Keep the `width="680"` attribute. Outlook on Windows renders through Word, ignores `max-width`, and would otherwise fill the full reading pane.
- Give every table nested inside the wrapper `width="100%"` and no other width. Do not restate `680` further down the tree.
- Do not use `100vw`, percentage widths above `100%`, fixed pixel widths on cells, `min-width`, or a second `max-width` value.

## Typography

The base is the mail client's native font and native default text size. Do not restyle the base; declare only deliberate deviations from it.

- Use the native stack `font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`, repeated inline on every text-bearing cell. Font inheritance into tables is unreliable in Outlook and Gmail.
- Do not use `Inter`, `Inter Variable`, any other webfont, or the `system-ui` keyword. Word-based Outlook does not resolve `system-ui` and falls back to a serif face.
- Do not declare a base `font-size` anywhere, including on `body`, the wrapper table, and body copy cells. Body text inherits the client default and the reader's own text-size preference.
- Size every deviation relative to that inherited base with `em`, never `px`, `pt`, `rem`, `%`, `vw`, `clamp()`, or `!important`:

| Role            | Style                                                  |
| --------------- | ------------------------------------------------------ |
| Body copy       | no `font-size`; `line-height:1.5`                      |
| Page heading    | `font-size:1.875em; font-weight:600; line-height:1.1`  |
| Section heading | `font-size:1.125em; font-weight:600; line-height:1.25` |
| Card title      | `font-size:0.875em; font-weight:600; line-height:1.25` |
| Metadata        | `font-size:0.75em; line-height:1.35; color:#76685e`    |

## Content Layout

1. Render a quiet `Daily Assistant` label, then the greeting and local date.
2. Render Overview on white with a `1px` hairline border and no shadow.
3. Render To Do on white as compact rows separated by hairlines. Use `[ ]` for active and `[x]` for completed tasks in the plain-text alternative.
4. Render Email, Calendar, Teams Chat, and Meeting Recaps as separate headings followed by content-height cards.
5. Rotate Sage, Sand, Lemon, and Lilac across all message cards in source order.
6. Place metadata first, followed by subject, summary, author details, then the recommended action below a hairline rule.
7. When a section is empty, render `No items surfaced in this run.` as muted body copy without a card.

## Links and Accessibility

- Link the subject when a verified absolute `https://` source URL exists. Keep the subject as plain text otherwise.
- Use `color:#311f10`, `font-weight:600`, and `text-decoration:underline` for links so they remain recognizable without brand colors.
- Include descriptive text such as `Open email: <subject>` in the link's accessible label when the mail API preserves accessibility attributes.
- Do not rely on color alone for status, source, or completion.
- Add `lang="en"` to the document root and include a meaningful `<title>`.
- Keep a hidden preheader at the start of the body, but do not hide meaningful briefing content.

## Compatibility Constraints

- Do not embed a client-side application, framework runtime, or script payload.
- Do not use external fonts, remote stylesheets, SVG, background images, data URLs, video, forms, or animated content.
- Do not use CSS gradients or dark surfaces.
- Do not use fixed heights for cards or rows.
- Do not include generated imagery inline. The artifact image reaches the reader only as the verified mail attachment.

## Verify Before Output

Check the generated HTML against each item against the actual markup, and repair it before sending. Do not send output that fails a check.

- Exactly one element carries both `max-width:680px` and `width="680"`, all visible content sits inside it, and no nested table declares a width other than `width="100%"`.
- Every layout table carries `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, and `border="0"`, and all spacing comes from inline cell `padding`.
- No `font-family` mentions `Inter`, `system-ui`, or any webfont, and every text-bearing cell repeats the native stack inline.
- No body copy declares a `font-size`, and no `font-size` uses `px`, `pt`, `rem`, `%`, `vw`, or `clamp()`.
- Every colour resolves to one of the eight design tokens, and message cards rotate Sage, Sand, Lemon, and Lilac in source order with no pastel signalling status.
- Sections appear in order: Overview, To Do, Email, Calendar, Teams Chat, Meeting Recaps. Item wording and source order are preserved, absent fields are omitted, and every empty section renders `No items surfaced in this run.` with no card.
- Every linked subject uses a verified absolute `https://` URL styled `color:#311f10; font-weight:600; text-decoration:underline`. Unlinked subjects are plain text, and no state is conveyed by colour alone.
- The root carries `lang="en"`, the document has a meaningful `<title>`, and a hidden preheader opens the body.
- No script, webfont, remote stylesheet, SVG, background image, data URL, video, form, animation, gradient, dark surface, fixed height, or inlined imagery appears anywhere.
