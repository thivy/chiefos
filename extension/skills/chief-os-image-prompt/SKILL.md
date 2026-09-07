---
name: chief-os-image-prompt
description: "Use when this skill is named explicitly, either by the user or by a calling skill such as chief-os-brief. Do not invoke it for general image, illustration, artwork, or image-prompt requests that do not name it."
---

# ChiefOS Image Prompt

Compose one complete image prompt in a named style. Return the prompt only; the caller generates and saves the image.

## Resolve the Style

- Use the requested style, or `Everyday Doodle` when none is specified.
- Read the matching reference in full before composing.
- Apply one style only. Do not blend styles or borrow motifs from another reference.

## Compose the Prompt

- Resolve the reference's placeholders with concrete values from the supplied content, following its definitions and examples.
- Include its scene description, visual treatment, and avoid rules as requirements.
- Preserve the supplied content's meaning, item count, and order. Do not add subjects, drop items, or invent facts to make the style fit.
- Compose one coordinated vignette or study per item for multi-item content, following the reference's multi-item rules.
- Preserve rendered fields verbatim and list them as the text whitelist. Non-rendering context guides subjects, poses, and composition only.
- Honour the caller's exclusions for previously used objects and characters. Choose the object, transformation, pose, and contact together; do not substitute an object into an incompatible scene.

## Return the Prompt

- Mark generation instructions as non-rendering, not as image text.
- **Called by another skill:** return the prompt internally, with style and requested settings as separate metadata. Do not post per-item prompts or metadata to user chat.
- **Direct user request:** show the prompt as Markdown with style and requested settings alongside it.
- Never generate an image, write a file, or claim an image was created.

## References

- [Everyday Doodle](references/everyday-doodle.md)
- [Scientific Editorial](references/scientific-editorial.md)
