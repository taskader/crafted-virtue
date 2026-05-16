import { type ContentStatus } from "@/lib/mock-data";
import { Link } from "@tanstack/react-router";

const TONES: Record<ContentStatus, string> = {
  "draft": "bg-muted text-ink-soft ring-border/60",
  "QA reviewed": "bg-accent text-ink ring-primary/15",
  "awaiting approval": "bg-warning/15 text-ink ring-warning/40",
  "approved": "bg-success/15 text-ink ring-success/35",
  "scheduled": "bg-primary/12 text-primary ring-primary/25",
  "published": "bg-ink text-parchment ring-ink",
  "analyzed": "bg-brass/20 text-ink ring-brass/35",
};

export function StatusPill({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] ring-1 ring-inset ${TONES[status]}`}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/70 bg-card shadow-soft ${className}`}>{children}</div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">{children}</p>;
}

export function Stat({ label, value, delta, tone = "default" }: { label: string; value: string; delta?: string; tone?: "default" | "up" | "down" }) {
  return (
    <Card className="p-5">
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-2 font-display text-3xl text-ink tracking-tight">{value}</p>
      {delta && (
        <p className={`mt-1 text-xs ${tone === "down" ? "text-destructive" : "text-success"}`}>{delta}</p>
      )}
    </Card>
  );
}

// --- Platform badge -----------------------------------------------------
const PLATFORM_STYLE: Record<string, { dot: string; ring: string }> = {
  LinkedIn:   { dot: "bg-[oklch(0.45_0.12_245)]", ring: "ring-[oklch(0.45_0.12_245)]/30" },
  X:          { dot: "bg-ink",                     ring: "ring-ink/30" },
  Newsletter: { dot: "bg-brass",                   ring: "ring-brass/35" },
  Blog:       { dot: "bg-[oklch(0.55_0.13_25)]",   ring: "ring-[oklch(0.55_0.13_25)]/30" },
  Instagram:  { dot: "bg-[oklch(0.6_0.18_15)]",    ring: "ring-[oklch(0.6_0.18_15)]/30" },
  YouTube:    { dot: "bg-destructive",             ring: "ring-destructive/30" },
  Facebook:   { dot: "bg-[oklch(0.5_0.14_255)]",   ring: "ring-[oklch(0.5_0.14_255)]/30" },
  TikTok:     { dot: "bg-ink",                     ring: "ring-ink/30" },
};

export function PlatformBadge({ name }: { name: string }) {
  const s = PLATFORM_STYLE[name] ?? { dot: "bg-ink-soft", ring: "ring-border" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-0.5 text-[11px] font-medium text-ink ring-1 ring-inset ${s.ring}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {name}
    </span>
  );
}

// --- Agent activity chip -----------------------------------------------
export function AgentChip({ name, role, action }: { name: string; role?: string; action?: string }) {
  const initial = name.charAt(0);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] text-ink">
      <span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] font-medium text-parchment">{initial}</span>
      <span className="font-medium">{name}</span>
      {role && <span className="text-ink-soft">· {role}</span>}
      {action && <span className="text-ink-soft">· {action}</span>}
    </span>
  );
}

// --- Citation chip -----------------------------------------------------
export function CitationChip({ source, year }: { source: string; year?: string | number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-accent/60 px-1.5 py-0.5 text-[10.5px] font-medium text-ink ring-1 ring-inset ring-primary/15">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className="opacity-70"><path d="M6 4h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2"/></svg>
      {source}{year ? ` · ${year}` : ""}
    </span>
  );
}

// --- Empty state -------------------------------------------------------
export function EmptyState({
  title,
  description,
  action,
  to,
}: {
  title: string;
  description?: string;
  action?: string;
  to?: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div className="grid size-12 place-items-center rounded-full bg-accent/60 text-ink">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </div>
      <div>
        <p className="font-display text-lg text-ink tracking-tight">{title}</p>
        {description && <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">{description}</p>}
      </div>
      {action && to && (
        <Link to={to} className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-parchment hover:bg-ink/90 transition">
          {action}
        </Link>
      )}
    </Card>
  );
}

// --- Loading skeleton --------------------------------------------------
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted/70 ${className}`} />;
}

export function LoadingRows({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Button hierarchy --------------------------------------------------
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md";
};
export function Btn({ variant = "primary", size = "md", className = "", ...rest }: BtnProps) {
  const sizes = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const variants = {
    primary: "bg-ink text-parchment hover:bg-ink/90",
    secondary: "bg-card text-ink ring-1 ring-inset ring-border hover:bg-muted",
    ghost: "text-ink hover:bg-muted",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  }[variant];
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition ${sizes} ${variants} ${className}`}
    />
  );
}

// --- Trust line --------------------------------------------------------
export function TrustLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-parchment-deep/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
      <span className="size-1.5 rounded-full bg-success" />
      {children}
    </p>
  );
}
