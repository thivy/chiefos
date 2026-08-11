# Email Draft

Turn active email actions in the live `<working directory>/todo.md` file into saved Outlook drafts without creating duplicates or sending mail.

## Core Rules

These invariants always hold; the workflow steps own the operational detail.

- Use the `<working directory>` defined in `SKILL.md`.
- Read only the live `<working directory>/todo.md`; do not create, complete, remove, or rewrite todos.
- Never send an email; only create or update drafts in the Outlook Drafts folder, at most one per todo or source thread.
- Never invent recipients, facts, commitments, dates, links, attachments, or signature details; skip a todo when the evidence is insufficient.
- Begin every draft with **AI-GENERATED DRAFT - REVIEW BEFORE SENDING** as a bold, uppercase line, and end it with the user's verified signature.

## Workflow

Follow these stages in order for each eligible todo. Complete the duplicate check before creating or updating any draft.

### 1. Load Active Email Actions

- Read `<working directory>/todo.md` once the working directory has been established.
- If the file is missing or contains no eligible active todos, do not create a draft and report that no email action was available.
- Treat a todo as eligible when either:
  - `Source: email` and its next step requires the user to reply, respond, follow up, approve, decide, or deliver something by email; or
  - its next step explicitly requires sending an email and the intended recipients can be verified from the linked source evidence.
- Ignore completed `- [x]` todos, waiting items where another person owns the next move, and actions that do not require email.
- Use the todo's title, summary, next step, context, owner, deadline, and required source link as drafting inputs.

### 2. Resolve Current Source Context

- Open the todo's source link and retrieve the latest available thread or source evidence before drafting.
- For a reply, identify the source conversation, latest message, sender, relevant participants, subject, explicit asks, decisions, and deadlines.
- For a new outbound email, identify the intended recipients, purpose, and subject from verified source evidence.
- If current evidence shows that the user has already sent the required response or the action is otherwise resolved, skip the todo and do not create or change a draft.
- Use `<working directory>/memory.md` only when it is already available and contains relevant communication preferences or durable relationship context.

### 3. Find an Existing Draft

- Search the Outlook Drafts folder before any write.
- Match a reply draft first by the same Outlook conversation or thread and the source message being answered.
- When no thread identifier is available for an outbound email, require a strong match using the intended recipients, normalised subject, and the same todo purpose or source context.
- Treat `Re:`, `RE:`, `Fw:`, and `Fwd:` prefixes as subject metadata when normalising subjects.
- Do not match on subject alone when recipients or conversation evidence conflict.
- If more than one draft is a plausible match, do not create or update a draft. Report the ambiguity without deleting or merging existing drafts.

### 4. Choose One Draft Action

Choose exactly one outcome for the todo:

- **Create**: no matching draft exists and the recipients and content are sufficiently verified.
- **Update**: one matching draft exists and newer source evidence or todo content materially changes the required response.
- **Unchanged**: one matching draft already reflects the current recipients, request, decisions, commitments, and deadline.
- **Skip**: the action is resolved, not an email action, lacks required evidence, or has ambiguous draft matches.

Material changes include a changed request, recipient, decision, deadline, attachment requirement, commitment, or intended outcome. Do not update a draft for cosmetic wording differences alone.

### 5. Compose or Update the Draft

- Create a reply draft within the existing conversation when the todo originates from an email thread. Create a new outbound draft only when the action is not a reply.
- Address only verified recipients. Preserve relevant existing recipients when updating, and use reply-all only when every included participant remains necessary.
- Preserve the established subject for replies. Use a concise, specific subject for a new outbound email.
- Place the AI-generated review banner from Core Rules at the very top of the message as bold, uppercase text on its own line, followed by a blank line before the greeting or body.
- Write a concise, professional body that directly handles the verified ask and next step. Organize it into short, coherent paragraphs with blank lines between distinct ideas.
- Use a bulleted or numbered list only when communicating multiple actions, questions, decisions, or deliverables that are clearer as a list.
- Follow relevant communication preferences from `<working directory>/memory.md` and `conventions.md`; otherwise use neutral professional language.
- Include a greeting and closing when appropriate.
- Append the user's configured Outlook signature. If it is not inserted automatically, reproduce it only from a verified signature source, such as another current Outlook draft or a recent sent message from the user.
- If no signature can be verified, do not invent one. Leave the signature absent and report that the draft requires the user's signature during review.
- Mention an attachment only when the source confirms it and the attachment can be included. Never claim an unavailable attachment is attached.
- When updating a matching draft, edit that draft in place and retain useful user-authored content that does not conflict with current evidence.
- Save the result to Outlook Drafts and do not send it.

### 6. Validate and Report

- Re-read the saved draft and confirm its draft identifier, recipients, subject, body, and unsent state.
- Confirm the saved body begins with the bold, uppercase AI-generated warning and that the message is formatted as clean, readable paragraphs.
- Confirm the user's verified signature appears at the end of the draft, or explicitly report that no signature source was available.
- Confirm that no additional draft was created for the same todo or source thread.
- Do not delete pre-existing duplicate drafts automatically; report them for user review.
- Report one concise result per eligible todo: `Created`, `Updated`, `Unchanged`, or `Skipped`, together with the draft subject and reason. Do not report success unless the draft is present in Outlook Drafts.

## Related References

- `output-todo.md`: owns the creation, consolidation, and replacement of `<working directory>/todo.md`.
- `triage-email.md`: supplies current email thread context and recommended actions.
- `output-memory.md`: supplies durable communication preferences and relationship context when available.
