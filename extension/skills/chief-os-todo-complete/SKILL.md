---
name: chief-os-todo-complete
description: "Use when marking to-do items as done or completed in the task list: tick off tasks, close out actions, mark todos complete, check off my to-dos, or update todo.md after finishing work. Asks which tasks to complete, then ticks them off in todo.md."
---

# ChiefOS To-Do Complete

Mark existing tasks in `todo.md` as completed. That is the whole job.

This skill only changes task status. It never triages, creates tasks, drafts or sends email, or regenerates the briefing or artifact image. Those are refreshed the next time `chief-os-brief` runs.

## Invariants

- Work only in the output folder. Read and replace `todo.md` in place, and leave `briefing.html`, `artifact-image.png`, and `memory.md` untouched. Do not create backup copies.
- Never invent, reword, merge, split, or delete a task. Only its status changes.
- Never mark a task completed without an explicit user selection.
- Verify the file after writing it. Never report success you have not confirmed.
- Write in English, without em dashes.

## Workflow

### 1. Load the Active Tasks

- Read `todo.md`. When it is missing or empty, stop and tell the user to run `chief-os-brief` first. Do not create a task file here.
- Load every active `- [ ]` task under `## Active`, in file order, keeping each task's title, summary, next step, source, context, owner, deadline, and link.
- When there are no active tasks, report that everything is already complete and stop.

### 2. Ask Which Tasks Are Complete

Ask exactly one multiple-choice question listing every active task, accepting multiple selections.

- List all active tasks as options in file order, numbered from 1, each written as the task title followed by its deadline or context when available.
- Allow several selections at once, and allow selecting none. Do not ask one question per task or follow up on unselected tasks.
- When the user's request already names the tasks, match them to the loaded tasks and confirm the matched list in that same single question.
- When the user selects nothing, report that no task changed and stop.
- When a selection cannot be matched to exactly one active task, ask the user to clarify that item before continuing.

### 3. Update the Task File

- Move each selected task from `## Active` to `## Completed`, change its `- [ ]` marker to `- [x]`, and change its `Next step:` label to `Completed:`.
- Keep the task's title, summary, source, context, owner, deadline, and link exactly as they were.
- Leave unselected active tasks in their original order, and leave previously completed tasks in place.
- Replace `todo.md` in place using the template below, then confirm the file is non-empty and every selected task now sits under `## Completed`.

```markdown
# Your Actions

## Active

- [ ] **Todo title** - Summary. Next step: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.

## Completed

- [x] **Todo title** - Summary. Completed: recommendedAction. Source: source. Context: sourceContext. Owner: owner. Deadline: deadline. Link: url.
```

### 4. Confirm the Result

Report a short, friendly summary covering each task marked completed by title, the number of active tasks remaining, and a warm closing line telling the user that `todo.md` is up to date and the next `chief-os-brief` run will pick the changes up, so there is nothing else for them to do now.
