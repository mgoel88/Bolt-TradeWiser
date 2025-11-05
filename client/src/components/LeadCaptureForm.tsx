import { useState } from 'react';

type ServiceType = 'trading' | 'market_prices' | 'warehousing' | 'quality_check';

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  service_type: ServiceType;
  commodity: string;
  quantity: string;
  quantity_uom: string;
  location: string;
  trade_type?: 'buy' | 'sell';
  quality_grade?: string;
  duration?: string;
  inspection_type?: string;
  min_price?: string;
  max_price?: string;
}

const COMMODITIES = [
  'Wheat', 'Rice', 'Maize', 'Barley', 'Soybean', 'Mustard', 'Cotton',
  'Sugarcane', 'Pulses', 'Groundnut', 'Sunflower', 'Chickpeas', 'Lentils',
  'Turmeric', 'Coriander', 'Cumin', 'Chilli', 'Ginger', 'Garlic', 'Onion',
  'Potato', 'Tomato', 'Tea', 'Coffee', 'Rubber', 'Jute', 'Castor', 'Other'
];

const UOM_OPTIONS = ['Quintals', 'Tonnes', 'KGs'];

const INDIAN_CITIES = [
  'All India',
  'Andhra Pradesh - Hyderabad',
  'Andhra Pradesh - Vijayawada',
  'Andhra Pradesh - Visakhapatnam',
  'Gujarat - Ahmedabad',
  'Gujarat - Surat',
  'Gujarat - Vadodara',
  'Gujarat - Rajkot',
  'Haryana - Gurgaon',
  'Haryana - Faridabad',
  'Karnataka - Bangalore',
  'Karnataka - Mysore',
  'Karnataka - Mangalore',
  'Maharashtra - Mumbai',
  'Maharashtra - Pune',
  'Maharashtra - Nagpur',
  'Maharashtra - Nashik',
  'Punjab - Chandigarh',
  'Punjab - Ludhiana',
  'Punjab - Amritsar',
  'Rajasthan - Jaipur',
  'Rajasthan - Jodhpur',
  'Tamil Nadu - Chennai',
  'Tamil Nadu - Coimbatore',
  'Uttar Pradesh - Lucknow',
  'Uttar Pradesh - Kanpur',
  'West Bengal - Kolkata'
];

export default function LeadCaptureForm() {
  const [activeTab, setActiveTab] = useState<ServiceType>('trading');
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    service_type: 'trading',
    commodity: '',
    quantity: '',
    quantity_uom: 'Quintals',
    location: 'All India',
    trade_type: 'buy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCommodityDropdown, setShowCommodityDropdown] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [commoditySearch, setCommoditySearch] = useState('');

  const tabs = [
    { id: 'trading' as ServiceType, label: 'Trading', icon: '💰', priority: true },
    { id: 'market_prices' as ServiceType, label: 'Market Prices', icon: '📊' },
    { id: 'warehousing' as ServiceType, label: 'Warehousing', icon: '🏭' },
    { id: 'quality_check' as ServiceType, label: 'Quality Check', icon: '✓' }
  ];

  const handleTabChange = (tab: ServiceType) => {
    setActiveTab(tab);
    setFormData({ ...formData, service_type: tab });
    setSubmitStatus('idle');
  };

  const filteredCities = INDIAN_CITIES.filter(city =>
    city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredCommodities = COMMODITIES.filter(commodity =>
    commodity.toLowerCase().includes(commoditySearch.toLowerCase())
  );

  const handleLocationChange = (value: string) => {
    setLocationSearch(value);
    setFormData({ ...formData, location: value });
    setShowLocationDropdown(true);
  };

  const handleLocationSelect = (city: string) => {
    setFormData({ ...formData, location: city });
    setLocationSearch('');
    setShowLocationDropdown(false);
  };

  const handleCommodityChange = (value: string) => {
    setCommoditySearch(value);
    setFormData({ ...formData, commodity: value });
    setShowCommodityDropdown(true);
  };

  const handleCommoditySelect = (commodity: string) => {
    setFormData({ ...formData, commodity });
    setCommoditySearch('');
    setShowCommodityDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp message for Trading tab
    if (activeTab === 'trading') {
      const priceRange = formData.min_price || formData.max_price
        ? `₹${formData.min_price || '0'} - ₹${formData.max_price || 'Any'} per quintal`
        : 'Any';

      const quantityText = formData.quantity 
        ? `${formData.quantity} ${formData.quantity_uom}`
        : 'Not specified';

      const message = `📋 TradeWiser Quote Request

🔄 Trade Type: ${formData.trade_type?.toUpperCase()}
📦 Commodity: ${formData.commodity}
📊 Quantity: ${quantityText}
💰 Price Range: ${priceRange}
📍 Location: ${formData.location}

I'm interested in ${formData.trade_type === 'buy' ? 'buying' : 'selling'} ${formData.commodity} at the above specifications. Please provide a quote.

---
Via TradeWiser.in | India's #1 Commodity Trading Platform

📱 Download our app:
App Store: https://apps.apple.com/tradewiser
Play Store: https://play.google.com/store/apps/tradewiser`;

      const whatsappUrl = `https://api.whatsapp.com/send?phone=917982985895&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    // For other tabs, submit to API
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          service_type: activeTab,
          commodity: '',
          quantity: '',
          quantity_uom: 'Quintals',
          location: 'All India',
          trade_type: 'buy'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Get Started in 3 Simple Steps
      </h2>
      <p className="text-gray-600 mb-6">
        Choose your service, fill in the details, and get a quote within 30 minutes via WhatsApp
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? tab.priority
                  ? 'bg-[#0A2E50] text-white'
                  : 'bg-gray-200 text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.priority && <span className="text-yellow-400">★</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {activeTab === 'trading' && 'Get Quotes in 30 Minutes'}
          {activeTab === 'market_prices' && 'Live Market Rates'}
          {activeTab === 'warehousing' && 'Storage Solutions'}
          {activeTab === 'quality_check' && 'Quality Assurance'}
        </h3>
        <p className="text-gray-600 text-sm">
          {activeTab === 'trading' && 'Commodity to Capital - No Registration Required'}
          {activeTab === 'market_prices' && 'Real-time pricing from 500+ mandis across India'}
          {activeTab === 'warehousing' && 'Secure storage facilities with quality preservation'}
          {activeTab === 'quality_check' && 'Professional quality testing and certification'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trading Tab - Updated with quantity+UOM and commodity autocomplete */}
          {activeTab === 'trading' && (
            <>
              {/* Trade Type - Toggle Pills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trade Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, trade_type: 'buy' })}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                      formData.trade_type === 'buy'
                        ? 'bg-[#B8860B] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, trade_type: 'sell' })}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                      formData.trade_type === 'sell'
                        ? 'bg-[#8B5CF6] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              {/* Commodity - Autocomplete */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commodity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.commodity}
                  onChange={(e) => handleCommodityChange(e.target.value)}
                  onFocus={() => setShowCommodityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCommodityDropdown(false), 200)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  placeholder="Type commodity name or select from list..."
                />
                {showCommodityDropdown && filteredCommodities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredCommodities.map((commodity, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleCommoditySelect(commodity)}
                        className="w-full text-left px-4 py-2 hover:bg-[#B8860B] hover:bg-opacity-10 transition-colors"
                      >
                        {commodity}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity with UOM */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                      placeholder="Enter quantity"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.quantity_uom}
                      onChange={(e) => setFormData({ ...formData, quantity_uom: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                    >
                      {UOM_OPTIONS.map(uom => (
                        <option key={uom} value={uom}>{uom}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Range - Min/Max Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (₹/quintal) - Optional
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      value={formData.min_price || ''}
                      onChange={(e) => setFormData({ ...formData, min_price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                      placeholder="Min price (e.g., 5400)"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={formData.max_price || ''}
                      onChange={(e) => setFormData({ ...formData, max_price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                      placeholder="Max price (e.g., 6000)"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Location - Autocomplete */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => setShowLocationDropdown(true)}
                  onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                  placeholder="Type city name or select from list..."
                />
                {showLocationDropdown && filteredCities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredCities.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLocationSelect(city)}
                        className="w-full text-left px-4 py-2 hover:bg-[#B8860B] hover:bg-opacity-10 transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!formData.commodity || !formData.trade_type || !formData.quantity}
                  className="w-full bg-[#B8860B] hover:bg-[#9A7333] text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>📱</span>
                  Send Quote Request via WhatsApp
                </button>
              </div>

              <p className="text-center text-sm text-gray-600">
                ✓ Verified Partners • 30 Min Response • 100+ Traders
              </p>
            </>
          )}

          {/* Market Prices Tab - Unchanged */}
          {activeTab === 'market_prices' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commodity <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  <option value="">Select commodity...</option>
                  {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2E50] hover:bg-[#0A2E50]/90 text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Market Rates'}
                </button>
              </div>
            </>
          )}

          {/* Warehousing Tab - Unchanged */}
          {activeTab === 'warehousing' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commodity <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  <option value="">Select commodity...</option>
                  {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="e.g., 100 quintals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                  >
                    <option value="">Select duration...</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2E50] hover:bg-[#0A2E50]/90 text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Storage Quote'}
                </button>
              </div>
            </>
          )}

          {/* Quality Check Tab - Unchanged */}
          {activeTab === 'quality_check' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commodity <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  <option value="">Select commodity...</option>
                  {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="e.g., 100 quintals"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inspection Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.inspection_type}
                    onChange={(e) => setFormData({ ...formData, inspection_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                  >
                    <option value="">Select type...</option>
                    <option value="Basic">Basic Quality Check</option>
                    <option value="Standard">Standard Inspection</option>
                    <option value="Premium">Premium Certification</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                >
                  {INDIAN_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2E50] hover:bg-[#0A2E50]/90 text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quality Check'}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              ✓ Thank you! We'll contact you within 30 minutes.
            </p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              ✗ Something went wrong. Please try again or call us at +91 79829 85895
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
