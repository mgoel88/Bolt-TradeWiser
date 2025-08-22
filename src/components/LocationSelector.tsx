import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Target } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  state: string;
  district: string;
  type: 'city' | 'town' | 'village';
  landmarks?: string[];
}

const indianLocations: Location[] = [
  { id: 'delhi', name: 'Delhi', state: 'Delhi', district: 'Central Delhi', type: 'city', landmarks: ['Red Fort', 'India Gate'] },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', district: 'Mumbai', type: 'city', landmarks: ['Gateway of India', 'Marine Drive'] },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', district: 'Kolkata', type: 'city', landmarks: ['Victoria Memorial', 'Howrah Bridge'] },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', type: 'city', landmarks: ['Marina Beach', 'Fort St. George'] },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', district: 'Bangalore Urban', type: 'city', landmarks: ['Cubbon Park', 'Lalbagh'] },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', district: 'Hyderabad', type: 'city', landmarks: ['Charminar', 'Golconda Fort'] },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', type: 'city', landmarks: ['Sabarmati Ashram', 'Adalaj Stepwell'] },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', district: 'Pune', type: 'city', landmarks: ['Shaniwar Wada', 'Aga Khan Palace'] },
  { id: 'surat', name: 'Surat', state: 'Gujarat', district: 'Surat', type: 'city', landmarks: ['Surat Castle', 'Dumas Beach'] },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', district: 'Jaipur', type: 'city', landmarks: ['Hawa Mahal', 'Amer Fort'] },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', type: 'city', landmarks: ['Bara Imambara', 'Chota Imambara'] },
  { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', district: 'Kanpur Nagar', type: 'city', landmarks: ['Allen Forest Zoo', 'Kanpur Memorial Church'] },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', district: 'Nagpur', type: 'city', landmarks: ['Deekshabhoomi', 'Sitabuldi Fort'] },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', district: 'Indore', type: 'city', landmarks: ['Rajwada Palace', 'Lal Bagh Palace'] },
  { id: 'thane', name: 'Thane', state: 'Maharashtra', district: 'Thane', type: 'city', landmarks: ['Upvan Lake', 'Kopineshwar Temple'] },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', district: 'Bhopal', type: 'city', landmarks: ['Taj-ul-Masajid', 'Upper Lake'] },
  { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', district: 'Visakhapatnam', type: 'city', landmarks: ['INS Kursura Submarine Museum', 'Kailasagiri'] },
  { id: 'pimpri-chinchwad', name: 'Pimpri-Chinchwad', state: 'Maharashtra', district: 'Pune', type: 'city', landmarks: ['Morya Gosavi Temple', 'Appu Ghar'] },
  { id: 'patna', name: 'Patna', state: 'Bihar', district: 'Patna', type: 'city', landmarks: ['Golghar', 'Patna Museum'] },
  { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', district: 'Vadodara', type: 'city', landmarks: ['Laxmi Vilas Palace', 'Sayaji Baug'] },
  { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', district: 'Agra', type: 'city', landmarks: ['Taj Mahal', 'Agra Fort'] },
  { id: 'ludhiana', name: 'Ludhiana', state: 'Punjab', district: 'Ludhiana', type: 'city', landmarks: ['Punjab Agricultural University', 'Lodhi Fort'] },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', district: 'Nashik', type: 'city', landmarks: ['Sula Vineyards', 'Trimbakeshwar Temple'] },
  { id: 'faridabad', name: 'Faridabad', state: 'Haryana', district: 'Faridabad', type: 'city', landmarks: ['Surajkund', 'Town Park'] },
  { id: 'meerut', name: 'Meerut', state: 'Uttar Pradesh', district: 'Meerut', type: 'city', landmarks: ['Augarnath Temple', 'Shahpeer Saheb'] }
];

interface LocationSelectorProps {
  value: string;
  onChange: (locationId: string) => void;
  mode: 'pickup' | 'delivery';
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredLocations = indianLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topCities = indianLocations.filter(l => l.type === 'city').slice(0, 6);

  useEffect(() => {
    if (value) {
      const location = indianLocations.find(l => l.id === value);
      setSelectedLocation(location || null);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
    onChange(location.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding - in real app, you'd call a geocoding API
          const mockLocation = indianLocations[Math.floor(Math.random() * 5)]; // Random top city
          setUserLocation(mockLocation.id);
          handleSelect(mockLocation);
        },
        (error) => {
          console.error('Location detection failed:', error);
        }
      );
    }
  };

  const modeText = mode === 'pickup' ? 'Material is available at' : 'Deliver to';
  const modeIcon = mode === 'pickup' ? <Target className="w-6 h-6 text-gray-400" /> : <Navigation className="w-6 h-6 text-gray-400" />;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="mb-2 flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">{modeText}</span>
        <button
          onClick={detectLocation}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 transition-colors duration-150"
        >
          <Navigation className="w-3 h-3" />
          <span>Detect location</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-green-500 transition-colors duration-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
      >
        <div className="flex items-center space-x-3">
          {selectedLocation ? (
            <>
              <MapPin className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">{selectedLocation.name}</div>
                <div className="text-sm text-gray-500">{selectedLocation.district}, {selectedLocation.state}</div>
              </div>
            </>
          ) : (
            <>
              {modeIcon}
              <span className="text-gray-500">Select location</span>
            </>
          )}
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities, towns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {searchTerm === '' && (
              <div className="p-3 border-b border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Major Cities
                </div>
                <div className="space-y-1">
                  {topCities.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleSelect(location)}
                      className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md text-left transition-colors duration-150"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.state}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* State-wise grouping */}
            {(() => {
              const stateGroups = filteredLocations.reduce((groups, location) => {
                const state = location.state;
                if (!groups[state]) groups[state] = [];
                groups[state].push(location);
                return groups;
              }, {} as Record<string, Location[]>);

              return Object.entries(stateGroups).map(([state, locations]) => (
                <div key={state} className="border-b border-gray-100 last:border-b-0">
                  <div className="px-3 py-2 bg-gray-50">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {state}
                    </div>
                  </div>
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleSelect(location)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-green-50 transition-colors duration-150 text-left"
                    >
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.district}</div>
                        {location.landmarks && (
                          <div className="text-xs text-gray-400 mt-1">
                            Near: {location.landmarks.slice(0, 2).join(', ')}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ));
            })()}

            {filteredLocations.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <div>No locations found</div>
                <div className="text-sm">Try searching for a different city or state</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};