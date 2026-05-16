import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/workflows")({
  head: () => ({ meta: [{ title: "Workflows — Control Center" }] }),
  component: WorkflowsPage,
});

const WORKFLOWS = [
  { name: "publish.linkedin", user: "Anya R.", status: "failed", error: "Token expired", retries: 2, when: "12m ago", duration: "1.8s" },
  { name: "media.generate.video", user: "Marcus L.", status: "failed", error: "Render timeout", retries: 1, when: "38m ago", duration: "180s" },
  { name: "analytics.weekly.briefing", user: "Priya S.", status: "running", error: "—", retries: 0, when: "now", duration: "—" },
  { name: "content.fact_check", user: "Ethan T.", status: "failed", error: "Source unreachable", retries: 3, when: "1h ago", duration: "4.1s" },
  { name: "billing.invoice.retry", user: "Riley K.", status: "succeeded", error: "—", retries: 1, when: "2h ago", duration: "0.6s" },
  { name: "onboarding.voice_intake", user: "Dana P.", status: "succeeded", error: "—", retries: 0, when: "3h ago", duration: "12s" },
  { name: "publish.newsletter", user: "Sam O.", status: "succeeded", error: "—", retries: 0, when: "4h ago", duration: "2.4s" },
];

const SUMMARY = [
  { l: "24h executions", v: "1,284" },
  { l: "Success rate", v: "96%" },
  { l: "Failed (24h)", v: "7" },
  { l: "Running now", v: "3" },
  { l: "Avg duration", v: "3.2s" },
  { l: "Auto-retried", v: "11" },
];

function dot(s: string) {
  return s === "succeeded" ? "bg-success" : s === "running" ? "bg-warning" : "bg-destructive";
}

function WorkflowsPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Workflows</p>
        <h1 className="mt-2 font-display text-4xl">Workflow executions</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Internal jobs across content, publishing, analytics, billing, and onboarding.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SUMMARY.map((s) => (
          <div key={s.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-parchment/60">{s.l}</p>
            <p className="mt-2 font-display text-2xl">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
        <table className="w-full text-sm">
          <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
            <tr>
              <th className="px-4 py-3">Workflow</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Error</th>
              <th className="px-4 py-3">Retries</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Last run</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment/10">
            {WORKFLOWS.map((w, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-mono text-xs">{w.name}</td>
                <td className="px-4 py-3">{w.user}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot(w.status)}`} />
                    {w.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-parchment/70">{w.error}</td>
                <td className="px-4 py-3">{w.retries}</td>
                <td className="px-4 py-3 text-parchment/60">{w.duration}</td>
                <td className="px-4 py-3 text-parchment/60">{w.when}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Retry</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FounderShell>
  );
}
