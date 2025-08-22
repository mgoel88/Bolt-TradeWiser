import React from 'react';
import { Wheat, Menu, Phone, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Wheat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TradeWiser</h1>
              <p className="text-xs text-gray-500">by Mfarm Ventures</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Market Rates</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Quality Assurance</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Broker Network</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
          </nav>

          {/* Contact Options */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+917982985895"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91 79829 85895</span>
            </a>
            
            <a
              href="https://wa.me/917982985895"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">WhatsApp</span>
            </a>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};