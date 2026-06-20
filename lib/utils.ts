// ============================================================
// UTILITY FUNCTIONS
// ============================================================

export function formatINR(amount: number, abs = false): string {
  const value = abs ? Math.abs(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatINRDecimal(amount: number, abs = false): string {
  const value = abs ? Math.abs(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

export function formatK(n: number): string {
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (Math.abs(n) >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toFixed(0)}`;
}

export function pct(value: number, total: number): string {
  return ((value / total) * 100).toFixed(1) + "%";
}

export type ConfidenceLevel = "VERIFIED" | "DERIVED" | "ESTIMATED" | "MISSING";

export const CONFIDENCE_CONFIG: Record<
  ConfidenceLevel,
  { label: string; className: string; dotColor: string }
> = {
  VERIFIED: {
    label: "Verified",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
    dotColor: "bg-emerald-500",
  },
  DERIVED: {
    label: "Derived",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    dotColor: "bg-amber-500",
  },
  ESTIMATED: {
    label: "Estimated",
    className: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30",
    dotColor: "bg-orange-500",
  },
  MISSING: {
    label: "Missing",
    className: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
    dotColor: "bg-red-500",
  },
};

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
