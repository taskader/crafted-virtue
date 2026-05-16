import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card, SectionLabel } from "@/components/ui-bits";
import { blogPosts } from "@/data/craftedVirtueData";

export const Route = createFileRoute("/blog/article")({
  head: () => ({
    meta: [
      { title: "The Hidden ROI of Quiet Authority — Crafted Virtue" },
      { name: "description", content: "Why measured executive voices outperform loud ones across every revenue surface that actually matters." },
    ],
  }),
  component: Article,
});

function Article() {
  const post = blogPosts[0];
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-24">
        <Link to="/blog" className="text-xs uppercase tracking-widest text-ink-soft hover:text-ink">← Journal</Link>
        <SectionLabel>{post.category}</SectionLabel>
        <h1 className="mt-3 font-display text-5xl text-balance">{post.title}</h1>
        <p className="mt-4 text-sm text-ink-soft">{post.readTime} · By Ellis Harrow · March 12, 2026</p>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink">
          <p>{post.excerpt}</p>
          <p>
            The market remembers conviction expressed clearly. It forgets volume immediately. The executives compounding the most pipeline, the most inbound, the most board-grade reputation right now are not the loudest voices on LinkedIn — they are the steadiest ones.
          </p>
          <p>
            Quiet authority is a measurable economic asset. It shortens sales cycles, it raises the ceiling on inbound talent, it pre-qualifies advisory and speaking opportunities, and it compounds across quarters in a way that paid distribution cannot.
          </p>
          <h2 className="font-display text-3xl">Three places quiet authority shows up on the P&amp;L</h2>
          <p>
            First, in pipeline: deals that arrive pre-warmed because the buyer has been reading the executive for months. Second, in retention: customers who renew because they trust the operator, not just the product. Third, in talent: hires who self-select in because the voice resonated before recruiting ever called.
          </p>
          <p>
            None of this requires going viral. It requires showing up, in voice, on schedule, for long enough that the right people start to recognize the pattern.
          </p>
        </div>

        <Card className="mt-12 p-6">
          <SectionLabel>Keep reading</SectionLabel>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {blogPosts.slice(1, 5).map((p) => (
              <li key={p.slug}>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-ink-soft">{p.category} · {p.readTime}</p>
              </li>
            ))}
          </ul>
        </Card>
      </article>
    </MarketingShell>
  );
}
