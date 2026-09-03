import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataLabel } from "../../components/source-metadata";
import { Text } from "../../components/text";

function SkillsSection() {
  return (
    <ContentContainer>
      <section className="flex flex-col gap-8" aria-labelledby="skills-heading">
        <div className="space-y-4">
          <Text as="h1" id="skills-heading" variant="display-lg">
            Skills, one working rhythm
          </Text>
          <Text as="p" variant="content" className="text-balance">
            Each skill owns one clear part of the experience, from gathering the day&apos;s signals
            to keeping the routine running and closing the loop on finished work.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2">
          <Card className="bg-card-sage">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>chief-os-schedule</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Sets one recurring schedule with a morning run and an afternoon run in your local
                time zone. Both continue in the same conversation, so context carries naturally from
                the start of the day to the wrap-up.
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card-lemon">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>chief-os-brief</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Brings together Outlook, calendar, chat, and meeting recaps into a focused morning
                brief or afternoon recap. It updates your live task list, prepares draft replies,
                and carries durable context into the next run.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-sky">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>chief-os-image-prompt</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Translates the priorities in your brief into a precise image prompt with a
                consistent illustration style. That prompt powers the visual snapshot without
                changing, dropping, or inventing details from your day.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-blush">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>chief-os-todo-complete</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Lets you choose which active tasks are finished and marks only those items complete.
                Everything else stays intact, and the next brief picks up the updated task state
                automatically.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentContainer>
  );
}

export { SkillsSection };
