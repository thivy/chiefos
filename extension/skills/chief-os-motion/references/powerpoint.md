# Motion for PowerPoint

Maps the [motion style](../SKILL.md) to PowerPoint transitions and animations. The tokens, effects, and build rules of the shared style apply unchanged. This file gives the PowerPoint settings and the defaults for each slide layout of the `chief-os-powerpoint` skill. Plan motion with the rest of the slide plan, before any rendering.

## Tokens in PowerPoint

Use the shared [tokens](../SKILL.md#tokens) in seconds. Measure `budget` from the end of the slide transition. This file restates no value.

### Easing

PowerPoint has no spring or cubic-bezier control. Use its smooth-start and smooth-end settings, and set both explicitly on every animation, so that the result does not depend on the defaults.

| Role                                            | PowerPoint setting                                | Vocabulary      |
| ----------------------------------------------- | ------------------------------------------------- | --------------- |
| Entrance, and any response to the audience      | Smooth end on, smooth start off                   | Ease-out        |
| An element already on screen moving from A to B | Smooth start on, smooth end on                    | Ease-in-out     |
| Exit                                            | Smooth end on, smooth start off, at `motion-fast` | Ease-out, short |
| Never                                           | Linear, bounce end, auto-reverse                  | Linear, bounce  |

## Effects in PowerPoint

| Effect     | PowerPoint effect                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Fade       | Fade entrance, and the Fade slide transition                                                    |
| Float in   | Float In entrance, direction Up, with the shortest travel the effect allows                     |
| Reveal     | Wipe entrance, from the side where reading or the data starts. Left for left-to-right languages |
| Continuity | The Morph slide transition, between two consecutive slides that share a named object            |

Emphasis is one Pulse, played once, on the one element a slide exists to highlight. It is optional.

## Slide Transitions

- Use **Fade**, at the `transition` token, on every slide. This includes the title slide and section dividers.
- Use **Morph**, at `motion-slow`, in place of Fade only when two consecutive slides share an object that changes position, size, or emphasis. Give each persisting object the same name on both slides, with the `!!` prefix, in the Selection Pane. Never use Morph just because it is available.
- Never use another transition: no Push, Cover, Split, Zoom, Cube, Vortex, Dissolve, Ripple, or Flash. Never add a transition sound.
- Use the same transition in both directions.

## Build Rules for Slides

The shared build rules apply. On a slide:

- The title, footer, and page number arrive with the transition and have no animation.
- A table has no animation. Highlight a row or cell with a colour change.
- A full-page image or a quote has no animation beyond the transition. Overlay text uses Fade.
- A generated image has no animation of its own. It arrives with the transition, or by Fade at `motion-base` when it must follow the title.
- Do not animate an element that sits behind another element.
- Appendix slides have no animation.

## Timing and Triggers

- Choose one trigger mode for the deck and state it in the final report.
  - **Automatic** (default): the first build starts After Previous right after the transition, and every later build is After Previous or With Previous. The presenter never needs a click to see a finished slide.
  - **Presenter-paced**: only when the user asks. Use On Click for each group, never for a single element, and keep the stagger inside a group With Previous or After Previous.
- The Animation Pane order must match the reading order set for accessibility.
- Every item on a slide must end within `budget`.
- A deck of more than 20 slides uses transitions and the primary build only. Cut the supporting builds, because the audience sees them too often.

## Layout Defaults

| Layout                             | Motion                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| L01 Title slide                    | Fade transition. Title, subtitle, and image arrive with it                                              |
| L02 Section divider                | Fade transition at `motion-slow`. Label, title, and framing line enter by Fade with `stagger-step`      |
| L03 Executive statement            | Statement arrives with the transition. Evidence line enters by Fade                                     |
| L04 Title and body                 | Body points enter by Fade, one at a time                                                                |
| L05 Text and image                 | Text arrives with the transition. Image enters by Fade                                                  |
| L06 Full-page image                | Transition only                                                                                         |
| L07 Image gallery                  | Images enter by Fade with `stagger-step`                                                                |
| L08 Large number                   | Number enters by Fade. Interpretation follows by Float in                                               |
| L09 Metric row                     | Metrics enter by Fade with `stagger-step`                                                               |
| L10 Data insight                   | Chart appears whole. Interpretation follows by Float in                                                 |
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

- Follow the shared [reduced-motion rules](../SKILL.md#reduced-motion). Test the deck by reading the static slides.
- Tell the user in the final report that PowerPoint can play the deck without animation (Slide Show, Set Up Slide Show, Show without animation), and that this is the setting for an audience or a presenter who needs reduced motion.

## Never in PowerPoint

Bounce, Spin, Grow and Turn, Swivel, Boomerang, Pop, Spring, Zoom, Dissolve, Checkerboard, Random Bars, Typewriter or any by-letter effect, a looping or auto-reversing effect, a sound, and a motion path.

## Authoring and Checking

- Write the transitions and animations into the `.pptx`. If the tools of the session cannot write them, deliver the static deck, say so plainly, and give the motion plan per slide in the report. Never fake motion with duplicated slides.
- A slide image render does not show motion. Check motion from the animation list of each slide: effect, duration, delay, trigger, and easing. Every value must match this file.
- Check that every slide uses the same transition family, that every persisting object name matches for Morph, and that no slide exceeds `budget`.
