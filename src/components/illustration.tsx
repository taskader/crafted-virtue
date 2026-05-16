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
  | "blogCompass";

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
