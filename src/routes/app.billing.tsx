import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel, Stat } from "@/components/ui-bits";
import { toast } from "sonner";
import { CreditCard, Check } from "lucide-react";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Billing — Crafted Virtue" }] }),
  component: Billing,
});

const PLANS = [
  {
    name: "Core",
    price: "$179",
    blurb: "For founders building their first authority engine.",
    features: ["1 voice profile", "30 drafts / month", "2 channels", "Weekly briefings"],
    current: false,
  },
  {
    name: "Pro",
    price: "$299",
    blurb: "For executives shipping a real content cadence.",
    features: ["1 voice profile", "Unlimited drafts", "5 channels", "Truth Filter included", "Priority support"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "from $1,259",
    blurb: "For teams with brand rules and compliance review.",
    features: ["Multiple voice profiles", "Brand rules engine", "Compliance review", "SSO & audit log"],
    current: false,
  },
];

const ADDONS = [
  { name: "Podcast Studio", desc: "Repurpose long-form audio into authority assets." },
  { name: "Multimedia Video Studio", desc: "Edit, caption, and brand short-form video." },
  { name: "Presence Hub", desc: "Speaker positioning and event-ready bios." },
  { name: "Authority Manuscript", desc: "Turn a year of writing into a publishable book draft." },
  { name: "Influence Revenue Engine", desc: "Convert authority into qualified inbound." },
  { name: "Partner Amplifier", desc: "Coordinated launches with vetted partners." },
];

function Billing() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <SectionLabel>Billing</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Billing</h1>
        <p className="mt-2 text-ink-soft">Manage your plan, usage, renewal, and add-ons.</p>
      </header>

      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <SectionLabel>Current plan</SectionLabel>
            <p className="mt-2 font-display text-3xl">Pro · $299/mo</p>
            <p className="mt-1 text-sm text-ink-soft">Renews April 12, 2026 · Trial active · 4 days remaining</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => toast.success("Upgrade flow opened.")}
                className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-parchment"
              >
                Upgrade Plan
              </button>
              <button
                onClick={() => toast("Payment method manager opened.")}
                className="rounded-full border border-border px-4 py-2 text-xs"
              >
                Manage Payment Method
              </button>
              <button
                onClick={() => toast("Cancellation requires confirmation in next step.")}
                className="rounded-full border border-border px-4 py-2 text-xs text-destructive"
              >
                Cancel Plan
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-parchment-deep p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-ink-soft" />
              <div>
                <p className="text-sm font-medium">Visa •••• 4242</p>
                <p className="text-xs text-ink-soft">Expires 09 / 28</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <SectionLabel>This month's usage</SectionLabel>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Drafts generated" value="48" delta="of unlimited" />
          <Stat label="Posts scheduled" value="22" />
          <Stat label="Media assets prepared" value="14" />
          <Stat label="Analytics briefings" value="3" />
        </div>
      </div>

      <div>
        <SectionLabel>Plans</SectionLabel>
        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <Card key={p.name} className={`flex flex-col p-6 ${p.current ? "border-ink ring-1 ring-ink" : ""}`}>
              <div className="flex items-start justify-between">
                <p className="font-display text-xl">{p.name}</p>
                {p.current && (
                  <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-parchment">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-2 font-display text-3xl">{p.price}<span className="text-base text-ink-soft">/mo</span></p>
              <p className="mt-2 text-sm text-ink-soft">{p.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                disabled={p.current}
                className={`mt-6 w-full rounded-full px-4 py-2 text-xs font-medium ${
                  p.current ? "border border-border text-ink-soft" : "bg-ink text-parchment"
                }`}
              >
                {p.current ? "Your plan" : `Switch to ${p.name}`}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Add-ons</SectionLabel>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ADDONS.map((a) => (
            <Card key={a.name} className="p-5">
              <p className="font-display text-lg">{a.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{a.desc}</p>
              <button
                onClick={() => toast.success(`${a.name} added to your plan.`)}
                className="mt-4 rounded-full border border-border px-4 py-2 text-xs"
              >
                Add to plan
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
