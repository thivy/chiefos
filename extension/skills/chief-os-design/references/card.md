# Card

The card of ChiefOS, in any medium. The medium sets sizes, spacing, and effects in its own units, and states only what differs from this file.

## Use

A card groups, contains, or compares peer items. Never nest a card in a card.

## Surface

- A rounded rectangle with a small radius, a faint Ink outline (the Card border tint), and a soft shadow. No gradient.
- A card that holds an item takes a pastel. Rotate Sage, Lemon, Lilac, and Sand strictly in that order, in reading order. The four are peers, not status colours. Sky and Blush stay out of the rotation.
- A card that only supports the others, such as an overview, is White, with no shadow and no corner marks.
- Peer cards in one row share one height and one top edge.
- Colours and text colours follow [palette.md](palette.md).

## Parts and Order

The order is fixed, and a card uses each part that it has content for:

1. **Corner marks.** Four 2 × 2 grids of round Ink dots, one near each corner, at reduced opacity, behind the text and decorative. Using row-major indices, hide dot 3 at top left, 2 at top right, 1 at bottom left, and 0 at bottom right, which leaves three dots per corner.
2. **Header.** One or two caption lines: a time or other short fact, then a source icon and a short label. Each line stays on one line.
3. **Content.** The title, then the summary under it.
4. **Footer.** Only when the card concerns a person: the name above the role. The medium decides whether to show a picture.
5. **Next step.** Only when an action is owed: a full-width Hairline rule, then a lightbulb icon with the label `Next step`, then the action text. When the item is done, the action text takes a strike-through. In a row of peer cards, this part sits at the bottom of each card.
6. **Toggle.** Web only, on a card that holds an item. It is always last.
