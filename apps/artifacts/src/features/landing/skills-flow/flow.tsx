import { cn } from "cnfast";
import { domMin, LazyMotion, MotionConfig } from "motion/react";
import { useState } from "react";

import { Button } from "../../../components/button";
import { CircleCheckIcon } from "../../../components/icons";
import { Chips } from "./chips";
import { Diagram } from "./diagram";
import { buildTrace } from "./inspect";
import type { EntryId } from "./reducer";
import { RUNS } from "./runs";
import { ENTRY_IDS, SKILLS } from "./skills";
import { StepPanel } from "./step-panel";
import { Timeline } from "./timeline";

const PRESS =
  "transition-[color,background-color,transform] duration-(--motion-press) ease-(--ease-out) active:scale-[0.97]";

interface View {
  entry: EntryId;
  cursor: number;
}

function Flow() {
  const [view, setView] = useState<View>({ entry: "schedule", cursor: 1 });
  const { entry, cursor } = view;

  const run = RUNS[entry];
  const trace = buildTrace(entry);
  const last = run.steps.length;
  const state = trace.states[cursor];
  const event = cursor > 0 ? run.steps[cursor - 1].event : null;

  const go = (next: number) => setView((current) => ({ ...current, cursor: next }));
  // The slash command is the first event, so a new run starts on step 1.
  const pick = (next: EntryId) => setView({ entry: next, cursor: 1 });

  const announcement =
    cursor === 0
      ? "Start: nothing has run yet"
      : `Step ${cursor} of ${last}: ${run.steps[cursor - 1].title}`;

  return (
    <LazyMotion features={domMin} strict>
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col gap-5 rounded-sm border border-foreground/10 bg-white/40 p-4 sm:p-6">
          <div role="group" aria-labelledby="skills-flow-start" className="flex flex-col gap-3">
            <p id="skills-flow-start" className="text-[0.8125rem] font-medium text-foreground/70">
              Pick a starting point
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ENTRY_IDS.map((id) => {
                const { name, command, tone } = SKILLS[id];
                const selected = id === entry;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => pick(id)}
                    className={cn(
                      "relative flex flex-col gap-1 rounded-sm border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:p-4",
                      PRESS,
                      tone,
                      selected
                        ? "border-foreground ring-1 ring-foreground"
                        : "border-foreground/5 hover:border-foreground/40",
                    )}
                  >
                    <span className="text-base leading-[1.35] font-semibold">{name}</span>
                    <code className="font-mono text-[0.8125rem] text-foreground/75">{command}</code>
                    <CircleCheckIcon
                      aria-hidden="true"
                      className={cn(
                        "absolute top-3 right-3 size-4 transition-opacity duration-(--motion-fast) ease-(--ease-out)",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-pretty text-foreground/75">
              Example run: {run.example} The names, dates, and counts are sample data.
            </p>
          </div>

          <Diagram planned={trace.planned} labels={trace.labels} state={state} event={event} />

          <div className="grid gap-3 sm:grid-cols-2">
            <Chips label="Reads" items={run.inputs} done={state.inputs} verb="read" />
            <Chips label="Makes" items={run.artifacts} done={state.artifacts} verb="made" />
          </div>

          <div className="flex flex-col gap-3 border-t border-foreground/10 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="secondary"
                aria-disabled={cursor === 0}
                onClick={() => cursor > 0 && go(cursor - 1)}
                className={cn(PRESS, "aria-disabled:opacity-50")}
              >
                Back
              </Button>
              <Button onClick={() => go(cursor === last ? 0 : cursor + 1)} className={cn(PRESS)}>
                {cursor === last ? "Start over" : "Next"}
              </Button>
              <p className="text-sm text-foreground/75 tabular-nums">
                {cursor === 0 ? "Start" : `Step ${cursor} of ${last}`}
              </p>
            </div>
            <div key={entry} className="animate-fade-in">
              <Timeline steps={run.steps} cursor={cursor} onSelect={go} />
            </div>
          </div>

          <StepPanel key={entry} steps={run.steps} cursor={cursor} />
          <p aria-live="polite" className="sr-only">
            {announcement}
          </p>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export { Flow };
