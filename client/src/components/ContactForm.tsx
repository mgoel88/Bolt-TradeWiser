import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  onSubmit: (contactData: ContactData) => void;
  intent: 'buy' | 'sell';
}

interface ContactData {
  name: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, intent }) => {
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'whatsapp'
  });
  
  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time validation
    if (field === 'phone' && value) {
      if (!validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit mobile number' }));
      }
    }

    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    const newErrors: Partial<ContactData> = {};

    if (!contactData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!contactData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(contactData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (contactData.preferredContact === 'email' && !contactData.email.trim()) {
      newErrors.email = 'Email is required when email is preferred contact method';
    } else if (contactData.email && !validateEmail(contactData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(contactData);
    }

    setIsValidating(false);
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/[^0-9]/g, '');
    if (digits.length <= 10) {
      return digits.replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    return digits.slice(0, 10).replace(/(\d{5})(\d{5})/, '$1 $2');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          value={contactData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full p-4 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
            errors.name
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Phone Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="phone"
            type="tel"
            value={contactData.phone}
            onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
            className={`w-full pl-10 pr-4 p-4 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
              errors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                : contactData.phone && validatePhone(contactData.phone)
                ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
            }`}
            placeholder="98765 43210"
            maxLength={11}
          />
          {contactData.phone && validatePhone(contactData.phone) && !errors.phone && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {errors.phone && (
          <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.phone}</span>
          </div>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address {contactData.preferredContact === 'email' && '*'}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="email"
            type="email"
            value={contactData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full pl-10 pr-4 p-4 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                : contactData.email && validateEmail(contactData.email)
                ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
                : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
            }`}
            placeholder="your@email.com"
          />
          {contactData.email && validateEmail(contactData.email) && !errors.email && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {errors.email && (
          <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Contact Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setContactData(prev => ({ ...prev, preferredContact: 'whatsapp' }))}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
              contactData.preferredContact === 'whatsapp'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">WhatsApp</span>
          </button>
          
          <button
            type="button"
            onClick={() => setContactData(prev => ({ ...prev, preferredContact: 'phone' }))}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
              contactData.preferredContact === 'phone'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Phone</span>
          </button>
          
          <button
            type="button"
            onClick={() => setContactData(prev => ({ ...prev, preferredContact: 'email' }))}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors duration-200 ${
              contactData.preferredContact === 'email'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isValidating}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${
          intent === 'buy'
            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isValidating ? 'Validating...' : `Find ${intent === 'buy' ? 'Sellers' : 'Buyers'}`}
      </button>

      <div className="text-center text-sm text-gray-500">
        <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
        We'll connect you with verified {intent === 'buy' ? 'sellers' : 'buyers'} within 5 minutes
      </div>
    </form>
  );
};