import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataCode } from "../../components/source-metadata";
import { Text } from "../../components/text";

function SkillsSection() {
  return (
    <ContentContainer>
      <section className="flex flex-col gap-8" aria-labelledby="skills-heading">
        <div className="space-y-4">
          <Text as="h1" id="skills-heading" variant="display-lg">
            Skills, one working rhythm
          </Text>
          <Text as="p" variant="lead">
            Each skill owns one clear part of the experience, from gathering the day&apos;s signals
            to keeping the routine running and closing the loop on finished work.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="bg-card-sage">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-schedule</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Sets one recurring schedule with a morning run and an afternoon run in your local
                time zone: 7:00 AM and 4:00 PM by default, or 8 or 9 AM and 3 or 5 PM. Both continue
                in the same conversation, and running it again updates the times in place.
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card-lemon">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-brief</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Brings together Outlook, calendar, chat, and meeting recaps into a focused morning
                brief or afternoon recap. It updates your task list, prepares draft replies, builds
                the chiefos app and briefing image, and emails you a summary. You can also ask for
                one part on its own, such as &ldquo;triage my email&rdquo;.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-sky">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-image-prompt</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Composes an illustration prompt in a named style: Everyday Doodle, Scientific
                Editorial, or Voxel Storyworld. It returns the prompt only, which keeps every
                vignette in your briefing image and visual minutes consistent and true to the facts.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-blush">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-todo-complete</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Lists your active tasks, asks which ones are finished, and ticks off only those in
                chiefos/todo.md, just like Mark as done in the app. Everything else stays exactly as
                it was.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-lilac sm:col-span-2">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-visual-minutes</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Turns one meeting into a single illustrated page: the key moments along its
                timeline, and the follow-up actions with their owners and due dates. Built only from
                that meeting&apos;s own recap, transcript, and chat.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentContainer>
  );
}

export { SkillsSection };
