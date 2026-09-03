# To-Do

Generate the current run's `todo.md` from the email, chat, calendar, and meeting recap triage results.

## Workflow

### Stage 1. Load the Existing Task File

Work only on the live `todo.md`, creating it from the template below when it does not exist.

- Read existing active `- [ ]` todos as input to this run and preserve them unless they are merged with a newly generated todo.
- Omit previously completed `- [x]` todos from the replacement output unless this run's source evidence independently confirms them.

### Stage 2. Generate the Todos

Only after Stage 1 is complete:

- Create one `Active` todo for each outstanding response, decision, approval, delivery, preparation item, conflict resolution, or follow-up owned by the user, including any `recommendedAction` that describes a concrete next step.
- Skip informational, noise, and FYI-only items unless they carry a specific user-owned next step.
- Merge source items that describe the same obligation into one todo, keeping the strongest source label, earliest deadline, clearest owner, and best link. Emit no duplicates.
- Mark a todo `Completed` only when source evidence confirms the user responded, delivered, decided, rescheduled, or otherwise resolved it. Age alone, or a meeting time having passed, is not evidence.
- Carry the source label into `sourceContext`, especially `Important`, `Conflicts`, `Prep Needed`, `Action Required`, and `Waiting`.
- Write a short imperative `title`, put context or outcome in `summary`, and the next step or completion note in `recommendedAction`.
- Copy `url` from the originating triage item. A manual todo uses the absolute source URL supplied with it.
- Replace `todo.md` in place with this run's active and completed todos.

## Output Schema

`TodoItem` in [output-briefing.md](output-briefing.md) defines the fields. Use it as the single source of the shape.

## Markdown Template

Use the following template to generate `todo.md`:

```markdown
# Your Actions

## Active

- [ ] **Todo title** - Summary. Next step: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.

## Completed

- [x] **Todo title** - Summary. Completed: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.
```
