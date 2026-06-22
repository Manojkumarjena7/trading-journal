"use client";

import { Sun, Moon, BookOpen } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme =
    theme === "dark"
      ? "light"
      : theme === "light"
      ? "journal"
      : "dark";

  const Icon =
    theme === "dark"
      ? Sun
      : theme === "light"
      ? BookOpen
      : Moon;

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="h-9 w-9 rounded-xl border border-default bg-card flex items-center justify-center hover:scale-105 transition"
      title={`Switch to ${nextTheme}`}
    >
      <Icon size={18} />
    </button>
  );
}