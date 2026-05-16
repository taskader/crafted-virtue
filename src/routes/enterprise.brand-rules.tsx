import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/enterprise/brand-rules")({
  head: () => ({ meta: [{ title: "Brand rules — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Brand rules</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">House voice, enforced at draft time.</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>House voice</SectionLabel>
          <p className="mt-3">Calm, declarative, evidence-led. Refuses hype. Favors specific over universal.</p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Banned phrases</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {["game-changing", "synergy", "10x", "disruption", "thought-provoking", "rockstar"].map((p) => (
              <span key={p} className="rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive">{p}</span>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionLabel>Sensitive topics</SectionLabel>
          <p className="mt-3 text-sm text-ink-soft">Politics, named competitors, unaudited financials, individual employees. Auto-flagged for legal review.</p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Approved references</SectionLabel>
          <p className="mt-3 text-sm text-ink-soft">Annual letter, FY25 strategy memo, Q3 board pack (redacted), public earnings transcripts.</p>
        </Card>
      </div>
    </EnterpriseShell>
  ),
});
