# Briefing Output

Schema for the in-memory briefing, shared by the app and the email.

## 1. Schema

```ts
type Nullable<T> = T | null;

interface MessageItem {
  source: "email" | "chat" | "calendar" | "meeting";
  sourceLabel: string; // email/chat: Important | To Do | Waiting
  // calendar: Priority Meetings | Conflicts | Preparation | Optional
  // meeting: To Do | Waiting | Decision
  timestamp: string;
  authorName: Nullable<string>;
  authorRole: Nullable<string>;
  subject: string;
  summary: string;
  url: string;
  recommendedAction: Nullable<string>;
  taskTitle: Nullable<string>;
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
  person_name: string; // from the user's Microsoft 365 profile
  summary: string;
  emails: MessageItem[]; // source "email"
  calendar: MessageItem[]; // source "calendar"
  chats: MessageItem[]; // source "chat"
  recaps: MessageItem[]; // source "meeting"
  todo: { items: TodoItem[] };
}
```

### Rules

- Emit exactly these properties; use `null` only where allowed. Every `url` is a non-empty absolute deep link; omit an item rather than invent one.
- `date` is the local date in full, e.g. `Wednesday, 23 September 2026`. `timestamp` and `deadline` follow `chief-os-design`: Voice.
- Once the to-do list is final, set each message's `taskTitle` to the exact `title` of the `todo.items` entry it created or supports, else `null`. Each non-null value matches exactly one entry.
- Before rendering, check that names, dates, times and status agree wherever repeated, and that `summary` and `recommendedAction` meet their length limits.
- Keep the JSON in memory for the run and give it to `/app`; don't save it elsewhere.

## 2. Render

Preserve item wording and order and omit null fields. An empty section keeps its heading and shows muted `There are no items.` with no card. Insert text as text, never markup; escape `&`, `<`, `>` (and `"` in attributes) when building HTML strings. Page order: greeting, name and date, Overview (`summary` beside the image), Email, Calendar, Teams Chat, Meeting Recaps, Other Tasks.
