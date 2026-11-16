---
name: chief-os-image-prompt
description: "Compose one image prompt in a named ChiefOS style (default Everyday Doodle) for a calling skill or the user. Use only when named explicitly."
---

# ChiefOS Image Prompt

Compose one complete image prompt in a named style and return the prompt only. The caller generates and saves the image.

## Style

Use the requested style, or `Everyday Doodle` when none is given. If none matches, list the available styles and stop; never improvise one. Read the matching reference in full, apply that one style, and don't blend styles or borrow motifs.

| Style | Suits | Text in image | Reference |
| --- | --- | --- | --- |
| Everyday Doodle | Witty, human-scale vignettes of tasks and actions. The default | Whitelisted fields | [everyday-doodle.md](references/everyday-doodle.md) |
| Scientific Editorial | Explaining a system, process or research | Short whitelisted labels | [scientific-editorial.md](references/scientific-editorial.md) |
| Prism Grain Silhouette | Calm, inspirational posters on growth, ambition, courage | None | [prism-grain-silhouette.md](references/prism-grain-silhouette.md) |
| Spectrum Grain Collage | Bold retro-contemporary images on momentum or a launch | None | [spectrum-grain-collage.md](references/spectrum-grain-collage.md) |
| Blue-Glow Halftone Concept | One metaphor from two unlikely objects, Swiss editorial | None | [blue-glow-halftone.md](references/blue-glow-halftone.md) |
| Luminous Glitch Hologram | Technology, AI, innovation or data, one glowing subject on black | None | [luminous-glitch-hologram.md](references/luminous-glitch-hologram.md) |

The last four styles are text-free; read [text-free-rules.md](references/text-free-rules.md) with them. A text-free style can't carry rendered fields, so when the content has rendered fields choose Everyday Doodle or Scientific Editorial.

## Compose

- Fill the reference's placeholders with concrete values from the supplied content, and include its scene, treatment and avoid rules as requirements.
- Preserve the content's meaning, item count and order; don't add subjects, drop items or invent facts to fit the style. Multi-item content gets one coordinated vignette or study per item.
- Preserve rendered fields verbatim as the text whitelist. Non-rendering context guides subjects, poses and composition only.
- Honour the caller's exclusions for previously used objects and characters. Choose object, transformation, pose and contact together so the scene is coherent.

## Return

- Mark generation instructions as non-rendering, not as image text.
- **Called by another skill:** return the prompt internally with style and settings as separate metadata; don't post per-item prompts to chat.
- **Direct user request:** show the prompt as Markdown with style and settings alongside.
- Never generate an image, write a file, or claim an image was created. Write chat text per `chief-os-design`: Voice.

## Illustrated Page

A caller that assembles many vignettes into one page asks for `chief-os-image-prompt`: Illustrated Page. Read [illustrated-page.md](references/illustrated-page.md): it sets the per-item calls, the shared page blocks, assembly and the generation check.
