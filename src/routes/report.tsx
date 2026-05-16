import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { brand } from "@/data/craftedVirtueData";
import { Check } from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Influence Delta™ Report — Crafted Virtue" },
      {
        name: "description",
        content:
          "Benchmark your digital presence against top performers in your field. See your authority gap and opportunity projection in minutes.",
      },
    ],
  }),
  component: Report,
});

const METRIC_CARDS = [
  { label: "Current Authority Score", body: "Composite of visibility, voice fit, and trust signals across the web." },
  { label: "Brand Score Benchmark", body: "Where you sit against peers in your role, industry, and experience tier." },
  { label: "Visibility Gap", body: "The distance between your expertise and the external signal you're generating." },
  { label: "Opportunity Projection", body: "Where coordinated visibility would most likely move the needle." },
  { label: "Suggested Actions", body: "A first-90-day plan ranked by impact and effort." },
];

const FORM_FIELDS = [
  { l: "Name", t: "text", p: "Anya Sharma" },
  { l: "Email", t: "email", p: "anya@example.com" },
  { l: "LinkedIn URL", t: "text", p: "linkedin.com/in/anyasharma" },
  { l: "Job title", t: "text", p: "Chief Research Officer" },
  { l: "Industry", t: "text", p: "AI Safety / Enterprise SaaS" },
  { l: "Years of experience", t: "number", p: "14" },
  { l: "Public content links (optional)", t: "text", p: "essays, talks, papers…" },
];

const SUGGESTED_ACTIONS = [
  "Define 4 content pillars",
  "Publish 3× weekly on LinkedIn",
  "Turn technical insights into board-level narratives",
  "Create a monthly long-form article",
  "Connect publishing channels",
];

function Report() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Influence Delta™ Report</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Discover Your Influence Delta™
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Benchmark your digital presence against top performers in your field—see the opportunity gap in
          minutes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#report-form"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
          >
            Generate My Report
          </a>
          <Link
            to="/signup"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
          >
            Start Free 7-Day Trial
          </Link>
        </div>
      </section>

      {/* Section 1: Measure the Gap */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <SectionLabel>What it measures</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            Measure the Gap Between Presence and Potential.
          </h2>
          <p className="mt-4 text-ink-soft">
            The Influence Delta™ quantifies where you stand today versus where you could be. It benchmarks your
            role, industry, experience, public content, and network signals against the authority profile you
            are capable of building.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {METRIC_CARDS.map((m) => (
            <Card key={m.label} className="p-6">
              <SectionLabel>{m.label}</SectionLabel>
              <p className="mt-3 text-sm text-ink-soft">{m.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Report form */}
      <section id="report-form" className="bg-parchment-deep">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionLabel>Generate your report</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">Tell us where you stand today.</h2>
          <p className="mt-2 text-xs text-ink-soft">
            Takes less than 60 seconds. No account required to preview results.
          </p>
          {!submitted ? (
            <Card className="mt-8 p-8">
              <form
                className="grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                {FORM_FIELDS.map((f) => (
                  <label key={f.l} className="grid gap-1.5 text-sm">
                    <span className="text-xs uppercase tracking-widest text-ink-soft">{f.l}</span>
                    <input
                      type={f.t}
                      placeholder={f.p}
                      className="rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm"
                    />
                  </label>
                ))}
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-parchment"
                >
                  Generate My Report
                </button>
              </form>
            </Card>
          ) : (
            <Card className="mt-8 p-8">
              <p className="font-display text-2xl">Preview ready below ↓</p>
              <p className="mt-2 text-sm text-ink-soft">
                We've generated a sample preview using a real anonymized executive profile.
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* Section 3: Mock report preview */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <SectionLabel>Sample report</SectionLabel>
        <h2 className="mt-3 font-display text-4xl text-balance">Dr. Anya Sharma — Influence Delta™ Report</h2>

        <Card className="mt-8 overflow-hidden p-0">
          <div className="border-b border-border bg-ink p-7 text-parchment">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-parchment/60">Subject</p>
                <p className="mt-1 font-display text-xl">Dr. Anya Sharma · Chief Research Officer</p>
                <p className="text-sm text-parchment/70">AI Safety / Enterprise SaaS · 14 yrs experience</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-widest text-parchment/60">Authority Score</p>
                <p className="mt-1 font-display text-4xl">64</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-7 md:grid-cols-3">
            <div>
              <SectionLabel>Brand Score Benchmark</SectionLabel>
              <p className="mt-2 font-display text-2xl">72nd percentile</p>
              <p className="mt-1 text-xs text-ink-soft">vs. CROs in enterprise AI</p>
            </div>
            <div>
              <SectionLabel>Visibility Gap</SectionLabel>
              <p className="mt-2 font-display text-lg leading-tight">High expertise, low external signal</p>
              <p className="mt-1 text-xs text-ink-soft">Network knows you. Market doesn't.</p>
            </div>
            <div>
              <SectionLabel>Opportunity Projection</SectionLabel>
              <p className="mt-2 font-display text-lg leading-tight">Speaking, advisory, and board visibility</p>
              <p className="mt-1 text-xs text-ink-soft">Strongest lift in the next two quarters.</p>
            </div>
          </div>

          <div className="border-t border-border p-7">
            <SectionLabel>Suggested Actions</SectionLabel>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SUGGESTED_ACTIONS.map((a) => (
                <li key={a} className="flex items-start gap-2 rounded-xl border border-border bg-parchment p-4 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* Section 4: Forecast Calculator */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Forecast</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">Forecast Your Influence Curve.</h2>
            <p className="mt-4 text-ink-soft">
              A directional model of what consistent, voice-aligned publishing could unlock for you over the
              next 12 months.
            </p>
          </div>

          <Card className="mt-10 grid gap-8 p-7 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Role</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm">
                  <option>Executive / C-suite</option>
                  <option>Founder / CEO</option>
                  <option>Partner / Principal</option>
                  <option>Senior consultant</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Industry</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm">
                  <option>AI / Enterprise SaaS</option>
                  <option>Financial services</option>
                  <option>Professional services</option>
                  <option>Healthcare</option>
                  <option>Venture &amp; private capital</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Current network size</label>
                <input
                  type="number"
                  defaultValue={4200}
                  className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-ink-soft">Publishing cadence</label>
                <select className="mt-2 w-full rounded-lg border border-border bg-parchment px-4 py-2.5 text-sm">
                  <option>Rarely</option>
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>3× weekly</option>
                </select>
              </div>
              <button
                type="button"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment"
              >
                Forecast my curve
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { l: "Audience growth", v: "+64%", n: "qualified followers / 12 mo" },
                { l: "Brand Score improvement", v: "+18", n: "from 64 → 82" },
                { l: "Engagement potential", v: "3.1×", n: "vs. current baseline" },
                { l: "Opportunity lift", v: "9 inbound / mo", n: "speaking, advisory, partnership" },
              ].map((o) => (
                <div key={o.l} className="rounded-xl border border-border bg-parchment p-5">
                  <p className="text-[11px] uppercase tracking-widest text-ink-soft">{o.l}</p>
                  <p className="mt-2 font-display text-2xl">{o.v}</p>
                  <p className="mt-1 text-xs text-ink-soft">{o.n}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">Let the data guide your first step.</h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#report-form"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              Generate My Report
            </a>
            <Link
              to="/signup"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              Start 7-Day Free Trial
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>
    </MarketingShell>
  );
}
