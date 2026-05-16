/**
 * craftedVirtueIllustrationStyle
 * --------------------------------------------------------------------------
 * Source of truth for every illustration generated for Crafted Virtue:
 * hero images, blog thumbnails, article heroes, onboarding scenes, dashboard
 * empty states, feature cards, enterprise visuals, report visuals, support
 * and training cards, and agent portraits.
 *
 * Inspired by the calm editorial illustration language of getstoic.com — but
 * never copying its assets, characters, or compositions. The goal is quiet
 * expertise becoming visible authority.
 *
 * Import `buildIllustrationPrompt(useCase, subject)` whenever you generate an
 * image so every asset stays inside the visual system.
 */

export type IllustrationUseCase =
  | "hero"
  | "blogThumbnail"
  | "articleHero"
  | "onboarding"
  | "emptyState"
  | "featureCard"
  | "enterprise"
  | "report"
  | "publishing"
  | "voiceProfile"
  | "supportTraining"
  | "agentPortrait";

// --- Art direction --------------------------------------------------------

export const ART_DIRECTION = {
  mood: [
    "calm",
    "premium",
    "editorial",
    "warm",
    "reflective",
    "intelligent",
    "quiet expertise becoming visible authority",
  ],
  do: [
    "soft hand-drawn / vector feel",
    "warm neutral backgrounds",
    "simple symbolic compositions",
    "gentle character or animal motifs",
    "product mockups mixed with illustrations",
    "subtle paper-grain texture",
    "calm whitespace",
    "emotional clarity",
    "rounded, friendly forms",
    "minimal palette, 1–2 accent colors per image",
  ],
  dont: [
    "loud gradients",
    "glossy 3D renders",
    "generic AI robot imagery",
    "stock-photo corporate visuals",
    "neon cyberpunk styling",
    "heavy outlines unless intentional",
    "dense diagrams with tiny labels",
    "cartoon mascots",
  ],
} as const;

// --- Palette --------------------------------------------------------------

export const PALETTE = {
  ivory:       { hex: "#F5EFE3", role: "warm ivory background" },
  ink:         { hex: "#1B1F2A", role: "charcoal / navy ink" },
  slate:       { hex: "#5A6B7B", role: "muted slate" },
  blue:        { hex: "#3B6FA0", role: "restrained blue accent" },
  gold:        { hex: "#C9A84C", role: "soft gold accent" },
  green:       { hex: "#6B8E5E", role: "muted green — growth" },
  copper:      { hex: "#B5651D", role: "clay / copper — warmth" },
  rose:        { hex: "#C45C7C", role: "rose — media accent only" },
  violet:      { hex: "#6B4FBB", role: "violet — creative accent only" },
} as const;

export type PaletteKey = keyof typeof PALETTE;

// --- Line, texture, composition ------------------------------------------

export const LINE_AND_TEXTURE = [
  "clean vector edges with slightly organic curves",
  "subtle paper grain overlay",
  "soft, low-opacity shadows",
  "no heavy outlines unless used as a deliberate editorial gesture",
] as const;

export const COMPOSITION_RULES = [
  "one large, simple subject anchoring the frame",
  "generous whitespace around the subject",
  "exactly one clear metaphor per image",
  "legible at both thumbnail and hero size",
  "asymmetric balance over centered symmetry",
] as const;

// --- Visual vocabulary (Crafted Virtue-specific metaphors) ---------------

export const VISUAL_VOCABULARY = [
  "a signal emerging from noise",
  "a quiet expert at a writing desk",
  "content cards becoming a publishing calendar",
  "executive voice rendered as a waveform or a single written line",
  "the agent team shown as a small cluster of portraits",
  "research and citation chips floating beside a paragraph",
  "an approval flow as a calm sequence of checkmarks",
  "charts resolving into a single strategic insight",
  "public authority as a lighted window, compass, or signal beam",
  "writing desk, notebook, dashboard, content cards",
  "calm birds, folded paper, soft abstract geometry, editorial diagrams",
  "executive dashboard mockups with warm paper-like backgrounds",
] as const;

// --- Use-case templates --------------------------------------------------

type Template = {
  label: string;
  subject: string;
  accents: PaletteKey[]; // 1–2 accents per illustration
  prompt: string;
};

export const TEMPLATES: Record<IllustrationUseCase, Template> = {
  hero: {
    label: "Hero illustration",
    subject: "a quiet executive workspace transforming into a clear market signal",
    accents: ["blue", "gold"],
    prompt:
      "Premium editorial illustration of a quiet executive workspace transforming into a clear market signal, warm ivory background, charcoal ink, restrained blue and gold accents, soft vector shapes, subtle paper texture, calm sophisticated mood, no 3D, no stock photo, no robot.",
  },
  blogThumbnail: {
    label: "Blog thumbnail",
    subject: "one symbolic metaphor for an executive thought-leadership article",
    accents: ["blue"],
    prompt:
      "Minimal editorial illustration for an executive thought-leadership article, symbolic composition, warm neutral background, charcoal and muted blue palette, subtle texture, one clear metaphor, refined vector style, calm and intelligent.",
  },
  articleHero: {
    label: "Article hero",
    subject: "the central metaphor of the article rendered at editorial scale",
    accents: ["blue", "gold"],
    prompt:
      "Editorial hero illustration for a long-form article, single large symbolic subject with generous whitespace, warm ivory background, charcoal linework, one restrained accent color from the Crafted Virtue palette, soft paper grain, calm reflective mood, refined vector style.",
  },
  onboarding: {
    label: "Onboarding illustration",
    subject: "a new operator being gently guided through a calm first step",
    accents: ["gold"],
    prompt:
      "Calm onboarding illustration of a thoughtful operator at a writing desk with a single guiding checkmark or compass motif, warm ivory background, charcoal ink, soft gold accent, refined vector style, subtle paper grain, reassuring premium mood.",
  },
  emptyState: {
    label: "App empty state",
    subject: "content cards, approval checkmarks, and a soft dashboard panel",
    accents: ["blue"],
    prompt:
      "Calm product illustration of content cards, approval checkmarks, and a soft dashboard panel, warm off-white background, muted blue accent, simple vector composition, reassuring and premium.",
  },
  featureCard: {
    label: "Feature card",
    subject: "one small precise object that names the feature",
    accents: ["blue"],
    prompt:
      "Small editorial illustration for a feature card, one simple symbolic object (notebook, signal beam, calendar card, or compass) on a warm ivory background, charcoal ink with a single accent color, refined vector style, generous negative space, readable at small sizes.",
  },
  enterprise: {
    label: "Enterprise visual",
    subject: "multiple executive voices aligning into one clear market signal",
    accents: ["blue", "gold"],
    prompt:
      "Editorial illustration of multiple executive voices aligning into one clear market signal, warm ivory background, navy charcoal linework, subtle blue and gold accents, board-safe professional mood, refined vector style, no 3D, no stock imagery.",
  },
  report: {
    label: "Report visual",
    subject: "an influence score report with a rising signal curve",
    accents: ["blue", "gold"],
    prompt:
      "Editorial illustration of an influence score report with a rising signal curve, warm paper-like background, refined chart elements rendered as quiet editorial diagrams, calm executive style, muted blue and gold accents.",
  },
  publishing: {
    label: "Publishing visual",
    subject: "approved content cards flowing into a weekly publishing calendar",
    accents: ["blue"],
    prompt:
      "Editorial illustration of approved content cards flowing into a weekly publishing calendar with social channel icons represented abstractly, warm neutral background, refined vector style, calm rhythm, one restrained blue accent.",
  },
  voiceProfile: {
    label: "Voice profile visual",
    subject: "a written line becoming a clean voice waveform and content card",
    accents: ["blue"],
    prompt:
      "Editorial illustration of a single written line becoming a clean voice waveform and a content card, warm ivory background, charcoal ink, subtle blue accent, calm and precise, refined vector style.",
  },
  supportTraining: {
    label: "Support & training card",
    subject: "a calm guide motif — open book, lighted lamp, or steady hand",
    accents: ["copper"],
    prompt:
      "Editorial illustration for a support or training card, calm guide motif such as an open notebook or lighted desk lamp, warm ivory background, charcoal ink with a single warm copper accent, refined vector style, reassuring sophisticated tone.",
  },
  agentPortrait: {
    label: "Agent portrait",
    subject: "a single specialist agent rendered as a refined editorial portrait",
    accents: ["gold"],
    prompt:
      "Small premium editorial portrait of an AI specialist agent, warm neutral background, refined illustrated face with calm expression, subtle role-specific motif behind the shoulder, soft paper texture, circular crop friendly, executive SaaS style, no robot, no cartoon, no 3D.",
  },
};

// --- Prompt builder -------------------------------------------------------

const NEGATIVES =
  "no 3D render, no glossy gradients, no neon cyberpunk, no AI robot imagery, no stock-photo corporate look, no cartoon mascots, no dense labels, no heavy outlines.";

const BACKBONE =
  "Premium editorial illustration in the Crafted Virtue style: warm ivory background with subtle paper grain, charcoal/navy ink, rounded organic vector forms, generous whitespace, one clear metaphor, calm reflective mood, master-level editorial craftsmanship.";

/**
 * Build a fully-specified image prompt for a given use case.
 * Pass `subjectOverride` to swap in a topic-specific metaphor while keeping
 * the rest of the Crafted Virtue visual system intact.
 */
export function buildIllustrationPrompt(
  useCase: IllustrationUseCase,
  subjectOverride?: string,
): string {
  const t = TEMPLATES[useCase];
  const subject = subjectOverride ?? t.subject;
  const accents = t.accents.map((k) => PALETTE[k].role).join(" and ");
  return [
    BACKBONE,
    `Subject: ${subject}.`,
    `Accents: ${accents}.`,
    NEGATIVES,
  ].join(" ");
}

// --- Single export for convenient consumption ----------------------------

export const craftedVirtueIllustrationStyle = {
  artDirection: ART_DIRECTION,
  palette: PALETTE,
  lineAndTexture: LINE_AND_TEXTURE,
  composition: COMPOSITION_RULES,
  vocabulary: VISUAL_VOCABULARY,
  templates: TEMPLATES,
  buildPrompt: buildIllustrationPrompt,
} as const;

export default craftedVirtueIllustrationStyle;
