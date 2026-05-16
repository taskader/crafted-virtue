import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, PolarAngleAxis, PolarGrid, Radar, RadarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/enterprise/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Enterprise" }] }),
  component: EnterpriseAnalytics,
});

const SCORES = [
  { exec: "Alicia", score: 81 },
  { exec: "David", score: 78 },
  { exec: "Maya", score: 74 },
  { exec: "Jon", score: 69 },
  { exec: "Rina", score: 79 },
];

const VOLUME = [
  { exec: "Alicia", posts: 18 },
  { exec: "David", posts: 14 },
  { exec: "Maya", posts: 11 },
  { exec: "Jon", posts: 7 },
  { exec: "Rina", posts: 16 },
];

const PILLARS = [
  { pillar: "Operating", value: 88 },
  { pillar: "Market", value: 82 },
  { pillar: "Strategy", value: 74 },
  { pillar: "Governance", value: 71 },
  { pillar: "Talent", value: 64 },
  { pillar: "Innovation", value: 69 },
];

const CHANNELS = [
  { channel: "LinkedIn", reach: 142000, engagement: 5.4 },
  { channel: "Newsletter", reach: 38000, engagement: 11.2 },
  { channel: "X", reach: 64000, engagement: 3.1 },
  { channel: "Blog", reach: 12000, engagement: 2.4 },
];

const TURNAROUND = [
  { week: "W1", hours: 9.4 },
  { week: "W2", hours: 7.8 },
  { week: "W3", hours: 6.1 },
  { week: "W4", hours: 5.4 },
  { week: "W5", hours: 4.9 },
  { week: "W6", hours: 4.2 },
];

const tooltipStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 };

function EnterpriseAnalytics() {
  return (
    <EnterpriseShell>
      <header className="max-w-2xl">
        <SectionLabel>Enterprise analytics</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Leadership signal, in one view</h1>
        <p className="mt-2 text-ink-soft">Sam's enterprise rollup across the entire executive team.</p>
      </header>

      <Card className="bg-ink p-8 text-parchment">
        <SectionLabel>
          <span className="text-parchment/70">Sam's enterprise briefing</span>
        </SectionLabel>
        <p className="mt-3 max-w-3xl font-display text-xl leading-snug">
          Your executive team is strongest in operating lessons and market analysis. The largest opportunity is creating clearer differentiation between CTO and Partner-level narratives.
        </p>
        <div className="mt-5 flex gap-3">
          <button className="rounded-full bg-parchment px-5 py-2 text-xs font-medium text-ink">Generate next-quarter plan</button>
          <button className="rounded-full border border-parchment/30 px-5 py-2 text-xs">Share with leadership</button>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>Executive brand score comparison</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={SCORES}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="exec" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Content volume by executive (30d)</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={VOLUME}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="exec" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="posts" fill="var(--brass)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Engagement by pillar</SectionLabel>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <RadarChart data={PILLARS}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="pillar" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Channel performance</SectionLabel>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="pb-3 font-medium">Channel</th>
                  <th className="pb-3 font-medium">Reach</th>
                  <th className="pb-3 font-medium">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {CHANNELS.map((c) => (
                  <tr key={c.channel}>
                    <td className="py-3 font-medium">{c.channel}</td>
                    <td className="py-3">{c.reach.toLocaleString()}</td>
                    <td className="py-3 text-success">{c.engagement}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <SectionLabel>Approval turnaround time (hours)</SectionLabel>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <LineChart data={TURNAROUND}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="hours" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs text-ink-soft">Median time from draft submitted to publish-ready across the team.</p>
      </Card>
    </EnterpriseShell>
  );
}
