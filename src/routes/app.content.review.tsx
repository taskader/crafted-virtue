import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Archive,
  ArrowLeft,
  CalendarClock,
  Check,
  CheckCircle2,
  FileText,
  Linkedin,
  Mail,
  MessageSquare,
  Save,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/app/content/review")({
  head: () => ({ meta: [{ title: "Review draft — Crafted Virtue" }] }),
  component: ContentReview,
});

const VARIANTS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    body: `AI governance is no longer a technical side issue. For biotech leaders, it is becoming an operating discipline.

The companies that move fastest will not be the ones that automate everything. They will be the ones that know which decisions should remain human, which workflows can be accelerated, and which risks must be visible before scale.

In R&D, speed matters. But unexamined speed creates fragile systems. Strong governance does not slow innovation down. It gives innovation a safer path to compound.`,
  },
  {
    id: "x",
    label: "X Thread",
    icon: Twitter,
    body: `1/ AI governance is no longer a technical side issue for biotech leaders. It's becoming an operating discipline.

2/ The fastest companies won't automate everything. They'll know which decisions stay human, which workflows can be accelerated, and which risks must be visible before scale.

3/ In R&D, speed matters. Unexamined speed creates fragile systems.

4/ Strong governance doesn't slow innovation. It gives it a safer path to compound.`,
  },
  {
    id: "newsletter",
    label: "Newsletter",
    icon: Mail,
    body: `This week I want to talk about something I'm hearing in almost every biotech boardroom: a quiet anxiety about AI governance.

Most leaders I speak with intuitively understand that AI is going to reshape R&D, regulatory submissions, and commercial operations. What they're less certain about is who owns the governance question — and what "good" looks like.

Here's the operating frame I've started using…`,
  },
  {
    id: "blog",
    label: "Blog Outline",
    icon: FileText,
    body: `I. Why AI governance is now an operating discipline for biotech
II. The decisions that should remain human
III. The workflows that can be safely accelerated
IV. The risks that must be visible before scale
V. A 90-day governance plan
VI. What "good" looks like in 2026`,
  },
];

const CITATIONS = [
  { label: "McKinsey biotech AI adoption report", type: "Industry report" },
  { label: "Nature Biotechnology, vol. 42, 2025", type: "Peer-reviewed study" },
  { label: "FDA draft guidance on AI/ML in drug development", type: "Regulatory guidance" },
];

const AGENT_NOTES = [
  { agent: "Leo", note: "Drafted with board-level framing." },
  { agent: "Talia", note: "Flagged one claim for citation and approved after Truth Filter review." },
  { agent: "Sam", note: "This topic aligns with your strongest content pillar." },
];

function ContentReview() {
  const [variant, setVariant] = useState(VARIANTS[0].id);
  const active = VARIANTS.find((v) => v.id === variant)!;

  return (
    <div className="space-y-6">
      <header>
        <Link
          to="/app/content"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" /> Content
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/20 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
              Awaiting Approval
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight text-balance">
              Why Biotech Leaders Need Better AI Governance
            </h1>
            <p className="mt-2 text-ink-soft">
              4 platform variants prepared from one source brief.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Editor */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {VARIANTS.map((v) => {
              const Icon = v.icon;
              const isActive = variant === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setVariant(v.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-parchment"
                      : "border-border bg-card text-ink-soft hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" /> {v.label}
                </button>
              );
            })}
          </div>

          <Card className="p-8">
            <div className="flex items-center justify-between">
              <SectionLabel>{active.label} draft</SectionLabel>
              <span className="text-[11px] text-ink-soft">v3 · auto-saved 2m ago</span>
            </div>
            <Textarea
              key={variant}
              defaultValue={active.body}
              rows={16}
              className="mt-4 resize-none border-0 bg-transparent p-0 font-display text-lg leading-relaxed text-ink shadow-none focus-visible:ring-0"
            />
          </Card>

          {/* Citations */}
          <Card className="p-6">
            <SectionLabel>Citations</SectionLabel>
            <div className="mt-3 space-y-2">
              {CITATIONS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between rounded-xl border border-border bg-parchment-deep px-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{c.label}</p>
                    <p className="text-[11px] text-ink-soft">{c.type}</p>
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-success">
                    [CITATION]
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Agent notes */}
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <SectionLabel>Agent notes</SectionLabel>
            </div>
            <ul className="mt-3 space-y-3">
              {AGENT_NOTES.map((n) => (
                <li key={n.agent} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-medium text-parchment">
                    {n.agent[0]}
                  </span>
                  <p className="text-sm leading-snug">
                    <span className="font-medium text-ink">{n.agent}:</span>{" "}
                    <span className="text-ink-soft">{n.note}</span>
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Actions */}
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    toast.success("Approved.", { description: "The post is now ready for scheduling." })
                  }
                  className="rounded-full bg-ink text-parchment hover:bg-ink/90"
                >
                  <Check className="h-4 w-4" /> Approve &amp; Schedule
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast("Revision requested.", { description: "Leo will return a new draft shortly." })}
                  className="rounded-full"
                >
                  <MessageSquare className="h-4 w-4" /> Request Revision
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => toast("Changes saved.")}
                  className="rounded-full text-ink-soft hover:text-ink"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => toast("Archived.")}
                  className="rounded-full text-ink-soft hover:text-ink"
                >
                  <Archive className="h-4 w-4" /> Archive
                </Button>
              </div>
            </div>
            <p className="mt-4 border-t border-border pt-3 text-center text-xs text-ink-soft">
              Nothing publishes until you approve it.
            </p>
          </Card>
        </section>

        {/* Right rail */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <SectionLabel>Voice Profile Score</SectionLabel>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl">91%</span>
              <span className="text-xs text-success">High match</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary" style={{ width: "91%" }} />
            </div>
          </Card>

          <Card className="p-5">
            <SectionLabel>Quality checks</SectionLabel>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-soft">
                  <ShieldCheck className="h-4 w-4 text-success" /> Fact Check
                </span>
                <span className="text-success">Passed</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-soft">
                  <ShieldAlert className="h-4 w-4 text-warning" /> Risk Level
                </span>
                <span className="text-warning">Medium</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-soft">
                  <CheckCircle2 className="h-4 w-4 text-success" /> Truth Filter
                </span>
                <span className="text-success">Cleared</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <SectionLabel>Team</SectionLabel>
            <ul className="mt-3 space-y-2 text-sm">
              <Person agent="Leo" role="Created by" />
              <Person agent="Talia" role="Reviewed by" />
              <Person agent="Alex" role="Research support" />
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <SectionLabel>Suggested publish window</SectionLabel>
            </div>
            <p className="mt-2 font-display text-lg">Tuesday · 9:00 AM</p>
            <p className="mt-1 text-xs text-ink-soft">
              Your audience's strongest LinkedIn engagement window.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Person({ agent, role }: { agent: string; role: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] font-medium text-parchment">
          {agent[0]}
        </span>
        <span className="text-ink">{agent}</span>
      </span>
      <span className="text-xs text-ink-soft">{role}</span>
    </li>
  );
}
