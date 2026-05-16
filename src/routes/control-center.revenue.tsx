import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";
import { founderMetrics } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/control-center/revenue")({
  head: () => ({ meta: [{ title: "Revenue — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Revenue"
        title="MRR, expansion, and the health of the book."
        description="Beatrice keeps every subscription healthy. This is where you see what she sees."
        cards={[
          { meta: "MRR", title: founderMetrics.revenue, body: "+18% month-over-month. Pro is the dominant tier." },
          { meta: "Trials", title: `${founderMetrics.trialConversions} converted`, body: "Trial-to-paid conversion 62% — well above category benchmarks." },
          { meta: "Refunds", title: `${founderMetrics.refundCases} this quarter`, body: "Both resolved within 24 hours. No churn-on-bill issues." },
          { meta: "Enterprise", title: "3 live · 2 in procurement", body: "Northstar Ventures is the lighthouse account driving the rest." },
          { meta: "Expansion", title: "+$8,420 net new", body: "Seat additions and Core → Pro upgrades, mostly in biotech and finance." },
          { meta: "Forecast", title: "$54k next month", body: "Beatrice's pacing model based on signed agreements and trial velocity." },
        ]}
      />
    </FounderShell>
  ),
});
