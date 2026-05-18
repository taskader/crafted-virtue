import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { AgentAvatar } from "@/components/agent-avatar";
import { AGENTS as AGENT_REG, type AgentId } from "@/lib/agents";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Crafted Virtue Agents — Specialist AI Team for Executive Authority" },
      {
        name: "description",
        content:
          "Meet the specialist agents behind Crafted Virtue: onboarding, content, analytics, quality, media, support, billing, and strategy working together to build executive authority.",
      },
      { property: "og:title", content: "The Crafted Virtue Agent Team" },
      {
        property: "og:description",
        content:
          "Generic AI creates generic authority. Specialist agents create leverage. Meet the team behind every Crafted Virtue user.",
      },
    ],
  }),
  component: AgentsPage,
});

type AgentProfile = {
  id: AgentId;
  mandate: string;
  specialties: string[];
  helps: string;
  quote: string;
};

const AGENT_PROFILES: AgentProfile[] = [
  {
    id: "olivia",
    mandate: "Guides users from first setup to first confident output.",
    specialties: ["Onboarding", "Goals", "Setup", "Guided education"],
    helps: "Olivia turns an empty account into a configured authority engine with profile, goals, voice intake, content pillars, publishing preferences, and first content direction.",
    quote: "Let's make the first step feel clear.",
  },
  {
    id: "leo",
    mandate: "Turns expertise into strategically useful content.",
    specialties: ["Content strategy", "Drafting", "Platform variants", "Storytelling"],
    helps: "Leo develops angles, drafts, calendars, and channel-specific content that sounds like the user and serves their goals.",
    quote: "Your insight already has the material. I shape the signal.",
  },
  {
    id: "sam",
    mandate: "Turns performance data into strategy.",
    specialties: ["Brand Score", "Influence Delta", "Growth briefings", "Recommendations"],
    helps: "Sam measures what is working, identifies the strongest content pillars, and recommends the next best authority moves.",
    quote: "The numbers are only useful when they change what you do next.",
  },
  {
    id: "talia",
    mandate: "Protects quality, brand safety, and evidence.",
    specialties: ["QA", "Brand safety", "Citation review", "Approval readiness"],
    helps: "Talia reviews drafts for clarity, accuracy, risk, tone, and credibility before they move to approval.",
    quote: "Strong content should be clear, credible, and safe to stand behind.",
  },
  {
    id: "vincent",
    mandate: "Transforms written authority into multimedia assets.",
    specialties: ["Video", "Audio", "Scripts", "Visual storytelling"],
    helps: "Vincent turns approved posts and ideas into video concepts, audio-ready scripts, and multimedia treatments.",
    quote: "Some ideas deserve to be seen, heard, and remembered.",
  },
  {
    id: "alex",
    mandate: "Makes product knowledge and guidance accessible.",
    specialties: ["Help", "Documentation", "Training", "Walkthroughs"],
    helps: "Alex explains how the platform works, retrieves guidance, and turns questions into clear answers.",
    quote: "I'll make the system understandable.",
  },
  {
    id: "konrad",
    mandate: "Routes issues to the right specialist.",
    specialties: ["Support triage", "Escalation", "Routing", "Service quality"],
    helps: "Konrad listens first, classifies the need, and brings in the correct specialist for support.",
    quote: "You should never have to know who to ask.",
  },
  {
    id: "beatrice",
    mandate: "Keeps subscription and billing experience clear.",
    specialties: ["Plans", "Billing", "Trials", "Upgrades", "Subscription support"],
    helps: "Beatrice explains plan usage, renewal, add-ons, and account questions without making billing feel opaque.",
    quote: "Clarity matters before commitment.",
  },
  {
    id: "solomon",
    mandate: "Supports long-term positioning and market strategy.",
    specialties: ["Market intelligence", "Positioning", "Narrative strategy"],
    helps: "Solomon helps identify the user's strongest authority lane and long-term narrative opportunity.",
    quote: "The right niche is where expertise becomes unmistakable.",
  },
  {
    id: "cody",
    mandate: "Supports internal product implementation.",
    specialties: ["Development support", "Implementation tasks", "System improvement"],
    helps: "Cody is mostly internal, helping turn approved ideas and workflows into product improvements.",
    quote: "The best systems quietly improve.",
  },
  {
    id: "scout",
    mandate: "Captures workflows for documentation and learning.",
    specialties: ["Screen recording", "Walkthroughs", "Training assets"],
    helps: "Scout supports product documentation and training material so users can learn faster.",
    quote: "If a workflow matters, it should be easy to explain.",
  },
  {
    id: "chloe",
    mandate: "Tracks product memory and change.",
    specialties: ["Changelog", "Release notes", "Product updates", "Memory"],
    helps: "Chloe keeps users and operators aware of what has changed, shipped, and improved.",
    quote: "Progress is easier to trust when it is visible.",
  },
];

const WHY_CARDS = [
  { t: "Strategy", d: "Positioning and the next best authority move." },
  { t: "Voice", d: "Calibrated to how the user actually thinks and writes." },
  { t: "Content", d: "Drafts, angles, and platform variants." },
  { t: "Quality", d: "Pre-publish review for tone, claims, and risk." },
  { t: "Publishing", d: "Coordinated scheduling across channels." },
  { t: "Analytics", d: "Performance read into clear next actions." },
  { t: "Media", d: "Video, audio, and visual adaptation." },
  { t: "Support", d: "Triaged, routed, and resolved with context." },
  { t: "Billing", d: "Plans, usage, and renewals without opacity." },
  { t: "Governance", d: "Approval workflows and auditability." },
];

const FLOW_STEPS = [
  "User goal",
  "Personal agent",
  "Specialist agents",
  "Draft / insight / media",
  "User review",
  "Publish",
  "Analytics",
  "Learning loop",
];

const SCENARIOS = [
  {
    ask: "I need a LinkedIn post for next week.",
    steps: [
      "Sam checks topic performance.",
      "Leo drafts the post.",
      "Alex supports research.",
      "Talia reviews quality.",
      "User approves.",
      "Publishing calendar schedules.",
      "Sam analyzes results.",
    ],
  },
  {
    ask: "Turn this post into a video.",
    steps: [
      "Leo extracts the key message.",
      "Vincent creates the video concept.",
      "Talia checks brand safety.",
      "User approves.",
      "The media asset joins the publishing plan.",
    ],
  },
  {
    ask: "Why was this flagged?",
    steps: [
      "Konrad triages.",
      "Talia explains the quality issue.",
      "Alex provides guidance.",
      "User requests revision or approval.",
    ],
  },
  {
    ask: "Build my enterprise leadership program.",
    steps: [
      "Solomon frames strategy.",
      "Olivia handles onboarding.",
      "Leo builds content plans.",
      "Talia enforces brand rules.",
      "Sam reports performance.",
      "Enterprise admin manages approvals.",
    ],
  },
];

const TRUST_BULLETS = [
  "Users interact with one personal agent.",
  "Specialist agents handle bounded tasks.",
  "Approval remains human-controlled.",
  "Quality and citations are reviewed before publishing.",
  "Enterprise workflows preserve governance and auditability.",
];

function HeroOrbit() {
  // Central card + 8 orbiting portraits, premium static composition.
  const orbit = AGENT_PROFILES.slice(0, 8);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* concentric rings */}
      <div className="absolute inset-6 rounded-full border border-ink/10" />
      <div className="absolute inset-14 rounded-full border border-ink/10" />
      <div className="absolute inset-24 rounded-full border border-ink/10" />

      {/* center card */}
      <div className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ink/15 bg-parchment p-4 text-center shadow-soft">
        <p className="text-[10px] uppercase tracking-widest text-ink-soft">Your</p>
        <p className="mt-1 font-display text-base leading-tight text-ink">
          Crafted Virtue Agent
        </p>
        <div className="mx-auto mt-3 h-1 w-8 rounded-full bg-ink/60" />
      </div>

      {/* orbiting portraits */}
      {orbit.map((p, i) => {
        const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
        const r = 44; // percent of container
        const x = 50 + Math.cos(angle) * r;
        const y = 50 + Math.sin(angle) * r;
        const agent = AGENT_REG[p.id];
        return (
          <div
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-fade-in"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 60}ms` }}
            title={`${agent.name} — ${agent.title}`}
          >
            <AgentAvatar agent={agent} size="lg" />
          </div>
        );
      })}
    </div>
  );
}

function AgentCard({ profile }: { profile: AgentProfile }) {
  const agent = AGENT_REG[profile.id];
  return (
    <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      {/* hover background signal line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-ink/30 to-transparent transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${agent.accent}22 0%, transparent 70%)` }}
        aria-hidden
      />

      <div className="flex items-start gap-4">
        <div className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[1.5deg]">
          <AgentAvatar agent={agent} size="xl" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight">{agent.name}</h3>
          <p className="mt-0.5 text-xs text-ink-soft">{profile.id === "olivia" || profile.id === "talia" || profile.id === "beatrice" || profile.id === "chloe" ? agent.title : agent.title}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink">{profile.mandate}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {profile.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full border border-ink/10 bg-parchment-deep px-2 py-0.5 text-[11px] text-ink-soft"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-soft">{profile.helps}</p>

      <blockquote className="mt-4 max-h-0 overflow-hidden border-l-2 border-ink/20 pl-3 text-sm italic text-ink-soft opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
        "{profile.quote}"
      </blockquote>

      <div className="mt-5">
        <Link
          to="/agents/$agentId"
          params={{ agentId: profile.id }}
          className="text-xs font-medium uppercase tracking-wide text-ink underline-offset-4 hover:underline"
        >
          View profile →
        </Link>
      </div>
    </Card>
  );
}

function ProfileDialog({
  profile,
  onClose,
}: {
  profile: AgentProfile | null;
  onClose: () => void;
}) {
  if (!profile) return null;
  const agent = AGENT_REG[profile.id];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${agent.name} profile`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-ink/10 bg-parchment p-8 shadow-soft animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <AgentAvatar agent={agent} size="xl" />
          <div>
            <h3 className="font-display text-2xl">{agent.name}</h3>
            <p className="text-sm text-ink-soft">{agent.title}</p>
          </div>
        </div>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-soft">Mandate</dt>
            <dd className="mt-1">{profile.mandate}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-soft">Specialties</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {profile.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/10 bg-parchment-deep px-2 py-0.5 text-[11px] text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-soft">How {agent.name} helps</dt>
            <dd className="mt-1">{profile.helps}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-soft">In their words</dt>
            <dd className="mt-1 rounded-md border-l-2 border-ink/20 bg-parchment-deep p-3 italic text-ink-soft">
              "{profile.quote}"
            </dd>
          </div>
        </dl>
        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function AgentsPage() {
  const [activeProfile, setActiveProfile] = useState<AgentProfile | null>(null);

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionLabel>The agent team</SectionLabel>
            <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
              One personal agent. Twelve specialist minds behind it.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              Crafted Virtue gives every user a personal brand agent. Behind that agent is a
              coordinated team of specialists for onboarding, content, analytics, quality, media,
              support, billing, strategy, documentation, and product operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
              >
                Start Your 7-Day Free Trial
              </Link>
              <Link
                to="/report"
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
              >
                Run My Impact Analysis
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <HeroOrbit />
          </div>
        </div>
      </section>

      {/* Section 1: Why specialist agents */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Why specialist agents</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Generic AI creates generic authority. Specialist agents create leverage.
            </h2>
            <p className="mt-4 text-ink-soft">
              Executive visibility is not one task. It is a system: strategy, voice, drafting, fact
              checking, approval, publishing, analytics, media, and learning. Crafted Virtue
              separates these responsibilities into specialists so every step is handled with the
              right context and skill.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_CARDS.map((c) => (
              <Card key={c.t} className="p-5">
                <h3 className="font-display text-base">{c.t}</h3>
                <p className="mt-1 text-xs text-ink-soft">{c.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How they work together */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>How they work together</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            Coordinated by your personal Crafted Virtue Agent.
          </h2>
          <p className="mt-4 text-ink-soft">
            You do not manage twelve agents. You work with one personal agent. It calls on the
            right specialist when needed, explains what is happening, and brings the finished work
            back to you for review.
          </p>
        </div>
        <ol className="mt-10 flex flex-wrap items-center gap-2 text-sm">
          {FLOW_STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-ink/15 bg-parchment px-3 py-1.5">
                {step}
              </span>
              {i < FLOW_STEPS.length - 1 && (
                <span aria-hidden className="text-ink-soft">→</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Section 3: Agent grid */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>The specialists</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Twelve agents. One coordinated team.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AGENT_PROFILES.map((p) => (
              <AgentCard key={p.id} profile={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Scenarios */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>Agent collaboration examples</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            What happens when you ask for content?
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {SCENARIOS.map((s) => (
            <Card key={s.ask} className="p-7">
              <p className="font-display text-lg leading-snug">"{s.ask}"</p>
              <ol className="mt-5 space-y-2 text-sm">
                {s.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] text-parchment">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 5: Trust */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel>Trust model</SectionLabel>
              <h2 className="mt-3 font-display text-4xl text-balance">
                Specialists are powerful because they are bounded.
              </h2>
              <p className="mt-4 text-ink-soft">
                Each agent has a defined role, a narrow responsibility, and a clear handoff. This
                keeps the product understandable, auditable, and safer than one generic black-box
                assistant.
              </p>
            </div>
            <div className="md:col-span-7">
              <Card className="p-7">
                <ul className="space-y-3 text-sm">
                  {TRUST_BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">
            Your personal agent is ready to assemble the right team.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              Start Your 7-Day Free Trial
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              Run My Impact Analysis
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>

      <ProfileDialog profile={activeProfile} onClose={() => setActiveProfile(null)} />
    </MarketingShell>
  );
}
