import { createFileRoute } from "@tanstack/react-router";
import { FounderShell } from "@/components/founder-shell";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/control-center/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Control Center" }] }),
  component: () => (
    <FounderShell>
      <PagePlaceholder
        tone="dark"
        eyebrow="Roadmap"
        title="What we're building, in order of conviction."
        description="Chloe keeps the product memory honest — what shipped, what's next, and why."
        cards={[
          { meta: "Shipping this month", title: "Multimedia Video Studio", body: "Vincent's evergreen video pipeline reaches general availability." },
          { meta: "In build", title: "Authority Manuscript", body: "Long-form manuscript assembly from approved essays. Q1 target." },
          { meta: "In design", title: "Presence Hub", body: "Owned executive site that mirrors authority and pipeline." },
          { meta: "Researching", title: "Partner Amplifier", body: "Coordinated amplification across trusted partner voices." },
          { meta: "Considering", title: "Speaker booking workflow", body: "Convert authority signals into qualified speaking invitations." },
          { meta: "Not now", title: "Generic social scheduler", body: "Outside our mandate. Postiz integration is enough." },
        ]}
      />
    </FounderShell>
  ),
});
