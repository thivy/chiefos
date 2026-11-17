import { cn } from "cnfast";
import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";

import type { FlowEvent } from "./reducer";

// The lines of the reducer that handle one event type: its case label and its body.
function caseRange(lines: string[], type: FlowEvent["type"]): [number, number] | null {
  const start = lines.findIndex((line) => line.trim() === `case "${type}":`);
  if (start < 0) return null;

  let inBody = false;
  let end = start + 1;
  for (; end < lines.length; end++) {
    const line = lines[end];
    if (!line.trim().startsWith("case ")) inBody = true;
    if (inBody && /^ {4}case /.test(line)) break;
    if (line === "  }") break;
  }
  return [start, end];
}

interface ReducerSourceProps {
  type: FlowEvent["type"] | null;
}

// The source loads the first time that you open it, so it costs nothing until then.
function ReducerSource({ type }: ReducerSourceProps) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const pre = useRef<HTMLPreElement>(null);
  const first = useRef<HTMLSpanElement>(null);

  const lines = source?.trimEnd().split("\n") ?? [];
  const range = type ? caseRange(lines, type) : null;

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    const next = event.currentTarget.open;
    setOpen(next);
    if (next && source === null && !failed) {
      import("./reducer.ts?raw")
        .then((module) => setSource(module.default))
        .catch(() => setFailed(true));
    }
  }

  // Bring the lines for the current event into view. This scrolls the code box only.
  useEffect(() => {
    const box = pre.current;
    const line = first.current;
    if (!open || !box || !line) return;
    box.scrollTo({ top: line.offsetTop - 16 });
  }, [open, source, type]);

  return (
    <details onToggle={handleToggle}>
      <summary className="inline-flex min-h-8 cursor-pointer items-center text-sm font-semibold underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">
        Read the reducer
      </summary>
      <p className="pt-2 text-sm text-pretty text-foreground/75">
        This is the file that the diagram runs. The lines that handle the current event are marked.
      </p>
      {failed && (
        <p className="pt-3 text-sm text-foreground/75">The reducer could not load. Try again.</p>
      )}
      {open && source !== null && (
        <pre
          ref={pre}
          tabIndex={0}
          aria-label="Reducer source"
          className="relative mt-3 max-h-96 overflow-auto rounded-sm border border-foreground/10 bg-white/70 py-3 font-mono text-[0.8125rem] leading-relaxed text-foreground"
        >
          <code className="block min-w-max">
            {lines.map((line, index) => {
              const marked = range !== null && index >= range[0] && index < range[1];
              return (
                <span
                  key={index}
                  ref={range !== null && index === range[0] ? first : undefined}
                  className={cn(
                    "block px-3",
                    marked && "bg-foreground/10 shadow-[inset_3px_0_0_var(--foreground)]",
                  )}
                >
                  {line || " "}
                </span>
              );
            })}
          </code>
        </pre>
      )}
    </details>
  );
}

export { ReducerSource };
