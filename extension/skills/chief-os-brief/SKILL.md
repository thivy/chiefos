---
name: chief-os-brief
description: "Use when generating a daily assistant briefing or triaging Microsoft 365 signals: morning brief, start-of-day briefing, afternoon recap, end-of-day recap, daily wrap-up, tomorrow prep, recent Teams meeting recap, or triaging email, calendar, Teams chat, or completed meetings on their own."
---

# ChiefOS Brief

Produce the daily assistant briefing, refresh Microsoft 365 priorities, and update the action list. Each numbered step names the reference to read before running it.

## Modes

- **Morning Brief:** lead with today's priorities, preparation, and time-sensitive follow-up.
- **Afternoon Recap:** lead with changes since morning, decisions made or still open, overdue responses, and tomorrow preparation.

Run exactly one mode unless the user asks for both. Use the mode the user names, whatever the time. Otherwise use Morning Brief before local noon and Afternoon Recap from noon onward.

## Run Scope

Select the row matching the request before running any steps. Honour explicit exclusions; asking for tasks or artifacts does not authorise drafting or sending email.

| Request                             | Steps                                 |
| ----------------------------------- | ------------------------------------- |
| Full briefing                       | 0 through 8                           |
| One-source triage                   | 0, 1 for that source; report directly |
| To-do update                        | 0, 1, 3, 7                            |
| Briefing artifacts without delivery | 0, 1, 2, 3, 5, 6, 7                   |

For partial runs, draft only when explicitly requested, after step 3. Send only when explicitly requested after steps 0, 1, 2, 3, 5, 6, and 7 succeed; step 4 is required only when selected. Scope triage to named sources, preserving existing tasks from other sources.

## Working Files

Use these live files in the output folder. Create missing inputs at step 0 and replace outputs only for selected steps. Never create timestamped, backup, or history copies.

- `briefing.html`: the generated briefing.
- `todo.md`: the live task file.
- `memory.md`: durable local context used by triage.
- `artifact-image.png`: the illustrated task list.

## Invariants

These hold on every run, whether or not a reference has been read.

- **Evidence only.** Never invent a person, recipient, link, fact, commitment, date, deadline, decision, owner, attachment, or signature. Omit the item instead.
- **Verifiable sources only.** Use only what is present in the item, its linked context, the calendar, the address book, or `memory.md`. Never infer importance, relationships, or deadlines from a title, domain, tone, or metadata alone. When evidence conflicts, state the conflict and recommend verification; when it is ambiguous, take the lower defensible reading.
- **Report actual outcomes.** Base completion and delivery reports on tool results, never assumptions.
- **Nothing internal leaks.** Keep scoring detail out of artifacts; show a separate scorecard only on explicit request. Never store secrets or sensitive personal data in a working file.
- Never send email during the run except the single self-addressed summary at step 8. Step 4 only creates or updates unsent Outlook drafts.
- Compose every image prompt through the `chief-os-image-prompt` skill, once per task. Never author, paraphrase, batch, or reuse a prompt yourself.
- Build `briefing.html` from `references/output-html-design.md` and the summary email from `references/email-html-design.md`. Use no other framework, visual language, or design system.

## Workflow

Run the selected steps in order. Stop on tool or file errors rather than continuing to delivery.

### 0. Prepare Working Files

- Read `references/conventions.md` and apply it to all user-facing output.
- Read `references/output-memory.md`. Create `memory.md` from its template when missing or empty, then treat it as read-only until step 7.
- Read `references/output-todo.md`. Create `todo.md` from its template when missing or empty, then load both active tasks and completion history.
- **Afternoon Recap:** also read the existing `briefing.html` when present as the morning baseline. Do not fail the recap when none exists.

### 1. Triage Current Signals

Read `references/triage.md`, then triage the selected sources in order: email, calendar, Teams chats and channel threads, and completed Teams meetings. Use each profile's time window. Do not derive to-dos yet.

Before scoring, reconcile obligation state with loaded completion history using the matching rule in `references/output-todo.md`. Unchanged messages must not describe a completed obligation as still owed in summaries, source cards, or recommended actions. This does not hide new, distinct obligations from the same source.

**Afternoon Recap:** omit completed or informational items unless they explain a resolved decision, a blocker, a new commitment, or tomorrow's preparation. Do not repeat stale morning items that are no longer actionable.

### 2. Build the Summary

Write the top-level `summary` from the triaged items: 2 to 4 sentences, under 100 words, no bullet points.

Write for an executive audience: concise, strategic, decision-oriented. Do not open with "Here is" or "This briefing". Cover, when relevant, decisions needed today, recent meeting commitments, calendar conflicts and preparation, stakeholder commitments, deadlines, risks, blockers, and waiting items. Mention missing data only when its absence changes the executive view.

### 3. Update the To-Do Output

Reconcile `todo.md` using `references/output-todo.md`, which owns completion, merging, and the briefing's task selection. Carry unresolved tasks forward; in Afternoon Recap, include evidenced tomorrow-preparation actions.

### 4. Draft Email Actions

Read `references/email-draft.md`, then use the final active todos as the source for creating, updating, leaving unchanged, or skipping Outlook drafts. Run this only after `todo.md` is final. No eligible email actions is a valid outcome.

### 5. Assemble the Briefing Output

- Read `references/output-briefing.md`, then build the briefing JSON using its schema and keep it in memory.
- Set `greeting` for the mode, `date` to the current local date, and `person_name` from the signed-in user's Microsoft 365 profile.
- Read `references/output-html-design.md`, then render the JSON into `briefing.html` as a complete standalone document.

### 6. Apply the Artifact Image

Read `references/output-image.md`, then follow it to compose one prompt per task, generate the combined image, and save `artifact-image.png`. Report the number of `chief-os-image-prompt` calls made.

### 7. Update Memory

Update `memory.md` per its reference only for new durable context. Otherwise leave it unchanged.

### 8. Send the Email Summary

Send only after the selected earlier steps succeed.

1. Resolve the signed-in user's primary Outlook mailbox from Microsoft 365 profile data.
2. Read `references/email-html-design.md` in full and build the body from the final JSON using its layout and section order.
3. Attach this run's `artifact-image.png` as a regular file attachment named `artifact-image.png` with content type `image/png`. Do not inline it or substitute a path, URL, or data URL. Stop with `Failed` if the attachment cannot be verified.
4. Send one email from the signed-in user to that same mailbox, subject `<Morning Brief|Afternoon Recap> | <local date>`.
5. Report the exact `Sent` or `Failed` result. Do not retry an unknown result, which could duplicate the send.
