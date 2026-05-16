/**
 * Crafted Virtue blog catalog.
 *
 * Each post is paired with a registered illustration so that thumbnails,
 * heroes, and related-post cards across /blog and /blog/article render the
 * same on-brand visual everywhere the article appears.
 */
import type { IllustrationName } from "@/components/illustration";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  read: string;
  category: string;
  tags: string[];
  illustration: IllustrationName;
  /** Editorial prompt used to generate the illustration — kept for future regenerations. */
  imagePrompt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hidden-roi-of-quiet-authority",
    title: "The Hidden ROI of Quiet Authority",
    excerpt:
      "Why posting once a week can beat shouting daily — and how authority rewards focus, not frequency.",
    read: "5 min read",
    category: "Personal Branding",
    tags: ["Personal Branding", "Influence", "Strategy"],
    illustration: "postQuietAuthority",
    imagePrompt:
      "Editorial illustration of a calm executive desk with one clear signal line rising above a field of muted content noise, warm ivory background, charcoal ink, subtle blue and gold accents.",
  },
  {
    slug: "data-driven-authority",
    title: "Data-Driven Authority: Leveraging Analytics for Executive Branding",
    excerpt:
      "Harness AI-driven insights and analytics to magnify your influence as an executive.",
    read: "6 min read",
    category: "Executive Branding",
    tags: ["Analytics", "Executive Branding", "Strategy"],
    illustration: "postDataAuthority",
    imagePrompt:
      "Premium illustration of an executive dashboard with Brand Score, Influence Delta, and content pillar charts turning into a clear authority signal.",
  },
  {
    slug: "crafting-your-executive-brand",
    title: "Crafting Your Executive Brand",
    excerpt:
      "A step-by-step framework to define and project your leadership identity.",
    read: "5 min read",
    category: "Personal Branding",
    tags: ["Personal Branding", "Leadership", "Strategy"],
    illustration: "postExecutiveBrand",
    imagePrompt:
      "Illustration of a professional profile card being assembled from voice, values, expertise, and content pillars, warm neutral palette.",
  },
  {
    slug: "measuring-influence",
    title: "Measuring Influence: Metrics That Matter",
    excerpt:
      "Beyond likes and shares: gauge real-world impact with actionable executive metrics.",
    read: "6 min read",
    category: "Influence Metrics",
    tags: ["Influence", "Metrics", "Growth"],
    illustration: "postInfluenceMetrics",
    imagePrompt:
      "Illustration of engagement metrics, audience growth, and opportunity signals arranged as a calm executive briefing, refined vector style.",
  },
  {
    slug: "ai-in-executive-communication",
    title: "AI in Executive Communication",
    excerpt:
      "How smart automation personalizes your voice without losing authenticity.",
    read: "6 min read",
    category: "AI in Communication",
    tags: ["AI", "Communication", "Leadership"],
    illustration: "postAiCommunication",
    imagePrompt:
      "Illustration of human writing and AI assistance working together, represented by content cards, voice waveform, and approval checkmark, no robot imagery.",
  },
  {
    slug: "linkedin-mastery-for-leaders",
    title: "LinkedIn Mastery for Leaders",
    excerpt:
      "Tactics to make your profile and posts stand out on the platform that matters most.",
    read: "5 min read",
    category: "LinkedIn Mastery",
    tags: ["LinkedIn", "Networking", "Personal Brand"],
    illustration: "postLinkedinMastery",
    imagePrompt:
      "Illustration of a leadership post card rising through a professional network graph, warm editorial style, abstract platform representation.",
  },
  {
    slug: "ghostless-publishing-explained",
    title: "Ghostless Publishing Explained",
    excerpt:
      "Why content that stays anchored in your voice builds more credibility than ghostwritten alternatives.",
    read: "4 min read",
    category: "Ghostless Publishing",
    tags: ["Publishing", "Authenticity", "Content Strategy"],
    illustration: "postGhostless",
    imagePrompt:
      "Illustration of an executive's own voice line flowing into published content cards, with a subtle approved-by-author checkmark.",
  },
  {
    slug: "signal-vs-noise",
    title: "Signal vs. Noise: Cutting Through Clutter",
    excerpt:
      "Master clarity by focusing on what truly resonates with your audience.",
    read: "6 min read",
    category: "Signal vs. Noise",
    tags: ["Clarity", "Focus", "Content Strategy"],
    illustration: "postSignalNoise",
    imagePrompt:
      "Minimal illustration of scattered noisy shapes resolving into a single clear signal beam, warm paper background, muted blue accent.",
  },
];

export const FEATURED_POST_SLUG = "data-driven-authority";

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return getPost(FEATURED_POST_SLUG) ?? BLOG_POSTS[0];
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
