import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { PublishingTimeline } from "@/components/publishing-timeline";
import { CONTENT_QUEUE } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/publishing")({
  head: () => ({ meta: [{ title: "Publishing — Crafted Virtue" }] }),
  component: Publishing,
});

type View = "timeline" | "calendar" | "queue" | "accounts";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PLATFORMS = ["All", "LinkedIn", "X", "Instagram", "YouTube", "Blog", "Newsletter"] as const;
type Platform = (typeof PLATFORMS)[number];

const SCHEDULED = [
  { id: "s1", title: "The Quiet Compounding of Reputation", platform: "LinkedIn", when: "Tue Mar 18 · 09:15", status: "scheduled" as const, job: "pz_8842" },
  { id: "s2", title: "Three Questions Before Any Board Update", platform: "Newsletter", when: "Wed Mar 19 · 07:00", status: "scheduled" as const, job: "pz_8843" },
  { id: "s3", title: "Earned trust > earned media", platform: "X", when: "Thu Mar 20 · 11:30", status: "scheduled" as const, job: "pz_8844" },
  { id: "s4", title: "Field notes from Q3 customer calls", platform: "LinkedIn", when: "Fri Mar 21 · 08:45", status: "scheduled" as const, job: "pz_8845" },
];

const PUBLISHED = [
  { id: "p1", title: "Why I rewrote our operating cadence", platform: "Newsletter", when: "Mar 12 · 07:02", job: "pz_8801", reach: "12.4k" },
  { id: "p2", title: "On choosing convictions slowly", platform: "LinkedIn", when: "Mar 10 · 09:18", job: "pz_8794", reach: "8.7k" },
  { id: "p3", title: "Notes from a hard quarter", platform: "Blog", when: "Mar 7 · 06:00", job: "pz_8782", reach: "3.1k" },
];

const FAILED = [
  { id: "f1", title: "Three Lessons from Scaling Research Teams", platform: "LinkedIn", when: "Mar 14 · 09:15", job: "pz_8820", error: "Token expired" },
];

const POSTIZ_ACCOUNTS = [
  { name: "LinkedIn — @e.harrow", status: "Healthy", sync: "2m ago" },
  { name: "X — @eharrow", status: "Healthy", sync: "9m ago" },
  { name: "Newsletter — Quiet Authority", status: "Healthy", sync: "1h ago" },
];

function Publishing() {
  const [mainView, setMainView] = useState<View>("timeline");
  const [view, setView] = useState<"week" | "month">("week");
  const [platform, setPlatform] = useState<Platform>("All");

  const calendarItems = useMemo(
    () => CONTENT_QUEUE.filter((c) => c.scheduledFor && (platform === "All" || c.channel === platform)),
    [platform]
  );

  const isTimeline = mainView === "timeline";
  const isCalendar = mainView === "calendar";
  const isQueue = mainView === "queue";
  const isAccounts = mainView === "accounts";

  const titleFor: Record<View, string> = {
    timeline: "Publishing Timeline",
    calendar: "Publishing Calendar",
    queue: "Publishing Queue",
    accounts: "Connected Accounts",
  };
  const subFor: Record<View, string> = {
    timeline: "See every scheduled and published post in one chronological view. Scheduled posts sit at the top; published history unfolds below.",
    calendar: "Approved content moves from your queue into the calendar. Publishing is managed through your connected Postiz workspace.",
    queue: "Scheduled, published, and failed jobs across every connected channel.",
    accounts: "Channels connected through your Postiz workspace.",
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <SectionLabel>Publishing</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">{titleFor[mainView]}</h1>
          <p className="mt-2 text-ink-soft">{subFor[mainView]}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-border p-1">
            {(["timeline", "calendar", "queue", "accounts"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setMainView(v)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize ${mainView === v ? "bg-ink text-parchment" : "text-ink-soft"}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => toast.success("Campaign scheduling opened in Postiz.")}
            className="rounded-full bg-ink px-5 py-2 text-xs font-medium text-parchment"
          >
            Schedule Campaign
          </button>
        </div>
      </header>

      {isTimeline && <PublishingTimeline />}

      {isCalendar && (
        <>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-full border border-border p-1">
            {(["week", "month"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize ${view === v ? "bg-ink text-parchment" : "text-ink-soft"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              platform === p ? "border-ink bg-ink text-parchment" : "border-border text-ink-soft hover:text-ink"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 md:grid-cols-[220px_1fr]">
          <div className="hidden md:block">
            <Illustration name="publishing" ratio="1/1" className="h-full rounded-none border-0 ring-0" />
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <SectionLabel>{view === "week" ? "Week of March 17" : "March 2026"}</SectionLabel>
              <p className="text-xs text-ink-soft">Only approved content can be scheduled.</p>
            </div>
        {view === "week" ? (
          <div className="grid grid-cols-7 gap-3">
            {DAYS.map((d, i) => (
              <div key={d} className="min-h-56 rounded-xl border border-border/70 bg-parchment-deep p-3">
                <p className="text-[11px] uppercase tracking-widest text-ink-soft">{d}</p>
                <p className="font-display text-2xl">{17 + i}</p>
                <div className="mt-3 space-y-2">
                  {calendarItems.filter((_, idx) => idx % 7 === i).slice(0, 2).map((c) => (
                    <div key={c.id} className="rounded-lg bg-card p-2 text-xs shadow-soft">
                      <p className="font-medium leading-tight">{c.title}</p>
                      <p className="mt-1 text-ink-soft">{c.channel} · {c.scheduledFor}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 5;
              const hasPost = calendarItems[i % calendarItems.length] && day > 0 && day <= 31 && i % 3 === 0;
              return (
                <div key={i} className="min-h-20 rounded-lg border border-border/60 bg-parchment-deep p-2">
                  <p className="text-[10px] text-ink-soft">{day > 0 && day <= 31 ? day : ""}</p>
                  {hasPost && <div className="mt-1 h-1.5 rounded-full bg-ink/70" />}
                </div>
              );
            })}
          </div>
        )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <SectionLabel>Scheduled</SectionLabel>
            <p className="mt-1 text-xs text-ink-soft">{SCHEDULED.length} posts ready in your Postiz queue.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {SCHEDULED.map((s) => (
            <div key={s.id} className="rounded-xl border border-border/60 bg-parchment-deep p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium leading-snug">{s.title}</p>
                  <p className="mt-1 text-xs text-ink-soft">{s.platform} · {s.when}</p>
                </div>
                <StatusPill status={s.status} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-ink-soft">
                <span>Postiz job <code className="rounded bg-muted px-1.5 py-0.5">{s.job}</code></span>
                <button className="font-medium text-ink hover:underline">View</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <SectionLabel>Published history</SectionLabel>
        <div className="mt-4 divide-y divide-border/60">
          {PUBLISHED.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-ink-soft">{p.platform} · {p.when} · job {p.job}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg">{p.reach}</p>
                <p className="text-[11px] uppercase tracking-wide text-ink-soft">reach</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <SectionLabel>Failed publishing jobs</SectionLabel>
        <div className="mt-4 space-y-3">
          {FAILED.map((f) => (
            <div key={f.id} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.platform} · {f.when} · job {f.job}</p>
                  <p className="mt-2 text-xs text-destructive">Error: {f.error}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast("Redirecting to Postiz to reconnect this account.")}
                    className="rounded-full bg-ink px-4 py-1.5 text-xs text-parchment"
                  >
                    Reconnect account
                  </button>
                  <button
                    onClick={() => toast.success("Job re-queued.")}
                    className="rounded-full border border-border px-4 py-1.5 text-xs"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <SectionLabel>Postiz connection</SectionLabel>
            <p className="mt-2 font-display text-xl">Your publishing workspace</p>
            <p className="mt-1 text-xs text-ink-soft">Workspace: crafted-virtue-prod · Last full sync 2 minutes ago</p>
          </div>
          <button className="rounded-full border border-border px-4 py-2 text-xs">Add channel</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {POSTIZ_ACCOUNTS.map((a) => (
            <div key={a.name} className="rounded-xl border border-border/60 bg-parchment-deep p-4">
              <p className="text-sm font-medium">{a.name}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {a.status}
                </span>
                <span>synced {a.sync}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-center text-xs text-ink-soft">Only approved content can be scheduled. Publishing is managed through your connected Postiz workspace.</p>
        </>
      )}
    </div>
  );
}

