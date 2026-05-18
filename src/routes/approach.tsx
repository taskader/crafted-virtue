import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { AgentAvatar } from "@/components/agent-avatar";
import { AGENTS as AGENT_REG, type AgentId } from "@/lib/agents";
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

type AgentDetail = {
  id: AgentId;
  mandate: string;
  helps: string;
  example: string;
  primary?: boolean;
};

const AGENT_DETAILS: AgentDetail[] = [
  { id: "olivia",   primary: true, mandate: "Guides new users from first setup to confident first output.", helps: "Olivia turns a blank account into a configured authority engine: profile, goals, voice intake, content pillars, publishing preferences, and first draft.", example: "Let's turn your professional background into a first 30-day content plan." },
  { id: "leo",      primary: true, mandate: "Turns expertise into strategically useful content.", helps: "Leo creates angles, drafts, platform variants, content calendars, and voice-aligned thought leadership.", example: "I'll convert this insight into a LinkedIn post, X thread, and newsletter intro." },
  { id: "sam",      primary: true, mandate: "Turns performance data into clear next actions.", helps: "Sam reads Brand Score, Influence Delta, reach, engagement, content pillars, and channel performance to recommend what to publish next.", example: "Your audience is responding most strongly to operating lessons, not abstract AI commentary." },
  { id: "talia",    primary: true, mandate: "Protects brand quality, evidence, and publishing safety.", helps: "Talia reviews content for voice fit, brand safety, claims, quality, and risk before approval.", example: "This draft is strong, but one claim needs a better citation before it should go live." },
  { id: "vincent",  primary: true, mandate: "Turns written authority into multimedia assets.", helps: "Vincent prepares video concepts, scripts, clips, audio ideas, and media treatments from approved content.", example: "This LinkedIn post could become a 45-second vertical video with a calm executive voiceover." },
  { id: "alex",     primary: true, mandate: "Answers product questions and supports learning.", helps: "Alex retrieves guidance, training, documentation, and walkthroughs when users need help.", example: "Here's why your post was routed to review and how the approval workflow works." },
  { id: "konrad",   primary: true, mandate: "Routes support requests to the right specialist.", helps: "Konrad triages publishing, billing, content, analytics, and support questions so users do not have to know which agent to ask.", example: "I'll bring in Beatrice for billing and Talia for the flagged content issue." },
  { id: "beatrice", primary: true, mandate: "Manages subscription, billing, and plan support.", helps: "Beatrice clarifies plans, trials, usage, add-ons, payment status, and upgrade paths.", example: "You are on Pro with 4 trial days left. Here is what changes if you move to Enterprise." },
  { id: "solomon",  mandate: "Supports higher-order positioning and market strategy.", helps: "Solomon helps frame long-term authority strategy, niche positioning, and market narrative.", example: "Your strongest strategic lane is not AI adoption; it is decision quality in regulated innovation." },
  { id: "chloe",    mandate: "Tracks change, memory, and product updates.", helps: "Chloe helps communicate what changed, what shipped, and how the platform is evolving.", example: "Here is what changed in your workspace this week." },
  { id: "scout",    mandate: "Documents workflows and product interactions.", helps: "Scout supports training, walkthroughs, and internal product documentation.", example: "I'll capture this workflow so it can become a training asset." },
  { id: "cody",     mandate: "Supports internal build and implementation work.", helps: "Cody is mostly internal, helping turn approved feature specs into product improvements.", example: "This approved workflow can be converted into an implementation task." },
];

function AgentChipTab({
  detail,
  active,
  onClick,
}: {
  detail: AgentDetail;
  active: boolean;
  onClick: () => void;
}) {
  const agent = AGENT_REG[detail.id];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active
          ? "border-ink bg-ink text-parchment"
          : "border-ink/10 bg-parchment text-ink hover:border-ink/30"
      }`}
    >
      <AgentAvatar agent={agent} size="sm" ring={false} className={active ? "ring-1 ring-parchment/40" : ""} />
      <span>{agent.name}</span>
    </button>
  );
}

function AgentDetailCard({ detail }: { detail: AgentDetail }) {
  const agent = AGENT_REG[detail.id];
  return (
    <Card className="p-7">
      <div className="flex items-start gap-4">
        <AgentAvatar agent={agent} size="xl" />
        <div className="min-w-0">
          <h3 className="font-display text-2xl">{agent.name}</h3>
          <p className="mt-0.5 text-sm text-ink-soft">{agent.title}</p>
        </div>
      </div>
      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-ink-soft">Mandate</dt>
          <dd className="mt-1">{detail.mandate}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-ink-soft">How {agent.name} helps</dt>
          <dd className="mt-1">{detail.helps}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-ink-soft">Example</dt>
          <dd className="mt-1 rounded-md border border-ink/10 bg-parchment p-3 italic text-ink-soft">
            "{detail.example}"
          </dd>
        </div>
      </dl>
    </Card>
  );
}

function Approach() {
  const primaryAgents = AGENT_DETAILS.filter((a) => a.primary);
  const secondaryAgents = AGENT_DETAILS.filter((a) => !a.primary);
  const [activeId, setActiveId] = useState<AgentId>(primaryAgents[0].id);
  const activeDetail = AGENT_DETAILS.find((a) => a.id === activeId) ?? primaryAgents[0];
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
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
          </div>
          <div className="md:col-span-5">
            <Illustration name="approachSignal" ratio="4/3" priority alt="A field of noise calming into a clear lighted signal on the horizon — the Crafted Virtue approach" />
          </div>
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

      {/* Section 4: Specialist team */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Operating model</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              One personal agent. A specialist team behind it.
            </h2>
            <p className="mt-4 text-ink-soft">
              Users interact with one personal Crafted Virtue Agent. Behind the scenes, specialist
              agents support onboarding, content strategy, analytics, quality, media, support,
              billing, and long-term strategy.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Specialist agents">
            {primaryAgents.map((d) => (
              <AgentChipTab
                key={d.id}
                detail={d}
                active={activeId === d.id}
                onClick={() => setActiveId(d.id)}
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <AgentDetailCard detail={activeDetail} />
            </div>
            <div className="md:col-span-4">
              <Card className="p-6">
                <h3 className="font-display text-lg">Show all specialists</h3>
                <p className="mt-1 text-xs text-ink-soft">
                  Internal and adjacent agents that support the team behind the scenes.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {secondaryAgents.map((d) => (
                    <AgentChipTab
                      key={d.id}
                      detail={d}
                      active={activeId === d.id}
                      onClick={() => setActiveId(d.id)}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/agents"
              className="rounded-full border border-ink/20 bg-parchment px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              Meet the full agent team
            </Link>
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
