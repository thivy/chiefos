# Triage

Use the shared model below for email, calendar, Teams chat, and completed meetings, with source-specific profiles in section 6.

Follow `conventions.md` for voice and formatting.

## 1. Workflow

1. **Pre-screen.** Silently exclude the source's noise, listed in its profile. Keep any item with a specific time-sensitive request or a clear ask from a known contact.
2. **Establish context.** Gather the signals in section 2. Missing evidence contributes no points.
3. **Score.** Sum the five ladders in section 3, apply at most one multiplier, then band the result. Keep the scorecard internal.
4. **Categorise.** Assign one category from the source profile. The band controls ordering and response timing; the category controls workflow state.
5. **Output.** Return one object per included item using the schema in section 5, sorted by descending `attentionScore` across all categories.

Score the current thread state, not individual messages. Once the user has answered and another person owns the next move, set Action to 0 and use Waiting unless a follow-up is now required.

## 2. Context Signals

Establish for every source:

- **Relationship** to the outcome: accountable owner, affected customer, decision-maker, dependency owner, sponsor, manager, direct report, peer, or other. Read "sender" as the organiser for calendar and meeting items.
- **Explicit ask**: approval, decision, deliverable, or sign-off.
- **Time sensitivity**: verified deadline, incident, event-driven urgency, or an upcoming meeting.
- **Business consequence**: customer, revenue, delivery, operational, compliance, security, people, or strategic impact.
- **Thread state**: who owns the next move, what is unresolved, whether the user has already responded, and any attachments or deliverables awaiting review.

## 3. Scoring Ladders

Choose the strongest supported tier per ladder, never their sum. Ignore urgency in quoted history, signatures, or boilerplate. Count a fact in two ladders only when evidence independently establishes both.

### Impact (0-30)

| Strongest evidenced organisational consequence                                                                                          | Score |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----: |
| Service, safety, compliance, security, or continuity issue; active escalation; material customer risk                                   |    30 |
| Major opportunity or revenue outcome; strategic objective at risk; irreversible decision; executive review dependency; delivery blocker |    22 |
| Milestone or cross-team dependency; hiring, people, planning, budgeting, or forecasting decision                                        |    14 |
| Operational coordination or routine status                                                                                              |     6 |
| No demonstrated organisational consequence                                                                                              |     0 |

### Action (0-25)

| Strongest responsibility the user owes now                                        | Score |
| --------------------------------------------------------------------------------- | ----: |
| Time-critical decision or approval needed to unblock an outcome                   |    25 |
| Owns a blocking response, deliverable, commitment, or explicitly assigned action  |    18 |
| Direct question, review, sign-off, or non-blocking deliverable needing user input |    12 |
| Acknowledgement, scheduling, or simple administrative reply                       |     5 |
| Another person owns the next move, or no user action is required                  |     0 |

### Urgency (0-20)

| Strongest current timing consequence                  | Score |
| ----------------------------------------------------- | ----: |
| Live incident, or material consequence within 4 hours |    20 |
| Same-day deadline or event-driven escalation          |    15 |
| Verified deadline or dependency within 72 hours       |    10 |
| Verified deadline this week                           |     5 |
| No verified timing consequence                        |     0 |

A scheduled start time is not urgency on its own; there must be an evidenced consequence of delay, missed attendance, or incomplete preparation. Prefer a verified deadline when wording and timing conflict.

### Risk (0-15)

| Strongest evidenced exposure                                                                  | Score |
| --------------------------------------------------------------------------------------------- | ----: |
| Active escalation, customer-at-risk, compliance, security, production, or continuity risk     |    15 |
| Critical dependency, material opportunity loss, or a decision or milestone dependency at risk |    10 |
| Team wellbeing risk, or repeated unanswered follow-ups with a documented delay consequence    |     6 |
| Routine dependency with no current risk signal                                                |     3 |
| No risk or dependency identified                                                              |     0 |

For calendar items, score incomplete preparation here: an unwritten decision brief or customer deliverable is 10, an outstanding pre-read or document review is 6, and completed preparation is 0.

### Stakeholder (0-10)

| Relationship to this outcome, not title or prestige                                          | Score |
| -------------------------------------------------------------------------------------------- | ----: |
| Accountable owner, final decision-maker, or directly affected customer                       |    10 |
| Critical dependency owner, accountable sponsor, or initiative owner                          |     8 |
| Cross-functional partner, subject-matter owner, manager, direct report, or peer on this work |     5 |
| Known contact with no demonstrated outcome dependency                                        |     2 |
| Broad audience, distribution list, or no evidenced relevance                                 |     0 |

An executive scores at sponsor level only when the evidence shows accountability for this outcome. A customer scores at the top only when the item concerns a documented customer outcome.

## 4. Score, Multiply, Band

```text
attentionScore = round(min(100, sum(five ladders) x multiplier))
```

Apply at most one multiplier, and only when the item or its trusted context substantiates the event. A keyword, sender, title, channel, mention, or meeting name is never enough.

- **1.50 Critical event:** active escalation; production or service incident; safety, compliance, security, or regulatory issue; substantiated customer or executive complaint with material impact; business continuity risk.
- **1.25 Enhanced attention:** critical business objective; major opportunity; material customer outcome; executive, strategic, or irreversible decision; strategic initiative; critical dependency.

| Attention score | Band     | Operating response                           |
| --------------- | -------- | -------------------------------------------- |
| 90-100          | Critical | Interrupt current work and address now       |
| 75-89           | High     | Handle today, or before the nearest deadline |
| 60-74           | Medium   | Handle in the next focus block               |
| 40-59           | Normal   | Handle this week                             |
| 0-39            | Low      | Batch, delegate, decline, or treat as FYI    |

**Ties** break in this order: active incident or safety, compliance, security, or continuity risk; material customer risk; major opportunity or strategic initiative; decision, approval, or non-delegable deliverable; blocker or critical dependency; people leadership; stakeholder request with a clear ask; routine update. If still tied, use the nearest verified deadline, then the earliest event start or most recent unresolved activity.

**Calibration.** Seniority, unread state, pins, flags, Outlook importance, direct-message status, mentions, attendee count, accepted status, and recency never add points on their own. A senior sender's routine FYI stays Low; a team member's substantiated production incident can reach Critical. An old unresolved obligation keeps its score; age alone never lowers it.

**Internal scorecard.** Hold `impact`, `action`, `urgency`, `risk`, `stakeholder`, `multiplier`, `attentionScore`, `band`, and a short evidence note per item. Never add these to briefing output. Return them only as a separate scorecard when the user explicitly asks for scoring detail.

## 5. Output Schema

Use the source-specific `MessageItem` interfaces and validation rules in [output-briefing.md](output-briefing.md#1-schema); do not add scorecard fields.

- Take `sourceLabel` from the profile; use local time for `timestamp` with the profile's event semantics.
- `authorName` is the sender or organiser; `authorRole` is their email address or role. Use a title, subject line, or short neutral label for `subject`.
- `summary`: 1-2 neutral sentences covering purpose, current state, and any deadline or ask affecting the action.
- Retrieve `url` with the source data. `recommendedAction` is the concise next step, or `null` when none is owed.

## 6. Source Profiles

### Email

- **Window:** last 10 days including today, plus any older email that is pinned, flagged, or marked important.
- **Exclude:** calendar notifications and meeting responses; automated system messages, receipts, and status pings; newsletters and subscriptions; bulk marketing.
- **Categories**, in precedence order: `Important` (needs a response within 5 days _and_ has material impact, a deadline within 72 hours, or a documented escalation, risk, or decision dependency), `Actionable` (needs approval, decision, review, delivery, response, or tracking), `Waiting` (another person owns the next move; use `Actionable` instead when the user should chase now).
- **`timestamp`:** when the email was sent. **`url`:** Outlook link to the email or thread.

### Calendar

- **Window:** today and tomorrow, local time zone, never mixed.
- **Exclude:** declined or cancelled events; holidays, birthdays, and informational all-day banners; focus time and placeholder holds unless they overlap a real meeting; tentative invitations with no agenda, required attendance, or preparation ask.
- **Categories**, in precedence order: `Conflicts`, `Prep Needed`, `Priority Meetings`, `FYI / Optional`.
  - `Priority Meetings`: today at Medium or above, tomorrow at High or above, plus any event where the user has a non-delegable decision, deliverable, presentation, or attendance obligation.
  - `Conflicts`: overlapping events needing an attendance or rescheduling decision. Always surface these, even at low priority.
  - `Prep Needed`: incomplete materials, pre-reads, decisions, or follow-ups the user must address first.
  - `FYI / Optional`: optional attendance, no preparation required.
- **Conflict protocol:** score each overlapping event independently, then name both titles, the exact overlap, and required or optional status for each. Overlap itself adds no points. When one score leads by 15 or more and no hard obligation contradicts it, recommend the higher-impact event and a concrete disposition for the other. Otherwise recommend the specific decision, delegation, or rescheduling action needed rather than choosing silently.
- **`timestamp`:** event start. **`url`:** Outlook calendar event link. **`recommendedAction`** for a conflict describes the attendance, decline, reschedule, or delegation decision.

### Chat

- **Window:** last 10 days including today. A message awaiting the user's response stays in scope until they respond, read or unread.
- **Exclude:** system notifications; bot and connector messages that need no action; reaction-only activity; purely informational `@channel` or `@team` broadcasts.
- **Categories:** the same `Important`, `Actionable`, `Waiting` precedence as email. A channel message with a specific high-impact ask can outrank a low-impact direct message.
- **`timestamp`:** latest relevant message. **`url`:** Teams deep link to the message or thread.

### Meeting Recap

- **Window:** rolling 48 hours ending now. Include only meetings that have ended.
- **Evidence, in order:** Teams or Copilot recap, transcript, shared notes, then substantive meeting chat. Prefer a later artifact that corrects an earlier one. Calendar metadata supplies identity, timing, and links only, and is never evidence that a discussion, decision, or commitment occurred. **Omit the meeting when none of the four artifacts is available.**
- **Exclude:** cancelled or declined events; meetings the user did not attend unless the evidence explicitly assigns them an action or records a decision affecting them; meetings with no verified decision, commitment, user-owned action, material risk, or waiting state; social events, broadcasts, and training; duplicate artifacts for the same occurrence.
- **Ownership:** do not assign an action from proximity, expertise, or attendance. The evidence must name the user or record their explicit acceptance. A generated action list is evidence to evaluate, not permission to assign every item.
- **Categories**, in precedence order: `Action Required` (the user owes a decision, response, approval, deliverable, or follow-up), `Waiting` (another person owns the next move), `Decision / Outcome` (a material verified decision or changed plan with no outstanding follow-up).
- **Reconciliation:** keep one object per meeting occurrence. When email or chat confirms or changes an outcome, use the latest state and do not repeat the same action as a separate chat item.
- **`timestamp`:** meeting end. **`url`:** recap, transcript, notes, meeting chat, or Outlook event link, in that preference order. Do not state that no decision was made when the evidence is incomplete; omit the meeting instead.
