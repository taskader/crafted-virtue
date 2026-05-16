import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { REACH_SERIES } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/enterprise/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Org analytics</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">The bench, in one chart.</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <Stat label="Org reach (Q)" value="1.2M" delta="+38%" />
        <Stat label="Avg Brand Score" value="74" delta="+8" />
        <Stat label="Inbound (target accts)" value="41%" delta="QoQ" />
        <Stat label="Share of voice" value="22%" delta="+5 pts" />
      </div>
      <Card className="mt-6 p-6">
        <SectionLabel>Cumulative reach — executive bench</SectionLabel>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <AreaChart data={REACH_SERIES.map((r) => ({ ...r, reach: r.reach * 6 }))}>
              <defs>
                <linearGradient id="ent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="reach" stroke="var(--primary)" fill="url(#ent)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </EnterpriseShell>
  ),
});
