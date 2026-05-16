import { useState } from "react";
import { findAgent, type Agent } from "@/lib/agents";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<Size, number> = { xs: 16, sm: 18, md: 24, lg: 36, xl: 56 };

type Props = {
  name?: string;
  agent?: Agent | null;
  size?: Size;
  className?: string;
  ring?: boolean;
};

/**
 * AgentAvatar — circular portrait with initials fallback.
 * Used inside AgentChip (16-18px) and as larger profile image in cards/headers.
 */
export function AgentAvatar({ name, agent, size = "xs", className = "", ring = true }: Props) {
  const resolved = agent ?? findAgent(name);
  const [errored, setErrored] = useState(false);
  const px = SIZE_PX[size];
  const initial = (resolved?.name ?? name ?? "·").charAt(0).toUpperCase();
  const bg = resolved?.accent ?? "var(--ink)";
  const ringClass = ring ? "ring-1 ring-inset ring-border/70" : "";

  if (!resolved || errored) {
    return (
      <span
        aria-hidden={!name}
        aria-label={resolved?.alt ?? name}
        className={`inline-grid shrink-0 place-items-center overflow-hidden rounded-full text-[10px] font-medium text-parchment ${ringClass} ${className}`}
        style={{ width: px, height: px, backgroundColor: bg as string }}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={resolved.avatar}
      alt={resolved.alt}
      loading="lazy"
      width={px}
      height={px}
      onError={() => setErrored(true)}
      className={`inline-block shrink-0 rounded-full object-cover ${ringClass} ${className}`}
      style={{ width: px, height: px }}
    />
  );
}

/** Stacked overlapping cluster of avatars (for the dark onboarding hero card). */
export function AgentAvatarStack({ names, size = "md", max = 5 }: { names: string[]; size?: Size; max?: number }) {
  const px = SIZE_PX[size];
  const shown = names.slice(0, max);
  const overflow = names.length - shown.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {shown.map((n) => (
          <AgentAvatar key={n} name={n} size={size} className="ring-2 ring-ink" />
        ))}
      </div>
      {overflow > 0 && (
        <span
          className="-ml-2 inline-grid place-items-center rounded-full bg-parchment/15 text-[10px] font-medium text-parchment ring-2 ring-ink"
          style={{ width: px, height: px }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
