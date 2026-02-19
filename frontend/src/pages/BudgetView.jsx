// BudgetView Page - Budget management with graphs
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, Trash2, DollarSign, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AnimatedPage, { StaggerContainer, staggerItem } from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

const defaultCategories = [
  { name: 'Accommodation', emoji: '🏨', color: 'bg-blue-500', budget: 800, spent: 620 },
  { name: 'Food & Dining', emoji: '🍽️', color: 'bg-amber-500', budget: 400, spent: 280 },
  { name: 'Transport', emoji: '🚕', color: 'bg-emerald-500', budget: 300, spent: 190 },
  { name: 'Activities', emoji: '🎭', color: 'bg-violet-500', budget: 500, spent: 350 },
  { name: 'Shopping', emoji: '🛍️', color: 'bg-pink-500', budget: 200, spent: 150 },
  { name: 'Miscellaneous', emoji: '📦', color: 'bg-cyan-500', budget: 150, spent: 80 },
];

function BudgetView() {
  const [categories, setCategories] = useState(defaultCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const totalBudget = categories.reduce((a, c) => a + c.budget, 0);
  const totalSpent = categories.reduce((a, c) => a + c.spent, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = Math.round((totalSpent / totalBudget) * 100);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.category || !newExpense.amount) return;
    setCategories(prev => prev.map(c =>
      c.name === newExpense.category
        ? { ...c, spent: c.spent + parseFloat(newExpense.amount) }
        : c
    ));
    setNewExpense({ category: '', amount: '' });
    setShowAdd(false);
  };

  return (
    <AnimatedPage className="max-w-5xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
            <Wallet size={24} className="text-emerald-500" />
            Budget Tracker
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Manage your trip expenses</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Overview Cards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div variants={staggerItem}>
          <GlassCard hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
                <DollarSign size={22} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-surface-400 font-medium">Total Budget</p>
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">${totalBudget.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">${totalSpent.toLocaleString()}</p>
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
                <p className="text-xs text-surface-400 font-medium">Remaining</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${remaining.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </StaggerContainer>

      {/* Chart + Add Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Donut Chart */}
        <GlassCard hover={false} className="lg:col-span-1 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                className="stroke-surface-200 dark:stroke-surface-700" />
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10"
                strokeDasharray={`${spentPercent * 2.64} 264`} strokeLinecap="round"
                className={spentPercent > 90 ? 'stroke-rose-500' : spentPercent > 70 ? 'stroke-amber-500' : 'stroke-emerald-500'}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-surface-900 dark:text-surface-100">{spentPercent}%</span>
              <span className="text-xs text-surface-400">used</span>
            </div>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400 text-center">
            ${remaining.toLocaleString()} left of ${totalBudget.toLocaleString()}
          </p>
        </GlassCard>

        {/* Categories */}
        <div className="lg:col-span-2 space-y-3">
          {categories.map((cat, i) => {
            const percent = Math.round((cat.spent / cat.budget) * 100);
            return (
              <motion.div key={cat.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-surface-900 dark:text-surface-100">{cat.name}</span>
                    <span className="text-xs text-surface-400">${cat.spent} / ${cat.budget}</span>
                  </div>
                  <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${percent > 90 ? 'bg-rose-500' : percent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percent, 100)}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-semibold ${percent > 90 ? 'text-rose-500' : percent > 70 ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {percent}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Form */}
      {showAdd && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard hover={false}>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4">Add Expense</h3>
            <form onSubmit={handleAddExpense} className="flex flex-col sm:flex-row gap-4">
              <select value={newExpense.category}
                onChange={e => setNewExpense(p => ({ ...p, category: e.target.value }))}
                className="input-field flex-1" required
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
              </select>
              <div className="relative flex-1">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type="number" value={newExpense.amount}
                  onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))}
                  className="input-field pl-10" placeholder="Amount" min="0" step="0.01" required
                />
              </div>
              <button type="submit" className="btn-primary text-sm">Add</button>
            </form>
          </GlassCard>
        </motion.div>
      )}
    </AnimatedPage>
  );
}

export default BudgetView;
