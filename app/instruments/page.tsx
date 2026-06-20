import { PageWrapper, SectionHeader, InfoBox, WinRateBar } from "@/components/ui/index";
import { InstrumentBarChart } from "@/components/charts/index";
import { INSTRUMENTS } from "@/data/trading-data";

export default function InstrumentsPage() {
  const chartData = INSTRUMENTS.map((i) => ({ name: i.name, loss: i.grossLoss, charges: i.charges }));
  return (
    <PageWrapper>
      <SectionHeader index="05 — Instrument Analysis" title="Loss by Instrument — Upstox" />
      <InfoBox variant="amber">Upstox data only. Delta Exchange crypto instruments shown separately below.</InfoBox>

      <div className="border border-default mb-8 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              {["Instrument","Trades","Win Rate","Gross Loss","Charges","Net Loss","Best Win","Worst Loss"].map((h,i) => (
                <th key={h} className={`px-3 py-2.5 text-muted font-normal tracking-wider text-[9px] uppercase ${i===0 ? "text-left" : "text-right"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INSTRUMENTS.map((ins) => (
              <tr key={ins.name} className="border-b border-default/40 hover:bg-muted/20">
                <td className="px-3 py-2.5 font-bold">{ins.name}</td>
                <td className="px-3 py-2.5 text-right">{ins.trades}</td>
                <td className="px-3 py-2.5 text-right"><WinRateBar rate={ins.winRate} /></td>
                <td className="px-3 py-2.5 text-right text-loss">₹{ins.grossLoss.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2.5 text-right text-loss">₹{ins.charges.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2.5 text-right text-loss font-bold">₹{ins.netLoss.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2.5 text-right text-gain">+₹{ins.biggestWin.toLocaleString("en-IN")}</td>
                <td className="px-3 py-2.5 text-right text-loss">₹{ins.biggestLoss.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InstrumentBarChart data={chartData} />

      <hr className="border-default my-10" />
      <h3 className="text-base font-semibold mb-4">Delta Exchange — Crypto (USD)</h3>
      <div className="border border-default overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              {["Contract","Transactions","P&L (USD)","P&L (≈INR @ ₹84)"].map((h,i) => (
                <th key={h} className={`px-3 py-2.5 text-muted font-normal tracking-wider text-[9px] uppercase ${i===0 ? "text-left" : "text-right"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-default/40"><td className="px-3 py-2.5">BTCUSD</td><td className="px-3 py-2.5 text-right">619</td><td className="px-3 py-2.5 text-right text-loss">-$304.92</td><td className="px-3 py-2.5 text-right text-loss">≈₹-25,613</td></tr>
            <tr className="border-b border-default/40"><td className="px-3 py-2.5">ETHUSD</td><td className="px-3 py-2.5 text-right">99</td><td className="px-3 py-2.5 text-right text-loss">-$82.16</td><td className="px-3 py-2.5 text-right text-loss">≈₹-6,901</td></tr>
            <tr className="border-b border-default/40"><td className="px-3 py-2.5">XRPUSD</td><td className="px-3 py-2.5 text-right">93</td><td className="px-3 py-2.5 text-right text-loss">-$54.38</td><td className="px-3 py-2.5 text-right text-loss">≈₹-4,568</td></tr>
            <tr><td className="px-3 py-2.5">SOLUSD</td><td className="px-3 py-2.5 text-right">163</td><td className="px-3 py-2.5 text-right text-loss">-$24.32</td><td className="px-3 py-2.5 text-right text-loss">≈₹-2,043</td></tr>
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
