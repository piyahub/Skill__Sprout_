
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeEmbed = () => {
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access the resume builder');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        // Set a 6-second timeout for the authentication request
        const authPromise = axios.get(`${import.meta.env.VITE_BACKEND_URL}api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Authentication request timed out')), 6000);
        });

        await Promise.race([authPromise, timeoutPromise]);
        setLoading(false);
      } catch (err) {
        console.error('Authentication error:', err.message);
        setError(err.message === 'Authentication request timed out' 
          ? 'Authentication timed out after 6 seconds. Please try again.' 
          : err.response?.data?.message || 'Failed to authenticate');
        setLoading(false);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkAuth();

    // Fallback to show iframe after 6 seconds if onLoad doesn't trigger
    const fallbackTimer = setTimeout(() => {
      if (!iframeLoaded) {
        console.warn('Iframe load fallback triggered after 6 seconds');
        setIframeLoaded(true);
      }
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, [navigate, iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    console.error('Iframe failed to load');
    setError('Failed to load the resume builder after 6 seconds. Please try again later.');
    setIframeLoaded(true);
    setLoading(false);
  };

  if (loading || !iframeLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-gray-500/20"></div>
        </div>
        {/* Preload iframe in the background */}
        <iframe
          src="https://resumebuild.lovable.app/"
          title="Resume Builder"
          width="100%"
          height="100%"
          style={{ border: 'none', position: 'absolute', top: 0, left: 0, opacity: 0 }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
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
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10 w-full h-screen animate-iframeFadeIn">
        <iframe
          src="https://resumebuild.lovable.app/"
          title="Resume Builder"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
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

        @keyframes iframeFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-formEntrance {
          animation: formEntrance 0.8s ease-out forwards;
        }

        .animate-iframeFadeIn {
          animation: iframeFadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ResumeEmbed;