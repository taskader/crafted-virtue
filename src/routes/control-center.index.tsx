import { createFileRoute, Link } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { SPECIALISTS, AGENT_ACTIVITY } from "@/lib/mock-data";
import { founderMetrics } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/control-center/")({
  head: () => ({ meta: [{ title: "Founder Control Center — Crafted Virtue" }] }),
  component: ControlCenter,
});

function ControlCenter() {
  const stats = [
    { l: "Active users", v: String(founderMetrics.activeUsers) },
    { l: "Trial conversions", v: String(founderMetrics.trialConversions) },
    { l: "Revenue (MRR)", v: founderMetrics.revenue },
    { l: "Agent success", v: founderMetrics.agentSuccessRate },
  ];
  return (
    <FounderShell>
      <div>
        <p className="text-xs uppercase tracking-widest text-parchment/60">Operating cockpit</p>
        <h1 className="mt-2 font-display text-5xl">Everything, in one view.</h1>
        <p className="mt-2 text-parchment/70">The unfiltered state of the Crafted Virtue practice — for the moments you want the whole picture.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-parchment/15 bg-parchment/5 p-5">
            <p className="text-[11px] uppercase tracking-widest text-parchment/60">{s.l}</p>
            <p className="mt-2 font-display text-3xl">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-parchment/15 bg-parchment/5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-widest text-parchment/60">Specialist team — live</p>
            <Link to="/control-center/agents" className="text-xs text-parchment/70 hover:text-parchment">All agents →</Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {AGENT_ACTIVITY.map((a) => (
              <div key={a.agent + a.time} className="flex items-start gap-3 rounded-xl border border-parchment/10 bg-parchment/5 p-3 text-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-parchment text-[10px] font-medium text-ink">{a.agent[0]}</span>
                <div><p><strong>{a.agent}</strong> <span className="text-parchment/70">{a.action}</span></p><p className="mt-0.5 text-xs text-parchment/60">{a.time}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-parchment/15 bg-parchment/5 p-6">
          <p className="text-[11px] uppercase tracking-widest text-parchment/60">Team roster</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SPECIALISTS.map((s) => (
              <li key={s.id} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-parchment text-[10px] text-ink">{s.name[0]}</span>{s.name}</span>
                <span className="text-parchment/60 text-xs">{s.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FounderShell>
  );
}
