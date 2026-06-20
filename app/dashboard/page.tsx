"use client";
import { PageWrapper, MetricCard, MetricGrid, SectionHeader, InfoBox } from "@/components/ui/index";
import { AnnualBarChart, PlatformPieChart } from "@/components/charts/index";


export default function DashboardPage() {
  const platformPieData = [
    { name: "Upstox ₹2,25,245", value: 225244.98, color: "#c0392b" },
    { name: "Paytm ₹20,523", value: 20522.55, color: "rgba(192,57,43,0.6)" },
    { name: "Delta ≈₹39,125", value: 39125.28, color: "rgba(192,57,43,0.3)" },
  ];
  const annualData = [
    { name: "FY2023-24", loss: 35377.89, charges: 6883.92 },
    { name: "FY2024-25", loss: 157462.71, charges: 38524.56 },
    { name: "FY2025-26 YTD", loss: 11505.93, charges: 2638.84 },
  ];
  return (
    <PageWrapper>
      <SectionHeader index="03 — Master Dashboard" title="Lifetime Financial Summary" />
      <InfoBox variant="amber">Upstox figures are exact (verified from Excel). Paytm Money from screenshot (derived). Delta Exchange in USD converted at ~₹84 (approximate ±5%). Kotak/other brokers: not included.</InfoBox>
      <MetricGrid cols={4}>
        <MetricCard label="Lifetime Net Loss" value="₹2,84,893" sub="All 3 known platforms" variant="loss" size="lg" badge="DERIVED" />
        <MetricCard label="Gross Market Loss" value="₹2,29,273" sub="Trading P&L before charges" variant="loss" />
        <MetricCard label="Total Charges Paid" value="₹87,034" sub="All fees, STT, GST, brokerage" variant="loss" />
        <MetricCard label="Total Instruments (Upstox)" value="1,271" sub="Across all 3 FY years" variant="neutral" />
      </MetricGrid>
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">Net Loss by Platform</h3>
      <MetricGrid cols={3}>
        <MetricCard label="Upstox" value="₹2,25,245" sub="79.1% of total" variant="loss" badge="VERIFIED" />
        <MetricCard label="Paytm Money" value="₹20,523" sub="7.2% of total" variant="loss" badge="DERIVED" />
        <MetricCard label="Delta Exchange" value="≈₹39,125" sub="13.7% of total" variant="loss" badge="DERIVED" />
      </MetricGrid>
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">Charges Breakdown</h3>
      <MetricGrid cols={4}>
        <MetricCard label="Exchange / Misc (Upstox)" value="₹26,161" sub="Verified" variant="loss" />
        <MetricCard label="STT / CTT (Upstox)" value="₹20,898" sub="Verified" variant="loss" />
        <MetricCard label="Charges (Paytm Money)" value="₹6,732" sub="Derived from screenshot" variant="loss" />
        <MetricCard label="Trading Fees (Delta)" value="≈₹26,755" sub="$318.51 × ₹84" variant="loss" />
        <MetricCard label="GST (Delta)" value="≈₹4,266" sub="$50.78 × ₹84" variant="loss" />
        <MetricCard label="Liquidation Fees (Delta)" value="≈₹1,208" sub="$14.38 × ₹84" variant="loss" />
        <MetricCard label="Brokerage (Upstox)" value="₹766" sub="Verified" variant="loss" />
        <MetricCard label="GST (Upstox)" value="₹222" sub="Verified" variant="loss" />
      </MetricGrid>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PlatformPieChart data={platformPieData} />
        <AnnualBarChart data={annualData} />
      </div>
    </PageWrapper>
  );
}
