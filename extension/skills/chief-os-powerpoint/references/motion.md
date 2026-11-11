# Motion

One motion style for the whole deck. Motion explains, orients, or paces. It never decorates. The terms below come from the animation vocabulary at animations.dev, mapped to what PowerPoint can do. Read this before planning any slide, because the motion plan is part of the slide plan.

## Principles

- **Purposeful animation.** Every animation must do one job: orient the audience, show a relationship, show a sequence, or direct attention to the one thing that matters. Remove any animation that does none.
- **Frequency of use.** The more often the audience sees an animation, the shorter and subtler it is. A transition repeats on every slide, so it is the quietest motion in the deck.
- **Spatial consistency.** An element keeps its identity and position across states. The title, footer, and page number never animate. A persisting object uses Morph, so the audience never loses track of where it went.
- **Orchestration.** Time the builds on a slide so they read as one coordinated motion with one finish, not as separate effects.
- **Perceived performance.** Short, ease-out motion feels fast. A slide must be readable at once and complete in 1.5 seconds or less after its transition ends.
- **Reduced motion.** The deck must make full sense with every animation off. Motion never carries meaning that the static slide lacks.

## Vocabulary Mapping

| Term                                                 | Meaning                                     | In this deck                                                                          |
| ---------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| Fade in / Fade out                                   | Opacity changes                             | Default entrance for text, images, and shapes. Default slide transition               |
| Slide in                                             | Enters from off-screen                      | Not used. Use Float in instead                                                        |
| Float in                                             | Short travel plus fade                      | Supporting groups enter with Float In, Up. The only travel direction in the deck      |
| Scale in                                             | Grows to full size                          | Not used, except in a Morph                                                           |
| Pop in                                               | Overshoots, then settles                    | Never used                                                                            |
| Reveal                                               | Content is uncovered by a mask              | Wipe for lines, bars, axes, and timelines, in the direction of reading or of the data |
| Stagger                                              | Items follow one another with a small delay | Peer items in one group, at 0.1 s intervals                                           |
| Orchestration                                        | Animations timed as one motion              | One group per slide step, finishing together                                          |
| Delay                                                | Time before the animation starts            | Only for stagger. No other delay                                                      |
| Duration                                             | How long it takes                           | Fixed by the tokens below                                                             |
| Crossfade                                            | One element fades out as another fades in   | Replace content in place with Fade out and Fade in at the same time                   |
| Continuity transition                                | A change that connects before and after     | Morph between consecutive slides that share an object                                 |
| Morph, shared element transition                     | One shape turns into another, or travels    | The Morph slide transition                                                            |
| Layout animation                                     | Size or position change animates            | Morph only. Never snap and never hand-animate                                         |
| Direction-aware transition                           | Direction follows the navigation            | Not used. One transition for forward and back                                         |
| Line drawing                                         | A path draws itself                         | Wipe on a connector or axis line                                                      |
| Easing                                               | Rate of speed change                        | Fixed by the tokens below                                                             |
| Spring, bounce, overshoot                            | Physics-based motion                        | Never used                                                                            |
| Pulse                                                | A gentle repeating change                   | Emphasis once on one element, never repeating                                         |
| Loop, marquee, orbit, float, shimmer, idle animation | Motion that runs on its own                 | Never used                                                                            |
| Typewriter, text morph, number ticker                | Characters or digits animate                | Never used. A number enters with Fade                                                 |
| Parallax, scroll, hover, press, drag, ripple         | Pointer or scroll driven motion             | Not applicable to a slide show                                                        |
| Anticipation, follow-through, squash and stretch     | Character motion                            | Never used                                                                            |
| Reduced motion                                       | Tone down or remove motion                  | The static deck is the contract. See Reduced Motion                                   |

## Motion Tokens

| Token          |        Value | Use                                                             |
| -------------- | -----------: | --------------------------------------------------------------- |
| `motion-fast`  |       0.20 s | Text lines and small shapes                                     |
| `motion-base`  |       0.35 s | Groups, images, charts, and cards                               |
| `motion-slow`  |       0.50 s | Section dividers and the Morph transition                       |
| `stagger-step` |       0.10 s | Delay between peer items in one group                           |
| `stagger-max`  |      5 items | Longest cascade. Animate a longer set as one group              |
| `slide-budget` |        1.5 s | Longest time from the end of the transition to a finished slide |
| `transition`   | Fade, 0.40 s | The one slide transition                                        |

### Easing

PowerPoint has no spring or cubic-bezier control. Use its smooth-start and smooth-end settings, and set both explicitly on every animation, so that the result does not depend on the defaults.

| Motion                                          | PowerPoint setting                                | Vocabulary      |
| ----------------------------------------------- | ------------------------------------------------- | --------------- |
| Entrance, and any response to the audience      | Smooth end on, smooth start off                   | Ease-out        |
| An element already on screen moving from A to B | Smooth start on, smooth end on                    | Ease-in-out     |
| Exit                                            | Smooth end on, smooth start off, at `motion-fast` | Ease-out, short |
| Never                                           | Linear, bounce end, auto-reverse                  | Linear, bounce  |

## The Four Effects

Use only these. A deck that needs another effect is overdoing it.

1. **Fade.** Entrance for text, images, shapes, and numbers. The slide transition.
2. **Float in, Up.** Entrance for a supporting group that follows the main content, such as a callout or a row of metrics. Use the shortest travel the effect allows.
3. **Wipe.** Reveal of a line, axis, bar, or timeline, from the side where the reading or the data starts. Left for left-to-right languages.
4. **Morph.** The slide transition when a named object persists across two consecutive slides.

Emphasis is limited to one Pulse, played once, on the one element a slide exists to highlight. It is optional.

## Slide Transitions

- Use **Fade**, 0.40 s, on every slide. This includes the title slide and section dividers.
- Use **Morph**, 0.50 s, in place of Fade only when two consecutive slides share an object that changes position, size, or emphasis. Give each persisting object the same name on both slides, with the `!!` prefix, in the Selection Pane. Never use Morph just because it is available.
- Never use another transition: no Push, Cover, Split, Zoom, Cube, Vortex, Dissolve, Ripple, or Flash. Never add a transition sound.
- Use the same transition in both directions.

## Build Rules by Role

| Element                                        | Animation                                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Title, footer, page number, source note        | None. They arrive with the transition                                                               |
| Primary visual: image, chart, table, diagram   | Arrives with the transition, or Fade at `motion-base` when it must follow the title                 |
| Body points and labelled statements            | Fade, `motion-fast`, one paragraph at a time, with `stagger-step`                                   |
| Supporting group: callout, metric row, sidebar | Float in, Up, `motion-base`, after the primary content                                              |
| Peer items: pillars, steps, cards              | Fade with `stagger-step`, left to right then top to bottom, up to `stagger-max`                     |
| Line, axis, connector, timeline                | Wipe, `motion-base`                                                                                 |
| Chart                                          | Appears whole. Animate by series or category only when the order is the argument, with Wipe or Fade |
| Table                                          | No animation. Highlight a row or cell with a colour change, not motion                              |
| Large number                                   | Fade, `motion-base`. Its label and context enter with it                                            |
| Full-page image, quote                         | No animation beyond the transition. Overlay text uses Fade                                          |
| Highlighted element                            | One optional Pulse after the slide has finished building                                            |
| Appendix slides (L25)                          | None                                                                                                |

Animate text by paragraph, never by letter or word. Do not animate an element that sits behind another element.

## Timing and Triggers

- Choose one trigger mode for the deck and state it in the final report.
  - **Automatic** (default): the first build starts After Previous right after the transition, and every later build is After Previous or With Previous. The presenter never needs a click to see a finished slide.
  - **Presenter-paced**: only when the user asks. Use On Click for each group, never for a single element, and keep the stagger inside a group With Previous or After Previous.
- Build in reading order: primary content, then supporting content. The Animation Pane order must match the reading order set for accessibility.
- Keep one orchestrated finish: every item on a slide must end within `slide-budget`.
- A slide with more than six animated groups has too much on it. Simplify the slide.
- A deck of more than 20 slides uses transitions and the primary build only. Cut the supporting builds, because the audience sees them too often.

## Layout Defaults

| Layout                             | Motion                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| L01 Title slide                    | Fade transition. Title and subtitle arrive with it. Image arrives with it                               |
| L02 Section divider                | Fade transition at `motion-slow`. Label, title, and framing line enter by Fade with `stagger-step`      |
| L03 Executive statement            | Statement arrives with the transition. Evidence line enters by Fade                                     |
| L04 Title and body                 | Body points enter by Fade, one at a time                                                                |
| L05 Text and image                 | Text arrives with the transition. Image enters by Fade                                                  |
| L06 Full-page image                | Transition only                                                                                         |
| L07 Image gallery                  | Images enter by Fade with `stagger-step`                                                                |
| L08 Large number                   | Number enters by Fade. Interpretation follows by Float in, Up                                           |
| L09 Metric row                     | Metrics enter by Fade with `stagger-step`                                                               |
| L10 Data insight                   | Chart appears whole. Interpretation follows by Float in, Up                                             |
| L11 Comparison                     | Left side, then right side, by Fade. Recommendation marker by Fade                                      |
| L12 Before and after               | Before arrives with the transition. After enters by Fade. Use Morph when the two states share an object |
| L13 Process                        | Steps enter by Fade with `stagger-step`. Connectors enter by Wipe                                       |
| L14 Timeline and roadmap           | Axis enters by Wipe. Milestones enter by Fade with `stagger-step`                                       |
| L15 to L17 Frameworks and matrices | Peer items enter by Fade with `stagger-step`. Axis lines enter by Wipe                                  |
| L18 Architecture or ecosystem      | Layers enter by Fade, from the primary flow start. Connectors enter by Wipe                             |
| L19 Funnel                         | Stages enter by Fade, in order                                                                          |
| L20 Table                          | None                                                                                                    |
| L21 Quote                          | Transition only                                                                                         |
| L22 Recommendation and rationale   | Recommendation arrives with the transition. Rationale enters by Fade                                    |
| L23 Risks and mitigations          | None for a table. Columns enter by Fade for the three-column form                                       |
| L24 Call to action                 | Decision statement arrives with the transition. Next steps enter by Fade with `stagger-step`            |
| L25 Appendix                       | None                                                                                                    |

## Reduced Motion

- The deck must be complete and correct with every animation off. Test it by reading the static slides.
- Never use looping, auto-reversing, flashing, or blinking motion. Nothing flashes more than three times in one second.
- Never start sound, video, or an animation from the pointer or from a timer alone.
- Tell the user in the final report that PowerPoint can play the deck without animation (Slide Show, Set Up Slide Show, Show without animation), and that this is the setting for an audience or a presenter who needs reduced motion.

## Never

Bounce, Spin, Grow and Turn, Swivel, Boomerang, Pop, Spring, Zoom, Dissolve, Checkerboard, Random Bars, Typewriter or any by-letter effect, a looping or auto-reversing effect, a sound, and a motion path.

## Authoring and Checking

- Write the transitions and animations into the `.pptx`. If the tools of the session cannot write them, deliver the static deck, say so plainly, and give the motion plan per slide in the report. Never fake motion with duplicated slides.
- A slide image render does not show motion. Check motion from the animation list of each slide: effect, duration, delay, trigger, and easing. Every value must match this file.
- Check that every slide uses the same transition family, that every persisting object name matches for Morph, and that no slide exceeds `slide-budget`.
