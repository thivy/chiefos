import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import {
  EyeIcon,
  LinkIcon,
  MailCheckIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  TagIcon,
} from "../../components/icons";
import {
  SourceMetadata,
  SourceMetadataIcon,
  SourceMetadataLabel,
} from "../../components/source-metadata";
import { Text } from "../../components/text";

function ControlSection() {
  return (
    <ContentContainer>
      <section className="flex flex-col gap-8" aria-labelledby="control-heading">
        <div className="space-y-4">
          <Text as="h1" id="control-heading" variant="display-lg">
            You stay in control
          </Text>
          <Text as="p" variant="lead">
            ChiefOS shows you what it knows, where every recommendation came from, and asks before
            anything carries your name.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <ShieldCheckIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Your information stays where it belongs</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Grounded on the WorkIQ context layer, ChiefOS works inside your existing Microsoft
                365 environment. Your task list and memory live in your own OneDrive.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <MailCheckIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Nothing goes out without you</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Replies wait in your Drafts folder for your review. The only email ChiefOS sends is
                your own summary, to you.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <TagIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Every draft is clearly marked</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Each draft opens with a bold AI-generated notice, so it can never be mistaken for
                something you wrote.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <SearchCheckIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Evidence only</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                ChiefOS never invents a person, date, commitment, link, or signature. When it cannot
                check something, it leaves it out and tells you.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <EyeIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>No black box</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Everything it remembers is visible and editable. Passwords, keys, and sensitive
                personal details are never stored.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <LinkIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Every recommendation is traceable</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Each priority links back to the email, meeting, or message behind it, so you can
                check the source before you act.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentContainer>
  );
}

export { ControlSection };
