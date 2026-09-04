---
name: chief-os-visual-minutes
description: "Use when visually summarising one meeting: visual minutes, illustrated meeting recap, meeting summary image, sketch my meeting, break this meeting into key moments and follow-ups, or turn a meeting transcript, recap, or chat into a picture. Produces one illustrated page holding the key moments along the meeting timeline and the follow-up actions that came out of it."
---

# ChiefOS Visual Minutes

Turn one meeting into a single illustrated page holding two things:

1. **Key moments**, summarised in order along the meeting's timeline.
2. **Follow-up actions**, summarised with their owner and due date.

Both live in the same image, in two visually separate bands, so the meeting reads at a glance.

## Working File

One file in the output folder, created when missing and replaced in place every run. Never create timestamped, backup, or history copies.

- `visual-minutes.png`: the illustrated minutes.

## Invariants

These hold on every run, whether or not a reference has been read.

- **Evidence only.** Never invent a moment, decision, owner, date, number, commitment, or attendee. Attribute a statement only to a speaker the source names. Omit the item instead.
- **Verifiable sources only.** Use only the meeting's own recap, transcript, chat, calendar event, shared files, and post-meeting messages that reference it. Never infer a decision or an owner from a title, agenda, tone, or attendee list alone. When evidence conflicts, keep the later source and note the conflict in chat; when it is ambiguous, take the lower defensible reading.
- **Two collections only.** Every rendered item is either a key moment or a follow-up action. Never add a third band, and never move an item between bands to balance the layout.
- **Order is meaning.** Key moments run in timeline order and follow-up actions in the order they were agreed. Never reorder either for visual effect.
- **Confirm before reporting.** Verify a step's postconditions before reporting it complete. Never report an image as generated that you have not confirmed on disk.
- Compose every image prompt through the `chief-os-image-prompt` skill, once per item. Never author, paraphrase, batch, or reuse a prompt yourself.
- Produce one image. Never split the two bands into separate files.
- Keep language concise, neutral, and action-oriented, without em dashes, and use the current local date and time for every calculation and timestamp.

## Workflow

Run these steps in order.

### 1. Resolve and Read the Meeting

Read `references/meeting-capture.md`, then follow its resolve and collect stages to settle which meeting is being summarised and gather its evidence.

Stop and say so when the meeting has not happened yet, or when it has no recap, transcript, or chat to read. Do not summarise a meeting from its invitation alone.

### 2. Build the Two Collections

Continue in `references/meeting-capture.md` and build the key moments, then the follow-up actions, with every field it requires on each item.

Apply its counts and merge rules so the page stays legible. Either collection may be empty when the evidence holds nothing; say so rather than padding it.

### 3. Report the Breakdown

Before generating anything, write both collections to chat as two short lists, key moments first with their markers, then follow-up actions with their owner and due date. Say plainly where an owner or date was not recorded.

This is the record the user checks the image against, so keep the wording identical to what the image will carry.

### 4. Generate the Image

Read `references/output-image.md`, then follow it to compose one prompt per item, assemble the combined prompt, generate the image, and save `visual-minutes.png`.

Report the number of `chief-os-image-prompt` calls made, which must equal the total number of items across both collections.

### 5. Validate Completion

- Confirm one `chief-os-image-prompt` call was made per item, with no prompt authored or reused directly.
- Confirm `visual-minutes.png` exists, is non-empty, and was written this run.
- Confirm every check in the validate stage of `references/output-image.md` passes. Regenerate once from the same prompts when a check fails, then report the remaining failures rather than reporting success.
- Report the meeting summarised, the count in each band, and the saved file.

## References

- [references/meeting-capture.md](references/meeting-capture.md) (steps 1 and 2): which meeting, which sources, and how the key moments and follow-up actions are built.
- [references/output-image.md](references/output-image.md) (step 4): per-item prompt composition, band layout and separation, the assembled prompt, and the image checks.
