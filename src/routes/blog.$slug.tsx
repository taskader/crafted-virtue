import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionLabel } from "@/components/ui-bits";
import { BLOG_POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
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
        <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">Back to the journal</Link>
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
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <Link to="/blog" className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink">← Journal</Link>
        <SectionLabel>{post.date} · {post.read}</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">{post.title}</h1>
        <p className="mt-6 text-lg text-ink-soft">{post.excerpt}</p>
        <div className="mt-8 editorial-rule" />
        <div className="prose prose-lg mt-10 max-w-none text-ink">
          <p className="text-lg leading-relaxed text-ink-soft">
            There's a quiet truth most operators discover too late: the market doesn't reward the loudest voice — it rewards the one it trusts to be right when the room goes silent. Authority isn't built in the moments you're trying. It's accumulated in the moments you're working, and choosing to share the work.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            What follows is less a manifesto and more a record of what we've watched compound — across roughly two hundred executive voices we've helped publish over the last eighteen months.
          </p>
          <h2 className="mt-12 font-display text-3xl">The asymmetry of being read</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            One thoughtful post a week, sustained for a year, will reliably outperform a quarter of frantic posting. Not because frequency doesn't matter — it does — but because consistency under a consistent point of view is what trains the audience to expect something from you.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            The operators who treat publishing as a leadership ritual — not a marketing chore — are the ones whose names get spoken in rooms they aren't in.
          </p>
        </div>
        <p className="mt-12 text-sm text-ink-soft">Written by {post.author}</p>
      </article>
    </MarketingShell>
  );
}
