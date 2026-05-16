import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { ShieldCheck, Building2, Lock, FileCheck2 } from "lucide-react";

export const Route = createFileRoute("/enterprise")({
  head: () => ({ meta: [{ title: "Enterprise — Crafted Virtue" }, { name: "description", content: "Activate executive voices across your organization, under brand rules and compliance review." }] }),
  component: Enterprise,
});

function Enterprise() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Enterprise</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">Your most credible voices, working as one editorial voice.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">Activate 10 to 500 executives under shared brand rules, with SAML SSO, audit logs, and compliance review built into the workflow.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/signup" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-parchment">Talk to sales</Link>
          <Link to="/report" className="rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink">Run org Impact Analysis</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-24 md:grid-cols-4">
        {[
          { i: Building2, t: "Brand rules engine", d: "House style, banned phrases, tone guardrails, and topic rules — enforced at draft time." },
          { i: ShieldCheck, t: "Compliance review", d: "Konrad runs every piece against policy. Findings are routed to the right reviewer." },
          { i: Lock, t: "SAML SSO + SCIM", d: "Provisioning, deprovisioning, and role-based access." },
          { i: FileCheck2, t: "Audit logs", d: "Every edit, approval, and publish is recorded and exportable." },
        ].map((f) => (
          <Card key={f.t} className="p-6">
            <f.i className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-display text-lg">{f.t}</h3>
            <p className="mt-2 text-sm text-ink-soft">{f.d}</p>
          </Card>
        ))}
      </section>
    </MarketingShell>
  );
}
