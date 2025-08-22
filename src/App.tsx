import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TradingInterface } from './components/TradingInterface';
import { TrustBadges } from './components/TrustBadges';
import { TrendingUp, Users, Shield, Clock, ArrowRight, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Agricultural Trades in <span className="text-yellow-300">60 Seconds</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Your digital sauda book - connecting verified buyers and sellers across India with instant WhatsApp integration
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 text-green-100">
                <Users className="w-5 h-5" />
                <span>10,000+ Active Traders</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100">
                <Shield className="w-5 h-5" />
                <span>100% Verified Partners</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100">
                <Clock className="w-5 h-5" />
                <span>5-Minute Response</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100">
                <TrendingUp className="w-5 h-5" />
                <span>Live Market Rates</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-yellow-300" />
              ))}
              <span className="ml-2 text-green-100">4.8/5 from 2,500+ traders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TradingInterface />
      </div>

      {/* Trust Badges Section */}
      <TrustBadges />
      {/* Coming Soon Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Live Market Rates</h3>
            <p className="text-sm text-gray-600 mb-3">Real-time pricing from 500+ mandis across India</p>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
            <p className="text-sm text-gray-600 mb-3">Upload specs, get quality-verified matches</p>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Beta Available</span>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Broker Network</h3>
            <p className="text-sm text-gray-600 mb-3">Partner with us, share leads, earn commissions</p>
            <button className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
              Join Network
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;