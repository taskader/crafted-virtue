import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { PILLAR_DISTRIBUTION, REACH_SERIES } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Crafted Virtue" }] }),
  component: Analytics,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-5)"];

function Analytics() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Analytics</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">The signal, in plain English.</h1>
        <p className="mt-1 text-ink-soft">Beatrice translates noisy platform metrics into things you can act on.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Brand Score" value="82" delta="+11" />
        <Stat label="Influence Delta" value="+24%" delta="QoQ" />
        <Stat label="Weekly reach" value="31.6k" delta="+12%" />
        <Stat label="Engagement rate" value="5.7%" delta="+0.3 pts" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <SectionLabel>Reach trajectory</SectionLabel>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <LineChart data={REACH_SERIES}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="reach" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <SectionLabel>Share by pillar</SectionLabel>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={PILLAR_DISTRIBUTION} dataKey="share" nameKey="pillar" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {PILLAR_DISTRIBUTION.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-1.5 text-xs">
            {PILLAR_DISTRIBUTION.map((p, i) => (
              <div key={p.pillar} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS[i] }} />{p.pillar}</span>
                <span className="text-ink-soft">{p.share}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <SectionLabel>Engagement by week</SectionLabel>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={REACH_SERIES}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="engagement" fill="var(--brass)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
