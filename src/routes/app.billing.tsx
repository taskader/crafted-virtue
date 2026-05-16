import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionLabel } from "@/components/ui-bits";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Billing — Crafted Virtue" }] }),
  component: Billing,
});

const INVOICES = [
  { id: "INV-0042", date: "Mar 1, 2025", amount: "$1,490.00", status: "Paid" },
  { id: "INV-0041", date: "Feb 1, 2025", amount: "$1,490.00", status: "Paid" },
  { id: "INV-0040", date: "Jan 1, 2025", amount: "$1,490.00", status: "Paid" },
];

function Billing() {
  return (
    <div className="space-y-8">
      <header>
        <SectionLabel>Billing</SectionLabel>
        <h1 className="mt-2 font-display text-4xl">Plan &amp; invoices.</h1>
      </header>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <SectionLabel>Current plan</SectionLabel>
          <p className="mt-3 font-display text-2xl">Executive</p>
          <p className="mt-1 text-sm text-ink-soft">$1,490 per month · Renews April 1, 2025</p>
          <div className="mt-5 flex gap-2">
            <button className="rounded-full bg-ink px-4 py-2 text-xs text-parchment">Manage plan</button>
            <button className="rounded-full border border-border px-4 py-2 text-xs">Update payment method</button>
          </div>
        </Card>
        <Card className="p-6">
          <SectionLabel>This month</SectionLabel>
          <p className="mt-3 font-display text-3xl">14 / 20</p>
          <p className="mt-1 text-xs text-ink-soft">Pieces published this cycle</p>
        </Card>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-parchment-deep text-left text-xs uppercase tracking-widest text-ink-soft">
            <tr><th className="px-6 py-3">Invoice</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Amount</th><th className="px-6 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {INVOICES.map((i) => (
              <tr key={i.id}><td className="px-6 py-3 font-medium">{i.id}</td><td className="px-6 py-3 text-ink-soft">{i.date}</td><td className="px-6 py-3">{i.amount}</td><td className="px-6 py-3"><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs">{i.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
