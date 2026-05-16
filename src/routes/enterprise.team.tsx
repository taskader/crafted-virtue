import { createFileRoute } from "@tanstack/react-router";
import { EnterpriseShell } from "@/components/enterprise-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/enterprise/team")({
  head: () => ({ meta: [{ title: "Team — Enterprise" }] }),
  component: TeamPage,
});

const ROLES = ["Executive", "Brand Manager", "Legal Reviewer", "Enterprise Admin", "Viewer"] as const;

const TEAM = [
  { name: "Alicia Morgan", title: "CEO", role: "Executive", status: "active", score: 81, pending: 2, last: "12m ago" },
  { name: "David Chen", title: "CMO", role: "Enterprise Admin", status: "active", score: 78, pending: 3, last: "now" },
  { name: "Maya Patel", title: "Partner", role: "Executive", status: "active", score: 74, pending: 1, last: "1h ago" },
  { name: "Jon Ellis", title: "CFO", role: "Executive", status: "active", score: 69, pending: 4, last: "2d ago" },
  { name: "Rina Okafor", title: "CTO", role: "Executive", status: "active", score: 79, pending: 2, last: "3h ago" },
  { name: "Priya Shah", title: "Head of Brand", role: "Brand Manager", status: "active", score: 0, pending: 0, last: "20m ago" },
  { name: "Marcus Lim", title: "General Counsel", role: "Legal Reviewer", status: "active", score: 0, pending: 0, last: "5h ago" },
  { name: "Elena Reyes", title: "Comms Lead", role: "Viewer", status: "invited", score: 0, pending: 0, last: "—" },
];

function TeamPage() {
  return (
    <EnterpriseShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <SectionLabel>Team</SectionLabel>
          <h1 className="mt-2 font-display text-4xl">Northstar Ventures team</h1>
          <p className="mt-2 text-ink-soft">5 executive seats · Admin, brand, and legal reviewers included.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success("Role assignment dialog opened.")}
            className="rounded-full border border-border px-4 py-2 text-xs"
          >
            Assign Role
          </button>
          <button
            onClick={() => toast.success("Executive invitation sent.")}
            className="rounded-full bg-ink px-4 py-2 text-xs text-parchment"
          >
            Invite Executive
          </button>
        </div>
      </header>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
              <tr className="border-b border-border/60">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Brand Score</th>
                <th className="px-5 py-3 font-medium">Approvals pending</th>
                <th className="px-5 py-3 font-medium">Last active</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {TEAM.map((m) => (
                <tr key={m.name}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs text-parchment">
                        {m.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <span className="font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full border border-border bg-parchment-deep px-2.5 py-0.5 text-[11px]">{m.role}</span>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{m.title}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        m.status === "active" ? "bg-success/15 text-ink" : "bg-warning/20 text-ink"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">{m.score > 0 ? m.score : "—"}</td>
                  <td className="px-5 py-3">{m.pending > 0 ? m.pending : "—"}</td>
                  <td className="px-5 py-3 text-ink-soft">{m.last}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="rounded-full border border-border px-3 py-1 text-xs">View profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <SectionLabel>Available roles</SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <span key={r} className="rounded-full border border-border bg-parchment-deep px-3 py-1.5 text-xs">
              {r}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-soft">
          Additional executive seats are billed at $250 / seat / month.
        </p>
      </Card>
    </EnterpriseShell>
  );
}
