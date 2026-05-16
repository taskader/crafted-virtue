import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel, Stat, StatusPill } from "@/components/ui-bits";
import { AGENT_ACTIVITY, CHANNELS, CONTENT_QUEUE, REACH_SERIES, SPECIALISTS } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Crafted Virtue" }] }),
  component: Dashboard,
});

function Dashboard() {
  const awaiting = CONTENT_QUEUE.filter((c) => c.status === "awaiting approval");
  const scheduled = CONTENT_QUEUE.filter((c) => c.status === "scheduled" || c.status === "approved");
  const connected = CHANNELS.filter((c) => c.connected).length;
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Tuesday morning</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Good morning, Ellis.</h1>
          <p className="mt-1 text-ink-soft">Two pieces are waiting on your approval. Your Influence Delta is up 24% this quarter.</p>
        </div>
        <Link to="/app/content/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">
          Request new content
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Brand Score" value="82" delta="+11 since onboarding" />
        <Stat label="Influence Delta" value="+24%" delta="Quarter-over-quarter" />
        <Stat label="Weekly reach" value="31.6k" delta="+12% vs last week" />
        <Stat label="Engagement rate" value="5.7%" delta="+0.3 pts" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel>Reach &amp; engagement</SectionLabel>
              <h2 className="mt-1 font-display text-xl">Last 8 weeks</h2>
            </div>
            <Link to="/app/analytics" className="text-xs text-primary hover:underline">Full analytics →</Link>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={REACH_SERIES}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="reach" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <SectionLabel>Weekly growth briefing</SectionLabel>
          </div>
          <p className="mt-3 font-display text-lg leading-snug">
            Your Tuesday 9:15 posts are driving 41% of LinkedIn reach. Beatrice recommends doubling that window.
          </p>
          <div className="mt-5 editorial-rule" />
          <SectionLabel>Next best actions</SectionLabel>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2"><span className="text-primary">→</span> Approve "The Quiet Compounding of Reputation"</li>
            <li className="flex items-start gap-2"><span className="text-primary">→</span> Record a 2-minute voice memo for Talia</li>
            <li className="flex items-start gap-2"><span className="text-primary">→</span> Review newsletter #042 cover</li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <SectionLabel>Posts awaiting your approval</SectionLabel>
            <Link to="/app/approvals" className="text-xs text-primary hover:underline">Open approvals →</Link>
          </div>
          <div className="mt-4 space-y-3">
            {awaiting.concat(scheduled.slice(0, 1)).map((c) => (
              <div key={c.id} className="flex items-start justify-between gap-4 rounded-xl border border-border/70 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={c.status} />
                    <span className="text-xs text-ink-soft">{c.channel} · {c.pillar}</span>
                  </div>
                  <p className="mt-2 font-display text-lg">{c.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.excerpt}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-soft" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Channels connected</SectionLabel>
          <p className="mt-2 font-display text-3xl">{connected} <span className="text-base text-ink-soft">of {CHANNELS.length}</span></p>
          <div className="mt-4 space-y-2">
            {CHANNELS.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span>{c.name}</span>
                <span className={c.connected ? "text-success" : "text-ink-soft"}>{c.connected ? "Connected" : "Not connected"}</span>
              </div>
            ))}
          </div>
          <Link to="/app/accounts" className="mt-4 inline-block text-xs text-primary hover:underline">Manage connections →</Link>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Specialist activity</SectionLabel>
          <span className="text-xs text-ink-soft">Coordinated by your Crafted Virtue Agent</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {AGENT_ACTIVITY.map((a) => {
            const s = SPECIALISTS.find((sp) => sp.name === a.agent);
            return (
              <div key={a.agent + a.time} className="flex items-start gap-3 rounded-xl border border-border/70 p-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-medium text-parchment">{s?.name[0]}</span>
                <div className="text-sm">
                  <p><span className="font-medium">{a.agent}</span> <span className="text-ink-soft">{a.action}</span></p>
                  <p className="mt-0.5 text-xs text-ink-soft">{a.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
