import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

// Default center on William & Mary campus
const defaultCenter = {
  lat: 37.2707,
  lng: -76.7075
};

// Map container style
const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
};

// Sample restroom locations (replace with actual data)
const restroomLocations = [
  { id: 1, name: 'Swem Library', position: { lat: 37.2688, lng: -76.7149 } },
  { id: 2, name: 'Sadler Center', position: { lat: 37.2682, lng: -76.7135 } },
  { id: 3, name: 'Tucker Hall', position: { lat: 37.2715, lng: -76.7118 } },
  { id: 4, name: 'ISC', position: { lat: 37.2675, lng: -76.7167 } },
];

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapClick = (e) => {
    // You can add functionality to add new restroom locations here
    console.log('Map clicked at:', e.latLng.toJSON());
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">bathroom-finder</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Map Container */}
          <div className="mb-8">
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              onLoad={() => setIsMapLoaded(true)}
              onError={(error) => console.error('Error loading Google Maps:', error)}
              loadingElement={<div className="w-full h-96 flex items-center justify-center">Loading map...</div>}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={16}
                onClick={handleMapClick}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  zoomControl: true,
                  styles: [
                    {
                      featureType: 'poi',
                      elementType: 'labels',
                      stylers: [{ visibility: 'off' }]
                    }
                  ]
                }}
              >
                {isMapLoaded && restroomLocations.map((location) => {
                  // Create a new Size object only when the map is loaded
                  const icon = isMapLoaded ? {
                    url: 'https://maps.google.com/mapfiles/ms/icons/restroom.png',
                    scaledSize: new window.google.maps.Size(32, 32)
                  } : null;
                  
                  return (
                    <Marker
                      key={location.id}
                      position={location.position}
                      onClick={() => handleMarkerClick(location)}
                      icon={icon}
                    />
                  );
                })}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* Description Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Find Accessible Restrooms Near You</h2>
              <p className="text-gray-600">
                A project for GSWS 490, in particular a response for our second performance draft/vlog.

                The website's goal is to find the nearest gender neutral/accessible restrooms on the w&m campus.
              </p>
              {selectedLocation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-800">{selectedLocation.name}</h3>
                  <p className="text-sm text-blue-600">Accessible restroom available</p>
                </div>
              )}
              <div className="mt-4">
                <button 
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        console.log('Current location:', { lat: latitude, lng: longitude });
                        // You can add logic to find nearest restrooms here
                      });
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Find Restrooms Near Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bathroom Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
