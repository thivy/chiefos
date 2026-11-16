---
name: chief-os-visual-minutes
description: "Turn one meeting (transcript, recap, or chat) into a single illustrated visual-minutes page: key moments along the timeline plus follow-up actions with owners and due dates."
---

# ChiefOS Visual Minutes

Turn one meeting into a single illustrated page with two bands: chronological key moments, then follow-up actions with owners and due dates.

## Working File

`visual-minutes.png` in the output folder, replaced in place each run. Never create timestamped or backup copies.

## Rules

- **Evidence only.** Never invent a moment, decision, owner, date, number, commitment or attendee, and attribute a statement only to a speaker the source names. Use only the evidence `references/meeting-capture.md` allows; never infer from a title, agenda, tone or attendee list. Omit the item instead.
- **Two collections only:** key moments (timeline order) and follow-up actions (order agreed). Never add a band, move items between bands, or reorder for visual effect.
- Compose every image prompt through `chief-os-image-prompt`, once per item; never write your own. Produce one image.
- Write every line per `chief-os-design`: Voice. Use the local time zone for dates and source timing for elapsed markers.

## Workflow

Run in order without pausing for confirmation, except where a reference says to ask.

1. **Resolve and read the meeting** per `references/meeting-capture.md`. Stop and say so when the meeting hasn't happened or has no recap, transcript or chat. Never summarise from the invitation alone.
2. **Build the two collections** per the same reference. If both are empty, report that no supported moments or actions were found and stop.
3. **Report the breakdown in chat** before generating: key moments with markers, then follow-up actions with owner and due date (say where one wasn't recorded), under the labels `references/output-image.md` gives. Wording matches the image. Report gaps, conflicts and merges separately. This doesn't wait for approval.
4. **Generate the image** per `references/output-image.md`, saving `visual-minutes.png`. Report the `chief-os-image-prompt` call count, which must equal the total items.
5. **Report** the meeting, band counts and saved file, or the failure.
