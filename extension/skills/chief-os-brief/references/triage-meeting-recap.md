# Teams Meeting Recap

Review completed Teams meetings from the preceding 48 hours and surface verified decisions, commitments, follow-up actions, risks, and waiting states.

Use with `triage-contract.md` for the shared workflow, context signals, URL rule, and output schema, and with `triage-scoring.md` for the scoring method. This file adds the completed-meeting evidence rules, pre-screen, context signals, five scoring components, and recap categories.

## Core Rules

- Use a rolling 48-hour window ending at the current local date and time. Include only meetings that have ended.
- Review meetings the user organised or attended, plus meetings where a recap, transcript, notes, or meeting chat explicitly assigns the user an action or records a decision that affects them.
- Do not infer attendance from accepted status, appearance on the attendee list, or an invitation response.
- Treat the Copilot recap, transcript, shared meeting notes, and substantive meeting chat as outcome evidence. Never treat the invitation agenda or meeting title as evidence that a discussion, decision, or commitment occurred.
- Summarise one current outcome state per meeting. Do not produce minutes, a chronological transcript summary, or one item per action.
- Never invent a decision, owner, deadline, attendee statement, commitment, or meeting outcome. When evidence conflicts, describe the conflict and recommend verification.
- Do not store raw transcripts, verbatim meeting notes, or one-off recap content in `memory.md`.

## 1. Gather Meeting Evidence

For each eligible Teams meeting, gather available evidence in this order:

1. Teams or Copilot meeting recap.
2. Meeting transcript.
3. Shared meeting notes.
4. Substantive meeting chat sent during or after the meeting.
5. Calendar metadata for identity, timing, organiser, attendees, and links only.

Use later evidence when it updates or corrects an earlier artifact. A transcript or generated recap may attribute an action incorrectly; prefer an explicit correction or confirmation in meeting chat or shared notes.

When no recap, transcript, notes, or substantive meeting chat is available, omit the meeting. Do not reconstruct an outcome from calendar metadata.

## 2. Pre-Screen Meetings

Silently exclude and omit:

- Meetings that have not ended or ended more than 48 hours ago.
- Cancelled or declined events.
- Non-Teams meetings without accessible outcome evidence.
- Meetings the user did not attend unless evidence explicitly assigns the user an action or records a decision that affects them.
- Routine meetings with no verified decision, commitment, user-owned action, material risk, blocker, or waiting state.
- Social events, broadcasts, training sessions, and informational recordings without a specific relevant outcome.
- Duplicate recap artifacts for the same meeting occurrence.

Exception: retain a meeting when the available evidence establishes a material decision, risk, commitment, or user-owned action even if the meeting would otherwise be excluded.

## 3. Establish Current Context

Establish the shared context signals from the triage contract, reading "sender or organiser" as the meeting organiser. Add these recap-specific signals:

- Participation evidence: whether the user organised, attended, spoke, or was explicitly assigned an outcome.
- Evidence provenance: recap, transcript, shared notes, meeting chat, or a combination.
- Decision state: proposed, made, deferred, reversed, or awaiting confirmation.
- Action state: action, owner, deadline, completion evidence, and whether the next move belongs to the user or another person.
- Commitment state: customer, delivery, operational, people, financial, legal, or strategic commitment created or changed in the meeting.
- Follow-up state: blocker, unresolved question, dependency, risk, or item awaiting another person.
- Cross-channel state: whether email or Teams chat confirms, changes, completes, or duplicates the meeting outcome.

## 4. Meeting Recap Scoring Components

Apply the scoring model in `triage-scoring.md` with the five components below, then sum, multiply, cap, band, rank, and categorise as the scoring model and triage contract describe. Score the current unresolved outcome, not the importance of holding the meeting.

### Business Impact Score (0-30)

Choose the strongest verified organisational consequence.

| Meeting outcome                                              | Score |
| ------------------------------------------------------------ | ----: |
| Service, safety, compliance, security, or continuity impact  |    30 |
| Material customer risk or active escalation                  |    30 |
| Major business opportunity or material revenue outcome       |    28 |
| Strategic objective at risk or irreversible decision         |    25 |
| Critical delivery blocker or executive review dependency     |    22 |
| Major milestone or critical cross-team dependency            |    18 |
| Hiring, people, planning, budgeting, or forecasting decision |    15 |
| Operational commitment or working-session outcome            |    10 |
| Routine status outcome                                       |     5 |
| Informational outcome with no demonstrated consequence       |     2 |
| No verified organisational consequence                       |     0 |

### Action and Ownership Score (0-25)

Choose the strongest current responsibility owned by the user.

| Current user responsibility                                            | Score |
| ---------------------------------------------------------------------- | ----: |
| Time-critical decision or approval required to unblock an outcome      |    25 |
| Owns a blocking deliverable, commitment, or explicitly assigned action |    22 |
| Owns a decision, customer follow-up, or material response              |    18 |
| Owns a review, non-blocking deliverable, or coordination action        |    15 |
| Owns a simple follow-up, acknowledgement, or scheduling action         |     5 |
| Another person owns the next move or no user action is required        |     0 |

Do not assign ownership from proximity, expertise, or attendance. The evidence must name the user, clearly attribute the commitment to them, or record their explicit acceptance of it.

### Time Criticality Score (0-20)

Choose the strongest current timing consequence.

| Current timing consequence                             | Score |
| ------------------------------------------------------ | ----: |
| Material consequence or required action within 4 hours |    20 |
| Active incident or same-day deadline                   |    18 |
| Verified deadline or decision required within 24 hours |    15 |
| Verified deadline or dependency within 72 hours        |    10 |
| Verified deadline this week                            |     5 |
| No verified deadline or timing consequence             |     0 |

The meeting's recency does not add urgency. Use only a verified deadline, dependency, or consequence recorded in the evidence.

### Decision and Risk Score (0-15)

Choose the strongest verified decision or exposure that remains relevant now.

| Current decision or exposure                                       | Score |
| ------------------------------------------------------------------ | ----: |
| Active escalation, compliance, security, or customer-at-risk issue |    15 |
| Irreversible decision, production risk, or continuity exposure     |    15 |
| Critical dependency or material opportunity loss                   |    12 |
| Open decision, blocker, or milestone dependency                    |    10 |
| Material decision made that changes planned work                   |     8 |
| Routine decision, dependency, or unresolved question               |     3 |
| No verified decision, risk, or dependency                          |     0 |

### Stakeholder Relevance Score (0-10)

Choose one relationship to the recorded outcome. Score accountability and direct effect, not title or prestige.

| Relationship to the outcome                                                    | Score |
| ------------------------------------------------------------------------------ | ----: |
| Accountable owner, final decision-maker, or directly affected customer         |    10 |
| Critical dependency owner, accountable sponsor, or initiative owner            |     8 |
| Core cross-functional partner, subject-matter owner, or affected person        |     6 |
| Manager, direct report, peer, or frequent collaborator relevant to the outcome |     4 |
| Known contact without a demonstrated outcome dependency                        |     2 |
| Broad audience or no evidenced relevance                                       |     0 |

## 5. Assign Meeting Recap Categories

Assign each retained meeting one category using this precedence: `Action Required`, `Waiting`, then `Decision / Outcome`. Do not duplicate a meeting across categories. Preserve additional decisions, commitments, or waiting context in `summary` and `recommendedAction`.

### Action Required

The user owns an outstanding decision, response, approval, deliverable, commitment, or follow-up recorded in the meeting evidence.

### Waiting

Another person owns the next move and the user is waiting for a decision, response, delivery, or outcome. When elapsed time or documented risk means the user should chase now, use `Action Required` instead.

### Decision / Outcome

The meeting produced a material verified decision, commitment, resolved blocker, or changed plan that remains relevant, and no follow-up is currently owned by the user or another identified person.

### Noise

Meetings without a qualifying current outcome are omitted.

## 6. Cross-Channel Reconciliation

- Keep one recap object per meeting occurrence, even when several artifacts describe it.
- When email or meeting chat confirms, changes, or completes an outcome, use the latest verified state.
- Do not repeat the same action as separate meeting and chat recap items. Keep the meeting recap as the outcome record unless the later message creates a distinct ask or changes ownership, deadline, or risk.
- Let `output-todo.md` merge a meeting-derived action with an existing task that represents the same obligation.
- In Afternoon Recap mode, compare against the morning baseline. Omit unchanged decision-only recaps, but retain unresolved actions, waiting states, changed outcomes, and meetings completed since the morning run.

## 7. Calibration

- Transcript or recap availability alone does not make a meeting worth surfacing.
- A generated action list is evidence to evaluate, not permission to assign every listed action to the user.
- A meeting with senior attendees is not important unless its verified outcome establishes impact, ownership, urgency, risk, or a relevant decision.
- A meeting ending recently is not urgent without a current timing consequence.
- Do not state that no decision was made when the available evidence is incomplete; omit the meeting instead.

## 8. Output

Return one object per included meeting using the triage contract Output Schema. Meeting-recap-specific values:

- `source`: `meeting`
- `sourceLabel`: `Action Required`, `Waiting`, or `Decision / Outcome`
- `timestamp`: the meeting end date and time
- `authorName`: organiser display name, or `null` when unavailable
- `authorRole`: organiser email address or role, or `null` when unavailable
- `subject`: meeting title
- `summary`: one or two sentences covering the verified outcome, decision, ownership, deadline, risk, or waiting state that makes the meeting relevant
- `url`: verified absolute Teams recap, transcript, meeting notes, meeting chat, or Outlook event link, in that preference order
- `recommendedAction`: the user's concise next step; use `null` when no user action is needed

Omit the meeting when no verified absolute source link is available.
