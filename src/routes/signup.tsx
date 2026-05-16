import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/marketing-shell";
import { Card } from "@/components/ui-bits";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Briefcase, Building2, Lock, Mail, User } from "lucide-react";
import React from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start your free trial — Crafted Virtue" },
      { name: "description", content: "Create your account and start building authority in 7 days." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = React.useState("individual");

  return (
    <div className="min-h-screen bg-parchment-deep">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <Link
          to="/login"
          className="text-sm text-ink-soft transition-colors hover:text-ink"
        >
          Already a member? Sign in →
        </Link>
      </header>

      <main className="mx-auto flex max-w-lg flex-col px-6 pb-20 pt-10">
        <div className="mb-10">
          <h1 className="font-display text-3xl leading-tight text-ink">
            Start building authority in 7 days.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Create your account, complete your voice intake, and receive your
            first authority plan.
          </p>
        </div>

        <Card className="p-8">
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/onboarding" });
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm text-ink-soft">
                  First name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Ellis"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm text-ink-soft">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Harrow"
                  className=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-ink-soft">
                Work email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ellis@hartwell.co"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-ink-soft">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm text-ink-soft">
                  Current title
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="title"
                    type="text"
                    placeholder="CEO"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm text-ink-soft">
                  Company
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Hartwell Group"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-ink-soft">Account type</Label>
              <RadioGroup
                value={accountType}
                onValueChange={setAccountType}
                className="flex gap-4"
              >
                <label
                  htmlFor="individual"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    accountType === "individual"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                >
                  <RadioGroupItem value="individual" id="individual" />
                  <span className="text-sm font-medium text-ink">
                    Individual
                  </span>
                </label>
                <label
                  htmlFor="enterprise"
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    accountType === "enterprise"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-border/80"
                  }`}
                >
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <span className="text-sm font-medium text-ink">
                    Enterprise
                  </span>
                </label>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="mt-1 w-full rounded-full bg-ink py-3 text-sm font-medium text-parchment hover:bg-ink/90"
            >
              Start Your 7-Day Free Trial
            </Button>

            <p className="text-center text-xs text-ink-soft">
              No credit card required. Nothing publishes without your approval.
            </p>
          </form>
        </Card>

        <p className="mt-8 text-center text-xs text-ink-soft">
          Already have an account?{" "}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 font-medium text-ink hover:underline"
          >
            Sign in
            <ArrowRight className="h-3 w-3" />
          </Link>
        </p>
      </main>
    </div>
  );
}
