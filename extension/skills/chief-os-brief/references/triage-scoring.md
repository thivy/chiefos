# Attention Score

Use this model as an evidence-based digital chief of staff across email, calendar, Teams chat, and completed-meeting triage. It prioritises organisational consequence and required action over hierarchy: a routine executive FYI can stay Low, while a substantiated production incident raised by a team member can be Critical.

Each source reference supplies its own five scoring components. This model defines how those components combine into a ranked, banded result.

## Scoring Principles

- Score only items retained after pre-screening.
- Score one current unresolved state per item, not each message or invitation separately.
- Use documented evidence; do not invent relationships, impact, deadlines, risk, attendance obligations, or intent.
- Select one strongest supported signal in each component unless that component's table explicitly allows boosters.
- Cap every component at its stated maximum.
- Do not count urgency language from quoted history, signatures, boilerplate, or stale messages unless it applies to the current unresolved request.
- Do not let seniority, titles, or channel metadata override low impact or lack of action.
- Do not double-count one fact across components unless the evidence independently establishes both dimensions.
- Do not let recent low-impact activity displace an older unresolved high-impact item; use recency only as a final tie-breaker.

## Formula

```text
Base Score = sum of the source reference's five components

Attention Score = round(min(100, Base Score x Multiplier))
```

Each source's five components sum to a maximum of 100. Cap the final attention score at 100 after applying the multiplier.

## Impact Multipliers

Apply at most one multiplier. Use the Critical Event multiplier when both levels qualify. Do not apply a multiplier from a keyword, sender, title, channel, mention, or meeting name alone; the item or trusted surrounding context must substantiate the event.

### Enhanced Attention: 1.25

Apply when the item materially concerns at least one of:

- Critical business objective
- Major opportunity
- Material customer outcome
- Executive, strategic, or irreversible decision
- Strategic initiative
- Critical dependency

### Critical Event: 1.50

Apply when the item materially concerns at least one of:

- Active escalation
- Production or service incident
- Safety, compliance, security, or regulatory issue
- Substantiated customer or executive complaint with material impact
- Business continuity risk

## Priority Bands

| Attention score | Priority band | Operating response                                                   |
| --------------- | ------------- | -------------------------------------------------------------------- |
| 90-100          | Critical      | Interrupt current work and address now                               |
| 75-89           | High          | Handle today, or before the nearest deadline                         |
| 60-74           | Medium        | Handle in the next focus block                                       |
| 40-59           | Normal        | Handle this week or keep on the working schedule                     |
| 0-39            | Low           | Batch, delegate, decline, or treat as FYI when workflow state allows |

Priority bands guide ordering and response timing only. They do not replace each source's workflow category labels.

## Tie-Break Order

When final attention scores are equal, prioritise in this order:

1. Active incidents; safety, compliance, security, or continuity risks; escalations
2. Material customer risks
3. Major opportunities and strategic outcomes or initiatives
4. Decisions, approvals, and non-delegable deliverables
5. Project blockers and critical dependencies
6. People leadership actions
7. Stakeholder requests with a clear ask, and preparation with the nearest verified deadline
8. Routine internal or operational updates
9. FYI and informational items

If items remain tied, use the nearest verified deadline, then the most recent unresolved activity, the earliest event start time for calendar events, or the most recent meeting end time for completed-meeting recaps.

## Calibration Checks

- A senior sender sharing a routine informational update should normally remain Low unless the content establishes greater impact, urgency, required action, or risk.
- A team member reporting a substantiated production incident with an immediate decision request can reach Critical.
- Channel metadata alone never adds points: pins, flags, Outlook importance, unread state, direct-message status, a specific mention, attendee count, or accepted status.
- A vague request with no demonstrated consequence or deadline does not receive impact or urgency points.
- When the user has completed their action and is awaiting someone else, set the action component to 0 and rescore.
- An old unresolved obligation stays in scope; age alone never lowers its score.
- When evidence is ambiguous, choose the lower defensible score and retain the uncertainty in the internal evidence note.

## Internal Scorecard

Keep this structure internally for each retained item. Never add score fields to the briefing output. The source reference defines the five component names.

```text
component1..5: each 0 to its source maximum
baseScore: 0-100
multiplier: 1.00 | 1.25 | 1.50
attentionScore: 0-100
priorityBand: Critical | High | Medium | Normal | Low
evidence: concise facts supporting non-zero scores and the multiplier
```
