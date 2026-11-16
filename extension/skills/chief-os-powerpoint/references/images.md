# Slide Images

Every generated illustration comes from `chief-os-image-prompt`. Never write, paraphrase, edit, batch or reuse an image prompt, and never use another image source for an illustration. Plan images while planning the deck and generate them while designing slides.

## Where to use one

- **Required** when a slide has an image region: L05, L07. **Optional** as a quiet motif: L01, L02, L03, L22. **Never** elsewhere. Don't use one in L06 (overlay text can't sit on its detail); use L05 visual-led instead.
- Not for charts, tables, diagrams or data, logos, screenshots, real people, products or places, evidence (use the user's own file), or quotation portraits.
- On at most half the slides and at most one per slide (galleries excepted). Record the reason in the plan, for example `illustration of the bottleneck metaphor`.

## Style

Pick one named style from those `chief-os-image-prompt` lists, use it for every image in the deck, and name it in each call and in the final report. `Everyday Doodle` is the default. Don't describe the style yourself. Each style has its own background: treat it as part of the picture, crop it into its own region, and don't blend or recolour it.

## One call per image, in slide order

Pass:

- **Content:** the one idea the image carries, from the slide's title and points. It never adds a claim, number, name or fact.
- **Text whitelist:** empty. Slide text stays in editable text objects.
- **Style:** the deck style.
- **Format:** the aspect ratio of the image region, from its inches on the grid, to the nearest common ratio (one ratio per gallery).
- **Exclusions:** objects and characters of every earlier call in the deck, so each image is distinct.

Start fresh each run; never reuse an earlier prompt or image.

## Generate and place

Generate each image from the returned prompt, confirm it is non-empty, and retry once on failure; if it fails again, switch that slide to a text-led layout and report it. Place it unstretched in its region. Keep working image files out of the output folder (the `.pptx` is the only deliverable). Alt text says what the image shows and why it is there, without repeating the title. The image has no animation of its own: it arrives with the transition or fades, per `chief-os-motion`.

## Check

The number of calls equals the number of images; no image holds text, placeholders or invented facts; all share one style with no repeated object or character; none sits behind overlay text or breaks the safe area.
