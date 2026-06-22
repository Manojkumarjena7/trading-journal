"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
Home,
LayoutDashboard,
FileSearch,
BarChart3,
Clock3,
TrendingDown,
Building2,
FileSpreadsheet,
RefreshCcw,
TriangleAlert,
BookOpen,
Lock,
Upload,
Menu,
} from "lucide-react";

const LINKS = [
{ href: "/", label: "Home", icon: Home },

{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },

{ href: "/audit", label: "Audit", icon: FileSearch },
{ href: "/analytics", label: "Analytics", icon: BarChart3 },
{ href: "/timeline", label: "Timeline", icon: Clock3 },
{ href: "/top50", label: "Top 50 Losses", icon: TrendingDown },
{ href: "/platforms", label: "Platforms", icon: Building2 },
{ href: "/instruments", label: "Instruments", icon: FileSpreadsheet },
{ href: "/reconciliation", label: "Reconciliation", icon: RefreshCcw },

{ href: "/mistakes", label: "Mistakes", icon: TriangleAlert },
{ href: "/lessons", label: "Lessons", icon: BookOpen },

{ href: "/vault", label: "Vault", icon: Lock },
{ href: "/upload", label: "Upload", icon: Upload },
];

function NavItem({
href,
label,
icon: Icon,
pathname,
collapsed,
}: {
href: string;
label: string;
icon: React.ElementType;
pathname: string;
collapsed: boolean;
}) {
const isActive = pathname === href;

return (
<Link
href={href}
title={collapsed ? label : ""}
className={`flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-white/5 text-white border-l-2 border-loss"
          : "text-muted hover:bg-muted/10 hover:text-foreground"
      } ${collapsed ? "justify-center" : ""}`}
> <Icon size={18} />


  {!collapsed && (
    <span className="truncate text-sm">
      {label}
    </span>
  )}
</Link>


);
}

export function Sidebar() {
const pathname = usePathname();
const [collapsed, setCollapsed] = useState(false);

return (
<aside
className={`sticky top-0 h-screen overflow-y-auto sidebar-scroll border-r border-default bg-gradient-to-b from-card to-muted/20 transition-all duration-300 ${
        collapsed
          ? "w-16 min-w-16 p-2"
          : "w-56 min-w-56 p-3"
      }`}
>
{/* Toggle */}
<button
onClick={() => setCollapsed(!collapsed)}
className="mb-4 flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/10 transition"
> <Menu size={18} /> </button>


  {/* Collapsed Logo */}
  {collapsed && (
    <div className="flex justify-center mb-6">
      <Link href="/">
        <Image
          src="/logo-icon.png"
          alt="Trading Journal"
          width={32}
          height={32}
          className="rounded-md"
        />
      </Link>
    </div>
  )}

{/* Expanded Logo */}
{!collapsed && (
  <Link
    href="/"
    className="flex items-center gap-2 mb-4 pb-3 border-b border-default"
  >
    <Image
      src="/logo-icon.png"
      alt="Trading Journal"
      width={22}
      height={22}
      className="rounded-lg"
    />

    <div>
      <h2 className="font-semibold text-sm">
        Trading Journal
      </h2>

      <p className="text-[10px] text-muted">
        Financial Intelligence
      </p>
    </div>
  </Link>
)}
<nav className="space-y-1">
  {LINKS.map((link) => (
    <NavItem
      key={link.href}
      {...link}
      pathname={pathname}
      collapsed={collapsed}
    />
  ))}
</nav>

</aside>
);
}