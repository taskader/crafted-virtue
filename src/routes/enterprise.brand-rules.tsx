import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { toast } from "sonner";
import { Check, X, Pencil } from "lucide-react";

export const Route = createFileRoute("/enterprise/brand-rules")({
  head: () => ({ meta: [{ title: "Brand Rules — Enterprise" }] }),
  component: BrandRules,
});

const APPROVED = ["Operating discipline", "Capital allocation", "Portfolio construction", "AI governance", "Fund strategy"];
const RESTRICTED = ["Specific deal commentary", "Unannounced portfolio companies", "LP returns by fund", "Political endorsements"];
const REQUIRED = [
  "Disclose Northstar affiliation in bio",
  "Use 'we believe' framing for forward-looking views",
  "Cite source for any performance claim",
];
const AVOIDED = ["guaranteed returns", "alpha generation machine", "10x", "disruptive", "best in class"];
const COMPLIANCE = [
  "All public market commentary requires legal review before publishing.",
  "Mentions of regulators or pending litigation require General Counsel sign-off.",
  "ESG claims must reference an underlying methodology.",
];
const CITATIONS = [
  "Any performance number requires a primary source link.",
  "External research must be attributed with author and publish date.",
  "Quotes from portfolio leaders require explicit permission on file.",
];
const APPROVAL_PATH = [
  { step: "1", who: "Executive", what: "Drafts and edits content with their agent." },
  { step: "2", who: "Brand Manager", what: "Reviews voice, narrative fit, and brand rules." },
  { step: "3", who: "Legal Reviewer", what: "Approves anything flagged by the Truth Filter." },
  { step: "4", who: "Enterprise Admin", what: "Final release into the publishing queue." },
];

type ChipKind = "approved" | "restricted" | "preferred" | "avoided";
function chipClass(k: ChipKind) {
  return {
    approved: "bg-success/15 text-ink",
    restricted: "bg-destructive/10 text-destructive",
    preferred: "bg-success/15 text-ink",
    avoided: "bg-destructive/10 text-destructive line-through",
  }[k];
}

function RuleCard({ title, subtitle, children, onEdit }: { title: string; subtitle?: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <SectionLabel>{title}</SectionLabel>
          {subtitle && <p className="mt-1 text-xs text-ink-soft">{subtitle}</p>}
        </div>
        <button
          onClick={onEdit ?? (() => toast("Edit dialog opened."))}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs"
        >
          <Pencil className="h-3 w-3" /> Edit
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </Card>
  );
}

function BrandRules() {
  return (
    <EnterpriseShell>
      <header className="max-w-2xl">
        <SectionLabel>Governance</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Brand Rules</h1>
        <p className="mt-2 text-ink-soft">The guardrails every executive's agent operates inside. Edits propagate to all draft generation immediately.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <RuleCard title="Approved topics" subtitle="Themes any executive can publish without escalation.">
          <div className="flex flex-wrap gap-2">
            {APPROVED.map((t) => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs ${chipClass("approved")}`}>
                <Check className="mr-1 inline h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        </RuleCard>

        <RuleCard title="Restricted topics" subtitle="Drafts on these topics route to Legal automatically.">
          <div className="flex flex-wrap gap-2">
            {RESTRICTED.map((t) => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs ${chipClass("restricted")}`}>
                <X className="mr-1 inline h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        </RuleCard>

        <RuleCard title="Required language" subtitle="Phrasing the voice model must include where relevant.">
          <ul className="space-y-2 text-sm">
            {REQUIRED.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </RuleCard>

        <RuleCard title="Avoided language" subtitle="Terms the voice model rewrites or removes.">
          <div className="flex flex-wrap gap-2">
            {AVOIDED.map((t) => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs ${chipClass("avoided")}`}>{t}</span>
            ))}
          </div>
        </RuleCard>

        <RuleCard title="Compliance notes">
          <ul className="space-y-3 text-sm">
            {COMPLIANCE.map((c) => (
              <li key={c} className="rounded-xl border border-border/60 bg-parchment-deep p-3">{c}</li>
            ))}
          </ul>
        </RuleCard>

        <RuleCard title="Citation requirements">
          <ul className="space-y-3 text-sm">
            {CITATIONS.map((c) => (
              <li key={c} className="rounded-xl border border-border/60 bg-parchment-deep p-3">{c}</li>
            ))}
          </ul>
        </RuleCard>
      </div>

      <RuleCard title="Default approval path" subtitle="Every published piece walks this path unless rules escalate it.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {APPROVAL_PATH.map((s) => (
            <div key={s.step} className="rounded-xl border border-border/70 bg-parchment-deep p-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs text-parchment">{s.step}</span>
              <p className="mt-3 font-medium">{s.who}</p>
              <p className="mt-1 text-xs text-ink-soft">{s.what}</p>
            </div>
          ))}
        </div>
      </RuleCard>
    </EnterpriseShell>
  );
}
