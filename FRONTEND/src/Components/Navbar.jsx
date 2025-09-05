import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  // Monitor authentication status changes
  useEffect(() => {
    setIsVisible(true);
    
    // Add event listener for storage changes (for cross-tab sync)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check token periodically
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (linkName) => {
    setOpenDropdown(openDropdown === linkName ? null : linkName);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate('/login');
    window.dispatchEvent(new Event('storage')); // Trigger storage event
  };

  const handleMouseEnter = (linkName) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding to prevent flickering
    setTimeout(() => {
      setHoveredLink(null);
    }, 100);
  };

  const navLinks = [
    { name: 'Home', to: '/',
      subLinks: [
        {name: 'Home', to: '/'},
        { name: 'About Us', to: '/about' },
      ],
     },
    {
      name: 'Career Tools',
      subLinks: [
        { name: 'Career Path', to: '/career' },
        // { name: 'Resume Builder', to: '/resume' },
        { name: 'Market Insights', to: '/carreranalyzer' },
        // { name: 'LinkedIn Optimizer', to: '/linkedin' },
        { name: 'Skill Gap Amalyzer', to: '/skillanalyzer' },
        { name: 'Online Exam', to: '/assesment' },
      ],
    },
    // { name: 'Contact', to: '/contact' }
    ,
    ...(isAuthenticated ? [{ name: 'Dashboard', to: '/dashboard' }] : [{ name: 'Login', to: '/login' }]),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      }`}
    >
      <div className="backdrop-blur-xl bg-[#020617]/90 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <div
            className="text-3xl font-bold tracking-wide bg-gray-300 text-transparent bg-clip-text"
            style={{ fontFamily: "'Rowdies', sans-serif", fontWeight: '500' }}
          >
            Skill_Sprout
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.subLinks ? (
                  <div 
                    className="relative py-2"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out cursor-pointer px-2">
                      {link.name}
                      <FiChevronDown className="ml-1" />
                    </div>
                    <div
                      className={`absolute left-0 top-full w-48 bg-[#0f172a]/95 backdrop-blur-md border border-gray-700 rounded-md shadow-lg transition-all duration-200 ease-in-out z-10 ${
                        hoveredLink === link.name 
                          ? 'opacity-100 translate-y-0 pointer-events-auto' 
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                      style={{ marginTop: '0px' }}
                    >
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.to}
                          className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-700/50 transition duration-200 first:rounded-t-md last:rounded-b-md"
                          onClick={() => setHoveredLink(null)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className="relative text-gray-300 hover:text-white font-medium group transition duration-300 ease-in-out px-2 py-2"
                  >
                    {link.name}
                    <span className="absolute left-2 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-[calc(100%-16px)] rounded-full"></span>
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out px-2 py-2"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-3xl text-gray-300 hover:text-white transition"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a]/90 backdrop-blur-md border-t border-gray-700 px-6 py-4 space-y-3 animate-slide-down">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center justify-between w-full text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
                    >
                      {link.name}
                      <FiChevronDown 
                        className={`transition-transform duration-300 ${
                          openDropdown === link.name ? 'rotate-180' : 'rotate-0'
                        }`} 
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-2 space-y-2">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            to={subLink.to}
                            onClick={() => setMenuOpen(false)}
                            className="block pl-4 py-1 text-gray-300 hover:text-white text-base font-medium tracking-wide transition-all duration-200 hover:bg-gray-700/30 rounded-md"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;