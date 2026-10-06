import { cn } from "cnfast";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { CardCorner } from "../../components/card";
import { ContentContainer, SurfaceContainer } from "../../components/container";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  CircleCheckIcon,
  CircleIcon,
  LightBulb,
  LoaderCircleIcon,
  MailIcon,
  MessageIcon,
  PenCilSparklesIcon,
} from "../../components/icons";
import { ImageViewer } from "../../components/image-viewer";
import { Text } from "../../components/text";

// Type roles from the app's design reference, so the preview matches the real chiefos app.
const CAPTION_CLASS = "text-[0.8125rem] leading-[1.3] font-medium text-foreground/60";
const SUBJECT_CLASS = "text-base leading-[1.35] font-semibold text-balance";
const SUMMARY_CLASS = "line-clamp-6 text-sm leading-normal text-pretty text-foreground/70";
const FOCUS_RING_CLASS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const SIMULATED_SAVE_MS = 900;

const BRIEFING_IMAGE = {
  src: `${import.meta.env.BASE_URL}img.jpg`,
  width: 1632,
  height: 1410,
};

const OVERVIEW =
  "Priya needs your approval of the Q4 budget before the finance review at 3:00 PM. The Contoso renewal call overlaps the design review at 2:00 PM, so choose which one to attend. Sam confirms the launch date on Friday.";

const APP_FEATURES = [
  {
    title: "Colour means a task",
    description:
      "Cards that hold a task take a pastel colour. Cards for your information only stay white.",
  },
  {
    title: "Mark as done, saved for you",
    description:
      "Each change saves straight to chiefos/todo.md in your OneDrive, with a spinner while it saves.",
  },
  {
    title: "Done cards step back",
    description:
      "A finished card fades while its Done button stays clear, so you can undo it at once.",
  },
  {
    title: "Nothing slips off the page",
    description: "Open tasks with no new message today gather under Other Tasks.",
  },
  {
    title: "The image beside your overview",
    description: "Open the briefing image full screen, then drag or swipe to explore it.",
  },
  {
    title: "Straight to the source",
    description: "Every subject opens the email, event, chat, or recap behind it.",
  },
];

type PreviewTone = "sage" | "lemon" | "white";

const TONE_CLASS: Record<PreviewTone, string> = {
  sage: "bg-card-sage",
  lemon: "bg-card-lemon",
  white: "bg-card",
};

interface TaskToggleProps {
  done: boolean;
  saving: boolean;
  taskTitle: string;
  onToggle: () => void;
  className?: string;
}

function TaskToggle({ done, saving, taskTitle, onToggle, className }: TaskToggleProps) {
  const label = done ? "Done" : "Mark as done";
  const Icon = saving ? LoaderCircleIcon : done ? CircleCheckIcon : CircleIcon;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${label}: ${taskTitle}`}
      aria-busy={saving}
      aria-disabled={saving}
      className={cn(
        "inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-sm border border-foreground/10 text-sm leading-[1.2] font-[550] transition-colors [&_svg]:size-4",
        FOCUS_RING_CLASS,
        done ? "bg-foreground/5" : "bg-transparent hover:bg-foreground/5",
        saving ? "cursor-progress" : "cursor-pointer",
        className,
      )}
    >
      <Icon aria-hidden="true" className={cn(saving && "motion-safe:animate-spin")} />
      {label}
    </button>
  );
}

function LinkedSubject({ subject }: { subject: string }) {
  // Keep the link icon on the same line as the last word.
  const lastSpace = subject.lastIndexOf(" ");

  return (
    <p className={SUBJECT_CLASS}>
      {subject.slice(0, lastSpace + 1)}
      <span className="whitespace-nowrap">
        {subject.slice(lastSpace + 1)}
        <ArrowUpRightIcon
          aria-hidden="true"
          className="ml-1 inline size-4 align-[-0.125em] text-foreground/60"
        />
      </span>
    </p>
  );
}

interface PreviewCardProps {
  tone: PreviewTone;
  timestamp: string;
  icon: ReactNode;
  label: string;
  subject: string;
  summary: string;
  authorName?: string;
  authorRole?: string;
  nextStep?: string;
  taskTitle?: string;
  startsDone?: boolean;
}

function PreviewCard({
  tone,
  timestamp,
  icon,
  label,
  subject,
  summary,
  authorName,
  authorRole,
  nextStep,
  taskTitle,
  startsDone = false,
}: PreviewCardProps) {
  const [done, setDone] = useState(startsDone);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(saveTimer.current), []);

  function toggle() {
    if (saving) return;
    setDone(!done);
    setSaving(true);
    saveTimer.current = window.setTimeout(() => setSaving(false), SIMULATED_SAVE_MS);
  }

  // A done card fades every part except its toggle, so the surface sits on its own layer.
  const fade = cn("transition-opacity duration-200", done && "opacity-40");

  return (
    <article className="relative flex flex-col">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-sm border border-foreground/5 shadow-md shadow-foreground/10",
          TONE_CLASS[tone],
          fade,
        )}
      />
      <div className="relative flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className={fade}>
          <CardCorner />
        </div>
        <header className={cn("flex flex-col gap-0.5", CAPTION_CLASS, fade)}>
          <p className="whitespace-nowrap">{timestamp}</p>
          <p className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="opacity-60 [&_svg]:size-4">
              {icon}
            </span>
            <span className="truncate">{label}</span>
          </p>
        </header>
        <div className={cn("flex flex-col gap-1.5", fade)}>
          <LinkedSubject subject={subject} />
          <p className={SUMMARY_CLASS}>{summary}</p>
        </div>
        {authorName ? (
          <div className={cn("flex items-center gap-2", fade)}>
            <span aria-hidden="true" className="size-9 shrink-0 rounded-full bg-avatar" />
            <div className="flex flex-col">
              <Text as="span" variant="display-xs">
                {authorName}
              </Text>
              {authorRole ? <span className={CAPTION_CLASS}>{authorRole}</span> : null}
            </div>
          </div>
        ) : null}
        {nextStep ? (
          <div className={cn("mt-auto flex flex-col gap-3", fade)}>
            <div className="border-t border-foreground/10" />
            <div className="flex flex-col gap-1.5">
              <p className={cn("flex items-center gap-1.5", CAPTION_CLASS)}>
                <LightBulb aria-hidden="true" className="size-4" />
                Next step
              </p>
              <p
                className={cn(
                  "text-sm leading-[1.45] font-medium text-pretty",
                  done && "line-through",
                )}
              >
                {nextStep}
              </p>
            </div>
          </div>
        ) : null}
        {taskTitle ? (
          <TaskToggle
            done={done}
            saving={saving}
            taskTitle={taskTitle}
            onToggle={toggle}
            className={nextStep ? undefined : "mt-auto"}
          />
        ) : null}
      </div>
    </article>
  );
}

function AppPreview() {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <figure className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div className="relative flex flex-col gap-4 rounded-sm border border-foreground/5 bg-card p-4 sm:col-span-2 sm:p-5 lg:col-span-3">
          <CardCorner />
          <p className={cn("flex items-center gap-2", CAPTION_CLASS)}>
            <PenCilSparklesIcon aria-hidden="true" className="size-4 opacity-60" />
            Overview
          </p>
          <p className="text-base text-pretty">{OVERVIEW}</p>
        </div>
        <button
          type="button"
          aria-label="Open the briefing image"
          onClick={() => setViewerOpen(true)}
          className={cn(
            "relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-sm border border-foreground/5 bg-card shadow-md shadow-foreground/10 sm:aspect-auto sm:min-h-48",
            FOCUS_RING_CLASS,
          )}
        >
          <img
            src={BRIEFING_IMAGE.src}
            alt=""
            width={BRIEFING_IMAGE.width}
            height={BRIEFING_IMAGE.height}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="absolute inset-0 size-full object-cover object-top"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PreviewCard
          tone="sage"
          timestamp="Today 9:12 AM"
          icon={<MailIcon />}
          label="To Do"
          subject="Q4 budget approval"
          summary="Priya asks for your approval of the Q4 budget before the finance review at 3:00 PM today."
          authorName="Priya Patel"
          authorRole="Finance lead"
          nextStep="Approve the Q4 budget in the finance portal before 3:00 PM."
          taskTitle="Approve the Q4 budget for Priya"
        />
        <PreviewCard
          tone="lemon"
          timestamp="Today 2:00 PM"
          icon={<CalendarIcon />}
          label="Conflicts"
          subject="Contoso renewal call"
          summary="The renewal call overlaps the design review from 2:00 PM to 2:30 PM, and you are required at both."
          authorName="Alex Kim"
          authorRole="Account manager"
          nextStep="Attend the Contoso call and ask Sam to cover the design review."
          taskTitle="Resolve the 2:00 PM meeting conflict"
          startsDone
        />
        <PreviewCard
          tone="white"
          timestamp="Yesterday 4:45 PM"
          icon={<MessageIcon />}
          label="Waiting"
          subject="Launch checklist"
          summary="Sam shared the launch checklist and will confirm the go-live date on Friday."
          authorName="Sam Lee"
          authorRole="Product manager"
        />
      </div>
      <figcaption className={cn("text-center", CAPTION_CLASS)}>
        An example of the chiefos app. Try Mark as done, or open the image.
      </figcaption>
      <ImageViewer
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        label="Briefing image"
        src={BRIEFING_IMAGE.src}
        alt="Example briefing image with one hand-drawn vignette for each task"
        width={BRIEFING_IMAGE.width}
        height={BRIEFING_IMAGE.height}
      />
    </figure>
  );
}

function AppSection() {
  return (
    <SurfaceContainer>
      <ContentContainer>
        <section
          id="app"
          className="flex scroll-mt-8 flex-col gap-8 md:gap-12"
          aria-labelledby="app-heading"
        >
          <div className="space-y-4">
            <Text as="h1" id="app-heading" variant="display-lg">
              Your day, one card at a time
            </Text>
            <Text as="p" variant="lead">
              Every run rebuilds the chiefos app with the App skill in Copilot Cowork. Each email,
              event, chat, and meeting recap becomes a card, and the cards that need you carry their
              own Mark as done button.
            </Text>
          </div>
          <AppPreview />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {APP_FEATURES.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-1.5">
                <Text as="span" variant="display-xs">
                  {feature.title}
                </Text>
                <p className="text-sm text-pretty text-foreground/75">{feature.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </ContentContainer>
    </SurfaceContainer>
  );
}

export { AppSection };
