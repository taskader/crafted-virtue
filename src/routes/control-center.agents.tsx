import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { agents } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/control-center/agents")({
  head: () => ({ meta: [{ title: "Agents — Control Center" }] }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <FounderShell>
      <header>
        <p className="text-[11px] uppercase tracking-widest text-parchment/60">Agents</p>
        <h1 className="mt-2 font-display text-4xl text-parchment">The 12 Crafted Virtue specialists.</h1>
        <p className="mt-2 max-w-3xl text-parchment/70">Each agent has a mandate, a queue, and an accountability surface. This is the operator view.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((a) => (
          <div key={a.id} className="rounded-2xl border border-parchment/15 bg-parchment/5 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-parchment font-display text-sm text-ink">{a.name[0]}</span>
              <div>
                <p className="font-display text-lg text-parchment">{a.name}</p>
                <p className="text-xs text-parchment/60">{a.title}</p>
              </div>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${a.userFacing ? "bg-success/30 text-parchment" : "bg-parchment/15 text-parchment/70"}`}>
                {a.userFacing ? "User-facing" : "Internal"}
              </span>
            </div>
            <p className="mt-3 text-sm text-parchment/80">{a.shortMandate}</p>
            <ul className="mt-3 space-y-1 text-xs text-parchment/70">
              {a.responsibilities.slice(0, 3).map((r) => (
                <li key={r}>· {r}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-parchment/60 italic">{a.activityExample}</p>
          </div>
        ))}
      </div>
    </FounderShell>
  );
}
