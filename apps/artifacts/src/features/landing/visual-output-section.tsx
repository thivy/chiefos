import { ContentContainer, SurfaceContainer } from "../../components/container";
import { Text } from "../../components/text";

function VisualOutputSection() {
  return (
    <SurfaceContainer>
      <section className="flex flex-col gap-8" aria-labelledby="visual-output-heading">
        <ContentContainer className="gap-4 md:gap-4">
          <Text as="h1" id="visual-output-heading" variant="display-lg">
            A visual output for instant clarity
          </Text>
          <Text as="p" variant="content" className="text-balance">
            Turn the same priorities into a visual snapshot that is easy to scan, share, and
            revisit. It gives you another way to understand the shape of the day without reopening
            every source.
          </Text>
        </ContentContainer>
        <img
          src={`${import.meta.env.BASE_URL}img.jpg`}
          alt="Example ChiefOS visual briefing summarising the day's priorities"
          width={1080}
          height={545}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full max-w-[1561px]"
        />
      </section>
    </SurfaceContainer>
  );
}

export { VisualOutputSection };
