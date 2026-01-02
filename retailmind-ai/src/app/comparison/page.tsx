"use client";

import { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Replace,
  CheckCircle,
} from "lucide-react";

/* ------------------ DATA MODELS ------------------ */

type Brand = {
  name: string;
  price: number;
  salesVelocity: number; // units/day
  margin: number; // %
  expiryRisk: number; // 0–100 (higher = worse)
  customerPreference: number; // 0–100
};

const brands: Brand[] = [
  {
    name: "Brand A",
    price: 40,
    salesVelocity: 18,
    margin: 22,
    expiryRisk: 65,
    customerPreference: 55,
  },
  {
    name: "Brand B",
    price: 45,
    salesVelocity: 28,
    margin: 30,
    expiryRisk: 35,
    customerPreference: 78,
  },
  {
    name: "Brand C",
    price: 38,
    salesVelocity: 12,
    margin: 18,
    expiryRisk: 72,
    customerPreference: 48,
  },
];

/* ------------------ AI SCORE LOGIC ------------------ */

function calculateAIScore(b: Brand) {
  // Explainable weighted scoring
  return (
    b.salesVelocity * 0.35 +
    b.margin * 0.3 +
    b.customerPreference * 0.25 -
    b.expiryRisk * 0.2
  );
}

function progressColor(value: number) {
  if (value >= 70) return "bg-green-500";
  if (value >= 45) return "bg-orange-400";
  return "bg-red-400";
}

/* ------------------ MAIN COMPONENT ------------------ */

export default function BrandComparison() {
  const scoredBrands = brands
    .map((b) => ({ ...b, aiScore: calculateAIScore(b) }))
    .sort((a, b) => b.aiScore - a.aiScore);

  const bestBrand = scoredBrands[0];
  const worstBrand = scoredBrands[scoredBrands.length - 1];

  const [simulated, setSimulated] = useState(false);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
          <BarChart2 className="text-blue-600" />
          Brand Comparison & Replacement Intelligence
        </h1>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Compare competing brands across performance, profitability,
          expiry risk, and customer preference to enable smarter
          assortment and replacement decisions.
        </p>
      </div>

      {/* Brand Cards */}
      <div className="grid grid-cols-3 gap-6">
        {scoredBrands.map((b) => (
          <BrandCard key={b.name} brand={b} />
        ))}
      </div>

      {/* Replacement Recommendation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Replace className="text-blue-600" />
          AI Replacement Recommendation
        </h2>

        <p className="text-slate-700">
          <b>{worstBrand.name}</b> is underperforming due to low sales
          velocity, high expiry risk, and weaker customer preference.
        </p>

        <p className="mt-2 text-slate-700">
          <b>{bestBrand.name}</b> shows stronger demand, better margins,
          and lower expiry risk.
        </p>

        <button
          onClick={() => setSimulated(true)}
          className="mt-4 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Simulate Replacement Impact
        </button>

        {simulated && (
          <div className="mt-6 grid grid-cols-3 gap-6">
            <ImpactCard
              title="Expected Sales Lift"
              value="+24%"
              icon={<TrendingUp className="text-green-600" />}
            />
            <ImpactCard
              title="Expiry Loss Reduction"
              value="-31%"
              icon={<TrendingDown className="text-green-600" />}
            />
            <ImpactCard
              title="Profit Margin Improvement"
              value="+12%"
              icon={<CheckCircle className="text-green-600" />}
            />
          </div>
        )}
      </div>

      {/* AI Insight */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-blue-900 text-sm">
        🤖 <b>AI Insight:</b> Replacing low-performing brands with
        high-demand alternatives improves revenue, reduces waste, and
        strengthens customer satisfaction without increasing shelf
        complexity.
      </div>
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function BrandCard({ brand }: { brand: any }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        {brand.name}
      </h3>

      <Metric label="Sales Velocity" value={brand.salesVelocity} max={30} />
      <Metric label="Profit Margin (%)" value={brand.margin} max={40} />
      <Metric
        label="Customer Preference"
        value={brand.customerPreference}
        max={100}
      />
      <Metric
        label="Expiry Risk"
        value={100 - brand.expiryRisk}
        max={100}
        invert
      />

      <div className="pt-3 border-t">
        <p className="text-sm text-slate-500">AI Performance Score</p>
        <p className="text-2xl font-semibold text-slate-900">
          {brand.aiScore.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  max,
  invert,
}: {
  label: string;
  value: number;
  max: number;
  invert?: boolean;
}) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${progressColor(
            invert ? 100 - percent : percent
          )}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ImpactCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <p className="text-sm">{title}</p>
      </div>
      <p className="text-3xl font-semibold text-slate-900 mt-3">
        {value}
      </p>
    </div>
  );
}
