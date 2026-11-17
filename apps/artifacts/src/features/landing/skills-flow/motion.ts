// Mirrors the CSS motion tokens in index.css, in seconds, for Motion's JS animations.
const DURATION = { fast: 0.2, base: 0.35, slow: 0.5, press: 0.12, reduced: 0.15 } as const;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

function fade(reduced: boolean | null, duration: number = DURATION.base) {
  return { duration: reduced ? DURATION.reduced : duration, ease: EASE_OUT };
}

export { DURATION, EASE_IN_OUT, EASE_OUT, fade };
