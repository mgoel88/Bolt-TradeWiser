import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

interface PriceRange {
  min: number;
  max: number;
}

interface PriceRangeSliderProps {
  priceRange: PriceRange;
  onPriceChange: (range: PriceRange) => void;
  quantity: number;
  unit: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  priceRange,
  onPriceChange,
  quantity,
  unit
}) => {
  const [minValue, setMinValue] = useState(priceRange.min);
  const [maxValue, setMaxValue] = useState(priceRange.max);
  const [fixedPrice, setFixedPrice] = useState<number | null>(null);
  const [priceMode, setPriceMode] = useState<'range' | 'fixed'>('range');

  // Market rate simulation (would come from API)
  const marketRate = 2850;
  const marketMin = marketRate * 0.85;
  const marketMax = marketRate * 1.15;
  const absoluteMin = 1000;
  const absoluteMax = 5000;

  useEffect(() => {
    onPriceChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onPriceChange]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxValue - 100);
    setMinValue(newMin);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minValue + 100);
    setMaxValue(newMax);
  };

  const calculateTotal = (price: number) => {
    const unitMultiplier = unit === 'tonnes' ? 10 : unit === 'bags' ? 0.5 : unit === 'kg' ? 0.01 : 1;
    return (price * quantity * unitMultiplier).toLocaleString('en-IN');
  };

  const getMinPercentage = () => ((minValue - absoluteMin) / (absoluteMax - absoluteMin)) * 100;
  const getMaxPercentage = () => ((maxValue - absoluteMin) / (absoluteMax - absoluteMin)) * 100;

  return (
    <div className="space-y-6">
      {/* Price Mode Toggle */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setPriceMode('range')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            priceMode === 'range'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Price Range
        </button>
        <button
          onClick={() => setPriceMode('fixed')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
            priceMode === 'fixed'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Fixed Price
        </button>
      </div>

      {priceMode === 'range' ? (
        <div className="space-y-4">
          {/* Market Rate Reference */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Current Market Range</span>
            </div>
            <div className="text-sm text-blue-700">
              ₹{marketMin.toLocaleString('en-IN')} - ₹{marketMax.toLocaleString('en-IN')} per quintal
            </div>
          </div>

          {/* Dual Range Slider */}
          <div className="relative">
            <div className="relative h-6 bg-gray-200 rounded-full">
              {/* Market range indicator */}
              <div
                className="absolute h-6 bg-blue-100 rounded-full"
                style={{
                  left: `${((marketMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`,
                  width: `${((marketMax - marketMin) / (absoluteMax - absoluteMin)) * 100}%`
                }}
              />
              
              {/* Selected range */}
              <div
                className="absolute h-6 bg-green-500 rounded-full"
                style={{
                  left: `${getMinPercentage()}%`,
                  width: `${getMaxPercentage() - getMinPercentage()}%`
                }}
              />

              {/* Min slider */}
              <input
                type="range"
                min={absoluteMin}
                max={absoluteMax}
                value={minValue}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="absolute w-full h-6 bg-transparent appearance-none cursor-pointer slider-thumb-left"
                style={{ zIndex: minValue > maxValue - 200 ? 2 : 1 }}
              />

              {/* Max slider */}
              <input
                type="range"
                min={absoluteMin}
                max={absoluteMax}
                value={maxValue}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="absolute w-full h-6 bg-transparent appearance-none cursor-pointer slider-thumb-right"
              />
            </div>

            {/* Value labels */}
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₹{absoluteMin.toLocaleString('en-IN')}</span>
              <span>₹{absoluteMax.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Selected range display */}
          <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
            <div>
              <div className="text-sm text-green-700 font-medium">Your Price Range</div>
              <div className="text-lg font-bold text-green-800">
                ₹{minValue.toLocaleString('en-IN')} - ₹{maxValue.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-green-600">per quintal</div>
            </div>
            {quantity > 0 && (
              <div className="text-right">
                <div className="text-sm text-green-700">Total Value Range</div>
                <div className="font-bold text-green-800">
                  ₹{calculateTotal(minValue)} - ₹{calculateTotal(maxValue)}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              placeholder="Enter your fixed price"
              value={fixedPrice || ''}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFixedPrice(value);
                onPriceChange({ min: value, max: value });
              }}
              className="w-full pl-10 pr-16 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              per quintal
            </div>
          </div>

          {fixedPrice && fixedPrice > 0 && (
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-orange-700 font-medium">Fixed Price</div>
                  <div className="text-lg font-bold text-orange-800">
                    ₹{fixedPrice.toLocaleString('en-IN')} per quintal
                  </div>
                </div>
                {quantity > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-orange-700">Total Value</div>
                    <div className="font-bold text-orange-800">
                      ₹{calculateTotal(fixedPrice)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .slider-thumb-left::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .slider-thumb-right::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .slider-thumb-left::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .slider-thumb-right::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};