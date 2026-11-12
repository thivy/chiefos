# Illustrated Page

Shared rules for a skill that turns a list of items into one illustrated page: one `chief-os-image-prompt` call per item, one assembled prompt, one generated image. The calling skill owns its items, its page layout, and its final prompt block. This file owns what is the same for every such page.

## Per-Item Calls

Make one call per item, in the order that the caller sets. Pass all fields that the caller marks Rendered as the text whitelist, and its context fields as non-rendering material. Pass previously chosen objects and character descriptions as exclusions, so that each interaction stays distinct and coherent.

Give every call this style:

- `Everyday Doodle` on warm ivory, identical across vignettes.
- One self-contained, highly detailed vignette per call, not a full composition.
- Heading in a warm-black handwritten script. Any marker, display label, and summary note in a warm-black sans at regular weight. All of it at the same size.
- Every line sits in clear ivory beside or below the art, with a margin around it. Text and art never cross.
- Render only the whitelisted fields. Use no stock or corporate clichés such as handshakes, currency symbols, trophies, bullseyes, or rockets.

Ratio and page layout belong to the assembled image, so do not pass them here. Start fresh each run: reuse no prompt or image from a previous one.

## Assemble the Final Prompt

Insert only returned prompt text, verbatim: no summaries, edits, omissions, or back-references. Omit empty sections and their labels. Nothing outside the final prompt block reaches the image.

## Generate

Generate from the combined prompt and replace the caller's image file. Confirm the current generation produced a non-empty PNG at that path before reporting success. On generation or save failure, report the error without presenting an older file as this run's output.
