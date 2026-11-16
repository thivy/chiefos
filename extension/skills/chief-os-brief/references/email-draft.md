# Email Draft

Turn active email actions in `todo.md` into unsent Outlook drafts, without duplicates. Never send and never edit todos.

- **Eligible:** active tasks that originate from email and need a reply, approval, decision, follow-up or delivery, or that explicitly need an outbound email to verifiable recipients. Skip completed, waiting and non-email tasks. If none qualify, report that and stop.
- **Evidence:** open the source link; confirm sender, participants, subject, asks, decisions and deadlines. Skip if already sent or resolved, or if recipients or content can't be verified. Use `memory.md` for relevant preferences.
- **Existing drafts:** search Outlook Drafts, matching by conversation and source message, or else by recipients, normalised subject (ignore `Re:`/`Fw:`) and purpose. If several plausibly match, skip and report the ambiguity. Never delete or merge drafts.
- **Action:** `Create` when no draft matches; `Update` when one matches and newer evidence materially changes the response (request, recipients, decision, deadline, commitment); `Unchanged` when it is already current; `Skip` otherwise. Don't update for wording alone.
- **Compose:** reply in the original conversation (new mail only for non-replies) to verified recipients; reply-all only when every participant is needed. Start with a bold line `AI-GENERATED DRAFT. EXAMINE IT BEFORE YOU SEND IT.`, then a blank line. Answer the ask in the first sentence, add only needed context (about three short paragraphs at most), end with the next step, owner and date if known. Follow `chief-os-design`: Voice. Append the user's signature only if verified (else omit and report it). Mention attachments only if actually included. Update matched drafts in place, preserving the user's edits.
- **Report** `Created`, `Updated`, `Unchanged` or `Skipped` per task with subject and reason, from tool results. Report save failures.
