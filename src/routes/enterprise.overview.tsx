import { createFileRoute, Link } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/enterprise/overview")({
  head: () => ({ meta: [{ title: "Enterprise Overview — Crafted Virtue" }] }),
  component: Overview,
});

const EXECS = [
  { name: "Alicia Morgan", title: "CEO", score: 81, posts: 18, pending: 2 },
  { name: "David Chen", title: "CMO", score: 78, posts: 14, pending: 3 },
  { name: "Maya Patel", title: "Partner", score: 74, posts: 11, pending: 1 },
  { name: "Jon Ellis", title: "CFO", score: 69, posts: 7, pending: 4 },
  { name: "Rina Okafor", title: "CTO", score: 79, posts: 16, pending: 2 },
];

function scoreTone(s: number) {
  if (s >= 80) return "text-success";
  if (s >= 75) return "text-ink";
  return "text-warning";
}

function Overview() {
  return (
    <EnterpriseShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <SectionLabel>Enterprise</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Enterprise Overview</h1>
          <p className="mt-2 text-ink-soft">Northstar Ventures · 5 seats · Admin David Chen</p>
        </div>
        <div className="flex gap-2">
          <Link to="/enterprise/team" className="rounded-full border border-border px-4 py-2 text-xs">Manage team</Link>
          <Link to="/enterprise/approvals" className="rounded-full bg-ink px-4 py-2 text-xs text-parchment">Open approval queue</Link>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat label="Executives active" value="5" />
        <Stat label="Posts awaiting approval" value="12" delta="3 high-risk" tone="down" />
        <Stat label="Scheduled posts" value="28" delta="next 14d" />
        <Stat label="Brand rule compliance" value="94%" delta="+2 pts" />
        <Stat label="Average Brand Score" value="76" delta="+4 wk" />
        <Stat label="Publishing failures" value="1" tone="down" />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Leadership visibility rollup</SectionLabel>
          <Link to="/enterprise/analytics" className="text-xs text-ink-soft hover:text-ink">Open analytics →</Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="pb-3 font-medium">Executive</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Brand Score</th>
                <th className="pb-3 font-medium">Posts (30d)</th>
                <th className="pb-3 font-medium">Pending</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {EXECS.map((e) => (
                <tr key={e.name}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs text-parchment">{e.name.split(" ").map((p) => p[0]).join("")}</span>
                      <span className="font-medium">{e.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-ink-soft">{e.title}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-ink" style={{ width: `${e.score}%` }} />
                      </div>
                      <span className={`font-display text-lg ${scoreTone(e.score)}`}>{e.score}</span>
                    </div>
                  </td>
                  <td className="py-3">{e.posts}</td>
                  <td className="py-3">{e.pending}</td>
                  <td className="py-3 text-right">
                    <button className="rounded-full border border-border px-3 py-1 text-xs">View profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>This week's narrative</SectionLabel>
          <p className="mt-3 font-display text-xl leading-snug">
            Northstar's strongest signal this week is operating discipline — three executives published practical examples that ranked top quartile against peers.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Jon Ellis (CFO) has the lowest publishing cadence; one approved newsletter draft is waiting on his sign-off.
          </p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Seats & billing</SectionLabel>
          <p className="mt-3 text-sm text-ink-soft">5 of 5 seats used.</p>
          <p className="mt-1 text-sm text-ink-soft">Additional seats $250 / seat / month.</p>
          <button className="mt-5 rounded-full bg-ink px-4 py-2 text-xs text-parchment">Add seats</button>
        </Card>
      </div>
    </EnterpriseShell>
  );
}
