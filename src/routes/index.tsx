import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration, IllustrationSpot } from "@/components/illustration";
import { brand } from "@/data/craftedVirtueData";
import {
  ArrowRight, ShieldCheck, Sparkles, BookOpen, BarChart3, CheckCircle2,
  Quote, Bell, Users, Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${brand.name} — Turn Quiet Expertise into Market-Moving Authority` },
      { name: "description", content: brand.shortDescription },
      { property: "og:title", content: `${brand.name} — ${brand.tagline}` },
      { property: "og:description", content: brand.shortDescription },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MarketingShell>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">An operating system for executive thought leadership</p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] text-balance text-ink md:text-6xl lg:text-7xl">
              Turn quiet expertise into <em className="not-italic text-primary">market-moving</em> authority.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft md:text-xl">
              You're not chasing virality. You're converting insight into lasting advantage — earning trust at scale and compounding it into opportunity.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/report" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-lift transition-transform hover:-translate-y-0.5">
                {brand.primaryCTA}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3 text-sm font-medium text-ink hover:border-ink/30">
                {brand.secondaryCTA}
              </Link>
            </div>
            <p className="mt-4 text-xs text-ink-soft">No credit card. {brand.trustLine}</p>
          </div>

          {/* Right-side dashboard mockup */}
          <div className="lg:col-span-5">
            <HeroDashboardMock />
          </div>
        </div>
      </section>

      {/* Trusted-by strip */}
      <section className="border-y border-border/60 bg-parchment-deep py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-sm uppercase tracking-widest text-ink-soft">
          <span className="font-display text-base">Hartwell Group</span>
          <span className="font-display text-base">Meridian BioSystems</span>
          <span className="font-display text-base">Northstar Ventures</span>
          <span className="font-display text-base">Avalon Capital</span>
          <span className="font-display text-base">Foundry Partners</span>
          <span className="font-display text-base">Quillwright</span>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>The problem</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">
              The market rewards the loud, not the brilliant.
            </h2>
          </div>
          <div className="md:col-span-7">
            <Illustration name="problemNoise" ratio="4/3" className="mb-8" />
            <ul className="space-y-5 text-lg">
              {[
                "Your board wonders why a rival's CFO owns LinkedIn's narrative.",
                "Analysts quote competitors — never your insights.",
                "Recruiters scout your talent… for someone else.",
                "Deals close in feeds you do not even read.",
              ].map((b) => (
                <li key={b} className="flex items-start gap-4 border-b border-border/60 pb-5">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-ink-soft">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-2xl leading-snug text-ink">
              Invisibility costs more than time. It costs the future you've earned.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Solution */}
      <section className="bg-parchment-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>The solution</SectionLabel>
          <h2 className="mt-3 max-w-3xl font-display text-4xl text-balance md:text-5xl">
            Authority, engineered.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                illus: "solutionAuthentic" as const,
                title: "Authentic AI, trained on you",
                body: "Captures your tone, preferred structures, vocabulary, and strategic edge — so what publishes is recognizably you, not a flattened average.",
              },
              {
                icon: ShieldCheck,
                illus: "solutionBoard" as const,
                title: "Human-proofed, board-safe",
                body: "Every draft moves through review, citations, voice checks, and approval before publishing. Nothing reaches a feed without your sign-off.",
              },
              {
                icon: BarChart3,
                illus: "solutionCompounding" as const,
                title: "Results in weeks, impact for years",
                body: "Influence velocity, Brand Score, content consistency, and opportunity signals compound over time — measurable from day one.",
              },
            ].map((c) => (
              <Card key={c.title} className="overflow-hidden p-0">
                <IllustrationSpot name={c.illus} className="aspect-[4/3] rounded-none border-b border-border/60" />
                <div className="p-7">
                  <c.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 font-display text-xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Easy as 1-2-3 */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">Easy as 1–2–3.</h2>
        <ol className="mt-14 space-y-10">
          {[
            {
              n: "01",
              t: "Profile & objectives",
              d: "Complete a 10-minute voice and goal intake. Your agent learns the way you think, what you want to be known for, and the audiences worth earning.",
            },
            {
              n: "02",
              t: "Impact Analysis",
              d: "Benchmark your public footprint and receive a data-rich plan — Brand Score baseline, channel-by-channel diagnosis, and a 90-day editorial spine.",
            },
            {
              n: "03",
              t: "Publish & scale",
              d: "Approve your first week of content and automate distribution across LinkedIn, X, newsletter, and blog — through your connected Postiz workspace.",
            },
          ].map((s) => (
            <li key={s.n} className="grid gap-6 border-l border-border/70 pl-8 md:grid-cols-[80px_1fr] md:gap-10 md:border-0 md:pl-0">
              <div className="font-display text-5xl text-primary/70">{s.n}</div>
              <div>
                <h3 className="font-display text-2xl">{s.t}</h3>
                <p className="mt-2 max-w-xl text-ink-soft">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Empathy */}
      <section className="bg-parchment-deep py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Quote className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-6 font-display text-4xl text-balance md:text-5xl">
            Handing over your voice feels risky. We understand.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            That is why Crafted Virtue keeps you in the author's seat — reviewing, approving, and refining every post. The platform liberates your calendar while preserving the nuance colleagues recognize as <em>you</em>.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            {brand.trustLine}
          </p>
        </div>
      </section>

      {/* 6. Authority metrics */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <SectionLabel>Why it matters now</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">
            Executive visibility is now a baseline for credibility.
          </h2>
          <p className="mt-4 text-ink-soft">
            Across boards, buyers, analysts, and candidates, a leader's public footprint is read as a proxy for the institution behind them. The data is consistent.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { v: "3.4×", l: "Faster opportunity flow", d: "Inbound from qualified buyers, boards, and partners when executives publish weekly.", cite: true },
            { v: "62%", l: "More recruiter engagement", d: "Senior candidates research the executive before the company — and decide accordingly.", cite: true },
            { v: "78%", l: "Stronger market trust", d: "Of B2B buyers say a visible executive voice meaningfully shifts vendor preference.", cite: true },
            { v: "5×", l: "Higher content consistency", d: "Versus self-managed publishing — measured across 12-month executive cohorts.", cite: false },
          ].map((m) => (
            <Card key={m.l} className="p-6">
              <p className="font-display text-4xl text-ink">{m.v}</p>
              <p className="mt-2 font-medium text-ink">{m.l}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.d}</p>
              {m.cite && (
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
                  [Citation]
                </span>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Card className="overflow-hidden bg-ink p-12 text-parchment md:p-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Your ideas already drive value inside the room. Let them command markets.
            </h2>
            <p className="mt-5 max-w-2xl text-parchment/75">
              Begin where every serious operator begins — with the data. Run your Impact Analysis in under four minutes and see exactly where your authority is leaking, and where it's quietly compounding.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/report" className="rounded-full bg-parchment px-6 py-3 text-sm font-medium text-ink hover:bg-parchment-deep">
                {brand.primaryCTA}
              </Link>
              <Link to="/signup" className="rounded-full border border-parchment/30 px-6 py-3 text-sm font-medium text-parchment hover:bg-parchment/10">
                {brand.secondaryCTA}
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </MarketingShell>
  );
}

/* -------------------- Hero dashboard mock -------------------- */

function HeroDashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-brass/10 blur-2xl" aria-hidden />
      <Card className="overflow-hidden p-0 shadow-lift">
        {/* Faux window chrome */}
        <div className="flex items-center justify-between border-b border-border/60 bg-parchment-deep px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-ink text-[9px] font-display text-parchment">CV</span>
            <span className="text-xs font-medium">Crafted Virtue · Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell className="h-3.5 w-3.5 text-ink-soft" />
            <span className="text-[10px] text-ink-soft">Tue, 09:14</span>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft">Good morning, Ellis</p>
            <p className="mt-1 font-display text-lg leading-snug">
              4 posts await approval. Influence is compounding.
            </p>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-2 gap-3">
            <ScoreCard label="Brand Score" value="72" delta="+11 since onboarding" />
            <ScoreCard label="Influence Delta" value="+18" delta="Quarter-over-quarter" tone="primary" />
          </div>

          {/* Queue stats */}
          <div className="grid grid-cols-2 gap-3">
            <QueueStat icon={CheckCircle2} value="4" label="Awaiting approval" />
            <QueueStat icon={BookOpen} value="7" label="Scheduled posts" />
          </div>

          {/* Mini reach chart */}
          <div className="rounded-xl border border-border/70 bg-card p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-ink-soft">
              <span>Reach · last 8 weeks</span>
              <span className="text-primary">+24%</span>
            </div>
            <MiniChart />
          </div>

          {/* Agent activity chips */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-ink-soft">Specialist activity</p>
            <ul className="mt-2 space-y-1.5">
              {[
                { a: "Leo", msg: "drafted 5 content ideas." },
                { a: "Talia", msg: "flagged 1 post for stronger evidence." },
                { a: "Sam", msg: "found your strongest pillar this week." },
                { a: "Vincent", msg: "prepared 2 media concepts." },
              ].map((c) => (
                <li key={c.a} className="flex items-center gap-2 rounded-lg border border-border/60 bg-parchment-deep/60 px-2.5 py-1.5 text-[11px]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[9px] font-medium text-parchment">{c.a[0]}</span>
                  <span><strong>{c.a}</strong> <span className="text-ink-soft">{c.msg}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Floating credibility chips */}
      <div className="absolute -left-4 top-1/3 hidden rounded-full border border-border bg-card px-3 py-1.5 text-[10px] shadow-soft md:flex md:items-center md:gap-1.5">
        <Award className="h-3 w-3 text-primary" /> Voice-fit 94%
      </div>
      <div className="absolute -right-4 bottom-10 hidden rounded-full border border-border bg-card px-3 py-1.5 text-[10px] shadow-soft md:flex md:items-center md:gap-1.5">
        <Users className="h-3 w-3 text-primary" /> +1.2k qualified reach
      </div>
    </div>
  );
}

function ScoreCard({ label, value, delta, tone = "default" }: { label: string; value: string; delta: string; tone?: "default" | "primary" }) {
  return (
    <div className={`rounded-xl border p-3 ${tone === "primary" ? "border-primary/30 bg-primary/5" : "border-border/70 bg-card"}`}>
      <p className="text-[10px] uppercase tracking-widest text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
      <p className="mt-0.5 text-[10px] text-ink-soft">{delta}</p>
    </div>
  );
}

function QueueStat({ icon: Icon, value, label }: { icon: typeof CheckCircle2; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink/5 text-ink">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-display text-lg leading-none">{value}</p>
        <p className="mt-0.5 text-[10px] text-ink-soft">{label}</p>
      </div>
    </div>
  );
}

function MiniChart() {
  // Simple inline SVG area chart — purely decorative
  const points = [12, 18, 14, 22, 26, 24, 32, 38];
  const max = Math.max(...points);
  const w = 240;
  const h = 56;
  const step = w / (points.length - 1);
  const coords = points.map((v, i) => [i * step, h - (v / max) * (h - 6) - 2] as const);
  const path = coords.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const fill = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-14 w-full">
      <defs>
        <linearGradient id="heroMini" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#heroMini)" />
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.5" />
    </svg>
  );
}
