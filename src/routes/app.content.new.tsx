import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/app/content/new")({
  head: () => ({ meta: [{ title: "New Content Request — Crafted Virtue" }] }),
  component: NewContent,
});

const CONTENT_TYPES = [
  "LinkedIn post",
  "X thread",
  "Blog article",
  "Newsletter intro",
  "Carousel",
  "Short video script",
  "Podcast talking points",
];

const PLATFORMS = ["LinkedIn", "X", "Instagram", "YouTube", "Blog", "Newsletter"];

const TONES = ["Direct", "Analytical", "Warm", "Provocative", "Executive", "Founder-like"];

const SCHEDULES = ["This week", "Next week", "Specific date", "No schedule yet"];

const SEQUENCE = [
  { agent: "Sam", action: "checked topic performance." },
  { agent: "Leo", action: "drafted content." },
  { agent: "Alex", action: "found supporting context." },
  { agent: "Talia", action: "reviewed voice and quality." },
  { agent: "Vincent", action: "prepared optional media." },
];

type Draft = {
  id: string;
  type: string;
  preview: string;
  voice: number;
  citations: "Verified" | "Pending review";
  risk: "Low" | "Medium" | "High";
};

const DRAFTS: Draft[] = [
  {
    id: "d1",
    type: "LinkedIn post",
    preview:
      "Most boards still treat AI as an IT issue. That's the mistake. Governance, risk appetite, and disclosure are board questions — and they're already overdue. Here's the framework I use when I'm asked to brief a board on AI in 20 minutes…",
    voice: 94,
    citations: "Verified",
    risk: "Low",
  },
  {
    id: "d2",
    type: "X thread",
    preview:
      "1/ The boards I respect aren't asking 'should we use AI?' They're asking three sharper questions. 2/ What is our risk appetite for autonomous decisions? 3/ Who owns the failure mode when a model is wrong? …",
    voice: 91,
    citations: "Verified",
    risk: "Low",
  },
  {
    id: "d3",
    type: "Newsletter intro",
    preview:
      "This week I want to talk about the quiet shift happening in boardrooms. The CIOs I'm speaking with are no longer leading the AI conversation — the audit committee is. That changes what 'AI strategy' has to mean…",
    voice: 92,
    citations: "Verified",
    risk: "Low",
  },
  {
    id: "d4",
    type: "Blog outline",
    preview:
      "I. Why AI is now an audit-committee topic · II. The three questions every board should be asking · III. The governance gap most companies don't see · IV. A 90-day plan to close it · V. What 'good' looks like in 2026.",
    voice: 90,
    citations: "Pending review",
    risk: "Low",
  },
];

function NewContent() {
  const [type, setType] = useState("LinkedIn post");
  const [platforms, setPlatforms] = useState<string[]>(["LinkedIn"]);
  const [tones, setTones] = useState<string[]>(["Analytical", "Executive"]);
  const [needCitations, setNeedCitations] = useState(true);
  const [needMedia, setNeedMedia] = useState(false);
  const [schedule, setSchedule] = useState("This week");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const onGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setTimeout(() => {
        document.getElementById("drafts")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <header>
        <Link
          to="/app/content"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" /> Content
        </Link>
        <h1 className="mt-3 font-display text-4xl">New Content Request</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Give your agent the context. It will coordinate strategy, drafting, fact-checking, quality review, and media options.
        </p>
      </header>

      <Card className="p-8">
        <form className="space-y-8" onSubmit={onGenerate}>
          <FormSection label="01" title="What's the piece about?">
            <div className="grid gap-5">
              <Field label="Topic">
                <Input placeholder="Why AI governance is a board-level question" />
              </Field>
              <Field label="Goal">
                <Input placeholder="Position me as the operator boards trust on AI risk" />
              </Field>
              <Field label="Audience">
                <Input placeholder="Board directors, audit-committee chairs, CIOs in mid-market" />
              </Field>
            </div>
          </FormSection>

          <FormSection label="02" title="Format & distribution">
            <div className="space-y-5">
              <div>
                <Label className="text-sm text-ink-soft">Content type</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CONTENT_TYPES.map((t) => (
                    <Pill key={t} label={t} selected={type === t} onClick={() => setType(t)} />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-ink-soft">Platforms</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => (
                    <Pill
                      key={p}
                      label={p}
                      selected={platforms.includes(p)}
                      onClick={() => toggle(platforms, setPlatforms, p)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-ink-soft">Tone</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <Pill
                      key={t}
                      label={t}
                      selected={tones.includes(t)}
                      onClick={() => toggle(tones, setTones, t)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection label="03" title="Source material & guardrails">
            <div className="space-y-5">
              <Field label="Source material">
                <Textarea
                  rows={5}
                  placeholder="Paste a memo, talk transcript, recent article, or notes you want the agent to draw from…"
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <ToggleField
                  label="Need citations?"
                  hint="Sources and links inline"
                  value={needCitations}
                  onChange={setNeedCitations}
                />
                <ToggleField
                  label="Need media?"
                  hint="Vincent generates cover or carousel"
                  value={needMedia}
                  onChange={setNeedMedia}
                />
              </div>
            </div>
          </FormSection>

          <FormSection label="04" title="Schedule">
            <div className="flex flex-wrap gap-2">
              {SCHEDULES.map((s) => (
                <Pill key={s} label={s} selected={schedule === s} onClick={() => setSchedule(s)} />
              ))}
            </div>
          </FormSection>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-ink-soft">
              Estimated time to first draft: ~6 minutes · Nothing publishes until you approve it.
            </p>
            <Button
              type="submit"
              disabled={generating}
              className="rounded-full bg-ink px-6 py-2.5 text-parchment hover:bg-ink/90"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Drafts
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {generated && (
        <div id="drafts" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <SectionLabel>Specialist sequence</SectionLabel>
            </div>
            <ol className="mt-4 space-y-2">
              {SEQUENCE.map((s, i) => (
                <li key={s.agent} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <span>
                    <span className="text-ink-soft">{i + 1}.</span>{" "}
                    <span className="font-medium text-ink">{s.agent}</span>{" "}
                    <span className="text-ink-soft">{s.action}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>

          <div>
            <h2 className="font-display text-2xl">Generated drafts</h2>
            <p className="mt-1 text-sm text-ink-soft">4 pieces calibrated to your voice profile.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {DRAFTS.map((d) => (
              <DraftCard key={d.id} draft={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DraftCard({ draft }: { draft: Draft }) {
  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">
          {draft.type}
        </span>
        <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink">
          Awaiting approval
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink whitespace-pre-line">{draft.preview}</p>

      <div className="editorial-rule my-4" />

      <dl className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <dt className="text-ink-soft">Voice</dt>
          <dd className="mt-1 flex items-center gap-1.5">
            <div className="h-1 w-10 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary" style={{ width: `${draft.voice}%` }} />
            </div>
            <span className="tabular-nums text-ink">{draft.voice}</span>
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Citations</dt>
          <dd className={`mt-1 ${draft.citations === "Verified" ? "text-success" : "text-warning"}`}>
            {draft.citations}
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Risk</dt>
          <dd className="mt-1 text-success">{draft.risk}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" className="rounded-full bg-ink text-parchment hover:bg-ink/90">
          <Check className="h-3 w-3" /> Send to Approval
        </Button>
        <Button size="sm" variant="outline" className="rounded-full">
          Request Revision
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full text-ink-soft hover:text-ink">
          Save Draft
        </Button>
      </div>
    </Card>
  );
}

function FormSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm text-ink-soft">{label}</span>
        <h2 className="font-display text-xl">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
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

function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        selected
          ? "border-ink bg-ink text-parchment"
          : "border-border bg-card text-ink-soft hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function ToggleField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-soft">{hint}</p>
      </div>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            value ? "bg-ink text-parchment" : "text-ink-soft hover:text-ink"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !value ? "bg-ink text-parchment" : "text-ink-soft hover:text-ink"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
