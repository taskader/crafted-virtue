import { createFileRoute } from "@tanstack/react-router";
import { TrustPageLayout, type TrustSection } from "@/components/trust-page-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Crafted Virtue" },
      { name: "description", content: "How Crafted Virtue collects, uses, and protects your voice, content, and data." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: TrustSection[] = [
  {
    number: 1,
    title: "What We Collect",
    copy: "We collect the information needed to create and operate your personal-branding workspace.",
    bullets: [
      "Account information such as name, email, title, company, and login details.",
      "Professional profile information such as industry, goals, audience, biography, and public links.",
      "Voice and content inputs such as writing samples, approved posts, edits, comments, and draft preferences.",
      "Generated content such as drafts, revisions, media concepts, approval history, and publishing plans.",
      "Connected-channel metadata such as connected platforms, publishing status, and analytics returned from those platforms.",
      "Usage and product data such as onboarding progress, feature usage, support interactions, and app activity.",
      "Billing information handled through payment providers; Crafted Virtue should not store full payment card details directly.",
    ],
  },
  {
    number: 2,
    title: "How We Use Information",
    copy: "We use your information to operate the product and improve the quality of your personal brand system.",
    bullets: [
      "Build and maintain your Voice Profile.",
      "Generate, revise, and improve content drafts.",
      "Create publishing plans and approval workflows.",
      "Show analytics, Brand Score, Influence Delta, and performance briefings.",
      "Support onboarding, training, billing, and customer service.",
      "Detect errors, abuse, or workflow failures.",
      "Improve product quality and user experience.",
    ],
  },
  {
    number: 3,
    title: "Voice Profile and Writing Samples",
    copy: "Your writing samples and edits are used to help Crafted Virtue understand your style. The goal is not to replace your voice. The goal is to help your agent draft content that sounds more like you, while keeping you in control.",
    callout: "Nothing publishes until you approve it.",
  },
  {
    number: 4,
    title: "Connected Channels",
    copy: "When you connect publishing channels, Crafted Virtue may receive platform metadata and analytics required to schedule, track, and report on content. Publishing permissions can be revoked through your connected channel settings.",
  },
  {
    number: 5,
    title: "AI Processing",
    copy: "Crafted Virtue uses AI systems to help with onboarding, content drafting, voice learning, analytics, research, media planning, and support. AI outputs can be useful but should be reviewed. For user-facing content, approval remains part of the product experience.",
  },
  {
    number: 6,
    title: "Data Sharing",
    copy: "We do not sell your personal content or writing samples. We may share limited information with service providers that help us operate the product, including hosting, analytics, billing, publishing, support, and AI-processing providers.",
  },
  {
    number: 7,
    title: "Enterprise Workspaces",
    copy: "Enterprise customers may have administrators, brand managers, or reviewers who can access workspace activity according to their assigned permissions. Enterprise accounts may also require audit logs, content archives, approval records, and compliance exports.",
  },
  {
    number: 8,
    title: "Data Retention",
    copy: "We retain account, content, analytics, and audit information for as long as needed to provide the service, meet operational needs, support enterprise compliance, or satisfy legal obligations.",
  },
  {
    number: 9,
    title: "Your Choices",
    bullets: [
      "Update profile information.",
      "Add or remove writing samples.",
      "Disconnect publishing channels.",
      "Manage notification preferences.",
      "Request data access or deletion where applicable.",
      "Cancel or modify your subscription.",
    ],
  },
  {
    number: 10,
    title: "Contact",
    copy: "For privacy questions, contact the Crafted Virtue team through the support channel or contact form.",
  },
];

function PrivacyPage() {
  return (
    <TrustPageLayout
      eyebrow="PRIVACY"
      title="Your voice, content, and data deserve protection."
      summary="Crafted Virtue helps professionals build public authority, which means we handle sensitive information: professional context, writing samples, generated drafts, connected channels, performance data, and brand preferences. This page explains how we think about that responsibility."
      lastUpdated="Last updated: May 2026"
      legalNote="This is a general product policy page intended to communicate Crafted Virtue's approach to privacy. It should be reviewed by qualified legal counsel before production use."
      sections={SECTIONS}
    />
  );
}
