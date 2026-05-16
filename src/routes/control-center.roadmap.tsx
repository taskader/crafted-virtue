import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { ArrowUp } from "lucide-react";

export const Route = createFileRoute("/control-center/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Control Center" }] }),
  component: RoadmapPage,
});

const REQUESTS = [
  { title: "Native podcast distribution to Spotify & Apple", votes: 142, status: "planned", segment: "Pro", area: "Publishing" },
  { title: "Multi-voice profiles per account", votes: 118, status: "in_progress", segment: "Enterprise", area: "Voice" },
  { title: "Brand-rules diff viewer for compliance", votes: 96, status: "in_progress", segment: "Enterprise", area: "Governance" },
  { title: "AI-generated short video from carousel", votes: 87, status: "exploring", segment: "Pro", area: "Media" },
  { title: "Approval delegation rules", votes: 71, status: "planned", segment: "Enterprise", area: "Approvals" },
  { title: "Substack import + cross-post", votes: 64, status: "planned", segment: "Core", area: "Publishing" },
  { title: "Authority manuscript export to InDesign", votes: 42, status: "exploring", segment: "Pro", area: "Add-on" },
  { title: "Mobile approval app", votes: 38, status: "exploring", segment: "All", area: "Mobile" },
];

const COLUMNS: { key: string; label: string }[] = [
  { key: "exploring", label: "Exploring" },
  { key: "planned", label: "Planned" },
  { key: "in_progress", label: "In progress" },
];

function RoadmapPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Roadmap</p>
        <h1 className="mt-2 font-display text-4xl">Feature requests & votes</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">What customers are asking for, ranked by demand and segment.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] uppercase tracking-widest text-parchment/60">{col.label}</h2>
              <span className="text-xs text-parchment/60">{REQUESTS.filter((r) => r.status === col.key).length}</span>
            </div>
            <div className="space-y-3">
              {REQUESTS.filter((r) => r.status === col.key).map((r) => (
                <div key={r.title} className="rounded-xl border border-parchment/15 bg-parchment/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{r.title}</p>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-parchment/10 px-2 py-0.5 text-xs">
                      <ArrowUp className="h-3 w-3" />
                      {r.votes}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-parchment/60">
                    <span className="rounded-full bg-parchment/10 px-2 py-0.5">{r.segment}</span>
                    <span className="rounded-full bg-parchment/10 px-2 py-0.5">{r.area}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FounderShell>
  );
}
