---
name: chief-os-image-prompt
description: "Use when this skill is named explicitly, either by the user or by a calling skill such as chief-os-brief. Do not invoke it for general image, illustration, artwork, or image-prompt requests that do not name it."
---

# ChiefOS Image Prompt

Compose one complete image prompt in a named style. Return the prompt only; the caller generates and saves the image.

## Resolve the Style

- Use the requested style, or `Everyday Doodle` when none is specified. When no reference matches the requested style, list the available styles and stop; never improvise one.
- Read the matching reference in full before composing.
- Apply one style only. Do not blend styles or borrow motifs from another reference.

| Style                      | Suits                                                                    | Text in the image        |
| -------------------------- | ------------------------------------------------------------------------ | ------------------------ |
| Everyday Doodle            | Witty, human-scale vignettes of tasks and actions. The default           | Whitelisted fields       |
| Scientific Editorial       | Explaining a system, process, or piece of research                       | Short whitelisted labels |
| Prism Grain Silhouette     | Calm, inspirational posters about growth, ambition, courage, or progress | None                     |
| Spectrum Grain Collage     | Bold, creative, retro-contemporary images about momentum or a launch     | None                     |
| Blue-Glow Halftone Concept | One clear metaphor from two unlikely objects, in Swiss editorial design  | None                     |
| Luminous Glitch Hologram   | Technology, AI, innovation, or data, as one glowing subject on black     | None                     |

A style that shows no text cannot carry a caller's rendered fields. When the supplied content has rendered fields, choose a style that shows text.

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
- Write any chat text outside the prompt per the `chief-os-design` skill: Voice.

## References

- [Everyday Doodle](references/everyday-doodle.md)
- [Scientific Editorial](references/scientific-editorial.md)
- [Prism Grain Silhouette](references/prism-grain-silhouette.md)
- [Spectrum Grain Collage](references/spectrum-grain-collage.md)
- [Blue-Glow Halftone Concept](references/blue-glow-halftone.md)
- [Luminous Glitch Hologram](references/luminous-glitch-hologram.md)

## Shared Rules

**Text-Free.** The last four styles render no text and no real-looking people. Read [text-free-rules.md](references/text-free-rules.md) with the style. It is not a style.

## Caller Rules

**Illustrated Page.** A caller that assembles many vignettes into one page asks for the `chief-os-image-prompt` skill: Illustrated Page. Read [illustrated-page.md](references/illustrated-page.md) for it. It sets the per-item calls, the assembly of the final prompt, and the generation check. It is not a style.
