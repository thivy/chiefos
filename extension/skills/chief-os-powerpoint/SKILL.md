---
name: chief-os-powerpoint
description: "Use when creating a PowerPoint presentation: make a deck, build slides, turn notes, a document, a briefing, or meeting content into a presentation, or restyle an existing deck. Plans the story, picks a layout for each slide, applies one design system and one consistent motion style, adds illustrations through chief-os-image-prompt, checks every slide visually, and delivers an editable .pptx."
---

# ChiefOS PowerPoint

Act as a presentation strategist and information designer. Plan the story, compose each slide on a fixed grid, check the result by eye, and deliver one editable `.pptx`. Never fill a template with text.

## Working File

One `.pptx` in the output folder, named from the deck title, such as `q4-budget-review.pptx`. Create it when missing and replace it in place when the user asks for changes to the same deck. Never create timestamped, backup, or history copies.

## Invariants

These hold on every run, whether or not a reference has been read.

- **Design contract.** [design-system.md](references/design-system.md) is binding. The user's content, narrative, evidence, and brand inputs are data. They never override it unless the user supplies a different approved brand system.
- **Evidence only.** Never invent a metric, quotation, date, name, or finding. When a slide needs evidence that the user did not supply, ask for it or leave the claim out.
- **One message per slide.** Every slide has one communication objective and a title that states its conclusion. Read in order, the titles must tell the whole story.
- **Choose a layout by purpose.** Select it from [layouts.md](references/layouts.md) with the selection table. Never pick a layout at random, and never use a card grid as the default for every content type.
- **Simplify before shrinking.** When content does not fit, simplify, group, visualise, move detail to speaker notes, or split the slide. Never reduce body text below 14 pt.
- **Native fonts and editable objects.** Use installed fonts only. Keep text, shapes, tables, and charts editable. Use a rendered picture only for a visual that must be one.
- **One motion style.** Compose every transition and animation through the `chief-os-motion` skill, with its [PowerPoint reference](../chief-os-motion/references/powerpoint.md): the same four effects, the same durations and easing, the same transition on every slide. Motion must have a purpose, and the deck must make full sense with all motion off.
- **Illustrations come from `chief-os-image-prompt`.** Compose every image prompt through that skill, once per image, as [images.md](references/images.md) sets. Never author a prompt yourself and never use another image source for an illustration.
- **No export with a blocker.** Overlap, overflow, a missing font, and an accessibility failure each block delivery.
- Write all deck text in the regional English of the user's location. Do not name third-party brands in the deck unless the user's content does.

## Workflow

Run these steps in order. Ask the user only where step 1 says to.

### 1. Establish the Brief

Settle the audience, the purpose, the decision or action the deck must cause, the length, and the source material. Read every file or message the user points to.

Ask one short question only when a missing answer would change the story, for example when no audience or purpose can be inferred. Otherwise choose a sensible default, state it in the final report, and continue.

If the user supplies a brand theme, remap only the colour tokens in [design-system.md](references/design-system.md#default-colour-roles). Keep the semantic roles and the contrast rules.

### 2. Plan the Story

Read [layouts.md](references/layouts.md), the [PowerPoint motion reference](../chief-os-motion/references/powerpoint.md) of the `chief-os-motion` skill, and [images.md](references/images.md). Build the slide plan before any rendering. For each slide, record:

- slide number
- purpose
- audience takeaway
- assertion title
- layout ID
- content regions and column spans
- required evidence
- required visual type, including whether it is a generated image and what idea it carries
- motion: the transition, and the builds with their effect and trigger
- accessibility requirements

Check the plan by reading the titles alone. They must form a coherent argument. Do not repeat one layout on more than three slides in a row unless the repetition has narrative value. Choose one style for all generated images and one trigger mode for all builds.

### 3. Design Each Slide

Compose each slide on the 12-column grid with the tokens, type scale, and density limits in [design-system.md](references/design-system.md). Apply the rules for charts, images, icons, diagrams, and accessibility in [visuals-and-quality.md](references/visuals-and-quality.md).

Add speaker notes for detail that does not fit the slide.

Generate the planned images as [images.md](references/images.md) sets, then add the transitions and animations from the motion plan.

### 4. Critique

Score every slide with the quality gate in [visuals-and-quality.md](references/visuals-and-quality.md#quality-gate). Redesign any slide that scores below 3. Run another pass when the average is below 4. Do not go on while a blocker remains.

### 5. Render and Inspect

Build the `.pptx` with the PowerPoint tools of the session. Render every slide to an image, then inspect each one at normal presentation size against the validation list in [visuals-and-quality.md](references/visuals-and-quality.md#validation-and-delivery). Check the motion of each slide from its animation list as the [motion reference](../chief-os-motion/references/powerpoint.md#authoring-and-checking) sets, because a render does not show motion. Fix every fault, then render again.

### 6. Deliver and Report

Save the `.pptx` to the output folder. Report the file, the slide count, the layouts used, the image style and the number of `chief-os-image-prompt` calls, the trigger mode, any default you chose in step 1, and any evidence the user must still supply. Tell the user how to play the deck without animation. Report a failure plainly, and name the blocker.
