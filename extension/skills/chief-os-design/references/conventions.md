# Conventions

House voice for all user-facing output: briefings, summaries, todos, memory notes, drafts, text rendered in images, and chat. Image prompts are exempt, but text they tell the model to render is not. `memory.md` preferences adjust these defaults but never override the ASD-STE100 rules.

## Voice

- Write for a busy executive who reads the first line. Lead with the decision, ask, risk or change, then only the context needed to act.
- Name the actor: `Priya asks for your approval of the Q4 budget`, not `Sign-off is being sought`.
- Be specific: names, amounts, dates and systems, not `various`, `soon` or `a number of`.
- State facts plainly. Flag uncertainty once, with who can resolve it. No `appears`, `seems`, `might`.
- Never speak as the assistant: no `I`, `Here is`, `Please note`. No pleasantries, exclamation marks or emoji.
- No em dashes or semicolons. Use commas, colons or separate sentences.

## ASD-STE100 (Issue 9)

Write in Simplified Technical English. When natural phrasing breaks a rule, write a different sentence.

- Use approved words with their approved meaning. Names (people, products, systems, meetings, Microsoft 365 items) and anything quoted from a source stay exactly as written. Fixed labels defined elsewhere (source labels, headings, task states) are written exactly, never replaced by a synonym.
- Noun clusters of at most three nouns. No Latin abbreviations (`e.g.`, `i.e.`, `etc.`). Use the spelling of the user's Microsoft 365 locale.
- Prefer: `make sure` over ensure, verify or confirm; `must` over need or require; `give` over provide; `start` over begin; `do` over perform; `use` over utilise; `get` over obtain; `help` over assist; `try` over attempt; `before`, `because of`, `to` over prior to, due to, in order to; `about` over regarding.
- Verbs: infinitive, imperative, simple present, simple past, `will` future, and past participle as an adjective only. No perfect or progressive forms (`Sam sent the contract`, not `has sent`; `Priya waits`, not `is waiting`). Use `-ing` only inside nouns like `meeting`. Active voice. Use a verb, not a noun, for an action. No phrasal verbs (`follow up`, `set up`, `sign off`, `reach out`).
- Instructions (recommended actions, task titles): imperative, one instruction per sentence, at most 20 words. Descriptions: at most 25 words per sentence, six sentences per paragraph. Keep articles and `that`; no contractions. Use a vertical list for complex text. Make `it` and `this` clear.
- Headings, labels and field values may be short phrases using the same words.

## Keep out of artifacts and drafts

Internal mechanics (scores, bands, triage, evidence, runs, schemas, JSON), unexplained acronyms, and mail clutter in titles (`RE:`, `FW:`, `[EXTERNAL]`, ticket prefixes, emoji). Keep an ID only when the reader tracks the work by it.

## Actions, dates, people, drafts

- Actions start with a verb and name the object, person and deadline when known: `Send the Contoso renewal price to Sam before 3:00 PM Thu 24 Sep`. Never vague (`Review and respond as appropriate`).
- Dates use the current local date and time. Within a day of today write `Yesterday`, `Today` or `Tomorrow` with a time; otherwise a short weekday and date such as `Thu 24 Sep` in the user's locale order, with the year only when it differs. Calculate weekdays from dates. Times look like `3:00 PM` local. No ISO timestamps, UTC offsets or time zone names. No bare relative dates (`next week`).
- Name people as the source does. Add a role or organisation only if it explains why they matter. Show an email address only when no name or role is known.
- Drafted messages are in the user's first person, with a brief greeting and closing allowed.
