---
name: chief-os-todo-complete
description: "Use when marking to-do items as done or completed in the task list: tick off tasks, close out actions, mark todos complete, check off my to-dos, or update todo.md after finishing work. Asks which tasks to complete, then ticks them off in todo.md."
---

# ChiefOS To-Do Complete

Mark existing tasks in `todo.md` as completed. That is the whole job.

This skill only changes task status. It never triages email, calendar, chat, or meeting recaps, never creates tasks, never drafts or sends email, and never regenerates the briefing or the artifact image. Those are refreshed the next time the `chief-os-brief` skill runs.

## Working Directory

`<working directory>` is `/output`, the same directory `chief-os-brief` uses. This skill reads and replaces one file in place:

- `todo.md`: the live task file.

Leave every other file in that directory untouched, including `briefing.html`, `artifact-image.png`, and `memory.md`.

## Invariants

- Apply `../chief-os-brief/references/conventions.md` to every user-facing word in the run.
- Never invent, reword, merge, split, or delete a task. Only its status changes.
- Never mark a task completed without an explicit user selection.
- Do not create timestamped, backup, or history copies of `todo.md`.
- Verify a step's postconditions before reporting it complete. Never report success you have not confirmed.

## Workflow

Follow these steps in order. Do not skip or rearrange them.

### 1. Load the Active Tasks

- Read `<working directory>/todo.md`.
- When the file is missing or empty, stop and tell the user to run the `chief-os-brief` skill first. Do not create a task file here.
- Load every active `- [ ]` task under `## Active`, in file order, keeping each task's title, summary, next step, source, context, owner, deadline, and link.
- When there are no active tasks, report that everything is already complete and stop. Do not run any further step.

### 2. Ask Which Tasks Are Complete

Ask exactly one multiple-choice question that lists every active task and accepts multiple selections.

- Include all active tasks as options, in file order, numbered from 1.
- Write each option as the task title, followed by its deadline or context when either is available.
- Allow the user to select several options at once, and allow selecting none.
- Ask one question for the whole list. Do not ask one question per task, and do not ask follow-up questions for tasks the user did not select.
- When the user's request already names the tasks to complete, match those to the loaded tasks and confirm the matched list in the same single question instead of asking from scratch.
- When the user selects nothing, report that no task changed and stop. Do not run any further step.
- When a selection cannot be matched to exactly one active task, ask the user to clarify that item before continuing.

### 3. Update the Task File

- Read `../chief-os-brief/references/output-todo.md` and follow its markdown template. Skip its generation rules: derive no new task here.
- Move each selected task from `## Active` to `## Completed`, change its `- [ ]` marker to `- [x]`, and change its `Next step:` label to `Completed:`.
- Keep the task's title, summary, source, context, owner, deadline, and link exactly as they were.
- Leave unselected active tasks under `## Active`, in their original order, unchanged, and leave previously completed tasks in place.
- Replace `<working directory>/todo.md` in place, then confirm the file is non-empty and every selected task now appears under `## Completed`.

### 4. Confirm the Result

Report a short, friendly summary covering:

- Each task marked completed, by title.
- The number of active tasks remaining.
- A warm closing line telling the user that `todo.md` is up to date and that the briefing will pick these changes up on the next `chief-os-brief` run, so there is nothing else for them to do now.

## References

- [../chief-os-brief/references/conventions.md](../chief-os-brief/references/conventions.md) (every step): voice, formatting, and run contract.
- [../chief-os-brief/references/output-todo.md](../chief-os-brief/references/output-todo.md) (steps 1, 3): `todo.md` rules, schema, and template.
