import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import {
  LayoutDashboard, Users, Bot, CheckCircle2, Workflow, DollarSign,
  LifeBuoy, Map as MapIcon, AlertTriangle,
} from "lucide-react";

const NAV = [
  { to: "/control-center", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/control-center/users", label: "Users", icon: Users },
  { to: "/control-center/agents", label: "Agents", icon: Bot },
  { to: "/control-center/approvals", label: "Approvals", icon: CheckCircle2 },
  { to: "/control-center/workflows", label: "Workflows", icon: Workflow },
  { to: "/control-center/revenue", label: "Revenue", icon: DollarSign },
  { to: "/control-center/support", label: "Support", icon: LifeBuoy },
  { to: "/control-center/roadmap", label: "Roadmap", icon: MapIcon },
  { to: "/control-center/incidents", label: "Incidents", icon: AlertTriangle },
] as const;

export function FounderShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-ink text-parchment">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-parchment/10 lg:flex">
        <div className="px-6 py-5">
          <Logo className="[&_span:last-child]:text-parchment [&_span:first-child]:bg-parchment [&_span:first-child]:text-ink" />
          <p className="mt-2 text-[10px] uppercase tracking-widest text-parchment/60">Founder Control Center</p>
        </div>
        <nav className="flex-1 space-y-0.5 px-3">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-parchment text-ink" : "text-parchment/70 hover:bg-parchment/10 hover:text-parchment"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-parchment/10 p-4">
          <Link to="/app/dashboard" className="text-xs text-parchment/70 hover:text-parchment">← Back to app</Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-parchment/10 bg-ink/85 px-6 backdrop-blur lg:hidden">
          <Logo className="[&_span:last-child]:text-parchment [&_span:first-child]:bg-parchment [&_span:first-child]:text-ink" />
          <Link to="/app/dashboard" className="text-xs text-parchment/70">Back to app</Link>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-parchment/10 px-4 py-2 lg:hidden">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={`rounded-full px-3 py-1 text-xs whitespace-nowrap ${active ? "bg-parchment text-ink" : "text-parchment/70"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
