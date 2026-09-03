import { cn } from "cnfast";
import type { ComponentProps } from "react";

function ContentContainer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 md:gap-36 lg:px-0",
        className,
      )}
      {...props}
    />
  );
}

function SurfaceContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("bg-surface py-12 sm:py-14 md:py-20", className)} {...props} />;
}

export { ContentContainer, SurfaceContainer };
