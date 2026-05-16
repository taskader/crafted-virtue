import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Send } from "lucide-react";

export const Route = createFileRoute("/app/support")({
  head: () => ({ meta: [{ title: "Support — Crafted Virtue" }] }),
  component: Support,
});

type Msg = { id: string; from: "user" | "Konrad" | "Talia"; text: string };

const SEED: Msg[] = [
  { id: "m1", from: "Konrad", text: "Tell me what you need help with. I'll route you to the right specialist." },
  { id: "m2", from: "user", text: "I need help understanding why a post was flagged." },
  { id: "m3", from: "Konrad", text: "I'll bring in Talia, our quality and brand-safety specialist." },
  { id: "m4", from: "Talia", text: "This draft was flagged because one claim needed stronger evidence. The Truth Filter added a citation requirement before approval." },
];

const CATEGORIES = [
  { label: "Product help", who: "Alex" },
  { label: "Billing", who: "Beatrice" },
  { label: "Content strategy", who: "Leo" },
  { label: "Analytics", who: "Sam" },
  { label: "Publishing issue", who: "Konrad / Talia" },
  { label: "Enterprise admin", who: "Enterprise support" },
];

function Support() {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: `u${m.length}`, from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: `k${m.length}`, from: "Konrad", text: "Got it. Routing this to the right specialist now." },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <SectionLabel>Support</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Support</h1>
        <p className="mt-2 text-ink-soft">Konrad will route you to the right specialist.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card className="flex h-[640px] flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm text-parchment">K</span>
              <div>
                <p className="font-medium">Konrad</p>
                <p className="text-xs text-ink-soft">Support concierge · online</p>
              </div>
            </div>
            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">Live</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {messages.map((m) => {
              const isUser = m.from === "user";
              return (
                <div key={m.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                  {!isUser && (
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[10px] text-parchment">
                      {m.from[0]}
                    </span>
                  )}
                  <div className={`max-w-[78%] ${isUser ? "items-end" : ""}`}>
                    {!isUser && <p className="mb-1 text-[10px] uppercase tracking-wide text-ink-soft">{m.from}</p>}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        isUser ? "bg-ink text-parchment" : "bg-parchment-deep text-ink"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border/60 p-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-parchment-deep px-4 py-1.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need help with…"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft"
              />
              <button type="submit" className="grid h-8 w-8 place-items-center rounded-full bg-ink text-parchment">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </Card>

        <Card className="h-fit p-5">
          <SectionLabel>Categories</SectionLabel>
          <ul className="mt-4 space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.label}>
                <button className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-parchment-deep px-3 py-2.5 text-left text-sm hover:border-ink">
                  <span>{c.label}</span>
                  <span className="text-xs text-ink-soft">→ {c.who}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-ink-soft">Average first reply under 4 minutes during business hours.</p>
        </Card>
      </div>
    </div>
  );
}
