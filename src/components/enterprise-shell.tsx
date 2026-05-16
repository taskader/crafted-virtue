import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import {
  LayoutDashboard, Users, BookOpen, CheckCircle2, ShieldCheck, BarChart3,
} from "lucide-react";

const NAV = [
  { to: "/enterprise/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/enterprise/team", label: "Team", icon: Users },
  { to: "/enterprise/brand-rules", label: "Brand rules", icon: BookOpen },
  { to: "/enterprise/approvals", label: "Approvals", icon: CheckCircle2 },
  { to: "/enterprise/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/enterprise/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function EnterpriseShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/60 bg-sidebar lg:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <Logo />
        </div>
        <span className="mx-6 mb-3 inline-block w-fit rounded-full bg-ink px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-parchment">Enterprise</span>
        <nav className="flex-1 space-y-0.5 px-3">
          {NAV.map((n) => {
            const active = pathname === n.to;
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-ink text-parchment" : "text-ink-soft hover:bg-sidebar-accent hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 p-4 text-xs text-ink-soft">
          <Link to="/app/dashboard" className="hover:text-ink">← My workspace</Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/60 bg-parchment/85 px-6 backdrop-blur lg:hidden">
          <Logo />
          <Link to="/app/dashboard" className="text-xs text-ink-soft">My workspace</Link>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border/60 px-4 py-2 lg:hidden">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} className={`rounded-full px-3 py-1 text-xs whitespace-nowrap ${active ? "bg-ink text-parchment" : "text-ink-soft"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
