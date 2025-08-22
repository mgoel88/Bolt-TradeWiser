import React from 'react';
import { Wheat, MapPin, Phone, Mail, MessageSquare, Shield, Clock, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">TradeWiser</h3>
                <p className="text-gray-400 text-sm">Digital Sauda Book</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming agricultural commodity trading through digital innovation. 
              Complete trades in under 60 seconds with verified partners across India.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Verified Partners</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-green-400" />
                <span>5-Min Response</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4 text-green-400" />
                <span>10,000+ Traders</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Market Rates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Quality Assurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Broker Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transportation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Warehousing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Financing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm">624-625, Third Floor, Gali Ghanteshwar, Katra Neel, Chandni Chowk, Delhi 110006</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm">+91 79829 85895</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm">support@tradewiser.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/917982985895" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:text-green-400 transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Details */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-400 text-sm space-y-2">
            <p>
              <strong>Mfarm Ventures Private Limited</strong> | CIN: U51909DL2021PTC389391 | GST: 07AAPCM1496E1ZC
            </p>
            <p>
              Supported by: Indigram Labs Foundation (DST, Govt of India), Startup India Seed Fund Scheme, ICRISAT Global Ag Research Partnership
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Mfarm Ventures Private Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};