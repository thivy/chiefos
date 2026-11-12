# Palette

The colours of ChiefOS. Every medium takes its colours from here. The `oklch` value is the source of truth, and the hex is the fallback for engines and tools that do not read `oklch`.

| Token      | Web custom property | `oklch`                      | Hex       | Use                                              |
| ---------- | ------------------- | ---------------------------- | --------- | ------------------------------------------------ |
| Warm Paper | `--background`      | `oklch(0.978 0.013 56.256)`  | `#fff6f0` | Page or slide background                         |
| Ink        | `--foreground`      | `oklch(0.258 0.038 59.8)`    | `#311f10` | All text, icon strokes, corner dots              |
| White      | `--card`            | `oklch(1 0 0)`               | `#ffffff` | Summary cards and cards without an item          |
| Sage       | `--card-sage`       | `oklch(0.857 0.05 122.449)`  | `#cad6b2` | Card surface                                     |
| Lemon      | `--card-lemon`      | `oklch(0.915 0.09 90.159)`   | `#fae19d` | Card surface                                     |
| Lilac      | `--card-lilac`      | `oklch(0.824 0.036 303.716)` | `#cac0d9` | Card surface                                     |
| Sand       | `--card-sand`       | `oklch(0.856 0.051 67.059)`  | `#e7caad` | Card surface                                     |
| Sky        | `--card-sky`        | `oklch(0.858 0.045 237.412)` | none      | Reserved. Outside the rotation and outside decks |
| Blush      | `--card-blush`      | `oklch(0.853 0.047 17.284)`  | none      | Reserved. Outside the rotation and outside decks |
| Focus ring | `--ring`            | `oklch(0.705 0.015 286.067)` | `#b0aeb6` | Keyboard focus. Web only                         |
| Avatar     | `--avatar`          | `oklch(0.987 0.022 95.277)`  | `#fffbeb` | Empty avatar circle. Web only                    |

## Tints

Where the medium supports alpha, derive every tint from Ink with an alpha, never a separate grey:

| Tint        | Alpha of Ink | Use                            |
| ----------- | -----------: | ------------------------------ |
| Card border |           5% | Card outline                   |
| Hairline    |          10% | Rules, such as above Next step |
| Muted text  |          60% | Captions and metadata          |
| Body text   |          70% | Card summaries                 |

Where the medium does not support alpha, as in email and some slide objects, use these solid values:

| Tint       | Hex       |
| ---------- | --------- |
| Hairline   | `#f5ebe3` |
| Muted text | `#76685e` |

## Rules

- Sage, Lemon, Lilac, and Sand are surface colours. Never use one as a text colour.
- Text and icons on a pastel are Ink. Muted text is for White and Warm Paper only, because it is too faint on a pastel.
- Use no colour outside this palette.
