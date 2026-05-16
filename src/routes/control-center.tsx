import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { SPECIALISTS, AGENT_ACTIVITY } from "@/lib/mock-data";

export const Route = createFileRoute("/control-center")({
  head: () => ({ meta: [{ title: "Founder Control Center — Crafted Virtue" }] }),
  component: ControlCenter,
});

function ControlCenter() {
  return (
    <div className="min-h-screen bg-ink text-parchment">
      <header className="border-b border-parchment/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Logo className="[&_span:last-child]:text-parchment [&_span:first-child]:bg-parchment [&_span:first-child]:text-ink" />
            <span className="rounded-full bg-brass/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest">Founder Control Center</span>
          </div>
          <Link to="/app/dashboard" className="text-xs text-parchment/70 hover:text-parchment">← Back to app</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-parchment/60">Operating cockpit</p>
          <h1 className="mt-2 font-display text-5xl">Everything, in one view.</h1>
          <p className="mt-2 text-parchment/70">The unfiltered state of your authority practice — for the moments you want the whole picture.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { l: "Brand Score", v: "82" },
            { l: "Influence Delta", v: "+24%" },
            { l: "Pipeline attribution", v: "$2.1M" },
            { l: "Inbound this Q", v: "147" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-parchment/15 bg-parchment/5 p-5">
              <p className="text-[11px] uppercase tracking-widest text-parchment/60">{s.l}</p>
              <p className="mt-2 font-display text-3xl">{s.v}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-parchment/15 bg-parchment/5 p-6">
            <p className="text-[11px] uppercase tracking-widest text-parchment/60">Specialist team — live</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {AGENT_ACTIVITY.map((a) => (
                <div key={a.agent + a.time} className="flex items-start gap-3 rounded-xl border border-parchment/10 bg-parchment/5 p-3 text-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-parchment text-[10px] font-medium text-ink">{a.agent[0]}</span>
                  <div><p><strong>{a.agent}</strong> <span className="text-parchment/70">{a.action}</span></p><p className="mt-0.5 text-xs text-parchment/60">{a.time}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-parchment/15 bg-parchment/5 p-6">
            <p className="text-[11px] uppercase tracking-widest text-parchment/60">Team roster</p>
            <ul className="mt-4 space-y-2 text-sm">
              {SPECIALISTS.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-parchment text-[10px] text-ink">{s.name[0]}</span>{s.name}</span>
                  <span className="text-parchment/60 text-xs">{s.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
