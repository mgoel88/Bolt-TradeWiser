import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  unit: string;
  onQuantityChange: (quantity: number) => void;
  onUnitChange: (unit: string) => void;
}

const units = [
  { value: 'quintals', label: 'Quintals', conversion: 1, suffix: 'qtl' },
  { value: 'tonnes', label: 'Tonnes', conversion: 10, suffix: 'MT' },
  { value: 'bags', label: 'Bags (50kg)', conversion: 0.5, suffix: 'bags' },
  { value: 'kg', label: 'Kilograms', conversion: 0.01, suffix: 'kg' }
];

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const currentUnit = units.find(u => u.value === unit) || units[0];
  
  const handleQuantityChange = (value: string) => {
    setInputValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onQuantityChange(numValue);
    }
  };

  const getConvertedValue = (targetUnit: string) => {
    const target = units.find(u => u.value === targetUnit);
    if (!target) return 0;
    
    const baseQuintals = quantity * currentUnit.conversion;
    return (baseQuintals / target.conversion).toFixed(2);
  };

  const commonQuantities = [10, 25, 50, 100, 500, 1000];

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <div className="flex-1">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleQuantityChange(e.target.value)}
            placeholder="Enter quantity"
            min="0"
            step="0.01"
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors duration-200"
          />
        </div>
        
        <div className="relative">
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="appearance-none p-4 pl-4 pr-10 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors duration-200 cursor-pointer"
          >
            {units.map((unitOption) => (
              <option key={unitOption.value} value={unitOption.value}>
                {unitOption.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick quantity selections */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 py-2">Quick select:</span>
        {commonQuantities.map((qty) => (
          <button
            key={qty}
            onClick={() => {
              setInputValue(qty.toString());
              onQuantityChange(qty);
            }}
            className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:border-green-500 hover:bg-green-50 transition-colors duration-150"
          >
            {qty} {currentUnit.suffix}
          </button>
        ))}
      </div>

      {/* Conversion display */}
      {quantity > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Quantity Conversions</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {units
              .filter(u => u.value !== unit)
              .map((unitOption) => (
                <div key={unitOption.value} className="flex justify-between">
                  <span className="text-gray-600">{unitOption.label}:</span>
                  <span className="font-medium">
                    {getConvertedValue(unitOption.value)} {unitOption.suffix}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};