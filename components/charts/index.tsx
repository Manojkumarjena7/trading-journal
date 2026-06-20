"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { useTheme } from "@/components/layout/ThemeProvider";

// ============================================================
// THEME-AWARE COLORS
// ============================================================
function useChartColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "journal";
  return {
    grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#7e7468" : "#8a8278",
    textMain: isDark ? "#f0ebe0" : "#1a1612",
    red: isDark ? "#c0392b" : "#b03020",
    redLight: isDark ? "rgba(192,57,43,0.35)" : "rgba(176,48,32,0.25)",
    green: isDark ? "#1e8449" : "#1a6b3c",
    amber: isDark ? "#d4a017" : "#96700a",
    amberLight: isDark ? "rgba(212,160,23,0.35)" : "rgba(150,112,10,0.25)",
    bg: isDark ? "#1e1b17" : "#ffffff",
    tooltip: isDark ? "#1e1b17" : "#ffffff",
    tooltipBorder: isDark ? "#2e2a25" : "#ddd8cf",
  };
}

// ============================================================
// CHART WRAPPER
// ============================================================
export function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-default p-5 mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-4">
        {title}
      </p>
      {children}
    </div>
  );
}

// ============================================================
// CUSTOM TOOLTIP
// ============================================================
interface TooltipPayloadEntry {
  name?: string;
  value?: number;
  color?: string;
}
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const c = useChartColors();
  if (!active || !payload?.length) return null;
  return (
    <div
      className="border rounded-sm p-3 text-xs font-mono shadow-lg"
      style={{ background: c.tooltip, borderColor: c.tooltipBorder }}
    >
      {label && <p className="mb-1.5 text-muted font-semibold">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === "number" ? "₹" + Math.abs(entry.value).toLocaleString("en-IN") : entry.value}
        </p>
      ))}
    </div>
  );
}

// ============================================================
// ANNUAL BAR CHART
// ============================================================
export function AnnualBarChart({ data }: { data: { name: string; loss: number; charges: number }[] }) {
  const c = useChartColors();
  return (
    <ChartCard title="Annual Net Loss — Upstox (INR, Verified)">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="name" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace", color: c.text }} />
          <Bar dataKey="loss" name="Market Loss" fill={c.red} radius={[2, 2, 0, 0]} />
          <Bar dataKey="charges" name="Charges" fill={c.amber} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// CUMULATIVE LINE CHART
// ============================================================
export function CumulativeChart({ data }: { data: { name: string; total: number }[] }) {
  const c = useChartColors();
  return (
    <ChartCard title="Cumulative Net Loss — Upstox Running Total">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={c.red} stopOpacity={0.3} />
              <stop offset="95%" stopColor={c.red} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="name" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="total" name="Cumulative Loss" stroke={c.red} fill="url(#lossGradient)" strokeWidth={2} dot={{ fill: c.red, r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// PLATFORM PIE CHART
// ============================================================
export function PlatformPieChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const c = useChartColors();
  return (
    <ChartCard title="Net Loss by Platform">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={((value: any) => ["₹" + Number(value).toLocaleString("en-IN"), ""]) as any}
            contentStyle={{ background: c.tooltip, border: `1px solid ${c.tooltipBorder}`, fontFamily: "monospace", fontSize: 11 }}
          />
          <Legend
            wrapperStyle={{ fontSize: 10, fontFamily: "monospace", color: c.text }}
            formatter={(value) => <span style={{ color: c.text }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// INSTRUMENT HORIZONTAL BAR CHART
// ============================================================
export function InstrumentBarChart({
  data,
}: {
  data: { name: string; loss: number; charges: number }[];
}) {
  const c = useChartColors();
  return (
    <ChartCard title="Net Loss by Instrument — Upstox">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 40, left: 10, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} horizontal={false} />
          <XAxis type="number" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <YAxis type="category" dataKey="name" tick={{ fill: c.textMain, fontSize: 11, fontFamily: "monospace", fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 10, fontFamily: "monospace", color: c.text }} />
          <Bar dataKey="loss" name="Market Loss" fill={c.red} radius={[0, 2, 2, 0]} />
          <Bar dataKey="charges" name="Charges" fill={c.amber} radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// WIN/LOSS BAR CHART
// ============================================================
export function WinLossChart() {
  const c = useChartColors();
  const data = [
    { name: "Winners (396)", count: 396, avg: 562.15 },
    { name: "Losers (875)", count: 875, avg: 503.21 },
  ];
  return (
    <ChartCard title="Win vs Loss Distribution — Upstox">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="name" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: c.tooltip, border: `1px solid ${c.tooltipBorder}`, fontFamily: "monospace", fontSize: 11 }}
          />
          <Bar dataKey="count" name="Trade Count" radius={[2, 2, 0, 0]}>
            <Cell fill={c.green} />
            <Cell fill={c.red} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// CHARGES ESCALATION CHART
// ============================================================
export function ChargesEscalationChart() {
  const c = useChartColors();
  const data = [
    { name: "FY2023-24", charges: 6883.92 },
    { name: "FY2024-25", charges: 38524.56 },
    { name: "FY2025-26", charges: 2638.84 },
  ];
  return (
    <ChartCard title="Charge Escalation by Year — Upstox">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="name" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="charges" name="Charges" fill={c.amber} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ============================================================
// DEPOSITS CHART
// ============================================================
export function DepositsChart() {
  const c = useChartColors();
  const data = [
    { name: "Deposited", amount: 58700.74, fill: c.green },
    { name: "Withdrawn", amount: 19532.47, fill: c.amber },
    { name: "Remaining", amount: 43.43, fill: c.text },
  ];
  return (
    <ChartCard title="Delta Exchange — Capital Flow (USD → INR ≈₹84)">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.grid} />
          <XAxis dataKey="name" tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: c.text, fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" name="Amount" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
