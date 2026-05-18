import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { AgentAvatar } from "@/components/agent-avatar";
import { AGENT_LIST } from "@/lib/agents";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "The Agent Team — Crafted Virtue" },
      {
        name: "description",
        content:
          "Meet the full Crafted Virtue specialist team — one personal agent supported by onboarding, content, analytics, quality, media, support, billing, and strategy specialists.",
      },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>The team</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          One personal agent. A specialist team behind it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Users interact with one personal Crafted Virtue Agent. Behind the scenes, specialists
          handle onboarding, content, analytics, quality, media, support, billing, and long-term
          strategy.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_LIST.map((a) => (
            <Card key={a.id} className="p-6">
              <div className="flex items-start gap-4">
                <AgentAvatar agent={a} size="xl" />
                <div className="min-w-0">
                  <h2 className="font-display text-xl">{a.name}</h2>
                  <p className="mt-0.5 text-xs text-ink-soft">{a.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-soft">{a.role}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/approach"
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
          >
            Back to the approach
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
