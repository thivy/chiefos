---
name: chief-os-schedule
description: "Create or update the single recurring ChiefOS schedule (morning and afternoon runs, default 7 AM and 4 PM), or grant ChiefOS its permissions up front so scheduled runs don't wait for approval."
---

# ChiefOS Schedule

Create one recurring daily schedule in the user's local time zone with a morning and an afternoon run. Write every question and report per `chief-os-design`: Voice.

## Workflow

### 1. Choose the Run Times

When the request names both times, use them. Otherwise ask one question covering both, offering the default first: **7:00 AM and 4:00 PM (default)**; morning alternatives 8:00 AM or 9:00 AM; afternoon alternatives 3:00 PM or 5:00 PM. `default` selects 7:00 AM and 4:00 PM.

### 2. Create or Update the Schedule

Use a recurring agent schedule capability, not a calendar event, reminder, or shell task. Name it `Chief of Staff - Daily Assistant` so rerunning updates it in place instead of duplicating it.

- **Run times:** the selected morning and afternoon times, daily, in the user's local time zone.
- **Conversation mode:** `Same conversation` (`New conversation` only on explicit request). Title: `🌻 ChiefOS` when the capability can name it.
- **Prompt:** `Apply the chief-os-brief skill and complete its workflow for the current local time.`

If the capability can't hold both times on one schedule with that conversation mode, leave any existing schedule unchanged and return the configuration for manual setup; never claim success.

### 3. Confirm the Result

Verify exactly one schedule holds both run times, the time zone and the conversation mode, then report it created or updated with those settings.

### 4. Request Permissions Up Front

Scheduled runs are unattended, so an approval prompt stops a run. Run this step while the user is present: when this skill creates the schedule, or when the user asks for permissions (then run only this step). Skip it when only the times of an existing schedule change.

Tell the user in one message that Cowork will ask for approval of each action below and they must choose the option that always allows it. Those choices last for the current conversation only, so do this in the conversation that owns the schedule. With `New conversation`, skip this step and tell the user each run will ask again.

Do each action once, in this order, and wait for each result:

1. **OneDrive: Upload file content.** Make sure the ChiefOS folder exists (create it if missing). For `todo.md` and `memory.md` there, read each file and upload the same content back unchanged. Create a missing or empty file as the Working files section of `chief-os-brief` describes.
2. **Outlook: Send email with attachments.** Send one email from the signed-in user to their own primary mailbox, subject `ChiefOS permission check`, with `memory.md` attached as a regular file. Body: `ChiefOS uses this email to get your approvals. You can delete it.`
3. **Outlook: Create reply draft.** Reply to that email, addressed only to the signed-in user.
4. **Outlook: Update draft.** Add this line at the top of the reply draft: `AI-GENERATED DRAFT. CHIEFOS USES THIS DRAFT TO GET YOUR APPROVALS. YOU CAN DELETE IT.`
5. **Outlook: Create draft message.** Create one new draft to the signed-in user only, subject `ChiefOS permission check`, with that line as its body.

Never address these items to anyone else, send a draft, or delete anything (delete needs a different approval). Don't retry a failed or unknown result.

Report each action as `Allowed` or `Failed` with the reason. Tell the user to delete the email and the two drafts named `ChiefOS permission check`. If the user did not choose the always-allow option for an action, say scheduled runs will wait at that action and they can ask for permissions again.
