# Chat Triage

Triage Microsoft Teams chats, channel threads, and unread or unanswered messages.

Use with `triage-contract.md` for the workflow, shared context signals, message categories, URL rule, and output schema, and with `triage-scoring.md` for the scoring method. This file adds the chat-specific pre-screen, context signals, and five scoring components.

## Core Rules

- Analyse Teams messages from the last 10 days, inclusive of all messages from today.
- Include older thread context when the latest unresolved ask is still awaiting the user's response.
- Summarise chat threads and channel conversations when possible instead of listing each message separately.
- Consider unread messages and messages already read but not yet answered. A message awaiting the user's response stays in scope until the user responds.
- Score the current unresolved state of each retained thread, not every message in the thread.
- Treat unread state, direct messages, mentions, chat type, and organisational titles as evidence to investigate, not automatic priority.
- Preserve the distinction between direct messages and channel messages for routing, but do not expose it as internal reasoning.

## 1. Pre-Screen Messages

Silently exclude and omit:

- System notifications, such as members added or removed, calls started or ended, and meeting-start banners.
- Bot and connector messages that do not require action, such as build pipeline updates, status pings, and automated digests.
- Reaction-only activity with no substantive content.
- Routine `@channel` or `@team` broadcasts that are purely informational.

Exception: keep any message that contains a specific time-sensitive request or a clear ask from a known contact. Read status alone is never a reason to exclude a message while a response is still owed.

## 2. Establish Current Context

Establish the shared context signals from the triage contract, including the message-channel signals (prior interaction, attachments, and thread state), plus these chat-specific signals:

- Conversation shape: direct message, group chat, or channel thread.
- Direct mention: specific `@mention` versus blanket `@channel` or `@team` mention.

## 3. Chat Scoring Components

Apply the scoring model in `triage-scoring.md` with the five chat components below, then sum, multiply, cap, band, rank, and categorise as the scoring model and triage contract describe. Recalculate from the latest thread state; when the user has answered and another person owns the next move, lower action ownership and route the thread to `Waiting` unless a follow-up is now required.

### Business Impact Score (0-30)

Choose the strongest evidenced organisational consequence.

| Scenario                                                     | Score |
| ------------------------------------------------------------ | ----: |
| Service disruption, safety, compliance, or continuity impact |    30 |
| Material customer risk or active escalation                  |    30 |
| Major business opportunity or material revenue outcome       |    28 |
| Strategic objective at risk or irreversible decision         |    25 |
| Critical delivery blocker or executive review dependency     |    22 |
| Major milestone or critical cross-team dependency            |    18 |
| Hiring, people, planning, budgeting, or forecasting decision |    15 |
| Operational coordination                                     |    10 |
| Routine internal update                                      |     5 |
| Informational or FYI only                                    |     2 |
| No demonstrated organisational consequence                   |     0 |

### Action and Ownership Score (0-25)

Choose the strongest action that applies to the user now. An unread message is not necessarily actionable, and a read message can remain actionable until the user responds.

| Current user responsibility                                        | Score |
| ------------------------------------------------------------------ | ----: |
| Time-critical decision or approval needed to unblock an outcome    |    25 |
| Owns a blocking response, deliverable, or explicitly assigned task |    22 |
| Direct question or request requiring the user's specific input     |    18 |
| Review, sign-off, follow-up, or non-blocking deliverable required  |    15 |
| Specifically mentioned with a clear ask                            |    12 |
| Acknowledgement, scheduling, or simple administrative reply        |     5 |
| Informational only or another person owns the next move            |     0 |

### Urgency Score (0-20)

Choose the strongest current timing consequence. Prefer a verified deadline or event dependency over urgency wording.

| Current timing consequence                                      | Score |
| --------------------------------------------------------------- | ----: |
| Material consequence or required action within 4 hours          |    20 |
| Active incident or same-day deadline                            |    18 |
| Verified deadline or decision required within 24 hours          |    15 |
| Verified deadline or dependency within 72 hours                 |    10 |
| Verified deadline this week                                     |     5 |
| Explicit urgent or blocking wording tied to a current clear ask |     5 |
| More than one week away or no verified timing consequence       |     0 |

Words such as `urgent`, `ASAP`, `blocked`, `critical`, `today`, or `customer waiting` are evidence to investigate, not automatic maximum scores. Use only the highest supported urgency signal; do not add keyword and deadline scores.

### Risk and Dependency Score (0-15)

Choose the strongest evidenced exposure. Score the likelihood or dependency here and the organisational consequence under Business Impact.

| Current exposure                                                  | Score |
| ----------------------------------------------------------------- | ----: |
| Active escalation, customer-at-risk, compliance, or security risk |    15 |
| Production, delivery, safety, or business continuity risk         |    15 |
| Critical dependency or material opportunity loss                  |    12 |
| Decision or milestone dependency at risk                          |    10 |
| Team wellbeing or material people risk                            |     8 |
| Repeated unanswered follow-ups with a documented delay risk       |     6 |
| Routine dependency with no current risk signal                    |     3 |
| No risk or dependency identified                                  |     0 |

### Stakeholder Relevance Score (0-10)

Choose one relationship to the current outcome. Score accountability, dependency, and direct effect, not prestige or job title.

| Relationship to the current outcome                                              | Score |
| -------------------------------------------------------------------------------- | ----: |
| Accountable outcome owner, final decision-maker, or directly affected customer   |    10 |
| Critical dependency owner, accountable sponsor, or initiative owner              |     8 |
| Core cross-functional partner, subject-matter owner, or directly affected person |     6 |
| Manager, direct report, peer, or frequent collaborator relevant to this work     |     4 |
| Known contact without a demonstrated outcome dependency                          |     2 |
| Broad group, channel audience, or no evidenced relevance                         |     0 |

An executive receives sponsor-level points only when evidence shows accountability for the outcome. A customer receives the maximum only when the conversation concerns a documented customer outcome. Reporting hierarchy alone never earns additional points.

## Signal Handling

Signals that were traditionally automatic boosters are handled inside the evidence-based components instead:

- A manager, executive, or external stakeholder affects only Stakeholder Relevance unless the content establishes impact, ownership, urgency, or risk.
- An assigned action or direct mention affects Action and Ownership only when a clear current ask exists.
- A meeting within 24 hours affects Urgency only when the conversation establishes a required decision, deliverable, or consequence before that meeting.
- Multiple follow-ups affect Risk and Dependency only when the delay has a documented consequence.
- Recency breaks otherwise unresolved ties; it never adds points or clears an older obligation.

## 4. Assign Chat Categories

Assign each thread one `Important`, `Actionable`, `Waiting`, or `Noise` category using the shared Message Categories in the triage contract.

## 5. Chat Calibration

In addition to the shared calibration checks:

- A group or channel message with a specific high-impact ask can outrank a low-impact direct message.

## 6. Output

Return one object per included thread using the triage contract Output Schema. Chat-specific values:

- `source`: `chat`
- `sourceLabel`: `Important`, `Actionable`, `Waiting`
- `timestamp`: when the latest relevant message was sent
- `summary`: add the latest ask and who is waiting on whom when it changes the recommended action.
- `url`: Teams deep link that opens the message or thread
