"use client";

import { useState } from "react";
import {
  Eye,
  Move,
  TrendingUp,
  MousePointerClick,
} from "lucide-react";

/* ---------------- DATA MODELS ---------------- */

type Zone = {
  id: number;
  label: string;
  attention: number; // 0–100
};

const initialZones: Zone[] = [
  { id: 1, label: "Top Shelf", attention: 35 },
  { id: 2, label: "Eye Level", attention: 90 },
  { id: 3, label: "Hand Level", attention: 75 },
  { id: 4, label: "Bottom Shelf", attention: 30 },
  { id: 5, label: "Checkout Zone", attention: 85 },
];

/* ---------------- UTILS ---------------- */

function getHeatColor(score: number) {
  if (score >= 85) return "bg-red-400";
  if (score >= 65) return "bg-orange-300";
  if (score >= 45) return "bg-yellow-200";
  return "bg-green-200";
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function ProductPlacementHeatmap() {
  const [zones, setZones] = useState(initialZones);
  const [selectedProduct, setSelectedProduct] =
    useState("Impulse Snack");
  const [simulated, setSimulated] = useState(false);

  function simulatePlacement() {
    const updated = zones.map((zone) => {
      if (zone.label === "Eye Level") {
        return { ...zone, attention: zone.attention + 5 };
      }
      if (zone.label === "Checkout Zone") {
        return { ...zone, attention: zone.attention + 8 };
      }
      return { ...zone, attention: zone.attention };
    });

    setZones(updated);
    setSimulated(true);
  }

  function resetPlacement() {
    setZones(initialZones);
    setSimulated(false);
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
          <Eye className="text-blue-600" />
          Product Placement Heatmap
        </h1>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Visualize customer attention across shelf zones and simulate
          optimal product placement to maximize visibility, impulse
          purchases, and conversion rates.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-xl bg-white"
        >
          <option>Impulse Snack</option>
          <option>New Beverage</option>
          <option>Premium Chocolate</option>
          <option>Daily Essential</option>
        </select>

        <button
          onClick={simulatePlacement}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Move size={18} />
          Simulate Placement
        </button>

        <button
          onClick={resetPlacement}
          className="px-5 py-3 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition"
        >
          Reset
        </button>
      </div>

      {/* Heatmap */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <MousePointerClick className="text-blue-600" />
          Customer Attention Heatmap
        </h2>

        <div className="space-y-4 max-w-xl">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={`flex items-center justify-between p-5 rounded-xl border border-slate-200 shadow-sm transition ${getHeatColor(
                zone.attention
              )}`}
            >
              <span className="font-medium text-slate-900">
                {zone.label}
              </span>
              <span className="text-sm">
                Attention Score:{" "}
                <b>{zone.attention}</b>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-3 gap-6">
        <ImpactCard
          title="Visibility Score"
          value={simulated ? "+26%" : "Baseline"}
        />
        <ImpactCard
          title="Impulse Purchase Lift"
          value={simulated ? "+31%" : "Baseline"}
        />
        <ImpactCard
          title="Conversion Rate Impact"
          value={simulated ? "+18%" : "Baseline"}
        />
      </div>

      {/* Insight */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-orange-900 text-sm">
        🧠 <b>Behavioral Insight:</b> Products placed at eye level and
        near checkout zones receive significantly higher attention,
        leading to increased impulse purchases and faster inventory
        turnover.
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function ImpactCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-semibold text-slate-900 mt-3">
        {value}
      </p>
    </div>
  );
}
