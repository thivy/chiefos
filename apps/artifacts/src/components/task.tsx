import { cn } from "cnfast";
import type { ComponentProps, ReactNode } from "react";

import {
  CalendarIcon,
  CircleCheckIcon,
  CircleIcon,
  MailIcon,
  MessageIcon,
  VideoIcon,
} from "./icons";

type TaskSource = "email" | "chat" | "calendar" | "meeting";

const SOURCE_ICON: Record<TaskSource, typeof CircleIcon> = {
  email: MailIcon,
  chat: MessageIcon,
  calendar: CalendarIcon,
  meeting: VideoIcon,
};

function TaskCheckbox({
  checked,
  source,
  className,
  ...props
}: { checked: boolean; source?: TaskSource } & ComponentProps<"span">) {
  const Icon = checked ? CircleCheckIcon : source ? SOURCE_ICON[source] : CircleIcon;

  return (
    <span
      data-slot="task-checkbox"
      className={cn(
        "shrink-0 rounded-full text-foreground/60 [&_svg]:size-4",
        checked ? "text-foreground/40" : "",
        className,
      )}
      {...props}
    >
      <Icon />
    </span>
  );
}

function TaskLabel({ checked, className, ...props }: { checked: boolean } & ComponentProps<"p">) {
  return (
    <p
      data-slot="task-label"
      className={cn(
        "flex-1 text-sm text-pretty [text-box-edge:cap_alphabetic] [text-box-trim:trim-start]",
        checked ? "line-through opacity-50" : "",
        className,
      )}
      {...props}
    />
  );
}

interface TaskProps extends ComponentProps<"div"> {
  label: ReactNode;
  checked?: boolean;
  source?: TaskSource;
  url?: string | null;
}

function Task({ label, checked = false, source, url, className, ...props }: TaskProps) {
  const task = (
    <div data-slot="task" className={cn("flex items-start gap-2", className)} {...props}>
      <TaskCheckbox checked={checked} source={source} />
      <TaskLabel checked={checked}>{label}</TaskLabel>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-sm text-current no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {task}
      </a>
    );
  }

  return task;
}

export { Task, TaskCheckbox, TaskLabel };
export type { TaskSource };
