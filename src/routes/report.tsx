import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Impact Analysis — Crafted Virtue" }, { name: "description", content: "A four-minute diagnostic of your current executive authority footprint." }] }),
  component: Report,
});

function Report() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <SectionLabel>The Authority Report</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">Run your Impact Analysis.</h1>
        <p className="mt-5 text-lg text-ink-soft">A four-minute diagnostic of where your authority is leaking, where it's compounding, and what to do next quarter.</p>

        {!submitted ? (
          <Card className="mt-10 p-8">
            <form
              className="grid gap-5"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              {[
                { l: "Name", t: "text", p: "Ellis Harrow" },
                { l: "Role and company", t: "text", p: "CEO, Hartwell Group" },
                { l: "Work email", t: "email", p: "ellis@hartwell.co" },
                { l: "Primary LinkedIn URL", t: "text", p: "linkedin.com/in/eharrow" },
              ].map((f) => (
                <label key={f.l} className="block">
                  <span className="text-sm text-ink-soft">{f.l}</span>
                  <input type={f.t} placeholder={f.p} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
                </label>
              ))}
              <label className="block">
                <span className="text-sm text-ink-soft">What outcome would make this quarter unambiguously successful?</span>
                <textarea rows={4} placeholder="Fundraising momentum, executive hires, category share of voice..." className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </label>
              <button className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment">Generate my Impact Analysis</button>
            </form>
          </Card>
        ) : (
          <Card className="mt-10 p-10 text-center">
            <h2 className="font-display text-3xl">Your analysis is being prepared.</h2>
            <p className="mt-3 text-ink-soft">Olivia and Beatrice are reviewing your footprint. You'll receive your full report within the hour.</p>
          </Card>
        )}
      </section>
    </MarketingShell>
  );
}
