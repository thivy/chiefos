# Visual Minutes Image

Compose one prompt per item through `chief-os-image-prompt`, assemble them into a single combined prompt, then generate `visual-minutes.png`. Run this only once both collections are final.

## 1. Prepare the Content

Take only the two collections built in `meeting-capture.md`, key moments in timeline order and follow-up actions in source order. Each item keeps the fields already prepared on it.

Prepare one further line:

- **Meeting line** — the meeting subject followed by its local date. Rendered once, above everything else.

Beyond the meeting line, the two band labels, and the items themselves, the image carries nothing. No greeting, name, attendee list, overview, or item count appears anywhere in it.

## 2. Compose One Prompt per Item

Make one `chief-os-image-prompt` call per item: every key moment first in timeline order, then every follow-up action in source order. Pass the item's heading as the heading, its display label and summary note as the only text to render along with a key moment's marker, and its context as non-rendering material.

Give every call this shared style:

- `Everyday Doodle` on a warm-ivory background, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Heading, marker, and display label in the sans. The summary note in a small handwritten script, in the same warm-black ink as the linework and clearly legible.
- All lines sit in clear ivory space beside or below the art, with a margin around every line. Text never crosses the art, and art never crosses the text.
- Avoid borders, underlines, frames, and separators; abstract corporate or stock imagery; and any item text beyond the marker, display label, and summary note.

Give each band one further instruction, which is what makes the two read apart at a glance:

- **Key moment** — a vignette sized for one cell of an even grid, taller than it is wide, its everyday object caught mid-event so the moment reads as something that already happened. Its marker sits directly beneath the art.
- **Follow-up action** — a compact, roughly square vignette, its everyday object poised, packed, queued, or about to move so the action reads as still owed. No marker.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## 3. Assemble the Final Prompt

The final prompt is the block below with three substitutions:

- `{MEETING_LINE}` is the meeting line, used verbatim and never reformatted.
- `{KEY_MOMENT_PROMPTS}` is every key moment prompt returned in stage 2, in timeline order, separated by blank lines.
- `{FOLLOW_UP_PROMPTS}` is every follow-up action prompt returned in stage 2, in source order, separated by blank lines.

Substitute verbatim. Never summarise, condense, merge, reword, or drop a prompt, and never back-reference one with "same as above" or an ellipsis. The only permitted edit is de-duplication: where two vignettes independently picked the same everyday object or character, vary one and leave every other detail intact. Where a band is empty, drop that band's label and its heading line with it. Nothing outside the block reaches the image.

```
**Typography**

- Meeting line: a transitional or old-style serif such as Baskerville, Caslon, or Garamond, set small and quiet.
- Band labels, headings, markers, and display labels: a humanist or grotesque sans such as Inter, Helvetica Neue, or Univers. Band labels are the largest sans on the page, headings sit slightly heavier than their display labels, and markers are the smallest sans.
- Summary notes: a small handwritten script in warm-black ink, matching the hand-drawn linework and set smaller than the display label.

**Overall image look**

- 16:9 horizontal, Everyday Doodle style, warm ivory, no borders, frames, or separators.
- Two full-width horizontal bands stacked on one continuous page, `Key Moments` on top and `Follow-Ups` beneath it.
- Generous, even ivory gutters: at least one display-label line of clear ivory between neighbouring vignettes, plus a clear band below the meeting line.
- Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Band 1, Key Moments**

- An even number of moments, at least six, split into two rows of equal length with one vignette per moment. Every cell is the same width and the columns line up exactly between the two rows.
- Timeline order reads left to right along the upper row, then left to right along the lower row.
- One continuous hand-drawn warm-black ink thread carries the whole timeline: it runs horizontally across the upper row, curves down at the right edge, and returns to the left to run across the lower row. It is drawn in the same uneven pen line and hatch texture as the art, so it reads as the timeline itself and not as a border, rule, or divider.
- In each row the art sits above the thread, each moment's marker sits on the thread, and its heading, display label, and summary note sit in clear ivory below the thread.

**Between the bands**

- A full-width empty ivory gap at least three display-label lines tall separates the two bands, holding no rule, line, frame, ornament, or art.
- The ink thread ends at the last key moment and never enters the gap or the second band.

**Band 2, Follow-Ups**

- A single row of compact vignettes, one per action, left to right in source order, evenly spaced and sharing the column grid above, with no thread and no markers.

**Text on the page**

- The meeting line is the only text above the first band label.
- The band labels `Key Moments` and `Follow-Ups` are the only text outside the vignettes.
- No greeting, name, attendee list, overview, item count, placeholder name, or instruction text appears.

**Composition**

Meeting: {MEETING_LINE}

Key Moments:

{KEY_MOMENT_PROMPTS}

Follow-Ups:

{FOLLOW_UP_PROMPTS}
```

## 4. Generate and Validate

Generate from the combined prompt and save as `visual-minutes.png`, replacing any existing file. `chief-os-image-prompt` returns prompts only; generation, saving, and these checks belong here. Regenerate whenever a check fails.

- The `chief-os-image-prompt` call count equals the total number of items, and the image holds one vignette per item.
- The file exists, is non-empty, and is a readable 16:9 PNG in the `Everyday Doodle` style on warm ivory.
- The two bands are stacked top to bottom under their labels, separated by a full-width empty ivory gap, with no vignette from one band sitting inside the other.
- Key moments are an even count of at least six, split into two rows of equal length with the columns aligned, reading left to right along the upper row then the lower row, all carried on one continuous ink thread with every marker sitting on it. Follow-ups sit in a single row below with no thread and no markers.
- The meeting line resolves its placeholder and is the only text above the first band label.
- Each vignette shows its heading, a 4-to-6-word display label, and a one-line handwritten summary note. Nothing else from the item is rendered.
- No everyday object and no character repeats across vignettes.
- No text overlaps art or other text, every summary note stays legible, vignettes are evenly spaced, and no instruction text or placeholder name appears in the image.
