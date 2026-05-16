import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — Crafted Virtue" },
      {
        name: "description",
        content:
          "Not just technology. A philosophy. Trust, consistency, and clarity matter more than noise.",
      },
    ],
  }),
  component: Approach,
});

const BELIEFS = [
  { t: "Truth > Virality", d: "We fact-check, cite, and avoid exaggeration." },
  { t: "Process > Pressure", d: "You do not need to hustle. You need to publish with purpose." },
  { t: "Voice > Volume", d: "One excellent post beats twenty forgettable ones." },
  { t: "Compounding > Campaigns", d: "Authority grows post by post, briefing by briefing, insight by insight." },
  { t: "Authority > Noise", d: "The goal is not to become louder. The goal is to become unmistakably credible." },
];

const WHAT_YOU_GET = [
  "Strategy before tactics",
  "Brand-safe content",
  "1:1 guided support",
  "Clear dashboards",
  "Verified facts",
  "Approval workflows",
  "Learning loops",
];

const WHAT_YOU_DONT = [
  "Vanity metrics",
  "Follower obsession",
  "Generic AI copy",
  "Ghostwriting fluff",
  "Performance theater",
  "Unreviewed publishing",
];

const AGENTS = [
  { id: "olivia", name: "Olivia" },
  { id: "leo", name: "Leo" },
  { id: "sam", name: "Sam" },
  { id: "talia", name: "Talia" },
  { id: "vincent", name: "Vincent" },
  { id: "alex", name: "Alex" },
  { id: "konrad", name: "Konrad" },
  { id: "beatrice", name: "Beatrice" },
];

function Approach() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Approach</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Not Just Technology. A Philosophy.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Crafted Virtue is built on a belief: trust, consistency, and clarity matter more than noise.
        </p>
        <div className="mt-8">
          <Link
            to="/report"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
          >
            {brand.primaryCTA}
          </Link>
        </div>
      </section>

      {/* Section 1: Automation with Accountability */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <SectionLabel>Automation with accountability</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              AI does the heavy lifting. You keep the pen.
            </h2>
          </div>
          <div>
            <p className="text-ink-soft">
              Crafted Virtue does the heavy lifting with AI, but keeps the human in the author's seat.
              This is not ghostwriting or cloning. It is intelligent assistance with oversight, memory,
              review, and approval.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "You stay in control.",
                "Your voice remains yours.",
                "Your content is board-safe and verifiable.",
                "Every publish action is approval-aware.",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Beliefs */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Our beliefs</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">What we optimize for.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BELIEFS.map((b) => (
              <Card key={b.t} className="p-7">
                <h3 className="font-display text-xl">{b.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{b.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What You Get / What You Don't */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel>Expectations</SectionLabel>
        <h2 className="mt-3 font-display text-4xl text-balance">What You Get / What You Don't</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card className="p-7">
            <h3 className="font-display text-xl">What you get</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <h3 className="font-display text-xl">What you don't</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {WHAT_YOU_DONT.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ink/30" />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Section 4: AI-First Operating Model */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Operating model</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              The AI-First Operating Model.
            </h2>
            <p className="mt-4 text-ink-soft">
              Crafted Virtue is designed around one personal agent for each user, supported by specialist
              capabilities for onboarding, content, analytics, quality, media, billing, and support. The
              result is a calm interface with a coordinated intelligence layer underneath.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {AGENTS.map((a) => (
              <span
                key={a.id}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-parchment px-4 py-2 text-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-parchment font-display text-xs">
                  {a.name[0]}
                </span>
                {a.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">The Right Kind of Loud.</h2>
          <p className="mt-3 max-w-2xl mx-auto text-ink-soft">
            You do not have to go viral to build credibility. You have to be consistent, accurate, and
            present.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              {brand.secondaryCTA}
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
      </section>
    </MarketingShell>
  );
}
