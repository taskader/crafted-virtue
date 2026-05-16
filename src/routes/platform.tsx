import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration, IllustrationSpot, type IllustrationName } from "@/components/illustration";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Crafted Virtue" },
      {
        name: "description",
        content:
          "The complete feature ecosystem: Brand Studio, Content Engine, Truth Filter, Approval Workflow, Publishing Calendar, Analytics, Podcast Studio, Video Studio, Website Builder, Book Engine, Revenue Engine, and Partner Amplifier.",
      },
    ],
  }),
  component: Platform,
});

const FEATURES: { name: string; body: string; icon: string; illus: IllustrationName }[] = [
  { name: "Brand Studio™",                    body: "Benchmark your brand’s strength and calibrate your voice from day one. Brand Studio measures your authority baseline, content pillars, and strategic positioning so the system knows what to amplify.", icon: "BS", illus: "brandStudio" },
  { name: "Content Engine",                   body: "AI-crafted thought leadership that sounds like you because it is trained on you. Generate LinkedIn posts, X threads, newsletters, articles, and content campaigns shaped by your voice profile.", icon: "CE", illus: "contentEngine" },
  { name: "Truth Filter",                     body: "Board-level content accuracy. The Truth Filter identifies factual claims, checks sources, and adds citation chips so your content stays credible and verifiable.", icon: "TF", illus: "truthFilter" },
  { name: "Approval Workflow",                body: "Review, revise, approve, and schedule every draft from one clear workflow. Nothing publishes until the right approval is captured.", icon: "AW", illus: "solutionBoard" },
  { name: "Publishing Calendar",              body: "Plan and schedule approved posts across connected channels. Use Postiz-style social publishing connections for LinkedIn, X, Instagram, Facebook, YouTube, TikTok, Blog, and Newsletter.", icon: "PC", illus: "publishing" },
  { name: "Analytics & Growth Briefings",     body: "Sam turns performance into strategy with Brand Score, Influence Delta, content pillar performance, channel comparisons, and weekly recommendations.", icon: "AB", illus: "analytics" },
 { name: "Signature Voice™ Podcast Studio",  body: "Turn your best insights into podcast scripts and audio-ready segments that extend your authority beyond written posts.", icon: "PV", illus: "unlockPodcast" },
 { name: "Multimedia Video Studio™",         body: "Transform articles and posts into short video concepts, scripts, and media assets for visual platforms.", icon: "VS", illus: "unlockVideo" },
 { name: "Presence Hub™ Website Builder",    body: "Package your best content, biography, and authority signals into a living personal website.", icon: "PH", illus: "unlockPresence" },
 { name: "Authority Manuscript™",            body: "Expand accumulated thought leadership into a structured book manuscript with citations, outlines, and chapter drafts.", icon: "AM", illus: "unlockManuscript" },
 { name: "Influence Revenue Engine™",        body: "Turn expertise into lead magnets, landing pages, email sequences, and funnel assets.", icon: "IR", illus: "unlockRevenue" },
 { name: "Partner Amplifier™",               body: "Surface PR, podcast, speaking, and partnership opportunities aligned to your growing authority.", icon: "PA", illus: "unlockPartner" },
];

function Platform() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionLabel>The platform</SectionLabel>
          <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
            What Crafted Virtue Unlocks
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">
            It’s not a toolset. It’s an ecosystem built around your voice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/solutions"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-parchment shadow-soft"
            >
              Explore Platform
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
            >
              {brand.primaryCTA}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <Illustration name="contentEngine" ratio="3/2" priority />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.name} className="overflow-hidden p-0">
              <IllustrationSpot name={f.illus} className="aspect-[3/2] rounded-none border-b border-border/60" />
              <div className="p-7">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink font-display text-sm text-parchment">
                  {f.icon}
                </div>
                <h2 className="mt-5 font-display text-xl">{f.name}</h2>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Operating Model */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <SectionLabel>The operating model</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            Built like a personal brand operating system.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Crafted Virtue combines a personal agent, specialist AI skills, approval workflows, social publishing
            rails, and analytics feedback loops into one calm executive workspace.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {[
              "Personal agent",
              "Specialist agents",
              "Approval workflows",
              "Publishing rails",
              "Analytics loops",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-ink/10 bg-parchment px-4 py-2 text-sm text-ink"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <Card className="p-10 text-center">
          <h2 className="font-display text-4xl text-balance">
            See everything that fits your voice in one place.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment shadow-soft"
            >
              {brand.secondaryCTA}
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              {brand.primaryCTA}
            </Link>
          </div>
          <p className="mt-5 text-xs text-ink-soft">{brand.trustLine}</p>
        </Card>
      </section>
    </MarketingShell>
  );
}
