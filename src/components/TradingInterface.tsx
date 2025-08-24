import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Package, DollarSign, TrendingUp, CheckCircle, ExternalLink, ShoppingCart, Truck } from 'lucide-react';

interface TradingData {
  category: string;
  commodity: string;
  quantity: number;
  unit: string;
  priceType: 'single' | 'range';
  singlePrice: number;
  minPrice: number;
  maxPrice: number;
  location: string;
}

const categories = {
  'grains': {
    name: 'Grains',
    icon: '🌾',
    commodities: [
      '1121 Golden Sella Basmati Rice',
      '1509 Basmati Rice',
      'Non-Basmati Rice',
      'Durum Wheat',
      'Common Wheat',
      'Corn/Maize',
      'Barley'
    ]
  },
  'pulses': {
    name: 'Pulses',
    icon: '🫛',
    commodities: [
      'Toor Dal (Arhar)',
      'Chana Dal',
      'Moong Dal',
      'Urad Dal',
      'Masoor Dal',
      'Rajma',
      'Kabuli Chana',
      'Desi Chana'
    ]
  },
  'spices': {
    name: 'Spices',
    icon: '🌶️',
    commodities: [
      'Turmeric Powder',
      'Coriander Seeds',
      'Cumin Seeds',
      'Red Chili',
      'Black Pepper',
      'Cardamom',
      'Cloves',
      'Cinnamon'
    ]
  },
  'cash-crops': {
    name: 'Cash Crops',
    icon: '🌱',
    commodities: [
      'Raw Cotton',
      'Sugarcane',
      'Groundnut',
      'Soybean',
      'Sunflower',
      'Mustard Seeds'
    ]
  }
};

const units = [
  { value: 'quintals', label: 'Quintals', suffix: 'qtl' },
  { value: 'tonnes', label: 'Tonnes', suffix: 'MT' },
  { value: 'bags', label: 'Bags (50kg)', suffix: 'bags' },
  { value: 'kg', label: 'Kilograms', suffix: 'kg' }
];

const indianCities = [
  'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Pune',
  'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Agra', 'Ludhiana', 'Nashik', 'Faridabad', 'Meerut',
  'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
  'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore',
  'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota'
];

export const TradingInterface: React.FC = () => {
  const [tradingData, setTradingData] = useState<TradingData>({
    category: '',
    commodity: '',
    quantity: 0,
    unit: 'quintals',
    priceType: 'range',
    singlePrice: 0,
    minPrice: 2000,
    maxPrice: 3500,
    location: ''
  });

  const [filteredCommodities, setFilteredCommodities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCommodityDropdown, setShowCommodityDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [tradeIntent, setTradeIntent] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    if (tradingData.category && categories[tradingData.category as keyof typeof categories]) {
      setFilteredCommodities(categories[tradingData.category as keyof typeof categories].commodities);
    }
  }, [tradingData.category]);

  const handleCommoditySearch = (value: string) => {
    setTradingData(prev => ({ ...prev, commodity: value }));
    if (tradingData.category && value.length > 0) {
      const filtered = categories[tradingData.category as keyof typeof categories].commodities
        .filter(commodity => commodity.toLowerCase().includes(value.toLowerCase()));
      setFilteredCommodities(filtered);
      setShowCommodityDropdown(true);
    } else {
      setShowCommodityDropdown(false);
    }
  };

  const handleLocationSearch = (value: string) => {
    setTradingData(prev => ({ ...prev, location: value }));
    if (value.length > 0) {
      const filtered = indianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 8));
      setShowLocationDropdown(true);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const priceText = tradingData.priceType === 'single' 
      ? `₹${tradingData.singlePrice.toLocaleString('en-IN')}`
      : `₹${tradingData.minPrice.toLocaleString('en-IN')} - ₹${tradingData.maxPrice.toLocaleString('en-IN')}`;

    const intentText = tradeIntent === 'buy' ? 'looking to buy' : 'have available for sale';
    const locationText = tradeIntent === 'buy' ? `Delivery to: ${tradingData.location}` : `Available at: ${tradingData.location}`;

    return `🌾 *TradeWiser - Agricultural Trading Request*

I'm ${intentText}:

📦 *Commodity:* ${tradingData.commodity}
⚖️ *Quantity:* ${tradingData.quantity} ${tradingData.unit}
💰 *Price:* ${priceText} per quintal
📍 *${locationText}*

Please connect me with verified ${tradeIntent === 'buy' ? 'sellers' : 'buyers'}.

_Generated via TradeWiser.com_`;
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917982985895?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormValid = () => {
    return tradingData.category && 
           tradingData.commodity && 
           tradingData.quantity > 0 && 
           tradingData.location &&
           (tradingData.priceType === 'single' ? tradingData.singlePrice > 0 : 
            tradingData.minPrice > 0 && tradingData.maxPrice > tradingData.minPrice);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      {/* Instruction Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Trade Quotes in 3 Simple Steps</h2>
        
        {/* Buy/Sell Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTradeIntent('buy')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                tradeIntent === 'buy'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Looking to Buy</span>
            </button>
            <button
              onClick={() => setTradeIntent('sell')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                tradeIntent === 'sell'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span>Have Stock to Sell</span>
            </button>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold text-green-600">Step 1:</span> Tell us what commodity you need. 
          <span className="font-semibold text-blue-600 ml-4">Step 2:</span> Share your target price. 
          <span className="font-semibold text-purple-600 ml-4">Step 3:</span> Tell us your {tradeIntent === 'buy' ? 'delivery location' : 'stock location'}.
        </p>
        <p className="text-green-700 font-medium">Then get price information and counterparty details on WhatsApp!</p>
      </div>

      {/* Three-Column Quote Request Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Step 1: Commodity & Quantity */}
        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
            <h3 className="text-xl font-bold text-green-800">Commodity & Quantity</h3>
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={tradingData.category}
              onChange={(e) => setTradingData(prev => ({ ...prev, category: e.target.value, commodity: '' }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            >
              <option value="">Select category</option>
              {Object.entries(categories).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Commodity Autocomplete */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Commodity/Variety</label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={tradingData.commodity}
                onChange={(e) => handleCommoditySearch(e.target.value)}
                onFocus={() => tradingData.category && setShowCommodityDropdown(true)}
                placeholder="Search commodity..."
                disabled={!tradingData.category}
                className="w-full pl-10 pr-4 p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:bg-gray-100"
              />
            </div>
            
            {showCommodityDropdown && filteredCommodities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredCommodities.map((commodity, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTradingData(prev => ({ ...prev, commodity }));
                      setShowCommodityDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors"
                  >
                    {commodity}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                value={tradingData.quantity || ''}
                onChange={(e) => setTradingData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                placeholder="0"
                min="0"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select
                value={tradingData.unit}
                onChange={(e) => setTradingData(prev => ({ ...prev, unit: e.target.value }))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Target Price */}
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
            <h3 className="text-xl font-bold text-blue-800">Target Price</h3>
          </div>

          {/* Price Type Toggle */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setTradingData(prev => ({ ...prev, priceType: 'range' }))}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                tradingData.priceType === 'range'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Price Range
            </button>
            <button
              onClick={() => setTradingData(prev => ({ ...prev, priceType: 'single' }))}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                tradingData.priceType === 'single'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Fixed Price
            </button>
          </div>

          {tradingData.priceType === 'single' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per Quintal (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={tradingData.singlePrice || ''}
                  onChange={(e) => setTradingData(prev => ({ ...prev, singlePrice: Number(e.target.value) }))}
                  placeholder="Enter price"
                  min="0"
                  className="w-full pl-10 pr-4 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₹)</label>
                <input
                  type="number"
                  value={tradingData.minPrice || ''}
                  onChange={(e) => setTradingData(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                  placeholder="Minimum price"
                  min="0"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
                <input
                  type="number"
                  value={tradingData.maxPrice || ''}
                  onChange={(e) => setTradingData(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  placeholder="Maximum price"
                  min="0"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">We'll find counterparties matching your price range</span>
            </div>
          </div>
        </div>

        {/* Step 3: Delivery Location */}
        <div className={`rounded-xl p-6 border-2 ${
          tradeIntent === 'buy' 
            ? 'bg-purple-50 border-purple-100' 
            : 'bg-orange-50 border-orange-100'
        }`}>
          <div className="flex items-center space-x-2 mb-4">
            <div className={`text-white rounded-full w-8 h-8 flex items-center justify-center font-bold ${
              tradeIntent === 'buy' ? 'bg-purple-600' : 'bg-orange-600'
            }`}>3</div>
            <h3 className={`text-xl font-bold ${
              tradeIntent === 'buy' ? 'text-purple-800' : 'text-orange-800'
            }`}>
              {tradeIntent === 'buy' ? 'Delivery Location' : 'Stock Location'}
            </h3>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {tradeIntent === 'buy' ? 'Where do you need delivery?' : 'Where is your stock located?'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={tradingData.location}
                onChange={(e) => handleLocationSearch(e.target.value)}
                onFocus={() => setShowLocationDropdown(true)}
                placeholder={tradeIntent === 'buy' ? 'Enter delivery city/town...' : 'Enter stock location...'}
                className={`w-full pl-10 pr-4 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-20 ${
                  tradeIntent === 'buy' 
                    ? 'focus:border-purple-500 focus:ring-purple-500' 
                    : 'focus:border-orange-500 focus:ring-orange-500'
                }`}
              />
            </div>

            {showLocationDropdown && filteredCities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTradingData(prev => ({ ...prev, location: city }));
                      setShowLocationDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 transition-colors flex items-center space-x-2 ${
                      tradeIntent === 'buy' ? 'hover:bg-purple-50' : 'hover:bg-orange-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    // Simulate reverse geocoding - in real app, you'd call a geocoding API
                    const mockCity = indianCities[Math.floor(Math.random() * 5)];
                    setTradingData(prev => ({ ...prev, location: mockCity }));
                  },
                  (error) => console.error('Location detection failed:', error)
                );
              }
            }}
            className="mt-3 w-full flex items-center justify-center space-x-2 p-2 text-sm text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Use Current Location</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <button
          onClick={openWhatsApp}
          disabled={!isFormValid()}
          className={`w-full lg:w-auto inline-flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg ${
            tradeIntent === 'buy' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <MessageSquare className="w-6 h-6" />
          <span>Find {tradeIntent === 'buy' ? 'Sellers' : 'Buyers'} on WhatsApp</span>
          <ExternalLink className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
          <a href="tel:+917982985895" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span>+91 79829 85895</span>
          </a>
          <a href="mailto:support@tradewiser.com" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <Mail className="w-4 h-4" />
            <span>support@tradewiser.com</span>
          </a>
        </div>

        <p className="text-gray-600 text-sm">
          Prefer phone or email? Contact us directly. Our team replies within 30 minutes.
        </p>
      </div>

      {/* Service Promise */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h4 className="text-lg font-bold text-gray-900">Complete Trading Support</h4>
        </div>
        <p className="text-gray-700">
          We provide price information, connect you with verified {tradeIntent === 'buy' ? 'sellers' : 'buyers'}, and support 
          price negotiation, sampling, documentation, and delivery coordination.
        </p>
      </div>
    </div>
  );
};