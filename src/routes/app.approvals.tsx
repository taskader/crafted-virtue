import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  FileText,
  Linkedin,
  Mail,
  MessageSquare,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/app/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Crafted Virtue" }] }),
  component: Approvals,
});

type Tab = "Awaiting your approval" | "Needs edits" | "Enterprise review" | "High-risk review";
const TABS: Tab[] = [
  "Awaiting your approval",
  "Needs edits",
  "Enterprise review",
  "High-risk review",
];

type Risk = "Low" | "Medium" | "High";

type Item = {
  id: string;
  title: string;
  preview: string;
  platforms: string[];
  risk: Risk;
  citation: "Verified" | "1 claim flagged" | "Pending";
  voice: number;
  publishOn: string;
  notes: { agent: string; note: string }[];
  tab: Tab;
  status: "Awaiting" | "Approved";
};

const INITIAL: Item[] = [
  {
    id: "a1",
    title: "Why Biotech Leaders Need Better AI Governance",
    preview:
      "AI governance is no longer a technical side issue. For biotech leaders, it is becoming an operating discipline. The companies that move fastest will not be the ones that automate everything…",
    platforms: ["LinkedIn", "Newsletter"],
    risk: "Medium",
    citation: "Verified",
    voice: 91,
    publishOn: "Tue · 9:00 AM",
    notes: [
      { agent: "Leo", note: "Drafted with board-level framing." },
      { agent: "Talia", note: "Truth Filter cleared after one citation added." },
    ],
    tab: "Awaiting your approval",
    status: "Awaiting",
  },
  {
    id: "a2",
    title: "The Operator's Guide to Quiet Influence",
    preview:
      "Authority compounds when you translate technical depth into board-level language. Here's the operating frame that's worked for me across three companies…",
    platforms: ["Newsletter", "Blog"],
    risk: "Low",
    citation: "Verified",
    voice: 93,
    publishOn: "Thu · 7:00 AM",
    notes: [
      { agent: "Leo", note: "Tight executive cadence." },
      { agent: "Sam", note: "Pillar match: Operating lessons (your top-performing pillar)." },
    ],
    tab: "Awaiting your approval",
    status: "Awaiting",
  },
  {
    id: "a3",
    title: "Three Questions Before Any AI Pilot",
    preview:
      "A short carousel framework I use whenever a portfolio company asks where to start with AI. Slide 1 sets the audit-committee frame…",
    platforms: ["LinkedIn"],
    risk: "Medium",
    citation: "1 claim flagged",
    voice: 88,
    publishOn: "Fri · 10:30 AM",
    notes: [
      { agent: "Talia", note: "Flagged: '90% of AI pilots fail' needs a citation." },
    ],
    tab: "Needs edits",
    status: "Awaiting",
  },
  {
    id: "a4",
    title: "Field notes: what mid-market CIOs asked us last week",
    preview:
      "Five questions surfaced repeatedly across last week's CIO conversations. Each one signals a budget shift heading into Q1…",
    platforms: ["X"],
    risk: "Low",
    citation: "Verified",
    voice: 90,
    publishOn: "Tue · 2:00 PM",
    notes: [{ agent: "Sam", note: "Strong topical alignment with current peer benchmark." }],
    tab: "Awaiting your approval",
    status: "Awaiting",
  },
  {
    id: "a5",
    title: "Portfolio commentary: Q3 distribution review",
    preview:
      "A candid look at what worked, what didn't, and the channel decisions we'll undo in Q4…",
    platforms: ["Blog", "Newsletter"],
    risk: "High",
    citation: "Pending",
    voice: 84,
    publishOn: "Pending",
    notes: [
      { agent: "Konrad", note: "Mentions specific portfolio companies — legal review required." },
      { agent: "Talia", note: "Recommend removing two named comparisons." },
    ],
    tab: "High-risk review",
    status: "Awaiting",
  },
  {
    id: "a6",
    title: "Joint LP letter draft",
    preview:
      "Co-authored framing for this quarter's LP communications. Pending sign-off from comms and CFO…",
    platforms: ["Blog"],
    risk: "Medium",
    citation: "Verified",
    voice: 89,
    publishOn: "Mon · TBD",
    notes: [{ agent: "Konrad", note: "Routed to enterprise approval workflow." }],
    tab: "Enterprise review",
    status: "Awaiting",
  },
];

const PLATFORM_ICON: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Blog: FileText,
  Newsletter: Mail,
};

const RISK_TONE: Record<Risk, string> = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/20 text-ink",
  High: "bg-destructive/15 text-destructive",
};

const REVISION_OPTIONS = [
  "More concise",
  "More evidence",
  "More personal voice",
  "Less promotional",
  "Different angle",
];

function Approvals() {
  const [tab, setTab] = useState<Tab>(TABS[0]);
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [revisionFor, setRevisionFor] = useState<Item | null>(null);
  const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState("");

  const list = items.filter((i) => i.tab === tab);

  const approve = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Approved" } : i)));
    toast.success("Approved.", {
      description: "The post is now ready for scheduling.",
    });
  };

  const openRevision = (item: Item) => {
    setRevisionFor(item);
    setSelectedRevisions([]);
    setCustomNote("");
  };

  const submitRevision = () => {
    if (!revisionFor) return;
    toast("Revision requested.", {
      description: `${revisionFor.notes[0]?.agent ?? "Leo"} is reworking the draft with your feedback.`,
    });
    setRevisionFor(null);
  };

  const toggleRevision = (val: string) => {
    setSelectedRevisions((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Approval queue</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Approvals</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Review content before anything goes live.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count = items.filter((i) => i.tab === t && i.status === "Awaiting").length;
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-ink text-parchment"
                  : "border border-border bg-card text-ink-soft hover:border-ink/30 hover:text-ink"
              }`}
            >
              {t}
              <span className={active ? "text-parchment/70" : "text-ink-soft/70"}>{count}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="font-display text-2xl">Inbox zero.</p>
          <p className="mt-2 text-sm text-ink-soft">Nothing waiting in this lane.</p>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {list.map((it) => (
            <ApprovalCard
              key={it.id}
              item={it}
              onApprove={() => approve(it.id)}
              onRevise={() => openRevision(it)}
            />
          ))}
        </div>
      )}

      <Dialog open={!!revisionFor} onOpenChange={(open) => !open && setRevisionFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              What should your agent change?
            </DialogTitle>
            <DialogDescription>
              Pick one or more directions. {revisionFor?.notes[0]?.agent ?? "Leo"} will return a new draft.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {REVISION_OPTIONS.map((o) => {
                const selected = selectedRevisions.includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => toggleRevision(o)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      selected
                        ? "border-ink bg-ink text-parchment"
                        : "border-border bg-card text-ink-soft hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="text-sm text-ink-soft">Custom note</label>
              <Textarea
                rows={4}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Anything specific you'd like reworked…"
                className="mt-1.5"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setRevisionFor(null)}>
              Cancel
            </Button>
            <Button
              onClick={submitRevision}
              className="rounded-full bg-ink text-parchment hover:bg-ink/90"
            >
              Send to agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ApprovalCard({
  item,
  onApprove,
  onRevise,
}: {
  item: Item;
  onApprove: () => void;
  onRevise: () => void;
}) {
  const CitationIcon =
    item.citation === "Verified" ? ShieldCheck : item.citation === "Pending" ? Shield : ShieldAlert;
  const citationTone =
    item.citation === "Verified"
      ? "text-success"
      : item.citation === "Pending"
        ? "text-ink-soft"
        : "text-warning";

  const isApproved = item.status === "Approved";

  return (
    <Card className={`flex flex-col p-6 ${isApproved ? "opacity-60" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {item.platforms.map((p) => {
            const Icon = PLATFORM_ICON[p] ?? FileText;
            return (
              <span
                key={p}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-parchment-deep px-2 py-0.5 text-[11px] text-ink-soft"
              >
                <Icon className="h-3 w-3" /> {p}
              </span>
            );
          })}
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${RISK_TONE[item.risk]}`}
        >
          {item.risk} risk
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl leading-snug">{item.title}</h3>
      <p className="mt-2 text-sm text-ink-soft line-clamp-3">{item.preview}</p>

      <div className="editorial-rule my-4" />

      <dl className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <dt className="text-ink-soft">Citations</dt>
          <dd className={`mt-1 inline-flex items-center gap-1 ${citationTone}`}>
            <CitationIcon className="h-3 w-3" /> {item.citation}
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Voice</dt>
          <dd className="mt-1 flex items-center gap-1.5">
            <div className="h-1 w-10 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary" style={{ width: `${item.voice}%` }} />
            </div>
            <span className="tabular-nums text-ink">{item.voice}</span>
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Publish</dt>
          <dd className="mt-1 inline-flex items-center gap-1 text-ink">
            <CalendarClock className="h-3 w-3 text-ink-soft" /> {item.publishOn}
          </dd>
        </div>
      </dl>

      {item.notes.length > 0 && (
        <ul className="mt-4 space-y-2 rounded-xl border border-border bg-parchment-deep/50 p-3">
          {item.notes.map((n, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-medium text-parchment">
                {n.agent[0]}
              </span>
              <p className="leading-snug">
                <span className="font-medium text-ink">{n.agent}:</span>{" "}
                <span className="text-ink-soft">{n.note}</span>
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        {isApproved ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-xs font-medium text-success">
            <Check className="h-3 w-3" /> Approved
          </span>
        ) : (
          <>
            <Button
              size="sm"
              onClick={onApprove}
              className="rounded-full bg-ink text-parchment hover:bg-ink/90"
            >
              <Check className="h-3 w-3" /> Approve
            </Button>
            <Button size="sm" variant="outline" onClick={onRevise} className="rounded-full">
              <MessageSquare className="h-3 w-3" /> Request Revision
            </Button>
          </>
        )}
        <Link
          to="/app/content/review"
          className="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Open detail <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </Card>
  );
}
