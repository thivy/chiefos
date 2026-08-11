import { cn, type ClassValue } from "cnfast";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const BUTTON_VARIANT_CLASS = {
  primary: "border-foreground bg-foreground text-background hover:bg-foreground/85",
  secondary: "border-foreground/15 bg-white/60 text-foreground hover:bg-white",
} as const satisfies Record<string, ClassValue>;

type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASS;

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";

  return (
    <Component
      data-slot="button"
      data-variant={variant}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-sm border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-50",
        BUTTON_VARIANT_CLASS[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
export type { ButtonVariant };
