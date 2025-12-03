import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Helper function to get the initial theme
const getInitialTheme = () => {
  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    return true;
  }
  // Check system preference if no saved theme
  if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  return false;
};

const BathroomBuilder = () => {
  const navigate = useNavigate();
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Dark mode logic
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Door shake keyframes for the door minigame
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes doorShake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(15deg); }
        75% { transform: rotate(-15deg); }
      }
      .door-shake {
        animation: doorShake 0.5s ease-in-out;
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Door minigame state (for Video link)
  const [doorClicks, setDoorClicks] = useState(0);
  const [requiredClicks, setRequiredClicks] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  const handleVideoClick = (e) => {
    e.preventDefault();

    if (!isGameActive) {
      const clicksNeeded = Math.floor(Math.random() * 5) + 1;
      setRequiredClicks(clicksNeeded);
      setDoorClicks(0);
      setIsGameActive(true);

      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      const newClicks = doorClicks + 1;
      setDoorClicks(newClicks);

      if (newClicks >= requiredClicks) {
        setIsGameActive(false);
        setIsShaking(false);
        navigate('/video');
      }
    }
  };

  // Game state - track which elements have been transformed
  const [gameState, setGameState] = useState({
    cabinetsRemoved: false,
    stallsUpgraded: false,
    grabBarsAdded: false,
    soapDispenserAdded: false,
    changingStationAdded: false,
    emergencyButtonAdded: false
  });

  // Calculate completion percentage
  const completedTasks = Object.values(gameState).filter(Boolean).length;
  const totalTasks = Object.keys(gameState).length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Handle element clicks
  const handleElementClick = (element) => {
    setGameState(prev => ({
      ...prev,
      [element]: true
    }));
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      cabinetsRemoved: false,
      stallsUpgraded: false,
      grabBarsAdded: false,
      soapDispenserAdded: false,
      changingStationAdded: false,
      emergencyButtonAdded: false
    });
  };

  // Educational tooltips for each element
  const tooltips = {
    cabinetsRemoved: "Removing under-sink cabinets provides knee clearance for wheelchair users (29\" min height required)",
    stallsUpgraded: "ADA stalls need 60\" width, 56\" depth, and proper grab bars for wheelchair accessibility",
    grabBarsAdded: "Grab bars must be 33-36\" high and 1.25-1.5\" in diameter for proper support",
    soapDispenserAdded: "Soap dispensers should be mounted at 40\" max height for reachability",
    changingStationAdded: "Baby changing stations in accessible restrooms serve all families and caregivers",
    emergencyButtonAdded: "Emergency call buttons at 36-48\" height ensure safety for all users"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-[#115740] shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">w&m restroom-finder</Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4 relative">
            {/* Map Button */}
            <Link 
              to="/"
              className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
            >
              Map
            </Link>



            <Link 
              to="/video"
              className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
              onClick={handleVideoClick}
            >
              Video<span className={isShaking ? 'door-shake' : ''}>🚪</span>
            </Link>
            
            <Link 
              to="/game"
              className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
            >
              Game
            </Link>

            {isGameActive && (
              <div className="absolute top-full mt-2 right-0 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded-md shadow-lg text-sm whitespace-nowrap z-10">
                Click the door {requiredClicks - doorClicks} more time{requiredClicks - doorClicks !== 1 ? 's' : ''}!
              </div>
            )}

            {/* Dark Mode Toggle Button */}
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                // Sun icon for light mode (currently dark)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                // Moon icon for dark mode (currently light)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>
          </div>

            
        </div>
      </header>

      {/* Main Game Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Game Title and Instructions */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-6 transition-colors">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Accessible Bathroom Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Transform this inaccessible bathroom into an accessible space! Click on each element to learn about accessibility requirements and make the bathroom usable for everyone.
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress: {completedTasks}/{totalTasks} tasks completed</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-wm-green h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetGame}
              className="bg-wm-green text-white px-4 py-2 rounded hover:bg-wm-green-dark transition-colors"
            >
              Reset Game
            </button>
          </div>

          {/* Bathroom POV Container */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-8 transition-colors">
            <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-96 mb-6 overflow-hidden">
              {/* Bathroom POV Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚽</div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    Bathroom POV View
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    (This will be replaced with SVG/PNG bathroom perspective)
                  </p>
                </div>
              </div>

              {/* Interactive Elements - Clickable Areas */}
              <div className="absolute top-10 left-10">
                <button
                  onClick={() => handleElementClick('cabinetsRemoved')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.cabinetsRemoved 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to remove cabinets"
                >
                  {gameState.cabinetsRemoved ? '✓' : '🗄️'} Cabinets
                </button>
              </div>

              <div className="absolute top-10 right-10">
                <button
                  onClick={() => handleElementClick('stallsUpgraded')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.stallsUpgraded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to upgrade stalls"
                >
                  {gameState.stallsUpgraded ? '✓' : '🚪'} Stalls
                </button>
              </div>

              <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
                <button
                  onClick={() => handleElementClick('grabBarsAdded')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.grabBarsAdded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to add grab bars"
                >
                  {gameState.grabBarsAdded ? '✓' : '🔧'} Grab Bars
                </button>
              </div>

              <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
                <button
                  onClick={() => handleElementClick('soapDispenserAdded')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.soapDispenserAdded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to add soap dispenser"
                >
                  {gameState.soapDispenserAdded ? '✓' : '🧼'} Soap
                </button>
              </div>

              <div className="absolute bottom-10 left-10">
                <button
                  onClick={() => handleElementClick('changingStationAdded')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.changingStationAdded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to add changing station"
                >
                  {gameState.changingStationAdded ? '✓' : '👶'} Changing Station
                </button>
              </div>

              <div className="absolute bottom-10 right-10">
                <button
                  onClick={() => handleElementClick('emergencyButtonAdded')}
                  className={`p-3 rounded-lg transition-all ${
                    gameState.emergencyButtonAdded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                  }`}
                  title="Click to add emergency button"
                >
                  {gameState.emergencyButtonAdded ? '✓' : '🆘'} Emergency
                </button>
              </div>
            </div>

            {/* Educational Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(gameState).map(([key, completed]) => (
                <div 
                  key={key}
                  className={`p-4 rounded-lg border transition-all ${
                    completed 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700' 
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {completed ? tooltips[key] : "Click the corresponding element in the bathroom to learn more."}
                  </p>
                </div>
              ))}
            </div>

            {/* Completion Message */}
            {completionPercentage === 100 && (
              <div className="mt-6 p-6 bg-green-50 border-l-4 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300">
                <h3 className="text-lg font-semibold mb-2">🎉 Congratulations!</h3>
                <p>You've successfully transformed this bathroom into an accessible space! You now understand the key elements that make bathrooms usable for people with disabilities.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#115740] text-white mt-12 transition-colors">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* W&M Resources */}
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
            
            {/* W&M Resources continued */}
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

            <div></div>
            
            {/* About This Project */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">About This Project</h3>
              <p className="mt-4 text-base text-gray-100">
                Created for GSWS 490 to help locate and teach about gender-neutral and accessible restrooms on W&M's campus.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BathroomBuilder;
