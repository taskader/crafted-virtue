import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/enterprise/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Enterprise" }] }),
  component: ApprovalsPage,
});

type Risk = "high" | "medium" | "low";
type Compliance = "passed" | "needs_review" | "blocked";

const QUEUE = [
  { id: "a1", exec: "Alicia Morgan", title: "Why allocation discipline matters more than ever", platform: "LinkedIn", risk: "low" as Risk, compliance: "passed" as Compliance, approver: "Priya Shah", when: "Tue Mar 18 · 09:00" },
  { id: "a2", exec: "David Chen", title: "Northstar's view on AI governance for emerging managers", platform: "Newsletter", risk: "medium" as Risk, compliance: "needs_review" as Compliance, approver: "Marcus Lim", when: "Wed Mar 19 · 07:30" },
  { id: "a3", exec: "Jon Ellis", title: "Three CFO lessons from a difficult quarter", platform: "LinkedIn", risk: "low" as Risk, compliance: "passed" as Compliance, approver: "Priya Shah", when: "Thu Mar 20 · 08:15" },
  { id: "a4", exec: "Maya Patel", title: "Why we're underweight late-stage growth", platform: "Blog", risk: "high" as Risk, compliance: "blocked" as Compliance, approver: "Marcus Lim", when: "Fri Mar 21 · 06:30" },
  { id: "a5", exec: "Rina Okafor", title: "Engineering quality as a board-level metric", platform: "X", risk: "medium" as Risk, compliance: "needs_review" as Compliance, approver: "Priya Shah", when: "Mon Mar 24 · 09:45" },
];

const STATS = [
  { l: "In queue", v: "12" },
  { l: "Awaiting legal", v: "3" },
  { l: "Brand review", v: "6" },
  { l: "Avg turnaround", v: "4h 12m" },
];

function riskChip(r: Risk) {
  return { high: "bg-destructive/15 text-destructive", medium: "bg-warning/25 text-ink", low: "bg-success/15 text-ink" }[r];
}
function complianceChip(c: Compliance) {
  return {
    passed: "bg-success/15 text-ink",
    needs_review: "bg-warning/25 text-ink",
    blocked: "bg-destructive/15 text-destructive",
  }[c];
}

function ApprovalsPage() {
  const [items, setItems] = useState(QUEUE);

  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <EnterpriseShell>
      <header className="max-w-2xl">
        <SectionLabel>Approvals</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Shared approval queue</h1>
        <p className="mt-2 text-ink-soft">Drafts waiting on Brand, Legal, or Admin sign-off before they enter the publishing calendar.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.l} className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-ink-soft">{s.l}</p>
            <p className="mt-2 font-display text-2xl">{s.v}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((q) => (
          <Card key={q.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[10px] text-parchment">
                    {q.exec.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <span className="text-xs text-ink-soft">{q.exec}</span>
                </div>
                <p className="mt-2 font-display text-lg leading-snug">{q.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                  <span>{q.platform}</span>
                  <span>·</span>
                  <span>Approver: {q.approver}</span>
                  <span>·</span>
                  <span>Requested {q.when}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${riskChip(q.risk)}`}>{q.risk} risk</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${complianceChip(q.compliance)}`}>
                    {q.compliance.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => { toast.success("Approved. Released into the publishing queue."); remove(q.id); }}
                  className="rounded-full bg-ink px-4 py-1.5 text-xs text-parchment"
                >
                  Approve
                </button>
                <button
                  onClick={() => toast("Revision request sent back to executive's agent.")}
                  className="rounded-full border border-border px-4 py-1.5 text-xs"
                >
                  Request Revision
                </button>
                <button
                  onClick={() => toast("Escalated to General Counsel.")}
                  className="rounded-full border border-destructive/30 px-4 py-1.5 text-xs text-destructive"
                >
                  Escalate to Legal
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </EnterpriseShell>
  );
}
