// Mock data for Crafted Virtue clickable prototype
export const SPECIALISTS = [
  { id: "olivia", name: "Olivia", role: "Strategy Director", color: "var(--chart-1)" },
  { id: "leo", name: "Leo", role: "Voice Architect", color: "var(--chart-2)" },
  { id: "sam", name: "Sam", role: "Story Editor", color: "var(--chart-3)" },
  { id: "talia", name: "Talia", role: "Research Lead", color: "var(--chart-4)" },
  { id: "vincent", name: "Vincent", role: "Visual Director", color: "var(--chart-5)" },
  { id: "alex", name: "Alex", role: "Distribution Lead", color: "var(--chart-1)" },
  { id: "konrad", name: "Konrad", role: "Compliance & QA", color: "var(--chart-2)" },
  { id: "beatrice", name: "Beatrice", role: "Analytics Partner", color: "var(--chart-3)" },
];

export const NAV_MARKETING = [
  { label: "Solutions", to: "/solutions" },
  { label: "Platform", to: "/platform" },
  { label: "Pricing", to: "/pricing" },
  { label: "Report", to: "/report" },
  { label: "Enterprise", to: "/enterprise" },
  { label: "Blog", to: "/blog" },
];

export const CONTENT_STATUSES = [
  "draft", "QA reviewed", "awaiting approval", "approved", "scheduled", "published", "analyzed",
] as const;

export type ContentStatus = typeof CONTENT_STATUSES[number];

export type ContentItem = {
  id: string;
  title: string;
  excerpt: string;
  channel: "LinkedIn" | "X" | "Newsletter" | "Blog" | "Instagram";
  status: ContentStatus;
  scheduledFor?: string;
  pillar: string;
  agent: string;
};

export const CONTENT_QUEUE: ContentItem[] = [
  { id: "c1", title: "The Quiet Compounding of Reputation", excerpt: "Why insight, not output, is the real currency of executive presence.", channel: "LinkedIn", status: "awaiting approval", pillar: "Operator's Mind", agent: "Sam", scheduledFor: "Tue 09:15" },
  { id: "c2", title: "Three Questions Before Any Board Update", excerpt: "A practical framework I use before stepping into the room.", channel: "Newsletter", status: "approved", pillar: "Leadership Craft", agent: "Olivia", scheduledFor: "Wed 07:00" },
  { id: "c3", title: "What I Got Wrong About Distribution", excerpt: "A candid retrospective on five years of channel decisions.", channel: "Blog", status: "QA reviewed", pillar: "Hard-won Lessons", agent: "Leo" },
  { id: "c4", title: "Field notes from Q3 customer calls", excerpt: "Patterns surfacing across mid-market buyers.", channel: "LinkedIn", status: "draft", pillar: "Market Signal", agent: "Talia" },
  { id: "c5", title: "Earned trust > earned media", excerpt: "Reframing PR for the next decade of leadership.", channel: "X", status: "scheduled", pillar: "Operator's Mind", agent: "Alex", scheduledFor: "Thu 11:30" },
  { id: "c6", title: "Why I rewrote our operating cadence", excerpt: "A teardown of the rituals that actually moved the needle.", channel: "Newsletter", status: "published", pillar: "Leadership Craft", agent: "Sam" },
  { id: "c7", title: "On choosing convictions slowly", excerpt: "Conviction is expensive. Spend it on the right calls.", channel: "LinkedIn", status: "analyzed", pillar: "Operator's Mind", agent: "Olivia" },
];

export const CHANNELS = [
  { id: "linkedin", name: "LinkedIn", connected: true, handle: "@e.harrow", followers: "48.2k" },
  { id: "x", name: "X", connected: true, handle: "@eharrow", followers: "12.4k" },
  { id: "newsletter", name: "Newsletter", connected: true, handle: "Quiet Authority", followers: "9.1k subs" },
  { id: "blog", name: "Blog", connected: true, handle: "ellisharrow.com", followers: "—" },
  { id: "instagram", name: "Instagram", connected: false, handle: "—", followers: "—" },
  { id: "facebook", name: "Facebook", connected: false, handle: "—", followers: "—" },
  { id: "youtube", name: "YouTube", connected: false, handle: "—", followers: "—" },
  { id: "tiktok", name: "TikTok", connected: false, handle: "—", followers: "—" },
];

export const REACH_SERIES = [
  { week: "W1", reach: 12400, engagement: 3.2 },
  { week: "W2", reach: 14100, engagement: 3.6 },
  { week: "W3", reach: 17800, engagement: 4.1 },
  { week: "W4", reach: 16500, engagement: 4.3 },
  { week: "W5", reach: 21200, engagement: 4.8 },
  { week: "W6", reach: 24900, engagement: 5.1 },
  { week: "W7", reach: 28400, engagement: 5.4 },
  { week: "W8", reach: 31600, engagement: 5.7 },
];

export const PILLAR_DISTRIBUTION = [
  { pillar: "Operator's Mind", share: 34 },
  { pillar: "Leadership Craft", share: 26 },
  { pillar: "Market Signal", share: 22 },
  { pillar: "Hard-won Lessons", share: 18 },
];

export const AGENT_ACTIVITY = [
  { agent: "Olivia", action: "drafted strategic angle for Q4 board piece", time: "2m ago" },
  { agent: "Leo", action: "tuned voice model on 3 new writing samples", time: "14m ago" },
  { agent: "Konrad", action: "cleared compliance review on 2 posts", time: "31m ago" },
  { agent: "Talia", action: "surfaced 6 market signals from this week's reading", time: "1h ago" },
  { agent: "Vincent", action: "generated cover art for newsletter #042", time: "2h ago" },
  { agent: "Alex", action: "optimized publishing windows for LinkedIn", time: "3h ago" },
  { agent: "Beatrice", action: "compiled weekly Influence Delta brief", time: "5h ago" },
  { agent: "Sam", action: "edited three drafts for narrative tension", time: "yesterday" },
];

export const BLOG_POSTS = [
  { slug: "the-quiet-authority-thesis", title: "The Quiet Authority Thesis", excerpt: "Why the next decade of leadership belongs to operators who can compound trust in public.", author: "Ellis Harrow", date: "Mar 12, 2025", read: "8 min" },
  { slug: "voice-not-volume", title: "Voice, Not Volume", excerpt: "A field guide to writing like yourself at scale—without flattening the things that make you worth reading.", author: "Olivia Chen", date: "Mar 04, 2025", read: "6 min" },
  { slug: "approval-as-craft", title: "Approval as Craft", excerpt: "How the most respected executive voices treat the publish button as a leadership decision.", author: "Konrad Vale", date: "Feb 21, 2025", read: "5 min" },
  { slug: "from-insight-to-leverage", title: "From Insight to Leverage", excerpt: "Turning everyday operating insight into a durable point of view the market remembers.", author: "Sam Reyes", date: "Feb 08, 2025", read: "9 min" },
];
