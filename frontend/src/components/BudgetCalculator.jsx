// BudgetCalculator Component - Interactive budget comparison tool
import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, TrendingDown, TrendingUp } from 'lucide-react';

function BudgetCalculator({ budget, tradeOffs = [] }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const categories = [
    { key: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { key: 'food', label: 'Food', icon: '🍽️' },
    { key: 'transport', label: 'Transport', icon: '🚕' },
    { key: 'activities', label: 'Activities', icon: '🎭' },
    { key: 'miscellaneous', label: 'Miscellaneous', icon: '🎁' },
  ];
  
  const calculateSavings = () => {
    let savings = 0;
    tradeOffs.forEach((tradeOff) => {
      if (selectedOptions[tradeOff.category] === 'budget') {
        const savingsAmount = parseFloat(tradeOff.savings?.replace('$', '') || 0);
        savings += savingsAmount;
      }
    });
    return savings;
  };
  
  const totalSavings = calculateSavings();
  const adjustedTotal = (budget?.total || 0) - totalSavings;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Budget Calculator</h3>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingDown size={20} />
          <span className="font-semibold">Save ${totalSavings.toFixed(0)}</span>
        </div>
      </div>
      
      {/* Budget breakdown */}
      <div className="space-y-4 mb-6">
        {categories.map((category) => (
          <div key={category.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{category.icon}</span>
              <span className="text-gray-700">{category.label}</span>
            </div>
            <span className="font-semibold text-gray-900">
              ${budget?.[category.key]?.toFixed(0) || 0}
            </span>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="font-semibold text-gray-900">Original Total</span>
          <span className="font-bold text-xl text-gray-900">
            ${budget?.total?.toFixed(0) || 0}
          </span>
        </div>
        
        {totalSavings > 0 && (
          <div className="flex items-center justify-between text-green-600">
            <span className="font-semibold">Adjusted Total</span>
            <span className="font-bold text-xl">${adjustedTotal.toFixed(0)}</span>
          </div>
        )}
      </div>
      
      {/* Trade-off calculator */}
      {tradeOffs.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRightLeft size={18} />
            Budget Trade-offs
          </h4>
          
          <div className="space-y-4">
            {tradeOffs.map((tradeOff, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700 capitalize">
                    {tradeOff.category}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Save {tradeOff.savings}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedOptions({
                      ...selectedOptions,
                      [tradeOff.category]: 'budget',
                    })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedOptions[tradeOff.category] === 'budget'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">Budget</div>
                    <div className="text-xs text-gray-500">{tradeOff.budget_option}</div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedOptions({
                      ...selectedOptions,
                      [tradeOff.category]: 'comfort',
                    })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedOptions[tradeOff.category] === 'comfort'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">Comfort</div>
                    <div className="text-xs text-gray-500">{tradeOff.comfort_option}</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Budget tips */}
      {budget?.budget_tips && budget.budget_tips.length > 0 && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign size={18} />
            Money-Saving Tips
          </h4>
          <ul className="space-y-2">
            {budget.budget_tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BudgetCalculator;
