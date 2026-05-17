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
// Timeline context — lets cards talk to page state + per-card expansion.
// ============================================================================

type TimelineCtx = {
  requestPublish: (post: TimelinePost) => void;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
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

// Hard per-platform max widths (px).
const PLATFORM_MAX_W: Record<Platform, number> = {
  x: 340,
  instagram: 340,
  facebook: 380,
  linkedin: 420,
  youtube: 420,
  blog: 420,
  newsletter: 420,
};

// ============================================================================
// PlatformLogo — small native SVG marks
// ============================================================================

export function PlatformLogo({ platform, size = 14 }: { platform: Platform; size?: number }) {
  const s = size;
  switch (platform) {
    case "x":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2H21.5l-7.5 8.567L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.02-9.164L1 2h7.02l4.85 6.41L18.244 2Zm-1.2 18h1.86L7.05 4H5.07l11.974 16Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.5A1.75 1.75 0 1 1 8.25 5.75 1.75 1.75 0 0 1 6.5 7.5ZM19 19h-3v-5c0-1.2-.5-2-1.5-2A1.7 1.7 0 0 0 13 13.7V19h-3V9h3v1.3a3.3 3.3 0 0 1 2.8-1.5c2 0 3.2 1.3 3.2 3.7V19Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.07 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.07-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.78 3.78 0 0 1-1.38-.9 3.78 3.78 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 5.6a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.93a2.73 2.73 0 1 1 0-5.46 2.73 2.73 0 0 1 0 5.46Zm5.34-7.1a.98.98 0 1 1-1.96 0 .98.98 0 0 1 1.96 0Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
        </svg>
      );
    case "blog":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M5 3h11l5 5v13H5V3Zm10 1.5V9h4.5L15 4.5ZM8 12h8v1.5H8V12Zm0 3h8v1.5H8V15Zm0 3h5v1.5H8V18Z" />
        </svg>
      );
    case "newsletter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 5h18v14H3V5Zm9 8.5L4 7h16l-8 6.5Z" />
        </svg>
      );
  }
}

const PLATFORM_COLOR: Record<Platform, string> = {
  x: "#000000",
  linkedin: "#0a66c2",
  facebook: "#1877f2",
  instagram: "#e1306c",
  youtube: "#ff0000",
  blog: "oklch(0.45 0.13 25)",
  newsletter: "oklch(0.58 0.12 75)",
};

export function PlatformBadge({ platform, size = 22 }: { platform: Platform; size?: number }) {
  return (
    <span
      className="inline-grid place-items-center rounded-full text-white"
      style={{ width: size, height: size, backgroundColor: PLATFORM_COLOR[platform] }}
      aria-label={PLATFORM_LABEL[platform]}
    >
      <PlatformLogo platform={platform} size={Math.round(size * 0.6)} />
    </span>
  );
}

// Status dot used inside control bar
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

// Native action icons — used inside platform previews
const NI = {
  comment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5Z" />
    </svg>
  ),
  repost: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  ),
  share: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  ),
  views: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><polyline points="7 14 11 10 14 13 21 6" />
    </svg>
  ),
  bookmark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  send: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  more: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
    </svg>
  ),
  globe: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  play: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>
  ),
};

// ============================================================================
// Engagement row + recent comments (legacy export kept for compatibility)
// ============================================================================

export function PostEngagementRow({
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
      { label: "Replies", value: fmt(metrics.comments), icon: NI.comment },
      { label: "Reposts", value: fmt(metrics.reposts), icon: NI.repost },
      { label: "Likes", value: fmt(metrics.likes), icon: NI.heart },
      { label: "Views", value: fmt(metrics.views), icon: NI.views }
    );
  } else if (platform === "linkedin") {
    items.push(
      { label: "Reactions", value: fmt(metrics.reactions), icon: NI.heart },
      { label: "Comments", value: fmt(metrics.comments), icon: NI.comment },
      { label: "Reposts", value: fmt(metrics.reposts), icon: NI.repost },
      { label: "Impressions", value: fmt(metrics.impressions), icon: NI.views }
    );
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-[11px]">
      {items.map((m) => (
        <span key={m.label} className="inline-flex items-center gap-1 text-ink-soft">
          <span className="opacity-70">{m.icon}</span>
          <span className="tabular-nums text-ink">{m.value}</span>
        </span>
      ))}
    </div>
  );
}
// Back-compat alias used by older imports — same component.
export const EngagementMetricsRow = PostEngagementRow;

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
// Editorial media thumbnail — small, never a giant blank box
// ============================================================================

function MediaThumb({
  ratio = "aspect-video",
  maxH = 200,
  rounded = "rounded-xl",
  caption,
}: {
  ratio?: string;
  maxH?: number;
  rounded?: string;
  caption?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden ${rounded} bg-[oklch(0.93_0.02_85)]`}
      style={{ maxHeight: `${maxH}px` }}
    >
      {/* Editorial illustration — soft layered shapes, not a generic photo box */}
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="mt-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.94 0.03 75)" />
            <stop offset="100%" stopColor="oklch(0.86 0.05 60)" />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill="url(#mt-g1)" />
        <circle cx="320" cy="60" r="44" fill="oklch(0.82 0.07 55)" opacity="0.7" />
        <path d="M0 200 Q 100 150 200 190 T 400 180 L 400 260 L 0 260 Z" fill="oklch(0.78 0.06 40)" opacity="0.7" />
        <path d="M40 130 L 120 80 L 200 140 L 280 100 L 360 150" stroke="oklch(0.35 0.04 60)" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
      {caption && (
        <span className="absolute bottom-2 left-2 rounded bg-ink/70 px-1.5 py-0.5 text-[10px] font-medium text-parchment">
          {caption}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Shared shell
// ============================================================================

function PreviewShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CornerBadge({ platform }: { platform: Platform }) {
  return (
    <div className="absolute right-3 top-3 z-10">
      <PlatformBadge platform={platform} size={20} />
    </div>
  );
}

// ============================================================================
// X / Twitter
// ============================================================================

export function XNativePost({ post }: { post: TimelinePost }) {
  const handle = post.authorHandle.startsWith("@") ? post.authorHandle : `@${post.authorHandle}`;
  return (
    <PreviewShell>
      <div className="relative flex items-start gap-3 p-3.5">
        <CornerBadge platform="x" />
        <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
        <div className="min-w-0 flex-1 pr-7">
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="text-[14px] font-semibold text-ink">{post.authorName}</span>
            <span className="text-[13px] text-ink-soft">{handle}</span>
            <span className="text-[13px] text-ink-soft">· {post.publishedAt ?? post.scheduledAt}</span>
          </div>
          <p className="mt-1 whitespace-pre-line text-[14.5px] leading-[1.4] text-ink">{post.content}</p>
          {post.mediaType && (
            <div className="mt-2.5 overflow-hidden rounded-2xl border border-border/60">
              <MediaThumb ratio="aspect-video" maxH={190} rounded="rounded-none" />
            </div>
          )}
          <div className="mt-3 flex items-center justify-between text-ink-soft">
            <span className="inline-flex items-center gap-1 text-[12px] hover:text-[#1d9bf0]"><span className="opacity-80">{NI.comment}</span>{fmt(post.metrics?.comments)}</span>
            <span className="inline-flex items-center gap-1 text-[12px] hover:text-[#00ba7c]"><span className="opacity-80">{NI.repost}</span>{fmt(post.metrics?.reposts)}</span>
            <span className="inline-flex items-center gap-1 text-[12px] hover:text-[#f91880]"><span className="opacity-80">{NI.heart}</span>{fmt(post.metrics?.likes)}</span>
            <span className="inline-flex items-center gap-1 text-[12px]"><span className="opacity-80">{NI.views}</span>{fmt(post.metrics?.views)}</span>
            <span className="opacity-70">{NI.share}</span>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// LinkedIn
// ============================================================================

export function LinkedInNativePost({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="relative p-4">
        <CornerBadge platform="linkedin" />
        <div className="flex items-start gap-3 pr-8">
          <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-tight text-ink">
              {post.authorName} <span className="text-[11px] font-normal text-ink-soft">· 1st</span>
            </p>
            <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-ink-soft">
              {post.authorTitle ?? post.authorSubline ?? post.authorHandle}
            </p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-ink-soft">
              {post.publishedAt ?? post.scheduledAt} · <span className="opacity-70">{NI.globe}</span>
            </p>
          </div>
          <button className="absolute right-12 top-4 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0a66c2] hover:underline">
            + Follow
          </button>
        </div>
        <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{post.content}</p>
        {post.mediaType && <div className="mt-3 overflow-hidden rounded-md border border-border/60"><MediaThumb ratio="aspect-video" maxH={240} rounded="rounded-none" /></div>}

        {post.metrics && (
          <div className="mt-3 flex items-center justify-between border-b border-border/60 pb-2 text-[11.5px] text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <span className="grid size-4 place-items-center rounded-full bg-[#0a66c2] text-[8px] text-white">👍</span>
              <span className="grid size-4 -ml-1 place-items-center rounded-full bg-[#e0245e] text-[8px] text-white">❤</span>
              <span className="ml-1">{fmt(post.metrics.reactions)} reactions</span>
            </span>
            <span>{fmt(post.metrics.comments)} comments · {fmt(post.metrics.reposts)} reposts</span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-between text-[12px] font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1.5 hover:text-[#0a66c2]">{NI.heart}Like</span>
          <span className="inline-flex items-center gap-1.5 hover:text-[#0a66c2]">{NI.comment}Comment</span>
          <span className="inline-flex items-center gap-1.5 hover:text-[#0a66c2]">{NI.repost}Repost</span>
          <span className="inline-flex items-center gap-1.5 hover:text-[#0a66c2]">{NI.send}Send</span>
        </div>
        <RecentComments comments={post.recentComments} />
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// Facebook
// ============================================================================

export function FacebookNativePost({ post }: { post: TimelinePost }) {
  const reactionCount = post.metrics?.reactions ?? post.metrics?.likes ?? 0;
  const others = Math.max(0, reactionCount - 1);
  return (
    <PreviewShell>
      <div className="relative p-4">
        <CornerBadge platform="facebook" />
        <div className="flex items-start gap-3 pr-7">
          <AgentAvatar name={post.createdByAgent ?? post.authorName} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-tight text-ink">{post.authorName}</p>
            <p className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] text-ink-soft">
              {post.publishedAt ?? post.scheduledAt} · <span className="opacity-70">{NI.globe}</span>
            </p>
          </div>
        </div>
        <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{post.content}</p>
        {post.mediaType && <div className="mt-3 overflow-hidden rounded-md border border-border/60"><MediaThumb ratio="aspect-video" maxH={210} rounded="rounded-none" /></div>}
        {reactionCount > 0 && (
          <div className="mt-3 flex items-center justify-between border-b border-border/60 pb-2 text-[11.5px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex -space-x-0.5">
                <span className="grid size-4 place-items-center rounded-full bg-[#1877f2] text-[8px] text-white">👍</span>
                <span className="grid size-4 place-items-center rounded-full bg-[#e0245e] text-[8px] text-white">❤</span>
              </span>
              You and {fmt(others)} others
            </span>
            <span>{fmt(post.metrics?.comments)} comments · {fmt(post.metrics?.shares)} shares</span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-around text-[12.5px] font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1.5 hover:text-[#1877f2]">{NI.heart}Like</span>
          <span className="inline-flex items-center gap-1.5 hover:text-[#1877f2]">{NI.comment}Comment</span>
          <span className="inline-flex items-center gap-1.5 hover:text-[#1877f2]">{NI.share}Share</span>
        </div>
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// Instagram
// ============================================================================

export function InstagramNativePost({ post }: { post: TimelinePost }) {
  const handle = post.authorHandle.replace(/^@/, "");
  return (
    <PreviewShell>
      <div className="relative flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] p-0.5">
            <AgentAvatar name={post.createdByAgent ?? post.authorName} size="md" className="ring-2 ring-white" />
          </span>
          <p className="text-[13px] font-semibold text-ink">{handle}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-ink">
          <PlatformBadge platform="instagram" size={18} />
          <span className="opacity-70">{NI.more}</span>
        </span>
      </div>
      <div className="border-y border-border/40">
        <MediaThumb ratio="aspect-square" maxH={320} rounded="rounded-none" />
      </div>
      <div className="px-3.5 pb-3.5 pt-2.5">
        <div className="flex items-center gap-4 text-ink">
          {NI.heart}{NI.comment}{NI.send}
          <span className="ml-auto">{NI.bookmark}</span>
        </div>
        {(post.metrics?.likes ?? 0) > 0 && (
          <p className="mt-2 text-[13px] font-semibold text-ink">{fmt(post.metrics?.likes)} likes</p>
        )}
        <p className="mt-1 text-[13px] leading-relaxed text-ink">
          <span className="font-semibold">{handle}</span> <span>{post.content}</span>
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

// ============================================================================
// YouTube
// ============================================================================

export function YouTubeNativePost({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="relative">
        <div className="relative aspect-video w-full overflow-hidden">
          <MediaThumb ratio="aspect-video" maxH={260} rounded="rounded-none" />
          <button className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-[#ff0000]/90 text-white shadow-lg ring-4 ring-white/30 transition hover:scale-105">
            {NI.play}
          </button>
          <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-[10px] font-medium text-white">12:14</span>
          <div className="absolute left-2 top-2"><PlatformBadge platform="youtube" size={22} /></div>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink">{post.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-ink-soft">
          <AgentAvatar name={post.authorName} size="sm" />
          <span className="text-ink">{post.authorName}</span>
        </div>
        <p className="mt-1 text-[11.5px] text-ink-soft">
          {fmt(post.metrics?.views)} views · {post.publishedAt ?? post.scheduledAt}
        </p>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">{post.content}</p>
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// Blog — collapsed card + expanded full-width preview
// ============================================================================

export function BlogNativePost({ post }: { post: TimelinePost }) {
  const ctx = useTimelineCtx();
  const isExpanded = ctx?.expandedId === post.id;
  if (isExpanded) return <BlogExpandedPreview post={post} />;

  return (
    <PreviewShell>
      <div className="relative">
        <div className="absolute left-3 top-3 z-10"><PlatformBadge platform="blog" size={20} /></div>
        <MediaThumb ratio="aspect-video" maxH={200} rounded="rounded-none" />
      </div>
      <div className="p-4">
        {post.category && (
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-ink-soft">{post.category}</p>
        )}
        <h3 className="mt-1 font-display text-lg leading-tight tracking-tight text-ink">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">{post.excerpt ?? post.content}</p>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-soft">
          <AgentAvatar name={post.authorName} size="xs" />
          <span className="text-ink">{post.authorName}</span>
          {post.readTime && <span>· {post.readTime}</span>}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
            <span>{fmt(post.metrics?.views)} views</span>
            <span>{fmt(post.metrics?.shares)} shares</span>
            <span>{fmt(post.metrics?.saves)} saves</span>
          </div>
          <button
            onClick={() => ctx?.setExpandedId(post.id)}
            className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-ink hover:bg-muted/60"
          >
            Expand Preview
          </button>
        </div>
      </div>
    </PreviewShell>
  );
}

export function BlogExpandedPreview({ post }: { post: TimelinePost }) {
  const ctx = useTimelineCtx();
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-md">
      <div className="relative">
        <MediaThumb ratio="aspect-[21/9]" maxH={420} rounded="rounded-none" caption="Cover image" />
        <div className="absolute left-4 top-4"><PlatformBadge platform="blog" size={22} /></div>
        <button
          onClick={() => ctx?.setExpandedId(null)}
          className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-ink shadow hover:bg-white"
        >
          Collapse
        </button>
      </div>
      <article className="mx-auto max-w-3xl p-6 md:p-10">
        {post.category && (
          <p className="text-[10.5px] uppercase tracking-[0.18em] text-ink-soft">{post.category}</p>
        )}
        <h1 className="mt-2 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-ink-soft">
          <AgentAvatar name={post.authorName} size="sm" />
          <span className="text-ink">{post.authorName}</span>
          <span>·</span>
          <span>{post.publishedAt ?? post.scheduledAt}</span>
          {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
        </div>
        <p className="mt-6 text-[15.5px] leading-relaxed text-ink">{post.excerpt ?? post.content}</p>
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
          {post.content}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Operating cadence", "Trust", "Reputation"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-parchment-deep/40 px-2.5 py-0.5 text-[11px] text-ink-soft">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <button onClick={() => toast("Opened full article view.")} className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-parchment hover:bg-ink/90">Open Detail</button>
          <button onClick={() => toast("Opened in editor.")} className="rounded-full border border-border px-4 py-1.5 text-[12px] font-medium text-ink hover:bg-muted/60">Edit</button>
        </div>
      </article>
    </div>
  );
}

// ============================================================================
// Newsletter
// ============================================================================

export function NewsletterNativePost({ post }: { post: TimelinePost }) {
  return (
    <PreviewShell>
      <div className="relative flex items-center justify-between gap-2 border-b border-border/50 bg-parchment-deep/40 px-4 py-2 text-[11px] text-ink-soft">
        <span><span className="text-ink font-medium">{post.authorName}</span> · {post.authorHandle}</span>
        <span className="inline-flex items-center gap-2">
          <span>{post.publishedAt ?? post.scheduledAt}</span>
          <PlatformBadge platform="newsletter" size={18} />
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl leading-tight tracking-tight text-ink">
          {post.subjectLine ?? post.title}
        </h3>
        {post.previewText && (
          <p className="mt-1.5 text-[12.5px] italic text-ink-soft">{post.previewText}</p>
        )}
        <div className="mt-3 rounded-lg border border-border/50 bg-parchment-deep/40 p-3 text-[13px] leading-relaxed text-ink">
          {post.content}
        </div>
        {post.metrics && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/40 pt-3 text-[11px] text-ink-soft">
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.sends)}</span> sent</span>
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.opens)}</span> opens</span>
            <span><span className="text-ink tabular-nums">{fmt(post.metrics.clicks)}</span> clicks</span>
            {post.metrics.openRate != null && (
              <span className="ml-auto rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-medium text-ink">
                {post.metrics.openRate}% open rate
              </span>
            )}
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => toast("Email preview opened.")} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-ink hover:bg-muted/60">Preview Email</button>
          <button onClick={() => toast("Opened in editor.")} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-ink hover:bg-muted/60">Edit</button>
        </div>
      </div>
    </PreviewShell>
  );
}

// ============================================================================
// NativePostPreview — picks the right component
// ============================================================================

export function NativePostPreview({ post }: { post: TimelinePost }) {
  switch (post.platform) {
    case "x": return <XNativePost post={post} />;
    case "linkedin": return <LinkedInNativePost post={post} />;
    case "facebook": return <FacebookNativePost post={post} />;
    case "instagram": return <InstagramNativePost post={post} />;
    case "youtube": return <YouTubeNativePost post={post} />;
    case "blog": return <BlogNativePost post={post} />;
    case "newsletter": return <NewsletterNativePost post={post} />;
    default: return <XNativePost post={post} />;
  }
}

// ============================================================================
// Quiet Crafted Virtue action bar
// ============================================================================

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
          <span>{b.label} <span className="text-ink">{b.agent}</span></span>
        </span>
      ))}
    </span>
  );
}

export function PostActionBar({ post }: { post: TimelinePost }) {
  const ctx = useTimelineCtx();
  const awaiting = post.status === "awaiting_approval";
  const failed = post.status === "failed";
  const scheduled = post.status === "scheduled";
  const published = post.status === "published";

  const onPublish = () => ctx?.requestPublish(post);
  const onReschedule = async () => {
    await reschedulePost(post.id, post.date);
    toast("Rescheduling flow opened.");
  };

  const btnPrimary = "rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-parchment hover:bg-ink/90";
  const btnGhost = "rounded-full px-3 py-1 text-[11px] font-medium text-ink-soft hover:text-ink hover:bg-muted/60";

  const metaBits: React.ReactNode[] = [];
  if (scheduled || awaiting) {
    if (post.scheduledAt) metaBits.push(<span key="t">Scheduled {post.scheduledAt}</span>);
    metaBits.push(
      <span key="a">Approval: <span className="text-ink">{awaiting ? "Pending" : "Approved"}</span></span>
    );
  }
  if (post.voiceScore != null) metaBits.push(<span key="v">Voice <span className="text-ink tabular-nums">{post.voiceScore}</span></span>);
  if (post.factCheckStatus) {
    const fLabel = post.factCheckStatus === "verified" ? "Facts verified" : post.factCheckStatus === "pending" ? "Facts pending" : "Facts flagged";
    metaBits.push(<span key="f">{fLabel}</span>);
  }
  if (published) metaBits.push(<span key="m">Metrics updated 2m ago</span>);

  return (
    <div className="mt-2 space-y-1.5">
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
            <button onClick={() => toast("Revision requested. Author notified.")} className={btnGhost}>Request Revision</button>
            <button onClick={() => toast("Opened in editor.")} className={btnGhost}>Edit</button>
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
            <button onClick={() => toast.success("Publishing job re-queued.")} className={btnPrimary}>Retry</button>
            <button onClick={() => toast("Opened media fixer.")} className={btnGhost}>Fix Media</button>
            <button onClick={() => toast("Opened in editor.")} className={btnGhost}>Edit</button>
          </>
        )}
        {published && (
          <button onClick={() => toast("Opened post detail.")} className={btnGhost}>View Detail</button>
        )}
      </div>
    </div>
  );
}

// Legacy alias
const ControlBar = PostActionBar;

// ============================================================================
// Card wrapper — applies platform width caps; blog expanded spans full width
// ============================================================================

export function PlatformPostCard({ post }: { post: TimelinePost }) {
  const ctx = useTimelineCtx();
  const isExpandedBlog = post.platform === "blog" && ctx?.expandedId === post.id;
  const maxW = isExpandedBlog ? undefined : PLATFORM_MAX_W[post.platform] ?? 360;
  return (
    <div
      className="w-full"
      style={{
        maxWidth: maxW ? `${maxW}px` : undefined,
        gridColumn: isExpandedBlog ? "1 / -1" : undefined,
      }}
    >
      <NativePostPreview post={post} />
      <PostActionBar post={post} />
    </div>
  );
}

// Back-compat exports for older imports
export const ScheduledPostCard = ({ post }: { post: TimelinePost; variant?: "default" | "hero" }) => (
  <PlatformPostCard post={post} />
);
export const XPostPreview = XNativePost;
export const LinkedInPostPreview = LinkedInNativePost;
export const FacebookPostPreview = FacebookNativePost;
export const InstagramPostPreview = InstagramNativePost;
export const YouTubePostPreview = YouTubeNativePost;
export const BlogPostPreview = BlogNativePost;
export const NewsletterPostPreview = NewsletterNativePost;

// ============================================================================
// TimelineGrid + Date group
// ============================================================================

export function TimelineGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid items-start justify-start gap-5"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, max-content))" }}
    >
      {children}
    </div>
  );
}

export function TimelineDateGroup({ day }: { day: TimelineDay }) {
  const sublabel =
    day.kind === "scheduled" ? "Scheduled" : day.kind === "today" ? "Latest" : "Published";

  return (
    <div className="relative grid gap-6 md:grid-cols-[140px_1fr] md:gap-10">
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

      <TimelineGrid>
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
      </TimelineGrid>
    </div>
  );
}

// ============================================================================
// Main Timeline
// ============================================================================

const PLATFORM_FILTERS: ({ id: "all" } | { id: Platform })[] = [
  { id: "all" }, { id: "linkedin" }, { id: "x" }, { id: "facebook" },
  { id: "instagram" }, { id: "youtube" }, { id: "blog" }, { id: "newsletter" },
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    await publishNowFromTimeline(post.id);
    const movedPost: TimelinePost = {
      ...post,
      status: "published",
      date: TODAY_ISO,
      publishedAt: "Just now",
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
    <TimelineContext.Provider value={{ requestPublish, expandedId, setExpandedId }}>
    <div>
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
          <TimelineGrid>
            {scheduledNext.map((p) => (
              <PlatformPostCard key={`hero-${p.id}`} post={p} />
            ))}
          </TimelineGrid>
          <p className="mt-4 text-[11px] text-ink-soft">
            Scheduled publishing runs through your connected channels in Crafted Virtue.
          </p>
        </section>
      )}

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
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
              platform === p.id
                ? "border-ink bg-ink text-parchment"
                : "border-border text-ink-soft hover:text-ink"
            }`}
          >
            {p.id !== "all" && <PlatformLogo platform={p.id} size={11} />}
            {p.id === "all" ? "All platforms" : PLATFORM_LABEL[p.id]}
          </button>
        ))}
      </div>

      <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-parchment-deep/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        <span className="size-1.5 rounded-full bg-success" />
        Only approved content can be published
      </p>

      <div ref={containerRef} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 top-0 hidden md:block"
          style={{ left: "139px" }}
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
            <div className="md:pl-[180px]">
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
          <div className="my-14 md:pl-[180px]">
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
            <div className="md:pl-[180px]">
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
                <PlatformBadge platform={pendingPublish.platform} size={18} />
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
