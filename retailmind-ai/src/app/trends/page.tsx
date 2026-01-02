"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, BarChart3, Sparkles } from "lucide-react";

const demandData = [
  { month: "Jan", demand: 420 },
  { month: "Feb", demand: 680 },
  { month: "Mar", demand: 510 },
  { month: "Apr", demand: 740 },
  { month: "May", demand: 820 },
  { month: "Jun", demand: 760 },
];

export default function Trends() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white">
      
      {/* ================= HERO ================= */}
      <section className="relative px-12 pt-16 pb-32 overflow-hidden">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-300" />
            <span className="uppercase tracking-widest text-sm text-blue-200">
              Predictive Intelligence
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Demand Forecasting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              That Thinks Ahead
            </span>
          </h1>

          <p className="mt-6 text-lg text-blue-200 max-w-3xl">
            RetailMind AI analyzes historical demand and seasonal patterns
            to forecast future sales — enabling confident stocking decisions
            and eliminating guesswork.
          </p>
        </div>

        {/* Decorative glows */}
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-8rem] left-[-8rem] w-[36rem] h-[36rem] bg-indigo-400/30 rounded-full blur-[140px]" />
      </section>

      {/* ================= FLOATING KPIs ================= */}
      <section className="relative -mt-24 px-12 z-10">
        <div className="grid grid-cols-3 gap-6">
          <FloatingCard
            title="Predicted Growth"
            value="+18%"
            accent="from-green-400 to-emerald-500"
          />
          <FloatingCard
            title="High Demand Category"
            value="Dairy & Beverages"
            accent="from-sky-400 to-blue-500"
          />
          <FloatingCard
            title="Underperforming SKUs"
            value="7"
            accent="from-orange-400 to-red-500"
          />
        </div>
      </section>

      {/* ================= CHART SPOTLIGHT ================= */}
      <section className="px-12 mt-20 pb-20">
        <div className="relative bg-white rounded-[2.5rem] p-10 text-slate-900 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-blue-600" />
            <h2 className="text-2xl font-semibold">
              Monthly Demand Forecast
            </h2>
          </div>

          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="#2563eb"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Insight chip */}
          <div className="mt-8 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm text-blue-800 font-medium">
            🤖 AI Insight: Demand peaks during April–May. Pre-stocking
            dairy and beverages can significantly boost revenue.
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function FloatingCard({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="relative rounded-2xl p-6 bg-white text-slate-900 shadow-xl">
      <div
        className={`absolute -top-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r ${accent}`}
      />
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}
