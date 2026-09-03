---
name: chief-os-schedule
description: "Use when creating, setting up, changing, or resetting one recurring daily assistant schedule with morning and afternoon runs, including the default 7 AM and 4 PM times."
---

# ChiefOS Schedule

Create exactly one recurring daily assistant schedule in the user's local time zone, with one morning run and one afternoon run.

## Workflow

### 1. Choose the Morning Time

Ask the user to choose one, and wait for the answer before continuing:

- **7:00 AM (default)**
- **8:00 AM**
- **9:00 AM**

### 2. Choose the Afternoon Time

Then ask the user to choose one:

- **3:00 PM**
- **4:00 PM (default)**
- **5:00 PM**

An answer of `default` or `use defaults` selects the marked choice.

### 3. Create or Update the Schedule

Use a recurring agent schedule capability, not a calendar event, reminder, or shell task. Use the stable name `Chief of Staff - Daily Assistant` so rerunning this skill updates the existing schedule in place rather than creating a duplicate or a second schedule per run time.

- **Run times:** the selected morning and afternoon times, repeating daily in the user's current local time zone.
- **Conversation mode:** `Same conversation`, so context carries forward between runs. Use `New conversation` only when the user explicitly asks for it.
- **Prompt:** `Apply the chief-os-brief skill and complete its workflow for the current local time.`

If the capability is unavailable, or cannot put two daily run times on one schedule, or cannot reuse the same conversation, state that no schedule was created and return the selected configuration for the user to apply manually.

### 4. Confirm the Result

Report whether the schedule was created or updated, both run times with the time zone, and the conversation mode. Do not report success unless one schedule now holds both run times in `Same conversation` mode.
