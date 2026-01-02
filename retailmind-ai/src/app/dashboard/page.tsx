"use client";

import StatCard from "@/components/StatCard";
import {
  AlertTriangle,
  Leaf,
  IndianRupee,
  TrendingUp,
  Sparkles,
  Brain,
  LayoutDashboard,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-2 py-6 space-y-16">
      {/* ================= HERO / INTRO ================= */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 p-14 text-white shadow-xl">
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-300" />
            <span className="uppercase tracking-widest text-sm text-blue-200">
              AI-powered Retail Intelligence
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Welcome to <br />
            <span className="text-yellow-300">RetailMind AI</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-3xl">
            RetailMind AI is a next-generation decision platform that
            helps retailers reduce waste, optimize inventory, and test
            smarter strategies using AI, simulations, and digital
            twins — before applying them in the real world.
          </p>
        </div>

        {/* Decorative layers */}
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] w-[28rem] h-[28rem] bg-purple-400/20 rounded-full blur-3xl" />
      </section>

      {/* ================= WHAT AI IS DOING ================= */}
      <section className="grid grid-cols-3 gap-8">
        <InfoCard
          icon={<Brain className="text-indigo-600" />}
          title="AI Intelligence Layer"
          desc="Continuously analyzes sales velocity, expiry risk, customer behavior, and trends to generate explainable recommendations."
        />
        <InfoCard
          icon={<LayoutDashboard className="text-blue-600" />}
          title="Simulation First Approach"
          desc="All decisions are tested virtually using digital twins and heatmaps before execution in physical stores."
        />
        <InfoCard
          icon={<Leaf className="text-green-600" />}
          title="Sustainability by Design"
          desc="Waste reduction, donation-first logic, and responsible disposal are built into every recommendation."
        />
      </section>

      {/* ================= KPI SECTION ================= */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Executive Overview
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Inventory at Risk"
            value="36"
            icon={<AlertTriangle className="text-orange-500" />}
          />
          <StatCard
            title="Waste Reduced"
            value="22%"
            icon={<Leaf className="text-green-600" />}
          />
          <StatCard
            title="Revenue Saved"
            value="₹1.4L"
            icon={<IndianRupee className="text-blue-600" />}
          />
          <StatCard
            title="Fast Moving Products"
            value="18"
            icon={<TrendingUp className="text-purple-600" />}
          />
        </div>
      </section>

      {/* ================= AI INSIGHTS ================= */}
      <section>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Today’s AI Highlights
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <HighlightCard
            title="Expiry Risk Detected"
            description="Milk, bread, and yogurt batches are entering critical expiry windows. AI suggests targeted discounting and donation."
            gradient="from-orange-200 to-orange-50"
          />
          <HighlightCard
            title="Demand Surge Incoming"
            description="Dairy and beverage demand is projected to rise next week based on seasonal and historical patterns."
            gradient="from-blue-200 to-blue-50"
          />
          <HighlightCard
            title="Layout Opportunity"
            description="Digital twin simulations show a 31% increase in impulse purchases by moving snacks near checkout."
            gradient="from-green-200 to-green-50"
          />
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function InfoCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/70 backdrop-blur border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>
      </div>
      <p className="text-sm text-slate-700">{desc}</p>
    </div>
  );
}

function HighlightCard({
  title,
  description,
  gradient,
}: {
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-3xl p-6 bg-gradient-to-br ${gradient} border border-slate-200 shadow-sm`}
    >
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>
      <p className="text-sm text-slate-700 mt-3">
        {description}
      </p>
    </div>
  );
}
