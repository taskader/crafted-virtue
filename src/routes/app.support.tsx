import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/app/support")({
  head: () => ({ meta: [{ title: "Support — Crafted Virtue" }] }),
  component: Support,
});

function Support() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Support</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">A human within reach.</h1>
        <p className="mt-1 text-ink-soft">Your success partner replies within two business hours.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <SectionLabel>Send a message</SectionLabel>
          <form className="mt-4 grid gap-4">
            <input className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm" placeholder="Subject" />
            <textarea rows={6} className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm" placeholder="Tell us what you need..." />
            <button type="button" className="self-start rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">Send</button>
          </form>
        </Card>
        <Card className="p-6">
          <SectionLabel>Your success partner</SectionLabel>
          <div className="mt-4 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-parchment">MV</div>
            <div>
              <p className="font-medium">Mira Vance</p>
              <p className="text-xs text-ink-soft">Director, Executive Practice</p>
            </div>
          </div>
          <div className="mt-6 editorial-rule" />
          <p className="mt-4 text-xs text-ink-soft">Schedule a quarterly review · Reach Mira directly at mira@craftedvirtue.com</p>
        </Card>
      </div>
    </div>
  );
}
