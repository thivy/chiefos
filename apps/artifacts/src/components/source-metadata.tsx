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

export { SourceMetadata, SourceMetadataIcon, SourceMetadataLabel, SourceMetadataTimestamp };
