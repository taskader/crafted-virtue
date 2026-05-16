import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { brand } from "@/data/craftedVirtueData";
import { getRelatedPosts } from "@/data/blogPosts";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/blog/article")({
  head: () => ({
    meta: [
      { title: "The Hidden ROI of Quiet Authority — Crafted Virtue" },
      {
        name: "description",
        content:
          "Why posting once a week can beat shouting daily — and how authority rewards focus, not frequency.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Article,
});

const KPIS = [
  { v: "+312%", l: "Audience Growth", note: "12 months, qualified followers" },
  { v: "4.8×", l: "Lead Quality Improvement", note: "Sales-accepted vs. baseline" },
  { v: "+79%", l: "Inbound Messages", note: "Direct outreach lift" },
];

const NEXT_STEPS = [
  "Focus on quality.",
  "Measure your influence.",
  "Iterate your strategy.",
  "Approve the first content plan.",
];

const DISCOMFORT = [
  "You worry about seeming self-promotional.",
  "You are not sure what content is worth sharing.",
  "You assume nobody is paying attention.",
  "Reframe discomfort as care for substance.",
];

function Article() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-24">
        {/* Header */}
        <Link to="/blog" className="text-xs text-ink-soft hover:text-ink">← Back to insights</Link>
        <p className="mt-6 text-[11px] uppercase tracking-widest text-ink-soft">
          5 min read · Personal Branding · Influence Metrics
        </p>
        <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">
          The Hidden ROI of Quiet Authority
        </h1>
        <p className="mt-4 text-xl text-ink-soft text-balance">
          Why posting once a week can beat shouting daily — and how authority rewards focus.
        </p>

        {/* Hero illustration */}
        <div className="mt-10">
          <Illustration
            name="postQuietAuthority"
            ratio="16/10"
            priority
            alt="The Hidden ROI of Quiet Authority — article hero illustration"
          />
        </div>

        {/* AI Summary */}
        <Card className="mt-10 border-primary/20 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <SectionLabel>AI-generated summary</SectionLabel>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Quiet authority compounds when expertise is translated into consistent, high-signal content.
            This article explains why strategic consistency beats volume, how influence velocity grows
            over time, and how leaders can build credibility without chasing virality.
          </p>
        </Card>

        {/* Sections */}
        <section className="mt-12">
          <h2 className="font-display text-3xl">Why Loud ≠ Impactful</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            High-volume posting dilutes signal. When every channel asks for daily output, executives
            either burn out or default to commodity content. The market remembers the post that
            reframed its thinking — not the one that arrived on schedule. Strategic consistency builds
            trust because it is rare; cadence without conviction is a feed, not authority.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Authority Compounds Over Time</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Meaningful posts accumulate engagement, memory, and reputation. Each one earns a small but
            durable share of audience attention; the next builds on the surface area of the last.
            Authority is not a campaign — it is an asset. Influence velocity grows quietly until the
            day inbound replaces outbound.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-3xl">Why Personal Branding Feels Uncomfortable</h2>
          <ul className="mt-5 space-y-3">
            {DISCOMFORT.map((d) => (
              <li key={d} className="flex items-start gap-3 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* KPI Cards */}
        <section className="mt-12">
          <h2 className="font-display text-3xl">ROI Breakdown</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Composite data from Crafted Virtue customer cohorts, trailing 12 months.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {KPIS.map((k) => (
              <Card key={k.l} className="p-6">
                <p className="font-display text-3xl text-ink">{k.v}</p>
                <p className="mt-1 text-sm font-medium">{k.l}</p>
                <p className="mt-1 text-xs text-ink-soft">{k.note}</p>
                <span className="mt-3 inline-flex items-center rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-ink">
                  [Citation]
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* Final Section */}
        <section className="mt-12">
          <h2 className="font-display text-3xl">From Quiet to Compounding</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            The shift isn't louder — it's tighter. Pick the pillars that match your judgement, publish
            the pieces only you can write, and let the system measure what's moving. Here's where to
            start:
          </p>
          <ol className="mt-5 space-y-2">
            {NEXT_STEPS.map((n, i) => (
              <li key={n} className="flex items-start gap-3">
                <span className="font-display text-lg text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Related posts */}
        <section className="mt-16 border-t border-border/60 pt-10">
          <SectionLabel>Continue reading</SectionLabel>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {getRelatedPosts("hidden-roi-of-quiet-authority", 3).map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="block"
              >
                <Card className="flex h-full flex-col overflow-hidden p-0 transition-shadow hover:shadow-lift">
                  <Illustration
                    name={r.illustration}
                    ratio="4/3"
                    className="rounded-none ring-0"
                    alt={`${r.title} — related article thumbnail`}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] uppercase tracking-widest text-ink-soft">
                      {r.read} · {r.category}
                    </p>
                    <h3 className="mt-2 font-display text-base">{r.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Card className="mt-14 p-8 text-center">
          <h3 className="font-display text-2xl text-balance">Start Your 7-Day Free Trial</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Build the first content plan with your personal Crafted Virtue agent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment"
            >
              Start Free Trial
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              {brand.primaryCTA}
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </article>
    </MarketingShell>
  );
}
