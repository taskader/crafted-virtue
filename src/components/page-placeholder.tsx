// Reusable placeholder for Crafted Virtue pages not yet built out.
import { Card, SectionLabel } from "@/components/ui-bits";
import { brand } from "@/data/craftedVirtueData";

export type PlaceholderCard = {
  title: string;
  body: string;
  meta?: string;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  cards,
  trustLine = brand.trustLine,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: PlaceholderCard[];
  trustLine?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className={`mt-2 font-display text-4xl ${isDark ? "text-parchment" : ""}`}>{title}</h1>
        <p className={`mt-2 max-w-3xl ${isDark ? "text-parchment/70" : "text-ink-soft"}`}>{description}</p>
      </header>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          isDark ? (
            <div key={c.title} className="rounded-2xl border border-parchment/15 bg-parchment/5 p-6">
              {c.meta && <p className="text-[11px] uppercase tracking-widest text-parchment/60">{c.meta}</p>}
              <h3 className="mt-2 font-display text-xl text-parchment">{c.title}</h3>
              <p className="mt-2 text-sm text-parchment/70">{c.body}</p>
            </div>
          ) : (
            <Card key={c.title} className="p-6">
              {c.meta && <SectionLabel>{c.meta}</SectionLabel>}
              <h3 className="mt-2 font-display text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{c.body}</p>
            </Card>
          )
        ))}
      </div>
      <p className={`text-xs ${isDark ? "text-parchment/60" : "text-ink-soft"}`}>{trustLine}</p>
    </div>
  );
}
