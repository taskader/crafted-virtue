import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { PlayCircle } from "lucide-react";

export const Route = createFileRoute("/app/training")({
  head: () => ({ meta: [{ title: "Training — Crafted Virtue" }] }),
  component: Training,
});

const MODULES = [
  { t: "Editing for voice", d: "How to leave the right kind of feedback so Leo gets sharper.", len: "12 min" },
  { t: "Approving with confidence", d: "Konrad's checklist before you hit publish.", len: "8 min" },
  { t: "Working with your agent", d: "Daily, weekly, and quarterly rituals that compound.", len: "18 min" },
  { t: "Reading your analytics", d: "Beatrice's plain-English guide to the dashboard.", len: "10 min" },
];

function Training() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Training</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">A quiet curriculum for getting more from your agent.</h1>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => (
          <Card key={m.t} className="p-6">
            <PlayCircle className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-display text-xl">{m.t}</h2>
            <p className="mt-2 text-sm text-ink-soft">{m.d}</p>
            <p className="mt-4 text-xs text-ink-soft">{m.len}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
