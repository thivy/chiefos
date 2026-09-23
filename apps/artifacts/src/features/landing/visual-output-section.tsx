import { Card, CardFooter } from "../../components/card";
import { ContentContainer, SurfaceContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataCode } from "../../components/source-metadata";
import { Text } from "../../components/text";

function VisualOutputSection() {
  return (
    <SurfaceContainer>
      <ContentContainer>
        <section className="flex flex-col gap-8 md:gap-12" aria-labelledby="visual-output-heading">
          <div className="space-y-4">
            <Text as="h1" id="visual-output-heading" variant="display-lg">
              A visual output for instant clarity
            </Text>
            <Text as="p" variant="lead">
              Turn the same priorities into a visual snapshot that is easy to scan, share, and
              revisit. It gives you another way to understand the shape of the day without reopening
              every source.
            </Text>
          </div>
          <Card className="bg-surface">
            <img
              src={`${import.meta.env.BASE_URL}img.jpg`}
              alt="Example ChiefOS visual briefing summarising the day's priorities"
              width={1632}
              height={1410}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
            <CardFooter>
              <SourceMetadata>
                <SourceMetadataCode>artifact-image.png</SourceMetadataCode>
              </SourceMetadata>
            </CardFooter>
          </Card>
        </section>
      </ContentContainer>
    </SurfaceContainer>
  );
}

export { VisualOutputSection };
