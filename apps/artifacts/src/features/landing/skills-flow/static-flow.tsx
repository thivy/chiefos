import type { ReactNode } from "react";

interface FlowStepProps {
  tone: string;
  name: string;
  command: string;
  children: ReactNode;
}

function FlowStep({ tone, name, command, children }: FlowStepProps) {
  return (
    <li className={`flex flex-col gap-1.5 rounded-sm border border-foreground/5 p-4 ${tone}`}>
      <span className="text-base leading-[1.35] font-semibold">{name}</span>
      <code className="font-mono text-[0.8125rem] text-foreground/60">{command}</code>
      <p className="text-sm text-pretty text-foreground/75">{children}</p>
    </li>
  );
}

interface HelperProps {
  name: string;
  command: string;
  description: string;
  usedBy: string[];
}

function Helper({ name, command, description, usedBy }: HelperProps) {
  return (
    <li className="flex flex-col gap-2 rounded-sm border border-foreground/10 bg-white/70 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-base leading-[1.35] font-semibold">{name}</span>
        <code className="font-mono text-[0.8125rem] text-foreground/60">{command}</code>
      </div>
      <p className="text-sm text-pretty text-foreground/75">{description}</p>
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-[0.8125rem] font-medium text-foreground/60">Used by</span>
        <ul className="flex flex-wrap gap-1.5">
          {usedBy.map((user) => (
            <li
              key={user}
              className="rounded-full border border-foreground/10 bg-white/70 px-2.5 py-0.5 text-[0.8125rem] font-medium"
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function FlowLabel({ children }: { children: ReactNode }) {
  return <p className="text-[0.8125rem] font-medium text-foreground/60">{children}</p>;
}

// The same map as the interactive flow, without state. It shows while the interactive
// flow loads, and stays if that flow cannot load.
function StaticFlow() {
  return (
    <div className="flex flex-col gap-5 rounded-sm border border-foreground/10 bg-white/40 p-4 sm:p-6">
      <div className="flex flex-col gap-3">
        <FlowLabel>1. You ask for something</FlowLabel>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FlowStep tone="bg-card-sage" name="Schedule" command="/chief-os-schedule">
            Sets the two daily times, then starts the daily brief for you at each one.
          </FlowStep>
          <FlowStep tone="bg-card-lemon" name="Daily brief" command="/chief-os-brief">
            Reads your work, updates your tasks, and builds your briefing.
          </FlowStep>
          <FlowStep tone="bg-card-lilac" name="Meeting minutes" command="/chief-os-visual-minutes">
            Turns one meeting into a single illustrated page.
          </FlowStep>
          <FlowStep tone="bg-card-blush" name="Deck builder" command="/chief-os-powerpoint">
            Turns your notes into an editable presentation.
          </FlowStep>
        </ul>
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-sm text-foreground/75">
        <span aria-hidden="true">&darr;</span>
        Each one asks the helpers below for what it needs
        <span aria-hidden="true">&darr;</span>
      </p>

      <div className="flex flex-col gap-3">
        <FlowLabel>2. Shared helpers do the rest</FlowLabel>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Helper
            name="Picture maker"
            command="/chief-os-image-prompt"
            description="Describes every illustration, in the style you choose."
            usedBy={["Daily brief", "Meeting minutes", "Deck builder"]}
          />
          <Helper
            name="Motion"
            command="/chief-os-motion"
            description="Keeps every animation calm and in the same style."
            usedBy={["Daily brief app", "Deck builder"]}
          />
          <Helper
            name="Look and wording"
            command="/chief-os-design"
            description="Sets the colours, the cards, and how everything is worded."
            usedBy={["Everything above"]}
          />
        </ul>
      </div>
    </div>
  );
}

export { StaticFlow };
