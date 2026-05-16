import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { brand } from "@/data/craftedVirtueData";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Crafted Virtue" },
      {
        name: "description",
        content:
          "Core, Pro, and Enterprise plans. Start with a free 7-day trial. No credit card required.",
      },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Core",
    price: "$179",
    period: "/ month",
    blurb: "Baseline automation for a single executive starting out.",
    features: [
      "1 executive profile",
      "Voice Profile foundation",
      "Brand Score baseline",
      "Weekly content drafts",
      "Human approval workflow",
      "Core analytics",
      "Connected publishing channels",
      "7-day free trial",
    ],
    cta: "Start Free",
    to: "/signup",
    badge: null,
  },
  {
    name: "Pro",
    price: "$299",
    period: "/ month",
    blurb: "Daily multi-channel momentum, analytics, and voice intelligence for one executive.",
    features: [
      "Everything in Core",
      "Higher content volume",
      "Multi-channel content planning",
      "Advanced Brand Score",
      "Weekly Growth Briefings",
      "Voice learning from edits",
      "Content pillar analytics",
      "Media asset suggestions",
      "7-day free trial",
    ],
    cta: "Start Free",
    to: "/signup",
    badge: "Most Chosen",
  },
  {
    name: "Enterprise",
    price: "from $1,259",
    period: "/ month",
    blurb: "Scalable governance, compliance workflows, and shared intelligence for executive teams.",
    seatNote: "5 seats included. Additional seats $250 / seat / month.",
    features: [
      "Multi-executive team management",
      "Brand manager dashboard",
      "Shared approval workflows",
      "Enterprise analytics rollup",
      "Role-based permissions",
      "Audit trail",
      "Compliance archive",
      "Brand rules and governance",
      "Custom onboarding",
    ],
    cta: "Learn More",
    to: "/enterprise",
    badge: null,
  },
];

const UNLOCKS = [
  { name: "Podcast Studio", body: "Turn your best insights into podcast scripts and audio-ready segments." },
  { name: "Multimedia Video Studio", body: "Transform articles and posts into short video concepts and scripts." },
  { name: "Presence Hub Website Builder", body: "Package your best content, biography, and authority signals into a living personal website." },
  { name: "Authority Manuscript", body: "Expand accumulated thought leadership into a structured book manuscript with citations and outlines." },
  { name: "Influence Revenue Engine", body: "Turn expertise into lead magnets, landing pages, email sequences, and funnel assets." },
  { name: "Partner Amplifier", body: "Surface PR, podcast, speaking, and partnership opportunities aligned to your growing authority." },
];

const FAQS = [
  {
    q: "Will AI misrepresent me?",
    a: "No. Drafts are approval-aware, and nothing publishes until you approve it.",
  },
  {
    q: "Do I need to be a thought leader already?",
    a: "No. Crafted Virtue is built for invisible experts with real insight and inconsistent visibility.",
  },
  {
    q: "Can teams use it?",
    a: "Yes. Enterprise supports multiple executives, brand rules, approval workflows, and analytics rollups.",
  },
];

function Pricing() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Flexible Plans. Professional Results.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          Start with a free 7-day trial. No credit card required.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-ink-soft">
          Choose the plan that matches your ambition: Core to establish a baseline presence, Pro to run a
          consistent multi-channel personal brand with intelligent automation, and Enterprise for coordinated,
          compliant, multi-executive influence.
        </p>
      </section>

      {/* Tiers */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        {TIERS.map((t) => {
          const isPro = t.badge === "Most Chosen";
          return (
            <Card key={t.name} className={`relative flex flex-col p-8 ${isPro ? "bg-ink text-parchment" : ""}`}>
              {t.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-brass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink">
                  {t.badge}
                </span>
              )}
              <p className={`text-xs uppercase tracking-widest ${isPro ? "text-parchment/70" : "text-ink-soft"}`}>
                {t.name}
              </p>
              <p className="mt-4 font-display text-5xl">
                {t.price}
                <span className={`ml-1 text-base ${isPro ? "text-parchment/70" : "text-ink-soft"}`}>{t.period}</span>
              </p>
              <p className={`mt-3 text-sm ${isPro ? "text-parchment/80" : "text-ink-soft"}`}>{t.blurb}</p>
              {t.seatNote && (
                <p className="mt-2 text-xs text-ink-soft">{t.seatNote}</p>
              )}
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 ${isPro ? "text-brass" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={t.to}
                className={`mt-8 inline-block w-full rounded-full px-4 py-3 text-center text-sm font-medium ${
                  isPro ? "bg-parchment text-ink" : "bg-ink text-parchment"
                }`}
              >
                {t.cta}
              </Link>
            </Card>
          );
        })}
      </section>

      {/* Unlocks */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Authority Ascension Unlocks</SectionLabel>
            <h2 className="mt-3 font-display text-4xl text-balance">
              Scale your authority as your voice matures.
            </h2>
            <p className="mt-4 text-ink-soft">
              Unlocked as your brand voice matures and your content library grows.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {UNLOCKS.map((u) => (
              <Card key={u.name} className="p-6">
                <h3 className="font-display text-lg">{u.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{u.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="mt-3 font-display text-4xl">FAQ</h2>
        <div className="mt-8 space-y-5">
          {FAQS.map((f) => (
            <Card key={f.q} className="p-6">
              <p className="font-display text-lg">{f.q}</p>
              <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-4">
        <Card className="p-10 text-center">
          <h2 className="font-display text-3xl text-balance">Not sure which plan fits?</h2>
          <p className="mt-3 max-w-2xl mx-auto text-ink-soft">
            Run a quick Impact Analysis and get a personalized recommendation in under two minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/report"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              {brand.primaryCTA}
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              Start My Free Trial
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>
    </MarketingShell>
  );
}
