import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/users")({
  head: () => ({ meta: [{ title: "Users — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Users"
        title="Every executive on the platform."
        description="Activated voices, trial accounts, paying customers, and churn risk — in one operator-grade view."
        cards={[
          { meta: "Active", title: "128 executives", body: "Across Core, Pro, and Enterprise tiers. 21 added this month." },
          { meta: "Trial", title: "34 in 7-day trial", body: "12 converted last week. Olivia is nudging the rest through onboarding." },
          { meta: "At risk", title: "6 dormant accounts", body: "No content approved in 14 days. Konrad is reaching out personally." },
          { meta: "Top voice", title: "Dr. Anya Sharma", body: "Brand Score 84, +18 Influence Delta this quarter." },
          { meta: "Enterprise", title: "Northstar Ventures", body: "5 seats activated, 2 more provisioning this week." },
          { meta: "Cohort", title: "Q3 2025", body: "Strongest retention cohort to date — 91% at day-60." },
        ]}
      />
    </FounderShell>
  ),
});
