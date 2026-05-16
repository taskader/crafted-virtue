import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Approvals"
        title="Every approval cycle, across every executive."
        description="A founder-level view of how trust is being earned and where workflows are slowing down."
        cards={[
          { meta: "This week", title: "84 approvals cleared", body: "Median approval-to-publish: 6 min. 12% faster than last week." },
          { meta: "Bottleneck", title: "3 awaiting >24h", body: "Two are board-sensitive pieces; one is in legal review at Northstar." },
          { meta: "High-risk", title: "5 escalations", body: "All flagged by Talia, routed to brand managers, none auto-published." },
          { meta: "Voice-fit", title: "Avg 93%", body: "Voice-fit scores improving as Leo learns from each executive's edits." },
          { meta: "Compliance", title: "0 violations", body: "Crafted Virtue has never auto-published a flagged piece. By design." },
          { meta: "Audit trail", title: "Exportable", body: "Every approval is logged with reviewer, timestamp, and edit history." },
        ]}
      />
    </FounderShell>
  ),
});
