import { type ContentStatus } from "@/lib/mock-data";

const TONES: Record<ContentStatus, string> = {
  "draft": "bg-muted text-ink-soft",
  "QA reviewed": "bg-accent text-ink",
  "awaiting approval": "bg-warning/20 text-ink",
  "approved": "bg-success/15 text-ink",
  "scheduled": "bg-primary/12 text-primary",
  "published": "bg-ink text-parchment",
  "analyzed": "bg-brass/20 text-ink",
};

export function StatusPill({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${TONES[status]}`}>
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
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {delta && (
        <p className={`mt-1 text-xs ${tone === "down" ? "text-destructive" : "text-success"}`}>{delta}</p>
      )}
    </Card>
  );
}
