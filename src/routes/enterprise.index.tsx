import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { brand } from "@/data/craftedVirtueData";
import { Check } from "lucide-react";

export const Route = createFileRoute("/enterprise/")({
  head: () => ({
    meta: [
      { title: "Enterprise — Crafted Virtue" },
      {
        name: "description",
        content:
          "Authority-as-a-Service for enterprise teams. Multi-executive thought leadership with compliance, audit, and brand governance.",
      },
    ],
  }),
  component: Enterprise,
});

const ROI_BARS = [
  { label: "Brand Account", value: 22, note: "Baseline reach, low trust delta" },
  { label: "Employee Influencer", value: 54, note: "Mid trust, narrow audience" },
  { label: "Executive Leader", value: 92, note: "Highest trust, decision-room reach" },
];

const USE_CASES = [
  {
    t: "Multi-Partner Leadership Teams",
    d: "Turn partners, principals, and senior experts into a coordinated thought-leadership engine.",
  },
  {
    t: "High-Impact Business Launches",
    d: "Support funds, products, books, reports, and strategic initiatives with aligned executive narratives.",
  },
  {
    t: "Compliance-First Content",
    d: "Route AI drafts through human review, brand approval, and legal sign-off before publication.",
  },
  {
    t: "Recruiting and Talent Attraction",
    d: "Make leadership visible to the senior candidates and operators you want to attract.",
  },
  {
    t: "Investor and Market Narrative",
    d: "Help leadership communicate conviction, market understanding, and operating discipline.",
  },
  {
    t: "Multi-Executive Thought Leadership",
    d: "Coordinate different voices without making every executive sound the same.",
  },
];

const COMPLIANCE_STEPS = ["AI Draft", "Human Review", "Team Approval", "Publish"];
const COMPLIANCE_BULLETS = [
  "SOC 2-aligned controls",
  "Full audit trail",
  "Role-based approvals",
  "Content archive",
  "Board-safe reporting",
  "Enterprise governance",
];

const PRICING_FEATURES = [
  "Unlimited connected channels",
  "Shared approval workflows",
  "Compliance archive",
  "Role-based permissions",
  "AI fact-checking",
  "Enterprise analytics",
  "Weekly growth briefings",
];

function Enterprise() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionLabel>Authority-as-a-Service</SectionLabel>
            <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
              People Trust People, Not Logos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              Give your executives the tools to build trust at scale—and make your brand more human, more visible,
              and more credible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/enterprise/overview"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
              >
                Book a Custom Demo
              </Link>
              <Link
                to="/report"
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
              >
                {brand.primaryCTA}
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <Illustration name="enterpriseAligned" ratio="16/10" priority alt="Multiple executive voices aligning through brand rules into one firm-wide authority signal" />
          </div>
        </div>
      </section>

      {/* Section 1: ROI of Executive Visibility */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>The ROI of executive visibility</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Leadership presence is no longer a side channel.
            </h2>
            <p className="mt-4 text-ink-soft">
              Executive-led content creates trust, recruiting lift, market credibility, and narrative control
              that brand accounts alone cannot deliver.
            </p>
          </div>
          <Card className="p-7">
            <SectionLabel>Relative trust + reach signal</SectionLabel>
            <div className="mt-6 space-y-5">
              {ROI_BARS.map((b) => (
                <div key={b.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{b.label}</span>
                    <span className="text-ink-soft">{b.value}</span>
                  </div>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-ink transition-all duration-700"
                      style={{ width: `${b.value}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">{b.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Section 2: Use Cases */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Use cases</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">Where enterprise teams put it to work.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <Card key={u.t} className="p-6">
                <h3 className="font-display text-lg">{u.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{u.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Compliance & Control */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <SectionLabel>Compliance &amp; control</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            Board-safe by default. Auditable by design.
          </h2>
        </div>

        <Card className="mt-10 p-7">
          <SectionLabel>Workflow</SectionLabel>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {COMPLIANCE_STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className="rounded-full border border-ink/15 bg-parchment px-4 py-2 text-sm font-medium">
                  {s}
                </span>
                {i < COMPLIANCE_STEPS.length - 1 && <span className="text-ink-soft/40">→</span>}
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLIANCE_BULLETS.map((b) => (
            <div key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm">
              <Check className="mt-0.5 h-4 w-4 text-primary" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Influence Curve calculator */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Calculator</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">See Your Influence Curve.</h2>
            <p className="mt-4 text-ink-soft">
              A directional model of what coordinated executive visibility could unlock for your team.
            </p>
          </div>

          <Card className="mt-10 grid gap-8 p-7 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Number of executives</label>
                <input
                  type="number"
                  defaultValue={8}
                  className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Industry</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm">
                  <option>Financial services</option>
                  <option>Professional services</option>
                  <option>Enterprise SaaS</option>
                  <option>Healthcare</option>
                  <option>Venture &amp; private capital</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Current visibility</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm">
                  <option>Mostly invisible</option>
                  <option>Occasionally posting</option>
                  <option>Consistent but inconsistent voice</option>
                  <option>Established presence</option>
                </select>
              </div>
              <button
                type="button"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment"
              >
                Estimate impact
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { l: "Engagement lift", v: "+3.4×", n: "vs. brand-only baseline" },
                { l: "Audience growth", v: "+72%", n: "qualified followers / 90 days" },
                { l: "Visibility gap score", v: "34 / 100", n: "headroom vs. peer set" },
                { l: "Estimated opportunity impact", v: "$2.1M", n: "indicative annualized" },
              ].map((o) => (
                <div key={o.l} className="rounded-xl border border-border bg-parchment p-5">
                  <p className="text-[11px] uppercase tracking-widest text-ink-soft">{o.l}</p>
                  <p className="mt-2 font-display text-2xl">{o.v}</p>
                  <p className="mt-1 text-xs text-ink-soft">{o.n}</p>
                </div>
              ))}
            </div>
          </Card>
          <p className="mt-3 text-xs text-ink-soft">Indicative model — your Crafted Virtue strategist will refine with your data.</p>
        </div>
      </section>

      {/* Section 5: Pricing Snapshot */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionLabel>Pricing snapshot</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Enterprise from $1,259/mo.
            </h2>
            <p className="mt-4 text-ink-soft">
              Enterprise starts at $1,259/mo with 5 seats included. Additional seats are $250/mo each.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30">
                See full pricing
              </Link>
              <Link to="/enterprise/overview" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">
                Book a Custom Demo
              </Link>
            </div>
          </div>
          <Card className="p-7">
            <SectionLabel>What's included</SectionLabel>
            <ul className="mt-5 space-y-3 text-sm">
              {PRICING_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-4">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">
            Let's build your executive brand engine.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/enterprise/overview"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              Book a Custom Demo
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              Run Impact Analysis
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>
    </MarketingShell>
  );
}
