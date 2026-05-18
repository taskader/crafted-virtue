import { createFileRoute } from "@tanstack/react-router";
import { TrustPageLayout, type TrustSection } from "@/components/trust-page-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Crafted Virtue" },
      { name: "description", content: "Clear rules for using Crafted Virtue: responsibilities of users, teams, and the platform." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: TrustSection[] = [
  {
    number: 1,
    title: "Using Crafted Virtue",
    copy: "Crafted Virtue provides tools for executive personal branding, AI-assisted content creation, approval workflows, publishing coordination, analytics, media planning, training, and related services.",
  },
  {
    number: 2,
    title: "Accounts and Access",
    bullets: [
      "You are responsible for maintaining accurate account information.",
      "You are responsible for protecting login credentials.",
      "Enterprise administrators may manage access, roles, and permissions for their organization.",
      "Some features may depend on plan level, connected channels, or approval settings.",
    ],
  },
  {
    number: 3,
    title: "Your Content",
    copy: "You retain ownership of the original content, writing samples, edits, and approved materials you provide to Crafted Virtue. By using the platform, you grant Crafted Virtue permission to process that content to provide the service.",
  },
  {
    number: 4,
    title: "AI-Generated Drafts",
    copy: "AI-generated content is a draft, not a guarantee of accuracy, suitability, or publication readiness. You are responsible for reviewing drafts before publication. Crafted Virtue is designed to support approval-aware publishing.",
    callout: "Nothing publishes until you approve it.",
  },
  {
    number: 5,
    title: "Publishing and Connected Channels",
    copy: "Crafted Virtue may help schedule or prepare content for connected channels. Platform rules, API limits, moderation decisions, and publishing outcomes may vary by channel. Users remain responsible for ensuring approved content is appropriate for their intended audience and industry.",
  },
  {
    number: 6,
    title: "Acceptable Use",
    copy: "Users may not use Crafted Virtue to:",
    bullets: [
      "Create deceptive, unlawful, defamatory, harassing, or harmful content.",
      "Impersonate others without authorization.",
      "Upload content they do not have rights to use.",
      "Circumvent platform safeguards or approval workflows.",
      "Attempt to access another user's workspace or data.",
      "Abuse connected publishing or analytics systems.",
    ],
  },
  {
    number: 7,
    title: "Subscriptions and Billing",
    copy: "Paid plans, trials, renewals, add-ons, and enterprise pricing may vary by agreement. Billing terms should be presented during checkout or in the user's account page.",
  },
  {
    number: 8,
    title: "Enterprise Use",
    copy: "Enterprise customers may configure roles, brand rules, approval workflows, audit archives, and compliance settings. Enterprise administrators are responsible for assigning appropriate permissions.",
  },
  {
    number: 9,
    title: "Service Availability",
    copy: "Crafted Virtue aims to provide a reliable service, but availability may be affected by maintenance, third-party services, integrations, platform APIs, or events outside our control.",
  },
  {
    number: 10,
    title: "Limitation of Liability",
    copy: "Crafted Virtue supports content creation, strategy, and publishing workflows, but does not guarantee specific business, career, revenue, hiring, speaking, or market outcomes.",
  },
  {
    number: 11,
    title: "Changes to Terms",
    copy: "We may update these terms as the product evolves. Material changes should be communicated through the product or website.",
  },
];

function TermsPage() {
  return (
    <TrustPageLayout
      eyebrow="TERMS"
      title="Clear rules for using Crafted Virtue."
      summary="Crafted Virtue is built to help professionals create, review, publish, and measure executive thought leadership. These terms outline the responsibilities of users, teams, and the platform."
      lastUpdated="Last updated: May 2026"
      legalNote="This is a general product policy page intended to communicate Crafted Virtue's approach to its terms of use. It should be reviewed by qualified legal counsel before production use."
      sections={SECTIONS}
    />
  );
}
