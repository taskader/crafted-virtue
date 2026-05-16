/**
 * Crafted Virtue Image Asset Library
 *
 * Single source of truth for every illustration used across the marketing site
 * and authenticated app. Each entry pairs a registered `<Illustration name>`
 * with editorial metadata (prompt, style tags, placement) so designers and
 * agents can keep the visual system consistent.
 *
 * To render an asset:
 *   import { ILLUSTRATION_ASSETS } from "@/data/illustrationAssets";
 *   import { Illustration } from "@/components/illustration";
 *   const a = ILLUSTRATION_ASSETS["authority-signal-hero"];
 *   <Illustration name={a.illustration} ratio={a.recommendedAspectRatio} alt={a.altText} />
 */
import type { IllustrationName } from "@/components/illustration";

export type AssetAspectRatio = "16/10" | "4/3" | "3/2" | "1/1";
export type AssetStatus = "ready" | "draft" | "needs-regeneration";

export type IllustrationAsset = {
  id: string;
  title: string;
  usage: string;
  altText: string;
  imagePrompt: string;
  styleTags: string[];
  recommendedAspectRatio: AssetAspectRatio;
  assignedPages: string[];
  status: AssetStatus;
  /** Registered illustration key — render with <Illustration name={...} />. */
  illustration: IllustrationName;
};

const BASE_STYLE_TAGS = [
  "editorial",
  "warm-ivory",
  "charcoal-ink",
  "muted-blue",
  "gold-accent",
  "soft-vector",
  "paper-texture",
];

export const ILLUSTRATION_ASSETS: Record<string, IllustrationAsset> = {
  "authority-signal-hero": {
    id: "authority-signal-hero",
    title: "Authority Signal — Hero",
    usage: "Homepage hero",
    altText:
      "Quiet executive workspace transforming into a clear market signal on warm ivory.",
    imagePrompt:
      "Premium editorial illustration of a quiet executive workspace transforming into a clear market signal, warm ivory background, charcoal ink, restrained blue and gold accents, soft vector shapes, subtle paper texture, calm sophisticated mood.",
    styleTags: [...BASE_STYLE_TAGS, "hero", "calm-sophistication"],
    recommendedAspectRatio: "16/10",
    assignedPages: ["/", "/home"],
    status: "ready",
    illustration: "heroHome",
  },
  "signal-vs-noise": {
    id: "signal-vs-noise",
    title: "Signal vs. Noise",
    usage: "Homepage problem, Approach hero, blog article",
    altText:
      "Scattered noisy content resolving into one clean signal line on a warm neutral background.",
    imagePrompt:
      "Minimal editorial illustration of scattered noisy content resolving into one clean signal line, warm neutral background, refined vector style, muted blue and charcoal palette.",
    styleTags: [...BASE_STYLE_TAGS, "minimal", "conceptual"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/", "/approach", "/blog/*"],
    status: "ready",
    illustration: "problemNoise",
  },
  "brand-studio-calibration": {
    id: "brand-studio-calibration",
    title: "Brand Studio Calibration",
    usage: "Solutions, Platform",
    altText:
      "Executive profile card with content pillars and calibration dials forming a Brand Score dashboard.",
    imagePrompt:
      "Editorial illustration of an executive profile card, content pillars, and calibration dials forming a Brand Score dashboard, warm paper texture, blue and gold accents.",
    styleTags: [...BASE_STYLE_TAGS, "dashboard", "calibration"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/solutions", "/platform"],
    status: "ready",
    illustration: "brandStudio",
  },
  "content-approval-flow": {
    id: "content-approval-flow",
    title: "Content Approval Flow",
    usage: "Solutions, App approvals",
    altText:
      "Content cards moving through draft, fact-check, voice review, approval, and schedule stages.",
    imagePrompt:
      "Illustration of content cards moving through draft, fact-check, voice review, approval, and schedule stages, calm premium SaaS style.",
    styleTags: [...BASE_STYLE_TAGS, "workflow", "saas"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/solutions", "/app/approvals"],
    status: "ready",
    illustration: "contentEngine",
  },
  "truth-filter-citations": {
    id: "truth-filter-citations",
    title: "Truth Filter & Citations",
    usage: "Platform, Content detail",
    altText:
      "Content card with citation chips and a verification checkmark on a warm neutral background.",
    imagePrompt:
      "Editorial illustration of a content card with citation chips and a verification checkmark, warm neutral background, precise linework, muted blue accent.",
    styleTags: [...BASE_STYLE_TAGS, "trust", "verification"],
    recommendedAspectRatio: "3/2",
    assignedPages: ["/platform", "/app/content/:id"],
    status: "ready",
    illustration: "truthFilter",
  },
  "publishing-calendar": {
    id: "publishing-calendar",
    title: "Publishing Calendar",
    usage: "Publishing page",
    altText:
      "Approved content cards flowing into a weekly calendar with abstract social channel nodes.",
    imagePrompt:
      "Illustration of approved content cards flowing into a weekly calendar with abstract social channel nodes, warm off-white background, soft shadows.",
    styleTags: [...BASE_STYLE_TAGS, "calendar", "scheduling"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/app/publishing"],
    status: "ready",
    illustration: "publishing",
  },
  "analytics-briefing": {
    id: "analytics-briefing",
    title: "Analytics Briefing",
    usage: "Dashboard, Analytics",
    altText:
      "Premium dashboard with Brand Score, Influence Delta, trend lines, and a calm strategy briefing panel.",
    imagePrompt:
      "Premium dashboard illustration showing Brand Score, Influence Delta, trend lines, and a calm strategy briefing panel, editorial vector style.",
    styleTags: [...BASE_STYLE_TAGS, "dashboard", "analytics"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/app/dashboard", "/app/analytics"],
    status: "ready",
    illustration: "analytics",
  },
  "voice-profile-waveform": {
    id: "voice-profile-waveform",
    title: "Voice Profile Waveform",
    usage: "Voice Profile, onboarding voice intake",
    altText:
      "Handwriting transforming into a clean voice waveform and content card.",
    imagePrompt:
      "Illustration of handwriting transforming into a clean voice waveform and content card, warm ivory background, charcoal ink, muted blue accent.",
    styleTags: [...BASE_STYLE_TAGS, "voice", "waveform"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/app/voice", "/onboarding"],
    status: "ready",
    illustration: "onboardingVoice",
  },
  "enterprise-governance": {
    id: "enterprise-governance",
    title: "Enterprise Governance",
    usage: "Enterprise pages",
    altText:
      "Multiple executive voices aligning through brand rules, approvals, and compliance into one firm-wide authority signal.",
    imagePrompt:
      "Illustration of multiple executive voices aligning through brand rules, approvals, and compliance into one firm-wide authority signal, premium editorial style.",
    styleTags: [...BASE_STYLE_TAGS, "governance", "enterprise"],
    recommendedAspectRatio: "16/10",
    assignedPages: ["/enterprise", "/solutions/enterprise"],
    status: "ready",
    illustration: "enterpriseAligned",
  },
  "influence-delta-report": {
    id: "influence-delta-report",
    title: "Influence Delta Report",
    usage: "Report page",
    altText:
      "Influence report with authority score, visibility gap, and a rising signal curve on warm paper.",
    imagePrompt:
      "Illustration of an influence report with authority score, visibility gap, and rising signal curve, warm paper-like background, refined chart elements.",
    styleTags: [...BASE_STYLE_TAGS, "report", "rising-curve"],
    recommendedAspectRatio: "4/3",
    assignedPages: ["/report", "/influence-report"],
    status: "ready",
    illustration: "reportCurve",
  },
  "podcast-studio": {
    id: "podcast-studio",
    title: "Podcast Studio",
    usage: "Platform unlocks",
    altText: "Podcast microphone with script cards and a soft waveform.",
    imagePrompt:
      "Editorial icon illustration of a podcast microphone, script cards, and soft waveform, premium warm neutral palette.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockPodcast",
  },
  "video-studio": {
    id: "video-studio",
    title: "Video Studio",
    usage: "Platform unlocks",
    altText: "Video frame with timeline, voice waveform, and media cards.",
    imagePrompt:
      "Editorial icon illustration of a video frame, timeline, voice waveform, and media cards, calm vector style.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockVideo",
  },
  "presence-hub": {
    id: "presence-hub",
    title: "Presence Hub",
    usage: "Platform unlocks",
    altText:
      "Polished personal website page assembled from content cards and authority signals.",
    imagePrompt:
      "Illustration of a polished personal website page assembled from content cards and authority signals, warm neutral background.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockPresence",
  },
  "authority-manuscript": {
    id: "authority-manuscript",
    title: "Authority Manuscript",
    usage: "Platform unlocks",
    altText: "Book manuscript with chapter cards and citation markers.",
    imagePrompt:
      "Illustration of a book manuscript, chapter cards, and citation markers, refined editorial style.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockManuscript",
  },
  "revenue-engine": {
    id: "revenue-engine",
    title: "Revenue Engine",
    usage: "Platform unlocks",
    altText:
      "Content assets becoming a landing page, email sequence, and lead magnet.",
    imagePrompt:
      "Illustration of content assets becoming a landing page, email sequence, and lead magnet, premium SaaS editorial style.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockRevenue",
  },
  "partner-amplifier": {
    id: "partner-amplifier",
    title: "Partner Amplifier",
    usage: "Platform unlocks",
    altText:
      "Calm network of speaking, podcast, press, and partnership opportunity nodes radiating from an executive signal.",
    imagePrompt:
      "Illustration of a calm network of speaking, podcast, press, and partnership opportunity nodes radiating from an executive signal.",
    styleTags: [...BASE_STYLE_TAGS, "unlock", "icon"],
    recommendedAspectRatio: "1/1",
    assignedPages: ["/platform", "/platform#unlocks"],
    status: "ready",
    illustration: "unlockPartner",
  },
};

export const ILLUSTRATION_ASSET_LIST: IllustrationAsset[] =
  Object.values(ILLUSTRATION_ASSETS);

/** Look up assets for a given page path (exact or prefix match on assignedPages). */
export function assetsForPage(path: string): IllustrationAsset[] {
  return ILLUSTRATION_ASSET_LIST.filter((a) =>
    a.assignedPages.some(
      (p) => p === path || (p.endsWith("/*") && path.startsWith(p.slice(0, -2))),
    ),
  );
}

/** Platform unlock assets, in canonical display order. */
export const PLATFORM_UNLOCK_ASSETS: IllustrationAsset[] = [
  ILLUSTRATION_ASSETS["podcast-studio"],
  ILLUSTRATION_ASSETS["video-studio"],
  ILLUSTRATION_ASSETS["presence-hub"],
  ILLUSTRATION_ASSETS["authority-manuscript"],
  ILLUSTRATION_ASSETS["revenue-engine"],
  ILLUSTRATION_ASSETS["partner-amplifier"],
];
