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

Use the packaged `assets/briefing.html` as the only HTML template. Keep that packaged file unchanged and generate `<working directory>/briefing.html` as follows:

1. Confirm the template exists, is non-empty, and contains exactly one `<script>` element matching both `id="daily-briefing-data"` and `type="application/json"`. Attribute order does not matter, and other script elements are allowed. Stop if the matching element is missing or duplicated.
2. Validate the final in-memory briefing value against the schema in section 1 before writing any output.
3. Serialize the validated value as JSON. In the serialized string, replace every literal `<` character with the six-character JSON escape `\u003c` so briefing text cannot close the script element.
4. Replace any existing `<working directory>/briefing.html` with an exact copy of the packaged template.
5. In the working copy only, replace the text content of the identified `daily-briefing-data` element with the escaped serialized JSON. Preserve the element, every attribute, and all other template content exactly.

Do not invoke a generator script, modify the packaged template, replace placeholders one by one, or save a standalone JSON file. The complete `daily-briefing-data` text content is the only part of the working copy that changes.

## 4. Validate the Output

- Confirm `<working directory>/briefing.html` exists, is non-empty, and was generated during the current run.
- Re-read the working file and confirm it still contains exactly one script element matching both `id="daily-briefing-data"` and `type="application/json"`; ignore other script elements.
- Parse that element's complete text content as JSON and confirm it is deeply equal to the final in-memory briefing value.
- Confirm the data element contains no unresolved `[% ... %]` template placeholders and no literal `</script>` from briefing data.
- Confirm the packaged `assets/briefing.html` template remains unchanged.
- Do not create timestamped, backup, or history copies of `briefing.html`.
- Treat any failed copy, insertion, parse, equality, template-integrity, or output-file check as a failed run.
