import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { SPECIALISTS } from "@/lib/mock-data";

export const Route = createFileRoute("/platform")({
  head: () => ({ meta: [{ title: "Platform — Crafted Virtue" }, { name: "description", content: "Voice learning, content workflow, publishing, analytics, and approvals." }] }),
  component: Platform,
});

const MODULES = [
  { t: "Voice learning", d: "Continuous tuning on your writing samples, talks, and feedback. Your agent gets more recognizably you each week." },
  { t: "Content creation", d: "Drafts originate from your real perspective — not generic templates. Pillars, angles, and references are pre-modelled." },
  { t: "Approval workflow", d: "Inline edits, voice-fit scoring, compliance flags, and one-click approval. The publish button is yours." },
  { t: "Postiz-style publishing", d: "Connect LinkedIn, X, Newsletter, Blog, Instagram and more. Optimal windows handled for you." },
  { t: "Analytics", d: "Reach, engagement, Influence Delta, and Brand Score — explained in plain English, not vanity metrics." },
  { t: "Media generation", d: "Cover art, audiograms, pull-quote graphics, and short-form video — generated under your brand rules." },
];

function Platform() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24">
        <SectionLabel>The platform</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">One agent, eight specialists, every step of the work.</h1>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-3">
        {MODULES.map((m) => (
          <Card key={m.t} className="p-6">
            <h2 className="font-display text-xl">{m.t}</h2>
            <p className="mt-2 text-sm text-ink-soft">{m.d}</p>
          </Card>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <SectionLabel>Behind the scenes</SectionLabel>
        <h2 className="mt-3 font-display text-3xl">The specialists working under your agent</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIALISTS.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-ink font-display text-sm text-parchment">{s.name[0]}</div>
              <p className="mt-3 font-medium">{s.name}</p>
              <p className="text-xs text-ink-soft">{s.role}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/signup" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment">Start free trial</Link>
        </div>
      </section>
    </MarketingShell>
  );
}
