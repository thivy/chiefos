# To-Do

Generate the current run's `<working directory>/todo.md` output from email, Teams chat, calendar, and completed-meeting triage results.

## Core Rules

- Follow `conventions.md` for voice and formatting.
- Add a todo for any email, chat message, calendar event, or completed meeting that needs action or follow-up from the user.
- Skip items that do not require action.
- Do not add duplicate todos within the generated output.
- When multiple source items refer to the same todo, merge them into one todo and preserve the strongest source label, earliest deadline, clearest owner, and best source link.
- Every included todo must have a non-empty absolute source link in `url`; never omit `url`, return `null`, or invent a link. Stage 2 covers how to source it.

## Workflow

Follow these stages in order. Do not create new todos until Stage 1 is complete.

### Stage 1. Load the Existing Task File

- Work only on the live `<working directory>/todo.md` file.
- If `<working directory>/todo.md` does not exist, create it using the Markdown Template below.
- Read existing active `- [ ]` todos as input to the current run.
- Omit previously completed `- [x]` todos from the replacement output unless current-run source evidence independently confirms and includes them.
- Preserve active `- [ ]` todos in the live file unless they are merged with a newly generated todo.
- Do not create timestamped, backup, or history copies of `<working directory>/todo.md`.

### Stage 2. Todo Generation Rules

- Generate new todos from email, calendar, chat, and meeting recap triage results only after Stage 1 is complete.
- Create one `Active` todo for each outstanding response, decision, approval, delivery, preparation item, conflict resolution, or follow-up owned by the user.
- Create a todo from `recommendedAction` when it describes a concrete next step for the user.
- Do not create todos for informational, noise, or FYI-only items unless they contain a specific user-owned next step.
- Mark a todo `Completed` only when the source evidence confirms the user has already responded, delivered, decided, rescheduled, or otherwise resolved the action.
- Do not mark a todo `Completed` just because the source item is old or the meeting time has passed.
- Preserve priority by carrying the source label into `sourceContext`, especially for `Important`, `Conflicts`, `Prep Needed`, `Action Required`, and `Waiting` items.
- Convert the source item into a short imperative `title`, then use `summary` for context or outcome and `recommendedAction` for the next step or completion note.
- Copy the required `url` from the originating triage item. For a manual todo, use the non-empty absolute source URL supplied with or associated with the todo.
- Replace the live `<working directory>/todo.md` in place with the updated active and completed current-run todos.

## Output Schema

For each included todo, return:

- `status`: `Active` or `Completed`
- `source`: `email`, `calendar`, `chat`, `meeting`, or `manual`
- `title`: short todo title
- `summary`: one-line todo context or outcome
- `recommendedAction`: concise next step or completion note
- `sourceContext`: clearest available source label, subject, meeting title, thread topic, or source context; otherwise `null`
- `owner`: owner when known; otherwise `null`
- `deadline`: explicit due date or deadline; otherwise `null`
- `url`: required non-empty absolute direct source link

## Markdown Template

Use the following template to generate `<working directory>/todo.md`:

```markdown
# Your Actions

## Active

- [ ] **Todo title** - Summary. Next step: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.

## Completed

- [x] **Todo title** - Summary. Completed: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.
```
