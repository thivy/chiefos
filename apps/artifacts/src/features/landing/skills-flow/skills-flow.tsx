import { startTransition, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

import { Text } from "../../../components/text";
import { StaticFlow } from "./static-flow";

const STATIC_LEAD =
  "Four skills can start a run. Each one asks the same three helpers for what it needs.";
const INTERACTIVE_LEAD =
  "Pick a starting point, then step through an example run to see which skills ask each other for help, and why.";

// The interactive flow and Motion load only when this section nears the screen.
// The static map shows until then, and stays if the load fails.
function SkillsFlow() {
  const [Flow, setFlow] = useState<ComponentType | null>(null);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = anchor.current;
    if (!node) return;

    let cancelled = false;
    const load = () => {
      import("./flow")
        .then((module) => {
          if (!cancelled) startTransition(() => setFlow(() => module.Flow));
        })
        .catch(() => {});
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <figure className="flex flex-col gap-4" aria-labelledby="skills-flow-heading">
      <div className="flex flex-col gap-2">
        <Text as="h2" id="skills-flow-heading" variant="display-sm">
          How the skills work together
        </Text>
        <Text as="p" variant="content" className="max-w-2xl text-foreground/75">
          {Flow ? INTERACTIVE_LEAD : STATIC_LEAD}
        </Text>
      </div>
      <div ref={anchor}>{Flow ? <Flow /> : <StaticFlow />}</div>
    </figure>
  );
}

export { SkillsFlow };
