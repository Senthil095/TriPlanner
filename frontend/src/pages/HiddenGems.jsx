// HiddenGems Page - Discovery platform with glassmorphism cards
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, MapPin, Plus, Heart, TrendingUp, Filter, Sparkles, Loader2 } from 'lucide-react';
import { hiddenGemsApi } from '../services/api';
import AnimatedPage, { StaggerContainer, staggerItem } from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

// Demo gems removed - fetching from API
const demoGems = [];

function HiddenGems() {
  const [gems, setGems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [likedGems, setLikedGems] = useState(new Set());

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, featured] = await Promise.all([
          hiddenGemsApi.getCategories(),
          hiddenGemsApi.getFeatured()
        ]);

        // Capitalize categories for display matching
        const formattedCats = ['All', ...cats.map(c => c.charAt(0).toUpperCase() + c.slice(1))];
        setCategories(formattedCats);
        setGems(featured);
      } catch (err) {
        console.error("Failed to fetch gems data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Submission form state
  const [newGem, setNewGem] = useState({
    name: '', category: '', location: '', description: '',
  });

  const filteredGems = gems.filter(g => {
    // Handle case where location might be missing in API response (use city instead if needed)
    const loc = g.location || g.city || '';
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id) => {
    setLikedGems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hiddenGemsApi.submit(newGem);
      setShowSubmit(false);
      setNewGem({ name: '', category: '', location: '', description: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatedPage className="max-w-7xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
          <Sparkles size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">Hidden Gems</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-2">Discover local favorites and secret spots worldwide</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-lg mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-12 pr-4"
            placeholder="Search gems by name or location..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add Gem Button */}
      <div className="flex justify-end mb-6">
        <button onClick={() => setShowSubmit(!showSubmit)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} />
          Submit a Gem
        </button>
      </div>

      {/* Submit Form */}
      {showSubmit && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
          <GlassCard hover={false}>
            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4">Share Your Discovery</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" value={newGem.name} onChange={e => setNewGem(p => ({ ...p, name: e.target.value }))}
                className="input-field" placeholder="Gem name" required />
              <select value={newGem.category} onChange={e => setNewGem(p => ({ ...p, category: e.target.value }))}
                className="input-field" required>
                <option value="">Category</option>
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" value={newGem.location} onChange={e => setNewGem(p => ({ ...p, location: e.target.value }))}
                className="input-field" placeholder="Location (City, Country)" required />
              <textarea value={newGem.description} onChange={e => setNewGem(p => ({ ...p, description: e.target.value }))}
                className="input-field resize-none" placeholder="Describe this hidden gem..." rows={2} required />
              <div className="sm:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowSubmit(false)} className="btn-secondary text-sm">Cancel</button>
                <button type="submit" className="btn-primary text-sm">Submit Gem</button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}

      {/* Gems Grid */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGems.map(gem => (
          <motion.div key={gem.id} variants={staggerItem}>
            <GlassCard className="h-full" hover>
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-medium">
                  {gem.category}
                </span>
                <button onClick={() => toggleLike(gem.id)} className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  <Heart size={18} className={likedGems.has(gem.id) ? 'text-rose-500 fill-rose-500' : 'text-surface-400'} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-1">{gem.name}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1 mb-3">
                <MapPin size={14} />
                {gem.location || gem.city}
              </p>
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed mb-4">{gem.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-surface-900 dark:text-surface-100">{gem.rating}</span>
                </div>
                <span className="text-xs text-surface-400 flex items-center gap-1">
                  <Heart size={12} />
                  {(gem.likes || 0) + (likedGems.has(gem.id) ? 1 : 0)} likes
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </StaggerContainer>

      {filteredGems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-surface-400" />
          </div>
          <p className="text-surface-500 dark:text-surface-400">No gems found matching your search.</p>
        </div>
      )}
    </AnimatedPage>
  );
}

export default HiddenGems;
