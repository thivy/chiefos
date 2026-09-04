# Visual Minutes Image

Compose one prompt per item through `chief-os-image-prompt`, assemble them into a single combined prompt, then generate `visual-minutes.png`. Run this only once both collections are final.

## 1. Prepare the Content

Take the two collections built in `meeting-capture.md`, key moments in timeline order and follow-up actions in source order, each item keeping the fields already prepared on it.

Prepare one further line:

- **Meeting line** — the meeting subject followed by its local date. Rendered once, above everything else.

The image carries nothing beyond the meeting line, the two section labels, and the items themselves.

## 2. Compose One Prompt per Item

Make one `chief-os-image-prompt` call per item: every key moment first in timeline order, then every follow-up action in source order. Pass the item's heading as the heading, its display label and summary note as the only text to render along with a key moment's marker, and its context as non-rendering material.

Give every call this shared style:

- `Everyday Doodle` on warm ivory, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Heading in a warm-black handwritten script; marker, display label, and summary note in a warm-black sans at regular weight, all at the same size.
- Every line sits in clear ivory beside or below the art, with a margin around it. Text and art never cross.
- Render no text beyond the marker, display label, and summary note, and use no abstract corporate or stock imagery.

Then one instruction per section, which is what makes the two bands read apart at a glance:

- **Key moment** — a vignette sized for one cell of an even grid, taller than it is wide, its everyday object caught mid-event so the moment reads as something that already happened. Directly below the art, in clear ivory, sit the marker, then the heading, then the display label, then the summary note.
- **Follow-up action** — a compact, roughly square vignette, its everyday object poised, packed, queued, or about to move so the action reads as still owed. No marker.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## 3. Assemble the Final Prompt

The final prompt is the block below with three substitutions:

- `{MEETING_LINE}` is the meeting line, used verbatim and never reformatted.
- `{KEY_MOMENT_PROMPTS}` is every key moment prompt returned in stage 2, in timeline order, separated by blank lines.
- `{FOLLOW_UP_PROMPTS}` is every follow-up action prompt returned in stage 2, in source order, separated by blank lines.

Substitute verbatim. Never summarise, condense, merge, reword, or drop a prompt, and never back-reference one with "same as above" or an ellipsis. The only permitted edit is de-duplication: where two vignettes independently picked the same everyday object or character, vary one and leave every other detail intact. Where a section is empty, drop its label with it. Nothing outside the block reaches the image.

```
**Page**

16:9 horizontal, Everyday Doodle style on warm ivory. One continuous page running top to bottom in this order: the meeting line, the `Meeting recap` label, the key moment illustrations, the `Follow-up action` label, the follow-up action illustrations.

Everything on the page is separated by clear ivory alone. No rule, frame, border, separator, timeline rail, connecting line, tick, or dot appears anywhere.

**Typography**

- Two typefaces only. Every heading, meaning the meeting line, the two section labels, and each vignette's heading, is one warm and legible handwritten script, the same hand throughout. Every marker, display label, and summary note is one humanist or grotesque sans such as Inter, Helvetica Neue, or Univers at regular weight.
- Two type sizes only. The meeting line, `Meeting recap`, and `Follow-up action` share one identical size. All vignette text shares one smaller size, so a vignette heading is never larger than the label or note beneath it.
- The meeting line is the only coloured text, set in a warm accent colour taken from the same palette used on the characters' clothing. Every other word on the page is warm-black ink.

**Section labels**

`Meeting recap` and `Follow-up action` are written on the page exactly as spelled here. Each sits alone on its own full-width row, aligned to the same left edge of the column grid, with a band of clear ivory directly above it and an equal band directly below, both taller than the label itself, so the label floats between the block above and the illustrations beneath. Both bands are vertical space and stay empty.

**Key moment illustrations**

- An even number of moments, at least six, split into two rows of equal length with one vignette per moment. Every cell is the same width and the columns line up exactly between the two rows.
- Timeline order reads left to right along the upper row, then left to right along the lower row.
- In each cell the art sits above its text. Directly below the art, in clear ivory, sit the marker, then the heading, then the display label, then the summary note.
- Each moment stands visually alone in its own ivory space.

**Follow-up action illustrations**

A single row of compact vignettes, one per action, left to right in source order, evenly spaced and sharing the column grid above, with no markers.

**Space**

Generous, even ivory gutters: at least one display-label line of clear ivory between neighbouring vignettes. Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Text**

The meeting line is the only text above the `Meeting recap` label, and the two section labels are the only text outside the vignettes. No greeting, name, attendee list, overview, item count, placeholder name, or instruction text appears.

**Composition**

Meeting: {MEETING_LINE}

Meeting recap:

{KEY_MOMENT_PROMPTS}

Follow-up action:

{FOLLOW_UP_PROMPTS}
```

## 4. Generate and Validate

Generate from the combined prompt and save as `visual-minutes.png`, replacing any existing file. `chief-os-image-prompt` returns prompts only; generation, saving, and these checks belong here. Regenerate whenever a check fails.

- The `chief-os-image-prompt` call count equals the total number of items, and the image holds one vignette per item.
- The file exists, is non-empty, and is a readable 16:9 PNG in the `Everyday Doodle` style on warm ivory.
- The page runs top to bottom: meeting line, `Meeting recap`, key moment illustrations, `Follow-up action`, follow-up action illustrations. No vignette from one section sits inside the other.
- Key moments are an even count of at least six, split into two rows of equal length with the columns aligned, reading left to right along the upper row then the lower row, each with its marker and text directly below its art. Follow-ups sit in a single row beneath, with no markers.
- Each section label has a band of clear ivory directly above it and an equal band directly below, both taller than the label itself.
- No rule, frame, rail, tick, dot, or connecting line appears anywhere. Any of these is a failed check.
- The meeting line resolves its placeholder and is the only text above the `Meeting recap` label. The two section labels are the only other text outside the vignettes.
- Each vignette renders its heading, its 4-to-6-word display label, and its one-line summary note, plus a marker on key moments. Nothing else from the item is rendered.
- One handwritten hand carries every heading and one sans carries every marker, display label, and summary note, with no third typeface. The meeting line, `Meeting recap`, and `Follow-up action` are one identical size, and all vignette text one smaller size. Any visible size difference between the three page headings is a failed check. The meeting line is the only coloured text.
- No everyday object and no character repeats across vignettes.
- No text overlaps art or other text, every summary note stays legible, vignettes are evenly spaced, and no instruction text or placeholder name appears in the image.
