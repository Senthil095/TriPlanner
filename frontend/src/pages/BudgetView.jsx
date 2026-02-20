// BudgetView.jsx - AI Itinerary Budget Viewer + Manual Expense Tracker
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PlaneTakeoff,
  FileCheck,
  Shield,
  CreditCard,
  Info,
  Sparkles,
  Hotel,
  Utensils,
  Bus,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Calculator,
} from "lucide-react";
import AnimatedPage, {
  StaggerContainer,
  staggerItem,
} from "../components/ui/AnimatedPage";
import GlassCard from "../components/ui/GlassCard";
import { useTrip } from "../context/TripContext";

// ── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => `$${Number(n ?? 0).toLocaleString()}`;

const AI_ROWS = [
  {
    key: "accommodation",
    label: "Accommodation",
    icon: Hotel,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    key: "food",
    label: "Food",
    icon: Utensils,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    key: "transport",
    label: "Transport",
    icon: Bus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    key: "activities",
    label: "Activities",
    icon: Ticket,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    key: "miscellaneous",
    label: "Miscellaneous",
    icon: MoreHorizontal,
    color: "text-gray-500",
    bg: "bg-gray-50 dark:bg-gray-500/10",
  },
  {
    key: "flights",
    label: "Flights (return)",
    icon: PlaneTakeoff,
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-500/10",
    optional: true,
  },
  {
    key: "visa",
    label: "Visa Fee",
    icon: FileCheck,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    optional: true,
  },
  {
    key: "insurance",
    label: "Travel Insurance",
    icon: Shield,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    optional: true,
  },
];

const MANUAL_CATS = [
  { name: "Accommodation", emoji: "🏨", color: "bg-purple-500" },
  { name: "Food & Dining", emoji: "🍽️", color: "bg-amber-500" },
  { name: "Transport", emoji: "🚕", color: "bg-emerald-500" },
  { name: "Activities", emoji: "🎭", color: "bg-violet-500" },
  { name: "Shopping", emoji: "🛍️", color: "bg-pink-500" },
  { name: "Flights", emoji: "✈️", color: "bg-sky-500" },
  { name: "Visa", emoji: "📋", color: "bg-indigo-500" },
  { name: "Insurance", emoji: "🛡️", color: "bg-rose-500" },
  { name: "Miscellaneous", emoji: "📦", color: "bg-cyan-500" },
];

// ── component ─────────────────────────────────────────────────────────────────

function BudgetView() {
  const location = useLocation();
  const { state: tripState } = useTrip();

  // Budget may arrive via nav-state (from ItineraryView "Budget" button)
  // or from the current trip in context.
  const aiBudget =
    location.state?.budget || tripState.currentTrip?.budget || null;

  const destination = tripState.currentTrip?.destination || null;
  const duration = tripState.currentTrip?.duration || null;

  // ── manual expense tracker ───────────────────────────────────────────────
  const buildDefaults = () => {
    if (!aiBudget) {
      return MANUAL_CATS.map((c) => ({ ...c, budget: 0, spent: 0 }));
    }
    return [
      { ...MANUAL_CATS[0], budget: aiBudget.accommodation ?? 0, spent: 0 },
      { ...MANUAL_CATS[1], budget: aiBudget.food ?? 0, spent: 0 },
      { ...MANUAL_CATS[2], budget: aiBudget.transport ?? 0, spent: 0 },
      { ...MANUAL_CATS[3], budget: aiBudget.activities ?? 0, spent: 0 },
      { ...MANUAL_CATS[4], budget: aiBudget.miscellaneous ?? 0, spent: 0 }, // Shopping mapped to AI Misc
      { ...MANUAL_CATS[5], budget: aiBudget.flights ?? 0, spent: 0 },
      { ...MANUAL_CATS[6], budget: aiBudget.visa ?? 0, spent: 0 },
      { ...MANUAL_CATS[7], budget: aiBudget.insurance ?? 0, spent: 0 },
      { ...MANUAL_CATS[8], budget: 0, spent: 0 },
    ];
  };

  const [categories, setCategories] = useState(buildDefaults);
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [showTips, setShowTips] = useState(false);

  const totalBudget = categories.reduce((a, c) => a + c.budget, 0);
  const totalSpent = categories.reduce((a, c) => a + c.spent, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.category || !newExpense.amount) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.name === newExpense.category
          ? { ...c, spent: c.spent + parseFloat(newExpense.amount) }
          : c,
      ),
    );
    setNewExpense({ category: "", amount: "" });
    setShowAdd(false);
  };

  // ── AI budget rows (only show non-zero optionals) ────────────────────────
  const aiRows = aiBudget
    ? AI_ROWS.filter((r) => !r.optional || (aiBudget[r.key] ?? 0) > 0)
    : [];

  return (
    <AnimatedPage className="max-w-5xl mx-auto px-4 py-8 pb-24">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
            <Wallet size={24} className="text-emerald-500" />
            Budget Tracker
            {destination && (
              <span className="text-base font-normal text-surface-500 dark:text-surface-400">
                — {destination}
              </span>
            )}
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
            {aiBudget
              ? "AI-estimated budget + manual expense tracking"
              : "Track and manage your trip expenses"}
            {duration && ` · ${duration} days`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/budget-calculator"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          >
            <Calculator size={16} />
            <span className="hidden sm:inline">Full Calculator</span>
          </Link>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Add Expense
          </button>
        </div>
      </div>

      {/* ── AI Budget Panel ──────────────────────────────────────────────── */}
      {aiBudget && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard hover={false}>
            {/* Collapsible header */}
            <button
              onClick={() => setShowAIPanel((v) => !v)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-primary-500" />
                <span className="font-bold text-surface-900 dark:text-surface-100">
                  AI-Generated Budget Breakdown
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {fmt(aiBudget.total)}
                </span>
                {showAIPanel ? (
                  <ChevronUp size={18} className="text-surface-400" />
                ) : (
                  <ChevronDown size={18} className="text-surface-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {showAIPanel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Cost grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
                    {aiRows.map(({ key, label, icon: Icon, color, bg }) => (
                      <div key={key} className={`${bg} rounded-xl p-3`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={13} className={color} />
                          <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                            {label}
                          </p>
                        </div>
                        <p className={`text-base font-bold ${color}`}>
                          {fmt(aiBudget[key])}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Currency note */}
                  {aiBudget.currency_note && (
                    <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-800/30">
                      <CreditCard
                        size={14}
                        className="text-amber-500 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        {aiBudget.currency_note}
                      </p>
                    </div>
                  )}

                  {/* Tips toggle */}
                  {aiBudget.budget_tips?.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => setShowTips((v) => !v)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-surface-600 dark:text-surface-400 hover:text-primary-500 transition-colors"
                      >
                        <Info size={13} />
                        {showTips ? "Hide" : "Show"} Budget Tips (
                        {aiBudget.budget_tips.length})
                        {showTips ? (
                          <ChevronUp size={13} />
                        ) : (
                          <ChevronDown size={13} />
                        )}
                      </button>

                      <AnimatePresence>
                        {showTips && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-1"
                          >
                            {aiBudget.budget_tips.map((tip, i) => (
                              <li
                                key={i}
                                className="text-xs text-surface-600 dark:text-surface-400 flex items-start gap-1.5"
                              >
                                <span className="text-primary-400 mt-0.5">
                                  •
                                </span>
                                {tip}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Trade-offs */}
                  {aiBudget.trade_offs?.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-surface-600 dark:text-surface-400 mb-2">
                        💡 Save More — Trade-offs
                      </p>
                      <div className="space-y-2">
                        {aiBudget.trade_offs.slice(0, 3).map((t, i) => (
                          <div
                            key={i}
                            className="flex flex-wrap items-center gap-2 text-xs rounded-lg bg-surface-50 dark:bg-surface-800 px-3 py-2"
                          >
                            <span className="capitalize font-medium text-surface-700 dark:text-surface-300 w-20 shrink-0">
                              {t.category}
                            </span>
                            <span className="text-rose-500 line-through">
                              {t.comfort_option}
                            </span>
                            <span className="text-emerald-500">
                              → {t.budget_option}
                            </span>
                            <span className="ml-auto font-semibold text-emerald-600 dark:text-emerald-400">
                              saves {t.savings}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      )}

      {/* ── No itinerary nudge ───────────────────────────────────────────── */}
      {!aiBudget && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                <Sparkles size={24} className="text-primary-500" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-surface-900 dark:text-surface-100">
                  No AI budget loaded
                </p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                  Generate a trip to get an AI-estimated breakdown including
                  flights, visa &amp; insurance.
                </p>
              </div>
              <Link to="/plan" className="btn-primary text-sm flex-shrink-0">
                Plan a Trip
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* ── Summary cards ────────────────────────────────────────────────── */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div variants={staggerItem}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
                <DollarSign size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">
                  Total Budget
                </p>
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  {fmt(totalBudget)}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/15 flex items-center justify-center">
                <ArrowUpRight size={22} className="text-rose-500" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Spent</p>
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  {fmt(totalSpent)}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                <ArrowDownRight size={22} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">
                  Remaining
                </p>
                <p
                  className={`text-2xl font-bold ${remaining < 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}
                >
                  {fmt(remaining)}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerContainer>

      {/* ── Donut + Category bars ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Donut */}
        <GlassCard
          hover={false}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative w-40 h-40 mb-4">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="10"
                className="stroke-surface-200 dark:stroke-surface-700"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="10"
                strokeDasharray={`${Math.min(spentPercent, 100) * 2.64} 264`}
                strokeLinecap="round"
                className={
                  spentPercent > 90
                    ? "stroke-rose-500"
                    : spentPercent > 70
                      ? "stroke-amber-500"
                      : "stroke-emerald-500"
                }
                initial={{ strokeDasharray: "0 264" }}
                animate={{
                  strokeDasharray: `${Math.min(spentPercent, 100) * 2.64} 264`,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                {spentPercent}%
              </span>
              <span className="text-xs text-surface-400">used</span>
            </div>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
            {fmt(remaining)} left of {fmt(totalBudget)}
          </p>
          {spentPercent >= 90 && (
            <p className="text-xs text-rose-500 font-medium mt-1 text-center">
              ⚠️ Budget nearly exhausted
            </p>
          )}
        </GlassCard>

        {/* Category bars */}
        <div className="lg:col-span-2 space-y-3">
          {categories
            .filter((c) => c.budget > 0 || c.spent > 0)
            .map((cat, i) => {
              const pct =
                cat.budget > 0
                  ? Math.round((cat.spent / cat.budget) * 100)
                  : cat.spent > 0
                    ? 100
                    : 0;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                        {cat.name}
                      </span>
                      <span className="text-xs text-surface-400">
                        {fmt(cat.spent)} / {fmt(cat.budget)}
                      </span>
                    </div>
                    <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${pct > 90
                          ? "bg-rose-500"
                          : pct > 70
                            ? "bg-amber-500"
                            : cat.color
                          }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.6, delay: i * 0.04 }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold w-9 text-right ${pct > 90
                      ? "text-rose-500"
                      : pct > 70
                        ? "text-amber-500"
                        : "text-emerald-500"
                      }`}
                  >
                    {pct}%
                  </span>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* ── Add Expense Form ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <GlassCard hover={false}>
              <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Log an Expense
              </h3>
              <form
                onSubmit={handleAddExpense}
                className="flex flex-col sm:flex-row gap-4"
              >
                <select
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense((p) => ({ ...p, category: e.target.value }))
                  }
                  className="input-field flex-1"
                  required
                >
                  <option value="">Select category</option>
                  {MANUAL_CATS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1">
                  <DollarSign
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
                  />
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense((p) => ({ ...p, amount: e.target.value }))
                    }
                    className="input-field pl-10"
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="btn-primary text-sm flex-1 sm:flex-none"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="btn-secondary text-sm flex-1 sm:flex-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress bar footer ──────────────────────────────────────────── */}
      <GlassCard hover={false}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-surface-700 dark:text-surface-300">
            Overall Spend Progress
          </p>
          <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
            {spentPercent}%
          </p>
        </div>
        <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${spentPercent >= 100
              ? "bg-red-500"
              : spentPercent >= 70
                ? "bg-amber-500"
                : "bg-emerald-500"
              }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(spentPercent, 100)}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        {spentPercent >= 100 && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
            🚨 You've exceeded your budget by {fmt(Math.abs(remaining))}
          </p>
        )}
      </GlassCard>
    </AnimatedPage>
  );
}

export default BudgetView;
