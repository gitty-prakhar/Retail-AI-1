"use client";

import { useState } from "react";
import {
  Play,
  RotateCcw,
  Eye,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";

/* ------------------ DATA MODELS ------------------ */

type Shelf = {
  id: number;
  name: string;
  performance: number; // sales score
};

const initialShelves: Shelf[] = [
  { id: 1, name: "Dairy", performance: 60 },
  { id: 2, name: "Bakery", performance: 55 },
  { id: 3, name: "Snacks", performance: 40 },
  { id: 4, name: "Beverages", performance: 70 },
  { id: 5, name: "Personal Care", performance: 35 },
  { id: 6, name: "Frozen", performance: 50 },
  { id: 7, name: "Fruits", performance: 75 },
  { id: 8, name: "Vegetables", performance: 80 },
  { id: 9, name: "Impulse Items", performance: 30 },
];

/* ------------------ UTILS ------------------ */

function getHeatColor(score: number) {
  if (score >= 75) return "bg-green-400";
  if (score >= 55) return "bg-yellow-300";
  if (score >= 40) return "bg-orange-300";
  return "bg-red-300";
}

/* ------------------ MAIN COMPONENT ------------------ */

export default function DigitalTwinSimulation() {
  const [shelves, setShelves] = useState(initialShelves);
  const [simulated, setSimulated] = useState(false);

  function runSimulation() {
    // AI-like improvement logic
    const improved = shelves.map((shelf) => {
      if (shelf.name === "Impulse Items") {
        return { ...shelf, performance: shelf.performance + 35 };
      }
      if (shelf.performance < 50) {
        return { ...shelf, performance: shelf.performance + 15 };
      }
      return { ...shelf, performance: shelf.performance + 5 };
    });

    setShelves(improved);
    setSimulated(true);
  }

  function resetSimulation() {
    setShelves(initialShelves);
    setSimulated(false);
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
          <LayoutGrid className="text-blue-600" />
          Digital Twin Simulation
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          A virtual replica of the retail store that allows simulation
          of product placement and layout strategies before real-world
          execution.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={runSimulation}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          <Play size={18} />
          Run Simulation
        </button>

        <button
          onClick={resetSimulation}
          className="flex items-center gap-2 px-5 py-3 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Store Grid */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Eye className="text-blue-600" />
          Virtual Store Layout
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <div
              key={shelf.id}
              className={`h-32 rounded-xl p-4 text-slate-900 shadow-sm border border-slate-200 flex flex-col justify-between transition ${getHeatColor(
                shelf.performance
              )}`}
            >
              <p className="font-semibold">{shelf.name}</p>
              <p className="text-sm">
                Performance Score: <b>{shelf.performance}</b>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="grid grid-cols-3 gap-6">
        <ImpactCard
          title="Customer Visibility"
          value={simulated ? "+22%" : "Baseline"}
        />
        <ImpactCard
          title="Expected Sales Lift"
          value={simulated ? "+18%" : "Baseline"}
        />
        <ImpactCard
          title="Impulse Purchase Growth"
          value={simulated ? "+35%" : "Baseline"}
        />
      </div>

      {/* AI Insight */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-blue-900 text-sm">
        🤖 <b>AI Simulation Insight:</b> Moving impulse items closer to
        high-traffic zones significantly improves conversion rates.
        The digital twin enables risk-free experimentation before
        applying changes in physical stores.
      </div>
    </div>
  );
}

/* ------------------ SMALL COMPONENT ------------------ */

function ImpactCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-semibold text-slate-900 mt-3">
        {value}
      </p>
    </div>
  );
}
