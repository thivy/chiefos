---
name: chief-os-brief
description: "Use when generating a daily assistant briefing or triaging Microsoft 365 signals: morning brief, start-of-day briefing, afternoon recap, end-of-day recap, daily wrap-up, tomorrow prep, recent Teams meeting recap, or triaging email, calendar, Teams chat, or completed meetings on their own."
---

# ChiefOS Brief

Produce the daily assistant briefing, refresh Microsoft 365 priorities, and update the action list. This skill owns the whole workflow; each numbered step names the reference file to read before running it.

The skill runs in one of two modes:

- **Morning Brief**: start-of-day briefing that scans Microsoft 365 priorities and creates the current action list.
- **Afternoon Recap**: afternoon or end-of-day refresh that summarises what changed, resolves completed work, and carries unresolved actions forward with tomorrow prep.

## Select the Mode

Choose the mode before starting the workflow, using the current local date and time:

- If the user explicitly asks for a morning brief, use **Morning Brief** regardless of the current time.
- If the user explicitly asks for an afternoon recap, end-of-day recap, daily wrap-up, or tomorrow prep, use **Afternoon Recap** regardless of the current time.
- If no mode is named, use **Morning Brief** before local noon and **Afternoon Recap** from local noon onward.
- Run exactly one mode unless the user explicitly asks for both.

## Working Directory

`<working directory>` is `/output`. It holds three working files, each replaced in place every run:

- `briefing.html`: the generated briefing output.
- `todo.md`: the live task file.
- `memory.md`: durable local context used by triage.

Do not create timestamped, backup, or history copies of these files.

`<skill directory>` is the absolute parent directory of this loaded `SKILL.md`. Resolve packaged files from that directory regardless of the current working directory:

- `<skill directory>/assets/briefing.html`
- `<skill directory>/scripts/inject-data.ts`

Never resolve `assets/` or `scripts/` relative to `/output`, the repository root, or the shell's current directory.

## Invariants

These always hold, including when a reference file has not been read.

- Apply `references/conventions.md` to every user-facing word in the run.
- Use the current local date and time for all date calculations, greetings, and timestamps.
- Never send email during the run except the single self-addressed summary at step 8. Step 4 only creates or updates unsent Outlook drafts.
- Never invent recipients, links, facts, commitments, dates, attachments, or signatures. Skip the item instead.
- Compose every image prompt through the `chief-os-image-prompt` skill. Never author, paraphrase, or reuse an image prompt directly.
- Treat files under `assets/` and `scripts/` as read-only packaged templates.
- Verify a step's postconditions before reporting it complete. Never report success, delivery, or completion you have not confirmed.
- Do not expose triage scores, priority bands, or classification logic in user-facing output.
- Do not store passwords, keys, tokens, secrets, or sensitive personal data in `memory.md`.

## Workflow

Follow these steps in order. Do not skip or rearrange them.

### 0. Prepare Working Files

- Read `references/conventions.md`.
- Resolve `<skill directory>` from this loaded `SKILL.md`, then confirm `<skill directory>/assets/briefing.html` and `<skill directory>/scripts/inject-data.ts` both exist and are non-empty. If either absolute path is unavailable, stop and report that the installed ChiefOS package is incomplete. Do not recreate the generator, copy the template, or substitute another HTML layout.
- Create `<working directory>` when it does not exist. Stop and report the filesystem error when it cannot be created or written.
- Read `references/output-memory.md`. When `<working directory>/memory.md` is missing or empty, create it from that reference's template. Treat it as read-only context until step 7.
- Read `references/output-todo.md`. When `<working directory>/todo.md` is missing or empty, create it from that reference's template, then load the existing active tasks as input to this run.
- Confirm both files exist and are non-empty before triage begins. Repair a failing file from its reference and revalidate; do not continue while a check is failing.
- **Afternoon Recap:** also read the existing `<working directory>/briefing.html` when present to establish the morning baseline, and preserve unresolved active tasks unless source evidence shows they are completed or obsolete. Do not fail the recap when no baseline exists.

### 1. Triage Current Signals

- Read `references/triage-contract.md` and `references/triage-scoring.md`. They define the shared workflow, context signals, categories, URL rule, scoring method, and output schema for all four sources.
- Read `references/triage-email.md`, then triage email for the current local date.
- Read `references/triage-calendar.md`, then triage calendar events for today and tomorrow.
- Read `references/triage-chat.md`, then triage Teams chats and channel threads.
- Read `references/triage-meeting-recap.md`, then triage completed Teams meetings from the preceding 48 hours.
- Do not derive to-dos yet.

**Morning Brief lens:**

- Email: prioritise important, actionable, and waiting email that can affect today or the next five days.
- Calendar: prioritise today's required meetings, conflicts, preparation needs, and time-sensitive tomorrow meetings.
- Chat: prioritise direct asks, unresolved mentions, important threads, and waiting items.
- Meeting recaps: prioritise unresolved user actions, material decisions, changed commitments, risks, and waiting states from completed meetings.

**Afternoon Recap lens:**

- Email: prioritise new, newly important, unresolved, waiting, or time-sensitive email.
- Chat: prioritise new asks, unread or unanswered messages, waiting threads, and decisions still owed by the user.
- Calendar: prioritise remaining meetings today, unresolved conflicts, follow-ups from earlier meetings, and preparation for tomorrow.
- Meeting recaps: prioritise meetings completed since the morning run plus changed or unresolved actions, decisions, risks, commitments, and waiting states from the preceding 48 hours.
- Omit completed or informational items unless they explain a resolved decision, a blocker, a new commitment, or tomorrow's preparation.
- Do not repeat stale morning items unless they remain actionable, waiting, blocked, or relevant to tomorrow.

### 2. Build the Summary

Write the top-level `summary` from the assembled email, calendar, chat, and meeting recap items.

- Use 2 to 4 sentences, under 100 words, with no bullet points.
- Write for an executive audience: concise, strategic, and decision-oriented. Do not narrate as an assistant, and do not open with phrases like "Here is" or "This briefing".
- Cover, when relevant: decisions or approvals needed today; recent meeting decisions or commitments; calendar conflicts, preparation needs, or attendance trade-offs; customer, manager, executive, legal, finance, or delivery commitments; deadlines, risks, blockers, incidents, or dependencies; waiting items to monitor.
- Do not describe missing data unless the absence changes the executive view.
- **Morning Brief:** focus on today's priorities, decisions, preparation, and time-sensitive follow-up.
- **Afternoon Recap:** emphasise decisions made, open decisions, blockers, overdue responses, waiting items, and tomorrow preparation.

### 3. Update the To-Do Output

- Read `references/output-todo.md`, then derive the current run's tasks from the assembled briefing content.
- Preserve active existing todos unless they are merged with a newly generated todo.
- Add the To-Do section to the briefing only during this step.
- Replace `<working directory>/todo.md` in place at the end of the step.
- **Afternoon Recap:** mark tasks completed only when source evidence confirms the user has responded, delivered, decided, rescheduled, or otherwise resolved the action. Carry forward unresolved active tasks and create tomorrow-preparation tasks when the source evidence requires them.

### 4. Draft Email Actions

- Run this step only after `<working directory>/todo.md` has been finalised.
- Read `references/email-draft.md`, then use the final active todos as the source for creating, updating, leaving unchanged, or safely skipping Outlook drafts.
- Treat no eligible email actions as a valid outcome, and never send email during this step.

### 5. Assemble the Briefing Output

- Read `references/output-briefing.md`, then build the schema-valid briefing JSON and keep it in memory.
- Set `greeting` to a mode-appropriate greeting and `date` to the current local date.
- Include the assembled `emails`, `calendar`, `chats`, `recaps`, and `todo` collections. For Afternoon Recap, include only relevant items in each collection and use an empty array when a collection has none.
- From `<working directory>`, run the injector at the absolute path `<skill directory>/scripts/inject-data.ts` to replace `<working directory>/briefing.html` in place from that JSON. The injector reads `<skill directory>/assets/briefing.html`; do not generate a separate HTML document.
- Re-read the generated `daily-briefing-data` block and confirm it parses to the same JSON value held in memory.
- Treat generator failure, or a missing or empty generated file, as a failed run.

### 6. Apply the Artifact Image

- Read `references/output-image.md`, then invoke the `chief-os-image-prompt` skill once per task in the final schema-valid JSON to compose that task's prompt.
- When tasks exist, this skill call is mandatory once per task. Never batch the tasks into one call, skip a task, or substitute your own wording because a task looks simple or resembles an earlier run. When `todo.items` is empty, make zero calls and generate the empty task composition required by `references/output-image.md`.
- Assemble the returned prompts into one combined prompt, generate the image, and save it as `<working directory>/artifact-image.png`.
- Record the outcome, including the number of `chief-os-image-prompt` calls made. Do not claim an image was created when image generation is unavailable or a validation check is still failing.

### 7. Validate Completion

- Confirm step 4 ran after the final todo update and that any generated email remains unsent in Outlook Drafts.
- Confirm step 6 ran after the final JSON was assembled, that one `chief-os-image-prompt` call was made per task, and include its reported outcome.
- Update `<working directory>/memory.md` per `references/output-memory.md`, and only when new durable context was found this run.
- Confirm `<working directory>/briefing.html` and `<working directory>/todo.md` exist, are non-empty, and were updated during this run. Confirm `<working directory>/memory.md` exists and is non-empty; it may remain unchanged when no new durable context was found.
- Confirm the packaged `assets/briefing.html` template was not modified.
- Repair any failing check from its reference and revalidate. Do not claim success while a check is failing.

### 8. Send the Email Summary

- Read `references/email-send-summary.md`, then send the summary after all step 7 checks have passed.
- Pass the final schema-valid JSON in memory and the validated `<working directory>/artifact-image.png`, and set the run label to the current mode: `Morning Brief` or `Afternoon Recap`.
- Attach the generated image as `artifact-image.png` with content type `image/png`. Do not send the summary when the attachment cannot be prepared and verified.
- Include the exact `Sent` or `Failed` result in the final run response. Do not claim delivery when the send fails or the result is ambiguous.

## Partial Runs

When the user asks for one source only, such as "triage my email", "what is on my calendar", "catch up on Teams", or "recap my Teams meetings from the past two days", run step 0, then step 1 for that source only, and report the results directly. Skip steps 2 to 8 unless the user also asks for the full briefing, the to-do update, or the artifacts.

## References

- [references/conventions.md](references/conventions.md) (every step): voice, formatting, and run contract.
- [references/output-memory.md](references/output-memory.md) (steps 0, 7): `memory.md` rules and template.
- [references/output-todo.md](references/output-todo.md) (steps 0, 3): `todo.md` rules, schema, and template.
- [references/triage-contract.md](references/triage-contract.md) (step 1): shared triage workflow, categories, URL rule, output schema.
- [references/triage-scoring.md](references/triage-scoring.md) (step 1): attention score, multipliers, priority bands, calibration.
- [references/triage-email.md](references/triage-email.md) (step 1): email pre-screen and five scoring components.
- [references/triage-calendar.md](references/triage-calendar.md) (step 1): calendar pre-screen, components, conflict protocol.
- [references/triage-chat.md](references/triage-chat.md) (step 1): Teams pre-screen and five scoring components.
- [references/triage-meeting-recap.md](references/triage-meeting-recap.md) (step 1): completed Teams meeting evidence, scoring, decisions, actions, and follow-up states.
- [references/email-draft.md](references/email-draft.md) (step 4): Outlook draft creation, matching, and validation.
- [references/output-briefing.md](references/output-briefing.md) (step 5): briefing schema and generator usage.
- [references/output-image.md](references/output-image.md) (step 6): visual brief content mapping and style preference.
- [references/email-send-summary.md](references/email-send-summary.md) (step 8): summary email assembly and send.
- [references/email-html-design.md](references/email-html-design.md) (step 8): email-safe HTML and visual language.
- [assets/briefing.html](assets/briefing.html) (step 5): packaged briefing template, read-only.
- [scripts/inject-data.ts](scripts/inject-data.ts) (step 5): Bun generator that injects the JSON into the template.
