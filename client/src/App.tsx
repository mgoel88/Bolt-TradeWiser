import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import LeadCaptureForm from './components/LeadCaptureForm';
import { TrendingUp, Users, Shield, Clock, Star, CheckCircle, Download } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - CLEAN WHITE BACKGROUND WITH READABLE TEXT */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline - Dark text on white */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Connect with Verified Agricultural Traders in{' '}
              <span className="text-[#B88A3D]">30 Minutes</span>
            </h1>
            
            {/* Subheadline - Readable gray */}
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed font-medium">
              India's Most Trusted Digital Trading Platform for Agricultural Commodities
            </p>
            
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
              Get instant price quotes, connect with verified counterparties, and complete your trades seamlessly through WhatsApp.
            </p>
            
            {/* Trust Indicators - Clean cards with white background */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <Users className="w-10 h-10 text-[#B88A3D] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600 mt-1">Active Traders</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <Shield className="w-10 h-10 text-[#B88A3D] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600 mt-1">Verified Partners</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <Clock className="w-10 h-10 text-[#B88A3D] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">30 Min</div>
                <div className="text-sm text-gray-600 mt-1">Response Time</div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <TrendingUp className="w-10 h-10 text-[#B88A3D] mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 mt-1">Mandi Rates</div>
              </div>
            </div>

            {/* Star Rating - Clean design */}
            <div className="flex items-center justify-center space-x-2 bg-gray-50 rounded-full px-6 py-3 inline-flex border border-gray-200">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-[#B88A3D]" />
                ))}
              </div>
              <span className="text-gray-900 font-semibold">4.8/5</span>
              <span className="text-gray-600">from 2,500+ traders</span>
            </div>

            {/* App Store Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#" 
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/app-store-badge.png" 
                  alt="Download on App Store" 
                  className="h-14"
                />
              </a>
              <a 
                href="#" 
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/google-play-badge.png" 
                  alt="Get it on Google Play" 
                  className="h-14"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form - Multi-Service */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your service, fill in the details, and get a quote within 30 minutes via WhatsApp
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </div>

      {/* Value Proposition Section - Light gray background for contrast */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TradeWiser™?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              India's first DPIIT-recognized agricultural trading platform, backed by Government of India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Market Intelligence</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Access live pricing from 500+ mandis across India. Make informed decisions with accurate, up-to-date market data.
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                Coming Soon
              </span>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance & Verification</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Upload commodity specifications and get matched with quality-verified traders. Reduce disputes.
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                Beta Available
              </span>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Broker Partnership Program</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Join our network of trusted brokers. Share leads, facilitate trades, and earn commissions.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/917982985895?text=I%20want%20to%20join%20the%20TradeWiser%20Broker%20Network', '_blank')}
                className="bg-[#B88A3D] hover:bg-[#9a7332] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Join Network
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Government Backing Section - White background */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Officially Backed by Government of India
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              TradeWiser provides price information and connects you with verified counterparties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">DST, Govt of India Incubator</h3>
              <p className="text-gray-600 text-sm mb-3">Officially incubated by Indigram Labs Foundation</p>
              <a href="https://indigramlabs.org" target="_blank" rel="noopener noreferrer" className="text-[#B88A3D] hover:underline text-sm font-medium">
                Verify at indigramlabs.org →
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Startup India Seed Fund</h3>
              <p className="text-gray-600 text-sm mb-3">Supported by Startup India Seed Fund Scheme</p>
              <a href="https://startupindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#B88A3D] hover:underline text-sm font-medium">
                Verify at startupindia.gov.in →
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ICRISAT Partnership</h3>
              <p className="text-gray-600 text-sm mb-3">Partner in ICRISAT Global Ag Research Initiatives</p>
              <a href="https://icrisat.org" target="_blank" rel="noopener noreferrer" className="text-[#B88A3D] hover:underline text-sm font-medium">
                Verify at icrisat.org →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Section - Light background */}
      <div className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-md">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Trusted & Compliant</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                TradeWiser™ operates under full regulatory compliance with Indian agricultural trading laws
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold mb-2 text-[#B88A3D]">Legal Entity</h4>
                <p className="text-gray-900">Mfarm Ventures Private Limited</p>
                <p className="text-gray-600 text-xs mt-1">CIN: U51909DL2021PTC389391</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold mb-2 text-[#B88A3D]">GST Registered</h4>
                <p className="text-gray-900">GST: 07AAPCM1496E1ZC</p>
                <p className="text-gray-600 text-xs mt-1">Fully tax compliant</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold mb-2 text-[#B88A3D]">DPIIT Recognized</h4>
                <p className="text-gray-900">Startup India Certified</p>
                <p className="text-gray-600 text-xs mt-1">Govt. of India recognition</p>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p>
                <strong className="text-gray-900">Disclaimer:</strong> TradeWiser™ is a digital platform that facilitates connections between agricultural commodity traders. 
                We provide price information and counterparty discovery services. All trades are conducted directly between parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
