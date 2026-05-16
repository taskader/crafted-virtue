import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/support")({
  head: () => ({ meta: [{ title: "Support — Control Center" }] }),
  component: SupportPage,
});

const KPI = [
  { l: "Open cases", v: "14" },
  { l: "P1 open", v: "2" },
  { l: "Median first reply", v: "11m" },
  { l: "Breaching SLA", v: "1" },
  { l: "CSAT (30d)", v: "4.7 / 5" },
  { l: "Resolved (24h)", v: "22" },
];

const CASES = [
  { id: "S-1284", subject: "Publishing failed on LinkedIn", user: "Anya R. · Helios Bio", priority: "P1", owner: "Talia", sla: "1h 12m", opened: "12m ago", status: "in_progress" },
  { id: "S-1283", subject: "Voice score lower after edits", user: "Marcus L. · Sterling Capital", priority: "P2", owner: "Leo", sla: "4h 02m", opened: "1h ago", status: "in_progress" },
  { id: "S-1281", subject: "Refund request — annual plan", user: "Riley K.", priority: "P2", owner: "Beatrice", sla: "6h 47m", opened: "3h ago", status: "waiting_user" },
  { id: "S-1278", subject: "SSO setup for enterprise tenant", user: "Verity Labs", priority: "P1", owner: "Enterprise", sla: "47m", opened: "4h ago", status: "in_progress" },
  { id: "S-1276", subject: "Newsletter import failing", user: "Priya S.", priority: "P3", owner: "Konrad", sla: "1d 02h", opened: "1d ago", status: "in_progress" },
  { id: "S-1273", subject: "How do I add a co-author?", user: "Dana P.", priority: "P3", owner: "Alex", sla: "2d", opened: "1d ago", status: "in_progress" },
];

function priorityChip(p: string) {
  if (p === "P1") return "bg-destructive/30";
  if (p === "P2") return "bg-warning/30";
  return "bg-parchment/15";
}

function SupportPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Support</p>
        <h1 className="mt-2 font-display text-4xl">Open cases & escalations</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Konrad routes everything. P1 + SLA-breaching cases surface here first.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {KPI.map((k) => (
          <div key={k.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-parchment/60">{k.l}</p>
            <p className="mt-2 font-display text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
        <table className="w-full text-sm">
          <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
            <tr>
              <th className="px-4 py-3">Case</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">SLA remaining</th>
              <th className="px-4 py-3">Opened</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment/10">
            {CASES.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{c.subject}</p>
                  <p className="text-xs text-parchment/60">{c.id} · {c.status.replace("_", " ")}</p>
                </td>
                <td className="px-4 py-3">{c.user}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityChip(c.priority)}`}>{c.priority}</span>
                </td>
                <td className="px-4 py-3">{c.owner}</td>
                <td className="px-4 py-3 text-parchment/70">{c.sla}</td>
                <td className="px-4 py-3 text-parchment/60">{c.opened}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FounderShell>
  );
}
