import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/enterprise/overview")({
  head: () => ({ meta: [{ title: "Overview — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Enterprise overview</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">Hartwell Group · Executive Practice</h1>
      <p className="mt-1 text-ink-soft">42 activated voices · 318 pieces published this quarter.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <Stat label="Activated voices" value="42" delta="+6 this Q" />
        <Stat label="Published / Q" value="318" delta="+22%" />
        <Stat label="Org Brand Score" value="78" delta="+9" />
        <Stat label="Compliance flags" value="3" delta="All resolved" />
      </div>
      <Card className="mt-8 p-6">
        <SectionLabel>Quarterly narrative</SectionLabel>
        <p className="mt-3 font-display text-lg leading-snug">"The executive bench is publishing in lockstep on three category themes. Inbound from target accounts up 41% QoQ."</p>
      </Card>
    </EnterpriseShell>
  ),
});
