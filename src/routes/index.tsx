import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { SPECIALISTS, BLOG_POSTS } from "@/lib/mock-data";
import { ArrowRight, Quote, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crafted Virtue — Turn Quiet Expertise into Market-Moving Authority" },
      { name: "description", content: "AI-first executive personal branding and thought-leadership OS. Earn trust at scale and compound it into opportunity." },
      { property: "og:title", content: "Crafted Virtue" },
      { property: "og:description", content: "Turn Quiet Expertise into Market-Moving Authority." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pt-32">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">An operating system for executive thought leadership</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-balance text-ink md:text-7xl">
            Turn quiet expertise into <em className="not-italic text-primary">market-moving</em> authority.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft md:text-xl">
            You're not chasing virality. You're converting insight into lasting advantage — earning trust at scale and compounding it into opportunity.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/report" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-lift transition-transform hover:-translate-y-0.5">
              Run my Impact Analysis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-sm font-medium text-ink hover:border-ink/30">
              Start your 7-day free trial
            </Link>
            <span className="ml-2 text-xs text-ink-soft">No credit card. Nothing publishes until you approve it.</span>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              { k: "Brand Score", v: "82", c: "+11 since onboarding" },
              { k: "Influence Delta", v: "+24%", c: "Quarter-over-quarter" },
              { k: "Approval-to-publish", v: "< 3 min", c: "Median this month" },
            ].map((s) => (
              <Card key={s.k} className="p-6">
                <SectionLabel>{s.k}</SectionLabel>
                <p className="mt-2 font-display text-4xl">{s.v}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.c}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-border/60 bg-parchment-deep py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-sm uppercase tracking-widest text-ink-soft">
          <span className="font-display text-base">Hartwell Group</span>
          <span className="font-display text-base">Northwind &amp; Co.</span>
          <span className="font-display text-base">Avalon Capital</span>
          <span className="font-display text-base">Meridian Health</span>
          <span className="font-display text-base">Foundry Partners</span>
          <span className="font-display text-base">Quillwright</span>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">An editorial studio, on retainer, run by your agent.</h2>
            <p className="mt-4 text-ink-soft">
              One personal agent learns the way you think. Behind the scenes, a coordinated team of specialists handles strategy, voice, research, editing, design, distribution, compliance, and analytics — so the work shows up at the standard you'd otherwise have to produce yourself.
            </p>
            <Link to="/approach" className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
              See how it works <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SPECIALISTS.map((s) => (
                <Card key={s.id} className="p-4">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-display text-sm text-parchment">{s.name[0]}</div>
                  <p className="mt-3 font-medium">{s.name}</p>
                  <p className="text-xs text-ink-soft">{s.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-parchment-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>The platform</SectionLabel>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-balance">From the first interview to the post that gets quoted in a board meeting.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: "Voice that's unmistakably yours", b: "We model the cadence, references, and convictions that make your point of view recognizable in a feed of noise." },
              { t: "Workflow you actually trust", b: "Draft → QA → approval → publish → analyze. Nothing leaves your account until you sign off." },
              { t: "Distribution that compounds", b: "LinkedIn, X, Newsletter, Blog, Instagram, and beyond — published in the windows your audience actually reads." },
            ].map((p) => (
              <Card key={p.t} className="p-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-xl">{p.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Quote className="h-8 w-8 text-primary" />
        <p className="mt-6 font-display text-3xl leading-snug text-balance md:text-4xl">
          "We replaced a fragmented agency stack with one operator and a coherent voice. Inbound from the right people roughly tripled in two quarters."
        </p>
        <p className="mt-6 text-sm text-ink-soft">— Maren Okafor, CEO, Northwind &amp; Co.</p>
      </section>

      {/* Trust */}
      <section className="border-y border-border/60 bg-parchment-deep py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="font-display text-2xl">Nothing publishes until you approve it.</p>
          </div>
          <p className="max-w-md text-sm text-ink-soft">Approval workflows, brand rules, and compliance review are first-class — not afterthoughts.</p>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>From the journal</SectionLabel>
            <h2 className="mt-3 font-display text-4xl">Field notes on quiet authority</h2>
          </div>
          <Link to="/blog" className="text-sm text-primary hover:underline">All writing →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {BLOG_POSTS.slice(0, 2).map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}>
              <Card className="h-full p-6 transition-shadow hover:shadow-lift">
                <p className="text-xs uppercase tracking-widest text-ink-soft">{p.date} · {p.read}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.excerpt}</p>
                <p className="mt-4 text-xs text-ink-soft">By {p.author}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Card className="overflow-hidden bg-ink p-12 text-parchment">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">Begin where every serious operator begins — with the data.</h2>
            <p className="mt-4 text-parchment/75">Run your Impact Analysis in under four minutes and see exactly where your authority is leaking — and where it's quietly compounding.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/report" className="rounded-full bg-parchment px-6 py-3 text-sm font-medium text-ink hover:bg-parchment-deep">Run my Impact Analysis</Link>
              <Link to="/signup" className="rounded-full border border-parchment/30 px-6 py-3 text-sm font-medium text-parchment hover:bg-parchment/10">Start free trial</Link>
            </div>
          </div>
        </Card>
      </section>
    </MarketingShell>
  );
}
