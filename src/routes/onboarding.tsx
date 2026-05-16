import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { SPECIALISTS } from "@/lib/mock-data";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Crafted Virtue" }] }),
  component: Onboarding,
});

const STEPS = [
  { n: 1, t: "Welcome & goals", d: "What does success look like in 90 days?" },
  { n: 2, t: "Professional profile", d: "The basics, fast." },
  { n: 3, t: "Strategic objectives", d: "Pipeline, hiring, category, fundraising." },
  { n: 4, t: "Voice intake", d: "Three writing samples and a short interview." },
  { n: 5, t: "Content pillars", d: "Three to five themes you'll be known for." },
  { n: 6, t: "Connect channels", d: "LinkedIn, X, Newsletter, Blog, more." },
  { n: 7, t: "Publishing preferences", d: "Cadence, voice formality, sensitive topics." },
  { n: 8, t: "First content request", d: "We'll draft your first piece tonight." },
  { n: 9, t: "Analytics setup", d: "Connect existing dashboards (optional)." },
  { n: 10, t: "Complete", d: "Your agent is calibrated. Welcome." },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const current = STEPS[step - 1];
  const progress = (step / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="border-b border-border/60 bg-parchment">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Logo />
          <p className="text-sm text-ink-soft">Step {step} of {STEPS.length}</p>
        </div>
        <div className="h-1 bg-border/60">
          <div className="h-full bg-ink transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[1fr_280px]">
        <Card className="p-10">
          <SectionLabel>Step {step}</SectionLabel>
          <h1 className="mt-3 font-display text-4xl">{current.t}</h1>
          <p className="mt-3 text-ink-soft">{current.d}</p>

          <div className="mt-8">
            <StepBody step={step} />
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="rounded-full border border-border px-5 py-2.5 text-sm text-ink-soft disabled:opacity-40"
            >
              Back
            </button>
            {step < STEPS.length ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-parchment"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => navigate({ to: "/app/dashboard" })}
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-parchment"
              >
                Enter your dashboard
              </button>
            )}
          </div>
        </Card>

        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Your Crafted Virtue Agent</p>
            </div>
            <p className="mt-2 text-xs text-ink-soft">Coordinating the specialist team below in real time as you complete onboarding.</p>
          </Card>
          <Card className="p-5">
            <SectionLabel>Working on this step</SectionLabel>
            <ul className="mt-3 space-y-2 text-sm">
              {SPECIALISTS.slice(0, 4).map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] font-medium text-parchment">{s.name[0]}</span>
                  <span className="text-ink-soft">{s.name} — {s.role}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <SectionLabel>Roadmap</SectionLabel>
            <ul className="mt-3 space-y-1.5 text-sm">
              {STEPS.map((s) => (
                <li key={s.n} className={`flex items-center gap-2 ${s.n === step ? "text-ink font-medium" : s.n < step ? "text-ink-soft" : "text-ink-soft/60"}`}>
                  {s.n < step ? <Check className="h-3.5 w-3.5 text-success" /> : <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-current text-[9px]">{s.n}</span>}
                  {s.t}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function StepBody({ step }: { step: number }) {
  if (step === 4) {
    return (
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm text-ink-soft">Writing sample 1 (paste long-form prose)</span>
          <textarea rows={4} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="Paste a recent essay, memo, or email you wrote..." />
        </label>
        <label className="block">
          <span className="text-sm text-ink-soft">Sample 2</span>
          <textarea rows={3} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
        </label>
        <label className="block">
          <span className="text-sm text-ink-soft">Sample 3</span>
          <textarea rows={3} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
        </label>
      </div>
    );
  }
  if (step === 5) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {["Operator's Mind", "Leadership Craft", "Market Signal", "Hard-won Lessons", "Industry Forecast", "Building in Public"].map((p) => (
          <label key={p} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary">
            <input type="checkbox" defaultChecked={["Operator's Mind", "Leadership Craft", "Market Signal", "Hard-won Lessons"].includes(p)} />
            <span className="text-sm">{p}</span>
          </label>
        ))}
      </div>
    );
  }
  if (step === 6) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["LinkedIn", "X", "Newsletter", "Blog", "Instagram", "Facebook", "YouTube", "TikTok"].map((c, i) => (
          <Card key={c} className="p-4">
            <p className="text-sm font-medium">{c}</p>
            <button className={`mt-3 w-full rounded-full px-3 py-1.5 text-xs ${i < 4 ? "bg-success/15 text-ink" : "border border-border text-ink-soft hover:border-primary"}`}>
              {i < 4 ? "Connected" : "Connect"}
            </button>
          </Card>
        ))}
      </div>
    );
  }
  if (step === 10) {
    return (
      <div className="rounded-2xl bg-parchment-deep p-8 text-center">
        <Check className="mx-auto h-10 w-10 text-success" />
        <p className="mt-4 font-display text-2xl">Your agent is calibrated.</p>
        <p className="mt-2 text-sm text-ink-soft">Olivia will share your first draft within 12 hours. You'll review and approve before anything publishes.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <label key={i} className="block">
          <span className="text-sm text-ink-soft">{["What outcome would make this quarter unambiguously successful?", "Who, specifically, do you want to reach?", "What would you refuse to publish, no matter the upside?"][i]}</span>
          <textarea rows={2} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
        </label>
      ))}
    </div>
  );
}
