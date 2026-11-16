import { Card, CardContent, CardHeader } from "../../components/card";
import { ContentContainer } from "../../components/container";
import { SourceMetadata, SourceMetadataCode } from "../../components/source-metadata";
import { Text } from "../../components/text";

const IMAGE_STYLES = [
  {
    name: "Everyday Doodle",
    description: "Witty, hand-drawn scenes around an everyday object. The default.",
  },
  {
    name: "Scientific Editorial",
    description: "Precise specimen-plate illustration that explains a system or process.",
  },
  {
    name: "Prism Grain Silhouette",
    description: "Calm greyscale posters with one prism glow, about growth or courage.",
  },
  {
    name: "Spectrum Grain Collage",
    description: "Bold violet, orange, and lime collage about momentum or a launch.",
  },
  {
    name: "Blue-Glow Halftone Concept",
    description: "Two unlikely objects joined into one metaphor, with a single blue glow.",
  },
  {
    name: "Luminous Glitch Hologram",
    description: "One glowing glass subject on black, for technology and data.",
  },
];

const SUPPORTING_SKILLS = [
  {
    name: "/chief-os-motion",
    description:
      "One animation style for web pages and decks: the same few effects, timings, and easing. Everything still reads with motion off.",
  },
  {
    name: "/chief-os-design",
    description:
      "The shared look and voice: house wording, colour palette, and card style. You never call it yourself.",
  },
];

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
            to keeping the routine running, turning meetings into clear next steps, and building
            decks.
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
                Editorial, or one of four text-free poster styles. It returns the prompt only, which
                keeps every vignette in your briefing image and visual minutes consistent and true
                to the facts. The first two styles can carry text. The four poster styles show no
                text, which suits deck illustrations.
              </div>
              <ul className="flex flex-col gap-2 pt-2">
                {IMAGE_STYLES.map((style) => (
                  <li key={style.name} className="flex flex-col text-sm text-pretty">
                    <span className="font-[550]">{style.name}</span>
                    <span className="text-foreground/75">{style.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card-lilac">
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

          <Card className="bg-card-blush sm:col-span-2">
            <CardHeader>
              <SourceMetadata>
                <SourceMetadataCode>/chief-os-powerpoint</SourceMetadataCode>
              </SourceMetadata>
            </CardHeader>
            <CardContent>
              <div>
                Turns notes, documents, or meeting content into an editable PowerPoint deck. It
                plans the story, gives every slide one clear message and a fitting layout, adds
                consistent motion and illustrations, and checks each slide by eye before it saves
                the file. Slides use the ChiefOS palette and card style.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Text as="h2" id="supporting-skills-heading" variant="display-sm">
            Supporting skills
          </Text>
          <ul
            aria-labelledby="supporting-skills-heading"
            className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
          >
            {SUPPORTING_SKILLS.map((skill) => (
              <li key={skill.name} className="flex flex-col gap-1.5">
                <SourceMetadata>
                  <SourceMetadataCode>{skill.name}</SourceMetadataCode>
                </SourceMetadata>
                <p className="text-sm text-pretty text-foreground/75">{skill.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ContentContainer>
  );
}

export { SkillsSection };
