import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { SPECIALISTS } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/content/new")({
  head: () => ({ meta: [{ title: "New content — Crafted Virtue" }] }),
  component: NewContent,
});

function NewContent() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <header>
        <Link to="/app/content" className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink">← Content</Link>
        <h1 className="mt-3 font-display text-4xl">Request a new piece</h1>
        <p className="mt-2 text-ink-soft">Your agent will draft this in your voice. You'll review before anything moves.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-8">
          <form
            className="grid gap-5"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/content" }); }}
          >
            <label className="block">
              <span className="text-sm text-ink-soft">Working title or angle</span>
              <input className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="What I got wrong about distribution" />
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">Pillar</span>
              <select className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary">
                <option>Operator's Mind</option>
                <option>Leadership Craft</option>
                <option>Market Signal</option>
                <option>Hard-won Lessons</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">Channel</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["LinkedIn", "X", "Newsletter", "Blog", "Instagram"].map((c) => (
                  <button type="button" key={c} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-primary">{c}</button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">Briefing notes for your agent</span>
              <textarea rows={6} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="The conviction I want to land. Anything I want to avoid. Reference material..." />
            </label>
            <div className="flex items-center justify-between border-t border-border pt-5">
              <p className="text-xs text-ink-soft">Estimated first draft: within 12 hours · Nothing publishes until you approve it.</p>
              <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">Send to your agent</button>
            </div>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><SectionLabel>Who will work on this</SectionLabel></div>
            <ul className="mt-3 space-y-2 text-sm">
              {SPECIALISTS.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] text-parchment">{s.name[0]}</span>
                  <span className="text-ink-soft">{s.name} — {s.role}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <SectionLabel>Voice match preview</SectionLabel>
            <p className="mt-2 font-display text-2xl">94%</p>
            <p className="mt-1 text-xs text-ink-soft">Based on your last 12 approved pieces.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
