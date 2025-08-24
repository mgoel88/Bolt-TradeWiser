import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Package } from 'lucide-react';

interface Commodity {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  icon: string;
}

const commodities: Commodity[] = [
  { id: 'rice-basmati-1121', name: '1121 Golden Sella Basmati', category: 'Grains', subcategory: 'Rice', icon: '🌾' },
  { id: 'rice-basmati-1509', name: '1509 Basmati Rice', category: 'Grains', subcategory: 'Rice', icon: '🌾' },
  { id: 'rice-non-basmati', name: 'Non-Basmati Rice', category: 'Grains', subcategory: 'Rice', icon: '🌾' },
  { id: 'wheat-durum', name: 'Durum Wheat', category: 'Grains', subcategory: 'Wheat', icon: '🌾' },
  { id: 'wheat-common', name: 'Common Wheat', category: 'Grains', subcategory: 'Wheat', icon: '🌾' },
  { id: 'dal-toor', name: 'Toor Dal (Arhar)', category: 'Pulses', subcategory: 'Dal', icon: '🫛' },
  { id: 'dal-chana', name: 'Chana Dal', category: 'Pulses', subcategory: 'Dal', icon: '🫛' },
  { id: 'dal-moong', name: 'Moong Dal', category: 'Pulses', subcategory: 'Dal', icon: '🫛' },
  { id: 'spice-turmeric', name: 'Turmeric Powder', category: 'Spices', subcategory: 'Powders', icon: '🌶️' },
  { id: 'spice-coriander', name: 'Coriander Seeds', category: 'Spices', subcategory: 'Seeds', icon: '🌶️' },
  { id: 'cotton-raw', name: 'Raw Cotton', category: 'Cash Crops', subcategory: 'Cotton', icon: '🌱' },
  { id: 'sugarcane', name: 'Sugarcane', category: 'Cash Crops', subcategory: 'Sugar', icon: '🌱' },
];

const categories = {
  'Grains': ['Rice', 'Wheat', 'Corn', 'Barley'],
  'Pulses': ['Dal', 'Beans', 'Peas'],
  'Spices': ['Powders', 'Seeds', 'Whole'],
  'Cash Crops': ['Cotton', 'Sugar', 'Oil Seeds']
};

interface CommoditySelectorProps {
  value: string;
  onChange: (commodity: Commodity) => void;
}

export const CommoditySelector: React.FC<CommoditySelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCommodities = commodities.filter(commodity =>
    commodity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commodity.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topSuggestions = commodities.slice(0, 8);

  useEffect(() => {
    if (value) {
      const commodity = commodities.find(c => c.id === value);
      setSelectedCommodity(commodity || null);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (commodity: Commodity) => {
    setSelectedCommodity(commodity);
    onChange(commodity);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-green-500 transition-colors duration-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
      >
        <div className="flex items-center space-x-3">
          {selectedCommodity ? (
            <>
              <span className="text-2xl">{selectedCommodity.icon}</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">{selectedCommodity.name}</div>
                <div className="text-sm text-gray-500">{selectedCommodity.category}</div>
              </div>
            </>
          ) : (
            <>
              <Package className="w-6 h-6 text-gray-400" />
              <span className="text-gray-500">Select commodity to trade</span>
            </>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search commodities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {searchTerm === '' && (
              <div className="p-3 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Top Commodities
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {topSuggestions.map((commodity) => (
                    <button
                      key={commodity.id}
                      onClick={() => handleSelect(commodity)}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md text-left transition-colors duration-150"
                    >
                      <span className="text-lg">{commodity.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{commodity.name.split(' ')[0]}...</div>
                        <div className="text-xs text-gray-500">{commodity.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {Object.entries(categories).map(([category, subcategories]) => {
              const categoryItems = filteredCommodities.filter(c => c.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category} className="border-b border-gray-100 last:border-b-0">
                  <div className="px-3 py-2 bg-gray-50">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {category}
                    </div>
                  </div>
                  {categoryItems.map((commodity) => (
                    <button
                      key={commodity.id}
                      onClick={() => handleSelect(commodity)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-green-50 transition-colors duration-150 text-left"
                    >
                      <span className="text-xl">{commodity.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{commodity.name}</div>
                        <div className="text-sm text-gray-500">{commodity.subcategory}</div>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}

            {filteredCommodities.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <div>No commodities found</div>
                <div className="text-sm">Try searching with different keywords</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};