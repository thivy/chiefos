# Memory

Create and maintain the live `memory.md` file used by daily brief runs.

## Core Rules

- Maintain only the live `memory.md` file.
- Keep memory brief, factual, stable, and useful for future triage.
- Do not store one-off tasks, transient meeting notes, or facts that are only useful for the current run.
- Prefer updating an existing entry over adding a duplicate.
- Remove or replace entries that are contradicted by newer confirmed user input.

## Creation Rules

- If `memory.md` is missing, create it from the markdown template below.
- Replace the placeholder customer domains with known domains only where reliable source evidence or user input exists. Otherwise leave the template structure in place.

## Maintenance Rules

Update memory when new stable context is found, including:

- Communication preferences that should guide future briefings or messages.
- Priority relationships, such as manager, direct team, executive sponsor, customer, legal, finance, or delivery lead.
- Customer domains and aliases that help classify email or Teams messages.
- Recurring projects, programmes, workstreams, or escalation paths.
- Standing meeting preferences, recurring preparation needs, or durable scheduling constraints.

Do not update memory for:

- A single email, meeting, or chat unless it reveals durable context.
- Completed tasks, temporary blockers, or one-time deadlines.
- Guesses about a person, company, role, or priority.

## Markdown Template

Use these sections when relevant:

```markdown
# Personal Memory

## Communication Preferences

- Stable preference.

## Priority Relationships

- Name or role: durable priority context.

## Customer Domains

- `@example.com`: customer or account context.

## Recurring Context

- Durable project, meeting, programme, or escalation context.
```

Keep unused sections only when they are part of the starter template or likely to be filled later.

## Update Style

- Write short bullets, not paragraphs.
- Use concrete names, roles, domains, and durable context when known.
- Keep each bullet to one idea.
- Preserve useful existing user-authored content.
- Group related entries under the most specific heading.
- Use `null` nowhere in the markdown file. Omit unknown values instead.
