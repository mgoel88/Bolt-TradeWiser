import React from 'react';
import { ShoppingCart, Truck } from 'lucide-react';

interface TradeIntentToggleProps {
  intent: 'buy' | 'sell';
  onChange: (intent: 'buy' | 'sell') => void;
}

export const TradeIntentToggle: React.FC<TradeIntentToggleProps> = ({ intent, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">I want to:</div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('buy')}
          className={`flex items-center justify-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            intent === 'buy'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <ShoppingCart className={`w-6 h-6 ${intent === 'buy' ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-left">
            <div className="font-semibold">Buy</div>
            <div className="text-sm opacity-75">Looking to purchase</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('sell')}
          className={`flex items-center justify-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            intent === 'sell'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <Truck className={`w-6 h-6 ${intent === 'sell' ? 'text-green-500' : 'text-gray-400'}`} />
          <div className="text-left">
            <div className="font-semibold">Sell</div>
            <div className="text-sm opacity-75">Have stock to sell</div>
          </div>
        </button>
      </div>
    </div>
  );
};