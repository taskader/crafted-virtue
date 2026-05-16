import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Crafted Virtue" }, { name: "description", content: "Transparent pricing for individuals, executives and enterprise teams." }] }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Operator",
    price: "$490",
    period: "/ month",
    blurb: "For founders and consultants building their public point of view.",
    features: ["1 voice profile", "8 published pieces / month", "LinkedIn, X, Newsletter", "Approval workflow", "Weekly Influence Delta brief"],
    cta: "Start free trial",
  },
  {
    name: "Executive",
    price: "$1,490",
    period: "/ month",
    featured: true,
    blurb: "For sitting executives whose presence shapes deals, hiring, and category.",
    features: ["1 voice profile", "20 published pieces / month", "All channels", "Compliance review", "Media generation", "Founder Control Center"],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "Activate 10–500 voices under brand rules, with SSO and audit logs.",
    features: ["Unlimited voices", "Brand rules engine", "SAML SSO + audit logs", "Dedicated success partner", "Quarterly review"],
    cta: "Talk to sales",
  },
];

function Pricing() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">Priced like the senior craft it replaces — not like another tool.</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">All plans include your personal Crafted Virtue agent and the full specialist team. No per-seat surprises.</p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        {TIERS.map((t) => (
          <Card key={t.name} className={`p-8 ${t.featured ? "bg-ink text-parchment" : ""}`}>
            <p className={`text-xs uppercase tracking-widest ${t.featured ? "text-parchment/70" : "text-ink-soft"}`}>{t.name}</p>
            <p className="mt-4 font-display text-5xl">{t.price}<span className={`ml-1 text-base ${t.featured ? "text-parchment/70" : "text-ink-soft"}`}>{t.period}</span></p>
            <p className={`mt-3 text-sm ${t.featured ? "text-parchment/80" : "text-ink-soft"}`}>{t.blurb}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className={`mt-0.5 h-4 w-4 ${t.featured ? "text-brass" : "text-primary"}`} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to={t.name === "Enterprise" ? "/enterprise" : "/signup"} className={`mt-8 inline-block w-full rounded-full px-4 py-3 text-center text-sm font-medium ${t.featured ? "bg-parchment text-ink" : "bg-ink text-parchment"}`}>
              {t.cta}
            </Link>
          </Card>
        ))}
      </section>
    </MarketingShell>
  );
}
