import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Inbox,
  Linkedin,
  Mail,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/app/content/")({
  head: () => ({ meta: [{ title: "Content Workspace — Crafted Virtue" }] }),
  component: ContentList,
});

type Stage =
  | "Draft"
  | "In Review"
  | "Awaiting Approval"
  | "Approved"
  | "Scheduled"
  | "Published"
  | "Needs Revision";

const STAGES: Stage[] = [
  "Draft",
  "In Review",
  "Awaiting Approval",
  "Approved",
  "Scheduled",
  "Published",
  "Needs Revision",
];

type Risk = "Low" | "Medium" | "High";

type Item = {
  id: string;
  title: string;
  excerpt: string;
  type: string;
  platforms: string[];
  status: Stage;
  voice: number;
  factCheck: "verified" | "1 claim flagged" | "pending";
  risk: Risk;
  agent: string;
  updated: string;
};

const ITEMS: Item[] = [
  { id: "i1", title: "Why AI Governance Is a Board-Level Question", excerpt: "Most boards still treat AI as an IT issue. Here's the framework I use to elevate the conversation.", type: "LinkedIn post", platforms: ["LinkedIn"], status: "Awaiting Approval", voice: 94, factCheck: "verified", risk: "Low", agent: "Leo", updated: "12m ago" },
  { id: "i2", title: "The Operator's Guide to Quiet Influence", excerpt: "Authority compounds when you translate technical depth into board-level language.", type: "Newsletter essay", platforms: ["Newsletter", "Blog"], status: "Awaiting Approval", voice: 91, factCheck: "verified", risk: "Low", agent: "Leo", updated: "38m ago" },
  { id: "i3", title: "Three Questions Before Any AI Pilot", excerpt: "A short carousel framework I use whenever a portfolio company asks where to start with AI.", type: "Carousel", platforms: ["LinkedIn"], status: "In Review", voice: 88, factCheck: "1 claim flagged", risk: "Medium", agent: "Talia", updated: "1h ago" },
  { id: "i4", title: "Field notes: what mid-market CIOs asked us last week", excerpt: "Five questions surfaced repeatedly. Each one signals a budget shift.", type: "X thread", platforms: ["X"], status: "Awaiting Approval", voice: 90, factCheck: "verified", risk: "Low", agent: "Sam", updated: "2h ago" },
  { id: "i5", title: "Why we rewrote our operating cadence", excerpt: "A teardown of the rituals that actually moved the needle this quarter.", type: "Blog post", platforms: ["Blog", "Newsletter"], status: "Scheduled", voice: 92, factCheck: "verified", risk: "Low", agent: "Sam", updated: "3h ago" },
  { id: "i6", title: "Capital discipline in volatile cycles", excerpt: "The discipline of not deploying is a strategy, not a pause.", type: "LinkedIn post", platforms: ["LinkedIn"], status: "Approved", voice: 95, factCheck: "verified", risk: "Low", agent: "Olivia", updated: "5h ago" },
  { id: "i7", title: "On choosing convictions slowly", excerpt: "Conviction is expensive. Spend it on the right calls.", type: "Newsletter intro", platforms: ["Newsletter"], status: "Published", voice: 93, factCheck: "verified", risk: "Low", agent: "Olivia", updated: "Yesterday" },
  { id: "i8", title: "What I got wrong about distribution", excerpt: "A candid retrospective on five years of channel decisions.", type: "Blog post", platforms: ["Blog"], status: "Draft", voice: 86, factCheck: "pending", risk: "Low", agent: "Leo", updated: "Yesterday" },
  { id: "i9", title: "Provocative take on AI hype", excerpt: "Why most enterprise AI initiatives stall at the proof-of-concept stage.", type: "LinkedIn post", platforms: ["LinkedIn"], status: "Needs Revision", voice: 78, factCheck: "1 claim flagged", risk: "High", agent: "Leo", updated: "2d ago" },
];

const PLATFORM_ICON: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Blog: FileText,
  Newsletter: Mail,
};

const STATUS_TONE: Record<Stage, string> = {
  "Draft": "bg-muted text-ink-soft",
  "In Review": "bg-accent text-ink",
  "Awaiting Approval": "bg-warning/20 text-ink",
  "Approved": "bg-success/15 text-ink",
  "Scheduled": "bg-primary/12 text-primary",
  "Published": "bg-ink text-parchment",
  "Needs Revision": "bg-destructive/15 text-destructive",
};

const RISK_TONE: Record<Risk, string> = {
  Low: "text-success",
  Medium: "text-warning",
  High: "text-destructive",
};

function ContentList() {
  const [filter, setFilter] = useState<Stage | "All">("All");
  const items = filter === "All" ? ITEMS : ITEMS.filter((i) => i.status === filter);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>Workspace</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Content Workspace</h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Plan, review, approve, and refine the content your agent prepares.
          </p>
        </div>
        <Link
          to="/app/content/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:bg-ink/90"
        >
          + New Content Request
        </Link>
      </header>

      <div className="flex flex-wrap gap-2">
        <FilterPill label="All" count={ITEMS.length} active={filter === "All"} onClick={() => setFilter("All")} />
        {STAGES.map((s) => (
          <FilterPill
            key={s}
            label={s}
            count={ITEMS.filter((i) => i.status === s).length}
            active={filter === s}
            onClick={() => setFilter(s)}
          />
        ))}
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-parchment-deep">
            <Inbox className="h-5 w-5 text-ink-soft" />
          </div>
          <h2 className="mt-4 font-display text-2xl">No content in this stage yet.</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Your agent will prepare drafts once you submit a topic or approve a campaign plan.
          </p>
          <Link
            to="/app/content/new"
            className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment hover:bg-ink/90"
          >
            New Content Request
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((it) => (
            <ContentCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}

function ContentCard({ item }: { item: Item }) {
  const FactIcon =
    item.factCheck === "verified" ? ShieldCheck : item.factCheck === "pending" ? Shield : ShieldAlert;
  const factTone =
    item.factCheck === "verified"
      ? "text-success"
      : item.factCheck === "pending"
        ? "text-ink-soft"
        : "text-warning";

  return (
    <Card className="flex flex-col p-5">
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
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_TONE[item.status]}`}
        >
          {item.status}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg leading-snug text-ink">{item.title}</h3>
      <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{item.excerpt}</p>

      <p className="mt-3 text-[11px] uppercase tracking-wider text-ink-soft">{item.type}</p>

      <div className="editorial-rule my-4" />

      <dl className="grid grid-cols-3 gap-3 text-xs">
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
          <dt className="text-ink-soft">Fact-check</dt>
          <dd className={`mt-1 flex items-center gap-1 ${factTone}`}>
            <FactIcon className="h-3 w-3" />
            <span className="truncate">{item.factCheck}</span>
          </dd>
        </div>
        <div>
          <dt className="text-ink-soft">Risk</dt>
          <dd className={`mt-1 font-medium ${RISK_TONE[item.risk]}`}>{item.risk}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <p className="text-[11px] text-ink-soft">
          {item.agent} · {item.updated}
        </p>
        <Button size="sm" variant="outline" className="rounded-full">
          Review <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-ink text-parchment"
          : "border border-border bg-card text-ink-soft hover:border-ink/30 hover:text-ink"
      }`}
    >
      {label}
      <span className={`tabular-nums ${active ? "text-parchment/70" : "text-ink-soft/70"}`}>{count}</span>
    </button>
  );
}
