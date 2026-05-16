/**
 * Crafted Virtue illustration registry.
 * All public-site imagery resolves through this single module so the visual
 * system stays unified. Use `<Illustration name="…" />` instead of raw <img>.
 */
import heroHome from "@/assets/illustrations/hero-home.jpg";
import problemNoise from "@/assets/illustrations/problem-noise.jpg";
import solutionAuthentic from "@/assets/illustrations/solution-authentic.jpg";
import solutionBoard from "@/assets/illustrations/solution-board.jpg";
import solutionCompounding from "@/assets/illustrations/solution-compounding.jpg";
import dashboardReview from "@/assets/illustrations/dashboard-review.jpg";
import featureBrandStudio from "@/assets/illustrations/feature-brand-studio.jpg";
import featureContentEngine from "@/assets/illustrations/feature-content-engine.jpg";
import featureTruthFilter from "@/assets/illustrations/feature-truth-filter.jpg";
import featurePublishing from "@/assets/illustrations/feature-publishing.jpg";
import featureAnalytics from "@/assets/illustrations/feature-analytics.jpg";
import enterpriseAligned from "@/assets/illustrations/enterprise-aligned.jpg";
import reportCurve from "@/assets/illustrations/report-curve.jpg";
import approachSignal from "@/assets/illustrations/approach-signal.jpg";
import blogFeatured from "@/assets/illustrations/blog-featured.jpg";
import blogBird from "@/assets/illustrations/blog-bird.jpg";
import blogBook from "@/assets/illustrations/blog-book.jpg";
import blogCompass from "@/assets/illustrations/blog-compass.jpg";
import onboardingProfile from "@/assets/illustrations/onboarding-profile.jpg";
import onboardingVoice from "@/assets/illustrations/onboarding-voice.jpg";
import onboardingPillars from "@/assets/illustrations/onboarding-pillars.jpg";
import onboardingCalendar from "@/assets/illustrations/onboarding-calendar.jpg";
import onboardingScore from "@/assets/illustrations/onboarding-score.jpg";
import unlockPodcast from "@/assets/illustrations/unlock-podcast.jpg";
import unlockVideo from "@/assets/illustrations/unlock-video.jpg";
import unlockPresence from "@/assets/illustrations/unlock-presence.jpg";
import unlockManuscript from "@/assets/illustrations/unlock-manuscript.jpg";
import unlockRevenue from "@/assets/illustrations/unlock-revenue.jpg";
import unlockPartner from "@/assets/illustrations/unlock-partner.jpg";
import postQuietAuthority from "@/assets/illustrations/post-quiet-authority.jpg";
import postDataAuthority from "@/assets/illustrations/post-data-authority.jpg";
import postExecutiveBrand from "@/assets/illustrations/post-executive-brand.jpg";
import postInfluenceMetrics from "@/assets/illustrations/post-influence-metrics.jpg";
import postAiCommunication from "@/assets/illustrations/post-ai-communication.jpg";
import postLinkedinMastery from "@/assets/illustrations/post-linkedin-mastery.jpg";
import postGhostless from "@/assets/illustrations/post-ghostless.jpg";
import postSignalNoise from "@/assets/illustrations/post-signal-noise.jpg";

export type IllustrationName =
  | "heroHome"
  | "problemNoise"
  | "solutionAuthentic"
  | "solutionBoard"
  | "solutionCompounding"
  | "dashboardReview"
  | "brandStudio"
  | "contentEngine"
  | "truthFilter"
  | "publishing"
  | "analytics"
  | "enterpriseAligned"
  | "reportCurve"
  | "approachSignal"
  | "blogFeatured"
  | "blogBird"
  | "blogBook"
  | "blogCompass"
  | "onboardingProfile"
  | "onboardingVoice"
  | "onboardingPillars"
  | "onboardingCalendar"
  | "onboardingScore"
  | "unlockPodcast"
  | "unlockVideo"
  | "unlockPresence"
  | "unlockManuscript"
  | "unlockRevenue"
  | "unlockPartner"
  | "postQuietAuthority"
  | "postDataAuthority"
  | "postExecutiveBrand"
  | "postInfluenceMetrics"
  | "postAiCommunication"
  | "postLinkedinMastery"
  | "postGhostless"
  | "postSignalNoise";

type Entry = { src: string; alt: string; w: number; h: number };

export const ILLUSTRATIONS: Record<IllustrationName, Entry> = {
  heroHome:            { src: heroHome,            w: 1280, h: 800, alt: "Editorial illustration of a quiet executive at a writing desk with a signal beam rising toward the horizon" },
  problemNoise:        { src: problemNoise,        w: 1024, h: 768, alt: "Scattered noise resolving into a single calm signal line" },
  solutionAuthentic:   { src: solutionAuthentic,   w: 768,  h: 768, alt: "A quill and pen resting on an open notebook — authentic voice" },
  solutionBoard:       { src: solutionBoard,       w: 768,  h: 768, alt: "A sealed document behind a shield — board-safe review" },
  solutionCompounding: { src: solutionCompounding, w: 768,  h: 768, alt: "A growing stack of books — compounding authority" },
  dashboardReview:     { src: dashboardReview,     w: 1024, h: 768, alt: "An executive reviewing a calm dashboard at a warm wooden desk" },
  brandStudio:         { src: featureBrandStudio,  w: 1152, h: 768, alt: "Voice waveform calibrating into a steady editorial signal" },
  contentEngine:       { src: featureContentEngine,w: 1152, h: 768, alt: "Content cards flowing from draft to citation to approval" },
  truthFilter:         { src: featureTruthFilter,  w: 1152, h: 768, alt: "A magnifying glass over a paragraph with floating citation chips" },
  publishing:          { src: featurePublishing,   w: 1152, h: 768, alt: "A calm weekly publishing calendar with content cards placed across days" },
  analytics:           { src: featureAnalytics,    w: 1152, h: 768, alt: "Quiet chart bars resolving into a highlighted strategic insight" },
  enterpriseAligned:   { src: enterpriseAligned,   w: 1280, h: 800, alt: "Multiple executive voices aligning into one firm-wide signal" },
  reportCurve:         { src: reportCurve,         w: 1280, h: 800, alt: "Influence Delta report cover with a rising signal curve" },
  approachSignal:      { src: approachSignal,      w: 1280, h: 800, alt: "Field of noise calming into a lighted window on the horizon" },
  blogFeatured:        { src: blogFeatured,        w: 1024, h: 768, alt: "Quiet desk with an open laptop, notebook, and coffee — editorial thought-leadership" },
  blogBird:            { src: blogBird,            w: 1024, h: 768, alt: "Single bird in flight over a thin signal line" },
  blogBook:            { src: blogBook,            w: 1024, h: 768, alt: "Open book with a rising chart line emerging from the pages" },
  blogCompass:         { src: blogCompass,         w: 1024, h: 768, alt: "Compass resting on folded paper with subtle map lines" },
  onboardingProfile:   { src: onboardingProfile,   w: 1024, h: 768, alt: "Editorial executive profile card on warm ivory" },
  onboardingVoice:     { src: onboardingVoice,     w: 1024, h: 768, alt: "A written ink line becoming a clean voice waveform" },
  onboardingPillars:   { src: onboardingPillars,   w: 1024, h: 768, alt: "Four organized content pillars standing in a calm row" },
  onboardingCalendar:  { src: onboardingCalendar,  w: 1024, h: 768, alt: "Weekly publishing calendar with an approval checkmark" },
  onboardingScore:     { src: onboardingScore,     w: 1024, h: 768, alt: "Calm rising Brand Score line chart" },
  unlockPodcast:       { src: unlockPodcast,       w: 1024, h: 1024, alt: "Podcast microphone with script cards and a soft waveform" },
  unlockVideo:         { src: unlockVideo,         w: 1024, h: 1024, alt: "Video frame with timeline, waveform, and media cards" },
  unlockPresence:      { src: unlockPresence,      w: 1024, h: 1024, alt: "Polished personal website assembled from content cards" },
  unlockManuscript:    { src: unlockManuscript,    w: 1024, h: 1024, alt: "Open manuscript with chapter cards and citation markers" },
  unlockRevenue:       { src: unlockRevenue,       w: 1024, h: 1024, alt: "Content assets becoming a landing page, email sequence, and lead magnet" },
  unlockPartner:       { src: unlockPartner,       w: 1024, h: 1024, alt: "Network of speaking, podcast, press, and partnership nodes radiating from an executive signal" },
  postQuietAuthority:    { src: postQuietAuthority,    w: 1024, h: 768, alt: "Calm executive desk with one clear signal line rising above a field of muted content noise" },
  postDataAuthority:     { src: postDataAuthority,     w: 1024, h: 768, alt: "Executive dashboard with Brand Score, Influence Delta, and content pillar charts resolving into one clear signal" },
  postExecutiveBrand:    { src: postExecutiveBrand,    w: 1024, h: 768, alt: "Professional profile card assembled from voice, values, expertise, and content pillars" },
  postInfluenceMetrics:  { src: postInfluenceMetrics,  w: 1024, h: 768, alt: "Engagement metrics, audience growth, and opportunity signals as a calm executive briefing" },
  postAiCommunication:   { src: postAiCommunication,   w: 1024, h: 768, alt: "Human handwriting and AI assistance working together — content cards, voice waveform, approval checkmark" },
  postLinkedinMastery:   { src: postLinkedinMastery,   w: 1024, h: 768, alt: "Leadership post card rising through an abstract professional network graph" },
  postGhostless:         { src: postGhostless,         w: 1024, h: 768, alt: "An executive's own voice line flowing into published content cards with approved-by-author checkmarks" },
  postSignalNoise:       { src: postSignalNoise,       w: 1024, h: 768, alt: "Scattered noisy shapes resolving into a single clear signal beam on warm paper" },
};

type Props = {
  name: IllustrationName;
  className?: string;
  /** Set true for above-the-fold hero images (LCP). */
  priority?: boolean;
  /** Aspect ratio for the frame — defaults to the image's native ratio. */
  ratio?: "16/10" | "4/3" | "3/2" | "1/1" | "auto";
  /** Override alt text when used in a content-specific context. */
  alt?: string;
};

const RATIO_CLASS: Record<NonNullable<Props["ratio"]>, string> = {
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "auto": "",
};

export function Illustration({ name, className = "", priority, ratio = "auto", alt }: Props) {
  const i = ILLUSTRATIONS[name];
  const frame = `overflow-hidden rounded-2xl bg-parchment-deep ring-1 ring-inset ring-border/60 ${RATIO_CLASS[ratio]} ${className}`;
  return (
    <figure className={frame}>
      <img
        src={i.src}
        alt={alt ?? i.alt}
        width={i.w}
        height={i.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}

/** Small inline illustration for feature cards / icon slots (square, no frame chrome). */
export function IllustrationSpot({ name, className = "", alt }: Pick<Props, "name" | "className" | "alt">) {
  const i = ILLUSTRATIONS[name];
  return (
    <img
      src={i.src}
      alt={alt ?? i.alt}
      width={i.w}
      height={i.h}
      loading="lazy"
      className={`block h-auto w-full rounded-xl object-cover ${className}`}
    />
  );
}
