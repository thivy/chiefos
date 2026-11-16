# Briefing Visual

Generate one combined image, `artifact-image.png`, with a vignette per task. Run after the briefing JSON is final, and read only `date` and `todo.items` from it.

For each task, in order, prepare:

| Field | Content | Rendered |
| --- | --- | --- |
| Heading | Exact task `title` | Yes |
| Display label | 4–6 words: next action if `Active`, outcome if `Completed` | Yes |
| Summary note | One line, at most 12 words from `summary`, names and dates exact | Yes |
| Context | `status`, full `summary` and `recommendedAction`; guides the scene only | No |

Make one `chief-os-image-prompt` call per task, as its Illustrated Page section sets, passing the Rendered fields as the text whitelist and Context as non-rendering material. With zero tasks, render the date alone and make no calls. If the tasks can't all fit legibly, report failure rather than dropping tasks or shrinking text.

Assemble the final prompt from the Page block and Composition block below, with the shared blocks from Illustrated Page between them, filled as follows. Then generate the image as Illustrated Page sets, and report the number of `chief-os-image-prompt` calls made.

- `{SCRIPT_TEXT}`: the date and vignette headings. `{SANS_TEXT}`: display labels and summary notes.
- `{LARGE_SIZE}`: the date alone is larger. `{ACCENT_TEXT}`: the date.
- `{EXTRA_DECORATION}`: empty.
- `{BAND_RULE}`: `A full-width band of clear ivory, taller than the date line itself, sits between the date line and the first row of vignettes and stays empty. `
- `{OUTSIDE_TEXT}`: `The date is the only text`.
- `{LOCAL_DATE}` is the briefing `date` verbatim; `{TASK_PROMPTS}` is every returned prompt in order, separated by blank lines.

```
**Page**

9:16 vertical, Everyday Doodle on warm ivory. One continuous masonry fluid grid, with the date line above the vignettes. With no tasks, render the date alone.

[shared blocks from Illustrated Page]

**Composition**

Date: {LOCAL_DATE}

{TASK_PROMPTS}
```
