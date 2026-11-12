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

Make one `chief-os-image-prompt` call per task in source order, as [illustrated-page.md](../../chief-os-image-prompt/references/illustrated-page.md#per-item-calls) sets. Pass all fields marked Rendered above as the text whitelist, and context as non-rendering material.

## 3. Assemble the Final Prompt

The final prompt is the block below with two substitutions:

- `{LOCAL_DATE}` is the top-level `date`, used verbatim and never reformatted.
- `{TASK_PROMPTS}` is every prompt returned in stage 2, in source order, separated by blank lines.

Insert the prompts as [illustrated-page.md](../../chief-os-image-prompt/references/illustrated-page.md#assemble-the-final-prompt) sets.

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

Generate `artifact-image.png` as [illustrated-page.md](../../chief-os-image-prompt/references/illustrated-page.md#generate) sets.
