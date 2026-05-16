import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";

export const Route = createFileRoute("/control-center/revenue")({
  head: () => ({ meta: [{ title: "Revenue — Control Center" }] }),
  component: RevenuePage,
});

const KPI = [
  { l: "MRR", v: "$42,860", d: "+$3,120 wk" },
  { l: "ARR", v: "$514,320" },
  { l: "Trial users", v: "29" },
  { l: "Trial → paid", v: "73%" },
  { l: "Past due", v: "3" },
  { l: "Refund cases", v: "2" },
  { l: "Net new", v: "+11" },
  { l: "Churn (30d)", v: "1.4%" },
];

const PLANS = [
  { name: "Core", price: "$179", users: 38, mrr: "$6,802" },
  { name: "Pro", price: "$299", users: 81, mrr: "$24,219" },
  { name: "Enterprise", price: "from $1,259", users: 5, mrr: "$11,839" },
];

const SUBS = [
  { user: "Anya Reyes — Helios Bio", plan: "Pro", status: "active", since: "Jan 12", next: "Apr 12" },
  { user: "Marcus Lim — Sterling Capital", plan: "Pro", status: "active", since: "Feb 04", next: "Apr 04" },
  { user: "Priya Shah — Northwind", plan: "Core", status: "past_due", since: "Dec 09", next: "Mar 09" },
  { user: "Ethan Torres — Verity Labs", plan: "Enterprise", status: "active", since: "Nov 22", next: "May 22" },
  { user: "Riley Kim — Riley Kim Studio", plan: "Trial", status: "trialing", since: "Mar 12", next: "Mar 19" },
];

const REFUNDS = [
  { user: "Dana Park", amount: "$299", reason: "Duplicate charge", status: "approved" },
  { user: "Sam Okafor", amount: "$179", reason: "Cancelled inside trial window", status: "pending" },
];

function statusChip(s: string) {
  if (s === "active" || s === "approved") return "bg-success/30";
  if (s === "trialing" || s === "pending") return "bg-warning/30";
  return "bg-destructive/30";
}

function RevenuePage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Revenue</p>
        <h1 className="mt-2 font-display text-4xl">Subscriptions, plans & refunds</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Beatrice keeps the book of business honest. This is the ledger view.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {KPI.map((k) => (
          <div key={k.l} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-parchment/60">{k.l}</p>
            <p className="mt-2 font-display text-2xl">{k.v}</p>
            {k.d && <p className="mt-1 text-[11px] text-parchment/60">{k.d}</p>}
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Plan breakdown</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className="rounded-xl border border-parchment/15 bg-parchment/5 p-5">
              <p className="font-display text-xl">{p.name}</p>
              <p className="mt-1 text-xs text-parchment/60">{p.price}/mo</p>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-widest text-parchment/60">Users</span>
                <span className="font-display text-2xl">{p.users}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-widest text-parchment/60">MRR</span>
                <span className="font-display text-2xl">{p.mrr}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Subscriptions</h2>
        <div className="overflow-x-auto rounded-xl border border-parchment/15 bg-parchment/5">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] uppercase tracking-wide text-parchment/60">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Since</th>
                <th className="px-4 py-3">Next charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment/10">
              {SUBS.map((s) => (
                <tr key={s.user}>
                  <td className="px-4 py-3">{s.user}</td>
                  <td className="px-4 py-3">{s.plan}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusChip(s.status)}`}>
                      {s.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-parchment/70">{s.since}</td>
                  <td className="px-4 py-3 text-parchment/70">{s.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">Refund cases</h2>
        <div className="space-y-2">
          {REFUNDS.map((r) => (
            <div key={r.user} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-parchment/15 bg-parchment/5 p-4">
              <div>
                <p className="font-medium">{r.user}</p>
                <p className="text-xs text-parchment/60">{r.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-lg">{r.amount}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusChip(r.status)}`}>{r.status}</span>
                <button className="rounded-full border border-parchment/20 px-3 py-1 text-xs">Open</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FounderShell>
  );
}
