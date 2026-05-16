import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { AgentAvatar } from "@/components/agent-avatar";
import { Illustration } from "@/components/illustration";
import { Check, X, Upload, RefreshCw, BookOpen } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/voice")({
  head: () => ({ meta: [{ title: "Voice profile — Crafted Virtue" }] }),
  component: Voice,
});

const TONE = ["Semi-formal", "Analytical", "Warm but direct", "Board-level framing"];
const PREFERRED = ["operating discipline", "compounding advantage", "governance", "decision quality", "market signal"];
const AVOIDED = ["game-changing", "disruptive", "10x", "AI magic", "viral"];
const STRUCTURES = [
  { step: "1", label: "Short opening thesis", detail: "One sentence. State the claim before defending it." },
  { step: "2", label: "Concrete example", detail: "A specific moment, number, or operating decision." },
  { step: "3", label: "Strategic implication", detail: "What this means for someone running a team or company." },
  { step: "4", label: "Practical takeaway", detail: "Something the reader can act on this week." },
];
const DOS = [
  "Use evidence and examples.",
  "Translate technical detail into executive language.",
  "Keep claims specific.",
  "Use calm authority.",
];
const DONTS = [
  "Use hype.",
  "Overstate certainty.",
  "Sound like a generic LinkedIn influencer.",
  "Publish unverified claims.",
];
const LEARNING = [
  "You shortened intros.",
  "You replaced hype language with operational framing.",
  "You approved more posts with practical examples.",
  "You rejected vague market predictions.",
];

function Voice() {
  return (
    <div className="space-y-8">
      <header className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
        <div className="max-w-2xl">
          <SectionLabel>Voice</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Voice Profile</h1>
          <p className="mt-2 text-ink-soft">Your agent learns from writing samples, edits, approvals, and performance.</p>
        </div>
        <Illustration name="onboardingVoice" ratio="4/3" className="hidden lg:block" />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Voice confidence" value="82%" delta="+4 this week" />
        <Stat label="Last updated" value="2 days ago" />
        <Stat label="Writing samples" value="5" />
        <Stat label="Recent edits analyzed" value="14" />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => toast.success("Upload a writing sample to refine your voice model.")}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-medium text-parchment"
        >
          <Upload className="h-3.5 w-3.5" /> Add Writing Sample
        </button>
        <button
          onClick={() => toast("Leo is recalibrating your voice model.")}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Recalibrate Voice
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs">
          <BookOpen className="h-3.5 w-3.5" /> Review Learned Preferences
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionLabel>Tone profile</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {TONE.map((t) => (
              <span key={t} className="rounded-full border border-border bg-parchment-deep px-3 py-1.5 text-xs">{t}</span>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Calm authority. Editorial tone of a senior operator writing to peers. Refuses certainty when uncertainty is the point.
          </p>
        </Card>

        <Card className="p-6">
          <SectionLabel>Vocabulary preferences</SectionLabel>
          <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">Preferred terms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PREFERRED.map((t) => (
              <span key={t} className="rounded-full bg-success/15 px-3 py-1 text-xs text-ink">{t}</span>
            ))}
          </div>
          <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">Avoided terms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AVOIDED.map((t) => (
              <span key={t} className="rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive line-through">{t}</span>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <SectionLabel>Preferred structures</SectionLabel>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STRUCTURES.map((s) => (
            <div key={s.step} className="rounded-xl border border-border/70 bg-parchment-deep p-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs text-parchment">{s.step}</span>
              <p className="mt-3 font-medium">{s.label}</p>
              <p className="mt-1 text-xs text-ink-soft">{s.detail}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-success/20 text-success">
              <Check className="h-3.5 w-3.5" />
            </span>
            <SectionLabel>Do</SectionLabel>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {DOS.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-destructive/15 text-destructive">
              <X className="h-3.5 w-3.5" />
            </span>
            <SectionLabel>Don't</SectionLabel>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {DONTS.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <AgentAvatar name="Leo" size="lg" />
          <div className="flex-1">
            <SectionLabel>Recent learning</SectionLabel>
            <p className="mt-2 text-sm text-ink-soft">What Leo has picked up from your last 14 edits and approvals.</p>
          </div>
        </div>
        <ul className="mt-5 space-y-3 text-sm">
          {LEARNING.map((l) => (
            <li key={l} className="flex items-start gap-3 rounded-xl border border-border/60 bg-parchment-deep p-3">
              <AgentAvatar name="Leo" size="sm" className="mt-0.5" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
