import { cn } from "cnfast";
import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

import { ownerOf } from "./inspect";
import { DURATION, fade } from "./motion";
import type { FlowStep } from "./runs";
import { SKILLS } from "./skills";

interface TimelineProps {
  steps: FlowStep[];
  cursor: number;
  onSelect: (cursor: number) => void;
}

function Connector({ filled }: { filled: boolean }) {
  const reduced = useReducedMotion();

  return (
    <span aria-hidden="true" className="relative h-0.5 flex-1 bg-foreground/15">
      <m.span
        className="absolute inset-0 origin-left bg-foreground"
        initial={false}
        animate={reduced ? { opacity: filled ? 1 : 0 } : { scaleX: filled ? 1 : 0 }}
        transition={fade(reduced, DURATION.base)}
      />
    </span>
  );
}

interface MarkerProps {
  index: number;
  label: string;
  tone: string;
  reached: boolean;
  current: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
}

function Marker({
  index,
  label,
  tone,
  reached,
  current,
  onSelect,
  onKeyDown,
  buttonRef,
}: MarkerProps) {
  const reduced = useReducedMotion();

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      aria-current={current ? "step" : undefined}
      tabIndex={current ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-white/70 text-[0.8125rem] font-semibold text-foreground tabular-nums transition-[transform,border-color] duration-(--motion-press) ease-(--ease-out) hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.97]"
    >
      <m.span
        aria-hidden="true"
        className={cn("absolute inset-0 rounded-full", tone)}
        initial={false}
        animate={{ opacity: reached ? 1 : 0 }}
        transition={fade(reduced, DURATION.fast)}
      />
      <m.span
        aria-hidden="true"
        className="absolute -inset-px rounded-full border-2 border-foreground"
        initial={false}
        animate={{ opacity: current ? 1 : 0 }}
        transition={fade(reduced, DURATION.fast)}
      />
      <span className="relative">{index}</span>
    </button>
  );
}

function Timeline({ steps, cursor, onSelect }: TimelineProps) {
  const reduced = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLButtonElement | null)[]>([]);
  const last = steps.length;

  // Keep the current marker in view. This scrolls the strip only, never the page.
  useEffect(() => {
    const strip = scroller.current;
    const marker = markers.current[cursor];
    if (!strip || !marker) return;
    const left = marker.offsetLeft - (strip.clientWidth - marker.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: reduced ? "auto" : "smooth" });
  }, [cursor, reduced]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const targets: Record<string, number> = {
      ArrowRight: Math.min(cursor + 1, last),
      ArrowLeft: Math.max(cursor - 1, 0),
      Home: 0,
      End: last,
    };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    markers.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div ref={scroller} className="relative -mx-1 overflow-x-auto px-1 py-1.5">
      <ol aria-label="Run timeline" className="flex min-w-max items-center">
        {Array.from({ length: last + 1 }, (_, index) => {
          const step = steps[index - 1];
          return (
            <li key={index} className={cn("flex items-center", index > 0 && "min-w-5 flex-1")}>
              {index > 0 && <Connector filled={index <= cursor} />}
              <Marker
                index={index}
                label={step ? `Step ${index}: ${step.title}` : "Start: nothing has run yet"}
                tone={step ? SKILLS[ownerOf(step.event)].tone : "bg-card"}
                reached={index > 0 && index <= cursor}
                current={index === cursor}
                onSelect={() => onSelect(index)}
                onKeyDown={handleKeyDown}
                buttonRef={(element) => {
                  markers.current[index] = element;
                }}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export { Timeline };
