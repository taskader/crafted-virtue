import { useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { toast } from "sonner";
import { AgentAvatar } from "@/components/agent-avatar";
import {
  PUBLISHED_DAYS,
  SCHEDULED_DAYS,
  type Platform,
  type PostStatus,
  type TimelineDay,
  type TimelineMetrics,
  type TimelinePost,
} from "@/data/publishingTimelineData";
import { publishPostNow, reschedulePost } from "@/services/postizTimelineAdapter";

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
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${PLATFORM_ACCENT[platform]}`}
    >
      {PLATFORM_LABEL[platform]}
    </span>
  );
}

function StatusTag({ status }: { status: PostStatus }) {
  const map: Record<PostStatus, string> = {
    scheduled: "bg-primary/10 text-primary ring-primary/25",
    published: "bg-success/10 text-success ring-success/30",
    failed: "bg-destructive/10 text-destructive ring-destructive/30",
    draft: "bg-muted text-ink-soft ring-border",
    awaiting_approval: "bg-warning/15 text-ink ring-warning/40",
  };
  const label = status.replace("_", " ");
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ring-1 ring-inset ${map[status]}`}
    >
      {label}
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
// Card shell + per-platform cards
// ============================================================================

function CardShell({
  children,
  className = "",
  accentBorder,
}: {
  children: React.ReactNode;
  className?: string;
  accentBorder?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-card p-5 shadow-soft transition hover:shadow-md ${
        accentBorder ?? "border-border/70"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function AuthorRow({
  name,
  handle,
  subline,
  time,
  agent,
}: {
  name: string;
  handle?: string;
  subline?: string;
  time?: string;
  agent?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <AgentAvatar name={agent ?? name} size="md" />
        <div>
          <p className="text-sm font-medium leading-tight text-ink">{name}</p>
          {subline ? (
            <p className="text-[11px] leading-tight text-ink-soft">{subline}</p>
          ) : handle ? (
            <p className="text-[11px] leading-tight text-ink-soft">{handle}</p>
          ) : null}
        </div>
      </div>
      {time && <p className="text-[11px] text-ink-soft whitespace-nowrap">{time}</p>}
    </div>
  );
}

function MediaPlaceholder({ label }: { label?: string }) {
  return (
    <div className="mt-3 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-parchment-deep via-card to-accent/60">
      <div className="text-center">
        <div className="mx-auto mb-1 grid size-9 place-items-center rounded-full bg-card ring-1 ring-border/60">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{label ?? "Visual"}</p>
      </div>
    </div>
  );
}

export function XPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell>
      <div className="mb-2 flex items-center gap-2">
        <PlatformTag platform="x" />
        <StatusTag status={post.status} />
      </div>
      <AuthorRow
        name={post.authorName}
        handle={post.authorHandle}
        time={post.publishedAt ?? post.scheduledAt}
        agent={post.createdByAgent}
      />
      <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">
        {post.content}
      </p>
      {post.mediaType && <MediaPlaceholder />}
      <EngagementMetricsRow platform="x" metrics={post.metrics} />
    </CardShell>
  );
}

export function LinkedInPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-[oklch(0.45_0.12_245)]/20">
      <div className="mb-2 flex items-center gap-2">
        <PlatformTag platform="linkedin" />
        <StatusTag status={post.status} />
      </div>
      <AuthorRow
        name={post.authorName}
        subline={post.authorSubline ?? post.authorHandle}
        time={post.publishedAt ?? post.scheduledAt}
        agent={post.createdByAgent}
      />
      <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">
        {post.content}
      </p>
      {post.mediaType && <MediaPlaceholder />}
      <EngagementMetricsRow platform="linkedin" metrics={post.metrics} />
      <RecentComments comments={post.recentComments} />
    </CardShell>
  );
}

export function FacebookPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-[oklch(0.5_0.14_255)]/20">
      <div className="mb-2 flex items-center gap-2">
        <PlatformTag platform="facebook" />
        <StatusTag status={post.status} />
      </div>
      <AuthorRow
        name={post.authorName}
        handle={post.authorHandle}
        time={post.publishedAt ?? post.scheduledAt}
        agent={post.createdByAgent}
      />
      <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">
        {post.content}
      </p>
      {post.mediaType && <MediaPlaceholder />}
      <EngagementMetricsRow platform="facebook" metrics={post.metrics} />
    </CardShell>
  );
}

export function InstagramPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-[oklch(0.6_0.18_15)]/20" className="overflow-hidden p-0">
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <div className="flex items-center gap-2">
          <PlatformTag platform="instagram" />
          <StatusTag status={post.status} />
        </div>
        <span className="text-[11px] text-ink-soft">{post.publishedAt ?? post.scheduledAt}</span>
      </div>
      <div className="mt-3 px-5">
        <AuthorRow name={post.authorName} handle={"@" + post.authorHandle.replace(/^@/, "")} agent={post.createdByAgent} />
      </div>
      <div className="mt-3 px-5">
        <MediaPlaceholder label="Photo" />
      </div>
      <div className="px-5 pb-5">
        <p className="mt-3 text-[14px] leading-relaxed text-ink">{post.content}</p>
        <EngagementMetricsRow platform="instagram" metrics={post.metrics} />
      </div>
    </CardShell>
  );
}

export function YouTubePostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-destructive/20" className="overflow-hidden p-0">
      <div className="flex items-center gap-2 px-5 pt-5">
        <PlatformTag platform="youtube" />
        <StatusTag status={post.status} />
      </div>
      <div className="mx-5 mt-3 grid aspect-video place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-ink via-ink-soft to-destructive/40">
        <div className="grid size-12 place-items-center rounded-full bg-destructive text-parchment ring-4 ring-parchment/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
        </div>
      </div>
      <div className="px-5 pb-5 pt-3">
        <h3 className="font-display text-lg leading-snug text-ink">{post.title}</h3>
        <p className="mt-1 text-[13px] text-ink-soft">{post.content}</p>
        <p className="mt-2 text-[11px] text-ink-soft">
          {post.authorName} · {post.publishedAt ?? post.scheduledAt}
        </p>
        <EngagementMetricsRow platform="youtube" metrics={post.metrics} />
      </div>
    </CardShell>
  );
}

export function BlogPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-[oklch(0.55_0.13_25)]/20">
      <div className="mb-2 flex items-center gap-2">
        <PlatformTag platform="blog" />
        <StatusTag status={post.status} />
        {post.category && (
          <span className="text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
            · {post.category}
          </span>
        )}
      </div>
      <h3 className="font-display text-xl leading-tight tracking-tight text-ink">{post.title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{post.excerpt ?? post.content}</p>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-soft">
        <span>
          {post.authorName} · {post.publishedAt ?? post.scheduledAt}
        </span>
        {post.readTime && <span>{post.readTime}</span>}
      </div>
      <EngagementMetricsRow platform="blog" metrics={post.metrics} />
    </CardShell>
  );
}

export function NewsletterPostCard({ post }: { post: TimelinePost }) {
  return (
    <CardShell accentBorder="border-brass/30">
      <div className="mb-2 flex items-center gap-2">
        <PlatformTag platform="newsletter" />
        <StatusTag status={post.status} />
      </div>
      <p className="text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">Subject</p>
      <h3 className="mt-1 font-display text-xl leading-tight tracking-tight text-ink">
        {post.subjectLine ?? post.title}
      </h3>
      {post.previewText && (
        <p className="mt-2 text-[13px] italic text-ink-soft">"{post.previewText}"</p>
      )}
      <p className="mt-3 text-[13.5px] leading-relaxed text-ink">{post.content}</p>
      <p className="mt-2 text-[11px] text-ink-soft">
        {post.authorName} · {post.publishedAt ?? post.scheduledAt}
      </p>
      <EngagementMetricsRow platform="newsletter" metrics={post.metrics} />
    </CardShell>
  );
}

export function ScheduledPostCard({ post }: { post: TimelinePost }) {
  const awaiting = post.status === "awaiting_approval";
  const handlePublish = async () => {
    if (awaiting) {
      toast("Opening approval review…");
      return;
    }
    await publishPostNow(post.id);
    toast.success("Publish queued in Postiz.");
  };
  const handleReschedule = async () => {
    await reschedulePost(post.id, post.date);
    toast("Rescheduling flow opened.");
  };

  return (
    <CardShell className="border-dashed">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PlatformTag platform={post.platform} />
        <StatusTag status={post.status} />
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-ink-soft">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {post.scheduledAt}
        </span>
      </div>

      {post.title && (
        <h3 className="font-display text-lg leading-snug text-ink">{post.title}</h3>
      )}
      {post.subjectLine && !post.title && (
        <h3 className="font-display text-lg leading-snug text-ink">{post.subjectLine}</h3>
      )}
      <p className="mt-1 whitespace-pre-line text-[13.5px] leading-relaxed text-ink-soft">
        {post.content}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-ink-soft">
        {post.createdByAgent && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-parchment-deep pl-1 pr-2 py-0.5">
            <AgentAvatar name={post.createdByAgent} size="xs" />
            <span>Drafted by {post.createdByAgent}</span>
          </span>
        )}
        {post.voiceScore != null && (
          <span className="rounded-full bg-accent/60 px-2 py-0.5 ring-1 ring-inset ring-primary/15">
            Voice {post.voiceScore}
          </span>
        )}
        {post.factCheckStatus && (
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-success ring-1 ring-inset ring-success/30">
            Facts {post.factCheckStatus}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4">
        <button
          onClick={handlePublish}
          className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-parchment hover:bg-ink/90"
        >
          {awaiting ? "Review & Approve" : "Publish Now"}
        </button>
        <button
          onClick={handleReschedule}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Reschedule
        </button>
        <button
          onClick={() => toast("Opened in editor.")}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Edit
        </button>
        {post.postizPostId && (
          <span className="ml-auto self-center text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            Postiz · {post.postizPostId}
          </span>
        )}
      </div>
    </CardShell>
  );
}

export function PlatformPostCard({ post }: { post: TimelinePost }) {
  if (post.status === "scheduled" || post.status === "awaiting_approval") {
    return <ScheduledPostCard post={post} />;
  }
  switch (post.platform) {
    case "x":
      return <XPostCard post={post} />;
    case "linkedin":
      return <LinkedInPostCard post={post} />;
    case "facebook":
      return <FacebookPostCard post={post} />;
    case "instagram":
      return <InstagramPostCard post={post} />;
    case "youtube":
      return <YouTubePostCard post={post} />;
    case "blog":
      return <BlogPostCard post={post} />;
    case "newsletter":
      return <NewsletterPostCard post={post} />;
    default:
      return <XPostCard post={post} />;
  }
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

      {/* Posts column */}
      <div className="relative space-y-4">
        {day.posts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
];

export function PublishingTimeline() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<"all" | Platform>("all");
  const [status, setStatus] = useState<"all" | PostStatus>("all");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end 0.8"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  const { scheduled, published } = useMemo(() => {
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
    const filterDays = (days: TimelineDay[]) =>
      days
        .map((d) => ({ ...d, posts: d.posts.filter(matches) }))
        .filter((d) => d.posts.length > 0);
    return { scheduled: filterDays(SCHEDULED_DAYS), published: filterDays(PUBLISHED_DAYS) };
  }, [query, platform, status]);

  return (
    <div>
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
        {/* Vertical rail (desktop only) */}
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

        {/* Scheduled section */}
        {scheduled.length > 0 && (
          <section className="space-y-12">
            <div className="md:pl-[200px]">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                Scheduled next
              </p>
              <h2 className="mt-1 font-display text-2xl tracking-tight text-ink">
                Posts queued in Postiz
              </h2>
            </div>
            {scheduled.map((d) => (
              <TimelineDateGroup key={`s-${d.date}`} day={d} />
            ))}
          </section>
        )}

        {/* Divider */}
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

        {/* Published */}
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
    </div>
  );
}
