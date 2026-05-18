import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { AgentAvatar } from "@/components/agent-avatar";
import { AgentPortrait } from "@/components/agent-portrait";
import { AGENTS as AGENT_REG, type AgentId } from "@/lib/agents";
import { AGENT_PROFILES, AGENT_IDS } from "@/data/agentProfiles";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/agents/$agentId")({
  loader: ({ params }) => {
    const id = params.agentId as AgentId;
    if (!AGENT_IDS.includes(id)) throw notFound();
    return { id };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Agent — Crafted Virtue" }] };
    const agent = AGENT_REG[loaderData.id];
    const profile = AGENT_PROFILES[loaderData.id];
    return {
      meta: [
        { title: `${agent.name} — ${agent.title} — Crafted Virtue` },
        { name: "description", content: profile.mandate },
        { property: "og:title", content: `${agent.name} — ${agent.title}` },
        { property: "og:description", content: profile.mandate },
      ],
    };
  },
  notFoundComponent: () => (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Agent not found</h1>
        <p className="mt-3 text-ink-soft">That specialist isn't on the team.</p>
        <div className="mt-6">
          <Link to="/agents" className="rounded-full bg-ink px-5 py-2.5 text-sm text-parchment">
            Back to agent team
          </Link>
        </div>
      </section>
    </MarketingShell>
  ),
  errorComponent: ({ error }) => (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-ink-soft">{error.message}</p>
      </section>
    </MarketingShell>
  ),
  component: AgentProfilePage,
});

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60 py-12">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm text-ink-soft">{String(number).padStart(2, "0")}</span>
        <h2 className="font-display text-2xl text-balance md:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 max-w-3xl text-ink">{children}</div>
    </section>
  );
}

function AmbientPortrait({ agentId }: { agentId: AgentId }) {
  return (
    <div className="mx-auto flex w-full max-w-xs justify-center">
      <AgentPortrait agentId={agentId} size="hero" ambient />
    </div>
  );
}

function AgentProfilePage() {
  const data = Route.useLoaderData();
  const id = data.id as AgentId;
  const agent = AGENT_REG[id];
  const profile = AGENT_PROFILES[id];
  const related = profile.related.map((rid: AgentId) => ({
    agent: AGENT_REG[rid],
    profile: AGENT_PROFILES[rid],
  }));

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionLabel>The agent team</SectionLabel>
            <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">{agent.name}</h1>
            <p className="mt-3 font-display text-xl text-ink-soft">{agent.title}</p>
            <p className="mt-6 max-w-2xl text-lg">{profile.mandate}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {profile.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ink/10 bg-parchment-deep px-2.5 py-1 text-xs text-ink-soft"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
              >
                Start Your 7-Day Free Trial
              </Link>
              <Link
                to="/agents"
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
              >
                Back to agent team
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <AmbientPortrait agentId={id} />
            <blockquote className="mx-auto mt-6 max-w-sm border-l-2 border-ink/20 pl-4 text-center text-sm italic text-ink-soft">
              "{profile.quote}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Body sections */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Section number={1} title={`What ${agent.name} specializes in`}>
          <p>{profile.specializes}</p>
        </Section>

        <Section number={2} title="How they help build your authority">
          <p>{profile.helpsAuthority}</p>
        </Section>

        <Section number={3} title="When they get involved">
          <p>{profile.whenInvolved}</p>
        </Section>

        <Section number={4} title="Example tasks">
          <ul className="space-y-2 text-sm">
            {profile.exampleTasks.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section number={5} title="How they hand off to other agents">
          <p>{profile.handoffs}</p>
        </Section>

        <Section number={6} title="What the user sees">
          <p>{profile.userSees}</p>
        </Section>

        <Section number={7} title={`Why ${agent.name} matters`}>
          <p className="font-display text-xl leading-snug">{profile.whyMatters}</p>
        </Section>
      </section>

      {/* Works often with */}
      {related.length > 0 && (
        <section className="bg-parchment-deep">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionLabel>Works often with</SectionLabel>
            <h2 className="mt-3 font-display text-3xl text-balance">
              {agent.name}'s most frequent handoffs.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(({ agent: a, profile: p }) => (
                <Link
                  key={a.id}
                  to="/agents/$agentId"
                  params={{ agentId: a.id }}
                  className="group"
                >
                  <Card className="p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-soft">
                    <div className="flex items-start gap-3">
                      <AgentAvatar agent={a} size="lg" />
                      <div className="min-w-0">
                        <h3 className="font-display text-base leading-tight">{a.name}</h3>
                        <p className="mt-0.5 text-xs text-ink-soft">{a.title}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-ink-soft">{p.mandate}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">
            Ready to put the team to work?
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
    </MarketingShell>
  );
}
