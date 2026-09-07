---
name: chief-os-visual-minutes
description: "Use when visually summarising one meeting: visual minutes, illustrated meeting recap, meeting summary image, sketch my meeting, break this meeting into key moments and follow-ups, or turn a meeting transcript, recap, or chat into a picture. Produces one illustrated page holding the key moments along the meeting timeline and the follow-up actions that came out of it."
---

# ChiefOS Visual Minutes

Turn one meeting into a single illustrated page with two bands: chronological key moments, then follow-up actions with owners and due dates.

## Working File

One file in the output folder, created when missing and replaced in place every run. Never create timestamped, backup, or history copies.

- `visual-minutes.png`: the illustrated minutes.

## Invariants

These hold on every run, whether or not a reference has been read.

- **Evidence only.** Never invent a moment, decision, owner, date, number, commitment, or attendee. Attribute a statement only to a speaker the source names. Omit the item instead.
- **Verifiable sources only.** Use the meeting evidence allowed by `references/meeting-capture.md`, which owns conflict resolution. Never infer decisions or owners from a title, agenda, tone, or attendee list.
- **Two collections only.** Every rendered item is either a key moment or a follow-up action. Never add a third band, and never move an item between bands to balance the layout.
- **Order is meaning.** Key moments run in timeline order and follow-up actions in the order they were agreed. Never reorder either for visual effect.
- Compose every image prompt through the `chief-os-image-prompt` skill, once per item. Never author, paraphrase, batch, or reuse a prompt yourself.
- Produce one image. Never split the two bands into separate files.
- Keep language concise, neutral, and action-oriented, without em dashes. Use the local time zone for dates and source timing for elapsed markers.

## Workflow

Run these steps in order.

### 1. Resolve and Read the Meeting

Read `references/meeting-capture.md`, then follow its resolve and collect stages to settle which meeting is being summarised and gather its evidence.

Stop and say so when the meeting has not happened yet, or when it has no recap, transcript, or chat to read. Do not summarise a meeting from its invitation alone.

### 2. Build the Two Collections

Continue in `references/meeting-capture.md` and build the key moments, then the follow-up actions, with every field it requires on each item.

Apply its evidence and merge rules. Either collection may be empty; if both are empty, report that no supported moments or actions were found and stop without generating an image.

### 3. Report the Breakdown

Before generating anything, write both collections to chat as two short lists, key moments first with their markers, then follow-up actions with their owner and due date. Say plainly where an owner or date was not recorded.

Keep rendered wording identical between chat and image. Report source gaps, conflicts, empty collections, and merges separately.

### 4. Generate the Image

Read `references/output-image.md`, then follow it to compose one prompt per item, assemble the combined prompt, generate the image, and save `visual-minutes.png`.

Report the number of `chief-os-image-prompt` calls made, which must equal the total number of items across both collections.

### 5. Report the Result

Report the meeting, band counts, and saved file on generation success; otherwise report the failure.
