// Postiz timeline adapter.
//
// This module is the seam between the Crafted Virtue publishing timeline UI
// and the Postiz API. It currently returns mock data so the UI is buildable
// without a backend. The function signatures and mapping helper below are
// intended to be swapped for real Postiz calls (REST or SDK) later.
//
// TODO(postiz): replace mock returns with real HTTP calls to the Postiz API
//   gateway. Expected endpoints (subject to change):
//     GET    /api/postiz/posts?status=published
//     GET    /api/postiz/posts?status=scheduled
//     GET    /api/postiz/posts/:id/analytics
//     POST   /api/postiz/posts/:id/publish
//     PATCH  /api/postiz/posts/:id/schedule

import {
  PUBLISHED_DAYS,
  SCHEDULED_DAYS,
  type TimelineDay,
  type TimelineMetrics,
  type TimelinePost,
} from "@/data/publishingTimelineData";

/** Shape we expect from the Postiz API. Kept loose; refine when wiring up. */
export type PostizPost = {
  id: string;
  integrationId?: string;
  providers?: { provider: string }[];
  state: string; // "PUBLISHED" | "QUEUED" | "DRAFT" | ...
  content: string;
  title?: string;
  publishDate?: string;
  scheduledDate?: string;
  media?: { url: string; type?: string }[];
  analytics?: TimelineMetrics;
  authorName?: string;
  authorHandle?: string;
};

export async function fetchPostizPublishedPosts(): Promise<TimelineDay[]> {
  // TODO(postiz): GET /api/postiz/posts?status=published
  return Promise.resolve(PUBLISHED_DAYS);
}

export async function fetchPostizScheduledPosts(): Promise<TimelineDay[]> {
  // TODO(postiz): GET /api/postiz/posts?status=scheduled
  return Promise.resolve(SCHEDULED_DAYS);
}

/**
 * Publish a scheduled post immediately from the timeline.
 * TODO(postiz): POST /api/postiz/posts/:id/publish — when wired up, this
 * should hit the Postiz publish endpoint and return the canonical post
 * record so the timeline can swap the local optimistic update for the
 * server's authoritative timestamps and engagement metrics.
 */
export async function publishNowFromTimeline(
  postId: string
): Promise<{ ok: true; publishedAt: string }> {
  void postId;
  return Promise.resolve({ ok: true, publishedAt: new Date().toISOString() });
}

export async function fetchPostizPostAnalytics(
  postId: string
): Promise<TimelineMetrics | null> {
  // TODO(postiz): GET /api/postiz/posts/:id/analytics
  void postId;
  return Promise.resolve(null);
}

export async function publishPostNow(postId: string): Promise<{ ok: boolean }> {
  // TODO(postiz): POST /api/postiz/posts/:id/publish
  void postId;
  return Promise.resolve({ ok: true });
}

export async function reschedulePost(
  postId: string,
  date: string
): Promise<{ ok: boolean }> {
  // TODO(postiz): PATCH /api/postiz/posts/:id/schedule { date }
  void postId;
  void date;
  return Promise.resolve({ ok: true });
}

/** Map a raw Postiz post into our UI-friendly TimelinePost shape. */
export function mapPostizPostToTimelinePost(p: PostizPost): TimelinePost {
  const provider = (p.providers?.[0]?.provider ?? "blog").toLowerCase();
  const platform = ([
    "x",
    "linkedin",
    "facebook",
    "instagram",
    "youtube",
    "blog",
    "newsletter",
  ].includes(provider)
    ? provider
    : "blog") as TimelinePost["platform"];

  const publishedAt = p.publishDate ?? undefined;
  const scheduledAt = p.scheduledDate ?? undefined;
  const dateSource = publishedAt ?? scheduledAt ?? new Date().toISOString();
  const date = dateSource.slice(0, 10);

  const status: TimelinePost["status"] =
    p.state === "PUBLISHED"
      ? "published"
      : p.state === "QUEUED"
      ? "scheduled"
      : p.state === "DRAFT"
      ? "draft"
      : "awaiting_approval";

  return {
    id: p.id,
    platform,
    status,
    date,
    publishedAt,
    scheduledAt,
    authorName: p.authorName ?? "Operator",
    authorHandle: p.authorHandle ?? "",
    title: p.title,
    content: p.content,
    mediaUrl: p.media?.[0]?.url,
    metrics: p.analytics,
    postizPostId: p.id,
    postizIntegrationId: p.integrationId,
  };
}
