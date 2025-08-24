import React from 'react';
import { Shield, Award, Users, ExternalLink } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Trust Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Officially Backed by Government of India</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TradeWiser provides price information and connects you with verified counterparties. 
            Operated by Mfarm Ventures Private Limited, a DPIIT-recognized startup supported by leading agricultural innovation partners.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Indigram Labs */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-100">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">DST, Govt of India Incubator</h3>
            <p className="text-blue-700 mb-4">Officially incubated by Indigram Labs Foundation</p>
            <a 
              href="https://indigramlabs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>Verify at indigramlabs.org</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Startup India */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100">
            <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-orange-900 mb-2">Startup India Seed Fund</h3>
            <p className="text-orange-700 mb-4">Supported by Startup India Seed Fund Scheme</p>
            <a 
              href="https://startupindia.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              <span>Verify at startupindia.gov.in</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* ICRISAT */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-green-900 mb-2">ICRISAT Partnership</h3>
            <p className="text-green-700 mb-4">Partner in ICRISAT Global Ag Research Initiatives</p>
            <a 
              href="https://icrisat.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <span>Verify at icrisat.org</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Agricultural Community</h3>
          <p className="text-lg text-gray-700 mb-6">
            TradeWiser provides reliable price information and counterparty connections to 10,000+ active traders. 
            Part of an ecosystem supported by leading agricultural innovation and research partners.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">10,000+</div>
              <div className="text-gray-600">Active Traders</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">30 Min</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-gray-600">Verified Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};