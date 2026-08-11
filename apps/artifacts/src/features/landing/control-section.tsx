import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataLabel } from "../../components/source-metadata";
import { Text } from "../../components/text";

function ControlSection() {
  return (
    <ContentContainer>
      <section className="flex flex-col gap-8" aria-labelledby="control-heading">
        <div className="space-y-4">
          <Text as="h1" id="control-heading" variant="display-lg">
            You stay in control
          </Text>
          <Text as="p" variant="content" className="text-balance">
            ChiefOS shows you what it knows, where every recommendation came from, and asks before
            anything carries your name.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2">
          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Your information stays where it belongs</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Grounded on the WorkIQ context layer, ChiefOS works inside your existing Microsoft
                365 environment, under the security and privacy controls your organisation already
                trusts.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Nothing goes out without you</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Replies are prepared as drafts and wait for your review, so you approve every
                message that carries your name.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>No black box</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Everything it remembers is visible and editable, so you always know what is shaping
                its recommendations.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
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
