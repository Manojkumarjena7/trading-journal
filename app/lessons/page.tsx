import { PageWrapper, SectionHeader } from "@/components/ui/index";
import { LESSONS } from "@/data/trading-data";

export default function LessonsPage() {
  return (
    <PageWrapper>
      <SectionHeader index="10 — Lessons" title="What This History Teaches" subtitle="Generated from 4 years of actual data. No theory. Every number is real." />
      <div>
        {LESSONS.map((l) => (
          <div key={l.id} className="grid mb-0 py-6 items-start border-b border-default" style={{ gridTemplateColumns: "44px 1fr", gap: 20 }}>
            <div className="font-mono font-bold text-3xl text-loss opacity-35 leading-none pt-1">{String(l.id).padStart(2, "0")}</div>
            <div>
              <h3 className="text-base font-bold mb-1.5">{l.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{l.body}</p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
