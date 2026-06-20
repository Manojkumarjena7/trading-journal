import { PageWrapper, SectionHeader, InfoBox, Badge, FindingCard } from "@/components/ui/index";
import { SOURCE_OF_TRUTH } from "@/data/trading-data";

export default function ReconciliationPage() {
  return (
    <PageWrapper>
      <SectionHeader index="02 — Reconciliation" title="Platform Reconciliation Table" />
      <InfoBox variant="amber">Confidence is MEDIUM — not all platforms have original source documents. Confidence will upgrade to HIGH when Paytm Money CSV and Upstox account statements are uploaded.</InfoBox>

      <div className="border border-default mb-10 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b-2 border-default bg-muted/30">
              <th className="px-4 py-2.5 text-left text-muted font-normal tracking-wider text-[9px] uppercase">Platform</th>
              <th className="px-4 py-2.5 text-right text-muted font-normal tracking-wider text-[9px] uppercase">Gross P&L</th>
              <th className="px-4 py-2.5 text-right text-muted font-normal tracking-wider text-[9px] uppercase">Charges</th>
              <th className="px-4 py-2.5 text-right text-muted font-normal tracking-wider text-[9px] uppercase">Net Loss</th>
              <th className="px-4 py-2.5 text-right text-muted font-normal tracking-wider text-[9px] uppercase">Confidence</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5">Upstox — FY2023-24</td><td className="px-4 py-2.5 text-right text-loss">₹-35,377.89</td><td className="px-4 py-2.5 text-right text-loss">₹6,883.92</td><td className="px-4 py-2.5 text-right text-loss">₹37,738.91</td><td className="px-4 py-2.5 text-right"><Badge level="VERIFIED" /></td></tr>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5">Upstox — FY2024-25</td><td className="px-4 py-2.5 text-right text-loss">₹-1,57,462.71</td><td className="px-4 py-2.5 text-right text-loss">₹38,524.56</td><td className="px-4 py-2.5 text-right text-loss">₹1,74,885.12</td><td className="px-4 py-2.5 text-right"><Badge level="VERIFIED" /></td></tr>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5">Upstox — FY2025-26 YTD</td><td className="px-4 py-2.5 text-right text-loss">₹-11,505.93</td><td className="px-4 py-2.5 text-right text-loss">₹2,638.84</td><td className="px-4 py-2.5 text-right text-loss">₹12,620.95</td><td className="px-4 py-2.5 text-right"><Badge level="VERIFIED" /></td></tr>
            <tr className="border-b border-default/50 bg-muted/20 font-semibold"><td className="px-4 py-2.5 pl-6 text-[11px]">Upstox Subtotal</td><td className="px-4 py-2.5 text-right text-loss">₹-2,04,346.53</td><td className="px-4 py-2.5 text-right text-loss">₹48,047.32</td><td className="px-4 py-2.5 text-right text-loss">₹2,25,244.98</td><td className="px-4 py-2.5 text-right"><Badge level="VERIFIED" /></td></tr>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5">Paytm Money (Jul 2022–Oct 2025)</td><td className="px-4 py-2.5 text-right text-loss">₹-13,790.51</td><td className="px-4 py-2.5 text-right text-loss">₹6,732.04</td><td className="px-4 py-2.5 text-right text-loss">₹20,522.55</td><td className="px-4 py-2.5 text-right"><Badge level="DERIVED" /></td></tr>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5">Delta Exchange (Mar–May 2025)</td><td className="px-4 py-2.5 text-right text-loss">≈₹-11,136.33</td><td className="px-4 py-2.5 text-right text-loss">≈₹32,254.46</td><td className="px-4 py-2.5 text-right text-loss">≈₹39,125.28</td><td className="px-4 py-2.5 text-right"><Badge level="DERIVED" /></td></tr>
            <tr className="border-b border-default/50"><td className="px-4 py-2.5 text-loss">Kotak / Other Brokers</td><td className="px-4 py-2.5 text-right text-amber">Unknown</td><td className="px-4 py-2.5 text-right text-amber">Unknown</td><td className="px-4 py-2.5 text-right text-amber">Unknown</td><td className="px-4 py-2.5 text-right"><Badge level="MISSING" /></td></tr>
            <tr className="bg-muted/30 font-bold border-t-2 border-default"><td className="px-4 py-3">LIFETIME TOTAL</td><td className="px-4 py-3 text-right text-loss">≈₹-2,29,273</td><td className="px-4 py-3 text-right text-loss">≈₹87,034</td><td className="px-4 py-3 text-right text-loss text-sm">≈₹2,84,893</td><td className="px-4 py-3 text-right"><Badge level="DERIVED" /></td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4">Source of Truth — Every Number's Origin</h3>
      <div className="border border-default mb-10 overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              <th className="px-3 py-2 text-left text-muted font-mono font-normal tracking-wider text-[9px] uppercase">Number</th>
              <th className="px-3 py-2 text-left text-muted font-mono font-normal tracking-wider text-[9px] uppercase">Value</th>
              <th className="px-3 py-2 text-left text-muted font-mono font-normal tracking-wider text-[9px] uppercase">Source File</th>
              <th className="px-3 py-2 text-left text-muted font-mono font-normal tracking-wider text-[9px] uppercase">Location</th>
              <th className="px-3 py-2 text-left text-muted font-mono font-normal tracking-wider text-[9px] uppercase">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {SOURCE_OF_TRUTH.map((s, i) => (
              <tr key={i} className="border-b border-default/40 hover:bg-muted/20">
                <td className="px-3 py-2 font-mono font-semibold text-foreground">{s.number}</td>
                <td className="px-3 py-2 text-muted">{s.value}</td>
                <td className="px-3 py-2 text-muted">{s.file}</td>
                <td className="px-3 py-2 text-muted">{s.location}</td>
                <td className="px-3 py-2"><Badge level={s.confidence} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4">Missing Data — What Is NOT Included</h3>
      <FindingCard tag="MISSING 01" title="Paytm Money Full Trade List"
        evidence={"Only 7 of unknown total trades visible. Period: Jul 2022 – Oct 2025 (3+ years)."}
        description="Action required: Download Paytm Money P&L report as CSV or Excel and upload here." />
      <FindingCard tag="MISSING 02" title="Upstox Deposit & Withdrawal Statements"
        evidence={"Gain/Loss reports uploaded only. No account ledger showing fund credits and debits."}
        description="Action required: Download Upstox Account Statement and upload here." />
      <FindingCard tag="MISSING 03" title="Kotak Securities / Kotak Neo"
        evidence={"Kotak browser tab visible in screenshot. Zero data uploaded."}
        description="The ₹2,84,893 lifetime total is a confirmed floor. True total is likely higher." />
    </PageWrapper>
  );
}
