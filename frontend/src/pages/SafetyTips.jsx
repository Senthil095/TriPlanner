// SafetyTips Page - Solo travel safety information
import React, { useState, useEffect } from 'react';
import { metaApi } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Phone, MapPin, ChevronDown, ChevronUp,
  Heart, Eye, Lock, Wifi, Battery, Users, Globe, ShieldCheck
} from 'lucide-react';
import AnimatedPage, { StaggerContainer, staggerItem } from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

const iconMap = {
  Globe, Lock, Heart, Wifi, Eye, Phone
};

function SafetyTips() {
  const [openIndex, setOpenIndex] = useState(0);
  const [safetyCategories, setSafetyCategories] = useState([]);
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        const [tipsData, numbersData] = await Promise.all([
          metaApi.get('safety_tips'),
          metaApi.get('emergency_numbers')
        ]);

        setSafetyCategories(tipsData.categories || []);
        setEmergencyNumbers(numbersData.numbers || []);
      } catch (error) {
        console.error('Failed to fetch safety data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSafetyData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatedPage className="max-w-4xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/20">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">Safety Guide</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-2">Essential safety tips for solo travelers</p>
      </motion.div>

      {/* SOS Banner */}
      <motion.div
        className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Emergency SOS</h3>
            <p className="text-white/80 text-sm">In an emergency, TriPlanner can auto-alert your guardian with your live location. Enable it in your profile settings.</p>
          </div>
        </div>
      </motion.div>

      {/* Safety Categories */}
      <div className="space-y-4 mb-10">
        {safetyCategories.map((cat, index) => {
          const Icon = iconMap[cat.icon] || Shield;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard hover={false} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex items-center gap-4 w-full text-left"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 flex-1">{cat.title}</h3>
                  <span className="text-xs text-surface-400 mr-2">{cat.tips.length} tips</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-surface-400" />
                  ) : (
                    <ChevronDown size={18} className="text-surface-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-3 pl-14">
                        {cat.tips.map((tip, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-3 text-sm text-surface-600 dark:text-surface-300"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Emergency Numbers */}
      <GlassCard hover={false}>
        <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
          <Phone size={18} className="text-red-500" />
          Emergency Numbers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyNumbers.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">{item.country}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">{item.number}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AnimatedPage>
  );
}

export default SafetyTips;
