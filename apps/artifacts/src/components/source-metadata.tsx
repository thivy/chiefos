import { cn } from "cnfast";
import type { ComponentProps } from "react";

import { Text } from "./text";

function SourceMetadata({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="source-metadata"
      className={cn("flex flex-1 items-center gap-1.5", className)}
      {...props}
    />
  );
}

function SourceMetadataIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="source-metadata-icon"
      className={cn("opacity-60 [&_svg]:size-4", className)}
      {...props}
    />
  );
}

function SourceMetadataLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <Text
      as="p"
      variant="caption"
      data-slot="source-metadata-label"
      className={className}
      {...props}
    />
  );
}

function SourceMetadataCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      data-slot="source-metadata-code"
      className={cn(
        "font-mono text-[0.8125rem] leading-[1.2] font-medium text-foreground/60",
        className,
      )}
      {...props}
    />
  );
}

function SourceMetadataTimestamp({ className, ...props }: ComponentProps<"p">) {
  return (
    <Text
      as="p"
      variant="caption"
      data-slot="source-metadata-timestamp"
      className={cn("ml-auto", className)}
      {...props}
    />
  );
}

export {
  SourceMetadata,
  SourceMetadataCode,
  SourceMetadataIcon,
  SourceMetadataLabel,
  SourceMetadataTimestamp,
};
