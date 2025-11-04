import React, { useState } from 'react';
import { TrendingUp, BarChart3, Warehouse, CheckCircle } from 'lucide-react';
import { TradingForm } from './TradingForm';
import { PricingForm } from './PricingForm';
import { WarehousingForm } from './WarehousingForm';
import { QualityCheckForm } from './QualityCheckForm';

interface Service {
  id: 'trading' | 'pricing' | 'warehousing' | 'quality';
  name: string;
  icon: typeof TrendingUp;
  description: string;
  color: string;
  badge?: string;
}

const services: Service[] = [
  {
    id: 'trading',
    name: 'Trading',
    icon: TrendingUp,
    description: 'Get trade quotes in 30 minutes',
    color: '#B88A3D',
    badge: 'Most Popular'
  },
  {
    id: 'pricing',
    name: 'Market Prices',
    icon: BarChart3,
    description: 'Real-time mandi rates across India',
    color: '#3B82F6',
    badge: 'Coming Soon'
  },
  {
    id: 'warehousing',
    name: 'Warehousing',
    icon: Warehouse,
    description: 'Secure storage solutions',
    color: '#10B981'
  },
  {
    id: 'quality',
    name: 'Quality Check',
    icon: CheckCircle,
    description: 'Certified commodity inspections',
    color: '#8B5CF6',
    badge: 'Beta'
  }
];

export function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<'trading' | 'pricing' | 'warehousing' | 'quality'>('trading');
  
  const activeService = services.find(s => s.id === activeTab)!;
  
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Get Started in 3 Simple Steps
        </h2>
        <p className="text-lg text-gray-600">
          Choose your service below and get connected with verified partners
        </p>
      </div>

      {/* Tab Headers - Desktop */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 mb-8">
        {services.map(service => {
          const Icon = service.icon;
          const isActive = activeTab === service.id;
          
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-200
                ${isActive 
                  ? 'border-current shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
              style={{
                borderColor: isActive ? service.color : undefined,
                backgroundColor: isActive ? `${service.color}08` : 'white'
              }}
            >
              {service.badge && (
                <span 
                  className="absolute -top-2 -right-2 px-2 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: service.color }}
                >
                  {service.badge}
                </span>
              )}
              
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ 
                    backgroundColor: isActive ? service.color : `${service.color}20`,
                    color: isActive ? 'white' : service.color
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 
                  className="font-semibold mb-1"
                  style={{ color: isActive ? service.color : '#1F2937' }}
                >
                  {service.name}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Headers - Mobile */}
      <div className="md:hidden mb-6">
        <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
          {services.map(service => {
            const Icon = service.icon;
            const isActive = activeTab === service.id;
            
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`
                  flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all
                  ${isActive ? 'shadow-md' : 'border-gray-200'}
                `}
                style={{
                  borderColor: isActive ? service.color : undefined,
                  backgroundColor: isActive ? `${service.color}08` : 'white',
                  minWidth: '140px'
                }}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: service.color }}
                  />
                  <span 
                    className="font-medium text-sm"
                    style={{ color: isActive ? service.color : '#1F2937' }}
                  >
                    {service.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Service Info Banner */}
      <div 
        className="mb-6 p-4 rounded-lg border-l-4"
        style={{ 
          borderColor: activeService.color,
          backgroundColor: `${activeService.color}08`
        }}
      >
        <div className="flex items-start space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: activeService.color }}
          >
            {React.createElement(activeService.icon, { className: 'w-5 h-5 text-white' })}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              {activeService.name}
            </h4>
            <p className="text-sm text-gray-600">
              {activeService.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
        {activeTab === 'trading' && <TradingForm />}
        {activeTab === 'pricing' && <PricingForm />}
        {activeTab === 'warehousing' && <WarehousingForm />}
        {activeTab === 'quality' && <QualityCheckForm />}
      </div>

      {/* Related Services Suggestion */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          💡 <span className="font-medium">Most traders also use:</span>{' '}
          {services
            .filter(s => s.id !== activeTab)
            .slice(0, 2)
            .map((s, i) => (
              <React.Fragment key={s.id}>
                {i > 0 && <span className="mx-2">|</span>}
                <button
                  onClick={() => setActiveTab(s.id)}
                  className="font-medium hover:underline"
                  style={{ color: s.color }}
                >
                  {s.name}
                </button>
              </React.Fragment>
            ))}
        </p>
      </div>
    </div>
  );
}
