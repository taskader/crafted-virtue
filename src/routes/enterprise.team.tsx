import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";

const TEAM = [
  { n: "Ellis Harrow", r: "CEO", score: 82, posts: 24 },
  { n: "Maren Okafor", r: "President", score: 76, posts: 19 },
  { n: "Devon Ash", r: "COO", score: 71, posts: 14 },
  { n: "Priya Anand", r: "Chief Product Officer", score: 80, posts: 22 },
  { n: "Soren Lin", r: "Chief People Officer", score: 68, posts: 11 },
  { n: "Tess Bramwell", r: "SVP Engineering", score: 74, posts: 18 },
];

export const Route = createFileRoute("/enterprise/team")({
  head: () => ({ meta: [{ title: "Team — Enterprise" }] }),
  component: () => (
    <EnterpriseShell>
      <SectionLabel>Team</SectionLabel>
      <h1 className="mt-2 font-display text-4xl">Activated voices.</h1>
      <Card className="mt-8 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-parchment-deep text-left text-xs uppercase tracking-widest text-ink-soft">
            <tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Brand Score</th><th className="px-6 py-3">Posts / Q</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {TEAM.map((t) => (
              <tr key={t.n}>
                <td className="px-6 py-3 font-medium">{t.n}</td>
                <td className="px-6 py-3 text-ink-soft">{t.r}</td>
                <td className="px-6 py-3">{t.score}</td>
                <td className="px-6 py-3">{t.posts}</td>
                <td className="px-6 py-3"><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </EnterpriseShell>
  ),
});
