import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { CONTENT_QUEUE, CONTENT_STATUSES } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/app/content")({
  head: () => ({ meta: [{ title: "Content — Crafted Virtue" }] }),
  component: ContentList,
});

function ContentList() {
  const [filter, setFilter] = useState<string>("all");
  const items = filter === "all" ? CONTENT_QUEUE : CONTENT_QUEUE.filter((c) => c.status === filter);
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Workspace</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Content</h1>
          <p className="mt-1 text-ink-soft">Every piece in motion — draft, QA, awaiting approval, scheduled, published, analyzed.</p>
        </div>
        <Link to="/app/content/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">+ Request new content</Link>
      </header>

      <div className="flex flex-wrap gap-2">
        <FilterPill label="all" active={filter === "all"} onClick={() => setFilter("all")} />
        {CONTENT_STATUSES.map((s) => (
          <FilterPill key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
        ))}
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-parchment-deep text-left text-xs uppercase tracking-widest text-ink-soft">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Pillar</th>
              <th className="px-6 py-3">Channel</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Specialist</th>
              <th className="px-6 py-3">Scheduled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {items.map((c) => (
              <tr key={c.id} className="hover:bg-parchment-deep/50">
                <td className="px-6 py-4">
                  <p className="font-medium">{c.title}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{c.excerpt}</p>
                </td>
                <td className="px-6 py-4 text-ink-soft">{c.pillar}</td>
                <td className="px-6 py-4">{c.channel}</td>
                <td className="px-6 py-4"><StatusPill status={c.status} /></td>
                <td className="px-6 py-4 text-ink-soft">{c.agent}</td>
                <td className="px-6 py-4 text-ink-soft">{c.scheduledFor ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${active ? "bg-ink text-parchment" : "border border-border text-ink-soft hover:text-ink"}`}>
      {label}
    </button>
  );
}
