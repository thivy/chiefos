import { cn, type ClassValue } from "cnfast";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const TEXT_VARIANT_CLASS = {
  "display-lg": cn(
    "text-[clamp(var(--text-3xl),5vw,var(--text-5xl))] leading-[1.08] font-semibold tracking-tighter text-balance",
  ),
  "display-md": cn(
    "text-[clamp(var(--text-xl),4vw,var(--text-3xl))] leading-[1.1] font-semibold tracking-tight text-balance",
  ),
  "display-sm": cn(
    "text-[clamp(var(--text-lg),3vw,var(--text-xl))] leading-[1.15] font-[550] tracking-tight text-balance",
  ),
  "display-xs": cn(
    "text-[clamp(var(--text-sm),2.5vw,var(--text-sm))] leading-[1.2] font-[550] tracking-normal text-balance",
  ),
  content: cn("text-[clamp(var(--text-base),1.5vw,var(--text-sm))] font-normal"),
  caption: cn(
    "text-[clamp(var(--text-sm),2.5vw,var(--text-sm))] leading-[1.2] font-[550] tracking-normal text-balance text-foreground/60",
  ),
  "card-title": cn(
    "text-[clamp(var(--text-sm),2.5vw,var(--text-sm))] leading-[1.2] font-semibold tracking-normal text-balance text-foreground/70",
  ),
} as const satisfies Record<string, ClassValue>;

type TextVariant = keyof typeof TEXT_VARIANT_CLASS;

const DEFAULT_ELEMENT: Record<TextVariant, ElementType> = {
  "display-lg": "h1",
  "display-md": "h1",
  "display-sm": "h1",
  "display-xs": "span",
  content: "div",
  caption: "p",
  "card-title": "div",
};

type TextProps<T extends ElementType> = {
  variant: TextVariant;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

function Text<T extends ElementType = "span">({ variant, as, className, ...props }: TextProps<T>) {
  const Component = as ?? DEFAULT_ELEMENT[variant];

  return (
    <Component
      data-slot="text"
      data-variant={variant}
      className={cn(TEXT_VARIANT_CLASS[variant], className)}
      {...props}
    />
  );
}

export { Text };
export type { TextVariant };
