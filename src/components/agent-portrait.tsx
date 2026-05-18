import { useState } from "react";
import { findAgent, type Agent, type AgentId } from "@/lib/agents";

type Size = "md" | "lg" | "xl" | "hero";

const SIZE_PX: Record<Size, number> = {
  md: 120,
  lg: 180,
  xl: 240,
  hero: 320,
};

type Props = {
  agentId?: AgentId;
  agent?: Agent | null;
  name?: string;
  size?: Size;
  /** Ambient orbit rings + glow + signal line. */
  ambient?: boolean;
  className?: string;
};

/**
 * AgentPortrait — large editorial portrait with ambient hover animation.
 * Pure CSS animations; respects prefers-reduced-motion via globals in styles.css.
 */
export function AgentPortrait({
  agentId,
  agent,
  name,
  size = "xl",
  ambient = true,
  className = "",
}: Props) {
  const resolved = agent ?? findAgent(name ?? agentId);
  const [errored, setErrored] = useState(false);
  const px = SIZE_PX[size];

  if (!resolved) {
    return (
      <div
        aria-hidden
        className={`rounded-full bg-parchment-deep ${className}`}
        style={{ width: px, height: px }}
      />
    );
  }

  const accent = resolved.accent;

  return (
    <div
      className={`group relative inline-block ${className}`}
      style={{ width: px, height: px }}
    >
      {ambient && (
        <>
          {/* soft glow */}
          <div
            aria-hidden
            className="agent-portrait-glow pointer-events-none absolute inset-0 rounded-full opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
            }}
          />
          {/* outer signal ring */}
          <div
            aria-hidden
            className="agent-portrait-ring-slow pointer-events-none absolute inset-1 rounded-full border border-dashed border-ink/15"
          />
          {/* inner ring */}
          <div
            aria-hidden
            className="agent-portrait-ring-reverse pointer-events-none absolute inset-4 rounded-full border border-ink/10"
          />
        </>
      )}

      {/* portrait */}
      <div
        className="absolute overflow-hidden rounded-full ring-1 ring-ink/10 shadow-soft transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
        style={ambient ? { inset: Math.round(px * 0.08) } : { inset: 0 }}
      >
        {errored ? (
          <div
            className="grid h-full w-full place-items-center font-display text-3xl text-parchment"
            style={{ backgroundColor: accent }}
          >
            {resolved.name.charAt(0)}
          </div>
        ) : (
          <img
            src={resolved.avatar}
            alt={resolved.alt}
            width={px}
            height={px}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
