---
name: chief-os-schedule
description: "Use when creating, setting up, changing, or resetting one recurring daily assistant schedule with morning and afternoon runs, including the default 7 AM and 4 PM times, or when granting ChiefOS its permissions up front so scheduled runs do not wait for approval."
---

# ChiefOS Schedule

Create exactly one recurring daily assistant schedule in the user's local time zone, with one morning run and one afternoon run. Write every question and report per the [shared conventions](../chief-os-brief/references/conventions.md).

## Workflow

### 1. Choose the Run Times

When the request already names both times, use them without asking. Otherwise ask one question covering both times. Offer the default pair first, then the alternatives:

- **7:00 AM and 4:00 PM (default)**
- Morning alternatives: 8:00 AM or 9:00 AM
- Afternoon alternatives: 3:00 PM or 5:00 PM

An answer of `default` or `use defaults` selects 7:00 AM and 4:00 PM. Do not split this into two questions.

### 2. Create or Update the Schedule

Use a recurring agent schedule capability, not a calendar event, reminder, or shell task. Use the stable name `Chief of Staff - Daily Assistant` so rerunning this skill updates the existing schedule in place rather than creating a duplicate or a second schedule per run time.

- **Run times:** the selected morning and afternoon times, repeating daily in the user's current local time zone.
- **Conversation mode:** `Same conversation`, so context carries forward between runs. Use `New conversation` only when the user explicitly asks for it.
- **Conversation title:** `🌻 ChiefOS`, exactly as written, when the capability can name the conversation.
- **Prompt:** `Apply the chief-os-brief skill and complete its workflow for the current local time.`

Before writing, confirm the capability supports both times on one schedule and the selected conversation mode. Otherwise leave any existing schedule unchanged and return the configuration for manual setup; do not claim a create or update succeeded.

### 3. Confirm the Result

Verify exactly one schedule holds both run times, the selected time zone, and the selected conversation mode. Only then report it created or updated, including those settings.

### 4. Request Permissions Up Front

Scheduled runs are unattended, so an approval prompt stops a run until the user answers it. Run this step while the user is present: when this skill creates the schedule, or when the user asks for permissions. Skip it when the user only changes the times of an existing schedule. When the request is only for permissions, run this step alone.

Before the first action, tell the user in one message that Cowork will ask for approval of each action that follows, and that they must select the option that always allows it. Cowork keeps each of those choices for the current conversation only. Scheduled runs with `Same conversation` continue the conversation that created the schedule, so do this step there. When the schedule uses `New conversation`, skip this step and tell the user that each run will ask again.

Do each action once, in this order, and wait for each result:

1. **OneDrive: Upload file content.** Make sure that the ChiefOS folder exists, and create it when it is missing. For `todo.md` and `memory.md` in that folder, read the current file and upload the same content back without changes. When a file is missing or empty, create it as step 0 of `chief-os-brief` describes.
2. **Outlook: Send email with attachments.** Send one email from the signed-in user to their own primary mailbox, subject `ChiefOS permission check`, with `memory.md` from the ChiefOS folder attached as a regular file attachment. Write the body in one sentence: `ChiefOS uses this email to get your approvals. You can delete it.`
3. **Outlook: Create reply draft.** Create a reply draft to that email, addressed only to the signed-in user.
4. **Outlook: Update draft.** Add this line to the top of the reply draft: `AI-GENERATED DRAFT. CHIEFOS USES THIS DRAFT TO GET YOUR APPROVALS. YOU CAN DELETE IT.`
5. **Outlook: Create draft message.** Create one new draft addressed only to the signed-in user, subject `ChiefOS permission check`, with the same line as its body.

Never address any of these items to another person, never send a draft, and never delete an item, because a delete action needs a different approval. Do not retry a failed or unknown result.

Report each action as `Allowed` or `Failed`, with the reason for a failure. Tell the user to delete the email and the two drafts named `ChiefOS permission check`. When the user did not select the option that always allows an action, tell them that scheduled runs will wait at that action, and that they can ask for permissions again.
