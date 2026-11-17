import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { DURATION, fade } from "./motion";
import type { EdgeId } from "./reducer";
import { routeEdges } from "./routes";
import type { Size } from "./routes";

// Percent insets reach past the box, so the line and arrowhead on the node borders stay visible.
const HIDDEN = {
  wide: "inset(-10% -2% 110% -2%)",
  narrow: "inset(-2% 115% -2% -15%)",
} as const;
const SHOWN = {
  wide: "inset(-10% -2% -10% -2%)",
  narrow: "inset(-2% -15% -2% -15%)",
} as const;

interface LabelProps {
  text: string;
  // 0 not yet called, 1 called earlier, 2 called by the current step.
  level: 0 | 1 | 2;
}

// The pill has a solid fill so the line looks interrupted by it. A darker copy fades in on top.
function Label({ text, level }: LabelProps) {
  const reduced = useReducedMotion();

  return (
    <span className="relative block rounded-sm border border-foreground/15 bg-white px-2 py-0.5 font-mono text-[0.6875rem] leading-4 tracking-wider whitespace-nowrap text-foreground/50 uppercase">
      {text}
      <m.span
        className="absolute -inset-px flex items-center justify-center rounded-sm border border-foreground bg-white px-2 text-foreground"
        initial={false}
        animate={{ opacity: level === 2 ? 1 : level === 1 ? 0.6 : 0 }}
        transition={fade(reduced, DURATION.fast)}
      >
        {text}
      </m.span>
    </span>
  );
}

interface EdgeLayerProps {
  planned: EdgeId[];
  labels: Partial<Record<EdgeId, string>>;
  fired: EdgeId[];
  latest: EdgeId | null;
  wide: boolean;
}

// Dashed lines show every call this run can make. A call draws a solid line over its dashed
// one, from the caller to the helper. The newest call is darkest.
function EdgeLayer({ planned, labels, fired, latest, wide }: EdgeLayerProps) {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size | null>(null);

  useLayoutEffect(() => {
    const node = box.current;
    if (!node) return;

    const measure = () => {
      const next = { w: node.offsetWidth, h: node.offsetHeight };
      setSize((current) => (current?.w === next.w && current.h === next.h ? current : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const routes = useMemo(
    () => (size ? routeEdges(planned, size, wide) : []),
    [planned, size, wide],
  );
  const drawn = fired.flatMap((edge) => routes.find((route) => route.edge === edge) ?? []);
  const axis = wide ? "wide" : "narrow";

  return (
    <div ref={box} aria-hidden="true" className="relative sm:h-32">
      {routes.map(({ edge, line, head }) => (
        <m.svg
          key={edge}
          className="absolute inset-0 size-full overflow-visible"
          initial={false}
          animate={{ opacity: fired.includes(edge) ? 0 : 1 }}
          transition={fade(reduced, DURATION.fast)}
        >
          <path
            d={line}
            className="fill-none stroke-foreground/30"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
          <path d={head} className="fill-foreground/30" />
        </m.svg>
      ))}
      <AnimatePresence initial={false}>
        {drawn.map(({ edge, line, head }) => (
          <m.div
            key={edge}
            className="absolute inset-0"
            initial={{ clipPath: reduced ? SHOWN[axis] : HIDDEN[axis], opacity: reduced ? 0 : 1 }}
            animate={{ clipPath: SHOWN[axis], opacity: edge === latest ? 1 : 0.5 }}
            exit={{ opacity: 0, transition: fade(reduced, DURATION.fast) }}
            transition={fade(reduced)}
          >
            <svg className="absolute inset-0 size-full overflow-visible">
              <path d={line} className="fill-none stroke-foreground" strokeWidth={2} />
              <path
                d={head}
                className="fill-foreground stroke-foreground"
                strokeWidth={1}
                strokeLinejoin="round"
              />
            </svg>
          </m.div>
        ))}
      </AnimatePresence>
      {routes.map(({ edge, label }) => {
        const text = labels[edge];
        if (!label || !text) return null;
        return (
          <span
            key={edge}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: label.x, top: label.y }}
          >
            <Label text={text} level={edge === latest ? 2 : fired.includes(edge) ? 1 : 0} />
          </span>
        );
      })}
    </div>
  );
}

export { EdgeLayer };
