import { createFileRoute, Link } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { AgentAvatar } from "@/components/agent-avatar";

export const Route = createFileRoute("/control-center/")({
  head: () => ({ meta: [{ title: "Founder Control Center — Crafted Virtue" }] }),
  component: ControlCenter,
});

const METRICS = [
  { l: "Active users", v: "128", d: "+12 wk" },
  { l: "Trial conversions", v: "21", d: "73% rate" },
  { l: "Content created", v: "842", d: "+9% wk" },
  { l: "Posts scheduled", v: "376", d: "next 14d" },
  { l: "Publishing failures", v: "3", tone: "warn" },
  { l: "Agent success rate", v: "96%", d: "+1.2 pts" },
  { l: "Workflow failures", v: "7", tone: "warn" },
  { l: "Revenue (MRR)", v: "$42,860", d: "+$3.1k" },
  { l: "Refund cases", v: "2", tone: "warn" },
  { l: "Support cases", v: "14", d: "4 open" },
  { l: "High-risk approvals", v: "5", tone: "danger" },
  { l: "Trial signups", v: "29", d: "this week" },
];

const PLATFORM = [
  { name: "Content generation", status: "operational", note: "p95 6.2s" },
  { name: "Publishing", status: "degraded", note: "1 channel token expired" },
  { name: "Analytics sync", status: "operational", note: "synced 4m ago" },
  { name: "Onboarding", status: "operational", note: "84% completion" },
  { name: "Billing", status: "operational", note: "0 webhook failures" },
  { name: "Support", status: "operational", note: "median 11m reply" },
  { name: "Media generation", status: "operational", note: "42 jobs / 24h" },
];

const AGENTS = [
  { name: "Olivia", metric: "Onboarding completion", v: "84%" },
  { name: "Leo", metric: "Draft acceptance", v: "78%" },
  { name: "Sam", metric: "Briefing generation", v: "96%" },
  { name: "Talia", metric: "QA pass rate", v: "91%" },
  { name: "Vincent", metric: "Media jobs completed", v: "42" },
  { name: "Konrad", metric: "Support resolution", v: "89%" },
  { name: "Beatrice", metric: "Billing cases resolved", v: "92%" },
];

const HIGH_RISK = [
  { title: "Unverified claim in enterprise post", user: "Helios Bio · Anya R.", severity: "high" },
  { title: "Refund approval over threshold", user: "Sterling Capital · Marcus L.", severity: "high" },
  { title: "Failed social token for high-value client", user: "Northwind · Priya S.", severity: "medium" },
  { title: "Enterprise compliance review pending", user: "Verity Labs · Ethan T.", severity: "medium" },
];

const WORKFLOWS = [
  { name: "publish.linkedin", user: "Anya R.", status: "failed", error: "Token expired", retries: 2, when: "12m ago" },
  { name: "media.generate.video", user: "Marcus L.", status: "failed", error: "Render timeout", retries: 1, when: "38m ago" },
  { name: "analytics.weekly.briefing", user: "Priya S.", status: "running", error: "—", retries: 0, when: "now" },
  { name: "content.fact_check", user: "Ethan T.", status: "failed", error: "Source unreachable", retries: 3, when: "1h ago" },
  { name: "billing.invoice.retry", user: "Riley K.", status: "succeeded", error: "—", retries: 1, when: "2h ago" },
];

const REVENUE = [
  { l: "MRR", v: "$42,860" },
  { l: "Trial users", v: "29" },
  { l: "Past due", v: "3" },
  { l: "Refund cases", v: "2" },
  { l: "Upgrade candidates", v: "11" },
];

const SUPPORT = [
  { id: "S-1284", subject: "Publishing failed on LinkedIn", user: "Anya R.", priority: "P1", owner: "Talia", sla: "1h 12m" },
  { id: "S-1283", subject: "Voice score lower after edits", user: "Marcus L.", priority: "P2", owner: "Leo", sla: "4h 02m" },
  { id: "S-1281", subject: "Refund request — annual plan", user: "Riley K.", priority: "P2", owner: "Beatrice", sla: "6h 47m" },
  { id: "S-1278", subject: "SSO setup for enterprise tenant", user: "Verity Labs", priority: "P1", owner: "Enterprise", sla: "47m" },
];

function statusDot(s: string) {
  if (s === "operational" || s === "succeeded") return "bg-success";
  if (s === "degraded" || s === "running") return "bg-warning";
  return "bg-destructive";
}

function severityChip(s: string) {
  const map: Record<string, string> = {
    high: "bg-destructive/25 text-parchment",
    medium: "bg-warning/30 text-parchment",
    low: "bg-parchment/15 text-parchment/80",
  };
  return map[s] ?? map.low;
}

function ControlCenter() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Operating cockpit</p>
        <h1 className="mt-2 font-display text-4xl">Founder Control Center</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">
          Monitor user health, agent performance, publishing workflows, revenue, support, and high-risk exceptions.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {METRICS.map((m) => (
          <div key={m.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-parchment/60">{m.l}</p>
            <p className={`mt-2 font-display text-2xl ${m.tone === "danger" ? "text-destructive" : m.tone === "warn" ? "text-warning" : "text-parchment"}`}>
              {m.v}
            </p>
            {m.d && <p className="mt-1 text-[11px] text-parchment/60">{m.d}</p>}
          </div>
        ))}
      </div>

      <Section title="Platform overview">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {PLATFORM.map((p) => (
            <div key={p.name} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${statusDot(p.status)}`} />
                <p className="text-xs uppercase tracking-wide text-parchment/60">{p.status}</p>
              </div>
              <p className="mt-2 font-medium">{p.name}</p>
              <p className="mt-1 text-[11px] text-parchment/60">{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Agent monitoring" right={<Link to="/control-center/agents" className="text-xs text-parchment/70 hover:text-parchment">All agents →</Link>}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AGENTS.map((a) => (
            <div key={a.name} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
              <div className="flex items-center gap-3">
                <AgentAvatar name={a.name} size="lg" ring={false} className="ring-2 ring-parchment/20" />
                <p className="font-display text-lg">{a.name}</p>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-wide text-parchment/60">{a.metric}</p>
              <p className="mt-1 font-display text-2xl">{a.v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="High-risk approval queue" right={<Link to="/control-center/approvals" className="text-xs text-parchment/70 hover:text-parchment">Open queue →</Link>}>
        <div className="space-y-2">
          {HIGH_RISK.map((h) => (
            <div key={h.title} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-parchment/15 bg-parchment/5 p-4">
              <div>
                <p className="font-medium">{h.title}</p>
                <p className="text-xs text-parchment/60">{h.user}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${severityChip(h.severity)}`}>{h.severity}</span>
                <button className="rounded-full bg-parchment px-3 py-1 text-xs text-ink">Review</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Workflow failures" right={<Link to="/control-center/workflows" className="text-xs text-parchment/70 hover:text-parchment">All workflows →</Link>}>
        <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
              <tr>
                <th className="px-4 py-3">Workflow</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Error</th>
                <th className="px-4 py-3">Retries</th>
                <th className="px-4 py-3">Last run</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/10">
              {WORKFLOWS.map((w) => (
                <tr key={w.name + w.when}>
                  <td className="px-4 py-3 font-mono text-xs">{w.name}</td>
                  <td className="px-4 py-3">{w.user}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDot(w.status)}`} />
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-parchment/70">{w.error}</td>
                  <td className="px-4 py-3">{w.retries}</td>
                  <td className="px-4 py-3 text-parchment/60">{w.when}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Retry</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Revenue & billing health" right={<Link to="/control-center/revenue" className="text-xs text-parchment/70 hover:text-parchment">Details →</Link>}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {REVENUE.map((r) => (
              <div key={r.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
                <p className="text-[10px] uppercase tracking-widest text-parchment/60">{r.l}</p>
                <p className="mt-2 font-display text-2xl">{r.v}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Support escalations" right={<Link to="/control-center/support" className="text-xs text-parchment/70 hover:text-parchment">All cases →</Link>}>
          <div className="space-y-2">
            {SUPPORT.map((s) => (
              <div key={s.id} className="rounded-xl border border-parchment/15 bg-parchment/5 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{s.subject}</p>
                    <p className="text-xs text-parchment/60">{s.id} · {s.user} · owner {s.owner}</p>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.priority === "P1" ? "bg-destructive/30" : "bg-warning/25"}`}>
                      {s.priority}
                    </span>
                    <p className="mt-1 text-[11px] text-parchment/60">SLA {s.sla}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </FounderShell>
  );
}

function Section({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}
