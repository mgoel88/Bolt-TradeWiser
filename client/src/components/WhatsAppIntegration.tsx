import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle, Copy, ExternalLink } from 'lucide-react';

interface WhatsAppData {
  commodity: string;
  quantity: number;
  unit: string;
  priceRange: { min: number; max: number };
  location: string;
  intent: 'buy' | 'sell';
  contactName: string;
  contactPhone: string;
}

interface WhatsAppIntegrationProps {
  data: WhatsAppData;
  onBack: () => void;
}

export const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({ data, onBack }) => {
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const generateMessage = () => {
      const priceText = data.priceRange.min === data.priceRange.max 
        ? `₹${data.priceRange.min.toLocaleString('en-IN')}`
        : `₹${data.priceRange.min.toLocaleString('en-IN')} - ₹${data.priceRange.max.toLocaleString('en-IN')}`;

      const intentText = data.intent === 'buy' ? 'looking to buy' : 'have available for sale';
      const locationText = data.intent === 'buy' ? `Delivery to: ${data.location}` : `Available at: ${data.location}`;

      return `🌾 *TradeWiser Agricultural Trading*

Hi! I'm ${intentText}:

📦 *Commodity:* ${data.commodity}
⚖️ *Quantity:* ${data.quantity} ${data.unit}
💰 *Price:* ${priceText} per quintal
📍 *${locationText}*

👤 *Contact:* ${data.contactName}
📱 *Phone:* ${data.contactPhone}

Please connect me with verified ${data.intent === 'buy' ? 'sellers' : 'buyers'}. 

_Generated via TradeWiser.com_`;
    };

    setMessage(generateMessage());
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    // In production, this would be your TradeWiser WhatsApp Business number
    const whatsappNumber = '+919876543210'; 
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsAppWeb = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '+919876543210';
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${whatsappNumber.replace('+', '')}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center bg-green-50 rounded-lg p-6">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">Trade Request Created!</h2>
        <p className="text-green-700">
          Your commodity trading request has been formatted for WhatsApp.
        </p>
      </div>

      {/* Trade Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Trade Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Commodity:</span>
            <div className="font-medium">{data.commodity}</div>
          </div>
          <div>
            <span className="text-gray-500">Quantity:</span>
            <div className="font-medium">{data.quantity} {data.unit}</div>
          </div>
          <div>
            <span className="text-gray-500">Price Range:</span>
            <div className="font-medium">
              {data.priceRange.min === data.priceRange.max 
                ? `₹${data.priceRange.min.toLocaleString('en-IN')}`
                : `₹${data.priceRange.min.toLocaleString('en-IN')} - ₹${data.priceRange.max.toLocaleString('en-IN')}`}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Intent:</span>
            <div className="font-medium capitalize">{data.intent}</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Message Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">WhatsApp Message</h3>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-150"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm whitespace-pre-wrap">
          {message}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={openWhatsApp}
          className="w-full flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          <MessageSquare className="w-6 h-6" />
          <span>Continue on WhatsApp Mobile</span>
          <ExternalLink className="w-4 h-4" />
        </button>

        <button
          onClick={openWhatsAppWeb}
          className="w-full flex items-center justify-center space-x-3 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Continue on WhatsApp Web</span>
          <ExternalLink className="w-4 h-4" />
        </button>

        <button
          onClick={onBack}
          className="w-full py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          ← Modify Trade Details
        </button>
      </div>

      {/* Trust Signals */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✅ Our team will review your request within 5 minutes</li>
          <li>✅ We'll connect you with verified {data.intent === 'buy' ? 'sellers' : 'buyers'}</li>
          <li>✅ All partners are quality-verified and trusted</li>
          <li>✅ Complete transparency in pricing and terms</li>
        </ul>
      </div>
    </div>
  );
};