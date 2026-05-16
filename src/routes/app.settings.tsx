import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Crafted Virtue" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Settings</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Your account, your preferences.</h1>
      </header>
      <Card className="p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            { l: "Full name", v: "Ellis Harrow" },
            { l: "Email", v: "ellis@hartwell.co" },
            { l: "Role", v: "CEO, Hartwell Group" },
            { l: "Timezone", v: "America/New_York" },
          ].map((f) => (
            <label key={f.l} className="block">
              <span className="text-xs uppercase tracking-widest text-ink-soft">{f.l}</span>
              <input defaultValue={f.v} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </label>
          ))}
        </div>
      </Card>
      <Card className="p-8">
        <SectionLabel>Publishing preferences</SectionLabel>
        <div className="mt-4 space-y-3">
          {["Auto-schedule approved posts at optimal windows", "Send weekly Influence Delta brief on Mondays", "Notify me when Konrad flags compliance issues", "Allow my agent to draft replies for my review"].map((t, i) => (
            <label key={t} className="flex items-center justify-between rounded-xl border border-border p-4">
              <span className="text-sm">{t}</span>
              <input type="checkbox" defaultChecked={i !== 3} />
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
