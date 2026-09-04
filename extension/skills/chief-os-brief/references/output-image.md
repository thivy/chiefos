# Briefing Visual

Compose one prompt per task through `chief-os-image-prompt`, assemble them into a single combined prompt, then generate `artifact-image.png`. Run this only once the briefing JSON is schema-valid.

## 1. Prepare the Content

Read only `date` and `todo.items` from the briefing JSON. Ignore `summary`, `person_name`, `emails`, `calendar`, `chats`, and `recaps`; each task keeps whatever source context already sits inside `todo.items`.

The image carries the tasks and nothing else. No title, greeting, name, briefing overview, or item count appears anywhere in it.

For every entry in `todo.items`, in source order, prepare:

- **Display label** — 4 to 6 words stating the next action in the task's own wording, with no padding. Rendered.
- **Summary note** — one line of at most 12 words drawn from the task's `summary`, keeping any name or date it carries exact. Rendered.
- **Context** — one line combining `summary` and `recommendedAction` in full, with names, dates, and commitments exact. Never rendered; it only guides the choice of object, character, and interaction.

One vignette per task.

## 2. Compose One Prompt per Task

Make one `chief-os-image-prompt` call per task, in source order. Pass the task's exact `title` as the heading, its display label and summary note as the only text to render, and its context as non-rendering material. Give every call this shared style:

- `Everyday Doodle` on a warm-ivory background, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Set the heading, display label, and summary note in the same warm-black sans-serif typeface and regular style. Distinguish them only by size: heading largest, display label medium, and summary note small.
- The heading, display label, and summary note sit in clear ivory space beside or below the art, with a margin around every line. Text never crosses the art, and art never crosses the text.
- Avoid borders, underlines, frames, and separators; abstract corporate or stock imagery; and any task text beyond the display label and summary note.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## 3. Assemble the Final Prompt

The final prompt is the block below with two substitutions:

- `{LOCAL_DATE}` is the top-level `date`, used verbatim and never reformatted.
- `{TASK_PROMPTS}` is every prompt returned in stage 2, in source order, separated by blank lines.

Substitute verbatim. Never summarise, condense, merge, reword, or drop a prompt, and never back-reference one with "same as above" or an ellipsis. The only permitted edit is de-duplication: where two vignettes independently picked the same everyday object or character, vary one and leave every other detail intact. Nothing outside the block reaches the image.

```
**Typography**

- Use one humanist or grotesque sans such as Inter, Helvetica Neue, or Univers for every rendered line, including the date, headings, display labels, and summary notes.
- Keep the same regular weight and style throughout, in warm-black ink. Create hierarchy only through size: headings largest, display labels medium, summary notes small, and the date line smallest and quiet.

**Overall image look**

- 9:16 vertical, Everyday Doodle style, warm ivory, masonry fluid grid with no borders, frames, or separators.
- Generous, even ivory gutters: at least one display-label line between neighbouring vignettes, plus a clear band below the date line.
- The date line is the only text above the vignettes. No title, greeting, name, briefing overview, or item count appears.
- Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Composition**

Date: {LOCAL_DATE}

{TASK_PROMPTS}
```

## 4. Generate and Validate

Generate from the combined prompt and save as `artifact-image.png`, replacing any existing file. `chief-os-image-prompt` returns prompts only; generation, saving, and these checks belong here. Regenerate whenever a check fails.

- The `chief-os-image-prompt` call count equals the number of tasks, and the image holds one vignette per task in source order.
- The file exists, is non-empty, and is a readable 9:16 PNG in the `Everyday Doodle` style on warm ivory.
- The date line resolves its placeholder and is the only text above the vignettes. No title, greeting, name, briefing overview, or item count appears.
- Each vignette shows its heading, a 4-to-6-word display label, and a one-line smaller summary note in the shared sans. Nothing else from the task is rendered.
- No everyday object and no character repeats across vignettes.
- No text overlaps art or other text, every summary note stays legible, vignettes are evenly spaced, and no instruction text or placeholder name appears in the image.
