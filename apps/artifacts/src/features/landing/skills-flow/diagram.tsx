import { cn } from "cnfast";
import { m, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

import {
  CircleCheckIcon,
  CircleIcon,
  LoaderCircleIcon,
  MessageIcon,
} from "../../../components/icons";
import { EdgeLayer } from "./edges";
import { actorsOf, edgeOf } from "./inspect";
import { DURATION, fade } from "./motion";
import type { EdgeId, FlowEvent, FlowState, SkillId, SkillStatus } from "./reducer";
import { ENTRY_IDS, HELPER_IDS, SKILLS } from "./skills";

const STATUS_LABEL: Record<SkillStatus, string> = {
  idle: "Idle",
  running: "Running",
  waiting: "Waiting for you",
  done: "Done",
};

const STATUS_ICON = {
  idle: CircleIcon,
  running: LoaderCircleIcon,
  waiting: MessageIcon,
  done: CircleCheckIcon,
} as const satisfies Record<SkillStatus, typeof CircleIcon>;

const WIDE_QUERY = "(min-width: 40rem)";

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Wide screens put the starting points above the helpers. Narrow screens put them side by side.
function useIsWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 8" className={cn("h-2 w-4", className)}>
      <path d="M0 4H9" className="stroke-current" strokeWidth={1.5} fill="none" />
      <path d="M8 0.5L15.5 4L8 7.5Z" className="fill-current" />
    </svg>
  );
}

// Schedule starts the brief. The two are neighbours, so this link sits on their shared edge.
function Seam({ fired }: { fired: boolean }) {
  const reduced = useReducedMotion();

  return (
    <span className="pointer-events-none absolute top-1/4 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/4">
      <span
        aria-hidden="true"
        className="relative flex h-6 w-8 rotate-90 items-center justify-center rounded-full border border-foreground/25 bg-white text-foreground/40 sm:rotate-0"
      >
        <Arrow />
        <m.span
          className="absolute -inset-px flex items-center justify-center rounded-full border border-foreground bg-foreground text-background"
          initial={false}
          animate={{ opacity: fired ? 1 : 0 }}
          transition={fade(reduced, DURATION.fast)}
        >
          <Arrow />
        </m.span>
      </span>
      <span className="sr-only">
        {fired ? "Schedule has started the daily brief." : "Schedule can start the daily brief."}
      </span>
    </span>
  );
}

interface NodeProps {
  id: SkillId;
  status: SkillStatus;
  calls?: number;
  active: boolean;
}

function Node({ id, status, calls, active }: NodeProps) {
  const reduced = useReducedMotion();
  const { name, command, tone, Icon } = SKILLS[id];
  const StatusIcon = STATUS_ICON[status];
  const caption = calls
    ? `${STATUS_LABEL[status]} · ${calls} ${calls === 1 ? "call" : "calls"}`
    : STATUS_LABEL[status];

  return (
    <li className="p-1.5">
      <div className="relative h-full rounded-sm border border-foreground/10 bg-white/40">
        <m.div
          aria-hidden="true"
          className={cn("absolute inset-0 rounded-sm", tone)}
          initial={false}
          animate={{ opacity: status === "idle" ? 0.35 : 1 }}
          transition={fade(reduced)}
        />
        <m.div
          aria-hidden="true"
          className="absolute -inset-px rounded-sm border-2 border-foreground"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={fade(reduced, DURATION.fast)}
        />
        <div className="relative flex flex-col gap-1 p-3">
          <div className="flex items-center gap-2">
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span className="text-sm leading-[1.2] font-semibold">{name}</span>
          </div>
          <code className="hidden font-mono text-xs text-foreground/75 lg:block">{command}</code>
          <p className="flex items-center gap-1.5 text-[0.8125rem] leading-[1.2] text-foreground/80">
            <StatusIcon aria-hidden="true" className="size-3.5 shrink-0" />
            <span>{caption}</span>
          </p>
        </div>
      </div>
    </li>
  );
}

interface DiagramProps {
  planned: EdgeId[];
  labels: Partial<Record<EdgeId, string>>;
  state: FlowState;
  event: FlowEvent | null;
}

function Legend() {
  return (
    <p
      aria-hidden="true"
      className="flex flex-wrap items-center gap-x-5 gap-y-1 px-1.5 font-mono text-xs text-foreground/70"
    >
      <span className="flex items-center gap-2">
        <span className="h-0 w-6 border-t-2 border-foreground" />
        asked so far
      </span>
      <span className="flex items-center gap-2">
        <span className="h-0 w-6 border-t-[1.5px] border-dashed border-foreground/40" />
        can still be asked
      </span>
    </p>
  );
}

function Diagram({ planned, labels, state, event }: DiagramProps) {
  const wide = useIsWide();
  const actors = actorsOf(event);
  const fired = state.edges.filter((edge) => planned.includes(edge));

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[1fr_3.5rem_1fr] sm:grid-cols-1">
        <div className="relative">
          <ul
            aria-label="Starting points"
            className="grid h-full grid-rows-4 sm:grid-cols-4 sm:grid-rows-1"
          >
            {ENTRY_IDS.map((id) => (
              <Node key={id} id={id} status={state.skills[id]} active={actors.includes(id)} />
            ))}
          </ul>
          <Seam fired={state.edges.includes("schedule>brief")} />
        </div>
        <EdgeLayer
          planned={planned}
          labels={labels}
          fired={fired}
          latest={edgeOf(event)}
          wide={wide}
        />
        <ul aria-label="Helpers" className="grid h-full grid-rows-3 sm:grid-cols-3 sm:grid-rows-1">
          {HELPER_IDS.map((id) => (
            <Node
              key={id}
              id={id}
              status={state.skills[id]}
              calls={state.calls[id]}
              active={actors.includes(id)}
            />
          ))}
        </ul>
      </div>
      <Legend />
    </div>
  );
}

export { Diagram };
