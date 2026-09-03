---
name: chief-os-brief
description: "Use when generating a daily assistant briefing or triaging Microsoft 365 signals: morning brief, start-of-day briefing, afternoon recap, end-of-day recap, daily wrap-up, tomorrow prep, recent Teams meeting recap, or triaging email, calendar, Teams chat, or completed meetings on their own."
---

# ChiefOS Brief

Produce the daily assistant briefing, refresh Microsoft 365 priorities, and update the action list. Each numbered step names the reference to read before running it.

Follow `references/conventions.md` throughout. It holds the voice, evidence, working-file, and reporting rules, and no step restates them.

## Modes

- **Morning Brief:** start-of-day briefing that scans priorities and creates the current action list.
- **Afternoon Recap:** afternoon or end-of-day refresh that summarises what changed, resolves completed work, and carries unresolved actions forward with tomorrow prep.

Run exactly one mode unless the user asks for both. Use the mode the user names, whatever the time. Otherwise use Morning Brief before local noon and Afternoon Recap from noon onward.

## Working Files

In `/output`, created when missing:

- `briefing.html`: the generated briefing.
- `todo.md`: the live task file.
- `memory.md`: durable local context used by triage.
- `artifact-image.png`: the illustrated task list.

## Invariants

- Never send email during the run except the single self-addressed summary at step 8. Step 4 only creates or updates unsent Outlook drafts.
- Compose every image prompt through the `chief-os-image-prompt` skill, once per task. Never author, paraphrase, batch, or reuse a prompt yourself.
- Build `briefing.html` from `references/output-html-design.md` and the summary email from `references/email-html-design.md`. Use no other framework, visual language, or design system.

## Workflow

Run these steps in order.

### 0. Prepare Working Files

- Read `references/conventions.md`.
- Read `references/output-memory.md`. Create `memory.md` from its template when missing or empty, then treat it as read-only until step 7.
- Read `references/output-todo.md`. Create `todo.md` from its template when missing or empty, then load its active tasks as input to this run.
- Confirm both files exist and are non-empty before triage. Repair a failing file from its reference and revalidate.
- **Afternoon Recap:** also read the existing `briefing.html` when present as the morning baseline. Do not fail the recap when none exists.

### 1. Triage Current Signals

Read `references/triage.md`, then triage each source in turn: email, calendar events for today and tomorrow, Teams chats and channel threads, and Teams meetings completed in the preceding 48 hours. Do not derive to-dos yet.

- **Morning Brief:** surface what needs the user's attention today, including preparation and time-sensitive follow-up.
- **Afternoon Recap:** surface what changed since the morning run, what is still owed, and what tomorrow needs. Omit completed or informational items unless they explain a resolved decision, a blocker, a new commitment, or tomorrow's preparation, and do not repeat stale morning items that are no longer actionable.

### 2. Build the Summary

Write the top-level `summary` from the triaged items: 2 to 4 sentences, under 100 words, no bullet points.

Write for an executive audience: concise, strategic, decision-oriented. Do not open with "Here is" or "This briefing". Cover, when relevant, decisions needed today, recent meeting commitments, calendar conflicts and preparation, stakeholder commitments, deadlines, risks, blockers, and waiting items. Mention missing data only when its absence changes the executive view.

Morning Brief leads on today's priorities. Afternoon Recap leads on decisions made, decisions still open, overdue responses, and tomorrow preparation.

### 3. Update the To-Do Output

Read `references/output-todo.md`, then derive this run's tasks from the triaged content and replace `todo.md` in place. Preserve active existing todos unless merged with a new one, and add the To-Do section to the briefing only here.

**Afternoon Recap:** mark a task completed only when source evidence confirms the user resolved it. Carry unresolved tasks forward and add tomorrow-preparation tasks the evidence requires.

### 4. Draft Email Actions

Read `references/email-draft.md`, then use the final active todos as the source for creating, updating, leaving unchanged, or skipping Outlook drafts. Run this only after `todo.md` is final. No eligible email actions is a valid outcome.

### 5. Assemble the Briefing Output

- Read `references/output-briefing.md`, then build the schema-valid briefing JSON and keep it in memory.
- Set `greeting` for the mode, `date` to the current local date, and `person_name` from the signed-in user's Microsoft 365 profile.
- Include the `emails`, `calendar`, `chats`, `recaps`, and `todo` collections, using an empty array where a collection has none.
- Read `references/output-html-design.md`, then render the JSON into `briefing.html` as a complete standalone document.
- A rendering, validation, or output-file failure is a failed run.

### 6. Apply the Artifact Image

Read `references/output-image.md`, then follow it to compose one prompt per task, generate the combined image, and save `artifact-image.png`. Report the number of `chief-os-image-prompt` calls made.

### 7. Validate Completion

- Confirm step 4 ran after the final todo update and that every generated draft is still unsent.
- Confirm step 6 ran after the final JSON, with one `chief-os-image-prompt` call per task.
- Update `memory.md` per `references/output-memory.md`, and only when this run found new durable context.
- Confirm `briefing.html`, `todo.md`, and `memory.md` exist, are non-empty, and were written this run.
- Repair any failing check from its reference and revalidate.

### 8. Send the Email Summary

Send the summary only after every step 7 check passes.

1. Resolve the signed-in user's primary Outlook mailbox from Microsoft 365 profile data.
2. Read `references/email-html-design.md` in full and build the body from it alone. Include Overview, To Do, Email, Calendar, Teams Chat, and Meeting Recaps in that order, preserving item wording and source order.
3. Run its `Verify Before Output` checklist against the generated HTML and repair any failure. Report the outcome with the send result.
4. Attach the validated `artifact-image.png` as a regular file attachment named `artifact-image.png` with content type `image/png`. Do not inline it or substitute a path, URL, or data URL. Stop with `Failed` if the attachment cannot be verified.
5. Send one email from the signed-in user to that same mailbox, subject `<Morning Brief|Afternoon Recap> | <local date>`.
6. Report the exact `Sent` or `Failed` result. Do not retry an unknown result, which could duplicate the send.

## Partial Runs

When the user asks for one source only, such as "triage my email", "what is on my calendar", "catch up on Teams", or "recap my Teams meetings", run step 0, then step 1 for that source, and report the results directly. Skip steps 2 to 8 unless they also ask for the full briefing, the to-do update, or the artifacts.
