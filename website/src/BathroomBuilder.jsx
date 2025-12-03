import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BathroomBuilder = () => {
  const navigate = useNavigate();
  
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
      <header className="bg-wm-green shadow-sm dark:bg-wm-green transition-colors duration-500">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
            w&m restroom-finder
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">Map</Link>
            <Link to="/video" className="text-white hover:text-gray-200 transition-colors">Video</Link>
            <Link to="/game" className="text-wm-gold hover:text-yellow-300 transition-colors font-semibold">Game</Link>
          </nav>
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
    </div>
  );
};

export default BathroomBuilder;
