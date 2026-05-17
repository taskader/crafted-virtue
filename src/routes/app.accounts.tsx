import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/app/accounts")({
  head: () => ({ meta: [{ title: "Connected accounts — Crafted Virtue" }] }),
  component: Accounts,
});

type Account = {
  id: string;
  name: string;
  handle: string;
  connected: boolean;
  lastSync: string;
  publishing: boolean;
  analytics: boolean;
  permissions: string;
};

const ACCOUNTS: Account[] = [
  { id: "linkedin", name: "LinkedIn", handle: "@e.harrow", connected: true, lastSync: "2 minutes ago", publishing: true, analytics: true, permissions: "Post, read profile, page analytics" },
  { id: "x", name: "X / Twitter", handle: "@eharrow", connected: true, lastSync: "9 minutes ago", publishing: true, analytics: true, permissions: "Tweet, read timeline, engagement metrics" },
  { id: "newsletter", name: "Newsletter", handle: "Quiet Authority", connected: true, lastSync: "1 hour ago", publishing: true, analytics: true, permissions: "Send campaigns, list metrics" },
  { id: "instagram", name: "Instagram", handle: "—", connected: false, lastSync: "—", publishing: false, analytics: false, permissions: "Post, story insights" },
  { id: "facebook", name: "Facebook", handle: "—", connected: false, lastSync: "—", publishing: false, analytics: false, permissions: "Page posts, page insights" },
  { id: "youtube", name: "YouTube", handle: "—", connected: false, lastSync: "—", publishing: false, analytics: false, permissions: "Upload, channel analytics" },
  { id: "tiktok", name: "TikTok", handle: "—", connected: false, lastSync: "—", publishing: false, analytics: false, permissions: "Upload, post analytics" },
  { id: "blog", name: "Blog", handle: "—", connected: false, lastSync: "—", publishing: false, analytics: false, permissions: "Publish posts, page analytics" },
];

function Accounts() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <SectionLabel>Channels</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Connected Accounts</h1>
        <p className="mt-2 text-ink-soft">Connect the channels where your authority should compound.</p>
        <p className="mt-2 text-xs text-ink-soft">Publishing runs through your connected channels.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ACCOUNTS.map((a) => (
          <Card key={a.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-lg">{a.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{a.handle}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                  a.connected ? "bg-success/15 text-ink" : "bg-muted text-ink-soft"
                }`}
              >
                {a.connected ? "Connected" : "Not connected"}
              </span>
            </div>

            <dl className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Last sync</dt>
                <dd className="text-ink">{a.lastSync}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Publishing</dt>
                <dd className={a.publishing ? "text-success" : "text-ink-soft"}>{a.publishing ? "Enabled" : "Disabled"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Analytics</dt>
                <dd className={a.analytics ? "text-success" : "text-ink-soft"}>{a.analytics ? "Enabled" : "Disabled"}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-lg bg-parchment-deep p-3 text-[11px] text-ink-soft">
              <p className="font-medium uppercase tracking-wide text-ink-soft/80">Permissions</p>
              <p className="mt-1 leading-relaxed">{a.permissions}</p>
            </div>

            <button
              onClick={() =>
                a.connected
                  ? toast("Opening this channel.")
                  : toast.success(`${a.name} connection flow started.`)
              }
              className={`mt-5 w-full rounded-full px-4 py-2 text-xs font-medium ${
                a.connected ? "border border-border text-ink hover:bg-parchment-deep" : "bg-ink text-parchment"
              }`}
            >
              {a.connected ? "Manage" : "Connect"}
            </button>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-parchment">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-display text-lg">Your tokens stay in your connected workspace</p>
            <p className="mt-1 max-w-2xl text-sm text-ink-soft">
              Your social tokens are never shown here. Permissions can be revoked any time from your connected publishing workspace.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
