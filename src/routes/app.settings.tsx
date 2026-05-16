import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionLabel } from "@/components/ui-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Crafted Virtue" }] }),
  component: Settings,
});

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "approval", label: "Approval Preferences" },
  { id: "publishing", label: "Publishing Preferences" },
  { id: "security", label: "Security" },
  { id: "team", label: "Team / Organization" },
  { id: "data", label: "Data & Privacy" },
];

const APPROVAL_MODES = [
  { id: "every", label: "Review every draft", desc: "Nothing publishes without your direct approval." },
  { id: "weekly", label: "Weekly campaign approval", desc: "Approve a week of content in one sitting." },
  { id: "auto", label: "Evergreen autopilot only", desc: "Pre-approved evergreen pieces publish on cadence." },
  { id: "enterprise", label: "Enterprise approval workflow", desc: "Multi-stakeholder review with audit trail." },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WINDOWS = ["6–9 AM", "9–12 PM", "12–3 PM", "3–6 PM", "6–9 PM"];
const PLATFORMS = ["LinkedIn", "X", "Newsletter", "Blog", "Instagram", "YouTube"];
const TYPES = ["Long-form post", "Thread", "Carousel", "Newsletter", "Blog essay", "Short video"];

function Settings() {
  const [active, setActive] = useState("profile");
  const [approval, setApproval] = useState("every");
  const [days, setDays] = useState<string[]>(["Tue", "Thu"]);
  const [window, setWindow] = useState("9–12 PM");
  const [platforms, setPlatforms] = useState<string[]>(["LinkedIn", "Newsletter"]);
  const [types, setTypes] = useState<string[]>(["Long-form post", "Newsletter"]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <SectionLabel>Settings</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Settings</h1>
        <p className="mt-2 text-ink-soft">Your preferences define the guardrails your agent follows.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit p-3">
          <ul className="space-y-0.5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    active === s.id ? "bg-ink text-parchment" : "text-ink hover:bg-parchment-deep"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          {active === "profile" && (
            <Card className="p-6">
              <SectionLabel>Profile</SectionLabel>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["First name", "Anya"],
                  ["Last name", "Reyes"],
                  ["Email", "anya@example.com"],
                  ["Title", "Chief Scientific Officer"],
                  ["Company", "Helios Bio"],
                  ["Timezone", "America / New York"],
                ].map(([l, v]) => (
                  <label key={l} className="text-sm">
                    <span className="text-xs uppercase tracking-wide text-ink-soft">{l}</span>
                    <input
                      defaultValue={v}
                      className="mt-1 w-full rounded-lg border border-border bg-parchment-deep px-3 py-2 outline-none focus:border-ink"
                    />
                  </label>
                ))}
              </div>
            </Card>
          )}

          {active === "notifications" && (
            <Card className="p-6">
              <SectionLabel>Notifications</SectionLabel>
              <div className="mt-5 space-y-3">
                {[
                  "Email me when content is awaiting approval",
                  "Email me weekly growth briefings",
                  "Email me when publishing fails",
                  "Send a daily digest at 8:00 AM",
                ].map((n, i) => (
                  <label key={n} className="flex items-center justify-between rounded-xl border border-border/60 bg-parchment-deep p-4 text-sm">
                    <span>{n}</span>
                    <input type="checkbox" defaultChecked={i < 3} className="h-4 w-4 accent-[var(--ink)]" />
                  </label>
                ))}
              </div>
            </Card>
          )}

          {active === "approval" && (
            <Card className="p-6">
              <SectionLabel>Approval preferences</SectionLabel>
              <p className="mt-2 text-sm text-ink-soft">Choose how much of your content you want to review.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {APPROVAL_MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setApproval(m.id)}
                    className={`rounded-xl border p-4 text-left ${
                      approval === m.id ? "border-ink bg-parchment-deep" : "border-border/60 hover:border-ink/60"
                    }`}
                  >
                    <p className="font-medium">{m.label}</p>
                    <p className="mt-1 text-xs text-ink-soft">{m.desc}</p>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {active === "publishing" && (
            <Card className="p-6">
              <SectionLabel>Publishing preferences</SectionLabel>

              <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">Preferred days</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggle(days, d, setDays)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      days.includes(d) ? "border-ink bg-ink text-parchment" : "border-border text-ink-soft"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">Preferred time window</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {WINDOWS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setWindow(w)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      window === w ? "border-ink bg-ink text-parchment" : "border-border text-ink-soft"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">Default platforms</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => toggle(platforms, p, setPlatforms)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      platforms.includes(p) ? "border-ink bg-ink text-parchment" : "border-border text-ink-soft"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">Default content types</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggle(types, t, setTypes)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      types.includes(t) ? "border-ink bg-ink text-parchment" : "border-border text-ink-soft"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {active === "security" && (
            <Card className="p-6">
              <SectionLabel>Security</SectionLabel>
              <div className="mt-5 space-y-3">
                {[
                  ["Two-factor authentication", "Required for publishing actions"],
                  ["Active sessions", "2 devices"],
                  ["Recovery email", "anya.b@example.com"],
                  ["Password", "Last changed 42 days ago"],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between rounded-xl border border-border/60 bg-parchment-deep p-4">
                    <div>
                      <p className="text-sm font-medium">{l}</p>
                      <p className="text-xs text-ink-soft">{v}</p>
                    </div>
                    <button className="rounded-full border border-border px-3 py-1 text-xs">Manage</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {active === "team" && (
            <Card className="p-6">
              <SectionLabel>Team / Organization</SectionLabel>
              <p className="mt-2 text-sm text-ink-soft">Invite collaborators and approvers.</p>
              <div className="mt-5 space-y-2">
                {[
                  { n: "Anya Reyes", r: "Owner" },
                  { n: "Marcus Lim", r: "Brand reviewer" },
                  { n: "Priya Shah", r: "Compliance" },
                ].map((m) => (
                  <div key={m.n} className="flex items-center justify-between rounded-xl border border-border/60 bg-parchment-deep p-3">
                    <p className="text-sm">{m.n}</p>
                    <span className="text-xs text-ink-soft">{m.r}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 rounded-full bg-ink px-4 py-2 text-xs text-parchment">Invite teammate</button>
            </Card>
          )}

          {active === "data" && (
            <Card className="p-6">
              <SectionLabel>Data & privacy</SectionLabel>
              <p className="mt-2 text-sm text-ink-soft">Your writing samples, edits, and approvals power your voice model. You own it.</p>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-xl border border-border/60 bg-parchment-deep p-4 text-left text-sm">
                  Download your data
                </button>
                <button className="w-full rounded-xl border border-border/60 bg-parchment-deep p-4 text-left text-sm">
                  Export voice model
                </button>
                <button className="w-full rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-left text-sm text-destructive">
                  Delete account and all data
                </button>
              </div>
            </Card>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => toast.success("Preferences saved.")}
              className="rounded-full bg-ink px-5 py-2 text-xs font-medium text-parchment"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
