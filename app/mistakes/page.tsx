import { PageWrapper, SectionHeader, InfoBox, FindingCard } from "@/components/ui/index";
import { MISTAKES } from "@/data/trading-data";

export default function MistakesPage() {
  return (
    <PageWrapper>
      <SectionHeader index="09 — Mistake Analysis" title="What Went Wrong — Evidence Only" />
      <InfoBox variant="red">Every finding cites actual numbers from your uploaded files. No generic trading advice. No assumptions.</InfoBox>
      {MISTAKES.map((m) => (
        <FindingCard key={m.id} tag={`MISTAKE 0${m.id} — ${m.tag}`} title={m.title} evidence={m.evidence} description={m.description} />
      ))}
    </PageWrapper>
  );
}
