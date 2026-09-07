# Meeting Capture

Settle which meeting is being summarised, gather its evidence, then build the two collections the image renders.

## 1. Resolve the Meeting

Take the first that applies: the meeting the user attached or named; the meeting they described well enough to match exactly one event; otherwise list the meetings that finished in the preceding 48 hours and ask one question asking which to summarise. Never guess, and never summarise several at once.

Stop when the meeting has not ended, was cancelled, or remains ambiguous after asking. For a recurring series, use the specified occurrence or the most recent completed one when the user names only the series; report which you used.

## 2. Collect the Context

Read the available sources for that occurrence:

- Recap, AI notes, or published summary
- Transcript
- In-meeting chat, and the linked channel or group thread
- Calendar event: subject, start and end, organiser, attendees, agenda, description
- Files shared in or attached to the meeting
- Post-meeting messages and email that reference it

Direct evidence takes precedence over generated summaries unless a later explicit correction supersedes it. Do not treat recency alone as a correction. Report unresolved conflicts and source gaps in chat; do not assert a disputed decision or owner as settled.

Beyond the skill's invariants: use `the group` when a source records agreement without naming a speaker, keep names, numbers, dates, systems, and commitments exact, record a decision raised but not settled as open rather than as a decision or an action, and skip anything personal, sensitive, off the record, or that the user asked to keep out.

## 3. Build the Key Moments

A key moment is a point where the meeting changed direction: a decision made, an agreement reached, a risk or objection raised, a demo or reveal, a number or status reported, a scope or date change, or a handover.

- Timeline order, earliest first.
- Aim for 6 to 8 moments, but retain the evidence-supported count, including zero or odd counts. Never split, pad, or drop a moment to fit a target.
- Consolidate only related moments without losing their facts; merge repeated points where they were settled and report merges. Exclude greetings, roll call, scheduling admin, and exchanges with no consequence.

Each moment carries:

| Field         | Content                                                                                                      | Rendered |
| ------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| Marker        | Elapsed `m:ss` or `h:mm:ss` at source-supported precision; otherwise `Part 1`, `Part 2`, and so on           | Yes      |
| Heading       | 2 to 4 words naming the moment                                                                               | Yes      |
| Display label | 4 to 6 words stating what changed, in the meeting's own wording                                              | Yes      |
| Summary note  | One line of at most 12 words, keeping any name, number, or date exact                                        | Yes      |
| Context       | The full detail of the moment and who drove it; guides the choice of object, character, and interaction only | No       |

Convert clock time to elapsed time only with a verified meeting start. Preserve minute-only precision as `Minute N`; never invent seconds.

## 4. Build the Follow-Up Actions

A follow-up action is work a named person or the group agreed to do after the meeting.

- Ordered by the point in the meeting where each was agreed, earliest first.
- Aim for 2 to 4 actions, but retain every distinct agreed action, including zero, one, or more than four. A discussed topic alone is not an action.
- Merge duplicates, keeping the owner and due date as recorded, and report every merge.

Each action carries:

| Field         | Content                                                                                                                 | Rendered |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| Heading       | 2 to 4 words naming the action                                                                                          | Yes      |
| Display label | 4 to 6 words stating the next action, written as an instruction                                                         | Yes      |
| Summary note  | One line of at most 12 words carrying the owner and due date as recorded, or `Owner not recorded` or `No date recorded` | Yes      |
| Context       | The full detail of the action, who agreed to it, and what it unblocks                                                   | No       |

Never merge unrelated items or shorten rendered fields below their minimum. The image reference owns layout and overflow handling, not which evidence survives.
