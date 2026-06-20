import { PageWrapper, SectionHeader, InfoBox } from "@/components/ui/index";
import { TOP_50_LOSSES } from "@/data/trading-data";

export default function Top50Page() {
  return (
    <PageWrapper>
      <SectionHeader index="06 — Biggest Losses" title="Top 50 Biggest Losing Trades — Upstox" />
      <InfoBox variant="red">These 50 trades total ₹1,17,624 — representing 52.2% of total Upstox net loss of ₹2,25,245. Source: Realized Gain-Loss sheet across all 3 Excel files.</InfoBox>
      <div className="border border-default overflow-x-auto">
        <table className="w-full text-[11px] font-mono">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              {["#","FY","Instrument","Qty","Market Loss","Charges","Net Loss"].map((h,i) => (
                <th key={h} className={`px-2.5 py-2 text-muted font-normal tracking-wider text-[9px] uppercase ${i>=3 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_50_LOSSES.map((t, i) => (
              <tr key={i} className="border-b border-default/30 hover:bg-muted/20">
                <td className="px-2.5 py-1.5 text-muted text-[10px]">{i + 1}</td>
                <td className="px-2.5 py-1.5">
                  <span className={`text-[9px] ${t.fy === "FY2024-25" ? "text-loss" : t.fy === "FY2023-24" ? "text-amber" : "text-muted"}`}>{t.fy}</span>
                </td>
                <td className="px-2.5 py-1.5 text-[10px]">{t.instrument}</td>
                <td className="px-2.5 py-1.5 text-right">{t.qty.toLocaleString("en-IN")}</td>
                <td className="px-2.5 py-1.5 text-right text-loss">₹{t.marketLoss.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                <td className="px-2.5 py-1.5 text-right text-muted">₹{t.charges.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                <td className="px-2.5 py-1.5 text-right text-loss font-bold">₹{t.netLoss.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
