---
name: chief-os-schedule
description: "Use when creating, setting up, changing, or resetting one recurring daily assistant schedule with morning and afternoon runs, including the default 7 AM and 4 PM times."
---

# ChiefOS Schedule

Use this skill to create exactly one recurring daily assistant schedule in the user's local time zone, with one run in the morning and one run in the afternoon.

## Core Rules

- Ask for the morning time first. Wait for the user's answer before asking for the afternoon time.
- Present exactly three time choices for each question and mark the default choice clearly.
- Create one schedule after both answers, configured with both selected daily run times.
- Use the user's current local time zone for the schedule.
- Default to **Same conversation** for every run. Do not use **New conversation** unless the user explicitly requests it.
- Use a recurring agent schedule capability. Do not substitute calendar events, reminders, or shell tasks.
- If the scheduling capability is unavailable, state that no schedule was created and return the selected configuration for the user to apply manually.

## Workflow

Follow these steps in order.

### 1. Choose the Morning Time

Ask the user to choose one morning time:

- **7:00 AM (default)**
- **8:00 AM**
- **9:00 AM**

If the user answers `default` or `use defaults`, select **7:00 AM**. Do not ask the afternoon question until the morning choice is resolved.

### 2. Choose the Afternoon Time

After the morning choice is resolved, ask the user to choose one afternoon time:

- **3:00 PM**
- **4:00 PM (default)**
- **5:00 PM**

If the user answers `default` or `use defaults`, select **4:00 PM**.

### 3. Create or Update the Schedule

Use a stable schedule name so rerunning this skill updates the existing schedule instead of creating a duplicate.

| Schedule name                      | Daily run times                                       | Conversation mode   | Prompt                                                                                 |
| ---------------------------------- | ----------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `Chief of Staff - Daily Assistant` | The selected morning time and selected afternoon time | `Same conversation` | `Apply the chief-os-brief skill and complete its workflow for the current local time.` |

- Configure the single schedule to repeat every day at both selected times in the user's current local time zone.
- Configure every run to continue in the same conversation so context carries forward between runs.
- If the stable schedule name already exists, update its run times, recurrence, time zone, conversation mode, and prompt in place.
- Do not create separate morning and afternoon schedules.
- If the scheduling capability cannot assign two daily run times to one schedule, state that no schedule was created and return the selected configuration.
- If the scheduling capability cannot use the same conversation for each run, state that no schedule was created and return the selected configuration, including `Same conversation` as the required mode.
- Do not report success unless the one schedule was created or updated with both run times and `Same conversation` mode.

### 4. Confirm the Result

Confirm the following in a concise summary:

- Morning schedule time and time zone.
- Afternoon schedule time and time zone.
- Daily recurrence with two runs.
- Conversation mode is **Same conversation**.
- Whether the schedule was created or updated.
