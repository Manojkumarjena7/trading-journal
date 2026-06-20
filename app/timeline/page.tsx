import { PageWrapper, SectionHeader, InfoBox } from "@/components/ui/index";
import { AnnualBarChart, CumulativeChart } from "@/components/charts/index";

function TimelineItem({ fy, amount, period, tags, note, worst, big }: {
  fy: string; amount: string; period: string; tags: string[]; note: string; worst?: boolean; big?: boolean;
}) {
  return (
    <div className="relative pl-9 mb-10">
      <div
        className={`absolute rounded-full border-2 ${worst ? "w-[18px] h-[18px] -left-[31px] top-[3px]" : "w-3.5 h-3.5 -left-[29px] top-[5px]"}`}
        style={{ borderColor: "rgb(var(--loss))", background: worst ? "rgba(var(--loss),0.2)" : "rgb(var(--background))" }}
      />
      <p className={`font-mono text-[10px] tracking-widest uppercase mb-1.5 ${worst ? "text-loss" : ""}`} style={{ color: worst ? "rgb(var(--loss))" : "rgb(var(--loss))" }}>{fy}</p>
      <div className={`font-mono font-bold leading-none mb-1 text-loss ${big ? "text-[42px]" : "text-[26px]"}`}>{amount}</div>
      <p className="text-xs text-muted mb-2.5">{period}</p>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {tags.map((t) => (
          <span key={t} className="font-mono text-[10px] bg-muted/40 border border-default px-2 py-0.5 text-muted">{t}</span>
        ))}
      </div>
      <p className="text-[13px] text-muted leading-relaxed max-w-xl">{note}</p>
    </div>
  );
}

export default function TimelinePage() {
  const annualData = [
    { name: "FY2023-24", loss: 37738.91, charges: 0 },
    { name: "FY2024-25", loss: 174885.12, charges: 0 },
    { name: "FY2025-26 YTD", loss: 12620.95, charges: 0 },
  ];
  const cumData = [
    { name: "Start", total: 0 },
    { name: "End FY23-24", total: 37738.91 },
    { name: "End FY24-25", total: 212624.03 },
    { name: "Jun 2026 YTD", total: 225244.98 },
  ];

  return (
    <PageWrapper>
      <SectionHeader index="08 — Timeline" title="My Trading Journey — Year by Year" />
      <div className="relative pl-9 mb-10" style={{ borderLeft: "1px solid rgb(var(--border))", marginLeft: 11 }}>
        <TimelineItem fy="FY 2022–23 (partial) — Paytm Money Begins" amount="Unknown amount" period="Jul 2022 – Mar 2023 · Paytm Money · F&O"
          tags={["Paytm Money", "FINNIFTY, BANKNIFTY, NIFTY", "P&L for this period unknown"]}
          note="Trading began on Paytm Money in July 2022. The screenshot covers Jul 2022 – Oct 2025 combined — breakdown by year not available from screenshot alone." />
        <TimelineItem fy="FY 2023–24 · Apr 2023 – Mar 2024" amount="₹37,739" period="Net Loss · Upstox · Derivatives only · VERIFIED"
          tags={["310 instruments", "Gross loss ₹35,378", "Charges ₹6,884", "Options turnover ₹2.58L", "Win rate ~30%"]}
          note="First full year on Upstox. Pure index options — NIFTY, BANKNIFTY, FINNIFTY. Average loss per instrument ₹122. This was the year to stop. It wasn't." />
        <TimelineItem fy="FY 2024–25 · Apr 2024 – Mar 2025 — WORST YEAR" amount="₹1,74,885" period="Net Loss · Upstox · Equity + Derivatives · VERIFIED" worst big
          tags={["907 instruments", "+193% more trades vs FY23", "+363% more losses", "Charges ₹38,525", "Options turnover ₹11L", "SENSEX + BANKEX added"]}
          note="The year everything collapsed. Volume tripled, losses quadrupled, win rate stayed flat. Worst single trade: BANKNIFTY 24DEC24 PE 51200 at -₹14,620." />
        <TimelineItem fy="Parallel: Mar–May 2025 · Delta Exchange Crypto Phase" amount="≈₹39,125" period="Delta Exchange · BTC, ETH, XRP, SOL Perpetuals · DERIVED"
          tags={["1,001 transactions in 62 days", "8 forced liquidations", "Fees 2.9× trading loss", "$699 in → $0.52 left"]}
          note="62 days of perpetual swap trading. Trading losses: $133. Fees paid: $384. The fee structure consumed the account faster than losing trades did." />
        <TimelineItem fy="FY 2025–26 · Apr 2025 – Jun 2026 (YTD)" amount="₹12,621" period="Net Loss YTD · Upstox · Equity + Derivatives · VERIFIED"
          tags={["Only 54 instruments", "Volume dropped 94%", "Charges ₹2,639", "Best trade +₹4,564"]}
          note="Volume fell sharply. Losses are much smaller. But the pattern remains — every instrument still net negative." />
      </div>

      <AnnualBarChart data={annualData} />
      <CumulativeChart data={cumData} />

      <hr className="border-default my-10" />
      <h3 className="text-base font-semibold mb-3">Monthly Loss Heatmap</h3>
      <InfoBox variant="amber">Individual monthly sell dates are unavailable in Gain/Loss reports for derivatives. This is a visual approximation distributing FY totals — not exact monthly data.</InfoBox>
      <Heatmap />
    </PageWrapper>
  );
}

function Heatmap() {
  const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
  const years = [
    { fy: "23-24", data: Array(12).fill(-3145) },
    { fy: "24-25", data: Array(12).fill(-14574) },
    { fy: "25-26", data: [-4207,-4207,-4207,0,0,0,0,0,0,0,0,0] },
  ];
  const max = 15000;
  function cellBg(v: number) {
    if (!v) return "rgb(var(--muted))";
    const r = Math.min(Math.abs(v) / max, 1);
    return `rgba(192,57,43,${0.15 + r * 0.75})`;
  }
  return (
    <div>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: "38px repeat(12, 1fr)" }}>
        <div />
        {months.map((m) => (
          <div key={m} className="font-mono text-[9px] text-muted text-center flex items-center justify-center py-1.5">{m}</div>
        ))}
        {years.map((yr) => (
          <>
            <div key={yr.fy} className="font-mono text-[9px] text-muted flex items-center">{yr.fy}</div>
            {yr.data.map((v, i) => (
              <div
                key={i}
                title={v ? `Approx ₹${Math.abs(v).toLocaleString("en-IN")}/mo (FY average)` : "No data"}
                className="font-mono text-[9px] text-center py-1.5 rounded-sm text-white"
                style={{ background: cellBg(v) }}
              >
                {v ? `₹${(Math.abs(v) / 1000).toFixed(1)}K` : ""}
              </div>
            ))}
          </>
        ))}
      </div>
      <p className="font-mono text-[9px] text-muted mt-3">⚠ FY totals divided equally across months. Individual monthly data unavailable. For exact monthly heatmap, upload monthly P&L statements.</p>
    </div>
  );
}
