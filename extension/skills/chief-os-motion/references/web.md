# Motion for the Web

Maps the [motion style](../SKILL.md) to CSS and JavaScript. Use the tokens by name, as custom properties, and never as scattered literal values.

## Tokens

```css
:root {
  --motion-fast: 200ms;
  --motion-base: 350ms;
  --motion-slow: 500ms;
  --motion-transition: 400ms;
  --motion-press: 120ms;
  --stagger-step: 100ms;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --float-distance: 8px;
}
```

`--motion-press` is for hover and press feedback only. It is the one token that the shared style does not set, because a pointer needs a faster answer than a slide.

## Effects

| Effect     | Implementation                                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fade       | `opacity` from 0 to 1, `--ease-out`, `--motion-fast` for text and `--motion-base` for groups                                                                                     |
| Float in   | `opacity` and `translateY(var(--float-distance))` to 0, `--ease-out`, `--motion-base`. Never more than 12px                                                                      |
| Reveal     | `clip-path: inset(0 100% 0 0)` to `inset(0)` for left to right, or the logical-direction equivalent. `--ease-out`, `--motion-base`                                               |
| Continuity | The View Transitions API with a shared `view-transition-name`, or a layout animation that animates `transform` from the old box to the new one. `--ease-in-out`, `--motion-slow` |

Fall back to plain Fade where the browser lacks the View Transitions API. Never snap an element to a new position or size when continuity is possible.

## Rules

- Animate `transform` and `opacity` only. Use `clip-path` for a reveal. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`, because they force layout on every frame.
- Origin-aware: a popover, menu, or tooltip grows from the control that opened it, so set `transform-origin` to that anchor. Scale from 0.96 or more, never from 0, and always with a fade.
- Press feedback: `transform: scale(0.97)` at `--motion-press`, `--ease-out`. Hover changes colour or opacity only, at `--motion-press`, and only under `@media (hover: hover)`. Neither is ever the only signal of a state.
- Interruptible: use CSS transitions, not keyframes, for state that the user can reverse. The animation then redirects from its current value.
- Exits follow the exit row of the shared [easing roles](../SKILL.md#easing-roles).
- Stagger with a custom property per item, `animation-delay: calc(var(--i) * var(--stagger-step))`, for at most five items. Animate a longer list as one group.
- One page or route transition for the whole product, Fade at `--motion-transition`. The same in both directions.
- Scroll reveal runs once per element, with Fade or Float in. Never scrub an animation with scroll position and never use parallax.
- Use `will-change` only on an element that is about to animate, and remove it after. Never apply it to a whole list.
- Numbers that change in place use `font-variant-numeric: tabular-nums` and no ticker.
- Show a skeleton as a static block, or with one Fade. Never use a moving sheen.

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Prefer a targeted rule over the blanket rule when the product has few animations. Under `reduce`, remove Float in, Reveal, scale, and continuity motion. Keep a Fade of 150ms or less only where it prevents a hard flash. The page must stay complete and usable without any of it.

Read the setting in JavaScript with `window.matchMedia("(prefers-reduced-motion: reduce)")` and listen for changes. In React, put that in one hook and use it for any animation that JavaScript drives.

## Check

- Every duration, delay, and curve is one of the tokens above.
- Only `transform`, `opacity`, and `clip-path` change in any animation. Check with the browser's performance panel that there is no layout work in an animation frame.
- Nothing uses a term that the shared [vocabulary](../SKILL.md#vocabulary) marks Never.
- The page works with `prefers-reduced-motion: reduce` set, and with all CSS animation off.
- Keyboard focus stays visible during and after every transition, and no animation moves focus.
