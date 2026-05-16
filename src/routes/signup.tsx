import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import { Card } from "@/components/ui-bits";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Start your free trial — Crafted Virtue" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <Link to="/login" className="text-sm text-ink-soft hover:text-ink">Already a member? Sign in →</Link>
      </header>
      <main className="mx-auto grid max-w-md px-6 py-12">
        <Card className="p-8">
          <h1 className="font-display text-3xl">Start your 7-day trial.</h1>
          <p className="mt-2 text-sm text-ink-soft">No credit card. No noise. Just the work.</p>
          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/onboarding" }); }}
          >
            {[
              { l: "Full name", t: "text", p: "Ellis Harrow" },
              { l: "Work email", t: "email", p: "ellis@hartwell.co" },
              { l: "Role and company", t: "text", p: "CEO, Hartwell Group" },
              { l: "Password", t: "password", p: "" },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="text-sm text-ink-soft">{f.l}</span>
                <input type={f.t} placeholder={f.p} className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </label>
            ))}
            <button className="mt-2 rounded-full bg-ink py-3 text-sm font-medium text-parchment">Create account &amp; begin onboarding</button>
          </form>
        </Card>
      </main>
    </div>
  );
}
