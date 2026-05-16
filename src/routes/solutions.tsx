import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { agents, brand } from "@/data/craftedVirtueData";
import type { ContentStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "How It Works — Crafted Virtue" },
      {
        name: "description",
        content:
          "Human insight × AI precision. A complete operating system that scales executive influence — benchmark, calibrate, draft, approve, publish, and learn.",
      },
    ],
  }),
  component: Solutions,
});

const BRAND_STUDIO = [
  {
    label: "01 — Benchmark",
    title: "Benchmark your presence",
    body: "We score your digital footprint across reach, recall, and authority — and surface where your judgement is already being noticed.",
  },
  {
    label: "02 — Calibrate",
    title: "Calibrate your voice",
    body: "Workshops with Olivia and Leo distill how you actually think — tone, cadence, taboos — into a living Voice Profile.",
  },
  {
    label: "03 — Guardrail",
    title: "Guardrail your authority",
    body: "Talia codifies the lines you won't cross. Every draft is screened against your voice, claims library, and compliance posture.",
  },
];

const WORKFLOW: { step: string; agent: string }[] = [
  { step: "Insight", agent: "From your inbox, calls, and capture sessions" },
  { step: "Draft", agent: "Leo writes in your voice profile" },
  { step: "Fact Check", agent: "Scout verifies claims and sources" },
  { step: "Voice Review", agent: "Talia screens tone, taboos, compliance" },
  { step: "Approval", agent: "You — or a delegated reviewer — sign off" },
  { step: "Schedule", agent: "Sam queues the right channel, right window" },
  { step: "Analyze", agent: "Sam reports what moved the needle" },
];

const STATUSES: ContentStatus[] = [
  "draft",
  "QA reviewed",
  "awaiting approval",
  "approved",
  "scheduled",
  "published",
  "analyzed",
];

const METRICS = [
  {
    label: "Brand Score",
    value: "72",
    delta: "+11 since onboarding",
    body: "Composite of voice fit, distribution quality, and audience trust signals.",
  },
  {
    label: "Influence Delta™",
    value: "+18",
    delta: "Trailing 30 days",
    body: "Net change in qualified reach across the rooms that matter to you.",
  },
  {
    label: "Content Pillar Performance",
    value: "4 / 5",
    delta: "AI Governance leading",
    body: "How each of your strategic pillars is compounding week over week.",
  },
  {
    label: "Weekly Growth Briefing",
    value: "Mon 7:00",
    delta: "Delivered by Sam",
    body: "A one-page synthesis: what worked, what underperformed, what to publish next.",
  },
  {
    label: "Channel Comparison",
    value: "LinkedIn ×3",
    delta: "vs. X, Newsletter",
    body: "Side-by-side reach, dwell, and reply quality across every connected channel.",
  },
  {
    label: "Recommended Next Actions",
    value: "3 queued",
    delta: "Awaiting your review",
    body: "Sam proposes the next move; Leo has the draft ready when you say go.",
  },
];

const FEATURED_AGENT_IDS = [
  "olivia",
  "leo",
  "sam",
  "talia",
  "vincent",
  "alex",
  "konrad",
  "beatrice",
];

function Solutions() {
  const featuredAgents = FEATURED_AGENT_IDS
    .map((id) => agents.find((a) => a.id === id))
    .filter(Boolean) as typeof agents;

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
        <SectionLabel>How it works</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Human Insight <span className="text-ink-soft">×</span> AI Precision.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          A complete operating system that scales your influence while you work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
          >
            See Live Demo
          </Link>
          <Link
            to="/report"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
          >
            {brand.primaryCTA}
          </Link>
        </div>
      </section>

      {/* 1. Brand Studio */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>Brand Studio</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">Benchmark → Calibrate → Guardrail.</h2>
          <p className="mt-4 text-ink-soft">
            Crafted Virtue scores your digital footprint, identifies your strongest authority opportunities,
            refines your tone and topics, and builds a living Voice Profile that keeps every draft aligned with your
            professional identity.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BRAND_STUDIO.map((s) => (
            <Card key={s.title} className="p-7">
              <SectionLabel>{s.label}</SectionLabel>
              <h3 className="mt-3 font-display text-xl">{s.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 2. Content Engine */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Content Engine</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Generates, edits, cites, schedules. You tap approve.
            </h2>
            <p className="mt-4 text-ink-soft">
              The system turns your expertise into LinkedIn posts, X threads, articles, newsletters, and media
              concepts. Every draft is shaped by your voice profile, strategic objectives, and content pillars.
            </p>
          </div>
          <Card className="mt-10 p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-7">
              {WORKFLOW.map((w, i) => (
                <div key={w.step} className="relative">
                  <div className="rounded-xl border border-border bg-parchment p-4">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-ink-soft">
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-lg">{w.step}</p>
                    <p className="mt-1 text-xs text-ink-soft">{w.agent}</p>
                  </div>
                  {i < WORKFLOW.length - 1 && (
                    <div className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 text-ink-soft/40">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Human-in-the-Loop */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>Human-in-the-loop quality</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">Nothing publishes until you approve it.</h2>
          <p className="mt-4 text-ink-soft">
            Crafted Virtue is built around approval-aware publishing. AI can draft, adapt, cite, and schedule,
            but your content does not go live until the appropriate human approval is captured.
          </p>
        </div>
        <Card className="mt-10 p-7">
          <SectionLabel>Approval states a piece moves through</SectionLabel>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {STATUSES.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <StatusPill status={s} />
                {i < STATUSES.length - 1 && <span className="text-ink-soft/40">→</span>}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-ink-soft">
            Approvals can be solo, delegated, or routed through brand and compliance reviewers for enterprise teams.
            Every transition is logged for audit.
          </p>
        </Card>
      </section>

      {/* 4. Performance Dashboard */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Performance dashboard</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Track Reach Delta, Brand Score, and Influence Delta™.
            </h2>
            <p className="mt-4 text-ink-soft">
              Sam turns raw performance data into strategy: what worked, what underperformed, which content
              pillars are gaining strength, and what to publish next.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {METRICS.map((m) => (
              <Card key={m.label} className="p-6">
                <SectionLabel>{m.label}</SectionLabel>
                <p className="mt-3 font-display text-3xl">{m.value}</p>
                <p className="mt-1 text-xs text-success">{m.delta}</p>
                <p className="mt-4 text-sm text-ink-soft">{m.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Agent Team */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>The agent team</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            One personal agent. A specialist team behind it.
          </h2>
          <p className="mt-4 text-ink-soft">
            Users interact with one personal Crafted Virtue Agent. Behind the scenes, specialist agents support
            onboarding, content, analytics, quality, media, billing, and support.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAgents.map((a) => (
            <Card key={a.id} className="p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-parchment font-display">
                  {a.name[0]}
                </span>
                <div>
                  <p className="font-display text-lg leading-tight">{a.name}</p>
                  <p className="text-[11px] uppercase tracking-widest text-ink-soft">
                    {a.title.replace(/^The\s+/, "")}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-soft">{a.shortMandate}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">
            Your ideas already drive value inside the room. Let them command markets.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/report"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              {brand.primaryCTA}
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              {brand.secondaryCTA}
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>
    </MarketingShell>
  );
}
