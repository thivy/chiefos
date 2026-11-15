# Text-Free Rules

Shared rules for the styles that render no text and no real-looking people: Prism Grain Silhouette, Spectrum Grain Collage, Blue-Glow Halftone Concept, and Luminous Glitch Hologram. Each of those styles states only what differs. This file is not a style.

## Text

- The image renders no text at all: no letters, words, numbers, digits, captions, labels, quotations, logos, watermarks, signatures, file names, or symbols that read as writing.
- The text whitelist is empty. When the caller supplies fields to render, do not use a text-free style. Report that, and name the styles that do render text: Everyday Doodle and Scientific Editorial.
- When the caller needs numbers or words on the finished artwork, they add them afterwards. Leave negative space for them by keeping the subject off the area the caller names.

## People

- The image contains no real-looking human: no photorealistic person, face, eyes, lips, skin, hair detail, hands, or body.
- Describe a figure by silhouette, clothing, and pose only. Never describe a face, age, skin, or ethnicity, because that pushes a model towards realism.
- Never use the words `photorealistic`, `lifelike`, or `portrait` for a figure.
- Where a human idea is needed, use one of these stand-ins, as the style allows: a faceless stylised silhouette, a classical marble statue, a faceless mannequin, a wooden artist's manikin, a chrome robot, a wireframe or crystalline figure, or a flat graphic silhouette. A style names which of these it allows.
- Otherwise, show the idea with a symbol:

| Human idea             | Symbol                                                             |
| ---------------------- | ------------------------------------------------------------------ |
| Leadership, guidance   | A lighthouse, a compass, a north star                              |
| Teamwork, connection   | A flock of birds in formation, interlocking rings, a constellation |
| Growth, progress       | A blooming flower, a sprouting seedling, a rising rocket           |
| Creativity, ideas      | A glass light bulb, a hummingbird, a prism splitting light         |
| Reaching out, helping  | Two branches meeting, a bridge of light                            |
| Thinking, intelligence | A chess knight, an owl, a branching coral                          |

## Composition

- One hero subject and one idea, in generous negative space. Do not add a second focal point.
- Keep the style's palette locked. An extra colour breaks the look.

## Closing Lines

Models drift towards text and realistic people, so end every composed prompt with both of these sentences, and repeat them at the start of the prompt:

- `Strictly no real-looking humans: no photorealistic people, no realistic faces, eyes, skin texture, or hair detail.`
- `Strictly no text, no letters, no words, no numbers, no typography, no captions, no logos, no watermarks, no signatures.`

Mark both as instructions for the image model, never as image text.
