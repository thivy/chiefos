import { Button } from "../../components/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/card";
import { ContentContainer, SurfaceContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataLabel } from "../../components/source-metadata";
import { Text } from "../../components/text";

function HeroSection() {
  return (
    <>
      <SurfaceContainer>
        <div className="bg-surface">
          <div className="mx-auto max-w-5xl space-y-4 px-4 pt-8 pb-4 lg:px-0">
            <img src={`${import.meta.env.BASE_URL}color.png`} alt="" className="size-30 shrink-0" />

            <Text as="h2" variant="display-sm" className="text-balance text-accent-foreground/65">
              Your work, already triaged
            </Text>
            <Text as="h1" id="hero-heading" variant="display-lg" className="text-balance">
              A digital chief of staff for Copilot Cowork. Nothing important chases you twice.
            </Text>
            <Text as="p" variant="content" className="text-balance">
              ChiefOS scans your inbox, calendar, chat, and meeting recaps twice a day to surface
              what matters, draft the replies you owe, and keep your tasks current so nothing slips.
            </Text>
            <nav aria-label="Project links" className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                as="a"
                variant="secondary"
                href="https://github.com/thivy/chiefos"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </Button>

              <Button as="a" href="#get-started">
                Get started
              </Button>
            </nav>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}hero-image.jpg`}
            alt="ChiefOS bringing email, calendar, chat, and tasks together"
            className="mx-auto h-auto w-full max-w-[1561px]"
          />
        </div>
      </SurfaceContainer>
      <ContentContainer>
        {" "}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
          <Card className="bg-card-lemon">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Email triage and draft replies</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                See the messages that need a decision, response, or follow-up first. ChiefOS
                prepares grounded replies in Outlook and leaves every draft for you to review and
                send.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-sage">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Calendar intelligence</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Start the day knowing which meetings matter, where the conflicts are, and what needs
                preparation. ChiefOS turns your schedule into a plan, not another list to scan.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-lilac">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Chat follow-up</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Bring important conversations out of the scroll. ChiefOS finds open questions,
                blocked colleagues, and commitments that could otherwise disappear inside busy chat
                threads.
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-sand">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>A task list that keeps itself current</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Actions from email, meetings, calendar, and chat become one living task list.
                Unfinished work carries forward until it is completed, so commitments do not quietly
                expire.
              </div>
            </CardContent>
            <CardFooter>
              <SourceMetadata>
                <SourceMetadataLabel>todo.md</SourceMetadataLabel>
              </SourceMetadata>
            </CardFooter>
          </Card>

          <Card className="bg-card-blush">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>Memory that makes every brief better</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                ChiefOS remembers durable context such as key people, active priorities, and
                communication preferences. The context stays visible and editable, helping future
                triage reflect how you actually work.
              </div>
            </CardContent>
            <CardFooter>
              <SourceMetadata>
                <SourceMetadataLabel>memory.md</SourceMetadataLabel>
              </SourceMetadata>
            </CardFooter>
          </Card>

          <Card className="bg-card-sky">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>A briefing you can work in</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Do more than read a summary. Explore sources, review recommended actions, and work
                through priorities in a focused briefing that brings the day together in one place.
              </div>
            </CardContent>
            <CardFooter>
              <SourceMetadata>
                <SourceMetadataLabel>briefing.html</SourceMetadataLabel>
              </SourceMetadata>
            </CardFooter>
          </Card>
        </div>
      </ContentContainer>
    </>
  );
}

export { HeroSection };
