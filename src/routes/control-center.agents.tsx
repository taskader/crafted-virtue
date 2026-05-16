import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/agents")({
  head: () => ({ meta: [{ title: "Agents — Control Center" }] }),
  component: AgentsPage,
});

const AGENTS = [
  { name: "Olivia", role: "Onboarding strategist", metric: "Onboarding completion", v: "84%", jobs: 128, failures: 2, p95: "3.1s" },
  { name: "Leo", role: "Voice & drafting lead", metric: "Draft acceptance", v: "78%", jobs: 842, failures: 14, p95: "6.2s" },
  { name: "Sam", role: "Analytics & briefings", metric: "Briefing generation", v: "96%", jobs: 96, failures: 1, p95: "4.4s" },
  { name: "Talia", role: "Quality & brand safety", metric: "QA pass rate", v: "91%", jobs: 612, failures: 4, p95: "2.1s" },
  { name: "Vincent", role: "Media generation", metric: "Media jobs completed", v: "42", jobs: 42, failures: 3, p95: "38s" },
  { name: "Konrad", role: "Support concierge", metric: "Support resolution", v: "89%", jobs: 184, failures: 0, p95: "11m" },
  { name: "Beatrice", role: "Billing operations", metric: "Billing cases resolved", v: "92%", jobs: 64, failures: 1, p95: "2h" },
  { name: "Alex", role: "Product help", metric: "Help thread CSAT", v: "4.7 / 5", jobs: 218, failures: 0, p95: "9m" },
];

const FAILURES = [
  { agent: "Leo", task: "Generate LinkedIn variant", error: "Voice model timeout", when: "14m ago" },
  { agent: "Vincent", task: "Render reel #4291", error: "Asset 404", when: "38m ago" },
  { agent: "Talia", task: "Fact-check claim #882", error: "Source unreachable", when: "1h ago" },
];

function AgentsPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Agents</p>
        <h1 className="mt-2 font-display text-4xl">Agent performance</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Per-specialist throughput, success rate, and recent failures.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {AGENTS.map((a) => (
          <div key={a.name} className="rounded-xl border border-parchment/15 bg-parchment/5 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-parchment text-sm text-ink">{a.name[0]}</span>
              <div>
                <p className="font-display text-lg">{a.name}</p>
                <p className="text-xs text-parchment/60">{a.role}</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-parchment/60">{a.metric}</p>
            <p className="mt-1 font-display text-3xl">{a.v}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-lg bg-parchment/5 p-2">
                <p className="text-parchment/60">Jobs</p>
                <p className="mt-0.5 font-medium">{a.jobs}</p>
              </div>
              <div className="rounded-lg bg-parchment/5 p-2">
                <p className="text-parchment/60">Failures</p>
                <p className={`mt-0.5 font-medium ${a.failures > 0 ? "text-warning" : ""}`}>{a.failures}</p>
              </div>
              <div className="rounded-lg bg-parchment/5 p-2">
                <p className="text-parchment/60">p95</p>
                <p className="mt-0.5 font-medium">{a.p95}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Recent agent failures</h2>
        <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
              <tr>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Error</th>
                <th className="px-4 py-3">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/10">
              {FAILURES.map((f, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium">{f.agent}</td>
                  <td className="px-4 py-3">{f.task}</td>
                  <td className="px-4 py-3 text-warning">{f.error}</td>
                  <td className="px-4 py-3 text-parchment/60">{f.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </FounderShell>
  );
}
