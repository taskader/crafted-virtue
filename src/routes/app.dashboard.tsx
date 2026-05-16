import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel, Stat, StatusPill } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { CONTENT_QUEUE, REACH_SERIES } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Linkedin,
  Mail,
  Shield,
  Sparkles,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Crafted Virtue" }] }),
  component: Dashboard,
});

const AGENT_TIMELINE = [
  { agent: "Leo", action: "drafted 5 content ideas", time: "12m ago" },
  { agent: "Talia", action: "flagged 1 post for stronger evidence", time: "38m ago" },
  { agent: "Sam", action: "found that \"AI governance\" outperformed your other topics", time: "1h ago" },
  { agent: "Vincent", action: "prepared 2 media concepts", time: "2h ago" },
  { agent: "Olivia", action: "updated your onboarding completion score", time: "4h ago" },
];

const QUEUE = [
  { id: "q1", title: "Why AI Governance Is a Board-Level Question", type: "LinkedIn post", platforms: ["LinkedIn"], status: "awaiting approval", voice: 94, factCheck: "verified" },
  { id: "q2", title: "The Operator's Guide to Quiet Influence", type: "Newsletter essay", platforms: ["Newsletter", "Blog"], status: "awaiting approval", voice: 91, factCheck: "verified" },
  { id: "q3", title: "Three Questions Before Any AI Pilot", type: "Carousel", platforms: ["LinkedIn"], status: "QA reviewed", voice: 88, factCheck: "1 claim flagged" },
  { id: "q4", title: "Field notes: what mid-market CIOs asked us last week", type: "X thread", platforms: ["X"], status: "awaiting approval", voice: 90, factCheck: "verified" },
  { id: "q5", title: "Why we rewrote our operating cadence", type: "Blog post", platforms: ["Blog", "Newsletter"], status: "scheduled", voice: 92, factCheck: "verified" },
] as const;

const PLATFORM_ICON: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Blog: FileText,
  Newsletter: Mail,
};

const CALENDAR = [
  { day: "Mon", date: 14, items: [{ time: "7:00", platform: "Newsletter", title: "Weekly: AI governance" }] },
  { day: "Tue", date: 15, items: [
    { time: "9:15", platform: "LinkedIn", title: "AI Governance is a Board Question" },
    { time: "14:00", platform: "X", title: "Field notes thread" },
  ]},
  { day: "Wed", date: 16, items: [{ time: "11:00", platform: "Blog", title: "Operating cadence rewrite" }] },
  { day: "Thu", date: 17, items: [{ time: "9:15", platform: "LinkedIn", title: "Quiet Influence essay" }] },
  { day: "Fri", date: 18, items: [{ time: "10:30", platform: "LinkedIn", title: "Three Questions carousel" }] },
  { day: "Sat", date: 19, items: [] },
  { day: "Sun", date: 20, items: [] },
];

function Dashboard() {
  const awaiting = QUEUE.filter((q) => q.status === "awaiting approval").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Tuesday morning</SectionLabel>
          <h1 className="mt-2 font-display text-4xl leading-tight text-balance">
            Good morning, Dr. Anya. Your next authority actions are ready.
          </h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Your Crafted Virtue Agent has prepared drafts, insights, and publishing recommendations for review.
          </p>
        </div>
        <Link
          to="/app/content/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:bg-ink/90"
        >
          Request new content
        </Link>
      </header>

      {/* Top KPI cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <Stat label="Brand Score" value="72" delta="+8 this month" />
        <Stat label="Influence Δ" value="+18" delta="vs. peer benchmark" />
        <Stat label="Awaiting approval" value="4" delta="Review today" />
        <Stat label="Scheduled" value="7" delta="Next 7 days" />
        <Stat label="Channels" value="3" delta="of 8 connected" />
        <Stat label="Weekly reach" value="28.4k" delta="+12% w/w" />
        <Stat label="Engagement" value="6.8%" delta="+0.4 pts" />
      </div>

      {/* Next Best Action + Agent Timeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden bg-ink p-7 text-parchment lg:col-span-2">
          <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-brass/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brass" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-parchment/70">
                Next Best Action
              </span>
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Approve this week's authority plan.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-parchment/75">
              Four drafts are ready for review. Approve them now to keep your publishing cadence on track.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/app/approvals"
                className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-5 py-2.5 text-sm font-medium text-ink hover:bg-parchment/90"
              >
                Review Approvals <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-xs text-parchment/60">{awaiting} drafts · ~6 min review</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Agent activity</SectionLabel>
          <ul className="mt-4 space-y-3">
            {AGENT_TIMELINE.map((a, i) => (
              <li key={a.agent + i} className="flex items-start gap-3">
                <AgentAvatar name={a.agent} size="md" className="mt-0.5" />
                <div className="min-w-0 text-sm leading-snug">
                  <p>
                    <span className="font-medium text-ink">{a.agent}</span>{" "}
                    <span className="text-ink-soft">{a.action}.</span>
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Content Queue */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <SectionLabel>Content Queue</SectionLabel>
            <h2 className="mt-1 font-display text-xl">5 pieces ready for your eyes</h2>
          </div>
          <Link to="/app/approvals" className="text-xs text-primary hover:underline">
            Open approvals →
          </Link>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-parchment-deep text-left text-[11px] uppercase tracking-wider text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Platforms</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Voice</th>
                <th className="px-4 py-3 font-medium">Fact-check</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {QUEUE.map((q) => (
                <tr key={q.id} className="bg-card hover:bg-parchment-deep/50">
                  <td className="px-4 py-3 font-medium text-ink">{q.title}</td>
                  <td className="px-4 py-3 text-ink-soft">{q.type}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {q.platforms.map((p) => {
                        const Icon = PLATFORM_ICON[p] ?? FileText;
                        return (
                          <span
                            key={p}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-parchment-deep px-2 py-0.5 text-[11px] text-ink-soft"
                          >
                            <Icon className="h-3 w-3" /> {p}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={q.status as never} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
                        <div className="h-full bg-primary" style={{ width: `${q.voice}%` }} />
                      </div>
                      <span className="text-xs tabular-nums text-ink-soft">{q.voice}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs ${
                        q.factCheck === "verified" ? "text-success" : "text-warning"
                      }`}
                    >
                      <Shield className="h-3 w-3" /> {q.factCheck}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" className="rounded-full">
                      Review <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Calendar + Reach chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel>Publishing Calendar</SectionLabel>
              <h2 className="mt-1 font-display text-xl">This week</h2>
            </div>
            <Link to="/app/publishing" className="text-xs text-primary hover:underline">
              Open calendar →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-7 gap-2">
            {CALENDAR.map((d) => (
              <div
                key={d.day}
                className="min-h-[140px] rounded-lg border border-border bg-parchment-deep/40 p-2"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-ink-soft">
                    {d.day}
                  </span>
                  <span className="font-display text-sm">{d.date}</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {d.items.map((it, i) => {
                    const Icon = PLATFORM_ICON[it.platform] ?? FileText;
                    return (
                      <div
                        key={i}
                        className="rounded-md border border-border bg-card p-1.5 text-[10px] leading-tight"
                      >
                        <div className="flex items-center gap-1 text-ink-soft">
                          <Icon className="h-2.5 w-2.5" />
                          <span>{it.time}</span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-ink">{it.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionLabel>Reach trajectory</SectionLabel>
          <h2 className="mt-1 font-display text-xl">Last 8 weeks</h2>
          <div className="mt-4 h-48">
            <ResponsiveContainer>
              <AreaChart data={REACH_SERIES}>
                <defs>
                  <linearGradient id="d-reach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="reach" stroke="var(--primary)" fill="url(#d-reach)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Weekly Growth Briefing */}
      <Card className="p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <SectionLabel>Sam's Weekly Growth Briefing</SectionLabel>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-snug text-balance max-w-3xl">
              Operating lessons translated into board-level language outperformed everything else this week.
            </h2>
            <p className="mt-3 max-w-3xl text-ink-soft">
              Your audience responded most strongly to practical operating lessons this week. Posts that translated technical complexity into board-level language had the highest engagement and save rate.
            </p>
          </div>
          <Link to="/app/analytics" className="text-xs text-primary hover:underline">
            See full briefing →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            "Double down on operating lessons.",
            "Turn last week's strongest post into a carousel.",
            "Reduce generic AI commentary.",
            "Publish Tuesday morning when engagement is strongest.",
          ].map((r) => (
            <div
              key={r}
              className="flex items-start gap-3 rounded-xl border border-border bg-parchment-deep/40 px-4 py-3"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span className="text-sm text-ink">{r}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Trust strip */}
      <div className="flex items-center justify-center gap-2 rounded-full border border-border bg-parchment-deep px-5 py-3 text-sm text-ink-soft">
        <Shield className="h-3.5 w-3.5 text-success" />
        Nothing publishes until you approve it.
      </div>
    </div>
  );
}

// Silence unused import warnings (kept for parity with existing data layer)
void CONTENT_QUEUE;
