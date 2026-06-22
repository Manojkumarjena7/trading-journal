"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, BookOpen } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "⚠ Reality" },
  { href: "/audit", label: "Audit" },
  { href: "/reconciliation", label: "Reconciliation" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/platforms", label: "Platforms" },
  { href: "/instruments", label: "Instruments" },
  { href: "/top50", label: "Top 50 Losses" },
  { href: "/deposits", label: "Deposits" },
  { href: "/timeline", label: "Timeline" },
  { href: "/mistakes", label: "Mistakes" },
  { href: "/lessons", label: "Lessons" },
  { href: "/analytics", label: "Analytics" },
  { href: "/upload", label: "Upload" },
  { href: "/vault", label: "Vault" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    dark: { icon: <Sun size={13} />, next: "light" as const, label: "Light" },
    light: { icon: <BookOpen size={13} />, next: "journal" as const, label: "Journal" },
    journal: { icon: <Moon size={13} />, next: "dark" as const, label: "Dark" },
  };

  const current = themeIcons[theme];

  return (
    <nav
      className="sticky top-0 z-50 flex items-center border-b border-default bg-card/95 backdrop-blur-md hide-scrollbar overflow-x-auto"
      style={{ minHeight: 44 }}
    >
      {/* Brand */}
      <span className="font-mono text-[10px] tracking-widest text-loss uppercase px-3 whitespace-nowrap border-r border-default mr-2 py-3 flex-shrink-0">
        Trading Journal by SivamTech
      </span>

      {/* Links */}
      <div className="flex items-center flex-1 min-w-0">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-[10px] tracking-wider uppercase px-3 py-3 whitespace-nowrap flex-shrink-0 border-b-2 transition-colors duration-150 ${
                isActive
                  ? "text-loss border-loss"
                  : "text-muted border-transparent hover:text-foreground"
              }`}
              style={{ color: isActive ? "rgb(var(--loss))" : undefined }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(current.next)}
        className="font-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5 px-3 py-1.5 mx-2 flex-shrink-0 rounded border border-default text-muted hover:text-loss hover:border-loss transition-colors duration-150"
        title={`Switch to ${current.next} mode`}
      >
        {current.icon}
        {current.label}
      </button>
    </nav>
  );
}
