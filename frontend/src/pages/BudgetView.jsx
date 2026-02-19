// BudgetView Page - Budget breakdown and trade-off calculator
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, PieChart, TrendingDown } from 'lucide-react';
import BudgetCalculator from '../components/BudgetCalculator';
import { useTrip } from '../context/TripContext';

function BudgetView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useTrip();
  
  const budget = location.state?.budget || state.currentTrip?.budget;
  
  if (!budget) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Budget Data</h2>
          <p className="text-gray-600 mb-4">Generate an itinerary first to see budget details</p>
          <button
            onClick={() => navigate('/plan')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Create Itinerary
          </button>
        </div>
      </div>
    );
  }
  
  const categories = [
    { key: 'accommodation', label: 'Accommodation', color: 'bg-blue-500' },
    { key: 'food', label: 'Food & Dining', color: 'bg-green-500' },
    { key: 'transport', label: 'Transportation', color: 'bg-yellow-500' },
    { key: 'activities', label: 'Activities', color: 'bg-purple-500' },
    { key: 'miscellaneous', label: 'Miscellaneous', color: 'bg-gray-500' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Itinerary
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="text-primary-500" />
            Trip Budget
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Total budget card */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-1">Estimated Total Budget</p>
              <p className="text-4xl font-bold">${budget.total?.toFixed(0) || 0}</p>
            </div>
            <PieChart size={64} className="opacity-50" />
          </div>
        </div>
        
        {/* Budget breakdown chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Budget Breakdown</h2>
          
          {/* Visual bar chart */}
          <div className="space-y-4 mb-6">
            {categories.map((cat) => {
              const value = budget[cat.key] || 0;
              const percentage = ((value / budget.total) * 100) || 0;
              
              return (
                <div key={cat.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{cat.label}</span>
                    <span className="font-medium text-gray-900">
                      ${value.toFixed(0)} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Trade-off calculator */}
        <BudgetCalculator 
          budget={budget} 
          tradeOffs={budget.trade_offs || []}
        />
        
        {/* Affiliate section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Save on Your Trip</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://booking.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Book Accommodation</h3>
              <p className="text-sm text-gray-500">Find deals on hotels and hostels</p>
            </a>
            <a
              href="https://getyourguide.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-500 transition-colors"
            >
              <h3 className="font-medium text-gray-900">Book Activities</h3>
              <p className="text-sm text-gray-500">Tours, tickets, and experiences</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BudgetView;
