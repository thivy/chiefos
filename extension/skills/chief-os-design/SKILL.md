---
name: chief-os-design
description: "Use when this skill is named by a calling ChiefOS skill or by the user: the shared ChiefOS house voice (ASD-STE100 wording), colour palette, and card style used by the briefing app, the summary email, drafts, and PowerPoint decks. It supplies rules only and never runs a workflow."
---

# ChiefOS Design

The one source of the ChiefOS look and voice. It supplies rules only. It never runs a workflow, creates a file, or sends anything.

## Capabilities

A caller names the capability that it needs, such as "apply the `chief-os-design` skill: Palette". Read only the reference of that capability.

| Capability | Reference                                   | Use it for                                                                                              |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Voice      | [conventions.md](references/conventions.md) | The wording, tone, and formatting of every user-facing line, in ASD-STE100 Simplified Technical English |
| Palette    | [palette.md](references/palette.md)         | The colour names and values for the app, the email, and the slides                                      |
| Card       | [card.md](references/card.md)               | The card surface, colours, parts, and order, in any medium                                              |

## Applying a Capability

- Each medium keeps its own units and layout. The app states its sizes in `rem`, the email in inline pixel and `em` values, and a slide in inches and points. A medium states only what differs from the capability, and never restates the capability.
- Never copy a value from a reference into another file. Name the capability, so that one edit here reaches every medium.
- Voice applies to ChiefOS text. A skill that writes the user's own content, such as a deck, sets its own wording rules.
