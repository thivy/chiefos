# Briefing Output

The single source for the in-memory briefing schema and shared rendering rules. Other references use these fields without redefining their types.

## 1. Schema

Message items become message cards, with `summary` as the card body. To-do items become tasks, with `title` as the task text and `url` linking the task to its source. A message's `taskTitle` names the task that the message created or supports.

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
  taskTitle: Nullable<string>;
}

interface EmailItem extends MessageItem {
  source: "email";
  sourceLabel: "Important" | "To Do" | "Waiting";
}

interface ChatItem extends MessageItem {
  source: "chat";
  sourceLabel: "Important" | "To Do" | "Waiting";
}

interface CalendarItem extends MessageItem {
  source: "calendar";
  sourceLabel: "Priority Meetings" | "Conflicts" | "Preparation" | "Optional";
}

interface MeetingRecapItem extends MessageItem {
  source: "meeting";
  sourceLabel: "To Do" | "Waiting" | "Decision";
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
- `date` is the local briefing date in full, e.g. `Wednesday, 23 September 2026`, ordered for the user's locale. `timestamp` and `deadline` follow the date and time rules in [conventions.md](conventions.md).
- `taskTitle` stays `null` until the to-do list is final. Then set it to the exact `title` of the `todo.items` entry that the message created or supports, and leave it `null` when there is none. Each non-null `taskTitle` matches exactly one entry.
- Any collection may be an empty array.
- Keep the value in memory for the run, and give it to `/app` as the `chiefos` app's briefing data. Do not save it anywhere else.

## 2. Render

Both the app and the email preserve item wording and source order, omit null fields, and show their specified empty states.

Insert briefing text as text, never as markup. Where a renderer builds HTML strings, as the email does, escape `&`, `<`, and `>`, and also `"` in attribute values.

For the `chiefos` app, use [output-html-design.md](output-html-design.md): greeting, person name and date, then Overview containing `summary` beside the briefing image, then Email, Calendar, Teams Chat, Meeting Recaps, and Other Tasks, on one page.
