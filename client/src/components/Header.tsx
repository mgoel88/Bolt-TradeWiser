import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Just infinity symbol */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-icon.png" 
              alt="TradeWiser" 
              className="h-10 w-10"
            />
            <div>
              <div className="text-xl font-bold text-[#0A2E50]">
                TradeWiser<sup className="text-xs">™</sup>
              </div>
              <div className="text-xs text-gray-500">Commodity to Capital</div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#market-rates" 
              className="text-gray-700 hover:text-[#B88A3D] font-medium transition-colors"
            >
              Market Rates
            </a>
            <a 
              href="#quality" 
              className="text-gray-700 hover:text-[#B88A3D] font-medium transition-colors"
            >
              Quality Assurance
            </a>
            <a 
              href="#broker-network" 
              className="text-gray-700 hover:text-[#B88A3D] font-medium transition-colors"
            >
              Broker Network
            </a>
            <a 
              href="#services" 
              className="text-gray-700 hover:text-[#B88A3D] font-medium transition-colors"
            >
              Services
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+917982985895"
              className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-[#B88A3D] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+91 79829 85895</span>
            </a>
            <button
              onClick={() => window.open('https://wa.me/917982985895?text=Hi%2C%20I%20want%20to%20get%20trade%20quotes%20from%20TradeWiser', '_blank')}
              className="bg-[#B88A3D] hover:bg-[#9a7332] text-white px-6 py-2.5 rounded-lg font-semibold flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Quotes</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
