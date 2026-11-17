import { Text } from "../../../components/text";
import type { FlowStep } from "./runs";

interface StepPanelProps {
  steps: FlowStep[];
  cursor: number;
}

interface PanelProps {
  heading: string;
  title: string;
  why: string;
  how: string;
}

function Panel({ heading, title, why, how }: PanelProps) {
  return (
    <div className="flex max-w-2xl animate-fade-in-fast flex-col gap-3">
      <p className="text-[0.8125rem] font-medium text-foreground/70">{heading}</p>
      <Text as="h3" variant="display-sm">
        {title}
      </Text>
      <dl className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <dt className="text-[0.8125rem] font-medium text-foreground/70">Why it happens</dt>
          <dd className="text-sm text-pretty">{why}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[0.8125rem] font-medium text-foreground/70">What happens</dt>
          <dd className="text-sm text-pretty">{how}</dd>
        </div>
      </dl>
    </div>
  );
}

// Only the current step is in the page. Keying by step replays the fade for each one.
function StepPanel({ steps, cursor }: StepPanelProps) {
  const step = steps[cursor - 1];

  if (!step) {
    return (
      <Panel
        key={0}
        heading="Start"
        title="Nothing has run yet"
        why="Every skill waits until you ask for something."
        how="Press Next to start. The first step is the command that you enter."
      />
    );
  }

  return (
    <Panel
      key={cursor}
      heading={`Step ${cursor} of ${steps.length}`}
      title={step.title}
      why={step.why}
      how={step.how}
    />
  );
}

export { StepPanel };
