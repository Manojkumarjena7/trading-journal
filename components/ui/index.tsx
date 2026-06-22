import { CONFIDENCE_CONFIG, ConfidenceLevel } from "@/lib/utils";

// ============================================================
// BADGE
// ============================================================
export function Badge({ level }: { level: ConfidenceLevel }) {
  const cfg = CONFIDENCE_CONFIG[level];
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${cfg.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  );
}

// ============================================================
// METRIC CARD
// ============================================================
export function MetricCard({
  label,
  value,
  sub,
  variant = "neutral",
  badge,
  size = "md",
}: MetricCardProps) {
  const valueColors = {
    loss: "text-loss",
    gain: "text-gain",
    neutral: "text-foreground",
    amber: "text-amber",
  };

  const valueSizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <div className="bg-card border border-default rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium uppercase text-muted">
          {label}
        </span>

        {badge && <Badge level={badge} />}
      </div>

      <div
        className={`font-bold leading-none mb-2 ${valueColors[variant]} ${valueSizes[size]}`}
      >
        {value}
      </div>

      {sub && (
        <p className="text-sm text-muted">
          {sub}
        </p>
      )}
    </div>
  );
}

// ============================================================
// METRIC GRID
// ============================================================
export function MetricGrid({
  children,
  cols = 4,
}: {
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <div
      className="grid gap-px bg-border mb-8"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${cols <= 3 ? 220 : 180}px, 1fr))` }}
    >
      {children}
    </div>
  );
}

// ============================================================
// INFO BOX
// ============================================================
export function InfoBox({
  children,
  variant = "amber",
}: {
  children: React.ReactNode;
  variant?: "red" | "amber" | "green";
}) {
  const styles = {
    red: "bg-loss-subtle border-loss text-muted",
    amber: "border-amber-500/30 bg-amber-500/8 text-muted",
    green: "border-emerald-500/30 bg-emerald-500/8 text-muted",
  };
  return (
    <div
      className={`font-mono text-[11px] leading-relaxed p-3.5 mb-5 border rounded-sm ${styles[variant]}`}
    >
      {children}
    </div>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================
export function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      {index && (
        <p className="text-sm font-medium mb-2 text-loss">
          {index}
        </p>
      )}

      <h1
        className="text-4xl font-bold mb-2"
        style={{ color: "rgb(var(--foreground))" }}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-base text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
// ============================================================
// FINDING CARD (Mistakes / Audit)
// ============================================================
export function FindingCard({
  tag,
  title,
  evidence,
  description,
}: {
  tag: string;
  title: string;
  evidence: string;
  description: string;
}) {
  return (
    <div className="border border-default p-5 mb-3 relative group hover:border-loss/40 transition-colors">
      <div
        className="font-mono text-[9px] tracking-widest uppercase absolute top-0 left-5 -translate-y-1/2 px-2 bg-card"
        style={{ color: "rgb(var(--loss))" }}
      >
        {tag}
      </div>
      <h3 className="font-semibold text-sm mb-2.5" style={{ color: "rgb(var(--foreground))" }}>
        {title}
      </h3>
      <div className="font-mono text-[11px] leading-relaxed border-l-2 border-amber-500/50 bg-amber-500/6 px-3 py-2 mb-2.5 whitespace-pre-line" style={{ color: "rgb(var(--muted-foreground))" }}>
        {evidence}
      </div>
      <p className="text-[12px] leading-relaxed" style={{ color: "rgb(var(--muted-foreground))" }}>
        {description}
      </p>
    </div>
  );
}

// ============================================================
// PAGE WRAPPER
// ============================================================
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-4 py-6 animate-fade-in">{children}</div>
  );
}

// ============================================================
// WIN RATE BAR
// ============================================================
export function WinRateBar({ rate }: { rate: number }) {
  const color =
    rate > 40
      ? "rgb(var(--gain))"
      : rate > 30
      ? "rgb(var(--amber))"
      : "rgb(var(--loss))";
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="font-mono text-xs">{rate.toFixed(1)}%</span>
      <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${rate}%`, background: color }}
        />
      </div>
    </div>
  );
}
