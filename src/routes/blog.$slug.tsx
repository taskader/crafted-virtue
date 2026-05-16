import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Illustration } from "@/components/illustration";
import { BLOG_POSTS, getPost, getRelatedPosts } from "@/data/blogPosts";
import { brand } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Journal"} — Crafted Virtue` },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
    ],
  }),
  component: Post,
  notFoundComponent: () => (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">
          Back to the journal
        </Link>
      </div>
    </MarketingShell>
  ),
  errorComponent: ({ error }) => (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-ink-soft">{error.message}</p>
      </div>
    </MarketingShell>
  ),
});

function Post() {
  const { post } = Route.useLoaderData();
  const related = getRelatedPosts(post.slug, 3);

  return (
    <MarketingShell>
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-24">
        <Link
          to="/blog"
          className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink"
        >
          ← Journal
        </Link>

        <header className="mt-6 max-w-3xl">
          <SectionLabel>{post.category} · {post.read}</SectionLabel>
          <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-ink-soft text-balance">{post.excerpt}</p>
        </header>

        {/* Hero illustration */}
        <div className="mt-10">
          <Illustration
            name={post.illustration}
            ratio="16/10"
            priority
            alt={`${post.title} — article hero illustration`}
          />
        </div>

        <div className="mt-12 max-w-3xl prose prose-lg text-ink">
          <p className="text-lg leading-relaxed text-ink-soft">
            There's a quiet truth most operators discover too late: the market doesn't reward the
            loudest voice — it rewards the one it trusts to be right when the room goes silent.
            Authority isn't built in the moments you're trying. It's accumulated in the moments
            you're working, and choosing to share the work.
          </p>
          <h2 className="mt-12 font-display text-3xl">The asymmetry of being read</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            One thoughtful post a week, sustained for a year, will reliably outperform a quarter
            of frantic posting. Consistency under a consistent point of view is what trains the
            audience to expect something from you.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            The operators who treat publishing as a leadership ritual — not a marketing chore —
            are the ones whose names get spoken in rooms they aren't in.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-parchment-deep/60">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <SectionLabel>Continue reading</SectionLabel>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="block"
                >
                  <Card className="flex h-full flex-col overflow-hidden p-0 transition-shadow hover:shadow-lift">
                    <Illustration
                      name={r.illustration}
                      ratio="4/3"
                      className="rounded-none ring-0"
                      alt={`${r.title} — related article thumbnail`}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11px] uppercase tracking-widest text-ink-soft">
                        {r.read} · {r.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg">{r.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-ink-soft">{r.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Card className="p-8 text-center">
          <h3 className="font-display text-2xl text-balance">
            Start your 7-day free trial
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Build your first content plan with your personal Crafted Virtue agent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-parchment"
            >
              Start Free Trial
            </Link>
            <Link
              to="/report"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:border-ink/30"
            >
              {brand.primaryCTA}
            </Link>
          </div>
        </Card>
      </section>

      {/* Hidden cache of all post slugs for SSG hints */}
      <noscript className="hidden">
        {BLOG_POSTS.map((p) => p.slug).join(",")}
      </noscript>
    </MarketingShell>
  );
}
