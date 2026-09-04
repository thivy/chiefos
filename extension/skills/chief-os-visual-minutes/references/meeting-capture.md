# Meeting Capture

Settle which meeting is being summarised, gather its evidence, then build the two collections the image renders.

## 1. Resolve the Meeting

Take the first that applies: the meeting the user attached or named; the meeting they described well enough to match exactly one event; otherwise list the meetings that finished in the preceding 48 hours and ask one question asking which to summarise. Never guess, and never summarise several at once.

Stop and say so when the meeting is still in the future, was cancelled, or still matches more than one event after asking. For a recurring series, summarise the occurrence the user pointed at, or the most recent completed one when the reference covers the series, and say which you used.

## 2. Collect the Context

Read everything available for that occurrence, in this order, preferring the more direct source where two disagree:

- Recap, AI notes, or published summary
- Transcript
- In-meeting chat, and the linked channel or group thread
- Calendar event: subject, start and end, organiser, attendees, agenda, description
- Files shared in or attached to the meeting
- Post-meeting messages and email that reference it

Note which sources existed and which did not; step 3 of the skill reports the gaps.

Beyond the skill's invariants: use `the group` when a source records agreement without naming a speaker, keep names, numbers, dates, systems, and commitments exact, record a decision raised but not settled as open rather than as a decision or an action, and skip anything personal, sensitive, off the record, or that the user asked to keep out.

## 3. Build the Key Moments

A key moment is a point where the meeting changed direction: a decision made, an agreement reached, a risk or objection raised, a demo or reveal, a number or status reported, a scope or date change, or a handover.

- Timeline order, earliest first.
- An even count of 6 or 8. Reach 6 by admitting smaller but real moments, such as a status reported or a topic parked, never by splitting one moment in two, restating a point, or inventing one.
- Above 8, fold the least consequential moment into the neighbouring moment it belongs to until the count is 8, and report every merge.
- Below 6 on real evidence, use the next even count down and say so in chat rather than padding.
- Merge repeats of a point into the moment where it was settled. Exclude greetings, roll call, scheduling admin, and any exchange with no consequence.

Each moment carries:

| Field         | Content                                                                                                      | Rendered |
| ------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| Marker        | The elapsed timestamp as `h:mm`, or `Part 1`, `Part 2`, and so on when the source has no timestamps          | Yes      |
| Heading       | 2 to 4 words naming the moment                                                                               | Yes      |
| Display label | 4 to 6 words stating what changed, in the meeting's own wording                                              | Yes      |
| Summary note  | One line of at most 12 words, keeping any name, number, or date exact                                        | Yes      |
| Context       | The full detail of the moment and who drove it; guides the choice of object, character, and interaction only | No       |

## 4. Build the Follow-Up Actions

A follow-up action is work a named person or the group agreed to do after the meeting.

- Ordered by the point in the meeting where each was agreed, earliest first.
- 2 to 4, never more, preferring an even count so the row aligns with the columns above. Never invent or drop an action to reach a count, and never derive one from a topic that was only discussed.
- Merge duplicates, keeping the owner and due date as recorded, and report every merge.

Each action carries:

| Field         | Content                                                                                                                 | Rendered |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| Heading       | 2 to 4 words naming the action                                                                                          | Yes      |
| Display label | 4 to 6 words stating the next action, written as an instruction                                                         | Yes      |
| Summary note  | One line of at most 12 words carrying the owner and due date as recorded, or `Owner not recorded` or `No date recorded` | Yes      |
| Context       | The full detail of the action, who agreed to it, and what it unblocks                                                   | No       |

Merging is the only way to fit either collection to the page. Never merge unrelated items, and never shorten a rendered field below its minimum.
