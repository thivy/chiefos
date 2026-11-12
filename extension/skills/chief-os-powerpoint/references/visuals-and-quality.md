# Visuals, Accessibility, and Quality

Rules for images, icons, charts, diagrams, accessibility, and the checks that gate delivery. Tokens and type come from [design-system.md](design-system.md).

## Images and Visual Assets

- Choose an image because it supplies evidence, context, scale, or emotional relevance.
- Use full bleed only when image quality supports the complete slide area.
- Use one dominant image or a deliberately structured gallery. Avoid scattered thumbnails.
- Crop with `cover` behaviour conceptually, preserving the principal subject and key context.
- Never place text on an unprotected high-detail region.
- Apply a solid or translucent scrim when contrast cannot otherwise be guaranteed.
- Add alt text for every meaningful image, as [Accessibility](#accessibility) sets.
- Generate every illustration with `chief-os-image-prompt`, as [images.md](images.md) sets.

## Icons

Use the `Segoe Fluent Icons` font for icons. It is the recommended Windows symbol icon font. It maps many icons to the Unicode Private Use Area and is not intended for inline use with text. Use icons as separate visual objects with accessible labels or nearby text.

### Icon sizing

Use the crisp sizes where possible: 16, 20, 24, 32, 40, 48, or 64 pt.

- 16–20 pt: compact labels and metadata
- 24–32 pt: standard content icons
- 40–48 pt: pillar and feature icons
- 64 pt: rare hero usage

### Icon rules

- Use one icon style and weight throughout a slide.
- Icons inherit the foreground or semantic colour.
- Do not use icons as decorative bullets for ordinary text lists.
- Do not mix Segoe Fluent Icons with emoji, clip art, or unrelated icon sets.
- Use mirrored glyphs for right-to-left layouts when the action has directionality and a mirrored glyph exists.
- Many glyphs use the Private Use Area, so make sure the font is installed before final export. If it is not, replace the icon with an approved SVG or a simple PowerPoint shape. Never allow a missing-character box.

## Charts and Data Visualisation

- Start with the analytical question: comparison, trend, composition, distribution, relationship, or flow.
- Use bars for category comparison, lines for time trends, and scatter plots for relationships.
- Use pie or doughnut charts only for a simple part-to-whole relationship with no more than five categories.
- Use a single highlight colour and neutralise the remaining series where the title points to one insight. Highlight in Ink and neutralise in Sand.
- Place labels directly on data when legible.
- Avoid 3D charts, bevels, reflections, excessive shadows, decorative gauges, and gradient fills.
- Use consistent decimal precision.
- Always include units and time period.
- Begin bar-chart axes at zero unless a clearly disclosed analytical reason requires otherwise.
- Do not show an unlabelled secondary axis.

## Diagrams, Shapes, and Connectors

- Use shapes to explain structure, not to decorate empty space.
- Connectors must attach cleanly to object boundaries.
- Use arrows only for direction, causality, movement, or sequence.
- Use lines without arrowheads for association.
- Use dashed lines for optional, future, inferred, or indirect relationships. Label the meaning where ambiguity is possible.
- Maintain consistent shape size for peer concepts.
- Maintain at least 0.18 in between unrelated objects.
- Diagram labels must remain horizontal unless an axis or spatial convention requires rotation.
- Do not use more than three distinct shape styles on one slide.

## Accessibility

- Add alt text to meaningful images, charts, and diagrams.
- Mark decorative visuals as decorative.
- Set reading order intentionally: title, primary content, supporting content, footer.
- Use sufficient contrast between text and background.
- Do not communicate meaning by colour alone.
- Use descriptive link text.
- Add captions or transcripts for embedded media.
- Use unique slide titles, including hidden titles where a visual slide otherwise lacks one.
- Keep table structures simple and identify header rows.
- Place objects in a logical z-order that matches reading order.

## Quality Gate

Score every slide from 1 to 5 on:

1. Message clarity
2. Narrative contribution
3. Assertion-title quality
4. Visual hierarchy
5. Legibility
6. Composition and alignment
7. Visual relevance
8. Consistency
9. Accessibility
10. Evidence integrity
11. Layout appropriateness
12. Editability
13. Motion purpose and consistency, per the [motion reference](../../chief-os-motion/references/powerpoint.md)

Rules:

- Any score below 3 requires redesign.
- An average below 4 requires another critique pass.
- Accessibility, overlap, overflow, or missing-font failures block export.
- A slide may be visually polished and still fail if the title does not communicate the conclusion.

## Validation and Delivery

Before delivery:

- Render every slide to an image and inspect it at normal presentation size.
- Confirm no object overlaps unintentionally.
- Confirm no text, icon, chart, or image crosses the safe area unless the layout intentionally uses full bleed.
- Confirm fonts resolve correctly and do not substitute unexpectedly.
- Confirm Segoe Fluent Icons render as glyphs rather than missing-character boxes.
- Confirm all images preserve aspect ratio and adequate resolution.
- Confirm chart labels, units, and time periods are present.
- Confirm the reading order is logical.
- Confirm slide titles tell a coherent story when read in sequence.
- Confirm the deck uses a varied but consistent set of semantic layouts.
- Confirm all generated presentation elements remain editable where practical.
- Confirm every transition and animation matches the [motion reference](../../chief-os-motion/references/powerpoint.md), and that the deck reads fully with animation off.
- Confirm every generated image came from a `chief-os-image-prompt` call and renders no text.
- Deliver the final `.pptx`, not only previews or source code.

## Hard Constraints

Every rule in this skill is binding where it is stated, and nothing here overrides it. These are the ones that block delivery, with the place that sets each:

- Layout, type, and density: [design-system.md](design-system.md). It sets the 14 pt text floor, the four-column and two-level limits, the safe area, native fonts, and proportional images.
- Layout choice: [layouts.md](layouts.md). A card grid is never the default.
- Charts, icons, and diagrams: the sections above. They set the ban on 3D and decorative chart effects, and the label rule for icons.
- Evidence and wording: [SKILL.md](../SKILL.md#invariants). It bans fabricated evidence.
- Motion: the [motion reference](../../chief-os-motion/references/powerpoint.md). It bans motion outside the shared style, and looping or flashing motion.
- Illustrations: [images.md](images.md). Every one comes from `chief-os-image-prompt`.
- No unresolved placeholder text.
- No export while a quality-gate blocker remains.
