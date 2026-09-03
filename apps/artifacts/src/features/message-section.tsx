import type { ComponentProps, ReactNode } from "react";

import { Avatar, AvatarAuthor, AvatarAuthorName, AvatarAuthorRole } from "../components/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardRecommendedAction,
  CardTitle,
} from "../components/card";
import { CalendarIcon, MailIcon, MessageIcon, VideoIcon } from "../components/icons";
import {
  SourceMetadata,
  SourceMetadataIcon,
  SourceMetadataLabel,
  SourceMetadataTimestamp,
} from "../components/source-metadata";

type MessageSource = "email" | "chat" | "calendar" | "meeting";
type NullableText = string | null;

const SOURCE_ICON: Record<MessageSource, typeof MailIcon> = {
  email: MailIcon,
  chat: MessageIcon,
  calendar: CalendarIcon,
  meeting: VideoIcon,
};

const SOURCE_LABEL: Record<MessageSource, string> = {
  email: "Email",
  chat: "Chat",
  calendar: "Calendar",
  meeting: "Meeting recap",
};

interface MessageSectionProps extends ComponentProps<typeof Card> {
  source: MessageSource;
  sourceLabel?: ReactNode;
  timestamp: ReactNode;
  authorName: NullableText;
  authorRole: NullableText;
  subject: string;
  children: ReactNode;
  recommendedAction: NullableText;
  url: NullableText;
}

function MessageSection({
  source,
  sourceLabel,
  timestamp,
  authorName,
  authorRole,
  subject,
  children,
  recommendedAction,
  url,
  className,
  ...props
}: MessageSectionProps) {
  const Icon = SOURCE_ICON[source];

  const card = (
    <Card className={className} {...props}>
      <CardHeader>
        <SourceMetadata>
          <SourceMetadataIcon>
            <Icon />
          </SourceMetadataIcon>
          <SourceMetadataLabel>{sourceLabel ?? SOURCE_LABEL[source]}</SourceMetadataLabel>
          <SourceMetadataTimestamp>{timestamp}</SourceMetadataTimestamp>
        </SourceMetadata>
      </CardHeader>
      <CardContent>
        <CardTitle>{subject}</CardTitle>
        <div className=""> {children}</div>
      </CardContent>

      <CardFooter>
        <Avatar />
        <AvatarAuthor>
          <AvatarAuthorName>{authorName}</AvatarAuthorName>
          <AvatarAuthorRole>{authorRole}</AvatarAuthorRole>
        </AvatarAuthor>
      </CardFooter>
      {recommendedAction ? (
        <CardRecommendedAction>{recommendedAction}</CardRecommendedAction>
      ) : null}
    </Card>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-sm text-current no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {card}
      </a>
    );
  }

  return card;
}

export { MessageSection };
export type { MessageSource };
