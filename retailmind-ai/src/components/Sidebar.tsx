"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Boxes,
  Tag,
  TrendingUp,
  Trash2,
  Layers,
  Eye,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", path: "/inventory", icon: Boxes },
  { name: "Discounts", path: "/discounts", icon: Tag },
  { name: "Trends", path: "/trends", icon: TrendingUp },
  { name: "Waste", path: "/waste", icon: Trash2 },
  { name: "Simulation", path: "/simulation", icon: Layers },
  { name: "Placement", path: "/placement", icon: Eye },
  { name: "Comparison", path: "/comparison", icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
  className={`sticky top-0 min-h-screen h-full transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
    bg-gradient-to-b from-slate-900 to-slate-800
    text-slate-200 shadow-xl`}
>

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between p-5">
        {!collapsed && (
          <h1 className="text-xl font-bold text-blue-400 tracking-wide">
            RetailMind
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-700 transition"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* ===== NAV ===== */}
      <nav className="mt-6 space-y-1 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.path;

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-slate-700 hover:text-white"
                }`}
            >
              <Icon
                size={20}
                className={`${
                  active ? "text-white" : "text-slate-400 group-hover:text-white"
                }`}
              />

              {!collapsed && (
                <span className="text-sm font-medium">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ===== FOOTER ===== */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-700/50 p-4 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">
            AI Retail Mode
          </p>
          <p className="mt-1">
            Optimizing decisions in real-time
          </p>
        </div>
      )}
    </aside>
  );
}
