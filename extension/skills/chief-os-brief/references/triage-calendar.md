# Calendar Triage

Triage calendar events for today and tomorrow, flag conflicts, and identify preparation needs.

Use with `triage-contract.md` for the workflow, shared context signals, URL rule, and output schema, and with `triage-scoring.md` for the scoring method. This file adds the calendar-specific pre-screen, context signals, five scoring components, conflict protocol, and event categories.

## Core Rules

- Always cover today and tomorrow in the local time zone. Never mix time zones in a single output.
- Score the current meeting and its unresolved preparation needs, not the organiser's seniority or the original invitation state.
- Treat organiser role, required attendance, attendee count, accepted status, and invitation importance as evidence to evaluate, not automatic priority.
- Always surface conflicts and overlapping events, even when an event would otherwise be low priority.
- For conflicts, name the overlapping event and required or optional attendance status in `summary` and `recommendedAction`.

## 1. Pre-Screen Events

Silently exclude and omit:

- Declined or cancelled events.
- Holidays, birthdays, and informational all-day banners that are not real meetings.
- Automated focus time, no-meeting blocks, and placeholder holds unless they overlap a real meeting.
- Tentative invitations with no agenda, required attendance, or preparation ask.

Exception: keep any event that contains a specific preparation ask, deliverable, deadline, or explicit decision.

## 2. Establish Current Context

Establish the shared context signals from the triage contract, reading "sender or organiser" as the meeting organiser. Calendar does not use the message-channel signals. Add these calendar-specific signals:

- Attendance expectation: required attendee versus optional attendee.
- User responsibility: organiser, facilitator, presenter, decision-maker, approver, subject-matter contributor, or attendee.
- Explicit contribution: an assigned contribution or deliverable tied to the meeting.
- Preparation state: agenda, documents, pre-reads, review items, deliverables, and whether the work is already complete.
- Meeting shape: focused 1:1 or working session versus broad informational meeting.
- Scheduling state: actual start and end times, overlap, location or joining constraints, and attendance status for each conflicting event.

## 3. Calendar Scoring Components

Apply the scoring model in `triage-scoring.md` with the five calendar components below, then sum, multiply, cap, band, rank, and categorise as the scoring model and triage contract describe. Sort included events by descending `attentionScore`; when scores are equal, use the shared tie-break order, then prefer the event beginning soonest. Score overlapping events independently before recommending attendance, then apply the Conflict Protocol.

### Stakeholder Relevance Score (0-20)

Choose one relationship baseline. Score how directly a participant is connected to the outcome, not their prestige or job title.

| Relationship to the meeting outcome                          | Score |
| ------------------------------------------------------------ | ----: |
| Accountable outcome owner or final decision-maker            |    20 |
| Customer or external partner directly affected               |    18 |
| Critical dependency owner or accountable executive sponsor   |    18 |
| Project, initiative, or delivery owner                       |    16 |
| Core cross-functional partner or subject-matter owner        |    14 |
| Manager, direct report, peer, or frequent collaborator       |    10 |
| Team member or known contact without a critical dependency   |     7 |
| General attendee or unknown external contact                 |     3 |
| Broad audience, distribution list, or no evidenced relevance |     0 |

An executive receives sponsor-level points only when the evidence shows accountability for this outcome. A customer receives directly-affected points only when the meeting concerns a documented customer outcome.

### Business Impact Score (0-30)

Choose the strongest evidenced organisational consequence.

| Scenario                                                     | Score |
| ------------------------------------------------------------ | ----: |
| Service disruption, safety, compliance, or continuity risk   |    30 |
| Critical escalation or material customer risk                |    30 |
| Major business opportunity or material revenue outcome       |    28 |
| Strategic objective at risk or irreversible decision         |    25 |
| Executive review dependency or project blocker               |    22 |
| Major milestone or critical cross-team dependency            |    18 |
| Hiring, people, planning, budgeting, or forecasting decision |    15 |
| Operational working session                                  |    10 |
| Routine status update                                        |     5 |
| Informational or knowledge-sharing event                     |     2 |
| No demonstrated organisational consequence                   |     0 |

### Time Criticality Score (0-20)

Choose the strongest current signal. The scheduled start time alone does not make a meeting urgent; there must be an evidenced consequence of delay, missed attendance, or incomplete preparation.

| Current timing consequence                                       | Score |
| ---------------------------------------------------------------- | ----: |
| Live incident or material consequence within 4 hours             |    20 |
| Decision, deliverable, or preparation due before the event today |    18 |
| Same-day deadline or event-driven escalation                     |    15 |
| Event within 24 hours where delay has a documented consequence   |    10 |
| Time-sensitive event or dependency within 72 hours               |     5 |
| More than 72 hours away or no evidenced time consequence         |     0 |

Prefer a verified deadline or event dependency over urgency language. Words such as "urgent" or "ASAP" without a concrete current consequence receive no points by themselves.

### User Responsibility Score (0-20)

Choose the strongest responsibility that applies to the user for this occurrence.

| User responsibility                                       | Score |
| --------------------------------------------------------- | ----: |
| Owns a decision, approval, presentation, or deliverable   |    20 |
| Organises, facilitates, or is accountable for the outcome |    18 |
| Has an assigned action or essential expert contribution   |    15 |
| Is required and has an explicit input or decision role    |    12 |
| Is required with no explicit contribution documented      |     7 |
| Is optional but has a specific requested contribution     |     5 |
| Is optional or attending for information only             |     2 |
| Is not expected to act or another person owns the outcome |     0 |

Required attendance is evidence of expectation, not proof of impact. When the invitation and current context conflict, use the clearest current ownership evidence and note the uncertainty.

### Preparation Score (0-10)

Choose the strongest incomplete preparation need. Completed preparation receives zero points.

| Incomplete preparation need                                   | Score |
| ------------------------------------------------------------- | ----: |
| Decision brief, customer deliverable, or substantial material |    10 |
| Explicit pre-read, analysis, deck, demo, or document review   |     8 |
| Unresolved follow-up or context gathering required            |     6 |
| Agenda confirmation or brief logistical preparation           |     3 |
| Preparation complete or no preparation required               |     0 |

## 4. Assign Calendar Categories

Assign each event one category using this precedence: `Conflicts`, `Prep Needed`, `Priority Meetings`, then `FYI / Optional`. Do not duplicate an event across categories. When an event qualifies for more than one category, preserve the other relevant context in `summary` and `recommendedAction`.

### Priority Meetings

Today's meetings rated Medium, High, or Critical, plus tomorrow's meetings rated High or Critical. Also include a lower-scored event when the user has an evidenced non-delegable decision, deliverable, presentation, or attendance obligation.

### Conflicts

Overlapping or double-booked events that need an attendance or rescheduling decision. Include the overlapping event title, time overlap, and whether the user is required or optional for each event.

### Prep Needed

Meetings with incomplete materials, pre-reads, decisions, or follow-up actions that the user must address before they begin. Evaluate linked email and Teams context. Do not use this category when preparation is complete or no preparation is required.

### FYI / Optional

Low or Normal priority events where attendance is optional and no preparation is required.

### Noise

Events that should be omitted from the triage report.

## 5. Conflict Protocol

For every pair of overlapping events:

1. Calculate each event's score independently before considering the overlap.
2. Surface both event titles, the exact overlap, and required or optional status for each event.
3. Do not add points solely because an overlap exists.
4. Compare non-delegable responsibility, organisational consequence, deadline, and available alternatives such as delegation, partial attendance, recording, or rescheduling.
5. When one score is at least 15 points higher and no hard obligation contradicts it, recommend attending the higher-impact event and a concrete disposition for the other.
6. When the scores are within 15 points, both are High or Critical, or evidence is incomplete, do not silently choose. Recommend the specific decision, delegation, or rescheduling action needed.

Required status breaks a tie only when the events have comparable consequences. It does not automatically outrank an optional event with a substantiated critical outcome and a clear user contribution.

## 6. Calendar Calibration

In addition to the shared calibration checks:

- A customer meeting is not automatically High; the evidence must establish a material customer outcome, responsibility, or time consequence.
- A recurring required status meeting does not receive urgency or impact points from recurrence or attendance status alone.
- A meeting starting soon is not automatically urgent when missing or delaying it has no documented consequence.
- Preparation already completed receives zero preparation points; rescore when responsibilities or context change.

## 7. Output

Return one object per included event using the triage contract Output Schema. Calendar-specific values:

- `source`: `calendar`
- `sourceLabel`: `Priority Meetings`, `Conflicts`, `Prep Needed`, `FYI / Optional`
- `summary`: add location, conflict, attendee, or preparation context when it changes the recommended action. For conflicts, name the overlapping event and attendance expectation.
- `url`: Outlook calendar event link that opens the event
- `recommendedAction`: for conflicts, describe the attendance, decline, reschedule, or delegation decision needed.
