/**
 * FeatureIcon — calm editorial icon system for Crafted Virtue feature cards.
 *
 * Hand-built inline SVGs in the warm ivory / charcoal / muted blue / soft gold
 * palette. Used on /platform, homepage solution cards, and pricing unlock cards
 * in place of the old initials badges.
 *
 * Container: ~48px rounded badge with parchment-deep background + ring.
 * Stroke: ink at 1.4–1.6, blue (primary) and gold (brass) used as restrained
 * accents only.
 */
import type { ReactElement, SVGProps } from "react";

export type FeatureIconName =
  | "brandStudio"
  | "contentEngine"
  | "truthFilter"
  | "approvalWorkflow"
  | "publishingCalendar"
  | "analyticsBriefing"
  | "podcastStudio"
  | "videoStudio"
  | "presenceHub"
  | "authorityManuscript"
  | "revenueEngine"
  | "partnerAmplifier";

const C = {
  ink: "var(--ink)",
  soft: "color-mix(in oklab, var(--ink) 55%, transparent)",
  blue: "var(--primary)",
  gold: "var(--brass)",
  paper: "var(--parchment)",
} as const;

type SvgProps = SVGProps<SVGSVGElement>;

function Base({ children, ...rest }: SvgProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={C.ink}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

const ICONS: Record<FeatureIconName, (p: SvgProps) => ReactElement> = {
  // Profile card + calibration dial + small Brand Score arc
  brandStudio: (p) => (
    <Base {...p}>
      <rect x="4" y="6" width="15" height="20" rx="2" fill={C.paper} />
      <circle cx="11.5" cy="12.5" r="2.4" />
      <path d="M7 18.5h9M7 21h6" stroke={C.soft} />
      <circle cx="24" cy="20" r="4.5" />
      <path d="M24 20l2.6-2" stroke={C.blue} strokeWidth={1.6} />
      <path d="M20.8 16.6a4.5 4.5 0 016.4 0" stroke={C.gold} strokeWidth={1.6} fill="none" />
    </Base>
  ),
  // Stacked content cards + writing line becoming signal
  contentEngine: (p) => (
    <Base {...p}>
      <rect x="5" y="9" width="14" height="16" rx="2" fill={C.paper} />
      <rect x="8" y="6" width="14" height="16" rx="2" fill={C.paper} />
      <path d="M11 11h8M11 14h6M11 17h7" stroke={C.soft} />
      <path d="M22 22c2 0 3.5-1.4 3.5-3.2 0-1.4-1-2.2-2-2.6" stroke={C.blue} strokeWidth={1.6} />
      <circle cx="26" cy="14" r="0.9" fill={C.gold} stroke="none" />
    </Base>
  ),
  // Citation chip + check + magnifying glass over a claim
  truthFilter: (p) => (
    <Base {...p}>
      <rect x="4" y="7" width="17" height="13" rx="2" fill={C.paper} />
      <path d="M7 11h11M7 14h8" stroke={C.soft} />
      <rect x="14.5" y="16.5" width="5" height="2.4" rx="1.2" fill={C.blue} stroke="none" />
      <circle cx="22" cy="20" r="4" />
      <path d="M25 23l3 3" />
      <path d="M20.3 20l1.4 1.4 2.5-2.6" stroke={C.gold} strokeWidth={1.6} />
    </Base>
  ),
  // Content card moving through approval check (review loop)
  approvalWorkflow: (p) => (
    <Base {...p}>
      <rect x="4" y="8" width="13" height="14" rx="2" fill={C.paper} />
      <path d="M7 12h7M7 15h5" stroke={C.soft} />
      <path d="M17 11c3 0 5.5 2.2 5.5 5.2 0 1.6-.7 3-1.8 4" stroke={C.blue} />
      <path d="M21 18.5l-.3 2.2 2.1-.5" stroke={C.blue} />
      <circle cx="25" cy="12" r="3.5" fill={C.paper} />
      <path d="M23.4 12.2l1.1 1.1 2-2.2" stroke={C.gold} strokeWidth={1.6} />
    </Base>
  ),
  // Weekly calendar grid + scheduled card + channel nodes
  publishingCalendar: (p) => (
    <Base {...p}>
      <rect x="4" y="7" width="17" height="16" rx="2" fill={C.paper} />
      <path d="M4 12h17M9 7v-2M16 7v-2" />
      <path d="M9 16h2M13 16h2M9 19h2" stroke={C.soft} />
      <rect x="14.5" y="18" width="5" height="3" rx="0.8" fill={C.blue} stroke="none" />
      <circle cx="25" cy="11" r="1.2" fill={C.gold} stroke="none" />
      <circle cx="27" cy="17" r="1.2" />
      <circle cx="24" cy="22" r="1.2" />
      <path d="M21 11.5l3 .2M21 18l3 3" stroke={C.soft} />
    </Base>
  ),
  // Brand Score chart + rising line + briefing card
  analyticsBriefing: (p) => (
    <Base {...p}>
      <rect x="3" y="6" width="17" height="14" rx="2" fill={C.paper} />
      <path d="M6 16l3-3 3 2 5-5" stroke={C.blue} strokeWidth={1.6} />
      <circle cx="17" cy="10" r="1.1" fill={C.gold} stroke="none" />
      <path d="M6 19h11" stroke={C.soft} />
      <rect x="14" y="20" width="14" height="8" rx="1.5" fill={C.paper} />
      <path d="M16.5 23h9M16.5 25.5h6" stroke={C.soft} />
    </Base>
  ),
  // Microphone + script card + soft waveform
  podcastStudio: (p) => (
    <Base {...p}>
      <rect x="4" y="7" width="11" height="15" rx="1.6" fill={C.paper} />
      <path d="M6.5 11h6M6.5 14h5M6.5 17h6" stroke={C.soft} />
      <rect x="18" y="6" width="5" height="11" rx="2.5" fill={C.paper} />
      <path d="M16 13c0 3 1.8 5.2 4.5 5.2S25 16 25 13" stroke={C.blue} />
      <path d="M20.5 18.2v3" />
      <path d="M3 25c2-2 4 2 6 0s4-2 6 0 4 2 6 0 4-2 6 0" stroke={C.gold} strokeWidth={1.2} fill="none" />
    </Base>
  ),
  // Video frame + timeline strip + audio waveform
  videoStudio: (p) => (
    <Base {...p}>
      <rect x="3" y="6" width="20" height="12" rx="1.8" fill={C.paper} />
      <path d="M12 9.5l5 2.5-5 2.5z" fill={C.blue} stroke={C.blue} />
      <rect x="3" y="20" width="26" height="5" rx="1" fill={C.paper} />
      <path d="M6 22.5h3M11 22.5h2M15 22.5h4M21 22.5h3" stroke={C.soft} />
      <path d="M25 8v8M27 10v4M29 11.5v1" stroke={C.gold} strokeWidth={1.4} />
    </Base>
  ),
  // Personal website + content cards + authority signal
  presenceHub: (p) => (
    <Base {...p}>
      <rect x="3" y="6" width="22" height="18" rx="2" fill={C.paper} />
      <path d="M3 11h22" />
      <circle cx="6" cy="8.5" r="0.6" fill={C.soft} stroke="none" />
      <circle cx="8" cy="8.5" r="0.6" fill={C.soft} stroke="none" />
      <rect x="6" y="13.5" width="7" height="8" rx="1" fill={C.blue} stroke={C.blue} opacity={0.85} />
      <rect x="15" y="13.5" width="7" height="3.5" rx="1" />
      <rect x="15" y="18" width="7" height="3.5" rx="1" />
      <path d="M26 14v-3M28 14v-5M30 14v-7" stroke={C.gold} strokeWidth={1.4} />
    </Base>
  ),
  // Manuscript + chapter cards + citation tabs
  authorityManuscript: (p) => (
    <Base {...p}>
      <path d="M5 7c4-1 7-1 11 .5v17C12 23 9 23 5 24z" fill={C.paper} />
      <path d="M27 7c-4-1-7-1-11 .5v17c4-1.5 7-1.5 11-.5z" fill={C.paper} />
      <path d="M16 7.5v17" />
      <path d="M8 11h5M8 14h5M19 11h5M19 14h4" stroke={C.soft} />
      <rect x="22" y="16.5" width="3" height="1.6" fill={C.gold} stroke="none" />
      <rect x="22" y="19" width="3" height="1.6" fill={C.blue} stroke="none" />
    </Base>
  ),
  // Lead magnet + email sequence + growth path
  revenueEngine: (p) => (
    <Base {...p}>
      <rect x="3" y="5" width="11" height="14" rx="1.6" fill={C.paper} />
      <path d="M5.5 9h6M5.5 12h5M5.5 15h6" stroke={C.soft} />
      <rect x="16" y="7" width="11" height="6" rx="1.2" fill={C.paper} />
      <path d="M16 8l5.5 4 5.5-4" />
      <rect x="16" y="15" width="11" height="6" rx="1.2" fill={C.paper} />
      <path d="M16 16l5.5 4 5.5-4" />
      <path d="M5 24c5 0 8-2 12-2s8 2 12-2" stroke={C.blue} strokeWidth={1.6} fill="none" />
      <path d="M27 19l2 1-1 2" stroke={C.gold} strokeWidth={1.4} />
    </Base>
  ),
  // Executive signal radiating into PR / podcast / speaking / partnership nodes
  partnerAmplifier: (p) => (
    <Base {...p}>
      <circle cx="16" cy="16" r="3" fill={C.blue} stroke={C.blue} />
      <circle cx="16" cy="16" r="6" stroke={C.soft} />
      <circle cx="6" cy="7" r="2" fill={C.paper} />
      <circle cx="26" cy="7" r="2" fill={C.paper} />
      <circle cx="6" cy="25" r="2" fill={C.paper} />
      <circle cx="26" cy="25" r="2" fill={C.paper} />
      <path d="M14 14L8 8.5M18 14l6-5.5M14 18l-6 5.5M18 18l6 5.5" stroke={C.soft} />
      <circle cx="26" cy="7" r="0.8" fill={C.gold} stroke="none" />
    </Base>
  ),
};

const SIZE_CLASS = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

type Size = keyof typeof SIZE_CLASS;

type Props = {
  name: FeatureIconName;
  label?: string;
  size?: Size;
  className?: string;
};

/**
 * Bordered editorial badge wrapping the inline SVG.
 * Pass `label` to expose the feature name to assistive tech; omit for purely
 * decorative use (the inner SVG is already aria-hidden).
 */
export function FeatureIcon({ name, label, size = "md", className = "" }: Props) {
  const Svg = ICONS[name];
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-grid shrink-0 place-items-center rounded-2xl bg-parchment-deep ring-1 ring-inset ring-border/70 ${SIZE_CLASS[size]} ${className}`}
    >
      <Svg className="h-[64%] w-[64%]" />
    </span>
  );
}
