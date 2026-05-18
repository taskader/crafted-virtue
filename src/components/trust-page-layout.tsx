import { Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";

export type TrustSection = {
  number?: number;
  title: string;
  copy?: string;
  bullets?: string[];
  callout?: string;
  cards?: { title: string; body?: string }[];
};

export function TrustPageLayout({
  eyebrow,
  title,
  summary,
  lastUpdated,
  sections,
  legalNote,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: TrustSection[];
  legalNote?: string;
}) {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-12">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-3 font-display text-5xl text-balance leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed">{summary}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-ink-soft">{lastUpdated}</p>
        {legalNote && (
          <div className="mt-6 rounded-xl border border-border/70 bg-parchment-deep/60 px-5 py-4 text-sm text-ink-soft">
            {legalNote}
          </div>
        )}
      </article>

      <div className="mx-auto max-w-3xl px-6 pb-24 space-y-12">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl tracking-tight">
              {s.number !== undefined && (
                <span className="mr-3 text-ink-soft tabular-nums">{s.number}.</span>
              )}
              {s.title}
            </h2>
            {s.copy && (
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.copy}</p>
            )}
            {s.bullets && (
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.callout && (
              <div className="mt-4 rounded-xl border-l-2 border-brass bg-parchment-deep/70 px-5 py-4 font-display text-lg text-ink">
                {s.callout}
              </div>
            )}
            {s.cards && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {s.cards.map((c, j) => (
                  <Card key={j} className="p-5">
                    <h3 className="font-display text-base tracking-tight">{c.title}</h3>
                    {c.body && <p className="mt-2 text-sm text-ink-soft leading-relaxed">{c.body}</p>}
                  </Card>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mx-auto mb-24 max-w-3xl px-6">
        <div className="rounded-2xl border border-border/70 bg-parchment-deep/70 p-8 md:p-10">
          <p className="font-display text-2xl text-balance tracking-tight">
            Questions about how Crafted Virtue handles trust, data, or AI?
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/report"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:-translate-y-0.5 transition-transform"
            >
              Contact Us
            </Link>
            <Link
              to="/ai-ethics"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
            >
              Read AI &amp; Ethics
            </Link>
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}
