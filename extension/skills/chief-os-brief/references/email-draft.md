# Email Draft

Turn active email actions in the live `todo.md` file into saved Outlook drafts without creating duplicates or sending mail.

## Core Rules

- Use live `todo.md` as the task input and linked sources as evidence. Never edit todos.
- Never send an email; only create or update drafts in the Outlook Drafts folder, at most one per todo or source thread.
- Skip a todo when the evidence is insufficient to verify its recipients or content.

## Workflow

Run these stages for each eligible todo. Check for duplicates before any write.

### 1. Load Active Email Actions

Read active tasks and their fields from `todo.md`. Eligible tasks either originate from email and require an email response, approval, decision, follow-up, or delivery, or explicitly require an outbound email to verifiable recipients.

Skip completed tasks, waiting items owned by others, and non-email actions. If the file is missing or no task qualifies, report no email action available and stop.

### 2. Resolve Current Source Context

- Open the source link and retrieve current evidence. For replies, identify the conversation, latest message, sender, relevant participants, subject, asks, decisions, and deadlines. For new mail, verify recipients, purpose, and subject.
- If the response was already sent or the action resolved, skip without changing drafts.
- Use already-available `memory.md` only for relevant communication preferences or durable relationship context.

### 3. Find an Existing Draft

Search Outlook Drafts. Match replies by conversation and source message. Without a thread identifier, require matching recipients, normalised subject, and task purpose or source context. Ignore `Re:`, `Fw:`, and `Fwd:` prefixes case-insensitively; never match by subject alone against conflicting recipients or conversation evidence.

If multiple drafts plausibly match, skip and report the ambiguity. Never delete or merge existing drafts automatically.

### 4. Choose One Draft Action

| Outcome   | Condition                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------ |
| Create    | No matching draft; recipients and content verified                                               |
| Update    | One match; newer evidence or task content materially changes the response                        |
| Unchanged | One match already reflects the current recipients, request, decisions, commitments, and deadline |
| Skip      | Resolved, ineligible, insufficient evidence, or ambiguous matches                                |

Material changes include a changed request, recipient, decision, deadline, attachment requirement, commitment, or intended outcome. Do not update a draft for cosmetic wording differences alone.

### 5. Compose or Update the Draft

- Reply within the original conversation, retaining its subject; use new mail with a concise subject only for non-replies.
- Address verified recipients only. Retain relevant existing recipients and use reply-all only when every participant is necessary.
- Start with **AI-GENERATED DRAFT - REVIEW BEFORE SENDING**, bold on its own line, then a blank line.
- Address the verified ask in concise professional paragraphs separated by blank lines. Use lists only when they clarify multiple actions, questions, decisions, or deliverables. Follow `conventions.md` and relevant memory preferences; include greeting and closing when appropriate.
- Append the user's configured signature. If not inserted automatically, use only a verified signature from their current draft or recent sent message. If unavailable, omit it and report that review requires the user's signature.
- Mention attachments only when confirmed by evidence and actually included; never claim an unavailable attachment is attached.
- Update the matched draft in place, preserving useful user-authored content consistent with current evidence. Save to Outlook Drafts, never send.

### 6. Report the Draft Result

- Confirm the draft ID, expected recipients, subject, and unsent state from the tool result; re-read only if those details are missing. Never rewrite an Unchanged draft just to verify it.
- Report `Created`, `Updated`, `Unchanged`, or `Skipped` per eligible task, with subject and reason. Report save failures instead of claiming a saved draft.
