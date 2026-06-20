import { PageWrapper, SectionHeader, InfoBox, MetricCard, MetricGrid } from "@/components/ui/index";
import { DepositsChart } from "@/components/charts/index";

export default function DepositsPage() {
  return (
    <PageWrapper>
      <SectionHeader index="07 — Capital Flow" title="Deposits & Withdrawals" />
      <InfoBox variant="red">Only Delta Exchange has confirmed deposit/withdrawal data. Upstox and Paytm Money account statements were not uploaded — their fund flow is unknown.</InfoBox>

      <MetricGrid cols={4}>
        <MetricCard label="Delta — Total Deposited" value="$698.82" sub="≈₹58,701 · 18 deposit events" variant="neutral" />
        <MetricCard label="Delta — Total Withdrawn" value="$232.53" sub="≈₹19,533 · 9 withdrawal events" variant="neutral" />
        <MetricCard label="Delta — Remaining Balance" value="$0.52" sub="≈₹44 left in account" variant="neutral" />
        <MetricCard label="Delta — Net Capital Lost" value="$465.77" sub="≈₹39,125 total gone" variant="loss" />
      </MetricGrid>

      <DepositsChart />

      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4 mt-8">All Platforms — Deposit Summary</h3>
      <div className="border border-default mb-6 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              {["Platform","Period","Deposits","Withdrawals","Net Capital Lost","Status"].map((h,i) => (
                <th key={h} className={`px-3 py-2.5 text-muted font-normal tracking-wider text-[9px] uppercase ${i>=2 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-default/40">
              <td className="px-3 py-2.5">Upstox</td><td className="px-3 py-2.5 text-muted">Apr 2023 – Mar 2026</td>
              <td className="px-3 py-2.5 text-right text-amber">Needs Statement</td><td className="px-3 py-2.5 text-right text-amber">Needs Statement</td>
              <td className="px-3 py-2.5 text-right text-loss">₹2,25,245 (from P&L)</td><td className="px-3 py-2.5 text-right text-loss">No statement</td>
            </tr>
            <tr className="border-b border-default/40">
              <td className="px-3 py-2.5">Paytm Money</td><td className="px-3 py-2.5 text-muted">Jul 2022 – Oct 2025</td>
              <td className="px-3 py-2.5 text-right text-amber">Needs Statement</td><td className="px-3 py-2.5 text-right text-amber">Needs Statement</td>
              <td className="px-3 py-2.5 text-right text-loss">₹20,523 (from P&L)</td><td className="px-3 py-2.5 text-right text-loss">No statement</td>
            </tr>
            <tr>
              <td className="px-3 py-2.5">Delta Exchange</td><td className="px-3 py-2.5 text-muted">Mar – May 2025</td>
              <td className="px-3 py-2.5 text-right">$698.82 ≈ ₹58,701</td><td className="px-3 py-2.5 text-right">$232.53 ≈ ₹19,533</td>
              <td className="px-3 py-2.5 text-right text-loss">$465.77 ≈ ₹39,125</td><td className="px-3 py-2.5 text-right text-gain">Verified</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InfoBox variant="amber"><strong>Action required:</strong> Upload Upstox Account Statement + Paytm Money Account Statement to complete this page with exact deposit/withdrawal history.</InfoBox>
    </PageWrapper>
  );
}
