import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Shield, FileText, Download, AlertOctagon, Archive, History } from "lucide-react";

export const Route = createFileRoute("/enterprise/compliance")({
  head: () => ({ meta: [{ title: "Compliance — Enterprise" }] }),
  component: Compliance,
});

const CONTROLS = [
  { icon: Shield, title: "SOC 2-aligned controls", desc: "Access, encryption, change management, and incident response are SOC 2 Type II-aligned." },
  { icon: History, title: "Full audit trail", desc: "Every draft, edit, approval, and publish event is recorded with actor, timestamp, and diff." },
  { icon: Archive, title: "Content archive", desc: "All published and unpublished assets are retained for 7 years with hash-verified integrity." },
  { icon: Shield, title: "Role-based approval", desc: "Approver assignments are enforced at the agent level. No publish action bypasses the configured path." },
  { icon: FileText, title: "Export-ready reports", desc: "Auditor packages export in JSON, CSV, and PDF with chain-of-custody metadata." },
];

const AUDIT = [
  { when: "Mar 14 14:22", actor: "Marcus Lim", action: "Approved", target: "Why we're underweight late-stage growth", note: "Legal review cleared." },
  { when: "Mar 14 11:04", actor: "Priya Shah", action: "Requested revision", target: "AI governance for emerging managers", note: "Soften regulatory claim." },
  { when: "Mar 13 17:48", actor: "System", action: "Flagged", target: "Three CFO lessons", note: "Truth Filter requested citation." },
  { when: "Mar 13 09:11", actor: "David Chen", action: "Published", target: "Allocation discipline post", note: "Scheduled through Crafted Virtue." },
];

const HISTORY = [
  { period: "March", approved: 38, revised: 11, blocked: 2 },
  { period: "February", approved: 42, revised: 8, blocked: 1 },
  { period: "January", approved: 31, revised: 14, blocked: 3 },
];

const EXCEPTIONS = [
  { title: "ESG methodology disclosure waived", when: "Feb 21", by: "Marcus Lim", reason: "Pre-existing public disclosure" },
  { title: "Performance figure published without primary citation", when: "Jan 09", by: "Marcus Lim", reason: "Source under NDA, internal record kept" },
];

function Compliance() {
  return (
    <EnterpriseShell>
      <header className="max-w-2xl">
        <SectionLabel>Compliance</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Compliance & audit</h1>
        <p className="mt-2 text-ink-soft">Everything an auditor or board oversight committee needs to see, in one place.</p>
      </header>

      <div>
        <SectionLabel>Security notes</SectionLabel>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CONTROLS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} className="p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-parchment">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-4 font-display text-lg">{c.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Audit archive</SectionLabel>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs">
            <Download className="h-3 w-3" /> Export period
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="pb-3 font-medium">When</th>
                <th className="pb-3 font-medium">Actor</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Target</th>
                <th className="pb-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {AUDIT.map((a, i) => (
                <tr key={i}>
                  <td className="py-3 text-ink-soft">{a.when}</td>
                  <td className="py-3 font-medium">{a.actor}</td>
                  <td className="py-3">{a.action}</td>
                  <td className="py-3">{a.target}</td>
                  <td className="py-3 text-ink-soft">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>Approval history</SectionLabel>
          <div className="mt-4 divide-y divide-border/60">
            {HISTORY.map((h) => (
              <div key={h.period} className="flex items-center justify-between py-3">
                <p className="font-medium">{h.period}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-success">{h.approved} approved</span>
                  <span className="text-warning">{h.revised} revised</span>
                  <span className="text-destructive">{h.blocked} blocked</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Content export</SectionLabel>
          <p className="mt-2 text-sm text-ink-soft">Generate auditor-ready packages of approved content, edits, and approver chain.</p>
          <div className="mt-4 space-y-2">
            {["Last 30 days", "Last quarter", "Year to date", "Custom range"].map((r) => (
              <button key={r} className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-parchment-deep p-3 text-sm">
                <span>{r}</span>
                <Download className="h-4 w-4 text-ink-soft" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-warning" />
          <SectionLabel>Policy exceptions</SectionLabel>
        </div>
        <p className="mt-2 text-xs text-ink-soft">Approved exceptions are part of the audit record.</p>
        <div className="mt-4 space-y-2">
          {EXCEPTIONS.map((e) => (
            <div key={e.title} className="rounded-xl border border-warning/30 bg-warning/5 p-4">
              <p className="font-medium">{e.title}</p>
              <p className="mt-1 text-xs text-ink-soft">{e.when} · approved by {e.by}</p>
              <p className="mt-2 text-sm">{e.reason}</p>
            </div>
          ))}
        </div>
      </Card>
    </EnterpriseShell>
  );
}
