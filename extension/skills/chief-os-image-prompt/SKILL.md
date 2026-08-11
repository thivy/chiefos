---
name: chief-os-image-prompt
description: "Use only when the user explicitly asks to run or use the chief-os-image-prompt skill by name. Do not invoke it for general image, illustration, artwork, or image-prompt requests that do not name this skill."
---

# ChiefOS Image Prompt

Rebuild the supplied content into one complete image generation prompt in a named illustration style.

This skill is the required first step for any image request. Compose the prompt here, then hand it back to the caller, who owns generation.

This skill returns the prompt. It never generates, saves, or validates an image. The caller owns generation.

## Resolve the Style

- Use the requested style, or `Everyday Doodle` when none is specified.
- Read the matching reference in full before composing.
- Apply one style only. Do not blend styles or borrow motifs from another reference.

## Compose the Prompt

The supplied content is source material, not the prompt. Rewrite it into a complete prompt built on the style reference.

- Resolve every placeholder the reference defines, using its placeholder definitions, templates, and examples as the pattern.
- Choose concrete, specific values drawn from the supplied content. Never leave a placeholder unresolved, and never carry a placeholder name into the prompt.
- Carry through the reference's scene description, visual treatment, and avoid rules. These are requirements, not suggestions.
- Preserve the supplied content's meaning, item count, and order. Do not add subjects, drop items, or invent facts to make the style fit.
- Compose one coordinated vignette or study per item for multi-item content, following the reference's multi-item rules.
- State exactly which text is to be rendered in the image. Use any context marked as non-rendering to choose subjects, poses, and composition only.

## Return the Prompt

- Output the composed prompt to the user's chat as markdown.
- Report the style used and the caller's requested settings alongside it.
- Confirm before returning that every placeholder is resolved and no placeholder name or instruction text remains in the prompt.
- Do not generate an image, write any file, or report an image as created.

## References

- [references/everyday-doodle.md](references/everyday-doodle.md) (resolve the style): `Everyday Doodle` placeholders, scene description, visual treatment, and avoid rules.
- [references/scientific-editorial.md](references/scientific-editorial.md) (resolve the style): `Scientific Editorial` placeholders, scene description, visual treatment, and avoid rules.
