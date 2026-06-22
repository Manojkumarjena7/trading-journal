import { LIFETIME } from "@/data/trading-data";
import { Badge } from "@/components/ui/index";
import Link from "next/link";

export default function RealityPage() {
  const highlights = [
  { num: "₹2,84,893", label: "Total Net Loss", sub: "All platforms combined" },
  { num: "₹87,034", label: "Total Charges", sub: "Brokerage, GST, STT & fees" },
  { num: "1,271+", label: "Trades Recorded", sub: "Verified Upstox records" },
  { num: "3", label: "Platforms Analyzed", sub: "Upstox, Delta, Paytm" },
  { num: "4", label: "Years Tracked", sub: "2022 – 2026" },
  { num: "100%", label: "Audit Transparency", sub: "Source files verified" },
];

  return (
    <div className="min-h-[calc(100vh-44px)] flex flex-col justify-center px-5 py-16 relative overflow-hidden">
      {/* Red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(var(--loss),0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Stamp */}
        <div
          className="inline-block border font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 mb-8"
          style={{ borderColor: "rgb(var(--loss))", color: "rgb(var(--loss))" }}
        >
          ⚠ Personal Record — Read Before You Trade Again
        </div>

        {/* Sub-label */}
        <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-3">
          Total Net Financial Loss · All Platforms · Jul 2022 – Jun 2026
        </p>

        {/* Big number */}
        <div
          className="font-mono font-bold leading-none mb-2"
          style={{
            fontSize: "clamp(56px, 11vw, 124px)",
            color: "rgb(var(--loss))",
            letterSpacing: "-0.02em",
          }}
        >
          ₹2,84,893
        </div>
        <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-8">
          Confirmed + Derived · 3 Platforms · 4 Years
        </p>

        {/* Platform breakdown */}
        <div className="font-mono text-xs text-muted mb-8 space-y-1.5 leading-relaxed">
          {LIFETIME.platformBreakdown.map((p) => (
            <div key={p.platform} className="flex items-center gap-2">
              <span className="text-foreground">{p.platform}:</span>
              <span style={{ color: "rgb(var(--loss))" }}>
                {p.platform === "Delta Exchange" ? "≈" : ""}₹{p.netLoss.toLocaleString("en-IN")}
              </span>
              <Badge level={p.confidence} />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span style={{ color: "rgb(var(--loss))" }}>Kotak / Other Brokers:</span>
            <span style={{ color: "rgb(var(--amber))" }}>Not provided</span>
            <Badge level="MISSING" />
          </div>
        </div>

        {/* Equivalents grid */}
        <div
          className="grid gap-px mb-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
            background: "rgb(var(--border))",
            border: "1px solid rgb(var(--border))",
          }}
        >
          {highlights.map((eq) => (
            <div key={eq.label} className="bg-card px-5 py-4">
              <span
                className="font-mono font-bold text-3xl block mb-1"
                style={{ color: "rgb(var(--amber))" }}
              >
                {eq.num}
              </span>
              <span className="text-xs text-foreground block">{eq.label}</span>
              <span className="text-[11px] text-muted">{eq.sub}</span>
            </div>
          ))}
        </div>

        {/* Warning box */}
        <div
          className="border-l-[3px] px-5 py-4 mb-8 font-mono text-sm leading-relaxed"
          style={{
            borderColor: "rgb(var(--loss))",
            background: "rgba(var(--loss),0.06)",
            color: "rgb(var(--foreground))",
          }}
        >
          "Before placing another trade, open this page and read it completely.
          <br />
          Every number here is real. Every rupee here is gone permanently. No refunds."
        </div>

        <p className="text-sm text-muted leading-relaxed max-w-xl mb-8">
          This is not a trading dashboard. This is a permanent record of financial decisions —
          preserved so that future-you remembers exactly what happened the last time you thought
          trading would work out.
        </p>

        <Link
          href="/audit"
          className="font-mono text-[11px] tracking-widest uppercase text-muted hover:text-loss transition-colors inline-flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          View full data audit →
        </Link>
      </div>
    </div>
  );
}
