import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import { Card } from "@/components/ui-bits";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Crafted Virtue" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <Link to="/signup" className="text-sm text-ink-soft hover:text-ink">Don't have an account? Start free trial →</Link>
      </header>
      <main className="mx-auto grid max-w-md px-6 py-16">
        <Card className="p-8">
          <h1 className="font-display text-3xl">Welcome back.</h1>
          <p className="mt-2 text-sm text-ink-soft">Sign in to your operating system.</p>
          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/dashboard" }); }}
          >
            <label className="block">
              <span className="text-sm text-ink-soft">Email</span>
              <input defaultValue="ellis@hartwell.co" type="email" className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-sm text-ink-soft">Password</span>
              <input defaultValue="••••••••" type="password" className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </label>
            <button className="mt-2 rounded-full bg-ink py-3 text-sm font-medium text-parchment">Sign in</button>
          </form>
          <p className="mt-6 text-center text-xs text-ink-soft">Nothing publishes until you approve it.</p>
        </Card>
      </main>
    </div>
  );
}
