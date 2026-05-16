import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { BLOG_POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Journal — Crafted Virtue" }, { name: "description", content: "Field notes on quiet authority, executive voice, and the craft of being read." }] }),
  component: Blog,
});

function Blog() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Journal</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">Field notes on quiet authority.</h1>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2">
        {BLOG_POSTS.map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}>
            <Card className="h-full p-8 transition-shadow hover:shadow-lift">
              <p className="text-xs uppercase tracking-widest text-ink-soft">{p.date} · {p.read}</p>
              <h2 className="mt-3 font-display text-3xl">{p.title}</h2>
              <p className="mt-3 text-ink-soft">{p.excerpt}</p>
              <p className="mt-6 text-xs text-ink-soft">By {p.author}</p>
            </Card>
          </Link>
        ))}
      </section>
    </MarketingShell>
  );
}
