import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { AgentAvatar } from "@/components/agent-avatar";
import { Illustration } from "@/components/illustration";
import { REACH_SERIES } from "@/lib/mock-data";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Crafted Virtue" }] }),
  component: Analytics,
});

const PILLAR_RADAR = [
  { pillar: "AI Strategy", score: 92 },
  { pillar: "Leadership", score: 78 },
  { pillar: "Operating", score: 84 },
  { pillar: "Market Signal", score: 66 },
  { pillar: "Hard Lessons", score: 71 },
  { pillar: "Governance", score: 88 },
];

const CHANNEL_COMPARE = [
  { channel: "LinkedIn", reach: 28400, engagement: 6.8 },
  { channel: "X", reach: 12100, engagement: 4.2 },
  { channel: "Newsletter", reach: 9100, engagement: 11.4 },
  { channel: "Blog", reach: 3100, engagement: 2.1 },
];

const TOP = [
  { title: "Why Biotech Leaders Need Better AI Governance", channel: "LinkedIn", reach: "18.2k", eng: "9.1%", saves: 412 },
  { title: "Three Questions Before Any Board Update", channel: "Newsletter", reach: "9.1k", eng: "12.4%", saves: 287 },
  { title: "Earned trust > earned media", channel: "X", reach: "6.4k", eng: "5.7%", saves: 144 },
];

const UNDER = [
  { title: "The future of AI is bright", channel: "LinkedIn", reach: "1.1k", eng: "1.2%", note: "Too abstract, no operating example" },
  { title: "Quick thoughts on the news cycle", channel: "X", reach: "640", eng: "0.9%", note: "Generic commentary, no proprietary angle" },
  { title: "Reflections on Q1", channel: "Blog", reach: "320", eng: "1.0%", note: "Buried thesis, slow opening" },
];

const RECS = [
  "Double down on board-level AI governance.",
  "Turn the top LinkedIn post into a carousel.",
  "Use fewer broad AI claims and more operational examples.",
  "Publish on Tuesday morning for higher engagement.",
  "Create a newsletter expansion from the strongest thread.",
];

function Analytics() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <SectionLabel>Analytics</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Analytics</h1>
          <p className="mt-2 text-ink-soft">Sam turns performance into strategy, not vanity metrics.</p>
        </div>
        <button
          onClick={() => toast.success("Sam is drafting next week's plan.")}
          className="rounded-full bg-ink px-5 py-2 text-xs font-medium text-parchment"
        >
          Generate Next Week's Plan
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat label="Brand Score" value="72" delta="+11 this month" />
        <Stat label="Influence Delta" value="+18" delta="QoQ" />
        <Stat label="Reach Trend" value="+24%" delta="vs last 8w" />
        <Stat label="Engagement" value="+6.8%" delta="+0.4 pts" />
        <Stat label="Audience Growth" value="+12.4%" delta="30 days" />
        <Stat label="Top Pillar" value="AI Strategy" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>Reach trend</SectionLabel>
          <div className="mt-4 h-64">
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
          <SectionLabel>Engagement trend</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={REACH_SERIES}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="engagement" stroke="var(--brass)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Content pillar performance</SectionLabel>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <RadarChart data={PILLAR_RADAR}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="pillar" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Channel comparison</SectionLabel>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={CHANNEL_COMPARE}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="channel" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="reach" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <SectionLabel>Top content this period</SectionLabel>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Channel</th>
                <th className="pb-3 font-medium">Reach</th>
                <th className="pb-3 font-medium">Engagement</th>
                <th className="pb-3 font-medium">Saves</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {TOP.map((t) => (
                <tr key={t.title}>
                  <td className="py-3 font-medium">{t.title}</td>
                  <td className="py-3 text-ink-soft">{t.channel}</td>
                  <td className="py-3">{t.reach}</td>
                  <td className="py-3 text-success">{t.eng}</td>
                  <td className="py-3">{t.saves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <SectionLabel>Underperforming content</SectionLabel>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Channel</th>
                <th className="pb-3 font-medium">Reach</th>
                <th className="pb-3 font-medium">Engagement</th>
                <th className="pb-3 font-medium">Why</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {UNDER.map((t) => (
                <tr key={t.title}>
                  <td className="py-3 font-medium">{t.title}</td>
                  <td className="py-3 text-ink-soft">{t.channel}</td>
                  <td className="py-3">{t.reach}</td>
                  <td className="py-3 text-destructive">{t.eng}</td>
                  <td className="py-3 text-ink-soft">{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="bg-ink p-8 text-parchment">
        <div className="flex items-start gap-5">
          <AgentAvatar name="Sam" size="xl" className="shrink-0 ring-2 ring-parchment/20" />
          <div className="flex-1">
            <SectionLabel>
              <span className="text-parchment/70">Sam's weekly growth briefing</span>
            </SectionLabel>
            <h2 className="mt-3 font-display text-2xl">What worked, what didn't, what to do next.</h2>
            <p className="mt-3 max-w-3xl text-sm text-parchment/80">
              Your strongest content this week translated technical complexity into executive decision language. Your weakest posts were more abstract and less tied to practical operating lessons.
            </p>
          </div>
        </div>
        <ul className="mt-6 space-y-2.5">
          {RECS.map((r, i) => (
            <li key={r} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brass text-[10px] font-medium text-ink">{i + 1}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => toast.success("Sam is drafting next week's plan.")}
            className="rounded-full bg-parchment px-5 py-2 text-xs font-medium text-ink"
          >
            Generate Next Week's Plan
          </button>
          <button className="rounded-full border border-parchment/30 px-5 py-2 text-xs text-parchment">
            Share with team
          </button>
        </div>
      </Card>
    </div>
  );
}
