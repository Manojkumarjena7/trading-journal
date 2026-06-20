import { PageWrapper, SectionHeader, Badge } from "@/components/ui/index";
import { FILES_AUDIT } from "@/data/trading-data";

const ICONS: Record<string,string> = { CSV: "📊", Excel: "📑", Image: "🖼️" };

export default function VaultPage() {
  return (
    <PageWrapper>
      <SectionHeader index="12 — Document Vault" title="Source Documents" subtitle="All files from the uploaded ZIP. Every number traces to one of these documents." />
      <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(265px,1fr))" }}>
        {FILES_AUDIT.map((f) => (
          <div key={f.name} className={`border border-default p-5 hover:border-loss/50 transition-colors ${f.status === "EXCLUDED" ? "opacity-60" : ""}`}>
            <div className="text-xl mb-2.5">{ICONS[f.type] ?? "📄"}</div>
            <div className="font-mono text-[11px] mb-1 break-all">{f.name}</div>
            <div className="text-[11px] text-muted leading-relaxed">
              Platform: {f.platform} · Period: {f.period}<br />
              Records: {f.records}
              {"netPnl" in f && f.netPnl !== undefined && <><br />Net P&L: ₹{f.netPnl.toLocaleString("en-IN")}</>}
            </div>
            <div className="mt-2.5">
              <Badge level={f.status === "EXCLUDED" ? "MISSING" : f.confidence} />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
