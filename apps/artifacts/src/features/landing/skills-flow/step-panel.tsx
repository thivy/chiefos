import type { ReactNode } from "react";

import { Text } from "../../../components/text";
import { formatEvent } from "./inspect";
import type { Trace } from "./inspect";
import type { FlowStep } from "./runs";

interface StepPanelProps {
  steps: FlowStep[];
  trace: Trace;
  cursor: number;
}

function Label({ children }: { children: ReactNode }) {
  return <dt className="text-[0.8125rem] font-medium text-foreground/70">{children}</dt>;
}

function Code({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[0.8125rem] font-medium text-foreground/70">{label}</p>
      <pre className="overflow-x-auto rounded-sm border border-foreground/10 bg-white/70 p-3 font-mono text-[0.8125rem] leading-relaxed text-foreground">
        {children}
      </pre>
    </div>
  );
}

interface PanelProps {
  heading: string;
  title: string;
  why: string;
  how: string;
  event: string;
  change: string;
}

function Panel({ heading, title, why, how, event, change }: PanelProps) {
  return (
    <div className="grid animate-fade-in-fast gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="flex flex-col gap-3">
        <p className="text-[0.8125rem] font-medium text-foreground/70">{heading}</p>
        <Text as="h3" variant="display-sm">
          {title}
        </Text>
        <dl className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label>Why it happens</Label>
            <dd className="text-sm text-pretty">{why}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <Label>How it is triggered</Label>
            <dd className="text-sm text-pretty">{how}</dd>
          </div>
        </dl>
      </div>
      <div className="flex flex-col gap-3">
        <Code label="Event">{event}</Code>
        <Code label="State change">{change}</Code>
      </div>
    </div>
  );
}

// Only the current step is in the page. Keying by step replays the fade for each one.
function StepPanel({ steps, trace, cursor }: StepPanelProps) {
  const step = steps[cursor - 1];

  if (!step) {
    return (
      <Panel
        key={0}
        heading="Start"
        title="Nothing has run yet"
        why="Every skill starts idle. The reducer holds one state, and each event moves it to the next one."
        how="Pick a starting point, or press Next. The first event is the slash command that you enter."
        event="No event yet"
        change="All 7 skills: idle"
      />
    );
  }

  return (
    <Panel
      key={cursor}
      heading={`Step ${cursor} of ${steps.length} · ${step.source}`}
      title={step.title}
      why={step.why}
      how={step.how}
      event={formatEvent(step.event)}
      change={trace.changes[cursor - 1].join("\n") || "No change"}
    />
  );
}

export { StepPanel };
