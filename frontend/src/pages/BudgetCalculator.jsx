// BudgetCalculator.jsx — Fully Dynamic Budget Calculator
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Bus,
  Hotel,
  Utensils,
  Ticket,
  ShoppingBag,
  MoreHorizontal,
  RotateCcw,
  Plus,
  Minus,
  Target,
  PlaneTakeoff,
  FileCheck,
  Shield,
  CreditCard,
  Info,
  Sparkles,
  Trash2,
  CalendarDays,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  X,
} from "lucide-react";
import AnimatedPage from "../components/ui/AnimatedPage";
import GlassCard from "../components/ui/GlassCard";
import { useTrip } from "../context/TripContext";

// ─── persistence ────────────────────────────────────────────────────────────
const SK = {
  ESTIMATOR: "bc_estimator_v2",
  EXPENSES: "bc_expenses_v2",
  DAILY: "bc_daily_v2",
};

const persist = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
};
const hydrate = (key, def) => {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : def;
  } catch (_) { return def; }
};

// ─── defaults ────────────────────────────────────────────────────────────────
const mkDefaultEstimator = () => ({
  tripDuration: 7,
  destination: "",
  dailyFood: 50,
  dailyTransport: 30,
  nightlyAccommodation: 100,
  entryFees: 200,
  shoppingAllowance: 150,
  miscAllowance: 100,
  flights: 0,
  visa: 0,
  insurance: 0,
});

const SIM_MULT = {
  transport: { taxi: 1, bus: 0.3 },
  food: { restaurant: 1, street: 0.4 },
  stay: { hotel: 1, hostel: 0.35 },
};

// ─── expense categories ──────────────────────────────────────────────────────
const CATS = [
  { id: "food",       label: "Food & Drink",  Icon: Utensils,    color: "bg-orange-500",  light: "bg-orange-50 dark:bg-orange-500/10",  text: "text-orange-600 dark:text-orange-400" },
  { id: "transport",  label: "Transport",     Icon: Bus,         color: "bg-blue-500",    light: "bg-blue-50 dark:bg-blue-500/10",      text: "text-blue-600 dark:text-blue-400" },
  { id: "stay",       label: "Stay",          Icon: Hotel,       color: "bg-purple-500",  light: "bg-purple-50 dark:bg-purple-500/10",  text: "text-purple-600 dark:text-purple-400" },
  { id: "activities", label: "Activities",    Icon: Ticket,      color: "bg-green-500",   light: "bg-green-50 dark:bg-green-500/10",    text: "text-green-600 dark:text-green-400" },
  { id: "shopping",   label: "Shopping",      Icon: ShoppingBag, color: "bg-pink-500",    light: "bg-pink-50 dark:bg-pink-500/10",      text: "text-pink-600 dark:text-pink-400" },
  { id: "flights",    label: "Flights",       Icon: PlaneTakeoff,color: "bg-sky-500",     light: "bg-sky-50 dark:bg-sky-500/10",        text: "text-sky-600 dark:text-sky-400" },
  { id: "visa",       label: "Visa / Fees",   Icon: FileCheck,   color: "bg-indigo-500",  light: "bg-indigo-50 dark:bg-indigo-500/10",  text: "text-indigo-600 dark:text-indigo-400" },
  { id: "misc",       label: "Miscellaneous", Icon: MoreHorizontal, color: "bg-gray-500", light: "bg-gray-50 dark:bg-gray-500/10",      text: "text-gray-600 dark:text-gray-400" },
];

const catById = (id) => CATS.find((c) => c.id === id) ?? CATS[CATS.length - 1];

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt = (n) => `$${Number(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const pct = (a, b) => (b > 0 ? Math.min(Math.round((a / b) * 100), 100) : 0);
const today = () => new Date().toISOString().slice(0, 10);

// ─── sub-components ──────────────────────────────────────────────────────────
function TabBtn({ id, label, Icon, active, onClick, badge }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
          : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700"
      }`}
    >
      <Icon size={15} />
      {label}
      {badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function ProgressBar({ value, max, colorClass = "bg-emerald-500", animate: doAnimate = true }) {
  const w = pct(value, max);
  return (
    <div className="h-2.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${w >= 100 ? "bg-red-500" : w >= 75 ? "bg-amber-500" : colorClass}`}
        initial={doAnimate ? { width: 0 } : { width: `${w}%` }}
        animate={{ width: `${w}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

function NumInput({ label, value, onChange, icon: Icon, min = 0, prefix = "$", suffix = "" }) {
  return (
    <div className="bg-white dark:bg-surface-800/60 rounded-xl p-4 border border-surface-100 dark:border-surface-700/60">
      <label className="flex items-center gap-1.5 text-xs font-medium text-surface-500 dark:text-surface-400 mb-2">
        {Icon && <Icon size={13} />}
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
          min={min}
          className={`w-full ${prefix ? "pl-7" : "pl-3"} ${suffix ? "pr-10" : "pr-3"} py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 text-xs pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function BudgetCalculator() {
  const { state: trip } = useTrip();
  const routerLoc = useLocation();

  // ── source budget: from nav-state or current trip ─────────────────────────
  const aiBudget = useMemo(
    () => routerLoc.state?.budget || trip.currentTrip?.budget || null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trip.currentTrip?.trip_id]
  );
  const aiDuration = trip.currentTrip?.duration ?? null;
  const aiDestination = trip.currentTrip?.destination ?? "";

  // ── estimator state ───────────────────────────────────────────────────────
  const [est, setEst] = useState(() => hydrate(SK.ESTIMATOR, mkDefaultEstimator()));

  // ── simulator state ───────────────────────────────────────────────────────
  const [sim, setSim] = useState({ transportMode: "taxi", foodMode: "restaurant", stayMode: "hotel" });

  // ── expenses ──────────────────────────────────────────────────────────────
  const [expenses, setExpenses] = useState(() => hydrate(SK.EXPENSES, []));

  // ── daily per-day tracking ────────────────────────────────────────────────
  const [dailyMap, setDailyMap] = useState(() => hydrate(SK.DAILY, {}));

  // ── UI ────────────────────────────────────────────────────────────────────
  const [tab, setTab] = useState("estimator");
  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExp, setNewExp] = useState({ category: "food", amount: "", note: "", day: 1, date: today() });
  const [showAlerts, setShowAlerts] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ── sync estimator from AI budget when itinerary changes ─────────────────
  useEffect(() => {
    if (!aiBudget) return;
    const d = aiDuration || 7;
    setEst((prev) => ({
      ...prev,
      tripDuration: d,
      destination: aiDestination,
      dailyFood:            aiBudget.food          ? Math.round(aiBudget.food / d)          : prev.dailyFood,
      dailyTransport:       aiBudget.transport      ? Math.round(aiBudget.transport / d)      : prev.dailyTransport,
      nightlyAccommodation: aiBudget.accommodation  ? Math.round(aiBudget.accommodation / d)  : prev.nightlyAccommodation,
      entryFees:            aiBudget.activities     ?? prev.entryFees,
      shoppingAllowance:    aiBudget.miscellaneous  ?? prev.shoppingAllowance,
      miscAllowance:        100,
      flights:              aiBudget.flights        ?? 0,
      visa:                 aiBudget.visa           ?? 0,
      insurance:            aiBudget.insurance      ?? 0,
    }));
  }, [aiBudget, aiDuration, aiDestination]);

  // ── persist ───────────────────────────────────────────────────────────────
  useEffect(() => persist(SK.ESTIMATOR, est), [est]);
  useEffect(() => persist(SK.EXPENSES, expenses), [expenses]);
  useEffect(() => persist(SK.DAILY, dailyMap), [dailyMap]);

  // ── keep newExp day in range when duration changes ────────────────────────
  useEffect(() => {
    setNewExp((p) => ({ ...p, day: Math.min(p.day, est.tripDuration) }));
    setSelectedDay((p) => Math.min(p, est.tripDuration));
  }, [est.tripDuration]);

  // ── computed totals ───────────────────────────────────────────────────────
  const calcEstimatedTotal = useCallback(() => {
    const food   = est.dailyFood            * est.tripDuration * SIM_MULT.food[sim.foodMode];
    const trans  = est.dailyTransport       * est.tripDuration * SIM_MULT.transport[sim.transportMode];
    const stay   = est.nightlyAccommodation * est.tripDuration * SIM_MULT.stay[sim.stayMode];
    return Math.round(food + trans + stay + est.entryFees + est.shoppingAllowance + est.miscAllowance + est.flights + est.visa + est.insurance);
  }, [est, sim]);

  const baseTotalNoSim = useMemo(() => {
    return Math.round(
      est.dailyFood * est.tripDuration +
      est.dailyTransport * est.tripDuration +
      est.nightlyAccommodation * est.tripDuration +
      est.entryFees + est.shoppingAllowance + est.miscAllowance +
      est.flights + est.visa + est.insurance
    );
  }, [est]);

  const totalBudget   = calcEstimatedTotal();
  const totalSpent    = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const remaining     = totalBudget - totalSpent;
  const spentPct      = pct(totalSpent, totalBudget);

  const catTotals = useMemo(() =>
    CATS.map((c) => ({
      ...c,
      spent: expenses.filter((e) => e.category === c.id).reduce((s, e) => s + e.amount, 0),
    })),
    [expenses]
  );

  // per-day data
  const getDayData = useCallback((day) => {
    const items = expenses.filter((e) => e.day === day);
    const spent = items.reduce((s, e) => s + e.amount, 0);
    return { items, spent };
  }, [expenses]);

  const dailyAllowed = totalBudget > 0 ? totalBudget / est.tripDuration : 0;

  const alerts = useMemo(() => {
    const a = [];
    if (spentPct >= 100) a.push({ type: "danger", msg: `🚨 Budget exceeded by ${fmt(Math.abs(remaining))}!` });
    else if (spentPct >= 80) a.push({ type: "warning", msg: `⚠️ ${spentPct}% of budget used — watch your spending.` });
    expenses.forEach((e) => {
      const dayAllowed = dailyAllowed;
      const daySpent = getDayData(e.day).spent;
      if (daySpent > dayAllowed && dayAllowed > 0) {
        // only push once per day
      }
    });
    // per-day alerts
    for (let d = 1; d <= est.tripDuration; d++) {
      const { spent } = getDayData(d);
      if (spent > dailyAllowed && dailyAllowed > 0) {
        a.push({ type: "warning", msg: `Day ${d} over daily budget (${fmt(spent)} / ${fmt(dailyAllowed)})` });
      }
    }
    return a.slice(0, 3);
  }, [spentPct, remaining, expenses, dailyAllowed, getDayData, est.tripDuration]);

  // ── handlers ──────────────────────────────────────────────────────────────
  const updateEst = (k, v) => setEst((p) => ({ ...p, [k]: v }));
  const updateSim = (k, v) => setSim((p) => ({ ...p, [k]: v }));

  const handleAddExpense = () => {
    if (!newExp.amount || Number(newExp.amount) <= 0) return;
    const e = {
      id: Date.now(),
      category: newExp.category,
      amount:   Number(newExp.amount),
      note:     newExp.note.trim(),
      day:      Number(newExp.day),
      date:     newExp.date || today(),
    };
    setExpenses((prev) => [e, ...prev]);
    setNewExp((p) => ({ ...p, amount: "", note: "" }));
    setShowAddForm(false);
  };

  const handleDeleteExpense = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setDeletingId(null);
    }, 250);
  };

  const handleReset = () => {
    if (!window.confirm("Reset ALL budget data? This cannot be undone.")) return;
    const def = mkDefaultEstimator();
    setEst(def);
    setExpenses([]);
    setDailyMap({});
    setSim({ transportMode: "taxi", foodMode: "restaurant", stayMode: "hotel" });
    [SK.ESTIMATOR, SK.EXPENSES, SK.DAILY].forEach((k) => localStorage.removeItem(k));
  };

  // ── UI helpers ────────────────────────────────────────────────────────────
  const SimToggle = ({ label, Icon, options, field }) => (
    <div className="bg-surface-50 dark:bg-surface-800/60 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} className="text-surface-500" />
        <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateSim(field, opt.value)}
            className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              sim[field] === opt.value
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-primary-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-surface-400 mt-2">{options.find(o => o.value === sim[field])?.desc}</p>
    </div>
  );

  // ── AI budget section ─────────────────────────────────────────────────────
  const AiBudgetPanel = () => {
    if (!aiBudget) return (
      <GlassCard hover={false} className="mb-6 border-dashed border-2 border-surface-200 dark:border-surface-700">
        <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-500/15 flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-primary-500" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-surface-900 dark:text-surface-100">No AI itinerary budget loaded</p>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
              Generate a trip to auto-populate estimator with flights, visa, accommodation &amp; more.
            </p>
          </div>
          <Link to="/plan" className="btn-primary text-sm flex-shrink-0">Plan a Trip</Link>
        </div>
      </GlassCard>
    );

    const rows = [
      { label: "Accommodation", val: aiBudget.accommodation, Icon: Hotel,       cls: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
      { label: "Food",          val: aiBudget.food,          Icon: Utensils,    cls: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
      { label: "Transport",     val: aiBudget.transport,     Icon: Bus,         cls: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-500/10" },
      { label: "Activities",    val: aiBudget.activities,    Icon: Ticket,      cls: "text-green-500",  bg: "bg-green-50 dark:bg-green-500/10" },
      { label: "Misc",          val: aiBudget.miscellaneous, Icon: MoreHorizontal, cls: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-500/10" },
      ...(aiBudget.flights  > 0 ? [{ label: "Flights",  val: aiBudget.flights,  Icon: PlaneTakeoff, cls: "text-sky-500",    bg: "bg-sky-50 dark:bg-sky-500/10" }] : []),
      ...(aiBudget.visa     > 0 ? [{ label: "Visa",     val: aiBudget.visa,     Icon: FileCheck,    cls: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" }] : []),
      ...(aiBudget.insurance> 0 ? [{ label: "Insurance",val: aiBudget.insurance,Icon: Shield,       cls: "text-rose-500",  bg: "bg-rose-50 dark:bg-rose-500/10" }] : []),
    ];

    return (
      <GlassCard hover={false} className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
              <Sparkles size={18} className="text-primary-500" />
              AI Budget Estimate
              {aiDestination && <span className="text-sm font-normal text-surface-400">— {aiDestination}</span>}
            </h2>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              Auto-loaded from your generated itinerary · {aiDuration} days
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-surface-400">Grand Total</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{fmt(aiBudget.total)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-4">
          {rows.map(({ label, val, Icon, cls, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-3`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className={cls} />
                <p className="text-xs text-surface-500 dark:text-surface-400 truncate">{label}</p>
              </div>
              <p className={`text-sm font-bold ${cls}`}>{fmt(val)}</p>
            </div>
          ))}
        </div>

        {aiBudget.currency_note && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-800/30 mb-3">
            <CreditCard size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400">{aiBudget.currency_note}</p>
          </div>
        )}

        {aiBudget.budget_tips?.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer text-xs font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 select-none">
              <Info size={12} /> Budget Tips ({aiBudget.budget_tips.length})
            </summary>
            <ul className="mt-2 space-y-1 pl-4">
              {aiBudget.budget_tips.map((t, i) => (
                <li key={i} className="text-xs text-surface-600 dark:text-surface-400 flex items-start gap-1.5">
                  <span className="text-primary-400 mt-0.5 shrink-0">•</span>{t}
                </li>
              ))}
            </ul>
          </details>
        )}

        {aiBudget.trade_offs?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 mb-2">💡 Trade-offs</p>
            <div className="space-y-1.5">
              {aiBudget.trade_offs.slice(0, 3).map((t, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2 text-xs bg-surface-50 dark:bg-surface-800 rounded-lg px-3 py-1.5">
                  <span className="capitalize font-medium text-surface-700 dark:text-surface-300 w-16 shrink-0">{t.category}</span>
                  <span className="text-rose-400 line-through">{t.comfort_option}</span>
                  <span className="text-emerald-500">→ {t.budget_option}</span>
                  <span className="ml-auto font-semibold text-emerald-600 dark:text-emerald-400">saves {t.savings}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    );
  };

  // ── TABS ──────────────────────────────────────────────────────────────────
  const EstimatorTab = () => (
    <GlassCard>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
          <Calculator size={18} className="text-primary-500" /> Trip Expense Estimator
        </h2>
        {aiBudget && (
          <span className="text-xs px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1">
            <Sparkles size={10} /> AI-filled
          </span>
        )}
      </div>

      {/* destination + duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-surface-800/60 rounded-xl p-4 border border-surface-100 dark:border-surface-700/60">
          <label className="text-xs font-medium text-surface-500 dark:text-surface-400 mb-2 flex items-center gap-1.5">
            <MapPin size={13} /> Destination
          </label>
          <input
            type="text"
            value={est.destination}
            onChange={(e) => updateEst("destination", e.target.value)}
            placeholder="e.g. Bangkok, Thailand"
            className="w-full px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <NumInput label="Trip Duration (days)" value={est.tripDuration} onChange={(v) => updateEst("tripDuration", Math.max(1, v))} prefix="" suffix="days" icon={CalendarDays} min={1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <NumInput label="Daily Food Budget"        value={est.dailyFood}            onChange={(v) => updateEst("dailyFood", v)}            icon={Utensils} />
        <NumInput label="Daily Transport"          value={est.dailyTransport}       onChange={(v) => updateEst("dailyTransport", v)}       icon={Bus} />
        <NumInput label="Accommodation / Night"    value={est.nightlyAccommodation} onChange={(v) => updateEst("nightlyAccommodation", v)} icon={Hotel} />
        <NumInput label="Activities & Entry Fees"  value={est.entryFees}            onChange={(v) => updateEst("entryFees", v)}            icon={Ticket} />
        <NumInput label="Shopping Allowance"       value={est.shoppingAllowance}    onChange={(v) => updateEst("shoppingAllowance", v)}    icon={ShoppingBag} />
        <NumInput label="Miscellaneous"            value={est.miscAllowance}        onChange={(v) => updateEst("miscAllowance", v)}        icon={MoreHorizontal} />
        <NumInput label="Flights (round-trip)"     value={est.flights}              onChange={(v) => updateEst("flights", v)}              icon={PlaneTakeoff} />
        <NumInput label="Visa Fee"                 value={est.visa}                 onChange={(v) => updateEst("visa", v)}                 icon={FileCheck} />
        <NumInput label="Travel Insurance"         value={est.insurance}            onChange={(v) => updateEst("insurance", v)}            icon={Shield} />
      </div>

      {/* estimated total */}
      <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
