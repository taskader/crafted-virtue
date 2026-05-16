import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Control Center" }] }),
  component: ApprovalsPage,
});

const HIGH_RISK = [
  { title: "Unverified claim in enterprise post", user: "Helios Bio · Anya R.", channel: "LinkedIn", reason: "Citation missing for clinical claim", severity: "high", waiting: "12m" },
  { title: "Refund approval over threshold", user: "Sterling Capital · Marcus L.", channel: "Billing", reason: "$2,400 exceeds auto-approve limit", severity: "high", waiting: "1h" },
  { title: "Failed social token for high-value client", user: "Northwind · Priya S.", channel: "X", reason: "Token expired, queue paused", severity: "medium", waiting: "3h" },
  { title: "Enterprise compliance review pending", user: "Verity Labs · Ethan T.", channel: "Newsletter", reason: "Awaiting legal sign-off", severity: "medium", waiting: "6h" },
];

const ENTERPRISE = [
  { title: "Q1 board narrative — final draft", user: "Verity Labs", reviewers: "Legal, Brand, CEO", waiting: "4h" },
  { title: "Quarterly market commentary", user: "Sterling Capital", reviewers: "Compliance, Brand", waiting: "9h" },
  { title: "Executive bio update", user: "Helios Bio", reviewers: "Legal, Brand", waiting: "1d" },
];

function ApprovalsPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Approvals</p>
        <h1 className="mt-2 font-display text-4xl">High-risk & enterprise approvals</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Exceptions Talia flagged for human review before publishing or release.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">High-risk queue</h2>
        {HIGH_RISK.map((h) => (
          <div key={h.title} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">{h.title}</p>
                <p className="mt-0.5 text-xs text-parchment/60">{h.user} · {h.channel}</p>
                <p className="mt-2 text-sm text-parchment/80">{h.reason}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${h.severity === "high" ? "bg-destructive/30" : "bg-warning/30"}`}>
                  {h.severity}
                </span>
                <p className="text-[11px] text-parchment/60">waiting {h.waiting}</p>
                <div className="flex gap-2">
                  <button className="rounded-full bg-parchment px-3 py-1 text-xs text-ink">Approve</button>
                  <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Enterprise approvals</h2>
        <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Tenant</th>
                <th className="px-4 py-3">Reviewers</th>
                <th className="px-4 py-3">Waiting</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/10">
              {ENTERPRISE.map((e) => (
                <tr key={e.title}>
                  <td className="px-4 py-3 font-medium">{e.title}</td>
                  <td className="px-4 py-3">{e.user}</td>
                  <td className="px-4 py-3 text-parchment/70">{e.reviewers}</td>
                  <td className="px-4 py-3 text-parchment/60">{e.waiting}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FounderShell>
  );
}
