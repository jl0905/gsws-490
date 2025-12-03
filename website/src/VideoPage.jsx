import { Link } from 'react-router-dom';

const VideoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Same as main page */}
      <header className="bg-[#115740] shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
            w&m restroom-finder
          </Link>
          <Link 
            to="/" 
            className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
          >
            Back to Map 🧻
          </Link>
        </div>
      </header>

      {/* Video Container */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Project Video</h1>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-[500px]" 
              src="https://www.youtube.com/embed/IC-Wiuoc6nU" 
              title="Project Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#115740] text-white mt-12">
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
                Created for GSWS 490 to help locate gender-neutral and accessible restrooms on W&M's campus.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoPage;
