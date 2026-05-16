import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/approach")({
  head: () => ({ meta: [{ title: "Our approach — Crafted Virtue" }] }),
  component: Approach,
});

const STEPS = [
  { n: "01", t: "Listen", d: "We interview you the way a great editor would. Convictions, references, and how you actually talk about the work." },
  { n: "02", t: "Model", d: "Leo turns the interviews and your writing samples into a voice model that holds up under scrutiny." },
  { n: "03", t: "Draft", d: "Olivia and Sam draft from your real perspective — pillars, angles, and references already loaded." },
  { n: "04", t: "Review", d: "Konrad runs compliance, you approve. Nothing publishes until you say so." },
  { n: "05", t: "Distribute", d: "Alex publishes into the windows your audience actually reads, across LinkedIn, X, Newsletter and beyond." },
  { n: "06", t: "Learn", d: "Beatrice translates the signal into a weekly brief. The model gets sharper. The next quarter compounds." },
];

function Approach() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-24">
        <SectionLabel>Our approach</SectionLabel>
        <h1 className="mt-4 font-display text-5xl text-balance">A six-step ritual designed to be unobtrusive.</h1>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ol className="space-y-10">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-4 md:grid-cols-[80px_1fr] md:gap-10">
              <p className="font-display text-4xl text-primary">{s.n}</p>
              <div>
                <h2 className="font-display text-2xl">{s.t}</h2>
                <p className="mt-2 text-ink-soft">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </MarketingShell>
  );
}
