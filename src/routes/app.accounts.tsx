import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { CHANNELS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/accounts")({
  head: () => ({ meta: [{ title: "Social accounts — Crafted Virtue" }] }),
  component: Accounts,
});

function Accounts() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Connected channels</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Where your voice publishes.</h1>
        <p className="mt-1 text-ink-soft">Connect once. Your agent handles cadence, formatting, and timing per platform.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg">{c.name}</p>
                <p className="mt-1 text-xs text-ink-soft">{c.handle}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${c.connected ? "bg-success/15 text-ink" : "bg-muted text-ink-soft"}`}>{c.connected ? "Connected" : "Not connected"}</span>
            </div>
            <p className="mt-4 text-xs text-ink-soft">Followers: {c.followers}</p>
            <button className={`mt-4 w-full rounded-full px-4 py-2 text-xs font-medium ${c.connected ? "border border-border text-ink-soft hover:text-ink" : "bg-ink text-parchment"}`}>
              {c.connected ? "Manage" : "Connect"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
