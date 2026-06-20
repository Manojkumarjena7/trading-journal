import { PageWrapper, SectionHeader, InfoBox, Badge, FindingCard } from "@/components/ui/index";
import { FILES_AUDIT } from "@/data/trading-data";

export default function AuditPage() {
  return (
    <PageWrapper>
      <SectionHeader index="01 — Data Audit" title="Data Validation Report" />
      <InfoBox variant="amber">Every number in this website was cross-checked against its source file. Uncertain values are flagged with their confidence level. Nothing is assumed without explicit disclosure.</InfoBox>
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">Files Analyzed (6 total)</h3>
      <div className="border border-default mb-8 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-default bg-muted/30">
              {["Filename","Type","Platform","Period","Records","Status"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left text-muted font-normal tracking-wider text-[10px] uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FILES_AUDIT.map((f, i) => (
              <tr key={i} className="border-b border-default/50 hover:bg-muted/20 transition-colors">
                <td className="px-3 py-2.5 text-foreground font-semibold">{f.name}</td>
                <td className="px-3 py-2.5 text-muted">{f.type}</td>
                <td className="px-3 py-2.5">{f.platform}</td>
                <td className="px-3 py-2.5 text-muted">{f.period}</td>
                <td className="px-3 py-2.5 text-muted">{f.records}</td>
                <td className="px-3 py-2.5"><Badge level={f.status === "EXCLUDED" ? "MISSING" : f.status.includes("derived") ? "DERIVED" : "VERIFIED"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4">Audit Findings</h3>
      <FindingCard tag="FINDING 01" title="FY2025-26 Appears in Two Files — Not Identical Duplicates"
        evidence={"File A (1): Equity + Derivatives · Net P&L = -₹12,620.95 · 54 instruments\nFile B (no suffix): Equity Only · Net P&L = -₹1,962.02 · 28 instruments · MD5: DIFFERENT"}
        description="File B is a sub-report. File A is comprehensive. Only File A used. No double-counting risk." />
      <FindingCard tag="FINDING 02 — PAYTM MONEY SCREENSHOT" title="Screenshot Contains Clearly Readable Summary Numbers — Math Verified"
        evidence={"URL: paytmmoney.com/stocks/p&l/detail · Tab: F&O\nRealised P&L: -₹13,790.51 · Charges and Tax: ₹6,732.04 · Net Realised P&L: -₹20,522.55\nVerification: -13,790.51 − 6,732.04 = -20,522.55 ✓ exact match\nDate Range: 19 Jul 2022 to 23 Oct 2025"}
        description="Summary numbers are unambiguous in the screenshot. Internal arithmetic is exact. Confidence: DERIVED. Full trade list is partially cut off." />
      <FindingCard tag="FINDING 03 — UPSTOX CROSS-CHECK" title="Upstox — Charges Verified Across Both Sheets"
        evidence={"FY2023-24: Tradewise charges ₹4,522.90 + STT ₹2,361.02 = ₹6,883.92 ✓\nFY2024-25: Tradewise charges ₹21,102.15 + STT ₹17,422.41 = ₹38,524.56 ✓\nFY2025-26: Tradewise charges ₹1,523.82 + STT ₹1,115.02 = ₹2,638.84 ✓"}
        description="No double-counting. Gross P&L, Charges, and Net P&L are three distinct lines. Confidence: VERIFIED." />
      <FindingCard tag="MISSING DATA — KOTAK" title="Kotak & Other Brokers — Zero Data Uploaded"
        evidence={"Browser tab visible in screenshot: 'Kotak N...' — Kotak Securities or Kotak Neo\nNo Kotak files uploaded. No data for any other broker uploaded."}
        description="Any trades on Kotak or other platforms are absent from this website. The ₹2,84,893 total is a confirmed floor — the true lifetime loss is likely higher." />
    </PageWrapper>
  );
}
