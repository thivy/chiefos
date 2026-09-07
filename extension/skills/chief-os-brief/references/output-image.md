# Briefing Visual

Compose one prompt per task through `chief-os-image-prompt`, assemble them into a single combined prompt, then generate `artifact-image.png`. Run this only after the briefing JSON is final.

## 1. Prepare the Content

Read only `date` and `todo.items` from the briefing JSON. Task context comes only from those items. Render the date and the task fields below, not other briefing content.

For every task in source order, prepare:

| Field         | Content                                                                                                                          | Rendered |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Heading       | Exact task `title`                                                                                                               | Yes      |
| Display label | 4 to 6 words: next action for `Active`, explicitly completed outcome for `Completed`; retain task wording without padding        | Yes      |
| Summary note  | One line, at most 12 words from `summary`, preserving names and dates exactly                                                    | Yes      |
| Context       | Task `status`, full `summary` and `recommendedAction`, preserving names, dates, and commitments; guides objects and interactions | No       |

Use one vignette per task. With zero tasks, generate a date-only page and make zero composer calls. If all tasks cannot fit legibly, report failure rather than dropping tasks or shrinking text beyond readability.

## 2. Compose One Prompt per Task

Make one `chief-os-image-prompt` call per task in source order. Pass all fields marked Rendered above as the text whitelist, and context as non-rendering material. Pass previously chosen objects and character descriptions as exclusions to keep interactions distinct and coherent. Give every call this style:

- `Everyday Doodle` on warm ivory, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Heading in a warm-black handwritten script; display label and summary note in a warm-black sans at regular weight, all at the same size.
- Every line sits in clear ivory beside or below the art, with a margin around it. Text and art never cross.
- Render only the whitelisted fields. Use no abstract corporate or stock imagery.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## 3. Assemble the Final Prompt

The final prompt is the block below with two substitutions:

- `{LOCAL_DATE}` is the top-level `date`, used verbatim and never reformatted.
- `{TASK_PROMPTS}` is every prompt returned in stage 2, in source order, separated by blank lines.

Insert only returned prompt text, verbatim: no summaries, edits, omissions, or back-references. Nothing outside the block reaches the image.

```
**Page**

9:16 vertical, Everyday Doodle on warm ivory. One continuous masonry fluid grid, with the date line above the vignettes. With no tasks, render the date alone.

Separate page regions with clear ivory only: no layout rules, frames, borders, or separators. Illustration linework and object details remain allowed.

**Typography**

- Two typefaces: one legible handwritten script for the date and vignette headings; one regular-weight humanist or grotesque sans, such as Inter, Helvetica Neue, or Univers, for display labels and summary notes.
- Two sizes: the date alone is larger; all vignette text shares one smaller size, including headings.
- Only the date uses a warm accent colour from the clothing palette. All other text is warm-black.

**Space**

Generous, even ivory gutters: at least one display-label line of clear ivory between neighbouring vignettes. A full-width band of clear ivory, taller than the date line itself, sits between the date line and the first row of vignettes and stays empty. Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Text**

The date is the only text outside vignettes. Render supplied task fields verbatim, including recorded names and dates. No extra page title, greeting, user name, briefing overview, item count, placeholder, or instruction text appears.

**Composition**

Date: {LOCAL_DATE}

{TASK_PROMPTS}
```

## 4. Generate

Generate from the combined prompt and replace `artifact-image.png`. Confirm the current generation produced a non-empty PNG at that path before reporting success. On generation or save failure, report the error without presenting an older file as this run's output.
