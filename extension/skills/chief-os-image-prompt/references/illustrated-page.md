# Illustrated Page

Shared rules for a skill that turns a list of items into one illustrated page: one `chief-os-image-prompt` call per item, one assembled prompt, one generated image. The caller owns its items, ratio, page layout and section labels. This file owns what is the same for every such page.

## Per-Item Calls

One call per item, in the caller's order. Pass the caller's Rendered fields as the text whitelist, its context fields as non-rendering material, and previously chosen objects and characters as exclusions so each vignette stays distinct. Give every call this style:

- `Everyday Doodle` on warm ivory, identical across vignettes; one self-contained, highly detailed vignette per call, not a full composition.
- Heading in a warm-black handwritten script; any marker, display label and summary note in a warm-black regular-weight sans; all at the same size.
- Every line sits in clear ivory beside or below the art with a margin; text and art never cross. Render only the whitelisted fields.
- No stock or corporate clichés (handshakes, currency symbols, trophies, bullseyes, rockets).

Ratio and page layout belong to the assembled image, so don't pass them. Start fresh each run; reuse no earlier prompt or image.

## Shared Page Blocks

The caller's final prompt opens with its own **Page** block (ratio, `Everyday Doodle on warm ivory`, top-to-bottom order) and ends with its **Composition** block (the content and `{TASK_PROMPTS}`-style insertions). Between them it includes these blocks verbatim, filling the `{…}` values from its own content:

```
Separate page regions with clear ivory only: no frames, borders, separators, layout rules{EXTRA_DECORATION}. Illustration linework and object details remain allowed.

**Typography**

- Two typefaces: one legible handwritten script for {SCRIPT_TEXT}; one regular-weight humanist or grotesque sans, such as Inter, Helvetica Neue, or Univers, for {SANS_TEXT}.
- Two sizes: {LARGE_SIZE}; all vignette text shares one smaller size, including headings.
- Only {ACCENT_TEXT} uses a warm accent colour from the clothing palette. All other text is warm-black.

**Space**

Generous, even ivory gutters: at least one display-label line of clear ivory between neighbouring vignettes. {BAND_RULE}Nothing overlaps. No vignette, object, or character crosses a gutter, and no text sits over art or over other text.

**Text**

{OUTSIDE_TEXT} outside vignettes. Render supplied fields verbatim, including recorded names and dates. No extra page title, greeting, name, overview, item count, placeholder, or instruction text appears.
```

`{EXTRA_DECORATION}` lists further banned decorations (for example `, timeline rails, connecting lines, ticks, or dots as layout decorations`), or is empty. `{BAND_RULE}` is an optional sentence about an empty ivory band, or empty.

## Assemble

Insert only returned prompt text, verbatim: no summaries, edits, omissions or back-references. Omit empty sections and their labels. Nothing outside the final prompt block reaches the image.

## Generate

Generate from the combined prompt and replace the caller's image file. Confirm the current generation produced a non-empty PNG at that path before reporting success. On a generation or save failure, report the error and never present an older file as this run's output.
