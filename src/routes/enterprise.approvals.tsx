import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel, StatusPill } from "@/components/ui-bits";
import { CONTENT_QUEUE } from "@/lib/mock-data";

export const Route = createFileRoute("/enterprise/approvals")({
  head: () => ({ meta: [{ title: "Approvals — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Org approval queue</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">Cross-executive sign-off.</h1>
      <p className="mt-1 text-ink-soft">Items pending review across the executive bench. Routed to brand, legal, or named reviewers as configured.</p>
      <Card className="mt-8 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-parchment-deep text-left text-xs uppercase tracking-widest text-ink-soft">
            <tr><th className="px-6 py-3">Author</th><th className="px-6 py-3">Title</th><th className="px-6 py-3">Channel</th><th className="px-6 py-3">Reviewer</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {CONTENT_QUEUE.slice(0, 6).map((c, i) => (
              <tr key={c.id}>
                <td className="px-6 py-3 font-medium">{["Ellis H.", "Maren O.", "Devon A.", "Priya A.", "Soren L.", "Tess B."][i]}</td>
                <td className="px-6 py-3">{c.title}</td>
                <td className="px-6 py-3 text-ink-soft">{c.channel}</td>
                <td className="px-6 py-3 text-ink-soft">Brand · Legal</td>
                <td className="px-6 py-3"><StatusPill status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </EnterpriseShell>
  ),
});
