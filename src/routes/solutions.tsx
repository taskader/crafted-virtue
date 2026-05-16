import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [{ title: "Solutions — Crafted Virtue" }, { name: "description", content: "Thought leadership solutions for executives, founders, consultants and enterprise teams." }] }),
  component: Solutions,
});

const PERSONAS = [
  { who: "Executives", what: "Stay visible to the right rooms without surrendering your calendar. We translate your operating mind into a public record of judgement." },
  { who: "Founders", what: "Build category gravity early. Your conviction becomes the inbound your fundraising and recruiting depend on." },
  { who: "Consultants", what: "Stop disappearing between engagements. Compound proof of expertise into a pipeline that doesn't require networking events." },
  { who: "Enterprise teams", what: "Activate the people who already shape the market — under brand rules, with compliance baked in." },
];

function Solutions() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24">
        <SectionLabel>Solutions</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">For people whose reputation is doing the heaviest lifting.</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">Different operators, the same outcome: a public record of judgement the market trusts before you walk in the room.</p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2">
        {PERSONAS.map((p) => (
          <Card key={p.who} className="p-8">
            <SectionLabel>{p.who}</SectionLabel>
            <h2 className="mt-3 font-display text-2xl">{p.who}, but with leverage.</h2>
            <p className="mt-3 text-ink-soft">{p.what}</p>
            <Link to="/signup" className="mt-6 inline-block text-sm text-primary hover:underline">Start free trial →</Link>
          </Card>
        ))}
      </section>
    </MarketingShell>
  );
}
