---
name: chief-os-motion
description: "Use when adding animation or motion to a web interface or a PowerPoint deck: transitions, entrance builds, easing, durations, stagger, hover and press feedback, reduced motion, or a consistent motion style across screens or slides. Applies one motion vocabulary, one set of timing tokens, and one small effect set, then maps them to CSS or to PowerPoint transitions and animations."
---

# ChiefOS Motion

One motion style, in two media. Motion explains, orients, or paces. It never decorates. The terms come from the animation vocabulary at animations.dev. This skill fixes the vocabulary, the timing, and the effect set. A medium reference then maps them to code or to PowerPoint.

## Resolve the Medium

Read the reference that matches the work, and only that one.

- **Web interface** (HTML, CSS, JavaScript, React): read [web.md](references/web.md).
- **PowerPoint deck**: read [powerpoint.md](references/powerpoint.md).

When the work covers both, for example a web version of a deck, read both and keep the same tokens in each.

## Invariants

These hold on every run, whether or not a reference has been read.

- **Purposeful animation.** Every animation does one job: orient the viewer, show a relationship, show a sequence, give feedback, or direct attention to the one thing that matters. Remove any animation that does none.
- **Frequency of use.** The more often the viewer sees an animation, the shorter and subtler it is. A transition that repeats on every screen or slide is the quietest motion in the product.
- **Spatial consistency.** An element keeps its identity and position across states. Fixed chrome, such as a title, footer, page number, or navigation, never animates. A persisting element changes by continuity, not by leaving and returning.
- **Orchestration.** Time the motion on one screen or slide so it reads as one coordinated movement with one finish.
- **One style.** The same effects, the same tokens, and the same easing everywhere. Never add an effect for one screen alone.
- **Reduced motion.** The static state must be complete and correct. Motion never carries a meaning that the static state lacks. Honour the viewer's reduced-motion setting.
- **Cheap properties only.** Move, scale, and fade. Never animate a property that forces layout.

## Vocabulary

Status: **Use** is part of the style. **Limited** is allowed only as the medium reference says. **Never** is not allowed.

| Term                                                 | Meaning                                     | Status  | Rule                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Fade in / Fade out                                   | Opacity changes                             | Use     | Default entrance, exit, and transition                                                                                  |
| Float in                                             | Short rise plus fade                        | Use     | For a supporting group that follows the main content                                                                    |
| Reveal, Clip-path, Mask                              | Content uncovered by a shape                | Use     | For a line, bar, axis, or timeline, from where reading starts                                                           |
| Line drawing                                         | A path draws itself                         | Use     | A reveal on a connector or axis                                                                                         |
| Stagger                                              | Items follow one another with a small delay | Use     | Peer items in one group, with `stagger-step`                                                                            |
| Orchestration                                        | Animations timed as one motion              | Use     | One group per step, finishing together                                                                                  |
| Crossfade                                            | One element fades out as another fades in   | Use     | Replace content in place                                                                                                |
| Continuity transition, Shared element transition     | A change that connects before and after     | Use     | One element travels or resizes, and keeps its identity                                                                  |
| Morph, Layout animation                              | One shape turns into another, or moves      | Use     | Never snap to a new size or position when continuity is possible                                                        |
| Easing                                               | Rate of speed change                        | Use     | Fixed by the easing roles below                                                                                         |
| Delay                                                | Time before the animation starts            | Limited | Only for stagger                                                                                                        |
| Duration                                             | How long it takes                           | Use     | Fixed by the tokens below                                                                                               |
| Press and tap feedback, Hover effect                 | A response to the pointer                   | Limited | Web only, short, and never the only signal                                                                              |
| Scroll reveal                                        | Content enters as it scrolls into view      | Limited | Web only, once per element, with Fade or Float in                                                                       |
| Page transition, View transition                     | Motion between views                        | Limited | Web only, one transition for the whole product                                                                          |
| Slide in, Scale in                                   | Enters from off-screen, or grows            | Never   | Use Float in. Scale only inside a continuity transition                                                                 |
| Pop in, Bounce, Spring, Overshoot                    | Physics motion that overshoots              | Never   | Never overshoot                                                                                                         |
| Direction-aware transition                           | Direction follows navigation                | Never   | One transition in both directions                                                                                       |
| Loop, Marquee, Orbit, Float, Shimmer, Idle animation | Motion that runs on its own                 | Never   | Nothing moves while the viewer reads                                                                                    |
| Pulse                                                | A gentle repeating change                   | Limited | Once, on the one element that must stand out                                                                            |
| Typewriter, Text morph, Number ticker                | Characters or digits animate                | Never   | A number enters with Fade                                                                                               |
| Parallax, Scroll-driven animation                    | Motion tied to scroll position              | Never   | Not part of the style                                                                                                   |
| Skeleton                                             | A placeholder while content loads           | Limited | Web only, static or with one Fade, never a moving sheen                                                                 |
| Spinner, loading indicator                           | A looping signal of a pending state         | Limited | Web only, for a wait the viewer caused or is in. May loop and run linear. Never decorative. Static under reduced motion |
| Anticipation, Follow-through, Squash and stretch     | Character motion                            | Never   | Not part of the style                                                                                                   |
| Drag, Rubber-banding, Swipe to dismiss               | Direct manipulation                         | Limited | Web only, as the interaction itself needs                                                                               |
| Reduced motion                                       | Tone down or remove motion                  | Use     | The static state is the contract                                                                                        |

## Tokens

| Token          |   Value | Use                                                                  |
| -------------- | ------: | -------------------------------------------------------------------- |
| `motion-fast`  |  200 ms | Text lines, small shapes, and exits                                  |
| `motion-base`  |  350 ms | Groups, images, charts, cards, and panels                            |
| `motion-slow`  |  500 ms | Section dividers and continuity transitions                          |
| `stagger-step` |  100 ms | Delay between peer items in one group                                |
| `stagger-max`  | 5 items | Longest cascade. Animate a longer set as one group                   |
| `budget`       |   1.5 s | Longest time from the start of a screen or slide to a finished state |
| `transition`   |  400 ms | The one transition between screens or slides                         |

### Easing roles

| Motion                                          | Role                                     | Vocabulary              |
| ----------------------------------------------- | ---------------------------------------- | ----------------------- |
| Entrance, and any response to the viewer        | `ease-out`                               | Ease-out                |
| An element already on screen moving from A to B | `ease-in-out`                            | Ease-in-out             |
| Exit                                            | `ease-out`, at `motion-fast`             | Ease-out, short         |
| Never                                           | Linear, ease-in, bounce, or auto-reverse | Linear, ease-in, bounce |

The medium reference gives the exact curve or setting for each role.

## The Four Effects

Use only these. A product that needs another effect is overdoing it.

1. **Fade.** Entrance, exit, and transition for text, images, shapes, and numbers.
2. **Float in.** The shortest rise the medium allows, with a fade. For a supporting group.
3. **Reveal.** A wipe or clip of a line, axis, bar, or timeline, from where reading or data starts. Left for left-to-right languages.
4. **Continuity.** Morph, or a shared element transition, when one element persists across two states.

## Build Rules by Role

| Element                                         | Motion                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| Fixed chrome: title, navigation, footer, number | None                                                                      |
| Primary content: image, chart, table, diagram   | Arrives with the transition, or Fade at `motion-base` when it must follow |
| Body points and labelled statements             | Fade at `motion-fast`, one paragraph at a time, with `stagger-step`       |
| Supporting group: callout, metric row, sidebar  | Float in at `motion-base`, after the primary content                      |
| Peer items: cards, steps, pillars               | Fade with `stagger-step`, in reading order, up to `stagger-max`           |
| Line, axis, connector, timeline                 | Reveal at `motion-base`                                                   |
| Chart                                           | Appears whole. Animate by series only when the order is the argument      |
| Table                                           | None. Show emphasis with a colour change                                  |
| Large number                                    | Fade at `motion-base`, with its label                                     |
| Emphasised element                              | One optional Pulse, after the screen has finished building                |

Animate text by paragraph, never by letter or word. Build in reading order, primary content first. A screen or slide with more than six animated groups has too much on it, so simplify it.

## Reduced Motion

- Test the static state by reading it with all motion off. It must be complete and correct.
- Never use looping, auto-reversing, flashing, or blinking motion. Nothing flashes more than three times in one second.
- Never start sound, video, or an animation from a timer alone.
- The medium reference says how the viewer turns motion off, and what to remove.

## Workflow

Run these steps in order.

1. **Plan.** Write the motion plan before any code or slide work: for each screen or slide, the transition and each build with its effect, token, and trigger. Check every row against the vocabulary, the tokens, and the build rules.
2. **Apply.** Implement the plan as the medium reference sets. Use the tokens by name, never as scattered literal values.
3. **Check.** Check the result against the medium reference, and against the invariants above. A still picture does not show motion, so check motion from the code or from the animation list.
4. **Report.** Report the effects used, the tokens, the trigger mode, and how the viewer turns motion off. Report a gap plainly, such as a tool that cannot write animations, and give the plan instead. Never fake motion with a workaround.
