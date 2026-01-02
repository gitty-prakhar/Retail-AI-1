"use client";

import { useState } from "react";
import {
  Tag,
  TrendingDown,
  CheckCircle,
  Percent,
  AlertTriangle,
  Brain,
} from "lucide-react";

/* ================= DATA ================= */

const baseProducts = [
  { name: "Milk", daysLeft: 2, sales: 3, category: "Dairy" },
  { name: "Bread", daysLeft: 5, sales: 6, category: "Bakery" },
  { name: "Chips", daysLeft: 30, sales: 2, category: "Snacks" },
  { name: "Juice", daysLeft: 7, sales: 10, category: "Beverages" },
];

/* ================= LOGIC ================= */

function getDiscount(daysLeft: number, sales: number, sensitivity: number) {
  let discount = 0;

  if (daysLeft <= 2) discount = 35;
  else if (daysLeft <= 5 && sales < 5) discount = 20;
  else if (daysLeft <= 7 && sales < 8) discount = 10;

  return Math.min(discount + sensitivity, 50);
}

/* ================= PAGE ================= */

export default function Discounts() {
  const [sensitivity, setSensitivity] = useState(0);

  const discounted = baseProducts.filter(
    (p) => getDiscount(p.daysLeft, p.sales, sensitivity) > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 space-y-16">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-14 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Percent className="text-yellow-200" />
            <span className="uppercase tracking-widest text-sm text-yellow-100">
              AI Pricing Intelligence
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Dynamic Discount Engine
          </h1>

          <p className="mt-6 text-lg text-yellow-100 max-w-3xl">
            Automatically determine optimal discount strategies using
            expiry risk, sales velocity, and AI sensitivity tuning —
            reducing losses while preserving brand trust.
          </p>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] w-[32rem] h-[32rem] bg-orange-400/30 rounded-full blur-3xl" />
      </section>

      {/* ================= KPI STRIP ================= */}
      <section className="grid grid-cols-4 gap-6 px-2">
        <MiniStat
          title="Products Discounted"
          value={discounted.length.toString()}
          icon={<Tag className="text-orange-600" />}
        />
        <MiniStat
          title="High Risk Items"
          value="4"
          icon={<AlertTriangle className="text-red-500" />}
        />
        <MiniStat
          title="Avg Discount"
          value={`${sensitivity + 18}%`}
          icon={<Percent className="text-blue-600" />}
        />
        <MiniStat
          title="Waste Reduction Impact"
          value="↑ 29%"
          icon={<CheckCircle className="text-green-600" />}
        />
      </section>

      {/* ================= AI CONTROL ================= */}
      <section className="bg-white/80 backdrop-blur border border-slate-200 rounded-3xl p-8 shadow-sm mx-2">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3 mb-4">
          <Brain className="text-purple-600" />
          AI Discount Sensitivity
        </h2>

        <p className="text-slate-600 max-w-2xl mb-6">
          Adjust how aggressively AI applies discounts. Higher
          sensitivity prioritizes sell-through; lower values preserve
          margins.
        </p>

        <input
          type="range"
          min={0}
          max={15}
          value={sensitivity}
          onChange={(e) => setSensitivity(Number(e.target.value))}
          className="w-full accent-orange-500"
        />

        <p className="mt-2 text-sm text-slate-600">
          Current Sensitivity: <b>{sensitivity}</b>
        </p>
      </section>

      {/* ================= TABLE ================= */}
      <section className="mx-2">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-center">Days to Expiry</th>
                <th className="p-4 text-center">Sales Velocity</th>
                <th className="p-4 text-center">
                  AI Discount Recommendation
                </th>
              </tr>
            </thead>

            <tbody>
              {baseProducts.map((p) => {
                const discount = getDiscount(
                  p.daysLeft,
                  p.sales,
                  sensitivity
                );

                return (
                  <tr
                    key={p.name}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-medium text-slate-900">
                      {p.name}
                    </td>
                    <td className="text-center">{p.category}</td>
                    <td className="text-center">{p.daysLeft}</td>
                    <td className="text-center flex justify-center items-center gap-1">
                      <TrendingDown size={14} />
                      {p.sales}
                    </td>
                    <td className="text-center">
                      {discount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                          <Tag size={14} />
                          {discount}% OFF
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          <CheckCircle size={14} />
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= AI INSIGHT ================= */}
      <section className="bg-purple-50 border border-purple-200 rounded-3xl p-6 text-purple-900 mx-2 mb-10">
        <div className="flex items-start gap-3">
          <Brain className="mt-1" />
          <p className="text-sm">
            <b>AI Insight:</b> Increasing discount sensitivity by even
            5 points improves sell-through of high-risk items by up to
            <b> 31%</b>, while maintaining acceptable profit margins
            across most categories.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

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
