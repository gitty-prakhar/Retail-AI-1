type Product = {
  name: string;
  daysLeft: number;
  category: string;
};

const products: Product[] = [
  { name: "Milk", daysLeft: 2, category: "Dairy" },
  { name: "Bread", daysLeft: 3, category: "Bakery" },
  { name: "Yogurt", daysLeft: 6, category: "Dairy" },
  { name: "Chips", daysLeft: 25, category: "Snacks" },
  { name: "Juice", daysLeft: 8, category: "Beverages" },
  { name: "Butter", daysLeft: 15, category: "Dairy" },
];

function getRisk(daysLeft: number) {
  if (daysLeft <= 3) return "HIGH";
  if (daysLeft <= 7) return "MEDIUM";
  return "SAFE";
}

export default function ProductTable({
  riskFilter,
}: {
  riskFilter: "ALL" | "HIGH" | "MEDIUM" | "SAFE";
}) {
  const filtered =
    riskFilter === "ALL"
      ? products
      : products.filter(
          (p) => getRisk(p.daysLeft) === riskFilter
        );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-center">Category</th>
            <th className="p-4 text-center">Days to Expiry</th>
            <th className="p-4 text-center">Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => {
            const risk = getRisk(p.daysLeft);

            return (
              <tr
                key={p.name}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium">{p.name}</td>
                <td className="text-center">{p.category}</td>
                <td className="text-center">{p.daysLeft}</td>
                <td className="text-center">
                  <RiskBadge risk={risk} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ================= RISK BADGE ================= */

function RiskBadge({ risk }: { risk: string }) {
  const map: any = {
    HIGH: "bg-red-100 text-red-700",
    MEDIUM: "bg-orange-100 text-orange-700",
    SAFE: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-semibold text-xs ${map[risk]}`}
    >
      {risk}
    </span>
  );
}
