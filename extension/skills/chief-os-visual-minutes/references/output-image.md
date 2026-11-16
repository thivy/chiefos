# Visual Minutes Image

Compose one prompt per item through `chief-os-image-prompt`, assemble them into a single prompt, then generate `visual-minutes.png`. Run this only once both collections are final.

## 1. Prepare the Content

Use the final collections and rendered fields from [meeting-capture.md](meeting-capture.md), unchanged and in order. Add the **meeting line**: the meeting subject followed by its local date. Context is never rendered.

Omit an empty band's label and space. If both collections are empty, stop without generating. If the content can't fit one legible page, report the full breakdown and the overflow in chat; don't omit items, split files or deliver an old image.

## 2. Compose One Prompt per Item

One `chief-os-image-prompt` call per item, key moments first, then actions, as its Illustrated Page section sets, passing the Rendered fields as the text whitelist and context as non-rendering material. Add one instruction per section so the bands read apart:

- **Key moment:** a vignette taller than wide, its object caught mid-event. Below the art: marker, heading, display label, summary note, in that order.
- **Follow-up action:** a compact, roughly square vignette, its object poised or about to move so the action reads as still owed. No marker.

## 3. Assemble the Final Prompt

Use the Page, Section labels, illustration and Composition blocks below, with the shared blocks from Illustrated Page placed after Page, filled as follows:

- `{SCRIPT_TEXT}`: the meeting line, section labels and vignette headings. `{SANS_TEXT}`: markers, display labels and summary notes.
- `{LARGE_SIZE}`: the meeting line and section labels share one larger size. `{ACCENT_TEXT}`: the meeting line.
- `{EXTRA_DECORATION}`: `, timeline rails, connecting lines, ticks, or dots as layout decorations`. `{BAND_RULE}`: empty.
- `{OUTSIDE_TEXT}`: `Only the meeting line and present section labels appear`.
- `{MEETING_LINE}` is used verbatim; `{KEY_MOMENT_PROMPTS}` and `{FOLLOW_UP_PROMPTS}` are the returned prompts in order, separated by blank lines.

```
**Page**

16:9 horizontal, Everyday Doodle on warm ivory. Top to bottom: meeting line, `Meeting recap` and its moments, then `Next steps` and its actions. Omit a band's label and space when it has no items.

[shared blocks from Illustrated Page]

**Section labels**

Spell labels exactly `Meeting recap` and `Next steps`. Each present label sits alone on a full-width row, aligned to the grid's left edge. Leave equal, empty ivory bands above and below, each taller than the label.

**Key moment illustrations**

- One vignette per supplied moment. Use one row for 1 to 4 moments; two rows for 5 to 8, with the column count rounded up from half the moment count; beyond 8, add rows with at most four columns. Equal-width cells, aligned columns, trailing cells left empty for odd counts.
- Read left to right, then top to bottom, in timeline order. Never add filler or discard a moment to balance rows.
- Art sits above its text. Directly below, in clear ivory: marker, heading, display label, summary note. Each moment stands visually alone in its own ivory space.

**Next step illustrations**

One compact vignette per action in source order, without markers. One row for up to four actions; wrap more into rows of at most four. Align band edges and, when counts permit, columns with the moments above. Leave unused cells empty.

**Composition**

Meeting: {MEETING_LINE}

Meeting recap:

{KEY_MOMENT_PROMPTS}

Next steps:

{FOLLOW_UP_PROMPTS}
```

## 4. Generate

Generate `visual-minutes.png` as the Illustrated Page section of `chief-os-image-prompt` sets.
