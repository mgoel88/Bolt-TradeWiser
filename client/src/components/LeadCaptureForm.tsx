import { useState } from 'react';


type ServiceType = 'trading' | 'market_prices' | 'warehousing' | 'quality_check';

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  service_type: ServiceType;
  commodity: string;
  quantity: string;
  location: string;
  trade_type?: 'buy' | 'sell';
  quality_grade?: string;
  duration?: string;
  inspection_type?: string;
  target_price?: string;
}

const COMMODITIES = [
  'Wheat', 'Rice', 'Maize', 'Barley', 'Soybean', 'Mustard', 'Cotton',
  'Sugarcane', 'Pulses', 'Groundnut', 'Sunflower', 'Other'
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
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service_type: activeTab })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          service_type: activeTab,
          commodity: '',
          quantity: '',
          location: ''
        });
        
        // Show success for 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-md font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#0A2E50] text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            } ${tab.priority ? 'ring-2 ring-[#B88A3D] ring-opacity-50' : ''}`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {tab.priority && <span className="ml-2 text-[#B88A3D]">★</span>}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
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
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Service-Specific Fields */}
            {activeTab === 'trading' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option value="">Select commodity</option>
                      {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trade Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="trade_type"
                          value="buy"
                          checked={formData.trade_type === 'buy'}
                          onChange={(e) => setFormData({ ...formData, trade_type: e.target.value as 'buy' | 'sell' })}
                          className="mr-2"
                        />
                        Buy
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="trade_type"
                          value="sell"
                          checked={formData.trade_type === 'sell'}
                          onChange={(e) => setFormData({ ...formData, trade_type: e.target.value as 'buy' | 'sell' })}
                          className="mr-2"
                        />
                        Sell
                      </label>
                    </div>
                  </div>
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
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Price (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.target_price || ''}
                    onChange={(e) => setFormData({ ...formData, target_price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="e.g., ₹2,500 per quintal"
                  />
                </div>
              </>
            )}

            {activeTab === 'market_prices' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option value="">Select commodity</option>
                      {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quality Grade
                    </label>
                    <input
                      type="text"
                      value={formData.quality_grade || ''}
                      onChange={(e) => setFormData({ ...formData, quality_grade: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                      placeholder="e.g., Grade A, FAQ"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>
              </>
            )}

            {activeTab === 'warehousing' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option value="">Select commodity</option>
                      {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

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
                      placeholder="e.g., 500 quintals"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration Needed <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                      placeholder="e.g., 3 months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location Preference <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'quality_check' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option value="">Select commodity</option>
                      {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inspection Type
                    </label>
                    <select
                      value={formData.inspection_type || ''}
                      onChange={(e) => setFormData({ ...formData, inspection_type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0A2E50] focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="Moisture">Moisture Content</option>
                      <option value="Purity">Purity Test</option>
                      <option value="Grading">Grading</option>
                      <option value="Full">Full Inspection</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B88A3D] hover:bg-[#9A7333] text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get Quote in 30 Minutes'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                ✓ Thank you! We'll contact you on WhatsApp within 30 minutes.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                ✗ Something went wrong. Please try again or call us at +91 7982985895.
              </div>
            )}
          </form>
      </div>
    </div>
  );
}
