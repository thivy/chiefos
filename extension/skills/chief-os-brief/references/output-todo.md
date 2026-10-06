# To-Do

Reconcile the live `todo.md` with the email, chat, calendar, and meeting recap triage results.

## Workflow

### Stage 1. Load the Existing Task File

Work only on the live `todo.md`.

- Read both active `- [ ]` and completed `- [x]` tasks. Preserve active tasks unless resolved or merged, and retain completed tasks as completion history.
- Match by source or thread and the specific obligation, not title or URL alone. A recorded completion, including an explicit user completion, stays completed despite unchanged source messages. New evidence of a distinct obligation creates a new active task; it does not reopen the old one.
- A task that ends with the `Reopened.` mark stays active until the user completes it, even when source evidence shows it resolved. Keep the mark when you merge or update that task.

### Stage 2. Generate the Todos

Only after Stage 1 is complete:

- Create one `Active` todo for each unmatched, outstanding user-owned response, decision, approval, delivery, preparation item, conflict resolution, or follow-up.
- Skip informational, noise, and FYI-only items unless they carry a specific user-owned next step.
- Merge source items that describe the same obligation into one todo, keeping the strongest source label, earliest deadline, clearest owner, and best link. Emit no duplicates.
- Newly mark a task `Completed` only on explicit user confirmation or source evidence of resolution. Age or a meeting time having passed is not evidence.
- Set `sourceContext` to the source label alone, such as `Important`, `Conflicts`, `Preparation`, `To Do`, or `Waiting`. Never add a chat, thread, or meeting name to it.
- Write `title` as an imperative of at most 8 words naming the decision or deliverable, e.g. `Send the Contoso renewal price to Sam`. Put why it matters in a one-sentence `summary`, and the next step or completion note in `recommendedAction`.
- Copy `url` from the originating triage item. A manual todo uses the absolute source URL supplied with it.
- Replace `todo.md` in place with the reconciled active tasks and completion history. For the briefing's `todo.items`, include active tasks and completions confirmed by this run's source evidence, not the entire completion history.

## Status Changes

The user changes a task's status with `chief-os-todo-complete` or with the task toggle in the `chiefos` app. Each change edits one task line and keeps every other line exactly as it was.

- **Done:** move the line to the end of `## Completed`. Change `- [ ]` to `- [x]` and `Next step:` to `Completed:`, and remove a `Reopened.` mark from the end of the line.
- **Not done:** move the line to the end of `## Active`. Change `- [x]` to `- [ ]` and `Completed:` to `Next step:`, and end the line with the `Reopened.` mark, after a space.

Locate the line by its exact bold title and `Link:` URL. When the line already has the new status, change nothing. When the line or its target section is not found exactly once, change nothing and report it.

## Output Schema

`TodoItem` in [output-briefing.md](output-briefing.md) defines the fields. Use it as the single source of the shape.

## Markdown Template

Use the following template to generate `todo.md`:

```markdown
# Your Tasks

## Active

- [ ] **Todo title** - Summary. Next step: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.

## Completed

- [x] **Todo title** - Summary. Completed: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.
```
