import { cn } from "cnfast";
import type { ComponentProps } from "react";

import { Text } from "./text";

function Avatar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "relative flex size-9 shrink-0 overflow-hidden rounded-full bg-amber-50",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: ComponentProps<"img">) {
  return (
    <img
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  );
}

function AvatarAuthor({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="avatar-author" className={cn("flex flex-col", className)} {...props} />;
}

function AvatarAuthorName({ className, ...props }: ComponentProps<"h2">) {
  return (
    <Text
      as="h2"
      variant="display-xs"
      data-slot="avatar-author-name"
      className={className}
      {...props}
    />
  );
}

function AvatarAuthorRole({ className, ...props }: ComponentProps<"p">) {
  return (
    <Text
      as="p"
      variant="caption"
      data-slot="avatar-author-role"
      className={className}
      {...props}
    />
  );
}

export { Avatar, AvatarAuthor, AvatarAuthorName, AvatarAuthorRole, AvatarFallback, AvatarImage };
