// Mock data for the /app/publishing Timeline view.
// Structured to map cleanly onto a future Postiz API integration.
// See src/services/postizTimelineAdapter.ts for the adapter shape.

export type Platform =
  | "x"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "blog"
  | "newsletter";

export type PostStatus =
  | "scheduled"
  | "published"
  | "failed"
  | "draft"
  | "awaiting_approval";

export type FactCheckStatus = "verified" | "pending" | "flagged";

export type TimelineMetrics = {
  likes?: number;
  comments?: number;
  shares?: number;
  reposts?: number;
  impressions?: number;
  views?: number;
  saves?: number;
  reactions?: number;
  opens?: number;
  clicks?: number;
  sends?: number;
  openRate?: number;
};

export type TimelineComment = {
  author: string;
  text: string;
  time: string;
};

export type TimelinePost = {
  id: string;
  platform: Platform;
  status: PostStatus;
  /** ISO date (yyyy-mm-dd) used for grouping. */
  date: string;
  scheduledAt?: string;
  publishedAt?: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  authorSubline?: string;
  title?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "carousel";
  postUrl?: string;
  postizPostId?: string;
  postizIntegrationId?: string;
  metrics?: TimelineMetrics;
  recentComments?: TimelineComment[];
  createdByAgent?: string;
  reviewedByAgent?: string;
  voiceScore?: number;
  factCheckStatus?: FactCheckStatus;
  // Newsletter / Blog extras
  subjectLine?: string;
  previewText?: string;
  category?: string;
  readTime?: string;
  excerpt?: string;
  authorTitle?: string;
  failureReason?: string;
  postizSyncedAt?: string;
  approval?: "approved" | "pending" | "rejected";
};

export type TimelineDay = {
  date: string;
  label: string;
  kind: "scheduled" | "today" | "past";
  posts: TimelinePost[];
};

const author = {
  name: "Ellis Harrow",
  handle: "@eharrow",
  subline: "CEO, Northwind · Quiet Authority",
  title: "Founder & CEO at Northwind Labs",
};

// ---------- Scheduled (upcoming) ----------
const SCHEDULED: TimelinePost[] = [
  {
    id: "s1",
    platform: "linkedin",
    status: "scheduled",
    date: "2026-05-19",
    scheduledAt: "Tue May 19 · 09:15",
    authorName: author.name,
    authorHandle: author.handle,
    authorSubline: author.subline,
    authorTitle: author.title,
    postizSyncedAt: "12m ago",
    title: "The Quiet Compounding of Reputation",
    content:
      "Reputation doesn't spike. It compounds. Three things I've learned about earning trust slowly — and why most operators give up six months too early.",
    postizPostId: "pz_8842",
    postizIntegrationId: "li_main",
    createdByAgent: "Sam",
    reviewedByAgent: "Konrad",
    voiceScore: 94,
    factCheckStatus: "verified",
  },
  {
    id: "s2",
    platform: "newsletter",
    status: "awaiting_approval",
    date: "2026-05-20",
    scheduledAt: "Wed May 20 · 07:00",
    authorName: "Quiet Authority",
    authorHandle: "quietauthority.co",
    subjectLine: "Three questions before any board update",
    previewText:
      "A short framework I use to pressure-test the story before stepping into the room.",
    content:
      "A short framework I use to pressure-test the story before stepping into the room — and the one question that almost always reframes the quarter.",
    postizPostId: "pz_8843",
    postizIntegrationId: "nl_main",
    createdByAgent: "Olivia",
    voiceScore: 91,
    factCheckStatus: "pending",
  },
  {
    id: "s3",
    platform: "x",
    status: "scheduled",
    date: "2026-05-21",
    scheduledAt: "Thu May 21 · 11:30",
    authorName: author.name,
    authorHandle: author.handle,
    content:
      "Earned trust > earned media.\n\nOne is rented. The other compounds.",
    postizPostId: "pz_8844",
    postizIntegrationId: "x_main",
    createdByAgent: "Alex",
    voiceScore: 88,
    factCheckStatus: "verified",
  },
  {
    id: "s4",
    platform: "instagram",
    status: "scheduled",
    date: "2026-05-22",
    scheduledAt: "Fri May 22 · 08:45",
    authorName: author.name,
    authorHandle: "ellis.harrow",
    content:
      "Field notes from Q3 customer calls — the patterns that keep showing up across mid-market buyers.",
    mediaType: "image",
    postizPostId: "pz_8845",
    postizIntegrationId: "ig_main",
    createdByAgent: "Vincent",
    voiceScore: 90,
    factCheckStatus: "verified",
  },
];

// ---------- Published (history, newest first) ----------
const PUBLISHED: TimelinePost[] = [
  // Today — May 18
  {
    id: "p1",
    platform: "linkedin",
    status: "published",
    date: "2026-05-18",
    publishedAt: "May 18 · 09:18",
    authorName: author.name,
    authorHandle: author.handle,
    authorSubline: author.subline,
    authorTitle: author.title,
    postizSyncedAt: "12m ago",
    content:
      "On choosing convictions slowly.\n\nConviction is expensive. Spend it on the right calls. The rest of the time, stay curious and a little bit uncertain.",
    metrics: { reactions: 1284, comments: 96, reposts: 142, impressions: 41200 },
    recentComments: [
      { author: "Priya N.", text: "This reframed how I think about board prep. Saving.", time: "2h" },
      { author: "Marcus L.", text: "The compounding piece is underrated.", time: "4h" },
    ],
    createdByAgent: "Olivia",
    reviewedByAgent: "Konrad",
    voiceScore: 96,
    factCheckStatus: "verified",
    postizPostId: "pz_8801",
  },
  {
    id: "p2",
    platform: "x",
    status: "published",
    date: "2026-05-18",
    publishedAt: "May 18 · 07:42",
    authorName: author.name,
    authorHandle: author.handle,
    content:
      "Most strategy decks die because they answer the wrong question slowly.\n\nThe best ones answer the right question on page two.",
    metrics: { likes: 612, comments: 38, reposts: 84, views: 18400 },
    createdByAgent: "Sam",
    voiceScore: 92,
    factCheckStatus: "verified",
    postizPostId: "pz_8800",
  },

  // May 17
  {
    id: "p3",
    platform: "newsletter",
    status: "published",
    date: "2026-05-17",
    publishedAt: "May 17 · 07:00",
    authorName: "Quiet Authority",
    authorHandle: "quietauthority.co",
    subjectLine: "Why I rewrote our operating cadence",
    previewText:
      "A teardown of the rituals that actually moved the needle last quarter.",
    content:
      "A teardown of the rituals that actually moved the needle last quarter — and the three we quietly killed.",
    metrics: { sends: 9120, opens: 4926, clicks: 612, openRate: 54 },
    createdByAgent: "Sam",
    reviewedByAgent: "Konrad",
    voiceScore: 95,
    factCheckStatus: "verified",
    postizPostId: "pz_8788",
  },
  {
    id: "p4",
    platform: "facebook",
    status: "published",
    date: "2026-05-17",
    publishedAt: "May 17 · 14:10",
    authorName: "Ellis Harrow",
    authorHandle: "ellis.harrow",
    content:
      "Spent the morning with a founder rebuilding their operating cadence from scratch. A reminder that systems beat heroics, every time.",
    metrics: { reactions: 312, comments: 28, shares: 19 },
    createdByAgent: "Alex",
    voiceScore: 89,
    factCheckStatus: "verified",
    postizPostId: "pz_8787",
  },

  // May 16
  {
    id: "p5",
    platform: "youtube",
    status: "published",
    date: "2026-05-16",
    publishedAt: "May 16 · 16:00",
    authorName: "Quiet Authority",
    authorHandle: "@quietauthority",
    title: "How operators earn the room — without performing",
    content:
      "A 12-minute breakdown of the three signals that earn long-term credibility in any room you walk into.",
    metrics: { views: 8420, likes: 612, comments: 84 },
    createdByAgent: "Vincent",
    reviewedByAgent: "Konrad",
    voiceScore: 93,
    factCheckStatus: "verified",
    postizPostId: "pz_8770",
  },
  {
    id: "p6",
    platform: "linkedin",
    status: "published",
    date: "2026-05-16",
    publishedAt: "May 16 · 09:02",
    authorName: author.name,
    authorHandle: author.handle,
    authorSubline: author.subline,
    authorTitle: author.title,
    postizSyncedAt: "12m ago",
    content:
      "Three questions I ask before every board update. They take fifteen minutes and save the next ninety.",
    metrics: { reactions: 942, comments: 71, reposts: 88, impressions: 28600 },
    recentComments: [
      { author: "Devon K.", text: "Stealing question two.", time: "1d" },
    ],
    createdByAgent: "Olivia",
    voiceScore: 94,
    factCheckStatus: "verified",
    postizPostId: "pz_8769",
  },

  // May 15
  {
    id: "p7",
    platform: "blog",
    status: "published",
    date: "2026-05-15",
    publishedAt: "May 15 · 06:00",
    authorName: author.name,
    authorHandle: "ellisharrow.com",
    title: "Notes from a hard quarter",
    excerpt:
      "What the numbers wouldn't say, and how we reorganized the team around the questions worth answering.",
    content:
      "What the numbers wouldn't say, and how we reorganized the team around the questions worth answering.",
    category: "Operator's Mind",
    readTime: "8 min read",
    metrics: { views: 3104, shares: 162, comments: 22 },
    createdByAgent: "Leo",
    reviewedByAgent: "Konrad",
    voiceScore: 95,
    factCheckStatus: "verified",
    postizPostId: "pz_8744",
  },
  {
    id: "p8",
    platform: "instagram",
    status: "published",
    date: "2026-05-15",
    publishedAt: "May 15 · 18:30",
    authorName: "Ellis Harrow",
    authorHandle: "ellis.harrow",
    mediaType: "image",
    content:
      "Quiet morning, loud thinking. A few pages from this week's reading notebook.",
    metrics: { likes: 1820, comments: 64, saves: 142 },
    createdByAgent: "Vincent",
    voiceScore: 88,
    factCheckStatus: "verified",
    postizPostId: "pz_8743",
  },

  // May 14
  {
    id: "p9",
    platform: "x",
    status: "published",
    date: "2026-05-14",
    publishedAt: "May 14 · 11:14",
    authorName: author.name,
    authorHandle: author.handle,
    content:
      "If your strategy fits on a slide, it probably isn't strategy yet.\n\nIt's a hope wearing a chart.",
    metrics: { likes: 2140, comments: 184, reposts: 412, views: 64200 },
    createdByAgent: "Sam",
    voiceScore: 96,
    factCheckStatus: "verified",
    postizPostId: "pz_8721",
  },
  {
    id: "p10",
    platform: "linkedin",
    status: "published",
    date: "2026-05-14",
    publishedAt: "May 14 · 08:30",
    authorName: author.name,
    authorHandle: author.handle,
    authorSubline: author.subline,
    authorTitle: author.title,
    postizSyncedAt: "12m ago",
    content:
      "Field notes from Q3 customer calls. Three patterns surfacing across mid-market buyers — and what they're telling us about the next 18 months.",
    metrics: { reactions: 712, comments: 42, reposts: 61, impressions: 19400 },
    createdByAgent: "Talia",
    voiceScore: 92,
    factCheckStatus: "verified",
    postizPostId: "pz_8720",
  },

  // May 12
  {
    id: "p11",
    platform: "facebook",
    status: "published",
    date: "2026-05-12",
    publishedAt: "May 12 · 12:05",
    authorName: "Ellis Harrow",
    authorHandle: "ellis.harrow",
    content:
      "A short thank-you to the operators who've been quietly building for years. The work is the work, and it shows.",
    metrics: { reactions: 248, comments: 32, shares: 14 },
    createdByAgent: "Alex",
    voiceScore: 87,
    factCheckStatus: "verified",
    postizPostId: "pz_8702",
  },
  {
    id: "p12",
    platform: "newsletter",
    status: "published",
    date: "2026-05-12",
    publishedAt: "May 12 · 07:00",
    authorName: "Quiet Authority",
    authorHandle: "quietauthority.co",
    subjectLine: "Signal vs. noise: cutting through the quarter",
    previewText:
      "The two metrics I'd keep if I had to delete the rest of the dashboard.",
    content:
      "The two metrics I'd keep if I had to delete the rest of the dashboard.",
    metrics: { sends: 9020, opens: 4690, clicks: 542, openRate: 52 },
    createdByAgent: "Sam",
    reviewedByAgent: "Konrad",
    voiceScore: 94,
    factCheckStatus: "verified",
    postizPostId: "pz_8701",
  },
];

function groupByDate(posts: TimelinePost[]): Map<string, TimelinePost[]> {
  const map = new Map<string, TimelinePost[]>();
  for (const p of posts) {
    const arr = map.get(p.date) ?? [];
    arr.push(p);
    map.set(p.date, arr);
  }
  return map;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function labelFor(dateIso: string, todayIso: string): string {
  if (dateIso === todayIso) return "Today";
  const [, m, d] = dateIso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

const TODAY_ISO = "2026-05-18";

export const SCHEDULED_DAYS: TimelineDay[] = Array.from(
  groupByDate(SCHEDULED).entries()
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, posts]) => ({
    date,
    label: labelFor(date, TODAY_ISO),
    kind: "scheduled",
    posts,
  }));

export const PUBLISHED_DAYS: TimelineDay[] = Array.from(
  groupByDate(PUBLISHED).entries()
)
  .sort(([a], [b]) => b.localeCompare(a)) // newest first
  .map(([date, posts]) => ({
    date,
    label: labelFor(date, TODAY_ISO),
    kind: date === TODAY_ISO ? "today" : "past",
    posts,
  }));

export const ALL_TIMELINE_POSTS: TimelinePost[] = [...SCHEDULED, ...PUBLISHED];
