export type NullableText = string | null;

export type ActionCategory = "Important" | "Actionable" | "Waiting";

export type MessageItemBase<Source extends string, Label extends string> = {
  source: Source;
  sourceLabel: Label;
  timestamp: string;
  authorName: NullableText;
  authorRole: NullableText;
  subject: string;
  summary: string;
  url: NullableText;
  recommendedAction: NullableText;
};

export interface MessageIdentityProps {
  imageUrl?: NullableText;
  label: string;
  secondaryLabel?: NullableText;
  fallbackLabel?: string;
}

export interface MessageItemHeaderProps {
  identity: React.ReactNode;
  metadata?: NullableText;
}

export interface MessageItemBodyProps {
  title: string;
  description: string;
}

export interface MessageActionFooterProps {
  label?: string;
  action: string;
  metadata?: NullableText;
}

export interface MessageOpenLinkProps {
  url: NullableText;
  label: string;
}

export interface MessageGroupProps {
  title: string;
  count: number;
  itemName: string;
  children: React.ReactNode;
}

export const hasText = (value: NullableText | undefined): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isTemplatePlaceholder = (value: NullableText | undefined) => {
  return hasText(value) && /^\[% .+ %\]$/.test(value.trim());
};

export const getAbsoluteHttpUrl = (value: NullableText) => {
  if (!hasText(value)) {
    return null;
  }

  const trimmedValue = value.trim();

  if (isTemplatePlaceholder(trimmedValue)) {
    return trimmedValue;
  }

  try {
    const parsedUrl = new URL(trimmedValue);

    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.href;
    }
  } catch {
    return null;
  }

  return null;
};

export const getInitials = (value: string) => {
  if (isTemplatePlaceholder(value)) {
    return "";
  }

  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};
