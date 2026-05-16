import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/incidents")({
  head: () => ({ meta: [{ title: "Incidents — Control Center" }] }),
  component: IncidentsPage,
});

const ACTIVE = [
  { id: "INC-0042", title: "LinkedIn publishing degraded", severity: "SEV2", impact: "1 tenant, 3 failed posts", started: "32m ago", owner: "Talia", status: "investigating" },
  { id: "INC-0041", title: "Voice model latency above p95", severity: "SEV3", impact: "Drafting 18% slower", started: "1h 12m ago", owner: "Leo", status: "monitoring" },
];

const RESOLVED = [
  { id: "INC-0040", title: "Newsletter send retry loop", severity: "SEV2", duration: "1h 04m", resolved: "yesterday", postmortem: "scheduled" },
  { id: "INC-0039", title: "Stripe webhook backlog", severity: "SEV3", duration: "22m", resolved: "2d ago", postmortem: "published" },
  { id: "INC-0038", title: "Media render queue stuck", severity: "SEV2", duration: "2h 18m", resolved: "5d ago", postmortem: "published" },
];

const KPI = [
  { l: "Active incidents", v: "2" },
  { l: "SEV1 (30d)", v: "0" },
  { l: "Mean time to resolve", v: "47m" },
  { l: "Uptime (30d)", v: "99.94%" },
];

function sevChip(s: string) {
  if (s === "SEV1") return "bg-destructive/40";
  if (s === "SEV2") return "bg-destructive/25";
  return "bg-warning/25";
}

function IncidentsPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Incidents</p>
        <h1 className="mt-2 font-display text-4xl">Active & resolved incidents</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Anything customer-affecting lives here, with owner and status visible.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((k) => (
          <div key={k.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-parchment/60">{k.l}</p>
            <p className="mt-2 font-display text-2xl">{k.v}</p>
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Active</h2>
        {ACTIVE.map((i) => (
          <div key={i.id} className="rounded-xl border border-parchment/15 bg-parchment/5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sevChip(i.severity)}`}>{i.severity}</span>
                  <span className="font-mono text-xs text-parchment/60">{i.id}</span>
                </div>
                <p className="mt-2 font-display text-lg">{i.title}</p>
                <p className="mt-1 text-sm text-parchment/70">{i.impact}</p>
              </div>
              <div className="flex flex-col items-end gap-2 text-xs text-parchment/60">
                <span>started {i.started}</span>
                <span>owner {i.owner}</span>
                <span className="inline-flex items-center gap-1.5 text-parchment">
                  <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                  {i.status}
                </span>
                <div className="flex gap-2">
                  <button className="rounded-full bg-parchment px-3 py-1 text-xs text-ink">Open</button>
                  <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Update</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Resolved</h2>
        <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Resolved</th>
                <th className="px-4 py-3">Postmortem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/10">
              {RESOLVED.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sevChip(r.severity)}`}>{r.severity}</span>
                  </td>
                  <td className="px-4 py-3 text-parchment/70">{r.duration}</td>
                  <td className="px-4 py-3 text-parchment/60">{r.resolved}</td>
                  <td className="px-4 py-3 text-parchment/70">{r.postmortem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FounderShell>
  );
}
