import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";

const NAV = [
  { to: "/enterprise/overview", label: "Overview" },
  { to: "/enterprise/team", label: "Team" },
  { to: "/enterprise/brand-rules", label: "Brand rules" },
  { to: "/enterprise/approvals", label: "Approvals" },
  { to: "/enterprise/compliance", label: "Compliance" },
  { to: "/enterprise/analytics", label: "Analytics" },
];

export function EnterpriseShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <header className="border-b border-border/60 bg-parchment-deep">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-parchment">Enterprise</span>
          </div>
          <Link to="/app/dashboard" className="text-xs text-ink-soft hover:text-ink">My workspace →</Link>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${active ? "bg-ink text-parchment" : "text-ink-soft hover:bg-secondary"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
