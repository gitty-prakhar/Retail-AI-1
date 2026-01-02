"use client";

import { useState } from "react";
import ProductTable from "@/components/ProductTable";
import {
  Boxes,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
} from "lucide-react";

export default function Inventory() {
  const [filter, setFilter] = useState<
    "ALL" | "HIGH" | "MEDIUM" | "SAFE"
  >("ALL");

  return (
    <div className="space-y-12">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Boxes />
            Inventory & Expiry Intelligence
          </h1>
          <p className="mt-4 text-lg text-orange-100">
            Real-time visibility into inventory health, expiry risks,
            and AI-powered actions to prevent losses before they
            happen.
          </p>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] w-96 h-96 bg-red-400/30 rounded-full blur-3xl" />
      </section>

      {/* ================= KPI STRIP ================= */}
      <section className="grid grid-cols-4 gap-6">
        <MiniStat
          title="Total SKUs"
          value="48"
          icon={<Boxes className="text-indigo-600" />}
        />
        <MiniStat
          title="High Risk Items"
          value="9"
          icon={<AlertTriangle className="text-red-500" />}
        />
        <MiniStat
          title="Safe Inventory"
          value="31"
          icon={<CheckCircle className="text-green-600" />}
        />
        <MiniStat
          title="Avg Shelf Life"
          value="14 days"
          icon={<Clock className="text-blue-600" />}
        />
      </section>

      {/* ================= FILTERS ================= */}
      <section className="flex items-center gap-4">
        <FilterButton
          label="All"
          active={filter === "ALL"}
          onClick={() => setFilter("ALL")}
        />
        <FilterButton
          label="High Risk"
          active={filter === "HIGH"}
          onClick={() => setFilter("HIGH")}
        />
        <FilterButton
          label="Medium Risk"
          active={filter === "MEDIUM"}
          onClick={() => setFilter("MEDIUM")}
        />
        <FilterButton
          label="Safe"
          active={filter === "SAFE"}
          onClick={() => setFilter("SAFE")}
        />
      </section>

      {/* ================= TABLE ================= */}
      <section>
        <ProductTable riskFilter={filter} />
      </section>

      {/* ================= AI INSIGHT ================= */}
      <section className="bg-purple-50 border border-purple-200 rounded-2xl p-6 text-purple-900">
        <div className="flex items-start gap-3">
          <Brain className="mt-1" />
          <p className="text-sm">
            <b>AI Insight:</b> Bakery and dairy categories show
            accelerated expiry risk due to lower weekend footfall.
            Early discounting and donation can reduce potential losses
            by up to <b>29%</b>.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function MiniStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 text-slate-600">
        {icon}
        <p className="text-sm">{title}</p>
      </div>
      <p className="text-2xl font-semibold text-slate-900 mt-3">
        {value}
      </p>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full border transition ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}
