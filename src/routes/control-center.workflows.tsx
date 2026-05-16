import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/workflows")({
  head: () => ({ meta: [{ title: "Workflows — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Workflows"
        title="The pipeline, end to end."
        description="Draft → QA → approval → schedule → publish → analyze. Where work flows, where it stalls, and which agent owns the next step."
        cards={[
          { meta: "In motion", title: "212 active workflows", body: "Across all customers. 96% are on or ahead of schedule." },
          { meta: "Failures", title: "7 this week", body: "5 channel auth errors, 2 retries. Cody is patching the Postiz adapter." },
          { meta: "Median latency", title: "Draft → publish 22h", body: "Down from 31h last month as voice models stabilize." },
          { meta: "Top agent", title: "Leo — 318 drafts", body: "Highest throughput agent, highest voice-fit score." },
          { meta: "Automation", title: "Auto-scheduling", body: "Sam tunes publishing windows weekly per executive." },
          { meta: "Rollback", title: "Always available", body: "Any published piece can be retracted and re-queued in one click." },
        ]}
      />
    </FounderShell>
  ),
});
