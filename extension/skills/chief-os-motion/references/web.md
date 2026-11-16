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

- **Fade:** `opacity` 0 to 1, `--ease-out`, `--motion-fast` for text, `--motion-base` for groups.
- **Float in:** `opacity` and `translateY(var(--float-distance))` to 0, `--ease-out`, `--motion-base`. Never more than 12px.
- **Reveal:** `clip-path: inset(0 100% 0 0)` to `inset(0)` (or the logical-direction equivalent), `--ease-out`, `--motion-base`.
- **Continuity:** View Transitions API with a shared `view-transition-name`, or a `transform` layout animation from the old box to the new, `--ease-in-out`, `--motion-slow`. Fall back to Fade.

## Rules

- Animate `transform`, `opacity` and `clip-path` only; never `width`, `height`, `top`, `left`, `margin` or `padding`.
- Popovers and menus grow from their trigger (`transform-origin`), scale from 0.96 or more, always with a fade.
- Press: `transform: scale(0.97)` at `--motion-press`. Hover changes colour or opacity only, under `@media (hover: hover)`. Neither is ever the only signal.
- Use CSS transitions, not keyframes, for reversible state. Exits follow the shared exit role.
- Stagger with `animation-delay: calc(var(--i) * var(--stagger-step))` for at most five items.
- One route transition for the product: Fade at `--motion-transition`, same both directions. Scroll reveal runs once per element. No scrubbing or parallax.
- `will-change` only on an element about to animate. Changing numbers use `tabular-nums`, no ticker. Skeletons are static or one Fade.

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Under `reduce`, drop float, reveal, scale and continuity; keep a Fade of 150ms or less only to avoid a hard flash. For JS-driven animation read `matchMedia("(prefers-reduced-motion: reduce)")` and listen for changes (one hook in React).

## Check

Every duration, delay and curve is a token; only `transform`, `opacity` and `clip-path` animate; nothing uses a Never term; the page works with reduced motion set and with CSS animation off; focus stays visible and is never moved by animation.
