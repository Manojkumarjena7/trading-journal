import { PageWrapper, SectionHeader, Badge, InfoBox } from "@/components/ui/index";

function PlatformCard({ name, badge, period, net, stats, note }: {
  name: string; badge: "VERIFIED" | "DERIVED"; period: string; net: string;
  stats: { label: string; value: string; loss?: boolean }[]; note?: React.ReactNode;
}) {
  return (
    <div className="border border-default mb-5 overflow-hidden">
      <div className="bg-muted/30 px-5 py-3.5 flex justify-between items-center flex-wrap gap-3 border-b border-default">
        <div>
          <div className="font-mono font-bold text-base flex items-center gap-2">{name} <Badge level={badge} /></div>
          <div className="text-[10px] text-muted mt-0.5">{period}</div>
        </div>
        <div className="font-mono font-bold text-xl text-loss">{net}</div>
      </div>
      <div className="p-5">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <span className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-0.5">{s.label}</span>
              <span className={`font-mono text-sm font-semibold ${s.loss ? "text-loss" : ""}`}>{s.value}</span>
            </div>
          ))}
        </div>
        {note}
      </div>
    </div>
  );
}

export default function PlatformsPage() {
  return (
    <PageWrapper>
      <SectionHeader index="04 — Platform Analysis" title="Loss by Platform" />

      <PlatformCard name="UPSTOX" badge="VERIFIED" period="Apr 2023 – Mar 2026 · Indian Index Options + Equity · Client XU6K2" net="₹-2,25,245"
        stats={[
          { label: "Gross P&L", value: "₹-2,04,347", loss: true },
          { label: "Charges", value: "₹48,047", loss: true },
          { label: "Net P&L", value: "₹-2,25,245", loss: true },
          { label: "Win Rate", value: "31.2%", loss: true },
          { label: "Instruments", value: "1,271" },
          { label: "Options Turnover", value: "₹14.2L" },
          { label: "Best Trade", value: "+₹4,564" },
          { label: "Worst Trade", value: "-₹14,620", loss: true },
        ]}
        note={<div className="mt-4 font-mono text-[11px] text-muted">FY2023-24: -₹37,739 · FY2024-25: -₹1,74,885 · FY2025-26 YTD: -₹12,621</div>}
      />

      <PlatformCard name="PAYTM MONEY" badge="DERIVED" period="19 Jul 2022 – 23 Oct 2025 · F&O (Index Options)" net="₹-20,523"
        stats={[
          { label: "Realised P&L", value: "₹-13,791", loss: true },
          { label: "Charges & Tax", value: "₹6,732", loss: true },
          { label: "Net P&L", value: "₹-20,523", loss: true },
          { label: "Visible Trades", value: "7 of ?" },
          { label: "Period", value: "3.3 years" },
          { label: "Source", value: "Screenshot" },
        ]}
        note={
          <InfoBox variant="amber">
            Math verified: ₹13,790.51 + ₹6,732.04 = ₹20,522.55 ✓ exact. Instruments visible: FINNIFTY, BANKNIFTY, NIFTY options (Jun–Jul 2023).
          </InfoBox>
        }
      />

      <PlatformCard name="DELTA EXCHANGE" badge="DERIVED" period="13 Mar 2025 – 14 May 2025 · Crypto Perpetual Swaps (BTC, ETH, XRP, SOL)" net="≈₹-39,125"
        stats={[
          { label: "Trade P&L", value: "-$132.58", loss: true },
          { label: "Trading Fees", value: "-$318.51", loss: true },
          { label: "Liq. Fees", value: "-$14.38", loss: true },
          { label: "Funding", value: "-$0.31", loss: true },
          { label: "GST", value: "-$50.78", loss: true },
          { label: "Transactions", value: "1,001" },
          { label: "Liquidations", value: "8 forced", loss: true },
          { label: "Period", value: "62 days" },
        ]}
        note={
          <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))" }}>
            {[
              { sym: "BTCUSD", n: 619, v: "-$304.92" },
              { sym: "ETHUSD", n: 99, v: "-$82.16" },
              { sym: "XRPUSD", n: 93, v: "-$54.38" },
              { sym: "SOLUSD", n: 163, v: "-$24.32" },
            ].map((c) => (
              <div key={c.sym} className="bg-muted/30 border border-default px-3 py-2.5">
                <div className="font-mono text-[9px] text-muted">{c.sym} ({c.n} txns)</div>
                <div className="font-mono text-sm text-loss">{c.v}</div>
              </div>
            ))}
          </div>
        }
      />
    </PageWrapper>
  );
}
