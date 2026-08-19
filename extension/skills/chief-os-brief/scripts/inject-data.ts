const htmlFile = "briefing.html";
const templateFile = new URL(`../assets/${htmlFile}`, import.meta.url);
const html = await Bun.file(templateFile).text();

const args = Bun.argv.slice(2);
const dataFlagIndex = args.indexOf("--data");
const dataArg = dataFlagIndex === -1 ? undefined : args[dataFlagIndex + 1];

if (dataFlagIndex === -1 || !dataArg || args.length !== 2) {
  throw new Error("Usage: bun inject-data.ts --data <json|path|->");
}

async function readJsonContent(value: string): Promise<string> {
  if (value === "-") {
    return await Bun.stdin.text();
  }

  const trimmedValue = value.trimStart();

  if (trimmedValue.startsWith("{") || trimmedValue.startsWith("[")) {
    return value;
  }

  return await Bun.file(value).text();
}

const jsonContent = await readJsonContent(dataArg);

type JsonObject = Record<string, unknown>;

const messageKeys = [
  "source",
  "sourceLabel",
  "timestamp",
  "authorName",
  "authorRole",
  "subject",
  "summary",
  "url",
  "recommendedAction",
] as const;

const todoKeys = [
  "status",
  "source",
  "title",
  "summary",
  "recommendedAction",
  "sourceContext",
  "owner",
  "deadline",
  "url",
] as const;

function assertObject(value: unknown, path: string): asserts value is JsonObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${path} must be an object.`);
  }
}

function assertExactKeys(value: JsonObject, keys: readonly string[], path: string): void {
  const actualKeys = Object.keys(value);
  const missingKeys = keys.filter((key) => !(key in value));
  const extraKeys = actualKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0 || extraKeys.length > 0) {
    const details = [
      missingKeys.length > 0 ? `missing: ${missingKeys.join(", ")}` : "",
      extraKeys.length > 0 ? `unexpected: ${extraKeys.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    throw new Error(`${path} has invalid properties (${details}).`);
  }
}

function assertString(value: unknown, path: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${path} must be a non-empty string.`);
  }
}

function assertNullableString(value: unknown, path: string): void {
  if (value !== null) {
    assertString(value, path);
  }
}

function assertEnum(value: unknown, allowedValues: readonly string[], path: string): void {
  if (typeof value !== "string" || !allowedValues.includes(value)) {
    throw new Error(`${path} must be one of: ${allowedValues.join(", ")}.`);
  }
}

function assertUrl(value: unknown, path: string): void {
  assertString(value, path);

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${path} must be an absolute URL.`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${path} must use http or https.`);
  }
}

function assertMessageItem(
  value: unknown,
  source: string,
  sourceLabels: readonly string[],
  path: string,
): void {
  assertObject(value, path);
  assertExactKeys(value, messageKeys, path);
  assertEnum(value.source, [source], `${path}.source`);
  assertEnum(value.sourceLabel, sourceLabels, `${path}.sourceLabel`);
  assertString(value.timestamp, `${path}.timestamp`);
  assertNullableString(value.authorName, `${path}.authorName`);
  assertNullableString(value.authorRole, `${path}.authorRole`);
  assertString(value.subject, `${path}.subject`);
  assertString(value.summary, `${path}.summary`);
  assertUrl(value.url, `${path}.url`);
  assertNullableString(value.recommendedAction, `${path}.recommendedAction`);
}

function assertMessageItems(
  value: unknown,
  source: string,
  sourceLabels: readonly string[],
  path: string,
): void {
  if (!Array.isArray(value)) {
    throw new Error(`${path} must be an array.`);
  }

  value.forEach((item, index) => {
    assertMessageItem(item, source, sourceLabels, `${path}[${index}]`);
  });
}

function assertTodoItems(value: unknown, path: string): void {
  if (!Array.isArray(value)) {
    throw new Error(`${path} must be an array.`);
  }

  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;

    assertObject(item, itemPath);
    assertExactKeys(item, todoKeys, itemPath);
    assertEnum(item.status, ["Active", "Completed"], `${itemPath}.status`);
    assertEnum(
      item.source,
      ["email", "chat", "calendar", "meeting", "manual"],
      `${itemPath}.source`,
    );
    assertString(item.title, `${itemPath}.title`);
    assertString(item.summary, `${itemPath}.summary`);
    assertString(item.recommendedAction, `${itemPath}.recommendedAction`);
    assertNullableString(item.sourceContext, `${itemPath}.sourceContext`);
    assertNullableString(item.owner, `${itemPath}.owner`);
    assertNullableString(item.deadline, `${itemPath}.deadline`);
    assertUrl(item.url, `${itemPath}.url`);
  });
}

function assertDailyBriefing(value: unknown): asserts value is JsonObject {
  assertObject(value, "DailyBriefing");
  assertExactKeys(
    value,
    [
      "date",
      "greeting",
      "person_name",
      "summary",
      "emails",
      "calendar",
      "chats",
      "recaps",
      "todo",
    ],
    "DailyBriefing",
  );
  assertString(value.date, "DailyBriefing.date");
  assertString(value.greeting, "DailyBriefing.greeting");
  assertString(value.person_name, "DailyBriefing.person_name");
  assertString(value.summary, "DailyBriefing.summary");
  assertMessageItems(value.emails, "email", ["Important", "Actionable", "Waiting"], "emails");
  assertMessageItems(
    value.calendar,
    "calendar",
    ["Priority Meetings", "Conflicts", "Prep Needed", "FYI / Optional"],
    "calendar",
  );
  assertMessageItems(value.chats, "chat", ["Important", "Actionable", "Waiting"], "chats");
  assertMessageItems(
    value.recaps,
    "meeting",
    ["Action Required", "Waiting", "Decision / Outcome"],
    "recaps",
  );
  assertObject(value.todo, "DailyBriefing.todo");
  assertExactKeys(value.todo, ["items"], "DailyBriefing.todo");
  assertTodoItems(value.todo.items, "todo.items");
}

function getEmbeddableJsonContent(value: string): string {
  const parsedValue: unknown = JSON.parse(value);
  assertDailyBriefing(parsedValue);

  return JSON.stringify(parsedValue).replaceAll("<", "\\u003c");
}

function writeJsonContentToTemplate(template: string, value: string): string {
  const scriptPattern =
    /(<script\b(?=[^>]*\bid=["']daily-briefing-data["'])(?=[^>]*\btype=["']application\/json["'])[^>]*>)([\s\S]*?)(<\/script>)/i;

  if (!scriptPattern.test(template)) {
    throw new Error("Missing daily-briefing-data script element.");
  }

  const embeddableJsonContent = getEmbeddableJsonContent(value);

  return template.replace(
    scriptPattern,
    (_match: string, openingTag: string, _currentContent: string, closingTag: string) => {
      return `${openingTag}\n${embeddableJsonContent}\n${closingTag}`;
    },
  );
}

const output = writeJsonContentToTemplate(html, jsonContent);
await Bun.write(htmlFile, output);
