import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Logo } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { AgentAvatar, AgentAvatarStack } from "@/components/agent-avatar";
import { Illustration, type IllustrationName } from "@/components/illustration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Circle,
  Link2,
  Linkedin,
  Loader2,
  Mail,
  Music2,
  Plus,
  Sparkles,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Crafted Virtue" }] }),
  component: Onboarding,
});

type Step = {
  n: number;
  t: string;
  short: string;
  agent: string;
  agentNote: string;
};

const STEPS: Step[] = [
  { n: 1, t: "Welcome & Goals", short: "Goals", agent: "Olivia", agentNote: "Olivia is identifying your first strategic path." },
  { n: 2, t: "Professional Profile", short: "Profile", agent: "Olivia", agentNote: "Olivia is building your professional context." },
  { n: 3, t: "Strategic Objectives", short: "Objectives", agent: "Solomon", agentNote: "Solomon is shaping your strategic positioning." },
  { n: 4, t: "Voice Intake", short: "Voice", agent: "Olivia & Leo", agentNote: "Olivia and Leo are building your voice foundation." },
  { n: 5, t: "Content Pillars", short: "Pillars", agent: "Sam", agentNote: "Sam will use these pillars to measure performance." },
  { n: 6, t: "Connect Publishing Channels", short: "Channels", agent: "Konrad", agentNote: "Konrad is preparing your publishing setup." },
  { n: 7, t: "Publishing Preferences", short: "Preferences", agent: "Talia", agentNote: "Talia is setting your quality and approval guardrails." },
  { n: 8, t: "First Content Request", short: "First content", agent: "Leo", agentNote: "Leo is drafting your first authority post." },
  { n: 9, t: "Analytics Setup", short: "Analytics", agent: "Sam", agentNote: "Sam is preparing your first Weekly Growth Briefing." },
  { n: 10, t: "Complete", short: "Complete", agent: "Your Agent", agentNote: "Your authority engine is calibrated and ready." },
];

const GOALS = [
  "Build visibility",
  "Attract clients",
  "Secure speaking opportunities",
  "Recruit talent",
  "Prepare for board opportunities",
  "Build founder/investor presence",
  "Enterprise leadership visibility",
];

const TONES = ["Direct", "Reflective", "Analytical", "Warm", "Provocative", "Founder-like", "Academic", "Operator-led"];

const PILLARS = [
  "Leadership", "AI and technology", "Industry insights", "Operating lessons",
  "Founder reflections", "Market analysis", "Hiring/talent", "Product strategy",
  "Customer stories", "Regulation/compliance", "Personal lessons",
];

const CHANNELS = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "twitter", name: "X / Twitter", icon: Twitter },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "tiktok", name: "TikTok", icon: Music2 },
  { id: "blog", name: "Blog", icon: FileText },
  { id: "newsletter", name: "Newsletter", icon: Mail },
];

const APPROVAL_STYLES = [
  "Review every draft",
  "Weekly campaign approval",
  "Evergreen autopilot only",
  "Enterprise approval workflow",
];

const POSTING_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STEP_ILLUSTRATIONS: Record<number, IllustrationName> = {
  1: "problemNoise",
  2: "onboardingProfile",
  3: "blogCompass",
  4: "onboardingVoice",
  5: "onboardingPillars",
  6: "publishing",
  7: "onboardingCalendar",
  8: "contentEngine",
  9: "onboardingScore",
  10: "approachSignal",
};

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const current = STEPS[step - 1];
  const progress = Math.round((step / STEPS.length) * 100);

  // mock state
  const [goals, setGoals] = useState<string[]>(["Build visibility", "Attract clients"]);
  const [tones, setTones] = useState<string[]>(["Direct", "Analytical"]);
  const [pillars, setPillars] = useState<string[]>(["Leadership", "AI and technology", "Operating lessons"]);
  const [connected, setConnected] = useState<string[]>(["linkedin"]);
  const [approval, setApproval] = useState("Review every draft");
  const [days, setDays] = useState<string[]>(["Tue", "Thu"]);
  const [generated, setGenerated] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const next = () => {
    if (step < STEPS.length) setStep(step + 1);
    else navigate({ to: "/app/dashboard" });
  };
  const back = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-parchment/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <div className="h-1.5 w-40 overflow-hidden rounded-full bg-border">
                <div className="h-full bg-ink transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-medium text-ink-soft">{progress}% complete</span>
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
              <Bookmark className="h-4 w-4" />
              Save &amp; resume later
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1280px] gap-6 px-6 py-8 lg:grid-cols-[260px_1fr_320px]">
        {/* LEFT — Progress rail */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <SectionLabel>Onboarding</SectionLabel>
            <p className="mt-1 font-display text-lg">10-step calibration</p>
            <ol className="mt-5 space-y-1">
              {STEPS.map((s) => {
                const done = s.n < step;
                const active = s.n === step;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => setStep(s.n)}
                      className={`flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                        active ? "bg-ink/5" : "hover:bg-ink/[0.03]"
                      }`}
                    >
                      <span className="mt-0.5">
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : active ? (
                          <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-[10px] font-medium text-parchment">
                            {s.n}
                          </span>
                        ) : (
                          <Circle className="h-4 w-4 text-ink-soft/40" />
                        )}
                      </span>
                      <span className={`text-sm leading-tight ${active ? "font-medium text-ink" : "text-ink-soft"}`}>
                        {s.short}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Card>
        </aside>

        {/* CENTER — Current step */}
        <section className="min-w-0">
          <Card className="p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <SectionLabel>Step {step} of {STEPS.length}</SectionLabel>
                <h1 className="mt-2 font-display text-3xl md:text-4xl">{current.t}</h1>
              </div>
              <div className="hidden w-32 shrink-0 sm:block md:w-40">
                <Illustration name={STEP_ILLUSTRATIONS[step]} ratio="4/3" className="rounded-xl" />
              </div>
            </div>

            <div className="mt-8">
              <StepContent
                step={step}
                state={{ goals, tones, pillars, connected, approval, days, generated }}
                actions={{
                  toggleGoal: (v) => toggle(goals, setGoals, v),
                  toggleTone: (v) => toggle(tones, setTones, v),
                  togglePillar: (v) => toggle(pillars, setPillars, v),
                  toggleChannel: (v) => toggle(connected, setConnected, v),
                  toggleDay: (v) => toggle(days, setDays, v),
                  setApproval,
                  setGenerated,
                  goto: setStep,
                  finish: () => navigate({ to: "/app/dashboard" }),
                }}
              />
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="ghost"
                onClick={back}
                disabled={step === 1}
                className="text-ink-soft hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button
                onClick={next}
                className="rounded-full bg-ink px-6 py-2.5 text-parchment hover:bg-ink/90"
              >
                {step === STEPS.length ? "Go to Dashboard" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </section>

        {/* RIGHT — Agent learning panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden">
            <div className="bg-ink p-5 text-parchment">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brass" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-parchment/70">
                  Your Crafted Virtue Agent
                </span>
              </div>
              <p className="mt-3 font-display text-lg leading-snug">
                Your agent is learning.
              </p>
              <p className="mt-2 text-xs text-parchment/70">
                Coordinating onboarding, voice learning, content setup, and publishing preferences. Specialist agents support specific tasks behind the scenes.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <AgentAvatarStack
                  names={["Olivia", "Leo", "Sam", "Talia", "Vincent", "Alex", "Konrad", "Solomon"]}
                  size="md"
                  max={6}
                />
                <span className="text-[10px] uppercase tracking-[0.18em] text-parchment/60">Active team</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-2">
                <Loader2 className="mt-0.5 h-4 w-4 animate-spin text-primary" />
                <p className="text-sm text-ink">{current.agentNote}</p>
              </div>

              <div className="editorial-rule my-4" />

              <SectionLabel>Extracted so far</SectionLabel>
              <ul className="mt-3 space-y-2 text-xs text-ink-soft">
                <ExtractedItem done={step > 1} label={`${goals.length} primary goal${goals.length === 1 ? "" : "s"}`} />
                <ExtractedItem done={step > 2} label="Professional context" />
                <ExtractedItem done={step > 3} label="Strategic positioning" />
                <ExtractedItem done={step > 4} label={`Voice profile · ${tones.length} tones`} />
                <ExtractedItem done={step > 5} label={`${pillars.length} content pillars`} />
                <ExtractedItem done={step > 6} label={`${connected.length} channel${connected.length === 1 ? "" : "s"} connected`} />
                <ExtractedItem done={step > 7} label={`Approval: ${approval}`} />
                <ExtractedItem done={step > 8} label="First content drafted" />
                <ExtractedItem done={step > 9} label="Analytics baseline" />
              </ul>

              <div className="editorial-rule my-4" />

              <SectionLabel>Active specialists</SectionLabel>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Olivia", "Leo", "Sam", "Talia", "Vincent", "Alex", "Konrad", "Solomon"].map((n) => {
                  const active = current.agent.includes(n);
                  return (
                    <span
                      key={n}
                      className={`inline-flex items-center gap-1.5 rounded-full border pl-0.5 pr-2.5 py-0.5 text-[11px] ${
                        active
                          ? "border-ink bg-ink text-parchment"
                          : "border-border bg-card text-ink-soft"
                      }`}
                    >
                      <AgentAvatar name={n} size="xs" ring={!active} className={active ? "ring-1 ring-inset ring-parchment/40" : ""} />
                      {n}
                    </span>
                  );
                })}
              </div>
            </div>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function ExtractedItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-start gap-2">
      {done ? (
        <Check className="mt-0.5 h-3.5 w-3.5 text-success" />
      ) : (
        <Circle className="mt-0.5 h-3.5 w-3.5 text-ink-soft/30" />
      )}
      <span className={done ? "text-ink" : "text-ink-soft/60"}>{label}</span>
    </li>
  );
}

type State = {
  goals: string[];
  tones: string[];
  pillars: string[];
  connected: string[];
  approval: string;
  days: string[];
  generated: boolean;
};

type Actions = {
  toggleGoal: (v: string) => void;
  toggleTone: (v: string) => void;
  togglePillar: (v: string) => void;
  toggleChannel: (v: string) => void;
  toggleDay: (v: string) => void;
  setApproval: (v: string) => void;
  setGenerated: (v: boolean) => void;
  goto: (n: number) => void;
  finish: () => void;
};

function StepContent({ step, state, actions }: { step: number; state: State; actions: Actions }) {
  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-xl">Let's build your authority engine.</h2>
          <p className="mt-2 text-ink-soft">What are you hoping Crafted Virtue helps you achieve? Select all that apply.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {GOALS.map((g) => (
            <ChipOption key={g} selected={state.goals.includes(g)} onClick={() => actions.toggleGoal(g)} label={g} />
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name"><Input defaultValue="Ellis Harrow" /></Field>
        <Field label="Current title"><Input defaultValue="CEO" /></Field>
        <Field label="Company"><Input defaultValue="Hartwell Group" /></Field>
        <Field label="Industry"><Input defaultValue="Financial services" /></Field>
        <Field label="Years of experience"><Input defaultValue="18" /></Field>
        <Field label="Location / timezone"><Input defaultValue="New York · ET" /></Field>
        <div className="sm:col-span-2">
          <Field label="Professional bio">
            <Textarea rows={4} defaultValue="Operator-turned-CEO building enduring financial businesses through disciplined capital allocation and culture." />
          </Field>
        </div>
        <Field label="LinkedIn URL"><Input placeholder="linkedin.com/in/…" /></Field>
        <Field label="Website URL"><Input placeholder="hartwell.co" /></Field>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="grid gap-5">
        <Field label="Who do you want to influence?">
          <Textarea rows={2} placeholder="e.g., LPs, founders in fintech, boards of mid-market lenders" />
        </Field>
        <Field label="What opportunities do you want more of?">
          <Textarea rows={2} placeholder="e.g., advisory, board seats, keynote invitations, co-investment" />
        </Field>
        <Field label="What topics do you want to be known for?">
          <Textarea rows={2} placeholder="e.g., capital discipline, durable operating systems, culture as compounding" />
        </Field>
        <Field label="What topics should the system avoid?">
          <Textarea rows={2} placeholder="e.g., partisan politics, specific portfolio commentary, individual personnel" />
        </Field>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-6">
        <div className="grid gap-5">
          <Field label="Paste 2–5 writing samples">
            <Textarea rows={5} placeholder="Paste a recent essay, memo, LinkedIn post, or talk transcript…" />
          </Field>
          <Field label="Upload or link to posts and articles">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-card py-6 text-sm text-ink-soft hover:border-ink/40 hover:text-ink">
              <Link2 className="h-4 w-4" /> Add a link or upload a file
            </button>
          </Field>
        </div>

        <div>
          <Label className="text-sm text-ink-soft">Tone preferences</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <ChipPill key={t} selected={state.tones.includes(t)} onClick={() => actions.toggleTone(t)} label={t} />
            ))}
          </div>
        </div>

        <Card className="bg-parchment-deep p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <SectionLabel>Your early Voice Profile</SectionLabel>
          </div>
          <h3 className="mt-2 font-display text-lg">A precise, evidence-led operator voice.</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <VoiceRow k="Formality level" v="Semi-formal" />
            <VoiceRow k="Preferred vocabulary" v="precise, strategic, evidence-led" />
            <VoiceRow k="Sentence rhythm" v="medium-length, direct" />
            <VoiceRow k="Content style" v="analytical but accessible" />
            <VoiceRow k="Do" v="use concrete examples" tone="good" />
            <VoiceRow k="Don't" v="use hype or generic AI language" tone="bad" />
          </dl>
        </Card>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-5">
        <p className="text-ink-soft">Select 3–5 themes you want to be known for. Sam will benchmark performance per pillar.</p>
        <div className="flex flex-wrap gap-2">
          {PILLARS.map((p) => (
            <ChipPill key={p} selected={state.pillars.includes(p)} onClick={() => actions.togglePillar(p)} label={p} />
          ))}
        </div>
        <p className="text-xs text-ink-soft">{state.pillars.length} pillars selected</p>
      </div>
    );
  }

  if (step === 6) {
    return (
      <div className="space-y-5">
        <p className="text-ink-soft">Publishing runs through your connected channels.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {CHANNELS.map((c) => {
            const isConnected = state.connected.includes(c.id);
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className={`rounded-xl border p-4 transition-colors ${
                  isConnected ? "border-success/40 bg-success/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink/[0.04] text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{c.name}</p>
                      <p className={`text-[11px] ${isConnected ? "text-success" : "text-ink-soft"}`}>
                        {isConnected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isConnected ? "outline" : "default"}
                    onClick={() => actions.toggleChannel(c.id)}
                    className={isConnected ? "" : "bg-ink text-parchment hover:bg-ink/90"}
                  >
                    {isConnected ? "Manage" : "Connect"}
                  </Button>
                </div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-soft">
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3" /> Publishing
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Check className="h-3 w-3" /> Analytics
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (step === 7) {
    return (
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Weekly cadence">
            <Input defaultValue="3 posts / week" />
          </Field>
          <Field label="Preferred platforms">
            <Input defaultValue="LinkedIn, Newsletter" />
          </Field>
        </div>

        <div>
          <Label className="text-sm text-ink-soft">Preferred posting days</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {POSTING_DAYS.map((d) => (
              <ChipPill key={d} selected={state.days.includes(d)} onClick={() => actions.toggleDay(d)} label={d} />
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm text-ink-soft">Approval style</Label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {APPROVAL_STYLES.map((a) => (
              <ChipOption key={a} selected={state.approval === a} onClick={() => actions.setApproval(a)} label={a} />
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Risk tolerance">
            <Input defaultValue="Measured — avoid controversy" />
          </Field>
          <Field label="Content types">
            <Input defaultValue="Essays, frameworks, lessons" />
          </Field>
        </div>

        <p className="rounded-lg border border-border bg-parchment-deep px-4 py-3 text-sm text-ink-soft">
          <Check className="mr-1.5 inline h-3.5 w-3.5 text-success" />
          Nothing publishes until you approve it.
        </p>
      </div>
    );
  }

  if (step === 8) {
    return (
      <div className="space-y-6">
        <div className="grid gap-5">
          <Field label="What should your first post be about?">
            <Textarea rows={2} defaultValue="Why capital discipline beats capital deployment in volatile cycles." />
          </Field>
          <Field label="What should the audience feel or do?">
            <Textarea rows={2} defaultValue="Feel: respected as serious operators. Do: reply with their own framework." />
          </Field>
          <Field label="Any source material?">
            <Textarea rows={2} placeholder="Paste a memo, talk transcript, or link…" />
          </Field>
        </div>

        {!state.generated ? (
          <Button onClick={() => actions.setGenerated(true)} className="rounded-full bg-ink px-6 text-parchment hover:bg-ink/90">
            <Sparkles className="h-4 w-4" /> Generate first draft
          </Button>
        ) : (
          <Card className="p-5">
            <SectionLabel>Specialist sequence</SectionLabel>
            <ol className="mt-3 space-y-2 text-sm">
              {[
                "Sam checks topic performance.",
                "Leo drafts.",
                "Alex finds context.",
                "Talia reviews quality.",
                "Truth Filter checks claims.",
                "Awaiting your approval.",
              ].map((s, i) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <span><span className="text-ink-soft">{i + 1}.</span> {s}</span>
                </li>
              ))}
            </ol>

            <div className="editorial-rule my-5" />

            <div className="grid gap-3 md:grid-cols-3">
              <MockPiece label="LinkedIn post" title="The discipline of not deploying." excerpt="In 2008, we shrank our book by 31%. It was the best decision of the decade. Here's the framework we still use…" />
              <MockPiece label="X thread" title="6 lessons from a quiet quarter" excerpt="1/ The most important capital decision is the one you don't make. Restraint is a strategy, not a pause…" />
              <MockPiece label="Blog outline" title="Capital Discipline as Compounding" excerpt="I. Why deployment is mistaken for strategy · II. The cost of being early · III. The framework · IV. Three case studies" />
            </div>
          </Card>
        )}
      </div>
    );
  }

  if (step === 9) {
    return (
      <div className="space-y-5">
        <p className="text-ink-soft">Here's the analytics baseline Sam will track week over week.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <BaselineCard label="Brand Score baseline" value="64" sub="Authority + voice + reach composite" />
          <BaselineCard label="Influence Delta" value="+18" sub="Opportunity gap vs. peer benchmark" />
          <BaselineCard label="Content pillar radar" value="3 pillars" sub="Leadership · AI · Operating lessons" />
          <BaselineCard label="Weekly briefing" value="Monday 7am" sub="Delivered to your inbox" />
        </div>
        <Card className="bg-parchment-deep p-5">
          <SectionLabel>Top recommended next action</SectionLabel>
          <p className="mt-2 font-display text-lg">Publish your "Capital Discipline" post Tuesday at 9:15am ET.</p>
          <p className="mt-1 text-sm text-ink-soft">Your peer set posts most on Tuesday mornings; you currently rank in the 28th percentile for that window.</p>
        </Card>
      </div>
    );
  }

  // step 10
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10">
        <CheckCircle2 className="h-8 w-8 text-success" />
      </div>
      <div>
        <h2 className="font-display text-3xl">Your authority engine is ready.</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Your profile, early voice model, content pillars, approval preferences, and publishing setup are ready. Your agent can now prepare your first authority plan.
        </p>
      </div>

      <div className="mx-auto grid max-w-md gap-2 text-left">
        {[
          "Voice profile calibrated",
          "Content pillars established",
          "Channels connected",
          "Approval workflow set",
          "First draft awaiting review",
        ].map((l) => (
          <div key={l} className="flex items-center gap-2 rounded-lg border border-border bg-parchment-deep px-3 py-2 text-sm">
            <Check className="h-4 w-4 text-success" /> {l}
          </div>
        ))}
      </div>

      <Button
        onClick={actions.finish}
        className="rounded-full bg-ink px-8 py-3 text-parchment hover:bg-ink/90"
      >
        Go to Dashboard <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm text-ink-soft">{label}</Label>
      {children}
    </div>
  );
}

function ChipOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
        selected ? "border-ink bg-ink/[0.04] text-ink" : "border-border bg-card text-ink-soft hover:border-ink/30 hover:text-ink"
      }`}
    >
      <span>{label}</span>
      {selected ? <Check className="h-4 w-4 text-ink" /> : <Plus className="h-4 w-4 opacity-40" />}
    </button>
  );
}

function ChipPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        selected ? "border-ink bg-ink text-parchment" : "border-border bg-card text-ink-soft hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function VoiceRow({ k, v, tone }: { k: string; v: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wide text-ink-soft">{k}</dt>
      <dd className={`mt-0.5 text-sm ${tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "text-ink"}`}>{v}</dd>
    </div>
  );
}

function BaselineCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="p-5">
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{sub}</p>
    </Card>
  );
}

function MockPiece({ label, title, excerpt }: { label: string; title: string; excerpt: string }) {
  return (
    <div className="rounded-xl border border-border bg-parchment-deep p-4">
      <span className="text-[10px] font-medium uppercase tracking-wider text-ink-soft">{label}</span>
      <p className="mt-2 font-display text-base leading-snug">{title}</p>
      <p className="mt-2 text-xs text-ink-soft">{excerpt}</p>
    </div>
  );
}
