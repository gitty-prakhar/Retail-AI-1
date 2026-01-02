"use client";

import {
  Trash2,
  Leaf,
  Gift,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type Product = {
  name: string;
  daysLeft: number;
  quantity: number;
  category: string;
};

const products: Product[] = [
  { name: "Milk Packets", daysLeft: 1, quantity: 40, category: "Dairy" },
  { name: "Bread Loaves", daysLeft: 2, quantity: 25, category: "Bakery" },
  { name: "Yogurt Cups", daysLeft: 5, quantity: 30, category: "Dairy" },
  { name: "Chips Packets", daysLeft: 25, quantity: 60, category: "Snacks" },
  { name: "Fruit Juice", daysLeft: 3, quantity: 20, category: "Beverages" },
];

// AI-like waste decision logic
function getWasteAction(daysLeft: number) {
  if (daysLeft <= 1) return "Dispose";
  if (daysLeft <= 3) return "Donate";
  if (daysLeft <= 5) return "Discount";
  return "Safe";
}

export default function WasteManagement() {
  const disposed = products.filter(p => getWasteAction(p.daysLeft) === "Dispose");
  const donated = products.filter(p => getWasteAction(p.daysLeft) === "Donate");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
          <Leaf className="text-green-600" />
          Waste Management & Sustainability
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          AI-assisted workflows to reduce avoidable retail waste,
          enable responsible disposal, and maximize social impact
          through donations and smart discounting.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard
          title="Items Prevented from Waste"
          value="68%"
          icon={<CheckCircle2 className="text-green-600" />}
        />
        <KpiCard
          title="Items Donated"
          value={donated.length.toString()}
          icon={<Gift className="text-blue-600" />}
        />
        <KpiCard
          title="Items Disposed"
          value={disposed.length.toString()}
          icon={<Trash2 className="text-red-600" />}
        />
        <KpiCard
          title="CO₂ Emissions Avoided"
          value="142 kg"
          icon={<Leaf className="text-green-700" />}
        />
      </div>

      {/* Waste Decision Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Days Left</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">AI Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const action = getWasteAction(p.daysLeft);

              return (
                <tr
                  key={p.name}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium text-slate-900">
                    {p.name}
                  </td>
                  <td className="text-center">{p.daysLeft}</td>
                  <td className="text-center">{p.quantity}</td>
                  <td className="text-center">
                    {action === "Dispose" && (
                      <Badge
                        text="Dispose"
                        color="red"
                        icon={<AlertTriangle size={14} />}
                      />
                    )}
                    {action === "Donate" && (
                      <Badge
                        text="Donate"
                        color="blue"
                        icon={<Gift size={14} />}
                      />
                    )}
                    {action === "Discount" && (
                      <Badge
                        text="Discount"
                        color="orange"
                        icon={<TagIcon />}
                      />
                    )}
                    {action === "Safe" && (
                      <Badge
                        text="Safe"
                        color="green"
                        icon={<CheckCircle2 size={14} />}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* AI Insight Panel */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-900 text-sm">
        🌱 <b>AI Sustainability Insight:</b> By prioritizing donation
        and discounting before disposal, RetailMind AI helped reduce
        avoidable waste by <b>68%</b>, aligning profitability with
        environmental responsibility.
      </div>
    </div>
  );
}

/* ---------- Small Reusable Components ---------- */

function KpiCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-sm text-slate-500">{title}</p>
      </div>
      <p className="text-3xl font-semibold text-slate-900 mt-3">
        {value}
      </p>
    </div>
  );
}

function Badge({
  text,
  color,
  icon,
}: {
  text: string;
  color: "red" | "blue" | "green" | "orange";
  icon: React.ReactNode;
}) {
  const colorMap = {
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold ${colorMap[color]}`}
    >
      {icon}
      {text}
    </span>
  );
}

function TagIcon() {
  return <span>🏷️</span>;
}
