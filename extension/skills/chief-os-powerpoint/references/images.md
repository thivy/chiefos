# Slide Images

Every generated illustration in a deck comes from the `chief-os-image-prompt` skill. Never author, paraphrase, edit, batch, or reuse an image prompt yourself, and never use another image source for an illustration. Run this reference in step 2 to plan the images, and again in step 3 to generate them.

## Where to Use a Generated Image

Plan an image only where the slide's message gains from an illustration.

| Use                                         | Layouts            |
| ------------------------------------------- | ------------------ |
| Required when the slide has an image region | L05, L07           |
| Optional, as a quiet motif or accent        | L01, L02, L03, L22 |
| Never                                       | All other layouts  |

Do not use a generated image for:

- a chart, table, diagram, or any data
- a logo, a screenshot, or a real person, product, or place
- anything the slide offers as evidence. Use the user's own photo or file for evidence
- a quotation portrait

Do not put a generated image on more than half of the slides. Use at most one on a slide, except in a gallery (L07). Do not use L06 for a generated image, because overlay text cannot sit on its detail. Use L05 with a visual-led split instead.

An image needs a reason. Write that reason in the slide plan as the required visual type, for example `illustration of the bottleneck metaphor`.

## Choose One Style for the Deck

Pick one named style and use it for every image in the deck. Never mix styles.

- `Everyday Doodle` is the default.
- `Scientific Editorial` suits technical, research, and analytical decks.

Use only a style that `chief-os-image-prompt` lists. State the style in the final report. Name the style in each call. Do not describe it yourself.

The Everyday Doodle style sits on a warm ivory studio background. Treat that background as part of the picture. Crop the image into its own region on the slide. Do not blend it into the slide background and do not recolour it.

## Compose One Prompt per Image

Make one `chief-os-image-prompt` call per image, in slide order. Pass:

- **Content.** The one idea of the slide that the image must carry, taken from the slide's own title and points. The image supports the message. It never adds a claim, a number, a name, or a fact that the slide does not hold.
- **Text whitelist.** Empty. The image renders no text. All slide text stays in editable text objects.
- **Style.** The deck style, by name.
- **Format.** The aspect ratio of the image region, worked out from its width and height in inches on the grid, to the nearest common ratio. A gallery (L07) uses one ratio for all images.
- **Exclusions.** The objects and characters of every earlier call in this deck, so that each image is distinct.

Start fresh each run. Never reuse a prompt or an image from an earlier run.

## Generate and Place

1. Generate each image from the returned prompt with the image generation tool of the session.
2. Confirm the result is a non-empty image before you place it. If it fails, try once more with the same prompt. If it fails again, change the slide to a text-led layout from [layouts.md](layouts.md), and report the failure.
3. Place the image in its region as the [image rules](visuals-and-quality.md#images-and-visual-assets) set, never stretched.
4. Keep working image files out of the output folder. The `.pptx` is the only deliverable.
5. Set alt text as [Accessibility](visuals-and-quality.md#accessibility) sets. Say what the image shows and why it is on the slide, and do not repeat the slide title.
6. Give the image no animation of its own. It arrives with the slide transition, or by Fade as the [motion reference](../../chief-os-motion/references/powerpoint.md) sets.

## Check

- Every generated image came from a `chief-os-image-prompt` call. The number of calls equals the number of generated images.
- No image holds text, a placeholder, or an invented fact.
- All images share one style, and no two images show the same object or character.
- No image sits behind overlay text, and no image breaks the safe area.
