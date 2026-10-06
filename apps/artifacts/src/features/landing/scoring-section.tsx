import { cn } from "cnfast";
import type { ReactNode } from "react";
mpimport { Card, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { CalendarIcon, GaugeIcon, MailIcon, TagIcon, VideoIcon } from "../../components/icons";
import {
    SourceMetadata,
    SourceMetadataIcon,
    SourceMetadataLabel,
} from "../../components/source-metadata";
import { Text } from "../../components/text";
RS = [
  {
    name: "Impact",
    weight: 30,
    description: "What it costs the business if this is missed",
    barClass: "bg-card-sage",
  },
  {
    name: "Action",
    weight: 25,
    description: "What you personally owe, right now",
    barClass: "bg-card-lemon",
  },
  {
    name: "Urgency",
    weight: 20,
    description: "What actually happens if it waits",
    barClass: "bg-card-lilac",
  },
  {
    name: "Risk",
    weight: 15,
    description: "The exposure or dependency behind it",
    barClass: "bg-card-sand",
  },
  {
    name: "Stakeholder",
    weight: 10,
    description: "How closely the person is tied to the outcome",
    barClass: "bg-card-sky",
  },
];

const HIGHEST_WEIGHT = 30;

const LABEL_GROUPS: { source: string; icon: ReactNode; labels: string[] }[] = [
  { source: "Email and chat", icon: <MailIcon />, labels: ["Important", "To Do", "Waiting"] },
  {
    source: "Calendar",
    icon: <CalendarIcon />,
    labels: ["Conflicts", "Preparation", "Priority Meetings", "Optional"],
  },
  { source: "Meeting recaps", icon: <VideoIcon />, labels: ["To Do", "Waiting", "Decision"] },
];

function ScoringSection() {
  return (
    <ContentContainer>
      <section
        id="scoring"
        className="flex scroll-mt-8 flex-col gap-8"
        aria-labelledby="scoring-heading"
      >
        <div className="space-y-4">
          <Text as="h1" id="scoring-heading" variant="display-lg">
            How ChiefOS decides what matters
          </Text>
          <Text as="p" variant="lead">
            Every email, event, chat, and meeting recap is scored on the same five factors, so one
            situation ranks the same wherever it arrives. Only evidence counts: a senior job title
            or an &ldquo;URGENT&rdquo; subject line adds nothing. Scores set the order and never
            appear in what you read.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Card className="bg-white/60 lg:col-span-3">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <GaugeIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Five factors, out of 100</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <ul className="flex flex-col gap-5">
              {FACTORS.map((factor) => (
                <li key={factor.name} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <Text as="span" variant="display-xs">
                      {factor.name}
                    </Text>
                    <span className="text-sm font-semibold tabular-nums">{factor.weight}</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="h-1.5 overflow-hidden rounded-full bg-foreground/5"
                  >
                    <div
                      className={cn("h-full rounded-full", factor.barClass)}
                      style={{ width: `${(factor.weight / HIGHEST_WEIGHT) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-pretty text-foreground/75">{factor.description}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-white/60 lg:col-span-2">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <TagIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Labels on your cards</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <div className="flex flex-col gap-5">
              {LABEL_GROUPS.map((group) => (
                <div key={group.source} className="flex flex-col gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-[550]">
                    <span aria-hidden="true" className="opacity-60 [&_svg]:size-4">
                      {group.icon}
                    </span>
                    {group.source}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.labels.map((label) => (
                      <li
                        key={label}
                        className="rounded-full border border-foreground/10 bg-white/70 px-2.5 py-0.5 text-[0.8125rem] font-medium"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="text-sm text-pretty text-foreground/75">
                Calendar conflicts always surface, with both events, the exact overlap, and a
                recommended way to resolve it.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </ContentContainer>
  );
}

export { ScoringSection };
export { ScoringSection };
