# Triage

Follow the `chief-os-design` skill: Voice. Score the current thread state, not individual messages.

## Approach

For each source, drop its noise, judge each remaining item's importance, assign a category, and return items sorted by descending importance across categories. Use `memory.md` for known relationships and domains.

Rank by evidenced consequence, not surface signals:

- What the user owes now (blocking decision or deliverable > review > acknowledgement). Once the user has replied and someone else owns the next move, it is `Waiting`, unless a follow-up is due.
- Real deadlines and timing (incident or same-day > within 72 hours > this week). A meeting start time alone is not urgency.
- Business impact and risk: incident, security, compliance, customer-at-risk, revenue or strategic decisions rank above routine coordination.
- The user's relationship to the outcome (owner, decision-maker, affected customer, dependency) rather than the sender's title.
- Seniority, unread state, flags, importance marks, mentions, attendee count and recency never raise priority on their own. Old unresolved obligations keep their priority.

Keep the ranking internal. Return a scorecard only if explicitly asked.

Reconcile against completion history in `todo.md` before reporting: an obligation already completed must not be described as still owed, though a new distinct obligation from the same source can appear.

## Item fields

Per [output-briefing.md](output-briefing.md): `timestamp` in local time; `authorName` is the sender or organiser, `authorRole` their role or team (else their email); `subject` keeps the original minus `RE:`/`FW:`/`[EXTERNAL]` (replace only an empty or uninformative one with a short topic label); `summary` 1–2 sentences under 40 words, leading with what is needed or changed, then why and when, not repeating the subject; `url` is a deep link; `recommendedAction` is one imperative sentence under 20 words, or `null`.

## Sources

**Email.** Last 10 days, plus older pinned, flagged or important. Skip calendar notices, automated messages, newsletters, marketing. Categories: `Important` (reply needed within 5 days and material impact, a deadline within 72 hours, or an escalation/decision dependency), `To Do`, `Waiting`. Timestamp: sent time.

**Calendar.** Today and tomorrow, never mixed. Skip declined, cancelled, holidays, focus time, and tentative invites with no agenda or ask. Categories: `Conflicts` (always surface; name both events, the overlap and required/optional status, recommend which to keep or a delegate/reschedule action), `Preparation` (unfinished materials or pre-reads), `Priority Meetings` (important today or tomorrow, or a non-delegable obligation), `Optional`. Timestamp: event start.

**Chat.** Last 10 days, including channel threads. A message awaiting the user's reply stays in scope until answered. Skip system, bot, reaction-only and broadcast messages. Categories as email. Timestamp: latest relevant message.

**Meeting recap.** Meetings that ended in the last 48 hours. Evidence in order: Teams recap/AI notes, transcript, shared notes, meeting chat. Calendar metadata alone is not evidence; omit the meeting when none exists. Include only verified decisions, commitments, user-owned actions, risks or waiting states. Assign an action to the user only when the evidence names them or records their acceptance. One item per meeting occurrence, using the latest state if email or chat updated it. Categories: `To Do`, `Waiting`, `Decision`. Timestamp: meeting end; `url` is the recap, transcript, notes, chat or event, in that order.

**Afternoon Recap:** drop completed or informational items unless they explain a resolved decision, a blocker, a new commitment or tomorrow's prep.
