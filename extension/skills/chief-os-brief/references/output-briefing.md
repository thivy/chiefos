# Briefing Output

This file defines the briefing schema and how to generate `<working directory>/briefing.html` from it.

## 1. Briefing Schema

Generate JSON with the following content based on your processing:

- Overview of the day with a short summary
- Email
- Calendar
- Teams chat
- Teams meeting recap
- To-Do

Message items map directly into `MessageSection` props, with `summary` rendered as the card body. To-do items map directly into `Task` props, with `title` rendered as the label and `url` linking the task to its source (email, calendar, chat, or meeting recap).

Emit a single JSON object matching `DailyBriefing`:

```ts
type Nullable<T> = T | null;

interface MessageItem {
  source: "email" | "chat" | "calendar" | "meeting";
  sourceLabel: string;
  timestamp: string;
  authorName: Nullable<string>;
  authorRole: Nullable<string>;
  subject: string;
  summary: string;
  url: string;
  recommendedAction: Nullable<string>;
}

interface EmailItem extends MessageItem {
  source: "email";
  sourceLabel: "Important" | "Actionable" | "Waiting";
}

interface ChatItem extends MessageItem {
  source: "chat";
  sourceLabel: "Important" | "Actionable" | "Waiting";
}

interface CalendarItem extends MessageItem {
  source: "calendar";
  sourceLabel: "Priority Meetings" | "Conflicts" | "Prep Needed" | "FYI / Optional";
}

interface MeetingRecapItem extends MessageItem {
  source: "meeting";
  sourceLabel: "Action Required" | "Waiting" | "Decision / Outcome";
}

interface TodoItem {
  status: "Active" | "Completed";
  source: "email" | "chat" | "calendar" | "meeting" | "manual";
  title: string;
  summary: string;
  recommendedAction: string;
  sourceContext: Nullable<string>;
  owner: Nullable<string>;
  deadline: Nullable<string>;
  url: string;
}

interface DailyBriefing {
  date: string;
  greeting: string;
  person_name: string;
  summary: string;
  emails: EmailItem[];
  calendar: CalendarItem[];
  chats: ChatItem[];
  recaps: MeetingRecapItem[];
  todo: { items: TodoItem[] };
}
```

### Schema Rules

- Emit exactly the properties listed. Do not add extra keys.
- Every property is required. Use `null` only where the type allows it.
- `url` is required on every message item and every to-do item, and must be a non-empty absolute deep link, matching the URL Rule in `triage-contract.md`.
- `date` is the human-readable briefing date.
- `emails`, `calendar`, `chats`, `recaps`, and `todo.items` may be empty arrays. Omit an item entirely rather than emitting a partial or invented one.

## 2. Keep the JSON in Memory

Keep the generated JSON as an in-memory value for the current run. Do not save a standalone JSON file unless you are debugging the generator.

## 3. Generate the HTML

The generator reads the packaged `assets/briefing.html` template directly. Do not copy the template into `<working directory>`, and do not create a placeholder `briefing.html`; the working file must be generated from schema-valid current-run JSON.

Before generating, confirm both `assets/briefing.html` and `scripts/inject-data.ts` exist and are non-empty in the installed skill. If either is missing, stop and report that the installed ChiefOS package is incomplete. Do not reproduce the injection logic ad hoc and do not create a substitute layout.

Run the generator from `<working directory>` so it writes `briefing.html` there, replacing any existing file with the same name:

```bash
bun <path-to-chief-os-brief-skill>/scripts/inject-data.ts --data '<generated briefing JSON>'
```

For large or quoting-sensitive payloads, pipe the in-memory JSON and pass `-` to `--data`.

Bash:

```bash
printf '%s' "$briefingJson" | bun <path-to-chief-os-brief-skill>/scripts/inject-data.ts --data -
```

PowerShell:

```powershell
$briefingJson | bun <path-to-chief-os-brief-skill>/scripts/inject-data.ts --data -
```

`--data` also accepts a JSON file path for debugging or replaying a prior run.

## 4. Validate the Output

- Validate that the JSON parses before injecting it into the template.
- Confirm `<working directory>/briefing.html` exists, is non-empty, and was generated during the current run.
- Re-read the `daily-briefing-data` script element from the generated file, parse its text as JSON, and confirm the value exactly matches the in-memory current-run JSON.
- Confirm the generated data block contains no unresolved `[% ... %]` template placeholders.
- Do not create timestamped, backup, or history copies of `briefing.html`.
- Treat generator failure, or a missing or empty generated file, as a failed run.
