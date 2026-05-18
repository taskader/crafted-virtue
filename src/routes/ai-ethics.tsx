import { createFileRoute } from "@tanstack/react-router";
import { TrustPageLayout, type TrustSection } from "@/components/trust-page-layout";

export const Route = createFileRoute("/ai-ethics")({
  head: () => ({
    meta: [
      { title: "AI & Ethics — Crafted Virtue" },
      { name: "description", content: "How Crafted Virtue uses AI responsibly: human-in-the-loop publishing, voice authenticity, and verifiable authority." },
    ],
  }),
  component: AIEthicsPage,
});

const SECTIONS: TrustSection[] = [
  {
    number: 1,
    title: "Our AI Philosophy",
    copy: "Crafted Virtue is an AI-first platform, but not an AI-autopilot for reputation. The system can draft, research, adapt, analyze, and recommend. The human remains responsible for approval, judgment, and final public voice.",
  },
  {
    number: 2,
    title: "The Golden Rules",
    cards: [
      {
        title: "Help People Find Their Niche",
        body: "The platform should guide users toward the topics where their insight is most specific, credible, and valuable.",
      },
      {
        title: "Inclusivity and Respect",
        body: "Authority should not be gated by wealth, status, or hype. Crafted Virtue is for professionals with real insight and the ambition to communicate it clearly.",
      },
      {
        title: "Client Content Requires a Human in the Loop",
        body: "User-facing content should not publish without the appropriate approval. The user remains the ultimate arbiter of their voice.",
      },
      {
        title: "Internal Automation Requires Strong Guardrails",
        body: "Automation is useful when quality standards, logging, monitoring, and escalation paths are in place.",
      },
      {
        title: "Verifiable Authority",
        body: "Factual claims should be supported by credible sources where possible, and unverified claims should be flagged before approval.",
      },
    ],
  },
  {
    number: 3,
    title: "Human-in-the-Loop Publishing",
    callout: "Nothing publishes until you approve it.",
    copy: "Crafted Virtue is designed around approval-aware workflows. The system may prepare drafts and schedules, but publishing is gated by review and approval.",
  },
  {
    number: 4,
    title: "Voice and Authenticity",
    copy: "The Voice Profile is designed to learn from writing samples, edits, and approvals. It should help preserve the user's style, not flatten every user into the same generic AI voice.",
  },
  {
    number: 5,
    title: "Fact Checking and Citations",
    copy: "The Truth Filter identifies claims that may require support, adds citation prompts, and flags content that needs more evidence. This helps protect credibility and reduce hallucination risk.",
  },
  {
    number: 6,
    title: "Agent Transparency",
    copy: "Crafted Virtue uses specialist agents for onboarding, content, analytics, quality, media, support, billing, and strategy. Users should understand why a specialist is involved without having to manage every agent manually.",
  },
  {
    number: 7,
    title: "What We Avoid",
    bullets: [
      "Unreviewed publishing.",
      "Generic AI slop.",
      "Fake authority.",
      "Unsupported claims.",
      "Impersonation without permission.",
      "Engagement manipulation.",
      "Hype over substance.",
    ],
  },
  {
    number: 8,
    title: "AI Limitations",
    copy: "AI can be wrong, incomplete, outdated, or poorly matched to context. That is why Crafted Virtue combines AI assistance with review, approvals, citations, and user control.",
  },
  {
    number: 9,
    title: "Responsible Use",
    copy: "Crafted Virtue should be used to clarify real expertise, not manufacture deceptive expertise. The goal is not to make someone appear to know what they do not know. The goal is to help their actual insight travel further.",
  },
];

function AIEthicsPage() {
  return (
    <TrustPageLayout
      eyebrow="AI & ETHICS"
      title="AI should amplify judgment, not erase it."
      summary="Crafted Virtue uses AI to help professionals turn expertise into public authority. Our AI philosophy is simple: keep people in control, make outputs reviewable, protect trust, and never confuse automation with authorship."
      lastUpdated="Last updated: May 2026"
      sections={SECTIONS}
    />
  );
}
