import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon?: ReactNode;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-semibold text-slate-900 mt-4">
        {value}
      </p>
    </div>
  );
}
