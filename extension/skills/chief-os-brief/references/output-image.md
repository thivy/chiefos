# Briefing Visual

Compose one prompt per task, assemble them into a single combined prompt, then generate `<working directory>/artifact-image.png`.

## Workflow

Run these stages in order once the briefing JSON is schema-valid.

### 1. Load Content

Read only the top-level `summary` and `todo.items` from the final briefing JSON defined in `output-briefing.md`. Ignore `emails`, `calendar`, `chats`, and `recaps`; tasks keep any source context already inside `todo.items`.

### 2. Prepare Content

- **Overview**: the complete top-level `summary`, headed `Brief overview`. Text only, never illustrated, no action.
- **Tasks**: every entry in `todo.items`, in source order, headed by its exact `title`. For each, prepare:
  - **Full text** — one short line combining `summary` and `recommendedAction`. Keep names, dates, and commitments exact, add nothing, omit no recommended action. Context only, never rendered.
  - **Display label** — 4 to 6 words stating the next action in the task's own wording. No invented facts, no padding.
- Expected vignette count = the number of tasks. The overview is not a vignette.

### 3. Set the Shared Style

Fresh start: reuse no prompt or image from a previous run. Apply to every stage 5 prompt.

- Style `Everyday Doodle` on a warm-ivory background, identical across vignettes.
- Each call composes one self-contained vignette with high detail, not a full composition.
- The heading and display label sit in clear ivory space beside or below the art, with a margin around every line. Nothing overlaps: text never crosses the object or character, and neither crosses the text.
- Avoid borders, underlines, frames, or separators; abstract corporate or stock imagery; and rendering any task text beyond the display label.

Ratio and layout belong to the assembled image. Do not pass them here.

### 4. Prepare the Overview Text

No `chief-os-image-prompt` call, no object, character, scene, or drawn element. Keep `Brief overview` as the heading and the complete top-level summary verbatim as plain text, never shortened into a label and never given a recommended action. It is placed in stage 6.

Reference the overview text as O1.

### 5. Compose a Prompt for Each Task

Tasks are the only illustrated items. Make one `chief-os-image-prompt` call per task, in source order, with the stage 3 style:

- Heading: the task's exact `title`. Rendered text: its display label and nothing else.
- Supply the full text as context that must not be rendered.
- Keep each returned prompt with its position. Never batch tasks into one call, and never skip a task for resembling another.
- Every task prompt comes back from `chief-os-image-prompt`. Never write one yourself, and never carry a prompt over from a previous run. The call count must equal the expected vignette count from stage 2 before stage 6 starts.

Reference each task prompt as T1, T2, and so on, in source order.

### 6. Final Image Prompt

Fill the template below and send the result as a single prompt. Nothing outside the template reaches the image.

- `{PERSON_NAME}` = top-level `person_name`; `{LOCAL_DATE}` = top-level `date`, never derived or reformatted; `{ITEM_COUNT}` = the number of entries in `todo.items`.
- Replace O1 with the stage 4 overview text, and T1, T2 … TN with the stage 5 prompts in source order until every task is placed. Add a block per task; the template shows the first two only.
- Substitution is verbatim. Never summarise, condense, merge, reword, paraphrase, or drop a prompt to save length, tokens, or readability.
- Never collapse shared wording into one description, and never back-reference with "same as above", "repeat for the remaining items", or an ellipsis. Each block repeats its own full description.
- The only permitted edit is de-duplication: where two independently composed vignettes picked the same everyday object or character, vary one and leave every other detail intact.
- Before generating, confirm the number of task blocks equals the expected vignette count from stage 2 and that each block still carries its own object, character, interaction, heading, and display label.

```
**Typography**

- Title: A transitional or old-style serif such as Baskerville, Caslon, or Garamond, set medium font size as the dominant text.
- Subtitle: the same serif, set small and clearly smaller than the title, directly beneath it.
- Overview, headings, and display labels: a humanist or grotesque sans such as Inter, Helvetica Neue, or Univers. Set the overview at reading size and headings slightly heavier than their labels.

**Overall image look**

- 9:16 vertical, Everyday Doodle style, warm ivory, masonry fluid grid with no borders, frames, or separators.
- Generous, even ivory gutters: at least one display-label line between neighbouring vignettes, plus a clear band below the title block and below the overview text.
- Nothing overlaps. No vignette, object, or character crosses a gutter or reaches into the overview block, and no text sits over art or over other text.

**Composition**

Title: {PERSON_NAME}, here's a clear, focused snapshot for {LOCAL_DATE}.

Subtitle: {ITEM_COUNT} items to focus on today.

Overview: O1

T1

T2
```

### 7. Generate and Save

Generate from the combined prompt and save as `<working directory>/artifact-image.png`, replacing any existing file.

### 8. Validate the Image

`chief-os-image-prompt` returns prompts only; generation, saving, and these checks belong here. Regenerate whenever a check fails. Do not report success until every check passes, and never claim an image was created when generation is unavailable or a check is still failing.

- One `chief-os-image-prompt` call was made per task, matching the expected vignette count from stage 2.
- The file exists, is non-empty, and is a readable PNG.
- 9:16 ratio, warm-ivory background, masonry layout, and `Everyday Doodle` style were applied.
- Title and subtitle resolve every placeholder, are set in the serif, and the subtitle is clearly smaller than the title.
- The overview sits directly under the subtitle as a text block carrying the complete summary, with no object, character, drawing, or decoration.
- One vignette per task, in source order, matching the expected vignette count from stage 2, each showing its heading and a 4-to-6-word display label in the sans, and no full task text.
- Display labels invented no names, dates, or commitments.
- No everyday object and no character repeats across vignettes.
- No text overlaps art or other text, and every line is legible against the ivory.
- Vignettes are separated by generous, even spacing, with no crowding or bleed into a neighbour.
- No placeholder names or instruction text appear in the image.
