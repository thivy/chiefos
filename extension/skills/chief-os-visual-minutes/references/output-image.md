# Visual Minutes Image

Compose one prompt per item through `chief-os-image-prompt`, assemble them into a single combined prompt, then generate `visual-minutes.png`. Run this only once both collections are final.

## 1. Prepare the Content

Use the final collections and rendered fields from [meeting-capture.md](meeting-capture.md), unchanged and in order. Add the **meeting line**: the meeting subject followed by its local date. Context is never rendered.

Omit an empty band's label and space. If both collections are empty, stop without generating. If the complete content cannot fit one legible page using the layout below, report the full breakdown and overflow in chat; do not omit items, split files, or deliver an old image.

## 2. Compose One Prompt per Item

Make one `chief-os-image-prompt` call per item, key moments first, then actions. Pass all fields marked Rendered in the capture tables as the text whitelist, and context as non-rendering material. Pass previously chosen objects and character descriptions as exclusions so the composer creates distinct, coherent interactions.

Give every call this shared style:

- `Everyday Doodle` on warm ivory, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Heading in a warm-black handwritten script; marker, display label, and summary note in a warm-black sans at regular weight, all at the same size.
- Every line sits in clear ivory beside or below the art, with a margin around it. Text and art never cross.
- Render only the whitelisted fields. Use no abstract corporate or stock imagery.

Then one instruction per section, which is what makes the two bands read apart at a glance:

- **Key moment** — a vignette taller than it is wide, its object caught mid-event so it reads as something that happened. Below the art sit the marker, heading, display label, and summary note, in that order.
- **Follow-up action** — a compact, roughly square vignette, its everyday object poised, packed, queued, or about to move so the action reads as still owed. No marker.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## 3. Assemble the Final Prompt

The final prompt is the block below with three substitutions:

- `{MEETING_LINE}` is the meeting line, used verbatim and never reformatted.
- `{KEY_MOMENT_PROMPTS}` is every key moment prompt returned in stage 2, in timeline order, separated by blank lines.
- `{FOLLOW_UP_PROMPTS}` is every follow-up action prompt returned in stage 2, in source order, separated by blank lines.

Insert only returned prompt text, verbatim: no summaries, edits, omissions, or back-references. Omit empty sections and their labels. Nothing outside the block reaches the image.

```
**Page**

16:9 horizontal, Everyday Doodle on warm ivory. Top to bottom: meeting line, `Meeting recap` and its moments, then `Follow-up action` and its actions. Omit a band's label and space when it has no items.

Separate page regions with clear ivory only: no frames, borders, separators, timeline rails, connecting lines, ticks, or dots as layout decorations. Illustration details, including dot eyes and object markings, remain allowed.

**Typography**

- Two typefaces: one legible handwritten script for the meeting line, section labels, and vignette headings; one regular-weight humanist or grotesque sans, such as Inter, Helvetica Neue, or Univers, for markers, display labels, and summary notes.
- Two sizes: meeting line and section labels share one larger size; all vignette text shares one smaller size, including headings.
- Only the meeting line uses a warm accent colour from the characters' clothing palette. All other text is warm-black.

**Section labels**

Spell labels exactly `Meeting recap` and `Follow-up action`. Each present label sits alone on a full-width row, aligned to the grid's left edge. Leave equal, empty ivory bands above and below, each taller than the label.

**Key moment illustrations**

- One vignette per supplied moment. Use one row for 1 to 4 moments; two rows for 5 to 8, with the column count rounded up from half the moment count; beyond 8, add rows with at most four columns. Use equal-width cells, align columns, and leave trailing cells empty for odd counts.
- Read left to right, then top to bottom, in timeline order. Never add filler or discard a moment to balance rows.
- In each cell the art sits above its text. Directly below the art, in clear ivory, sit the marker, then the heading, then the display label, then the summary note.
- Each moment stands visually alone in its own ivory space.

**Follow-up action illustrations**

One compact vignette per action in source order, without markers. Use one row for up to four actions; wrap additional actions into rows of at most four. Align band edges and, when counts permit, columns with the moments above. Leave unused cells empty.

**Space**

Generous, even ivory gutters: at least one display-label line of clear ivory between neighbouring vignettes. Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Text**

Only the meeting line and present section labels appear outside vignettes. Render the supplied fields verbatim, including recorded owners and dates. No extra greeting, attendee list, overview, item count, placeholder, or instruction text appears.

**Composition**

Meeting: {MEETING_LINE}

Meeting recap:

{KEY_MOMENT_PROMPTS}

Follow-up action:

{FOLLOW_UP_PROMPTS}
```

## 4. Generate

Generate from the combined prompt and replace `visual-minutes.png`. Confirm the current generation produced a non-empty PNG at that path before reporting success. On generation or save failure, report the error without presenting an older file as this run's output.
