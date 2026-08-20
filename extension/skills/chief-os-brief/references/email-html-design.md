# HTML Email Design

Use this reference to translate the Daily Briefing visual language into HTML that renders reliably in Outlook and other common mail clients.

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

## Email-Safe Structure

- Set `role="presentation"`, `cellpadding="0"`, `cellspacing="0"`, and `border="0"` on layout tables.
- Put spacing on table cells with inline `padding`. Do not depend on margins, CSS grid, flexbox, columns, pseudo-elements, or JavaScript.
- Put critical visual styles inline on every element. A small reset in `<style>` may improve responsive rendering, but the message must remain readable if the client removes it.
- Use `border-radius:6px`. Do not nest one card surface inside another card surface.
- Use `word-break:break-word` on long subject text and links so mobile layouts do not overflow.

## Required HTML Document

Generate one raw HTML string that follows this shell exactly. Replace each `{{..._ROWS}}` marker with complete `<tr>...</tr>` rows inside the wrapper table; do not leave any marker in the result. Do not wrap the document in a Markdown code fence or HTML-escape its tags.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{RUN_LABEL}} | {{LOCAL_DATE}}</title>
    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#fff6f0;">
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="width:100%; background-color:#fff6f0;"
    >
      <tr>
        <td align="center" style="padding:24px 12px; background-color:#fff6f0;">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            align="center"
            width="680"
            style="width:100%; max-width:680px;"
          >
            <tr>
              <td
                style="display:none; overflow:hidden; mso-hide:all; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#311f10;"
              >
                {{PREHEADER}}
              </td>
            </tr>
            {{HEADER_ROWS}} {{OVERVIEW_ROWS}} {{TODO_ROWS}} {{EMAIL_ROWS}} {{CALENDAR_ROWS}}
            {{CHAT_ROWS}} {{RECAP_ROWS}} {{FOOTER_ROWS}}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

The shell is structural, not optional guidance:

- Keep the doctype, `html`, `head`, `body`, outer table, and one wrapper table.
- Put `Daily Assistant`, the greeting, and the local date in `HEADER_ROWS`; use separate table rows and cells for the label, page heading, and date.
- Put each section heading, card, todo row, and empty state in its own wrapper-table row. Use nested presentation tables only when a section needs multiple aligned rows, and give each nested table `width="100%"`.
- Put the quiet footer in `FOOTER_ROWS`. Do not add visible content before the outer table or after it.
- HTML-encode dynamic text values before inserting them. Preserve verified absolute `https://` URLs only in `href` attributes; never treat source text as markup.

## Layout Width

The message body is `680px` wide. This is a hard constraint, not a preference.

- Use one outer presentation table at `width="100%"` for the warm paper page. It carries the page background and page gutter padding only. Never place a heading, card, or any other message content directly in it.
- Nest exactly one wrapper table inside it, using `align="center"`, `width="680"`, and `style="width:100%; max-width:680px;"`. Every visible element, including the preheader, greeting, section headings, cards, and footer, sits inside this wrapper.
- Keep the `width="680"` attribute. Outlook on Windows renders through Word, ignores `max-width`, and would otherwise fill the full reading pane.
- Give every table nested inside the wrapper `width="100%"` and no other width. Do not restate `680` further down the tree.
- Do not use `100vw`, percentage widths above `100%`, fixed pixel widths on cells, `min-width`, or a second `max-width` value.

## Typography

The base is the mail client's native font and native default text size. Do not restyle the base; declare only deliberate deviations from it.

- Use the native stack `font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`, repeated inline on every text-bearing cell. Font inheritance into tables is unreliable in Outlook and Gmail.
- Do not use `Inter`, any other webfont, or the `system-ui` keyword. Word-based Outlook does not resolve `system-ui` and falls back to a serif face.
- Do not declare a base `font-size` anywhere, including on `body`, the wrapper table, and body copy cells. Body text inherits the client default and the reader's own text-size preference.
- Size every deviation relative to that inherited base with `em`:

| Role            | Style                                                  |
| --------------- | ------------------------------------------------------ |
| Body copy       | no `font-size`; `line-height:1.5`                      |
| Page heading    | `font-size:1.875em; font-weight:600; line-height:1.1`  |
| Section heading | `font-size:1.125em; font-weight:600; line-height:1.25` |
| Card title      | `font-size:0.875em; font-weight:600; line-height:1.25` |
| Metadata        | `font-size:0.75em; line-height:1.35; color:#76685e`    |

- Do not size text with `px`, `pt`, `rem`, `%`, `vw`, `clamp()`, or `!important`, and do not scale text from viewport width.
- Do not carry the canvas artifact's fluid `clamp()` type scale or its `Inter Variable` face into email. Those are canvas-only.

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

- Do not embed the artifact canvas application or its script payload.
- Do not use external fonts, remote stylesheets, SVG, background images, data URLs, video, forms, or animated content.
- Do not use CSS gradients or dark surfaces.
- Do not use fixed heights for cards or rows.
- Do not include generated imagery unless it is embedded through a separately approved and verified mail-safe attachment workflow.

## Verify Before Sending

Check the generated HTML against every item below and repair it before the send. Do not send output that fails a check.

- The outgoing body content type is `HTML`, and its content is the same raw string checked below.
- The raw string starts with `<!doctype html>`, contains one complete `html`, `head`, and `body`, and is not Markdown-fenced, tag-escaped, JSON-stringified, or prefixed with explanatory text.
- No `{{...}}` marker remains, and every opening layout table has a matching closing tag.
- Exactly one element carries `max-width:680px`, and that same element carries `width="680"`.
- No visible content sits outside that wrapper, and no nested table declares a width other than `width="100%"`.
- No `font-family` value mentions `Inter`, `system-ui`, or any webfont.
- Every text-bearing cell repeats the native font stack inline.
- No `font-size` uses `px`, `pt`, `rem`, `%`, `vw`, or `clamp()`, and no body copy declares a `font-size` at all.
