import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { Play, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/app/training")({
  head: () => ({ meta: [{ title: "Training Center — Crafted Virtue" }] }),
  component: Training,
});

type Course = {
  id: string;
  title: string;
  blurb: string;
  duration: string;
  status: "completed" | "in_progress" | "not_started";
  assignedBy: "Olivia" | "Alex";
};

const COURSES: Course[] = [
  { id: "overview", title: "Platform Overview", blurb: "A tour of agents, approvals, and publishing.", duration: "6 min", status: "completed", assignedBy: "Olivia" },
  { id: "approval", title: "Content Approval Basics", blurb: "How to approve, edit, and request revisions.", duration: "8 min", status: "completed", assignedBy: "Alex" },
  { id: "voice", title: "Voice Profile Development", blurb: "Train your agent on your own writing.", duration: "12 min", status: "in_progress", assignedBy: "Olivia" },
  { id: "score", title: "Brand Score Explained", blurb: "What goes into the score and how to move it.", duration: "5 min", status: "in_progress", assignedBy: "Alex" },
  { id: "truth", title: "Truth Filter Explained", blurb: "How claims are checked before approval.", duration: "7 min", status: "not_started", assignedBy: "Alex" },
  { id: "publishing", title: "Publishing Workflow", blurb: "From approved draft to scheduled post.", duration: "9 min", status: "not_started", assignedBy: "Alex" },
  { id: "enterprise", title: "Enterprise Governance", blurb: "Multi-stakeholder approvals and brand rules.", duration: "14 min", status: "not_started", assignedBy: "Olivia" },
];

const STATUS_LABEL: Record<Course["status"], string> = {
  completed: "Completed",
  in_progress: "In progress",
  not_started: "Not started",
};

function Training() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <SectionLabel>Training</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Training Center</h1>
        <p className="mt-2 text-ink-soft">Short, focused guides assigned by your agent.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {COURSES.map((c) => (
          <Card key={c.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg leading-snug">{c.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.blurb}</p>
              </div>
              {c.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <Clock className="h-5 w-5 shrink-0 text-ink-soft" />
              )}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs text-ink-soft">
              <span>{c.duration}</span>
              <span>Assigned by {c.assignedBy}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                  c.status === "completed"
                    ? "bg-success/15 text-ink"
                    : c.status === "in_progress"
                    ? "bg-warning/20 text-ink"
                    : "bg-muted text-ink-soft"
                }`}
              >
                {STATUS_LABEL[c.status]}
              </span>
            </div>

            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-parchment">
              <Play className="h-3.5 w-3.5" /> Watch
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
