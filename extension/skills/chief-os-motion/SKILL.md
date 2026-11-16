---
name: chief-os-motion
description: "One ChiefOS motion style for web interfaces and PowerPoint decks: timing tokens, easing, a small effect set, and reduced-motion rules."
---

# ChiefOS Motion

One motion style, in two media. Motion explains, orients, or paces. It never decorates. A medium reference maps this style to code or to PowerPoint.

## Resolve the Medium

Read only the reference that matches the work: [web.md](references/web.md) for web interfaces, [powerpoint.md](references/powerpoint.md) for decks. Read both, with the same tokens, when the work covers both.

## Invariants

- **Purposeful.** Every animation orients, shows a relationship or sequence, gives feedback, or directs attention. Remove any that does none.
- **Frequency.** The more often it is seen, the quieter it is. A per-screen transition is the subtlest motion.
- **Spatial consistency.** Fixed chrome (title, footer, page number, navigation) never animates. A persisting element changes by continuity, not by leaving and returning.
- **One style.** The same effects, tokens and easing everywhere, timed per screen as one movement with one finish.
- **Reduced motion.** The static state is complete and correct; motion never carries meaning it lacks. Honour the reduced-motion setting.
- **Cheap properties only.** Move, scale and fade; never animate a property that forces layout.

## Vocabulary

- **Use:** fade, float in (short rise plus fade, for a supporting group), reveal/clip/line drawing (from where reading starts), stagger (peer items, `stagger-step`), crossfade, continuity/morph/shared-element transition, and the easing roles below.
- **Limited:** delay (stagger only); hover and press feedback, scroll reveal (once per element), page/view transition (one for the whole product), skeleton (static or one fade), spinner (only for a wait the viewer caused; may loop linear; static under reduced motion), drag (as the interaction needs), pulse (once, on the one element that must stand out).
- **Never:** slide in, scale in (except inside continuity), pop, bounce, spring, overshoot, direction-aware transitions, loops, marquee, shimmer, idle animation, typewriter, text morph, number tickers (a number fades in), parallax, scroll-driven animation, character motion.

## Tokens

`motion-fast` 200 ms (text lines, small shapes, exits); `motion-base` 350 ms (groups, images, charts, cards, panels); `motion-slow` 500 ms (section dividers, continuity); `stagger-step` 100 ms between peer items; `stagger-max` 5 items (animate longer sets as one group); `budget` 1.5 s from the start of a screen or slide to its finished state; `transition` 400 ms, the one transition between screens or slides.

### Easing roles

Entrances and responses to the viewer: ease-out. An element already on screen moving A to B: ease-in-out. Exits: ease-out at `motion-fast`. Never linear (except spinners), ease-in, bounce or auto-reverse. The medium reference gives the exact curve.

## The Four Effects

Use only these: **Fade** (entrance, exit, transition); **Float in** (shortest rise the medium allows, with fade, for a supporting group); **Reveal** (wipe or clip of a line, axis, bar or timeline from where reading starts); **Continuity** (morph or shared-element transition when one element persists across states).

## Build Rules by Role

Fixed chrome: none. Primary content (image, chart, table, diagram): arrives with the transition, or fade at `motion-base` when it must follow. Body points: fade at `motion-fast`, one paragraph at a time, with stagger. Supporting groups (callout, metric row, sidebar): float in at `motion-base` after the primary content. Peer items (cards, steps, pillars): fade with `stagger-step` in reading order, up to `stagger-max`. Line, axis, connector, timeline: reveal at `motion-base`. Chart: appears whole, by series only when order is the argument. Table: none, emphasise with colour. Large number: fade at `motion-base` with its label. Emphasis: one optional pulse after the screen has built.

Animate text by paragraph, never by letter or word. Build in reading order. More than six animated groups on a screen means simplify it.

## Reduced Motion

The static state, read with all motion off, must be complete and correct. No looping, auto-reversing or flashing motion (nothing flashes more than three times per second), and nothing starts from a timer alone. The medium reference says how the viewer turns motion off.

## Workflow

1. **Plan** before any code or slides: per screen or slide, the transition and each build with effect, token and trigger.
2. **Apply** using tokens by name, never scattered literals.
3. **Check** against this file and the medium reference; motion can't be seen in a still, so check from code or the animation list.
4. **Report** effects, tokens, trigger mode and how to turn motion off. If a tool can't write animations, say so and give the plan; never fake motion.
