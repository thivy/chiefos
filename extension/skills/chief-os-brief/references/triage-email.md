# Email Triage

Triage email, summarise active threads, and identify messages that need attention or follow-up.

Use with `triage-contract.md` for the workflow, shared context signals, message categories, URL rule, and output schema, and with `triage-scoring.md` for the scoring method. This file adds the email-specific pre-screen and five scoring components.

## Core Rules

- Analyse email from the last 10 days, inclusive of all messages from today.
- Analyse emails that are pinned, flagged, or marked as important, even if they are older than 10 days.
- Summarise email threads when possible instead of listing each message separately.
- Score the current unresolved state of each retained thread, not every message in the thread.
- Treat Outlook importance, pins, flags, and organisational titles as evidence to investigate, not automatic priority.

## 1. Pre-Screen Emails

Silently exclude and omit:

- Calendar notifications, meeting acceptances, meeting declines, and automated reminders.
- Routine automated system messages, delivery receipts, and status pings.
- Regular newsletters or subscriptions that do not require action.
- Recurring bulk marketing emails.

Exception: keep any email that contains a specific time-sensitive request or a clear ask from a known contact.

## 2. Establish Current Context

Establish the shared context signals from the triage contract. As a message channel, email also uses the contract's message-channel signals: prior interaction, attachments, and thread state.

## 3. Email Scoring Components

Apply the scoring model in `triage-scoring.md` with the five email components below, then sum, multiply, cap, band, rank, and categorise as the scoring model and triage contract describe. Recalculate from the latest thread state; when the user has answered and another person owns the next step, lower actionability and route the thread to `Waiting` unless a follow-up is now required.

### Stakeholder Score (0-30)

Choose one relationship baseline. Score the relationship to the work, not prestige or job title in isolation.

| Stakeholder relationship             | Score |
| ------------------------------------ | ----: |
| Critical stakeholder                 |    30 |
| Executive sponsor                    |    28 |
| Key stakeholder                      |    26 |
| Direct report                        |    24 |
| Manager                              |    22 |
| Skip-level manager                   |    20 |
| Project or initiative owner          |    20 |
| Cross-functional partner             |    18 |
| Peer                                 |    15 |
| Team member                          |    10 |
| General employee or external contact |     5 |
| Distribution list or newsletter      |     0 |

Add only corroborated relationship boosters, then cap the component at 30. A booster reflects why this stakeholder matters to the current work; do not apply one solely because the email claims importance.

| Stakeholder signal      | Booster |
| ----------------------- | ------: |
| High business impact    |     +15 |
| Organisation priority   |     +10 |
| Executive visibility    |     +10 |
| Critical dependency     |     +10 |
| Strategic initiative    |      +5 |
| Time-sensitive decision |      +5 |
| Frequent collaborator   |      +3 |

### Business Impact Score (0-25)

Choose the strongest evidenced outcome.

| Scenario                               | Score |
| -------------------------------------- | ----: |
| Critical risk or escalation            |    25 |
| Major business opportunity             |    25 |
| Service disruption or production issue |    25 |
| Strategic objective at risk            |    22 |
| Executive review dependency            |    20 |
| Project blocker                        |    18 |
| Hiring or people decision              |    16 |
| Planning, budgeting, or forecasting    |    15 |
| Cross-team dependency                  |    10 |
| Internal update                        |     5 |
| FYI only                               |     2 |
| No demonstrated organisational impact  |     0 |

### Urgency Score (0-20)

Choose the strongest applicable current signal across the keyword and deadline tables. Do not add multiple urgency signals together.

| Current keyword signal | Score |
| ---------------------- | ----: |
| Urgent                 |    20 |
| Escalation             |    20 |
| Blocking               |    18 |
| Action required        |    18 |
| Today or EOD           |    15 |
| ASAP                   |    12 |
| This week              |     8 |

| Verified due time                 | Score |
| --------------------------------- | ----: |
| Less than 4 hours                 |    20 |
| Same day                          |    15 |
| Within 24 hours                   |    10 |
| Within 72 hours                   |     5 |
| More than 72 hours or no deadline |     0 |

Treat urgency words without a concrete current request as unverified. Prefer a verified deadline when wording and timing conflict.

### Actionability Score (0-15)

Choose the strongest signal that applies to the user now.

| Signal                                       | Score |
| -------------------------------------------- | ----: |
| Approval required                            |    15 |
| Decision required                            |    15 |
| Direct question to the user                  |    15 |
| Assigned action item                         |    12 |
| User mentioned by name with a clear ask      |    10 |
| Review requested                             |     8 |
| Informational only                           |     2 |
| CC only or another person owns the next move |     0 |

### Context Score (0-10)

Choose the strongest verified surrounding context.

| Context                            | Score |
| ---------------------------------- | ----: |
| Meeting within 24 hours            |    10 |
| Executive review within 24 hours   |    10 |
| Strategic workshop approaching     |     8 |
| Major milestone due this month     |     8 |
| Performance discussion approaching |     6 |
| Quarterly review approaching       |     6 |
| Project milestone due this week    |     5 |
| No verified time-bound context     |     0 |

## 4. Assign Email Categories

Assign each thread one `Important`, `Actionable`, `Waiting`, or `Noise` category using the shared Message Categories in the triage contract.

## 5. Output

Return one object per included thread using the triage contract Output Schema. Email-specific values:

- `source`: `email`
- `sourceLabel`: `Important`, `Actionable`, `Waiting`
- `timestamp`: when the email was sent
- `url`: Outlook link that opens the email or thread
