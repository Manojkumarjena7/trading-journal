import { PageWrapper, SectionHeader, MetricCard, MetricGrid } from "@/components/ui/index";
import { WinLossChart, ChargesEscalationChart } from "@/components/charts/index";

export default function AnalyticsPage() {
  return (
    <PageWrapper>
      <SectionHeader index="11 — Advanced Analytics" title="Key Performance Metrics" />
      <MetricGrid cols={4}>
        <MetricCard label="Worst Single Year" value="₹1,74,885" sub="FY2024-25 · Upstox" variant="loss" />
        <MetricCard label="Worst Single Trade" value="₹-14,620" sub="BANKNIFTY 24DEC24 PE 51200" variant="loss" />
        <MetricCard label="Best Single Trade" value="+₹4,564" sub="NIFTY 03JUL25 PE 25500" variant="gain" />
        <MetricCard label="Most Traded" value="SENSEX" sub="345 trades · Net -₹65,243" variant="neutral" />
        <MetricCard label="Biggest Net Loser" value="SENSEX" sub="-₹65,243 net" variant="neutral" />
        <MetricCard label="Costliest Fee Type" value="Exchange/Misc" sub="₹26,161 (Upstox)" variant="neutral" />
        <MetricCard label="Overall Win Rate" value="31.2%" sub="396W / 875L / 1,271 total" variant="loss" />
        <MetricCard label="Break-Even Win Rate" value="47.2%" sub="Required given win/loss sizes" variant="amber" />
        <MetricCard label="Per-Trade Expectancy" value="-₹171" sub="Expected loss per trade" variant="loss" />
        <MetricCard label="Average Win" value="+₹562" sub="Per winning trade" variant="gain" />
        <MetricCard label="Average Loss" value="-₹503" sub="Per losing trade" variant="loss" />
        <MetricCard label="Delta Liquidations" value="8" sub="Forced on Delta Exchange" variant="loss" />
      </MetricGrid>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WinLossChart />
        <ChargesEscalationChart />
      </div>
    </PageWrapper>
  );
}
