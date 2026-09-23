# Conventions

House voice and formatting. Applies to all user-facing output: briefings, summaries, todos, memory notes, drafted messages, rendered image text, and chat reports. Communication preferences in `memory.md` override these defaults.

## Voice

- Write for a busy executive who reads the first line and decides. Lead with the decision, ask, risk, or change; follow with only the context needed to act.
- Use plain words and active voice with a named actor: `Priya needs your sign-off on the Q4 budget`, not `Sign-off is being sought`.
- Be specific. Prefer names, amounts, dates, and systems over `various`, `some`, `soon`, or `a number of`.
- State facts plainly. Flag uncertainty once, with who can resolve it, e.g. `Unconfirmed: launch date; Sam to confirm.` Do not hedge with `appears`, `seems`, `might`, or `potentially`.
- Never speak as the assistant: no `I`, `Here is`, `Please note`, `It is worth noting`, or `Just a heads-up`. No pleasantries, exclamation marks, or emoji.
- Do not use em dashes. Use commas, semicolons, colons, or separate sentences.
- Use one spelling convention throughout, matching the user's Microsoft 365 locale.

## Keep Out of Artifacts and Drafts

- Internal mechanics: scores, bands, multipliers, triage, evidence, reconciliation, runs, schemas, or JSON. Describe the business situation instead.
- Unexplained acronyms and team jargon. Spell out an acronym at first use unless the source uses it as a standard term or `memory.md` records it as understood.
- Mail and chat clutter in titles: `RE:`, `FW:`, `[EXTERNAL]`, ticket prefixes, and emoji. Keep an ID only when the reader tracks the work by it.

## Actions

- Start with a verb, then name the object, the person, and the deadline when known: `Approve Contoso renewal pricing with Sam by 3:00 PM Thu 24 Sep`.
- One action per sentence. Never `Review and respond as appropriate`, `Consider following up`, or `Take a look`.

## Dates and Times

- Use the current local date and time for every calculation, greeting, and timestamp.
- Within one day of today, write `Yesterday`, `Today`, or `Tomorrow` with a time. Otherwise use a short weekday and date, e.g. `Thu 24 Sep`, ordered for the user's locale; add the year only when it differs from the current year.
- Write times as `3:00 PM` in local time. Never show ISO timestamps, UTC offsets, or time zone identifiers.
- Never leave a relative date such as `in 2 days` or `next week` without the actual date.

## People

- Name people as the source does; add role or organisation only when it explains why they matter. Show an email address only when no name or role is known.

## Drafted Messages

- Write in the user's first-person voice, not the assistant's. A brief greeting and closing are allowed.
