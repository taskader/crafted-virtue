import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { CONTENT_QUEUE } from "@/lib/mock-data";
import { Check, X, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/app/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Crafted Virtue" }] }),
  component: Approvals,
});

function Approvals() {
  const queue = CONTENT_QUEUE.filter((c) => ["awaiting approval", "QA reviewed", "approved"].includes(c.status));
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Approval queue</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Your sign-off, your standard.</h1>
        <p className="mt-1 text-ink-soft">Nothing publishes until you approve it. Inline edits, voice-fit scoring, and compliance flags are ready.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {queue.map((c) => (
            <Card key={c.id} className="p-6">
              <div className="flex items-center justify-between">
                <StatusPill status={c.status} />
                <span className="text-xs text-ink-soft">{c.channel} · {c.pillar} · drafted by {c.agent}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl">{c.title}</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{c.excerpt} The full draft expands on the operating cadence I introduced last quarter — three meetings collapsed into one weekly working session, with the team's actual decisions surfaced in writing.</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs text-ink">Voice match 94%</span>
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-xs text-primary">Compliance clear</span>
                <span className="rounded-full bg-brass/20 px-2.5 py-1 text-xs text-ink">Konrad flagged 1 phrase</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-parchment"><Check className="h-3.5 w-3.5" /> Approve &amp; schedule</button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-ink-soft hover:text-ink"><MessageSquare className="h-3.5 w-3.5" /> Request edits</button>
                <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-ink-soft hover:text-ink"><X className="h-3.5 w-3.5" /> Decline</button>
              </div>
            </Card>
          ))}
        </div>
        <aside className="space-y-4">
          <Card className="p-5">
            <SectionLabel>This week</SectionLabel>
            <p className="mt-2 font-display text-3xl">{queue.length}<span className="ml-1 text-sm text-ink-soft">in queue</span></p>
            <p className="mt-1 text-xs text-ink-soft">Median time to approval: 2 min 41 sec.</p>
          </Card>
          <Card className="p-5">
            <SectionLabel>Voice fit trend</SectionLabel>
            <p className="mt-2 font-display text-3xl">93%</p>
            <p className="mt-1 text-xs text-ink-soft">Up from 87% at onboarding.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
