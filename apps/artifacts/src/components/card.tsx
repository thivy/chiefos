import { cn } from "cnfast";
import type { ComponentProps } from "react";

import { LightBulb } from "./icons";
import { SourceMetadata, SourceMetadataIcon, SourceMetadataLabel } from "./source-metadata";
import { Text } from "./text";

const CARD_SECTION_GAP_CLASS = "gap-[clamp(--spacing(4),3vw,--spacing(6))]";

function Card({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative flex break-inside-avoid flex-col rounded-sm border border-foreground/5 px-[clamp(--spacing(4),3vw,--spacing(6))] py-[clamp(--spacing(6),4vw,--spacing(9))] shadow-md",
        CARD_SECTION_GAP_CLASS,
        className,
      )}
      {...props}
    >
      <CardCorner />
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card-header" className={cn("flex items-center gap-1", className)} {...props} />
  );
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto flex items-center gap-1", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <Text as="div" variant="card-title" data-slot="card-title" className={className} {...props} />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-1 flex-col gap-2 text-balance", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center gap-2", className)} {...props} />
  );
}

function CardRecommendedAction({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-recommended-action"
      className={cn("flex flex-col", CARD_SECTION_GAP_CLASS, className)}
      {...props}
    >
      <div className="border-t border-foreground/10" />
      <CardContent>
        <SourceMetadata>
          <SourceMetadataIcon>
            <LightBulb />
          </SourceMetadataIcon>
          <SourceMetadataLabel>Action</SourceMetadataLabel>
        </SourceMetadata>
        <Text as="div" variant="content" className="text-sm">
          {children}
        </Text>
      </CardContent>
    </div>
  );
}

function CardCorner({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-corner"
      className={cn(
        "pointer-events-none absolute top-0 left-0 h-full w-full opacity-40",
        className,
      )}
      {...props}
    >
      <CardCornerShape corner="topLeft" />
      <CardCornerShape corner="bottomLeft" />
      <CardCornerShape corner="topRight" />
      <CardCornerShape corner="bottomRight" />
    </div>
  );
}

type Corners = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

// Position of each CardCornerShape wrapper within its parent.
const CORNER_POSITION_CLASS: Record<Corners, string> = {
  topLeft: "top-2 left-2",
  topRight: "top-2 right-2",
  bottomLeft: "bottom-2 left-2",
  bottomRight: "bottom-2 right-2",
};

// Index (row-major, in the 2x2 dot grid) that should stay hidden for each corner,
// so the 3 remaining dots form an "L" pointing away from that corner.
const HIDDEN_DOT_INDEX: Record<Corners, number> = {
  bottomRight: 0,
  bottomLeft: 1,
  topRight: 2,
  topLeft: 3,
};

function CardCornerShape({ corner }: { corner: Corners }) {
  return (
    <div className={cn("absolute grid grid-cols-2 gap-0.5", CORNER_POSITION_CLASS[corner])}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "size-0.5 rounded-full bg-foreground",
            HIDDEN_DOT_INDEX[corner] === i ? "opacity-0" : "",
          )}
        ></div>
      ))}
    </div>
  );
}

export { Card, CardAction, CardContent, CardFooter, CardHeader, CardRecommendedAction, CardTitle };
