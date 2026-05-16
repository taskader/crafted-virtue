import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/enterprise/compliance")({
  head: () => ({ meta: [{ title: "Compliance — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Compliance</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">Audit-ready by default.</h1>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          { t: "SAML SSO + SCIM", d: "Okta · Active" },
          { t: "Audit log retention", d: "7 years · Exportable" },
          { t: "Data residency", d: "US-East · EU-West" },
        ].map((c) => (
          <Card key={c.t} className="p-6">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-lg">{c.t}</h2>
            <p className="mt-1 text-sm text-ink-soft">{c.d}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-6">
        <SectionLabel>Recent audit entries</SectionLabel>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>14:32 — Konrad cleared compliance review on 2 LinkedIn drafts (Ellis Harrow).</li>
          <li>13:18 — Brand rule "no unaudited financials" triggered; routed to Legal.</li>
          <li>11:04 — SCIM sync: 2 users provisioned, 1 deprovisioned.</li>
          <li>09:47 — Audit export downloaded by m.vance@hartwell.co.</li>
        </ul>
      </Card>
    </EnterpriseShell>
  ),
});
