import { Card, CardContent, CardHeader } from "./components/card";
import { ListTodoIcon, PenCilSparklesIcon } from "./components/icons";
import {
  SourceMetadata,
  SourceMetadataIcon,
  SourceMetadataLabel,
  SourceMetadataTimestamp,
} from "./components/source-metadata";
import { Task } from "./components/task";
import { Text } from "./components/text";
import { MessageSection } from "./features/message-section";

type MessageSource = "email" | "chat" | "calendar" | "meeting";
type BriefingSource = MessageSource | "manual";
type NullableText = string | null;

interface BriefingItem {
  source: MessageSource;
  sourceLabel: string;
  timestamp: string;
  authorName: NullableText;
  authorRole: NullableText;
  subject: string;
  summary: string;
  url: string;
  recommendedAction: NullableText;
}

interface TodoItem {
  status: string;
  source: BriefingSource;
  title: string;
  summary: string;
  recommendedAction: string;
  sourceContext: NullableText;
  owner: NullableText;
  deadline: NullableText;
  url: string;
}

interface DailyBriefingData {
  date: string;
  greeting: string;
  person_name: string;
  summary: string;
  emails: BriefingItem[];
  calendar: BriefingItem[];
  chats: BriefingItem[];
  recaps: BriefingItem[];
  todo: {
    items: TodoItem[];
  };
}

const CARD_CLASSES = ["bg-card-sage", "bg-card-lemon", "bg-card-lilac", "bg-card-sand"];

function readDailyBriefingData(): DailyBriefingData {
  const dataElement = document.getElementById("daily-briefing-data");

  if (!dataElement?.textContent) {
    throw new Error("Missing daily-briefing-data script element.");
  }

  return JSON.parse(dataElement.textContent) as DailyBriefingData;
}

function toRenderableSource(source: BriefingSource): MessageSource | undefined {
  if (source === "email" || source === "calendar" || source === "meeting") {
    return source;
  }

  if (source === "chat") {
    return source;
  }

  return undefined;
}

const briefingData = readDailyBriefingData();
const messageItems = [
  ...briefingData.emails,
  ...briefingData.calendar,
  ...briefingData.chats,
  ...briefingData.recaps,
];

function App() {
  return (
    <div className="mx-auto max-w-5xl px-4 leading-6 lg:px-0">
      <div className="py-6">
        <h1>{briefingData.greeting}</h1>
      </div>
      <div className="flex flex-col gap-4 py-8">
        <Text as="h1" variant="display-lg">
          {briefingData.person_name}, here’s a clear, focused snapshot for {briefingData.date}.
        </Text>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-1 mb-4 shadow-none lg:col-span-5">
          <CardHeader>
            <SourceMetadata>
              <SourceMetadataIcon>
                <PenCilSparklesIcon />
              </SourceMetadataIcon>
              <SourceMetadataLabel>Brief overview</SourceMetadataLabel>
              <SourceMetadataTimestamp />
            </SourceMetadata>
          </CardHeader>
          <CardContent>
            <div>{briefingData.summary}</div>
          </CardContent>
        </Card>
        <Card className="col-span-1 mb-4 bg-white/60 lg:col-span-3">
          <CardHeader>
            <SourceMetadata>
              <SourceMetadataIcon>
                <ListTodoIcon />
              </SourceMetadataIcon>
              <SourceMetadataLabel>Tasks</SourceMetadataLabel>
              <SourceMetadataTimestamp />
            </SourceMetadata>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {briefingData.todo.items.map((todo) => {
                const source = toRenderableSource(todo.source);

                return (
                  <Task
                    key={`${todo.source}-${todo.status}-${todo.title}`}
                    source={source}
                    label={todo.title}
                    checked={todo.status.toLowerCase() === "completed"}
                    url={todo.url}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="columns-sm">
        {messageItems.map((item, index) => {
          const source = toRenderableSource(item.source);

          if (!source) {
            return null;
          }

          return (
            <MessageSection
              key={`${item.source}-${item.sourceLabel}-${item.subject}`}
              url={item.url}
              recommendedAction={item.recommendedAction}
              subject={item.subject}
              className={`mb-4 ${CARD_CLASSES[index % CARD_CLASSES.length]}`}
              source={source}
              sourceLabel={item.sourceLabel}
              timestamp={item.timestamp}
              authorName={item.authorName}
              authorRole={item.authorRole}
            >
              {item.summary}
            </MessageSection>
          );
        })}
      </div>
    </div>
  );
}

export default App;
