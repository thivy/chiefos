---
name: chief-os-todo-complete
description: "Use when marking to-do items as done or completed in the task list: tick off tasks, close out actions, mark todos complete, check off my to-dos, or update todo.md after finishing work. Asks which tasks to complete, then ticks them off in todo.md."
---

# ChiefOS To-Do Complete

Mark existing tasks in `chiefos/todo.md` as completed. That is the whole job.

This skill only changes task status. It never triages, creates tasks, drafts or sends email, or regenerates the briefing or artifact image. Those are refreshed the next time `chief-os-brief` runs.

## Invariants

- Work only on `chiefos/todo.md` in the user's OneDrive, the live task file that the brief's [working files](../chief-os-brief/SKILL.md#working-files) define. Replace it in place, and leave the `chiefos` app, `artifact-image.png`, and `chiefos/memory.md` untouched. Do not create backup copies.
- Never invent, reword, merge, split, or delete a task. Only its status changes.
- Never mark a task completed without an explicit user selection.
- Write in English, following the [shared conventions](../chief-os-brief/references/conventions.md).

## Workflow

### 1. Load the Active Tasks

- Read `chiefos/todo.md`. When it is missing or empty, stop and tell the user to run `chief-os-brief` first. Do not create a task file here.
- Read the [task format](../chief-os-brief/references/output-todo.md#markdown-template) and [status changes](../chief-os-brief/references/output-todo.md#status-changes) only; do not run its reconciliation workflow. Load every active `- [ ]` task under `## Active` in file order, preserving all fields.
- When there are no active tasks, report that everything is already complete and stop.

### 2. Ask Which Tasks Are Complete

Ask one multiple-choice question; ask again only to clarify an ambiguous selection.

- List all active tasks as options in file order, numbered from 1, each written as the task title followed by its deadline or context when available.
- Allow several selections at once, and allow selecting none. Do not ask one question per task or follow up on unselected tasks.
- When the user's request already names the tasks, match them to the loaded tasks and confirm the matched list in that same single question.
- When the user selects nothing, report that no task changed and stop.
- When a selection cannot be matched to exactly one active task, ask the user to clarify that item before continuing.

### 3. Update the Task File

- Read `chiefos/todo.md` again, then apply the **Done** status change to each selected task in that current content.
- Replace `chiefos/todo.md` in place. Verify every selected task is completed, unselected tasks and previous completions are unchanged, and the file is non-empty.

### 4. Report the Result

After a successful save, report the completed titles and remaining active count, and say that the `chiefos` app and the next briefing will show the changes.
