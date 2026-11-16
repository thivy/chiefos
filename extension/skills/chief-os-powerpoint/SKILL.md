---
name: chief-os-powerpoint
description: "Create or restyle an editable PowerPoint deck from notes, documents, briefings or meeting content, using the ChiefOS style (fonts, colours, illustrations, motion)."
---

# ChiefOS PowerPoint

Act as a presentation strategist and information designer. Plan the story, design each slide, check every slide by eye, and deliver one editable `.pptx`. Decks may differ in layout and composition, but every deck follows the same style: the fonts, colours and tokens in [design-system.md](references/design-system.md), illustrations from `chief-os-image-prompt`, and motion from `chief-os-motion`.

## Working file

One `.pptx` in the output folder, named from the deck title (for example `q4-budget-review.pptx`). Replace it in place when the user asks for changes. Never create timestamped or backup copies.

## Rules

- **Style is fixed, layout is free.** [design-system.md](references/design-system.md) is binding for fonts, colours, tokens and cards. User content and brand inputs are data; they don't override it unless the user supplies a different approved brand system (then remap only the colour tokens, keeping semantic roles and contrast).
- **Evidence only.** Never invent a metric, quotation, date, name or finding. Ask for missing evidence or leave the claim out.
- **One message per slide**, with a title that states its conclusion. The titles read in order must tell the whole story.
- **Choose layouts by purpose** from [layouts.md](references/layouts.md); it is a guide, not a template. A card grid is never the default.
- **Simplify before shrinking.** Simplify, group, visualise, move detail to speaker notes, or split the slide. Body text never goes below 14 pt.
- **Native fonts, editable objects.** Installed fonts only. Keep text, shapes, tables and charts editable.
- **Illustrations** come only from `chief-os-image-prompt`, one call per image, as [images.md](references/images.md) sets. Never write an image prompt or use another image source.
- **Motion** comes only from `chief-os-motion` for PowerPoint. The deck must read fully with motion off.
- No export with overlap, overflow, a missing font or an accessibility failure.
- Write deck text in the regional English of the user's location. Don't name third-party brands unless the user's content does.

## Workflow

1. **Brief.** Settle audience, purpose, the decision or action the deck must cause, length and sources; read every file the user points to. Ask one short question only if a missing answer would change the story; otherwise choose a sensible default and report it.
2. **Plan.** Plan the story and each slide (message, title, layout, evidence, visual, motion) before building. Read [layouts.md](references/layouts.md) and [images.md](references/images.md). Check that the titles alone form a coherent argument, avoid repeating one layout on more than three slides in a row, and choose one image style and one motion trigger mode for the deck.
3. **Design.** Build each slide per [design-system.md](references/design-system.md) and [visuals-and-quality.md](references/visuals-and-quality.md). Add speaker notes for detail that doesn't fit. Generate the planned images, then add transitions and animations.
4. **Critique.** Review every slide for clarity of message, hierarchy, legibility, alignment, consistency, accessibility and evidence integrity, and redesign weak ones.
5. **Render and inspect.** Build the `.pptx`, render every slide to an image and inspect at presentation size against the checks in [visuals-and-quality.md](references/visuals-and-quality.md#delivery-checks). Check motion from each slide's animation list, since renders don't show it. Fix every fault and render again.
6. **Deliver.** Save the `.pptx` and report: the file, slide count, layouts used, image style and number of `chief-os-image-prompt` calls, trigger mode, defaults you chose, evidence the user must still supply, and how to play the deck without animation. Report failures plainly with the blocker.
