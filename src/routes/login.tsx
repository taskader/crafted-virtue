import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import { Card } from "@/components/ui-bits";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Crafted Virtue" },
      { name: "description", content: "Sign in to your Crafted Virtue authority engine." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <Link
          to="/signup"
          className="text-sm text-ink-soft transition-colors hover:text-ink"
        >
          Don't have an account? Start free trial →
        </Link>
      </header>

      <main className="mx-auto flex max-w-sm flex-col px-6 pb-20 pt-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl leading-tight text-ink">
            Welcome back to your authority engine.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Review drafts, approve campaigns, and see what your agent prepared.
          </p>
        </div>

        <Card className="p-8">
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-ink-soft">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="ellis@hartwell.co"
                  className="pl-9"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm text-ink-soft">
                  Password
                </Label>
                <Link
                  to="/"
                  hash="reset-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  defaultValue="••••••••"
                  className="pl-9"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-1 w-full rounded-full bg-ink py-3 text-sm font-medium text-parchment hover:bg-ink/90"
            >
              Sign In
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full"
              onClick={() => navigate({ to: "/app/dashboard" })}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-xs text-ink-soft">
          New to Crafted Virtue?{" "}
          <Link
            to="/signup"
            className="inline-flex items-center gap-1 font-medium text-ink hover:underline"
          >
            Start your 7-day free trial
            <ArrowRight className="h-3 w-3" />
          </Link>
        </p>
      </main>
    </div>
  );
}
