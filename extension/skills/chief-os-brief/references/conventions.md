# Conventions

Shared voice, formatting, and run conventions for the daily brief. Every step applies these rules instead of restating them. A step or another reference may add a stricter or more specific rule, but must not contradict these.

## Voice and Formatting

Apply to all user-facing output: briefings, summaries, todos, memory notes, and drafted messages.

- Write in Australian English.
- Do not use em dashes. Use commas, semicolons, colons, or separate sentences instead.
- Keep language concise, neutral, and action-oriented for a busy professional reader, and avoid assistant narration.
- Do not expose internal triage reasoning, scoring, or classification logic in user-facing output.
- Format a date and time like `Apr 12, Mon, 9:30am` in the local time zone unless a skill specifies another format.

## Run Contract

Apply to every step that writes a working file or reports a result.

- Use the `<working directory>` defined in `SKILL.md`; do not redefine it.
- Treat packaged files under `assets/` as read-only templates. Generate working files from copies, and confirm the packaged files were not modified before reporting completion.
- Verify a step's postconditions before reporting it complete. Do not report success, delivery, or completion for any step whose required result you have not confirmed.
