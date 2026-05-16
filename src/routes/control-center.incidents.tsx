import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/incidents")({
  head: () => ({ meta: [{ title: "Incidents — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Incidents"
        title="Operational truth."
        description="Every degradation, retry, and recovery — surfaced honestly so trust compounds instead of erodes."
        cards={[
          { meta: "Status", title: "All systems normal", body: "No active incidents. Last incident resolved 9 days ago." },
          { meta: "Resolved", title: "LinkedIn API throttling", body: "Mar 12 · 38 min · 4 customers affected · auto-retry succeeded for all." },
          { meta: "Resolved", title: "Postiz webhook lag", body: "Mar 8 · 12 min · publishing windows shifted by <90 seconds." },
          { meta: "Postmortem", title: "Voice model drift", body: "Feb 24 · root cause identified, retraining cadence increased to weekly." },
          { meta: "On-call", title: "Cody + Scout", body: "Engineering rotation covers nights and weekends. No outages this quarter." },
          { meta: "Promise", title: "Nothing publishes by accident", body: "Approval-aware workflows make accidental publishing structurally impossible." },
        ]}
      />
    </FounderShell>
  ),
});
