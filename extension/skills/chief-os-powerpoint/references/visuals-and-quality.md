# Visuals, Accessibility, and Quality

Rules for images, icons, charts, diagrams and accessibility, plus the checks that gate delivery. Tokens and type come from [design-system.md](design-system.md).

## Images

- Use an image only for evidence, context, scale or emotional relevance. One dominant image or a structured gallery, never scattered thumbnails.
- Crop to cover, preserving the subject. Full bleed only when quality supports it. Never put text on a high-detail area; use a solid or translucent scrim when contrast needs it.
- Every illustration comes from `chief-os-image-prompt`, as [images.md](images.md) sets.

## Icons

Use the `Segoe Fluent Icons` font as separate objects with a label or nearby text, never inline with text. Sizes 16–20 pt (labels), 24–32 pt (content), 40–48 pt (pillars), 64 pt (rare). One style and weight per slide, inherited colour, no decorative bullets, no mixing with emoji or other icon sets. Make sure the font is installed before export; otherwise use an approved SVG or simple shape, never a missing-character box.

## Charts and diagrams

- Start from the analytical question. Bars for category comparison, lines for time, scatter for relationships; pie or doughnut only for simple part-to-whole with five categories or fewer.
- When the title points to one insight, highlight it in Ink and neutralise the rest in Sand. Label data directly; include units and period; consistent precision; bar axes start at zero (disclose any exception); no unlabelled secondary axis. No 3D, bevels, reflections, heavy shadows, gauges or gradient fills.
- Diagrams explain structure, not decorate. Connectors attach cleanly to boundaries. Arrows mean direction, causality or sequence; plain lines mean association; dashed lines mean optional, future or inferred (label if ambiguous). Peer shapes share a size, unrelated objects sit at least 0.18 in apart, labels stay horizontal, at most three shape styles per slide.

## Accessibility

Alt text on meaningful images, charts and diagrams (and decorative ones marked decorative). Reading order: title, primary content, supporting content, footer, with z-order matching. Sufficient contrast; meaning never by colour alone. Unique slide titles (hidden where a visual slide lacks one). Descriptive link text. Simple tables with header rows. Captions or transcripts for embedded media.

## Delivery checks

Block export on overlap, overflow, a missing font or an accessibility failure. Before delivery, render every slide and confirm:

- Nothing overlaps unintentionally or crosses the safe area (except intended full bleed), fonts resolve without substitution, icons render as glyphs, images keep aspect ratio and resolution.
- Charts show labels, units and periods; reading order is logical; titles tell the story in sequence; layouts are varied but the style is consistent; content stays editable.
- Every transition and animation matches `chief-os-motion` for PowerPoint, and the deck reads fully with animation off.
- Every generated image came from a `chief-os-image-prompt` call and renders no text.
- No placeholder text remains. Deliver the final `.pptx`, not only previews.
