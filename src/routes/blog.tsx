import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Crafted Virtue" },
      {
        name: "description",
        content:
          "Deep dives, playbooks, and frameworks from the frontier of executive branding, influence, and AI-assisted publishing.",
      },
    ],
  }),
  component: Blog,
});

const THEMES = [
  "Executive Branding",
  "Influence Metrics",
  "AI in Communication",
  "Strategy & Growth",
  "LinkedIn Mastery",
  "Ghostless Publishing",
  "Signal vs. Noise",
];

const FEATURED = {
  category: "Executive Branding",
  title: "Data-Driven Authority: Leveraging Analytics for Executive Branding",
  subtitle: "Harness the power of data to elevate your leadership presence.",
  teaser: "Learn how AI-driven insights and analytics can magnify your influence as an executive.",
};

const POSTS = [
  {
    title: "Crafting Your Executive Brand",
    excerpt: "A step-by-step framework to define and project your leadership identity.",
    read: "5 min read",
    tags: ["Personal Branding", "Leadership", "Strategy"],
  },
  {
    title: "Measuring Influence: Metrics That Matter",
    excerpt: "Beyond likes and shares: gauge your real-world impact with actionable metrics.",
    read: "6 min read",
    tags: ["Influence", "Metrics", "Growth"],
  },
  {
    title: "AI in Executive Communication",
    excerpt: "How smart automation personalizes your voice without losing authenticity.",
    read: "6 min read",
    tags: ["AI", "Communication", "Leadership"],
  },
  {
    title: "LinkedIn Mastery for Leaders",
    excerpt: "Tactics to make your profile and posts stand out on LinkedIn.",
    read: "5 min read",
    tags: ["LinkedIn", "Networking", "Personal Brand"],
  },
  {
    title: "Ghostless Publishing Explained",
    excerpt: "Why content that stays anchored in your voice builds more credibility.",
    read: "4 min read",
    tags: ["Publishing", "Authenticity", "Content Strategy"],
  },
  {
    title: "Signal vs. Noise: Cutting Through Clutter",
    excerpt: "Master clarity by focusing on what truly resonates with your audience.",
    read: "6 min read",
    tags: ["Clarity", "Focus", "Content Strategy"],
  },
];

function Blog() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-24">
        <SectionLabel>Insights</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Insights on Visibility, Authority, and Influence
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-soft">
          Deep dives, playbooks, and frameworks from the frontier of executive branding.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/10 bg-parchment-deep px-3.5 py-1.5 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Link to="/blog/article" className="block">
          <Card className="overflow-hidden p-0 transition-shadow hover:shadow-lift">
            <div className="grid gap-0 md:grid-cols-5">
              <div className="bg-ink p-10 text-parchment md:col-span-3">
                <p className="text-[11px] uppercase tracking-widest text-parchment/60">
                  Featured · {FEATURED.category}
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl text-balance">
                  {FEATURED.title}
                </h2>
                <p className="mt-3 text-parchment/80">{FEATURED.subtitle}</p>
              </div>
              <div className="flex flex-col justify-between p-10 md:col-span-2">
                <p className="text-ink-soft">{FEATURED.teaser}</p>
                <span className="mt-6 text-sm font-medium text-primary">Read More →</span>
              </div>
            </div>
          </Card>
        </Link>
      </section>

      {/* Article grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.title} to="/blog/article" className="block h-full">
              <Card className="flex h-full flex-col p-7 transition-shadow hover:shadow-lift">
                <p className="text-[11px] uppercase tracking-widest text-ink-soft">{p.read}</p>
                <h3 className="mt-3 font-display text-xl">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{p.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-parchment-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <SectionLabel>Newsletter</SectionLabel>
          <h2 className="mt-3 font-display text-4xl text-balance">
            Want actionable strategy in your inbox?
          </h2>
          <p className="mt-4 text-ink-soft">
            Subscribe for weekly playbooks and insights delivered directly to you.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-full border border-border bg-parchment px-5 py-3 text-sm"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-ink-soft">{brand.trustLine}</p>
        </div>
      </section>
    </MarketingShell>
  );
}
