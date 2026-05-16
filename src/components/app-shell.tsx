import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "./marketing-shell";
import {
  LayoutDashboard, PenLine, Library, CheckCircle2, CalendarDays, BarChart3, Mic2,
  Plug, GraduationCap, LifeBuoy, CreditCard, Settings, Sparkles, Bell, Plus,
} from "lucide-react";

const NAV = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/content/new", label: "New Content", icon: Plus, exact: true },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/content", label: "Content", icon: PenLine, exact: true },
  { to: "/app/approvals", label: "Approvals", icon: CheckCircle2 },
  { to: "/app/publishing", label: "Publishing", icon: CalendarDays },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/voice", label: "Voice profile", icon: Mic2 },
  { to: "/app/accounts", label: "Accounts", icon: Plug },
  { to: "/app/training", label: "Training", icon: GraduationCap },
];

const SECONDARY = [
  { to: "/app/support", label: "Support", icon: LifeBuoy },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, to: string, exact?: boolean) {
  return exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
}

export function AppShell() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/60 bg-sidebar lg:flex">
        <div className="px-6 py-5"><Logo /></div>
        <div className="mx-4 mb-4 rounded-xl border border-border/70 bg-parchment p-3">
          <div className="flex items-center gap-2 text-xs text-ink-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Your Crafted Virtue Agent
          </div>
          <p className="mt-1 text-xs leading-snug text-ink-soft">
            Coordinating Olivia, Leo, Sam, Talia, Vincent, Alex, Konrad &amp; Beatrice on your behalf.
          </p>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {NAV.map((n) => {
            const active = isActive(pathname, n.to, n.exact);
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
          <div className="my-3 editorial-rule" />
          {SECONDARY.map((n) => {
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
        <div className="border-t border-border/60 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm text-parchment">EH</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Ellis Harrow</p>
              <p className="truncate text-xs text-ink-soft">CEO, Hartwell Group</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border/60 bg-parchment/85 px-6 backdrop-blur">
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-ink">
              Nothing publishes until you approve it
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 text-ink-soft hover:bg-secondary hover:text-ink">
              <Bell className="h-4 w-4" />
            </button>
            <Link to="/control-center" className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-ink-soft hover:text-ink">
              Control Center
            </Link>
          </div>
        </header>
        {/* Mobile nav strip */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border/60 px-4 py-2 lg:hidden">
          {NAV.concat(SECONDARY).map((n) => {
            const active = isActive(pathname, n.to, "exact" in n ? n.exact : false);
            return (
              <Link key={n.to} to={n.to} className={`rounded-full px-3 py-1 text-xs whitespace-nowrap ${active ? "bg-ink text-parchment" : "text-ink-soft"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
