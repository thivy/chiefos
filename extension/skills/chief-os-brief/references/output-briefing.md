# Briefing Output

The schema for the in-memory briefing value and how to render `briefing.html` from it. This file is the single source for the shape; other references name fields but never redefine them.

## 1. Schema

Message items become message cards, with `summary` as the card body. To-do items become to-do rows, with `title` as the label and `url` linking the task to its source.

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

### Rules

- Emit exactly these properties. Every one is required; use `null` only where the type allows it.
- `url` must be a non-empty absolute deep link on every message item and every to-do item. Omit an item rather than emitting a partial or invented one.
- `date` is the human-readable briefing date.
- Any collection may be an empty array.
- Keep the value in memory for the run. Do not save a standalone JSON file or embed it in the HTML.

## 2. Render

Validate the value against section 1, then render it into `briefing.html` as one standalone document following [output-html-design.md](output-html-design.md).

- Render `greeting`, `person_name`, `date`, and `summary`, then Overview, Tasks, Email, Calendar, Teams Chat, and Meeting Recaps in that order.
- Preserve item wording and source order, omit absent fields, and render the empty state for an empty collection.
- Escape `&`, `<`, and `>` in every briefing value, and `"` in every attribute value, so briefing text cannot introduce markup.
- Run the `Verify Before Output` checklist in `output-html-design.md` against the written file and repair any failure. A failed render, escape, or validation check is a failed run.
