import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/users")({
  head: () => ({ meta: [{ title: "Users — Control Center" }] }),
  component: UsersPage,
});

const USERS = [
  { name: "Anya Reyes", company: "Helios Bio", plan: "Pro", onboarding: 100, health: "healthy", last: "12m ago", drafts: 48 },
  { name: "Marcus Lim", company: "Sterling Capital", plan: "Pro", onboarding: 100, health: "healthy", last: "1h ago", drafts: 34 },
  { name: "Priya Shah", company: "Northwind", plan: "Core", onboarding: 78, health: "at_risk", last: "3d ago", drafts: 6 },
  { name: "Ethan Torres", company: "Verity Labs", plan: "Enterprise", onboarding: 100, health: "healthy", last: "21m ago", drafts: 72 },
  { name: "Riley Kim", company: "Riley Kim Studio", plan: "Trial", onboarding: 40, health: "stalled", last: "5d ago", drafts: 2 },
  { name: "Dana Park", company: "Park Advisory", plan: "Pro", onboarding: 100, health: "healthy", last: "2h ago", drafts: 28 },
  { name: "Sam Okafor", company: "Okafor Capital", plan: "Trial", onboarding: 62, health: "at_risk", last: "1d ago", drafts: 4 },
];

const SUMMARY = [
  { l: "Active users", v: "128" },
  { l: "Trial", v: "29" },
  { l: "Paid", v: "94" },
  { l: "Enterprise", v: "5" },
  { l: "Stalled onboarding", v: "8" },
  { l: "At-risk", v: "11" },
];

function healthChip(h: string) {
  if (h === "healthy") return "bg-success/30 text-parchment";
  if (h === "at_risk") return "bg-warning/30 text-parchment";
  return "bg-destructive/30 text-parchment";
}

function UsersPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Users</p>
        <h1 className="mt-2 font-display text-4xl">User health & activity</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Onboarding completion, plan, last activity, and intervention candidates.</p>
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
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Onboarding</th>
              <th className="px-4 py-3">Health</th>
              <th className="px-4 py-3">Drafts</th>
              <th className="px-4 py-3">Last active</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment/10">
            {USERS.map((u) => (
              <tr key={u.name}>
                <td className="px-4 py-3">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-parchment/60">{u.company}</p>
                </td>
                <td className="px-4 py-3">{u.plan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-parchment/10">
                      <div className="h-full bg-parchment" style={{ width: `${u.onboarding}%` }} />
                    </div>
                    <span className="text-xs text-parchment/70">{u.onboarding}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${healthChip(u.health)}`}>
                    {u.health.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3">{u.drafts}</td>
                <td className="px-4 py-3 text-parchment/60">{u.last}</td>
                <td className="px-4 py-3 text-right">
                  <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Intervene</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FounderShell>
  );
}
