import { cn } from "cnfast";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

import {
  CircleCheckIcon,
  CircleIcon,
  LoaderCircleIcon,
  MessageIcon,
} from "../../../components/icons";
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

// Percent geometry in a 100 x 100 box. Each skill sits in the centre of an equal cell.
function edgePath(edge: EdgeId, wide: boolean) {
  const [from, to] = edge.split(">") as [(typeof ENTRY_IDS)[number], (typeof HELPER_IDS)[number]];
  const a = (ENTRY_IDS.indexOf(from) + 0.5) * (100 / ENTRY_IDS.length);
  const b = (HELPER_IDS.indexOf(to) + 0.5) * (100 / HELPER_IDS.length);
  return wide ? `M${a} 0C${a} 50 ${b} 50 ${b} 100` : `M0 ${a}C50 ${a} 50 ${b} 100 ${b}`;
}

interface PathProps {
  edge: EdgeId;
  wide: boolean;
  className: string;
  dashed?: boolean;
}

function EdgePath({ edge, wide, className, dashed }: PathProps) {
  return (
    <svg
      className="absolute inset-0 size-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={edgePath(edge, wide)}
        className={cn("fill-none", className)}
        strokeWidth={dashed ? 1.5 : 2.5}
        strokeDasharray={dashed ? "3 4" : undefined}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface EdgeLayerProps {
  planned: EdgeId[];
  edges: EdgeId[];
  latest: EdgeId | null;
  wide: boolean;
}

function EdgeLayer({ planned, edges, latest, wide }: EdgeLayerProps) {
  const reduced = useReducedMotion();
  const hidden = wide ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
  const fired = edges.filter((edge) => edge !== "schedule>brief");

  return (
    <div aria-hidden="true" className="relative sm:h-14">
      {planned.map((edge) => (
        <EdgePath key={edge} edge={edge} wide={wide} className="stroke-foreground/25" dashed />
      ))}
      <AnimatePresence initial={false}>
        {fired.map((edge) => (
          // A fired edge draws from the caller to the helper. The newest one is darkest.
          <m.div
            key={edge}
            className="absolute inset-0"
            initial={{ clipPath: reduced ? "inset(0 0 0 0)" : hidden, opacity: reduced ? 0 : 1 }}
            animate={{ clipPath: "inset(0 0 0 0)", opacity: edge === latest ? 1 : 0.4 }}
            exit={{ opacity: 0, transition: fade(reduced, DURATION.fast) }}
            transition={fade(reduced)}
          >
            <EdgePath edge={edge} wide={wide} className="stroke-foreground" />
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Schedule starts the brief. The two are neighbours, so this link sits on their shared edge.
function Seam({ fired }: { fired: boolean }) {
  const reduced = useReducedMotion();

  return (
    <span className="pointer-events-none absolute top-1/4 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/4">
      <span
        aria-hidden="true"
        className="relative flex size-6 rotate-90 items-center justify-center rounded-full border border-foreground/25 bg-white text-sm leading-none sm:rotate-0"
      >
        →
        <m.span
          className="absolute -inset-px flex items-center justify-center rounded-full border border-foreground bg-foreground text-background"
          initial={false}
          animate={{ opacity: fired ? 1 : 0 }}
          transition={fade(reduced, DURATION.fast)}
        >
          →
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
  state: FlowState;
  event: FlowEvent | null;
}

function Diagram({ planned, state, event }: DiagramProps) {
  const wide = useIsWide();
  const actors = actorsOf(event);

  return (
    <div className="grid grid-cols-[1fr_3rem_1fr] sm:grid-cols-1">
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
      <EdgeLayer planned={planned} edges={state.edges} latest={edgeOf(event)} wide={wide} />
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
  );
}

export { Diagram };
