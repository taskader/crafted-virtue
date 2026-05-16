import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Mic2, Upload } from "lucide-react";

export const Route = createFileRoute("/app/voice")({
  head: () => ({ meta: [{ title: "Voice profile — Crafted Virtue" }] }),
  component: Voice,
});

const TRAITS = [
  { l: "Cadence", v: "Measured, sentence-led, occasional aphorism." },
  { l: "Conviction level", v: "High; declarative, willing to be wrong in public." },
  { l: "References", v: "Operating, philosophy of mind, classical strategy." },
  { l: "Avoid", v: "Hype language, em-dash overuse, motivational tropes." },
];

function Voice() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Voice profile</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">How you sound when you're at your best.</h1>
        <p className="mt-1 text-ink-soft">Leo updates this every week from your approvals, edits, and new samples.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <SectionLabel>Voice fingerprint</SectionLabel>
          <p className="mt-3 font-display text-lg leading-snug">
            "Calm authority — the editorial tone of a senior operator writing to peers, not pitching to strangers. Short paragraphs. Concrete examples before claims. Refuses the temptation of certainty when uncertainty is the point."
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {TRAITS.map((t) => (
              <div key={t.l} className="rounded-xl border border-border bg-parchment-deep p-4">
                <p className="text-xs uppercase tracking-widest text-ink-soft">{t.l}</p>
                <p className="mt-2 text-sm">{t.v}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionLabel>Voice match</SectionLabel>
          <p className="mt-2 font-display text-5xl">94<span className="text-xl text-ink-soft">%</span></p>
          <p className="mt-1 text-xs text-ink-soft">Avg. across last 12 approved pieces.</p>
          <div className="mt-6 editorial-rule" />
          <SectionLabel>Samples on file</SectionLabel>
          <p className="mt-2 font-display text-3xl">28</p>
          <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:border-primary">
            <Upload className="h-3.5 w-3.5" /> Add a writing sample
          </button>
          <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-xs text-parchment">
            <Mic2 className="h-3.5 w-3.5" /> Record a 2-min voice memo
          </button>
        </Card>
      </div>

      <Card className="p-6">
        <SectionLabel>Recent voice tuning</SectionLabel>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] text-parchment">L</span><span><strong>Leo</strong> <span className="text-ink-soft">— added three idiom patterns from your March 12 essay.</span></span></li>
          <li className="flex items-start gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] text-parchment">L</span><span><strong>Leo</strong> <span className="text-ink-soft">— softened opening hooks across LinkedIn drafts after your edit pattern.</span></span></li>
          <li className="flex items-start gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] text-parchment">L</span><span><strong>Leo</strong> <span className="text-ink-soft">— retired five phrases you've never approved.</span></span></li>
        </ul>
      </Card>
    </div>
  );
}
