import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { CONTENT_QUEUE } from "@/lib/mock-data";

export const Route = createFileRoute("/app/publishing")({
  head: () => ({ meta: [{ title: "Publishing — Crafted Virtue" }] }),
  component: Publishing,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Publishing() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Publishing calendar</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Week of March 17</h1>
          <p className="mt-1 text-ink-soft">Published in the windows your audience actually reads. Alex tunes this weekly.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-border px-4 py-2 text-xs">Week</button>
          <button className="rounded-full bg-ink px-4 py-2 text-xs text-parchment">Month</button>
        </div>
      </header>

      <Card className="p-6">
        <div className="grid grid-cols-7 gap-3">
          {DAYS.map((d, i) => (
            <div key={d} className="min-h-56 rounded-xl border border-border/70 bg-parchment-deep p-3">
              <p className="text-[11px] uppercase tracking-widest text-ink-soft">{d}</p>
              <p className="font-display text-2xl">{17 + i}</p>
              <div className="mt-3 space-y-2">
                {CONTENT_QUEUE.filter((_, idx) => idx % 7 === i).slice(0, 2).map((c) => (
                  <div key={c.id} className="rounded-lg bg-card p-2 text-xs shadow-soft">
                    <p className="font-medium leading-tight">{c.title}</p>
                    <p className="mt-1 text-ink-soft">{c.channel}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <SectionLabel>Upcoming queue</SectionLabel>
        <div className="mt-4 divide-y divide-border/60">
          {CONTENT_QUEUE.filter((c) => c.scheduledFor).map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-xs text-ink-soft">{c.channel} · {c.scheduledFor}</p>
              </div>
              <StatusPill status={c.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
