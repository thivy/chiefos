import { Card, CardContent, CardHeader } from "./components/card";
import { SourceMetadata, SourceMetadataLabel } from "./components/source-metadata";
import { Text } from "./components/text";

function Landing() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pb-16 leading-6 sm:space-y-10 md:space-y-16 lg:px-0">
      <div className="flex items-center gap-3 py-6">
        <img
          src={`${import.meta.env.BASE_URL}color.png`}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0"
        />
        <Text as="h2" variant="display-sm" className="text-balance">
          ChiefOS
        </Text>
      </div>

      <div className="flex flex-col gap-8">
        <Text as="h2" variant="display-sm" className="text-balance text-accent-foreground/65">
          Your work, already triaged
        </Text>
        <Text as="h1" variant="display-lg" className="text-balance">
          A digital chief of staff for Copilot Cowork. Nothing important chases you twice.
        </Text>
        <Text as="p" variant="content" className="text-balance">
          ChiefOS scans your inbox, calendar, Teams, and meeting recaps twice a day to surface what
          matters, draft the replies you owe, and keep your tasks current so nothing slips.
        </Text>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <SourceMetadataLabel>Teams follow-up</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Bring important conversations out of the scroll. ChiefOS finds open questions,
                blocked colleagues, and commitments that could otherwise disappear inside busy Teams
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
                Actions from email, meetings, calendar, and Teams become one living task list.
                Unfinished work carries forward until it is completed, so commitments do not quietly
                expire.
              </div>
            </CardContent>
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
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Text as="h1" variant="display-md">
          A visual output for instant clarity
        </Text>
        <Text as="p" variant="content" className="text-balance">
          Turn the same priorities into a visual snapshot that is easy to scan, share, and revisit.
          It gives you another way to understand the shape of the day without reopening every
          source.
        </Text>
        <img
          src={`${import.meta.env.BASE_URL}img.jpg`}
          alt="Example ChiefOS visual briefing summarising the day's priorities"
          width={1080}
          height={545}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-2xl"
        />
      </div>

      <section className="flex flex-col gap-8" aria-labelledby="skills-heading">
        <Text as="h1" id="skills-heading" variant="display-md">
          Skills, one working rhythm
        </Text>
        <Text as="p" variant="content" className="text-balance">
          Each skill owns one clear part of the experience, from gathering the day&apos;s signals to
          keeping the routine running and closing the loop on finished work.
        </Text>
        <div className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2">
          <Card className="bg-card-sage">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataLabel>chief-os-schedule</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <Text as="h2" variant="display-sm">
                Daily schedule
              </Text>
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
              <Text as="h2" variant="display-sm">
                Daily brief
              </Text>
              <div>
                Brings together Outlook, calendar, Teams, and meeting recaps into a focused morning
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
              <Text as="h2" variant="display-sm">
                Visual prompt
              </Text>
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
              <Text as="h2" variant="display-sm">
                Complete tasks
              </Text>
              <div>
                Lets you choose which active tasks are finished and marks only those items complete.
                Everything else stays intact, and the next brief picks up the updated task state
                automatically.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="flex flex-col gap-8">
        <Text as="h1" variant="display-md">
          You stay in control
        </Text>
        <Text as="p" variant="content" className="text-balance">
          ChiefOS shows you what it knows, where every recommendation came from, and asks before
          anything carries your name.
        </Text>
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
      </div>
    </div>
  );
}

export default Landing;
