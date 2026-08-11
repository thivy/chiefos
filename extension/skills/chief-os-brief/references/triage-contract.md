# Triage Contract

The `triage-email.md`, `triage-calendar.md`, `triage-chat.md`, and `triage-meeting-recap.md` references follow this shared workflow and output contract. Each one supplies the source-specific detail for every step: what to pre-screen, which context signals to establish, its five scoring components, and its category definitions.

Write all user-facing text, including subjects, summaries, and recommended actions, per `conventions.md`.

## Workflow

1. **Pre-screen.** Silently exclude and omit the source's noise. Keep any item with a specific time-sensitive request or a clear ask from a known contact.
2. **Establish context.** Gather the shared and source-specific signals in Context Signals below. Do not infer relationships, strategic importance, deadlines, or business impact from a title, domain, tone, or metadata alone. Missing evidence contributes no points.
3. **Score and rank.** Apply the scoring model in `triage-scoring.md` with the source's five components. For each retained item, sum the components for `baseScore`, apply at most one qualifying multiplier, cap the rounded `attentionScore` at 100, then assign the `priorityBand`. Keep the component scores and evidence as an internal scorecard. Sort all included items by descending `attentionScore`, regardless of category. Recalculate from the latest state; when the user has answered and another person owns the next move, lower the action component and route the item to the waiting category unless a follow-up is now required.
4. **Assign one category.** The priority band controls ordering and response timing; the category controls workflow state. A band does not automatically determine `sourceLabel`. When an item fits more than one category, use the source's precedence and preserve the other context in `summary` and `recommendedAction`.
5. **Output.** Return one object per included item using the schema below.

## Context Signals

Step 2 establishes these shared signals for every source, then each source adds its own:

- Known relationship: the sender or organiser appears in `<working directory>/memory.md` or the address book.
- Direct team membership: the sender or organiser is part of the immediate team.
- Stakeholder relevance: their documented relationship to the outcome, such as accountable owner, affected customer, decision-maker, dependency owner, sponsor, manager, direct report, peer, or another relevant role.
- Explicit ask or decision: approval, decision, deliverable, or sign-off.
- Time sensitivity: verified deadline, incident response, event-driven urgency, or an upcoming meeting.
- Business consequence: customer, revenue, delivery, operational, compliance, security, people, or strategic impact.

The `triage-email.md` and `triage-chat.md` references also establish:

- Prior interaction evidence: recent or ongoing exchange in the same thread.
- Attachments or deliverables: files or items requiring review.
- Thread state: who owns the next move, what remains unresolved, and whether the user has already responded.

Use only evidence present in the item, its linked context, the calendar, the address book, or `<working directory>/memory.md`.

## Message Categories

The `triage-email.md` and `triage-chat.md` references assign one category per item using the precedence `Important`, then `Actionable`, then `Waiting`. If signals conflict, state the conflict in `summary` and recommend the safest concrete next step, or use `null` when no user action is needed. The calendar and meeting recap references define their own categories.

- **Important:** requires a response within the next 5 days and also has material impact, a deadline within 72 hours, or a documented escalation, incident, risk, or decision dependency.
- **Actionable:** requires approval, a decision, review, a deliverable, a response, follow-up, or tracking, and does not meet the `Important` criteria.
- **Waiting:** another person owns the next move and the user is awaiting a response, decision, delivery, or outcome. If risk or elapsed time means the user should chase now, use `Important` or `Actionable` instead.
- **Noise:** omitted from the triage report.

## URL Rule

Every included item must have a non-empty absolute deep link in `url` that opens the item. Retrieve the link with the source data; never omit `url`, return `null`, or invent a link.

## Output Schema

For each included item, return:

- `source`: the source value (`email`, `calendar`, `chat`, or `meeting`)
- `sourceLabel`: one of the source's category labels
- `timestamp`: required local time zone date and time in the `conventions.md` date format; calendar uses the event start and meeting recap uses the event end
- `authorName`: sender or organiser display name, or `null` when unavailable
- `authorRole`: sender or organiser email address, role, or `null` when unavailable
- `subject`: title, subject line, or a short neutral label when none exists
- `summary`: 1-2 sentence neutral paraphrase of the item's purpose. Summarise the whole thread in context when the item is part of one. Include time-sensitive requests, deadlines, or explicit asks here when they change the recommended action.
- `url`: required non-empty absolute deep link (see URL Rule)
- `recommendedAction`: concise next step; otherwise `null`

The daily briefing schema is strict. Do not add score fields to briefing objects. Use the score only to select, order, summarise, and recommend action. When the user explicitly requests scoring details, return a separate scorecard with the component scores, multiplier, final score, priority band, and concise evidence.
