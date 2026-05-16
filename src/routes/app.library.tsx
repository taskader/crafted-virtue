import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { CONTENT_QUEUE } from "@/lib/mock-data";
import { mockContentItems } from "@/data/craftedVirtueData";
import { useState } from "react";

export const Route = createFileRoute("/app/library")({
  head: () => ({ meta: [{ title: "Library — Crafted Virtue" }] }),
  component: Library,
});

const TABS = ["All", "Published", "Analyzed", "Evergreen"] as const;

function Library() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const evergreen = mockContentItems.filter((c) => c.status === "published" || c.status === "analyzed");
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Workspace</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Library</h1>
          <p className="mt-1 text-ink-soft">Every approved, published, and analyzed piece — searchable and reusable.</p>
        </div>
        <Link to="/app/content/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">+ New piece</Link>
      </header>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${tab === t ? "bg-ink text-parchment" : "border border-border text-ink-soft hover:text-ink"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {evergreen.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <span>{c.platforms.join(" · ")}</span>
            </div>
            <h3 className="mt-2 font-display text-lg leading-snug">{c.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{c.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
              <span>Voice {c.voiceScore}% · {c.createdByAgent}</span>
              <span>{c.updatedAt}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border/60 px-6 py-4">
          <SectionLabel>From your current queue</SectionLabel>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-parchment-deep text-left text-xs uppercase tracking-widest text-ink-soft">
            <tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Channel</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {CONTENT_QUEUE.map((c) => (
              <tr key={c.id} className="hover:bg-parchment-deep/50">
                <td className="px-6 py-3 font-medium">{c.title}</td>
                <td className="px-6 py-3 text-ink-soft">{c.channel}</td>
                <td className="px-6 py-3"><StatusPill status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
