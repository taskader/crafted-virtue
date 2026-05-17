import { createContext, useContext, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { toast } from "sonner";
import { AgentAvatar } from "@/components/agent-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  PUBLISHED_DAYS,
  SCHEDULED_DAYS,
  type Platform,
  type PostStatus,
  type TimelineDay,
  type TimelineMetrics,
  type TimelinePost,
} from "@/data/publishingTimelineData";
import { publishNowFromTimeline, reschedulePost } from "@/services/postizTimelineAdapter";

// ============================================================================
// Timeline context — lets cards talk to the page-level state (publish, etc).
// ============================================================================

type TimelineCtx = {
  requestPublish: (post: TimelinePost) => void;
};

const TimelineContext = createContext<TimelineCtx | null>(null);
function useTimelineCtx() {
  return useContext(TimelineContext);
}


// ============================================================================
// Helpers
// ============================================================================

function fmt(n?: number) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return n.toString();
}

const PLATFORM_LABEL: Record<Platform, string> = {
  x: "X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  blog: "Blog",
  newsletter: "Newsletter",
};

// Hard per-platform max widths (px). Keeps cards feeling like real native
// social posts and lets multiple sit side-by-side on wider screens.
const PLATFORM_MAX_W: Record<Platform, number> = {
  x: 340,
  instagram: 340,
  facebook: 360,
  linkedin: 420,
  youtube: 420,
  blog: 420,
  newsletter: 420,
};

const PLATFORM_ACCENT: Record<Platform, string> = {
  x: "bg-ink text-parchment",
  linkedin: "bg-[oklch(0.45_0.12_245)] text-parchment",
  facebook: "bg-[oklch(0.5_0.14_255)] text-parchment",
  instagram: "bg-[oklch(0.6_0.18_15)] text-parchment",
  youtube: "bg-destructive text-destructive-foreground",
  blog: "bg-[oklch(0.55_0.13_25)] text-parchment",
  newsletter: "bg-brass text-ink",
};

function PlatformTag({ platform }: { platform: Platform }) {
  // Kept for the hero scheduled preview + dialog where the platform context isn't
  // obvious from the visual treatment. Quiet, not a SaaS badge.
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${PLATFORM_ACCENT[platform]}`}
    >
      {PLATFORM_LABEL[platform]}
    </span>
  );
}

// A small dot + label used inside the quiet control bar instead of loud pills.
function StatusDot({ status }: { status: PostStatus }) {
  const map: Record<PostStatus, { color: string; label: string }> = {
    scheduled: { color: "bg-primary", label: "Scheduled" },
    published: { color: "bg-success", label: "Published" },
    failed: { color: "bg-destructive", label: "Needs attention" },
    draft: { color: "bg-ink-soft", label: "Draft" },
    awaiting_approval: { color: "bg-warning", label: "Awaiting approval" },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-soft">
      <span className={`size-1.5 rounded-full ${s.color}`} />
      {s.label}
    </span>
  );
}

// ============================================================================
// Engagement metrics row + recent comments
// ============================================================================

function MetricItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-ink-soft">
      <span className="opacity-70">{icon}</span>
      <span className="tabular-nums text-ink">{value}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

const I = {
  heart: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  comment: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
  repost: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  share: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
  view: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  save: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>,
  open: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" /></svg>,
};

export function EngagementMetricsRow({
  platform,
  metrics,
}: {
  platform: Platform;
  metrics?: TimelineMetrics;
}) {
  if (!metrics) return null;
  const items: { label: string; value: string; icon: React.ReactNode }[] = [];

  if (platform === "x") {
    items.push(
      { label: "Replies", value: fmt(metrics.comments), icon: I.comment },
      { label: "Reposts", value: fmt(metrics.reposts), icon: I.repost },
      { label: "Likes", value: fmt(metrics.likes), icon: I.heart },
      { label: "Views", value: fmt(metrics.views), icon: I.view }
    );
  } else if (platform === "linkedin") {
    items.push(
      { label: "Reactions", value: fmt(metrics.reactions), icon: I.heart },
      { label: "Comments", value: fmt(metrics.comments), icon: I.comment },
      { label: "Reposts", value: fmt(metrics.reposts), icon: I.repost },
      { label: "Impressions", value: fmt(metrics.impressions), icon: I.view }
    );
  } else if (platform === "facebook") {
    items.push(
      { label: "Reactions", value: fmt(metrics.reactions), icon: I.heart },
      { label: "Comments", value: fmt(metrics.comments), icon: I.comment },
      { label: "Shares", value: fmt(metrics.shares), icon: I.share }
    );
  } else if (platform === "instagram") {
    items.push(
      { label: "Likes", value: fmt(metrics.likes), icon: I.heart },
      { label: "Comments", value: fmt(metrics.comments), icon: I.comment },
      { label: "Saves", value: fmt(metrics.saves), icon: I.save }
    );
  } else if (platform === "youtube") {
    items.push(
      { label: "Views", value: fmt(metrics.views), icon: I.view },
      { label: "Likes", value: fmt(metrics.likes), icon: I.heart },
      { label: "Comments", value: fmt(metrics.comments), icon: I.comment }
    );
  } else if (platform === "blog") {
    items.push(
      { label: "Views", value: fmt(metrics.views), icon: I.view },
      { label: "Shares", value: fmt(metrics.shares), icon: I.share },
      { label: "Comments", value: fmt(metrics.comments), icon: I.comment }
    );
  } else if (platform === "newsletter") {
    items.push(
      { label: "Sends", value: fmt(metrics.sends), icon: I.share },
      { label: "Opens", value: fmt(metrics.opens), icon: I.open },
      { label: "Clicks", value: fmt(metrics.clicks), icon: I.view }
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-[11px]">
      {items.map((m) => (
        <MetricItem key={m.label} {...m} />
      ))}
      {platform === "newsletter" && metrics.openRate != null && (
        <span className="ml-auto rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-medium text-ink">
          {metrics.openRate}% open rate
        </span>
      )}
    </div>
  );
}

function RecentComments({ comments }: { comments?: TimelinePost["recentComments"] }) {
  const [expanded, setExpanded] = useState(false);
  if (!comments?.length) return null;
  const shown = expanded ? comments : comments.slice(0, 1);
  return (
    <div className="mt-3 space-y-1.5 rounded-lg bg-parchment-deep/60 p-3 text-[11.5px]">
      {shown.map((c, i) => (
        <p key={i} className="text-ink-soft">
          <span className="font-medium text-ink">{c.author}</span>{" "}
          <span className="line-clamp-2">{c.text}</span>{" "}
          <span className="text-[10px] opacity-70">· {c.time}</span>
        </p>
      ))}
      {comments.length > 1 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
        >
          {expanded ? "Show less" : `Show ${comments.length - 1} more`}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Preview shell + per-platform native previews
// ============================================================================

// A quiet wrapper: hairline border, subtle background, no SaaS card chrome.
function PreviewShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border/40 bg-card ${className}`}
    >
      {children}
    </div>
  );
}

// --- shared sub-pieces ------------------------------------------------------

function AgentAttribution({ post }: { post: TimelinePost }) {
  const bits: { label: string; agent: string }[] = [];
  if (post.createdByAgent) bits.push({ label: "Drafted by", agent: post.createdByAgent });
  if (post.reviewedByAgent) bits.push({ label: "Reviewed by", agent: post.reviewedByAgent });
  if (!bits.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-ink-soft">
      {bits.map((b, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <AgentAvatar name={b.agent} size="xs" />
          <span>
            {b.label} <span className="text-ink">{b.agent}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

function MediaPlaceholder({
  label,
  ratio = "aspect-[4/3]",
  maxH = 240,
}: {
  label?: string;
  ratio?: string;
  maxH?: number;
}) {
  return (
    <div
      className={`relative grid ${ratio} w-full place-items-center overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-parchment-deep via-card to-accent/60`}
      style={{ maxHeight: `${maxH}px` }}
    >
      <div className="text-center">
        <div className="mx-auto mb-1 grid size-7 place-items-center rounded-full bg-card ring-1 ring-border/60">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>
        </div>
        <p className="text-[9.5px] uppercase tracking-[0.18em] text-ink-soft">{label ?? "Visual"}</p>
      </div>
    </div>
  );
}

// --- X / Twitter -----------------------------------------------------------
export function XPostPreview({ post }: { post: TimelinePost }) {
  const handle = post.authorHandle.startsWith("@") ? post.authorHandle : `@${post.authorHandle}`;
  return (
    <PreviewShell>
      <div className="flex items-start gap-3 p-4">
        <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
            <span className="text-[14px] font-semibold text-ink">{post.authorName}</span>
            <span className="text-[13px] text-ink-soft">{handle}</span>
            <span className="text-[13px] text-ink-soft">· {post.publishedAt ?? post.scheduledAt}</span>
          </div>
          <p className="mt-1 whitespace-pre-line text-[14px] leading-[1.45] text-ink">
            {post.content}
          </p>
          {post.mediaType && (
            <div className="mt-2.5">
              <MediaPlaceholder ratio="aspect-video" maxH={200} />
            </div>
          )}
          <EngagementMetricsRow platform="x" metrics={post.metrics} />
        </div>
      </div>
    </PreviewShell>
  );
}

// --- LinkedIn --------------------------------------------------------------
export function LinkedInPostPreview({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
            <div>
              <p className="text-[14px] font-semibold leading-tight text-ink">
                {post.authorName} <span className="text-[11px] font-normal text-ink-soft">· 1st</span>
              </p>
              <p className="mt-0.5 text-[12px] leading-snug text-ink-soft">
                {post.authorTitle ?? post.authorSubline ?? post.authorHandle}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-soft">
                {post.publishedAt ?? post.scheduledAt} · <span className="opacity-70">🌐</span>
              </p>
            </div>
          </div>
          <button className="rounded-full border border-[oklch(0.45_0.12_245)]/40 px-3 py-1 text-[11px] font-semibold text-[oklch(0.45_0.12_245)] hover:bg-[oklch(0.45_0.12_245)]/5">
            + Follow
          </button>
        </div>
        <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{post.content}</p>
        {post.mediaType && <div className="mt-3"><MediaPlaceholder ratio="aspect-video" maxH={260} /></div>}
        <EngagementMetricsRow platform="linkedin" metrics={post.metrics} />
        <RecentComments comments={post.recentComments} />
      </div>
    </PreviewShell>
  );
}

// --- Facebook --------------------------------------------------------------
export function FacebookPostPreview({ post }: { post: TimelinePost }) {
  const reactionCount = post.metrics?.reactions ?? post.metrics?.likes ?? 0;
  const others = Math.max(0, reactionCount - 1);
  return (
    <PreviewShell>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-tight text-ink">{post.authorName}</p>
            <p className="mt-0.5 text-[11.5px] text-ink-soft">
              {post.publishedAt ?? post.scheduledAt} · <span className="opacity-70">Public</span>
            </p>
          </div>
        </div>
        <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{post.content}</p>
        {post.mediaType && <div className="mt-3"><MediaPlaceholder ratio="aspect-video" maxH={220} /></div>}
        {reactionCount > 0 && (
          <div className="mt-3 flex items-center justify-between text-[11.5px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex -space-x-0.5">
                <span className="grid size-4 place-items-center rounded-full bg-[oklch(0.5_0.14_255)] text-[8px] text-parchment">👍</span>
                <span className="grid size-4 place-items-center rounded-full bg-destructive text-[8px] text-parchment">❤</span>
              </span>
              You and {fmt(others)} others
            </span>
            <span>
              {fmt(post.metrics?.comments)} comments · {fmt(post.metrics?.shares)} shares
            </span>
          </div>
        )}
      </div>
    </PreviewShell>
  );
}

// --- Instagram -------------------------------------------------------------
export function InstagramPostPreview({ post }: { post: TimelinePost }) {
  const handle = post.authorHandle.replace(/^@/, "");
  return (
    <PreviewShell>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-gradient-to-tr from-brass via-[oklch(0.6_0.18_15)] to-[oklch(0.55_0.13_25)] p-0.5">
            <AgentAvatar name={post.createdByAgent ?? post.authorName} size="md" className="ring-2 ring-card" />
          </span>
          <p className="text-[13px] font-semibold text-ink">@{handle}</p>
        </div>
      </div>
      <div className="border-y border-border/40">
        <MediaPlaceholder ratio="aspect-square" label="Photo" maxH={340} />
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center gap-3 text-ink">
          <span className="text-base">♡</span>
          <span className="text-base">💬</span>
          <span className="text-base">↗</span>
          <span className="ml-auto text-base">🔖</span>
        </div>
        {(post.metrics?.likes ?? 0) > 0 && (
          <p className="mt-2 text-[13px] font-semibold text-ink">{fmt(post.metrics?.likes)} likes</p>
        )}
        <p className="mt-1 text-[13px] leading-relaxed text-ink">
          <span className="font-semibold">@{handle}</span>{" "}
          <span>{post.content}</span>
        </p>
        {(post.metrics?.comments ?? 0) > 0 && (
          <button className="mt-1 text-[12px] text-ink-soft hover:text-ink">
            View all {fmt(post.metrics?.comments)} comments
          </button>
        )}
        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          {post.publishedAt ?? post.scheduledAt}
        </p>
      </div>
    </PreviewShell>
  );
}

// --- YouTube ---------------------------------------------------------------
export function YouTubePostPreview({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="relative">
        <div className="grid aspect-video place-items-center overflow-hidden bg-gradient-to-br from-ink via-ink-soft to-destructive/40">
          <button className="grid size-14 place-items-center rounded-full bg-destructive/90 text-parchment shadow-lg ring-4 ring-parchment/20 transition hover:scale-105">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
          </button>
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-ink/85 px-1.5 py-0.5 text-[10px] font-medium text-parchment">12:14</span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug text-ink">{post.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-ink-soft">
          <AgentAvatar name={post.authorName} size="sm" />
          <span className="text-ink">{post.authorName}</span>
          <span>· {fmt(post.metrics?.views)} views · {post.publishedAt ?? post.scheduledAt}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">{post.content}</p>
      </div>
    </PreviewShell>
  );
}

// --- Blog ------------------------------------------------------------------
export function BlogPostPreview({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="grid gap-0 md:grid-cols-[1fr_180px]">
        <div className="p-4">
          {post.category && (
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-ink-soft">
              {post.category}
            </p>
          )}
          <h3 className="mt-1 font-display text-xl leading-tight tracking-tight text-ink">{post.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{post.excerpt ?? post.content}</p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-soft">
            <AgentAvatar name={post.authorName} size="xs" />
            <span className="text-ink">{post.authorName}</span>
            <span>· {post.publishedAt ?? post.scheduledAt}</span>
            {post.readTime && <span>· {post.readTime}</span>}
          </div>
        </div>
        <div className="hidden p-4 pl-0 md:block">
          <MediaPlaceholder ratio="aspect-[4/5]" label="Cover" maxH={220} />
        </div>
      </div>
    </PreviewShell>
  );
}

// --- Newsletter ------------------------------------------------------------
export function NewsletterPostPreview({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="border-b border-border/40 px-4 py-2.5 text-[11px] text-ink-soft">
        <span className="text-ink">{post.authorName}</span> · {post.authorHandle} · {post.publishedAt ?? post.scheduledAt}
      </div>
      <div className="p-4">
        <p className="text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Subject</p>
        <h3 className="mt-1 font-display text-xl leading-tight tracking-tight text-ink">
          {post.subjectLine ?? post.title}
        </h3>
        {post.previewText && (
          <p className="mt-1.5 text-[12.5px] italic text-ink-soft">Preview: "{post.previewText}"</p>
        )}
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink">{post.content}</p>
        {post.metrics && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 pt-3 text-[11px] text-ink-soft">
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.sends)}</span> sent</span>
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.opens)}</span> opens</span>
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.clicks)}</span> clicks</span>
            {post.metrics.openRate != null && (
              <span className="ml-auto text-brass">{post.metrics.openRate}% open rate</span>
            )}
          </div>
        )}
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// Quiet Crafted Virtue control bar — sits below every preview
// ============================================================================

function ControlBar({ post }: { post: TimelinePost }) {
  const ctx = useTimelineCtx();
  const awaiting = post.status === "awaiting_approval";
  const failed = post.status === "failed";
  const scheduled = post.status === "scheduled";
  const published = post.status === "published";

  const onPublish = () => {
    if (ctx) ctx.requestPublish(post);
  };
  const onReschedule = async () => {
    await reschedulePost(post.id, post.date);
    toast("Rescheduling flow opened.");
  };

  const btnPrimary =
    "rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-parchment hover:bg-ink/90";
  const btnGhost =
    "rounded-full px-3 py-1 text-[11px] font-medium text-ink-soft hover:text-ink hover:bg-muted/60";

  // Compact meta line: scheduled time · approval · voice · facts
  const metaBits: React.ReactNode[] = [];
  if (scheduled || awaiting) {
    if (post.scheduledAt) metaBits.push(<span key="t">Scheduled {post.scheduledAt}</span>);
    if (post.approval || awaiting || scheduled) {
      metaBits.push(
        <span key="a">
          Approval: <span className="text-ink">{awaiting ? "Pending" : "Approved"}</span>
        </span>
      );
    }
  }
  if (post.voiceScore != null) metaBits.push(<span key="v">Voice <span className="text-ink tabular-nums">{post.voiceScore}</span></span>);
  if (post.factCheckStatus) {
    const fLabel = post.factCheckStatus === "verified" ? "Facts verified" : post.factCheckStatus === "pending" ? "Facts pending" : "Facts flagged";
    metaBits.push(<span key="f">{fLabel}</span>);
  }

  return (
    <div className="mt-2 space-y-1.5">
      {/* Failed warning — small, inline, never a giant red card */}
      {failed && (
        <div className="flex items-start gap-2 rounded-md border-l-2 border-destructive/70 bg-destructive/5 px-2.5 py-1.5 text-[11px] leading-snug text-ink">
          <svg className="mt-[2px] shrink-0 text-destructive" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>
            <span className="font-medium">Publishing issue:</span>{" "}
            <span className="text-ink-soft">{post.failureReason ?? "Channel returned an error."}</span>
          </span>
        </div>
      )}

      {metaBits.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 px-1 text-[10.5px] text-ink-soft">
          <StatusDot status={post.status} />
          {metaBits.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2.5">
              <span className="opacity-50">·</span>
              {b}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-1">
        {metaBits.length === 0 && <StatusDot status={post.status} />}
        <AgentAttribution post={post} />

        <span className="flex-1" />

        {awaiting && (
          <>
            <button onClick={onPublish} className={btnPrimary}>Review & Approve</button>
            <button onClick={() => toast("Revision requested. Author notified.")} className={btnGhost}>
              Request Revision
            </button>
          </>
        )}
        {scheduled && (
          <>
            <button onClick={onPublish} className={btnPrimary}>Publish Now</button>
            <button onClick={onReschedule} className={btnGhost}>Reschedule</button>
            <button onClick={() => toast("Opened in editor.")} className={btnGhost}>Edit</button>
          </>
        )}
        {failed && (
          <>
            <button onClick={() => toast.success("Publishing job re-queued.")} className={btnPrimary}>
              Retry
            </button>
            <button onClick={() => toast("Opened media fixer.")} className={btnGhost}>Fix Media</button>
            <button onClick={() => toast("Opened in editor.")} className={btnGhost}>Edit</button>
          </>
        )}
        {published && (
          <button onClick={() => toast("Opened in editor.")} className={btnGhost}>Edit</button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Scheduled hero card — compact, quiet, used inside "Scheduled Next" only
// ============================================================================

export function ScheduledPostCard({
  post,
  variant: _variant = "default",
}: {
  post: TimelinePost;
  variant?: "default" | "hero";
}) {
  return <PlatformPostCard post={post} />;
}

// PreviewPicker chooses the platform-native preview for any status.
function PreviewPicker({ post }: { post: TimelinePost }) {
  switch (post.platform) {
    case "x": return <XPostPreview post={post} />;
    case "linkedin": return <LinkedInPostPreview post={post} />;
    case "facebook": return <FacebookPostPreview post={post} />;
    case "instagram": return <InstagramPostPreview post={post} />;
    case "youtube": return <YouTubePostPreview post={post} />;
    case "blog": return <BlogPostPreview post={post} />;
    case "newsletter": return <NewsletterPostPreview post={post} />;
    default: return <XPostPreview post={post} />;
  }
}

export function PlatformPostCard({ post }: { post: TimelinePost }) {
  const maxW = PLATFORM_MAX_W[post.platform] ?? 360;
  return (
    <div className="w-full" style={{ maxWidth: `${maxW}px` }}>
      <PreviewPicker post={post} />
      <ControlBar post={post} />
    </div>
  );
}

// ============================================================================
// Date group
// ============================================================================

export function TimelineDateGroup({ day }: { day: TimelineDay }) {
  const sublabel =
    day.kind === "scheduled"
      ? "Scheduled"
      : day.kind === "today"
      ? "Latest"
      : "Published";

  return (
    <div className="relative grid gap-6 md:grid-cols-[160px_1fr] md:gap-10">
      {/* Date column — sticky on desktop */}
      <div className="md:sticky md:top-24 md:self-start">
        <div className="flex items-center gap-3 md:block">
          <p className="font-display text-3xl leading-none tracking-tight text-ink md:text-4xl">
            {day.label}
          </p>
          <p className="mt-0 text-[10.5px] uppercase tracking-[0.18em] text-ink-soft md:mt-2">
            {sublabel}
          </p>
        </div>
        <p className="mt-1 hidden text-[11px] text-ink-soft md:block">
          {day.posts.length} {day.posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {/* Posts column — responsive wrap so cards sit side-by-side */}
      <div className="relative flex flex-wrap items-start gap-5">
        {day.posts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full sm:w-auto sm:flex-[0_1_auto]"
          >
            <PlatformPostCard post={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


// ============================================================================
// Main Timeline
// ============================================================================

const PLATFORM_FILTERS: ({ id: "all" } | { id: Platform })[] = [
  { id: "all" },
  { id: "linkedin" },
  { id: "x" },
  { id: "facebook" },
  { id: "instagram" },
  { id: "youtube" },
  { id: "blog" },
  { id: "newsletter" },
];

const STATUS_FILTERS: { id: "all" | PostStatus; label: string }[] = [
  { id: "all", label: "All status" },
  { id: "scheduled", label: "Scheduled" },
  { id: "awaiting_approval", label: "Awaiting" },
  { id: "published", label: "Published" },
  { id: "failed", label: "Failed" },
];

const TODAY_ISO = "2026-05-18";
const TODAY_LABEL = "Today";

function flattenPosts(days: TimelineDay[]): TimelinePost[] {
  return days.flatMap((d) => d.posts);
}

function groupIntoDays(posts: TimelinePost[], kind: "scheduled" | "past"): TimelineDay[] {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const map = new Map<string, TimelinePost[]>();
  for (const p of posts) {
    const arr = map.get(p.date) ?? [];
    arr.push(p);
    map.set(p.date, arr);
  }
  const sorted = Array.from(map.entries()).sort(([a], [b]) =>
    kind === "scheduled" ? a.localeCompare(b) : b.localeCompare(a)
  );
  return sorted.map(([date, posts]) => {
    const [, m, d] = date.split("-").map(Number);
    const isToday = date === TODAY_ISO;
    return {
      date,
      label: isToday ? TODAY_LABEL : `${MONTHS[m - 1]} ${d}`,
      kind: isToday ? "today" : kind,
      posts,
    };
  });
}

export function PublishingTimeline() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<"all" | Platform>("all");
  const [status, setStatus] = useState<"all" | PostStatus>("all");

  // Lift scheduled & published into local state so Publish Now can move
  // a card from "scheduled" into "today's" published history.
  const [scheduledPosts, setScheduledPosts] = useState<TimelinePost[]>(() =>
    flattenPosts(SCHEDULED_DAYS)
  );
  const [publishedPosts, setPublishedPosts] = useState<TimelinePost[]>(() =>
    flattenPosts(PUBLISHED_DAYS)
  );

  const [pendingPublish, setPendingPublish] = useState<TimelinePost | null>(null);

  const requestPublish = (post: TimelinePost) => setPendingPublish(post);

  const confirmPublish = async () => {
    const post = pendingPublish;
    if (!post) return;
    // TODO(postiz): replace with real Postiz publish call from the adapter.
    await publishNowFromTimeline(post.id);
    const movedPost: TimelinePost = {
      ...post,
      status: "published",
      date: TODAY_ISO,
      publishedAt: "Just now",
      postizSyncedAt: "syncing…",
    };
    setScheduledPosts((s) => s.filter((p) => p.id !== post.id));
    setPublishedPosts((p) => [movedPost, ...p]);
    setPendingPublish(null);
    toast.success("Published. Engagement metrics will sync from your connected channels shortly.");
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.8"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  const { scheduled, published, scheduledNext } = useMemo(() => {
    const matches = (p: TimelinePost) => {
      if (platform !== "all" && p.platform !== platform) return false;
      if (status !== "all" && p.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.title ?? ""} ${p.subjectLine ?? ""} ${p.content} ${p.authorName}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    };
    const sched = scheduledPosts.filter(matches);
    const pub = publishedPosts.filter(matches);
    // "Scheduled Next" hero — first 4 upcoming across all dates (unfiltered for
    // platform/status so it always shows what's coming up; still respects search).
    const heroSource = query
      ? scheduledPosts.filter((p) => {
          const q = query.toLowerCase();
          const hay = `${p.title ?? ""} ${p.subjectLine ?? ""} ${p.content}`.toLowerCase();
          return hay.includes(q);
        })
      : scheduledPosts;
    const sortedHero = [...heroSource].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
    return {
      scheduled: groupIntoDays(sched, "scheduled"),
      published: groupIntoDays(pub, "past"),
      scheduledNext: sortedHero,
    };
  }, [query, platform, status, scheduledPosts, publishedPosts]);

  return (
    <TimelineContext.Provider value={{ requestPublish }}>
    <div>
      {/* Scheduled Next — prominent top block */}
      {scheduledNext.length > 0 && (
        <section className="mb-10 rounded-3xl border border-border/70 bg-gradient-to-br from-parchment-deep/80 via-card to-accent/40 p-5 shadow-soft md:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                Scheduled Next
              </p>
              <h2 className="mt-1 font-display text-2xl tracking-tight text-ink">
                The next {scheduledNext.length} {scheduledNext.length === 1 ? "post" : "posts"} ready to go
              </h2>
              <p className="mt-1 text-[12px] text-ink-soft">
                Approved and pending posts prepared by your Crafted Virtue Agent.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.16em] text-ink-soft">
              <span className="size-1.5 rounded-full bg-primary" />
              Synced with connected channels
            </span>
          </div>
          <div className="flex flex-wrap items-start gap-5">
            {scheduledNext.map((p) => (
              <ScheduledPostCard key={`hero-${p.id}`} post={p} variant="hero" />
            ))}
          </div>
          <p className="mt-4 text-[11px] text-ink-soft">
            Scheduled publishing runs through your connected channels in Crafted Virtue.
          </p>
        </section>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts"
            className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
          className="rounded-full border border-border bg-card px-3 py-2 text-xs"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
        <button
          onClick={() => toast("Date range picker coming soon.")}
          className="rounded-full border border-border bg-card px-3 py-2 text-xs"
        >
          Date range
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {PLATFORM_FILTERS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
              platform === p.id
                ? "border-ink bg-ink text-parchment"
                : "border-border text-ink-soft hover:text-ink"
            }`}
          >
            {p.id === "all" ? "All platforms" : PLATFORM_LABEL[p.id]}
          </button>
        ))}
      </div>

      <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-parchment-deep/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        <span className="size-1.5 rounded-full bg-success" />
        Only approved content can be published
      </p>

      {/* Timeline rail */}
      <div ref={containerRef} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 top-0 hidden md:block"
          style={{ left: "159px" }}
        >
          <div className="relative h-full w-px bg-border/70">
            <motion.div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-brass via-primary to-ink"
              style={{ height: lineHeight }}
            />
          </div>
        </div>

        {scheduled.length > 0 && (
          <section className="space-y-12">
            <div className="md:pl-[200px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                Scheduled Publishing Queue
              </p>
              <h2 className="mt-1 font-display text-2xl tracking-tight text-ink">
                Everything scheduled through Crafted Virtue
              </h2>
            </div>
            {scheduled.map((d) => (
              <TimelineDateGroup key={`s-${d.date}`} day={d} />
            ))}
          </section>
        )}

        {scheduled.length > 0 && published.length > 0 && (
          <div className="my-14 md:pl-[200px]">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-border/70" />
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                Published history
              </span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
          </div>
        )}

        {published.length > 0 && (
          <section className="space-y-12">
            <div className="md:pl-[200px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                Published history
              </p>
              <h2 className="mt-1 font-display text-2xl tracking-tight text-ink">
                Everything you've shipped
              </h2>
            </div>
            {published.map((d) => (
              <TimelineDateGroup key={`p-${d.date}`} day={d} />
            ))}
          </section>
        )}

        {scheduled.length === 0 && published.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-parchment-deep/50 px-6 py-14 text-center">
            <p className="font-display text-lg text-ink">No posts match those filters.</p>
            <p className="mt-1 text-sm text-ink-soft">Try clearing the search or platform filter.</p>
          </div>
        )}
      </div>

      <AlertDialog open={!!pendingPublish} onOpenChange={(o) => !o && setPendingPublish(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-ink">
              Publish this post now?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-ink-soft">
              This will send the approved post to your connected publishing workspace and mark it as published in Crafted Virtue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {pendingPublish && (
            <div className="rounded-xl border border-border/70 bg-parchment-deep/60 p-3 text-[12.5px]">
              <div className="flex items-center gap-2">
                <PlatformTag platform={pendingPublish.platform} />
                <span className="text-ink-soft">{pendingPublish.scheduledAt}</span>
              </div>
              {(pendingPublish.title || pendingPublish.subjectLine) && (
                <p className="mt-2 font-medium text-ink">
                  {pendingPublish.title ?? pendingPublish.subjectLine}
                </p>
              )}
              <p className="mt-1 line-clamp-2 text-ink-soft">{pendingPublish.content}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPublish}
              className="rounded-full bg-ink text-parchment hover:bg-ink/90"
            >
              Publish Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </TimelineContext.Provider>
  );
}
