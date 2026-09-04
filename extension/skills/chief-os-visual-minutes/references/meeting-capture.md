# Meeting Capture

Settle which meeting is being summarised, gather its evidence, then build the two collections the image renders.

## 1. Resolve the Meeting

Use, in this order, the first that applies:

- The meeting the user attached or named, resolved from its calendar event, meeting link, or meeting context reference.
- The meeting the user described well enough to match exactly one event, such as its subject plus a day.
- Otherwise, list the meetings that finished in the preceding 48 hours and ask exactly one question asking which to summarise. Do not guess, and do not summarise several at once.

Stop and tell the user when the meeting is still in the future, was cancelled, or matches more than one event after asking.

For a recurring series, summarise the single occurrence the user pointed at. When the reference covers the series rather than one occurrence, summarise the most recent completed occurrence and say which one you used.

## 2. Collect the Context

Read everything available for that occurrence, in this order, and prefer the more direct source where two disagree:

- The meeting recap, AI notes, or published summary.
- The transcript.
- The in-meeting chat, and the linked channel or group chat thread.
- The calendar event: subject, start and end, organiser, attendees, agenda, and description.
- Files shared in or attached to the meeting.
- Messages and email sent after the meeting ended that reference it.

Note which sources existed and which did not; step 3 of the skill reports gaps to the user.

### Evidence Rules

- Quote or paraphrase only what a source states. Never fill a gap from the agenda, the attendee list, or what a meeting of that type usually covers.
- Attribute a statement only to a speaker the source names. Use `the group` when a source records agreement without a name.
- Keep names, numbers, dates, systems, and commitments exact. Never round, restate, or tidy them.
- Where a decision was raised but not settled, record it as open. Never promote it to a decision or to a follow-up action.
- Skip anything personal, sensitive, or off the record, and anything the user asked to keep out.

## 3. Build the Key Moments

A key moment is a point where the meeting changed direction: a decision made, an agreement reached, a risk or objection raised, a demo or reveal, a number or status reported, a scope or date change, or a handover.

- Order strictly by time, earliest first.
- Use an even count of 6 or 8, never odd and never fewer than 6, so the band divides into two rows of equal length.
- Reach 6 by widening what qualifies, never by inventing: admit smaller but real moments such as a status reported, a question raised and answered, or a topic parked. Never split one moment in two, restate the same point twice, or invent a moment to make the count.
- When more than 8 qualify, fold the least consequential into the neighbouring moment it belongs to until the count is 8.
- When the evidence still holds fewer than 6, use the next even count below and say so in chat rather than padding.
- Merge repeats of the same point into the moment where it was settled.
- Exclude greetings, roll call, scheduling admin, and any exchange with no consequence.

Each moment carries:

- **Marker** — the elapsed timestamp as `h:mm`, or `Part 1`, `Part 2`, and so on when the source has no timestamps. Rendered.
- **Heading** — 2 to 4 words naming the moment. Rendered.
- **Display label** — 4 to 6 words stating what changed, in the meeting's own wording, with no padding. Rendered.
- **Summary note** — one line of at most 12 words, keeping any name, number, or date exact. Rendered.
- **Context** — the full detail of the moment and who drove it. Never rendered; it only guides the choice of object, character, and interaction.

## 4. Build the Follow-Up Actions

A follow-up action is work a named person or the group agreed to do after the meeting.

- Order by the point in the meeting where each was agreed, earliest first.
- Aim for 2 to 4, and prefer an even count so the row aligns with the columns above it. Never invent or drop an action to reach one.
- Include only actions a source states. Never derive one from a topic that was merely discussed, and never invent an owner or a due date to complete an item.
- Merge duplicates of the same action, keeping the owner and due date as recorded.

Each action carries:

- **Heading** — 2 to 4 words naming the action. Rendered.
- **Display label** — 4 to 6 words stating the next action, written as an instruction. Rendered.
- **Summary note** — one line of at most 12 words carrying the owner and due date as recorded, or `Owner not recorded` or `No date recorded` when they are not. Rendered.
- **Context** — the full detail of the action, who agreed to it, and what it unblocks. Never rendered.

## 5. Trim to Fit

The page holds at most 8 key moments and 4 follow-up actions.

Bring an over-length collection down by merging, never by dropping: fold the least consequential key moment into the neighbouring moment it belongs to, and merge duplicate follow-up actions into one. Report every merge. Never drop a follow-up action, never merge two unrelated items to save space, and never shorten a rendered field below its minimum to fit more in.
