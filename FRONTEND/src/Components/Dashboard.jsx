import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiMenu, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access the dashboard');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const [userResponse, sessionsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/sessions/my-sessions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userResponse.data);
        setSessions(sessionsResponse.data.sessions);
        setLoading(false);
      } catch (err) {
        console.error('Fetch data error:', err.response?.data, err.response?.status);
        setError(err.response?.data?.message || 'Failed to fetch data');
        setLoading(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.dispatchEvent(new Event('storage'));
  };

  const toggleQuestions = (sessionId) => {
    setVisibleQuestions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarLinks = [
    { name: 'Interview Prep', to: '/interview-prep' },
    // { name: 'Email Generator', to: '/email' },
    // { name: 'Resume Builder', to: '/resume' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-gray-500/20"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl shadow-gray-500/25 text-center transform animate-formEntrance">
          <p className="text-red-400 text-lg font-medium mb-6 animate-fadeInUp">{error}</p>
          <a
            href="/login"
            className="group relative inline-block px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">Go to Login</div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
            animation: 'twinkle 4s infinite ease-in-out',
          }}
        ></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 animate-particle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-4 sm:mx-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#0f172a]/90 backdrop-blur-xl border-r border-white/10 p-6 transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:static md:w-64 md:flex-shrink-0 md:translate-x-0`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Menu</h3>
            <button className="md:hidden text-2xl text-gray-300 hover:text-white" onClick={toggleSidebar}>
              <FiX />
            </button>
          </div>
          <div className="space-y-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block text-gray-200 hover:text-white text-lg font-medium tracking-wide transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`relative flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${
            isMounted ? 'animate-formEntrance' : 'opacity-0 translate-y-10'
          }`}
        >
          <button
            className="md:hidden text-3xl text-gray-300 hover:text-white mb-6"
            onClick={toggleSidebar}
          >
            <FiMenu />
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-8 text-center animate-fadeInUp">
            Welcome, {user?.name}!
          </h2>
          <div className="space-y-12">
            <div className="flex flex-col items-center space-y-6 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg animate-fadeInUp">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/20 shadow-xl transition-transform duration-500 hover:scale-110 hover:shadow-gray-500/30"
                  onError={(e) => {
                    console.error('Image failed to load:', user.image);
                    e.target.src = 'https://via.placeholder.com/96';
                  }}
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/5 flex items-center justify-center border-4 border-white/20 shadow-xl">
                  <span className="text-gray-400 text-xs sm:text-sm font-medium">No Image</span>
                </div>
              )}
              <div className="text-white text-center w-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-4">Profile Details</h3>
                <div className="grid grid-cols-1 gap-3 text-sm sm:text-base">
                  <p className="text-gray-300"><strong>Name:</strong> {user?.name}</p>
                  <p className="text-gray-300"><strong>Email:</strong> {user?.email}</p>
                  <p className="text-gray-300"><strong>Mobile:</strong> {user?.mobile}</p>
                  <p className="text-gray-300"><strong>Course:</strong> {user?.course}</p>
                  <p className="text-gray-300"><strong>Year/Class:</strong> {user?.year}</p>
                  <p className="text-gray-300"><strong>Roll Number:</strong> {user?.rollNumber}</p>
                  <p className="text-gray-300">
                    <strong>Address:</strong> {user?.address?.street}, {user?.address?.city},{' '}
                    {user?.address?.state}, {user?.address?.pincode}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 mb-8 animate-fadeInUp">Your Interview Prep Sessions</h3>
              {sessions.length === 0 ? (
                <p className="text-gray-400 text-center text-base sm:text-lg font-medium animate-fadeInUp">No sessions found. Create one in Interview Prep!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {sessions.map((session, index) => (
                    <div
                      key={session._id}
                      className="relative bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:shadow-gray-500/25 hover:-translate-y-2 transition-all duration-500 animate-fadeInUp"
                      style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-300/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative">
                        <h4 className="text-base sm:text-lg font-bold text-white mb-4">{session.role}</h4>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          <strong>Experience:</strong> {session.experience} Years
                        </p>
                        <p className="text-gray-300 text-xs sm:text-sm">
                          <strong>Skills:</strong> {session.topicsToFocus}
                        </p>
                        <button
                          onClick={() => toggleQuestions(session._id)}
                          className="group relative w-full mt-5 py-2.5 px-4 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative">{visibleQuestions[session._id] ? 'Hide Questions' : 'View Questions'}</div>
                        </button>
                        {visibleQuestions[session._id] && (
                          <div className="mt-6 space-y-5 animate-slideDown">
                            <h5 className="text-sm sm:text-md font-semibold text-gray-200">Questions</h5>
                            {session.questions.length === 0 ? (
                              <p className="text-gray-400 text-xs sm:text-sm">No questions in this session.</p>
                            ) : (
                              <div className="space-y-5">
                                {session.questions.map((q) => (
                                  <div
                                    key={q._id}
                                    className="bg-white/5 p-5 rounded-lg border border-white/10 transition-all duration-300 hover:border-gray-500/50 hover:shadow-md"
                                  >
                                    <h6 className="text-gray-200 font-medium text-xs sm:text-sm">{q.question}</h6>
                                    <div className="text-gray-300 prose prose-invert max-w-none text-xs sm:text-sm">
                                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-6 text-center text-gray-300 animate-fadeInUp">
              <a href="/interview-prep" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:scale-105 inline-block">
                Go to Interview Prep
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-200vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes formEntrance {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        .animate-formEntrance {
          animation: formEntrance 0.8s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .prose pre {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prose code {
          background-color: rgba(255, 255, 255, 0.03);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
        }

        @media (max-width: 640px) {
          .max-w-7xl {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Dashboard;