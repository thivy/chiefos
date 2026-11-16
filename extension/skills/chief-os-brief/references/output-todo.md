# To-Do

Reconcile the live `todo.md` with this run's triage.

## Rules

- Read active `- [ ]` and completed `- [x]` tasks. Keep active tasks unless resolved or merged; keep completed ones as history.
- Match by source/thread and the specific obligation, not title or URL alone. A recorded completion stays completed despite unchanged source messages; a genuinely new obligation becomes a new task rather than reopening the old one.
- A task ending with the `Reopened.` mark stays active until the user completes it, even if the source looks resolved. Keep the mark when merging or updating it.
- Create one `Active` task per outstanding user-owned response, decision, approval, delivery, preparation, conflict or follow-up. Skip FYI and noise. Merge duplicates, keeping the strongest label, earliest deadline, clearest owner and best link.
- Mark `Completed` only on explicit user confirmation or source evidence of resolution, never because time passed.
- Fields follow `TodoItem` in [output-briefing.md](output-briefing.md). `title`: imperative, max 8 words (`Send the Contoso renewal price to Sam`). `summary`: one sentence on why it matters. `recommendedAction`: next step or completion note. `sourceContext`: the source label only. `url`: from the originating item.
- Replace `todo.md` in place. The briefing's `todo.items` holds active tasks plus completions confirmed by this run, not all history.

## Status changes (made by the app's task toggle)

Edit only the one task line, found by its exact bold title and `Link:` URL; leave every other line untouched.

- **Done:** move to the end of `## Completed`, `- [ ]` → `- [x]`, `Next step:` → `Completed:`, remove a trailing `Reopened.`.
- **Not done:** move to the end of `## Active`, `- [x]` → `- [ ]`, `Completed:` → `Next step:`, append ` Reopened.`.

If the line already has the new status, do nothing. If it isn't found exactly once, change nothing and report it.

## Template

```markdown
# Your Tasks

## Active

- [ ] **Todo title** - Summary. Next step: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.

## Completed

- [x] **Todo title** - Summary. Completed: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.
```
