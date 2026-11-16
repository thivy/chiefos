# Motion for PowerPoint

Maps the [motion style](../SKILL.md) to PowerPoint. Plan motion with the slide plan, before rendering. Use the shared [tokens](../SKILL.md#tokens) in seconds, measuring `budget` from the end of the slide transition.

## Easing and effects

PowerPoint has no curves, so set smooth start and end explicitly on every animation: entrances use smooth end on and start off (ease-out); an element moving A to B uses both on; exits use ease-out at `motion-fast`. Never linear, bounce end or auto-reverse.

Fade: Fade entrance and transition. Float in: Float In, direction Up, shortest travel. Reveal: Wipe entrance from where reading starts. Continuity: Morph between consecutive slides sharing a named object. Emphasis: one optional Pulse, once.

## Slide Transitions

- Fade at `transition` on every slide including the title, and at `motion-slow` on section dividers.
- Morph at `motion-slow` instead of Fade only when consecutive slides share an object that changes position, size or emphasis; give it the same `!!` name on both slides in the Selection Pane.
- No other transition and no transition sound. Same transition in both directions.

## Build Rules for Slides

The shared build rules apply, and:

- Title, footer and page number arrive with the transition and don't animate. Tables, appendix slides, full-page images and quotes have no animation beyond the transition. Generated images arrive with the transition or fade at `motion-base` after the title. Don't animate an element behind another.
- Apply the shared roles per layout: the primary statement, chart, image or quote arrives with the transition; peer items (metrics, steps, gallery images, stages, next steps) fade with `stagger-step`; connectors and axes use Wipe; interpretation and supporting text float in afterwards; a chart appears whole.

## Timing and Triggers

- Choose one trigger mode for the deck and state it in the final report.
  - **Automatic** (default): the first build starts After Previous right after the transition, and every later build is After Previous or With Previous. The presenter never needs a click to see a finished slide.
  - **Presenter-paced**: only when the user asks. Use On Click for each group, never for a single element, and keep the stagger inside a group With Previous or After Previous.
- The Animation Pane order must match the reading order set for accessibility.
- Every item on a slide must end within `budget`.
- A deck of more than 20 slides uses transitions and the primary build only. Cut the supporting builds, because the audience sees them too often.

## Reduced Motion

Follow the shared [reduced-motion rules](../SKILL.md#reduced-motion). Tell the user PowerPoint can play the deck without animation (Slide Show, Set Up Slide Show, Show without animation) for audiences or presenters needing reduced motion.

## Never in PowerPoint

Bounce, spin, grow and turn, swivel, boomerang, pop, spring, zoom, dissolve, checkerboard, random bars, by-letter effects, loops, sound, motion paths.

## Authoring and Checking

Write transitions and animations into the `.pptx`; if the session's tools can't, deliver the static deck, say so, and give the per-slide plan. Never fake motion with duplicated slides. Check from each slide's animation list (effect, duration, delay, trigger, easing) that values match this file, every slide uses the same transition family, Morph names match, and no slide exceeds `budget`.
