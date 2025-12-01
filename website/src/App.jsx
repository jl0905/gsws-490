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

// Restroom locations on William & Mary campus with detailed information
const restroomLocations = [
  { 
    id: 1, 
    name: 'Wren Building', 
    position: { lat: 37.270805, lng: -76.708948 },
    description: '1 Restroom. Located on the 1st floor, near the North stairwell, across from the Great Hall. This is a single, centrally located restroom.'
  },
  { 
    id: 2, 
    name: 'Swem Library', 
    position: { lat: 37.269609, lng: -76.716252 },
    description: '4 Restrooms. Two restrooms are on the 1st floor (in the coffeeshop area), and two are on the Ground (Basement) floor. All facilities are wheelchair accessible; Ground floor restrooms are near the Copy Center.'
  },
  { 
    id: 3, 
    name: 'Zable Stadium (West Stadium)', 
    position: { lat: 37.272906, lng: -76.714939 },
    description: '4 restrooms, 2 each on main and upper concourse levels '
  },
  { 
    id: 4, 
    name: 'Miller - School of Business', 
    position: { lat: 37.2662, lng: -76.7181 },
    description: '3 Restrooms + 2 Restrooms/Showers. Facilities are spread across the Basement, 2nd floor, and 3rd floor. The Basement contains a combined 3 Restrooms/Showers. The 2nd and 3rd floors each have 1 restroom. Access is limited to 6 AM - 2 AM daily.'
  },
  { 
    id: 5, 
    name: 'School of Law', 
    position: { lat: 37.2653, lng: -76.7050 },
    description: '2 Restrooms. Both restrooms are located on the 1st floor, within the administrative suite. They are near the McGlothlin Court (Rooms 110 and 111).'
  },
  { 
    id: 6, 
    name: 'School of Education', 
    position: { lat: 37.2780, lng: -76.7236 },
    description: '1 Restroom + 1 Shower. Facilities are on the 1st and 2nd floors. The 2nd floor has 1 restroom. The 1st floor has 1 wheelchair accessible shower.'
  },
  { 
    id: 7, 
    name: 'Ewell Hall', 
    position: { lat: 37.2703, lng: -76.7100 },
    description: '2 Restrooms. Both restrooms are located on the 1st floor, in the hallway to the right from the main entrance. Both are wheelchair accessible.'
  },
  { 
    id: 8, 
    name: 'Tucker Hall', 
    position: { lat: 37.2714, lng: -76.7100 },
    description: '4 Restrooms. Two restrooms are in the Basement (west side) and two are on the 3rd floor. All are wheelchair accessible; 3rd-floor restrooms are located near the elevator area.'
  },
  { 
    id: 9, 
    name: 'Integrated Science Center (ISC)', 
    position: { lat: 37.269348, lng: -76.714490 },
    description: '8 Restrooms. Two restrooms are available on each of the four levels: Ground, 1st, 2nd, and 3rd floors. All restrooms are wheelchair accessible and located near the elevator area.'
  },
  { 
    id: 10, 
    name: 'Small Hall', 
    position: { lat: 37.268835, lng: -76.717067 },
    description: '2 Restrooms + 1 Shower. Facilities are in the Basement and on the 1st and 2nd floors. The Basement has 1 restroom and 1 shower. The 1st floor has 1 restroom. The 2nd floor has 1 restroom near room 260. All are wheelchair accessible.'
  },
  { 
    id: 11, 
    name: 'Boswell Hall', 
    position: { lat: 37.267327, lng: -76.716717 },
    description: '8 Restrooms. Two restrooms are available on each of the four levels: Ground, 1st, 2nd, and 3rd floors. Note that one restroom on the 2nd floor and one on the 3rd floor are designated for Faculty/Staff Only (Rooms 208 and 339).'
  },
  { 
    id: 12, 
    name: 'Chancellors Hall (Tyler Hall)', 
    position: { lat: 37.271432, lng: -76.710787 },
    description: '1 Restroom + 1 Shower. Located on the 4th floor, room 455. This is a single wheelchair accessible restroom with a shower.'
  },
  { 
    id: 13, 
    name: 'Blow Hall', 
    position: { lat: 37.272056, lng: -76.711287 },
    description: '4 Restrooms. Two restrooms are on the 1st floor and two are on the 2nd floor. All are located in the main hallway on the North side of the building and are wheelchair accessible.'
  },
  { 
    id: 14, 
    name: 'Undergraduate Admission', 
    position: { lat: 37.269545, lng: -76.709114 },
    description: '2 Restrooms. Both restrooms are located on the 1st floor, near staff offices and a door marked "Private." Both are wheelchair accessible.'
  },
  { 
    id: 15, 
    name: 'Reves Center', 
    position: { lat: 37.2719, lng: -76.7088 },
    description: '2 Restrooms. Both restrooms are on the 1st floor, near the Jamestown Road entrance. Each restroom has two entrance doors and is wheelchair accessible.'
  },
  { 
    id: 16, 
    name: 'Sadler Center', 
    position: { lat: 37.271620, lng: -76.714146 },
    description: '2 Restrooms. Both restrooms are on the 1st floor, near the info desk, in the side hallway to the Colony Room. Location is in the main student union building; building hours vary.'
  },
  { 
    id: 17, 
    name: 'Rec Center', 
    position: { lat: 37.274314, lng: -76.720905 },
    description: '1 Shower + 1 Rest/Shower Room. The facility is located on the 1st (Lowest) level, next to the sauna. Access is through the pool or gendered locker rooms.'
  },
  { 
    id: 18, 
    name: 'Daily Grind', 
    position: { lat: 37.271114, lng: -76.714126 },
    description: '1 Restroom. The restroom is located inside the front entrance to the right. This is a single restroom facility.'
  }
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

  // Debug logs
  console.log('Rendering map with locations:', restroomLocations);
  console.log('Google Maps API Key exists:', !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  console.log('Is map loaded?', isMapLoaded);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#115740] shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">w&m restroom-finder</h1>
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
                zoom={15}
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
                {isMapLoaded ? (
                  restroomLocations.map((location) => {
                    console.log('Adding marker for:', location.name, 'at', location.position);
                    return (
                      <Marker
                        key={location.id}
                        position={location.position}
                        onClick={() => handleMarkerClick(location)}
                        icon={{
                          url: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
                          scaledSize: new window.google.maps.Size(32, 32),
                          anchor: new window.google.maps.Point(16, 16)
                        }}
                      />
                    );
                  })
                ) : (
                  <div>Loading map...</div>
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* Description Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Find Accessible Restrooms Near You</h2>
              <p className="text-gray-600 mb-4">
                A project for GSWS 490, in particular a response for our second performance draft/vlog.
                The website's goal is to find the nearest gender neutral/accessible restrooms on the w&m campus.
              </p>
              {selectedLocation ? (
                <div className="mt-4 p-4 rounded-md border border-blue-100 bg-[#866F45] hover:bg-[#9a7f4f]">
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedLocation.name}</h3>
                  <div className="space-y-2">
                    {selectedLocation.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-sm text-gray-50">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {selectedLocation.id === 11 && (
                    <div className="mt-3 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                      <p className="text-sm">Note: Some restrooms may have restricted access.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 p-4 bg-gray-50 rounded-md text-center">
                  <p className="text-gray-500">Click on a location marker to see restroom details</p>
                </div>
              )}
              <div className="mt-4">
                <button 
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        console.log('Current location:', { lat: latitude, lng: longitude });
                        // You can add logic to #866F45 nearest restrooms here
                      });
                    }
                  }}
                  className="bg-[#866F45] hover:bg-[#9a7f4f] text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Find Restrooms Near Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#115740] text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gender, Sexuality & Women's Studies */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://www.wm.edu/as/gsws/" className="text-base text-gray-100 hover:text-white transition-colors">
                    GSWS Department
                  </a>
                </li>
                <li>
                  <a href="https://www.wm.edu/as/gsws/undergraduateprogram/" className="text-base text-gray-100 hover:text-white transition-colors">
                    Majors & Minors
                  </a>
                </li>
                <li>
                  <a href="https://www.wm.edu/admission/undergraduateadmission/how-to-apply/" className="text-base text-gray-100 hover:text-white transition-colors">
                    Apply to W&M
                  </a>
                </li>
              </ul>
            </div>
            
            {/* W&M Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">‌</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://www.wm.edu/offices/psi/thecenter/documents/all-gender-and-single-occupancy-facility-list.pdf" className="text-base text-gray-100 hover:text-white transition-colors">
                    Accessible Restrooms Locations
                  </a>
                </li>
                <li>
                  <a href="https://www.wm.edu/offices/studentsuccess/studentaccessibilityservices/" className="text-base text-gray-100 hover:text-white transition-colors">
                    Student Accessibility Services
                  </a>
                </li>
                <li>
                  <a href="https://my.wm.edu" className="text-base text-gray-100 hover:text-white transition-colors">
                    myWM Portal
                  </a>
                </li>
              </ul>
            </div>
            
            {/* About This Project */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">About This Project</h3>
              <p className="mt-4 text-base text-gray-100">
                Created for GSWS 490 to help locate gender-neutral and accessible restrooms on W&M's campus.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-200">
              This is an open-source project. Find the code on <a href="https://github.com/jl0905/gsws-490" className="text-white font-medium hover:underline">GitHub</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
