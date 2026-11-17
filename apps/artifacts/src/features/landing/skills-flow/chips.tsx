import { cn } from "cnfast";

import { CircleCheckIcon, CircleIcon } from "../../../components/icons";

interface ChipsProps {
  label: string;
  items: readonly string[];
  done: readonly string[];
  verb: string;
}

// Placeholders that fill in as events arrive. The state decides which are done.
function Chips({ label, items, done, verb }: ChipsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[0.8125rem] font-medium text-foreground/70">{label}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const reached = done.includes(item);
          const Icon = reached ? CircleCheckIcon : CircleIcon;
          return (
            <li
              key={item}
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-foreground/10 bg-white/70 px-2.5 py-0.5 text-[0.8125rem] font-medium transition-opacity duration-(--motion-base) ease-(--ease-out)",
                reached ? "opacity-100" : "opacity-60",
              )}
            >
              <Icon aria-hidden="true" className="size-3.5 shrink-0" />
              {item}
              <span className="sr-only">{reached ? ` (${verb})` : " (not yet)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { Chips };
