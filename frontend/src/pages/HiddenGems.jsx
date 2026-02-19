// HiddenGems Page - Local hidden gems discovery
import React, { useState, useEffect } from 'react';
import { Star, Search, MapPin, Plus, Heart, TrendingUp } from 'lucide-react';
import { hiddenGemsApi } from '../services/api';

function HiddenGems() {
  const [city, setCity] = useState('');
  const [gems, setGems] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  useEffect(() => {
    loadFeatured();
  }, []);
  
  const loadFeatured = async () => {
    try {
      const data = await hiddenGemsApi.getFeatured();
      setFeatured(data);
    } catch (error) {
      console.error('Failed to load featured gems:', error);
    }
  };
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    setIsLoading(true);
    try {
      const data = await hiddenGemsApi.getByCity(city);
      setGems(data);
    } catch (error) {
      console.error('Failed to load gems:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const [submitForm, setSubmitForm] = useState({
    name: '',
    city: '',
    description: '',
    category: 'food',
    local_tip: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await hiddenGemsApi.submit({
        ...submitForm,
        location: { lat: 0, lng: 0 },
        submitted_by: 'anonymous',
      });
      alert('Hidden gem submitted for review!');
      setShowSubmitForm(false);
      setSubmitForm({ name: '', city: '', description: '', category: 'food', local_tip: '' });
    } catch (error) {
      console.error('Failed to submit gem:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent-600 to-accent-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Star size={32} />
            Hidden Gems
          </h1>
          <p className="text-accent-100 text-lg">
            Discover local favorites that tourists miss
          </p>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search city..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-accent-300 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-accent-600 rounded-xl font-semibold hover:bg-accent-50 transition-colors"
              >
                Discover
              </button>
            </div>
          </form>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured gems */}
        {featured.length > 0 && !gems.length && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-accent-500" />
              Featured Hidden Gems
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((gem) => (
                <div key={gem.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{gem.name}</h3>
                      <p className="text-sm text-gray-500">{gem.city}</p>
                    </div>
                    <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs">
                      {gem.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{gem.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{gem.rating}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">Low popularity</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Search results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-accent-500 border-t-transparent rounded-full" />
          </div>
        ) : gems.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Hidden Gems in {city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gems.map((gem) => (
                <div key={gem.gemId || gem.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{gem.name}</h3>
                      <span className="text-xs text-gray-500 uppercase">{gem.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} className="fill-yellow-500" />
                      <span className="font-medium text-gray-900">{gem.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{gem.description}</p>
                  {gem.localTip && (
                    <div className="bg-accent-50 rounded-lg p-3 text-sm">
                      <span className="font-medium text-accent-700">Local tip: </span>
                      <span className="text-accent-600">{gem.localTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}
        
        {/* Submit button */}
        <button
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-accent-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent-600 transition-colors"
        >
          <Plus size={24} />
        </button>
        
        {/* Submit form modal */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submit a Hidden Gem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                  <input
                    type="text"
                    value={submitForm.name}
                    onChange={(e) => setSubmitForm({ ...submitForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={submitForm.city}
                    onChange={(e) => setSubmitForm({ ...submitForm, city: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={submitForm.category}
                    onChange={(e) => setSubmitForm({ ...submitForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                  >
                    <option value="food">Food</option>
                    <option value="nature">Nature</option>
                    <option value="culture">Culture</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="shopping">Shopping</option>
                    <option value="viewpoint">Viewpoint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={submitForm.description}
                    onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Local Tip</label>
                  <input
                    type="text"
                    value={submitForm.local_tip}
                    onChange={(e) => setSubmitForm({ ...submitForm, local_tip: e.target.value })}
                    placeholder="Any insider advice?"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HiddenGems;
