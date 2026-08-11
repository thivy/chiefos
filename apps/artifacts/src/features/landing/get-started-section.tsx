import { Button } from "../../components/button";
import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { ListTodoIcon } from "../../components/icons";
import {
  SourceMetadata,
  SourceMetadataIcon,
  SourceMetadataLabel,
} from "../../components/source-metadata";
import { Task } from "../../components/task";
import { Text } from "../../components/text";

function GetStartedSection() {
  return (
    <ContentContainer>
      <section
        id="get-started"
        className="flex scroll-mt-8 flex-col gap-8 lg:flex-row"
        aria-labelledby="install-heading"
      >
        <div className="flex-1 space-y-4">
          <Text as="h1" id="install-heading" variant="display-lg">
            Get started with ChiefOS
          </Text>
          <Text as="p" variant="content" className="text-balance">
            Download the plugin package, then upload it from Cowork&apos;s Customize page.
          </Text>
          <div className="flex flex-wrap gap-2">
            <Button
              as="a"
              href="//github.com/thivy/copilot-cowork/releases/latest/download/chief-os-latest.zip"
            >
              Download latest
            </Button>
            <Button
              as="a"
              variant="secondary"
              href="https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugins#upload-your-own-plugin-package"
              target="_blank"
              rel="noreferrer"
            >
              Read Microsoft&apos;s guide
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <Card className="bg-white/60">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <ListTodoIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Upload steps</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-4">
                <li>
                  <Task
                    label={
                      <>
                        <strong>Download the package.</strong> Save the latest ChiefOS plugin
                        package as a .zip file.
                      </>
                    }
                  />
                </li>
                <li>
                  <Task
                    label={
                      <>
                        <strong>Open Customize.</strong> In Cowork, select +, then Customize, then
                        open the Plugins tab.
                      </>
                    }
                  />
                </li>
                <li>
                  <Task
                    label={
                      <>
                        <strong>Upload ChiefOS.</strong> Select Upload plugin and choose the
                        downloaded .zip package.
                      </>
                    }
                  />
                </li>
              </ol>
            </CardContent>

            <div className="border-t border-foreground/10" />

            <CardHeader>
              <SourceMetadata>
                <SourceMetadataIcon>
                  <ListTodoIcon />
                </SourceMetadataIcon>
                <SourceMetadataLabel>Start using ChiefOS</SourceMetadataLabel>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-4">
                <li>
                  <Task
                    label={
                      <>
                        <strong>Set your schedule.</strong> Open a new Cowork session and enter{" "}
                        <code>/chief-os-schedule</code> to choose your morning and afternoon run
                        times.
                      </>
                    }
                  />
                </li>
                <li>
                  <Task
                    label={
                      <>
                        <strong>Run a briefing.</strong> Enter <code>/chief-os-brief</code> whenever
                        you want a morning brief or afternoon recap.
                      </>
                    }
                  />
                </li>
                <li>
                  <Task
                    label={
                      <>
                        <strong>Complete finished tasks.</strong> Enter{" "}
                        <code>/chief-os-todo-complete</code> to choose which active tasks to mark
                        complete.
                      </>
                    }
                  />
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentContainer>
  );
}

export { GetStartedSection };
