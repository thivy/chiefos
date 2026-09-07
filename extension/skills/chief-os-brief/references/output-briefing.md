# Briefing Output

The single source for the in-memory briefing schema and shared rendering rules. Other references use these fields without redefining their types.

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

Both browser and email renderers preserve item wording and source order, omit null fields, and show their specified empty states.

Escape `&`, `<`, and `>` in briefing text and also `"` in attribute values before insertion into either renderer. Content must never introduce markup.

For `briefing.html`, use [output-html-design.md](output-html-design.md): greeting, person name and date, then Overview containing `summary`, Tasks, Email, Calendar, Teams Chat, and Meeting Recaps. Write one standalone document.
