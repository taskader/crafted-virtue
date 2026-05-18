import { createFileRoute } from "@tanstack/react-router";
import { TrustPageLayout, type TrustSection } from "@/components/trust-page-layout";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Crafted Virtue" },
      { name: "description", content: "How Crafted Virtue protects voice, reputation, content, and enterprise approval data." },
    ],
  }),
  component: SecurityPage,
});

const SECTIONS: TrustSection[] = [
  {
    number: 1,
    title: "Security Principles",
    cards: [
      { title: "Least-privilege access" },
      { title: "Approval-aware publishing" },
      { title: "Secure connected-channel handling" },
      { title: "Auditability" },
      { title: "Enterprise isolation" },
      { title: "Human oversight for high-risk actions" },
    ],
  },
  {
    number: 2,
    title: "Account and Access Security",
    bullets: [
      "Secure authentication and session management.",
      "Role-aware access controls.",
      "Enterprise role and permission management.",
      "Optional enterprise SSO planned for advanced deployments.",
      "Administrative access should be limited and logged.",
    ],
  },
  {
    number: 3,
    title: "Data Protection",
    copy: "Crafted Virtue should protect sensitive information at rest and in transit. User content, writing samples, connected-channel metadata, analytics, and approval logs should be handled according to appropriate security controls.",
  },
  {
    number: 4,
    title: "Connected Channels",
    copy: "Connected publishing channels are sensitive. Tokens and channel permissions should be stored securely, never displayed in the UI, and revocable by the user or administrator.",
  },
  {
    number: 5,
    title: "Approval and Publishing Safety",
    callout: "Only approved content can be published.",
    copy: "Publishing workflows should enforce approval state before content can be scheduled or sent to connected channels. High-risk, failed, or enterprise-governed content should route through additional review.",
  },
  {
    number: 6,
    title: "Audit Logs",
    copy: "Important actions should be logged, including sign-ins, content creation, content edits, approvals, publishing attempts, failed jobs, billing events, role changes, and enterprise compliance actions.",
  },
  {
    number: 7,
    title: "Enterprise Governance",
    bullets: [
      "Role-based permissions.",
      "Shared approval queues.",
      "Compliance archives.",
      "Brand rule enforcement.",
      "Export-ready reporting.",
      "Multi-executive analytics with appropriate access boundaries.",
    ],
  },
  {
    number: 8,
    title: "Incident Response",
    copy: "Security and reliability incidents should be triaged, investigated, remediated, and documented. Users or enterprise administrators should be notified when incidents materially affect their workspace or data.",
  },
  {
    number: 9,
    title: "Responsible Disclosure",
    copy: "If you believe you have discovered a vulnerability, contact the Crafted Virtue team through the security contact channel. Please avoid accessing, modifying, or disclosing user data.",
  },
];

function SecurityPage() {
  return (
    <TrustPageLayout
      eyebrow="SECURITY"
      title="Built for executive trust."
      summary="Crafted Virtue handles voice, reputation, content, social publishing, and enterprise approval data. Security is treated as a product requirement, not a back-office concern."
      lastUpdated="Last updated: May 2026"
      sections={SECTIONS}
    />
  );
}
