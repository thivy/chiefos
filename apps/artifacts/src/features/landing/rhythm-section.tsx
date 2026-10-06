import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import {
  ImageIcon,
  ListTodoIcon,
  MailCheckIcon,
  MailIcon,
  NewspaperIcon,
  SunriseIcon,
  SunsetIcon,
} from "../../components/icons";
import {
  SourceMetadata,
  SourceMetadataIcon,
  SourceMetadataLabel,
  SourceMetadataTimestamp,
} from "../../components/source-metadata";
import { Text } from "../../components/text";

const MORNING_ANSWERS = [
  "What needs a decision today",
  "Which meetings need preparation",
  "Where the calendar clashes",
  "What recent meetings committed you to",
  "Who is waiting on a reply",
];

const AFTERNOON_ANSWERS = [
  "What got resolved since the morning",
  "What is still open, and what is now overdue",
  "What today's meetings changed",
  "What to prepare for tomorrow",
];

const DELIVERABLES: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <NewspaperIcon />,
    title: "The chiefos app",
    description: "Your day as cards, ranked by what needs you most.",
  },
  {
    icon: <ListTodoIcon />,
    title: "Your task list",
    description: "Carried forward in your OneDrive until each task is done.",
  },
  {
    icon: <MailIcon />,
    title: "Draft replies",
    description: "Saved in Outlook for you to review, and never sent.",
  },
  {
    icon: <ImageIcon />,
    title: "A briefing image",
    description: "One hand-drawn vignette and note for every task.",
  },
  {
    icon: <MailCheckIcon />,
    title: "A summary email",
    description: "Sent only to you, with the briefing image attached.",
  },
];

function AnswerList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-pretty">
          <span
            aria-hidden="true"
            className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-foreground/50"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RhythmSection() {
  return (
    <ContentContainer>
      <section
        id="daily-rhythm"
        className="flex scroll-mt-8 flex-col gap-8"
        aria-labelledby="rhythm-heading"
      >
        <div className="space-y-4">
          <Text as="h1" id="rhythm-heading" variant="display-lg">
            Two runs a day, set once
          </Text>
          <Text as="p" variant="lead">
            ChiefOS runs at 7:00 AM and 4:00 PM by default, or at the times you pick. Both runs
            continue in one conversation, so the afternoon recap only tells you what changed.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-card-lemon">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <SunriseIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Morning Brief</SourceMetadataLabel>
                <SourceMetadataTimestamp>7:00 AM</SourceMetadataTimestamp>
              </SourceMetadata>
            </CardHeader>
            <CardContent className="gap-4">
              <Text as="h2" variant="display-sm">
                Start the day with what matters
              </Text>
              <AnswerList items={MORNING_ANSWERS} />
            </CardContent>
          </Card>
          <Card className="bg-card-lilac">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <SunsetIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Afternoon Recap</SourceMetadataLabel>
                <SourceMetadataTimestamp>4:00 PM</SourceMetadataTimestamp>
              </SourceMetadata>
            </CardHeader>
            <CardContent className="gap-4">
              <Text as="h2" variant="display-sm">
                Close the day with what changed
              </Text>
              <AnswerList items={AFTERNOON_ANSWERS} />
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white/60">
          <CardHeader>
            <SourceMetadata>
              <SourceMetadataLabel>Every run delivers</SourceMetadataLabel>
            </SourceMetadata>
          </CardHeader>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {DELIVERABLES.map((deliverable) => (
              <li key={deliverable.title} className="flex flex-col gap-2">
                <span aria-hidden="true" className="text-foreground/60 [&_svg]:size-5">
                  {deliverable.icon}
                </span>
                <Text as="span" variant="display-xs">
                  {deliverable.title}
                </Text>
                <p className="text-sm text-pretty text-foreground/75">{deliverable.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </ContentContainer>
  );
}

export { RhythmSection };
