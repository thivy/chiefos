# Briefing Output

This file defines the briefing schema and how to generate `briefing.html` from it.

## 1. Briefing Schema

Generate JSON with the following content based on your processing:

- Overview of the day with a short summary
- Email
- Calendar
- Teams chat
- Teams meeting recap
- To-Do

Message items map directly into message cards, with `summary` rendered as the card body. To-do items map directly into to-do rows, with `title` rendered as the label and `url` linking the task to its source (email, calendar, chat, or meeting recap).

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

Keep the generated JSON as an in-memory value for the current run. Do not save a standalone JSON file unless you are debugging.

## 3. Generate the HTML

Render the validated briefing value directly into a complete standalone HTML document, following [output-html-design.md](output-html-design.md). Treat every rule in it as a requirement, not a suggestion. Do not use any other HTML or CSS framework, formatting, visual language, or design system.

1. Validate the final in-memory briefing value against the schema in section 1 before writing any output.
2. Render `greeting`, `person_name`, `date`, and `summary`, then each collection in the order set by the Layout rules in `output-html-design.md`: Overview, Tasks, then the message cards for Email, Calendar, Teams Chat, and Meeting Recaps.
3. Preserve item wording and source order within each collection, omit absent fields, and render the empty state for an empty collection.
4. Escape `&`, `<`, and `>` in every value taken from the briefing before placing it in markup, and escape `"` in every attribute value, so briefing text cannot introduce elements or attributes.
5. Write the rendered document to `briefing.html`, replacing any existing file.

Do not invoke a generator script, embed the briefing JSON in the output, or save a standalone JSON file.

## 4. Validate the Output

- Confirm `briefing.html` exists, is non-empty, and was generated during the current run.
- Run the `Verify Before Output` checklist in `output-html-design.md` against the generated file. Repair and recheck any failure.
- Confirm every item in `emails`, `calendar`, `chats`, `recaps`, and `todo.items` appears once, in source order, with its wording preserved.
- Confirm every empty collection renders its empty state rather than being omitted.
- Confirm no unresolved placeholder text remains in the document.
- Do not create timestamped, backup, or history copies of `briefing.html`.
- Treat any failed render, escape, validation, or output-file check as a failed run.
