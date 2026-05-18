import { Link } from "@tanstack/react-router";
import { brand, navigation } from "@/data/craftedVirtueData";

// Marketing nav items (without auth CTAs which render as buttons on the right)
const PUBLIC_NAV = navigation.public.filter(
  (n) => n.label !== "Sign In" && n.label !== "Start Free Trial",
);

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-parchment font-display text-sm">CV</span>
      <span className="font-display text-lg tracking-tight text-ink">{brand.name}</span>
    </Link>
  );
}

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-parchment/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {PUBLIC_NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-ink-soft hover:text-ink">Sign in</Link>
          <Link
            to="/signup"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-parchment shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-parchment-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 font-display text-3xl text-balance">Let's run the numbers.</p>
          <p className="mt-3 max-w-md text-sm text-ink-soft">
            See exactly where your authority is leaking — and where it's quietly compounding — before you commit to anything.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/report" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment">
              {brand.footerCTA}
            </Link>
            <Link to="/pricing" className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30">
              See pricing
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-xs uppercase tracking-widest text-ink-soft">Platform</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/solutions" className="hover:text-ink">Solutions</Link></li>
            <li><Link to="/platform" className="hover:text-ink">Platform</Link></li>
            <li><Link to="/pricing" className="hover:text-ink">Pricing</Link></li>
            <li><Link to="/enterprise" className="hover:text-ink">Enterprise</Link></li>
            <li><Link to="/agents" className="hover:text-ink">Agent Team</Link></li>
            <li><Link to="/report" className="hover:text-ink">Authority Report</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-widest text-ink-soft">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/approach" className="hover:text-ink">Approach</Link></li>
            <li><Link to="/blog" className="hover:text-ink">Blog</Link></li>
            <li><Link to="/login" className="hover:text-ink">Sign in</Link></li>
            <li><Link to="/signup" className="hover:text-ink">Start free trial</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-widest text-ink-soft">Trust</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-ink">Terms</Link></li>
            <li><Link to="/security" className="hover:text-ink">Security</Link></li>
            <li><Link to="/ai-ethics" className="hover:text-ink">AI &amp; Ethics</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-ink-soft">
          <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span>{brand.trustLine}</span>
        </div>
      </div>
    </footer>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <MarketingHeader />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
