---
name: chief-os-brief
description: "Daily assistant briefing and Microsoft 365 triage: morning brief, afternoon/end-of-day recap, tomorrow prep, or triage of email, calendar, Teams chats and recent meetings."
---

# ChiefOS Brief

Triage the user's Microsoft 365 signals and deliver a briefing: a prioritised summary, an updated task list, an illustrated task image, the `chiefos` app, and a summary email to themselves.

**Mode:** Morning Brief (priorities, preparation, time-sensitive follow-up) or Afternoon Recap (what changed since morning, open decisions, overdue replies, tomorrow's prep). Use the mode the user names; otherwise Morning before local noon, Afternoon after. Plan the steps from the request: a one-source triage or a to-do update needs only the relevant steps. Draft or send email only when asked.

## Working files

The ChiefOS folder is `chiefos` at the top level of the user's OneDrive. It holds:

- `todo.md`: live task list ([output-todo.md](references/output-todo.md)).
- `memory.md`: durable context for triage ([output-memory.md](references/output-memory.md)).

`artifact-image.png` goes in the output folder. Create missing files from their templates; seed them from the newest non-empty copy in the output folder or `Documents/Copilot/Created/chiefos` when one exists, without altering the old copy. Re-read a live file just before replacing it and keep edits the user or app made meanwhile. Never create timestamped or backup copies.

## Pipeline

Run unattended and in order; stop on tool or file errors rather than delivering bad output.

1. **Triage** email, calendar, Teams chats and completed meetings: [triage.md](references/triage.md).
2. **Summary:** 2–4 sentences, under 100 words, for an executive. Open with the single most important decision, risk or deadline, naming people and times. No source counts, no "Here is…".
3. **Tasks:** reconcile `todo.md`: [output-todo.md](references/output-todo.md).
4. **Email drafts** (only if requested): [email-draft.md](references/email-draft.md).
5. **Briefing JSON** ([output-briefing.md](references/output-briefing.md)) and **image** ([output-image.md](references/output-image.md)). If the image fails, continue without it and don't send the email.
6. **App:** build or update the one `chiefos` app in place with `/app`: [output-html-design.md](references/output-html-design.md). Stop if `/app` is unavailable.
7. **Memory:** update `memory.md` only for new durable context.
8. **Email:** send one self-addressed summary, subject `<Morning Brief|Afternoon Recap> | <local date>`, built per [email-html-design.md](references/email-html-design.md), with `artifact-image.png` attached as a regular file. Don't retry an unknown send result.

## Rules

- **Evidence only.** Never invent people, links, dates, commitments, owners or attachments; omit the item instead. Don't infer importance from a title, domain or tone alone. Say so when evidence conflicts.
- Report outcomes from tool results, not assumptions. Keep scoring detail out of artifacts.
- Never store secrets or sensitive personal data in working files.
- Never send email except the step 8 summary. Drafts stay unsent.
- Every image prompt comes from `chief-os-image-prompt`, one per task; never write your own. App motion comes from `chief-os-motion`. Visual language comes from the references above and `chief-os-design`.
- On the first ChiefOS run in a conversation, title it `🌻 ChiefOS` if possible.

## Run report

End with three short headings, writing `There are no items.` under any that is empty: **For you to do** (what needs the user), **Not included** (left out or unverified, and why), **Done** (outcomes, with the app link).
