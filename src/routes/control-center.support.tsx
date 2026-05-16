import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/support")({
  head: () => ({ meta: [{ title: "Support — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Support"
        title="Concierge, not ticket queue."
        description="Konrad triages every incoming issue and routes it to the right specialist before it becomes a problem."
        cards={[
          { meta: "Open", title: "14 cases", body: "Median first response: 9 minutes. Nothing has aged past 24h." },
          { meta: "Resolved this week", title: "62 cases", body: "82% resolved on first contact without escalation." },
          { meta: "NPS", title: "+71", body: "Highest in category. Customers describe support as 'editorial-grade'." },
          { meta: "Top topic", title: "Voice tuning", body: "Most common request: 'help me sharpen the voice on this draft.'" },
          { meta: "Escalations", title: "3 to founder", body: "All compliance-adjacent. Handled within the day." },
          { meta: "Knowledge", title: "Alex updated 14 articles", body: "Library kept current as Leo and Talia ship new patterns." },
        ]}
      />
    </FounderShell>
  ),
});
