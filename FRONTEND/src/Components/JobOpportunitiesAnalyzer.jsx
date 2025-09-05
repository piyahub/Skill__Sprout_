import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, RefreshCw, Search, BarChart3, Users, Target, Sparkles, Zap, Briefcase } from 'lucide-react';
import OpportunitiesForm from './OpportunitiesForm';
import OpportunitiesChart from './OpportunitiesChart';
import PricingChart from './PricingChart';
import OpportunityCard from './OpportunityCard';
import { getJobOpportunitiesAnalysis } from '../services/geminiService';

const JobOpportunitiesAnalyzer = () => {
  const [formData, setFormData] = useState({
    domain: '',
    specialization: '',
    experience: 'entry',
    location: ''
  });
  
  const [opportunitiesData, setOpportunitiesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFormSubmit = async (data) => {
    setFormData(data);
    await fetchOpportunitiesData(data);
  };

  const fetchOpportunitiesData = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const analysis = await getJobOpportunitiesAnalysis(data);
      setOpportunitiesData(analysis);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch job opportunities data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!formData.domain || !formData.specialization) return;
    
    setIsRefreshing(true);
    await fetchOpportunitiesData(formData);
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (opportunitiesData && formData.domain && formData.specialization) {
        handleRefresh();
      }
    }, 7 * 24 * 60 * 60 * 1000); // 7 days

    return () => clearInterval(interval);
  }, [opportunitiesData, formData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden relative">
      <style>{`
        /* Starfield Background with CSS Shapes */
        .starfield-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        /* Star Shape and Twinkle Animation */
        .star {
          position: absolute;
          background: rgba(255, 255, 255, 0.8); /* Bright white for visibility */
          width: 2px;
          height: 2px;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); /* Star shape */
          animation: twinkle 3s infinite ease-in-out, float 15s infinite linear; /* Twinkle and float animations */
          opacity: 0.6;
        }
        /* Twinkle Animation for Stars */
        @keyframes twinkle {
          0% { opacity: 0.6; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(45deg); }
          100% { opacity: 0.6; transform: scale(0.8) rotate(0deg); }
        }
        /* Float Animation for Stars */
        @keyframes float {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-100vh); }
        }
        /* Define 50 Stars with Varied Positions, Sizes, and Animation Delays */
        .star:nth-child(1) { left: 5%; animation-duration: 15s; animation-delay: 0s; width: 3px; height: 3px; }
        .star:nth-child(2) { left: 8%; animation-duration: 14s; animation-delay: 0.2s; width: 2px; height: 2px; }
        .star:nth-child(3) { left: 12%; animation-duration: 16s; animation-delay: 0.4s; width: 2.5px; height: 2.5px; }
        .star:nth-child(4) { left: 15%; animation-duration: 15.5s; animation-delay: 0.6s; width: 3px; height: 3px; }
        .star:nth-child(5) { left: 18%; animation-duration: 14.5s; animation-delay: 0.8s; width: 2px; height: 2px; }
        .star:nth-child(6) { left: 22%; animation-duration: 15s; animation-delay: 1s; width: 2.5px; height: 2.5px; }
        .star:nth-child(7) { left: 25%; animation-duration: 16s; animation-delay: 1.2s; width: 3px; height: 3px; }
        .star:nth-child(8) { left: 28%; animation-duration: 14s; animation-delay: 1.4s; width: 2px; height: 2px; }
        .star:nth-child(9) { left: 32%; animation-duration: 15.5s; animation-delay: 1.6s; width: 2.5px; height: 2.5px; }
        .star:nth-child(10) { left: 35%; animation-duration: 14.5s; animation-delay: 1.8s; width: 3px; height: 3px; }
        .star:nth-child(11) { left: 38%; animation-duration: 15s; animation-delay: 2s; width: 2px; height: 2px; }
        .star:nth-child(12) { left: 42%; animation-duration: 16s; animation-delay: 2.2s; width: 2.5px; height: 2.5px; }
        .star:nth-child(13) { left: 45%; animation-duration: 14s; animation-delay: 2.4s; width: 3px; height: 3px; }
        .star:nth-child(14) { left: 48%; animation-duration: 15.5s; animation-delay: 2.6s; width: 2px; height: 2px; }
        .star:nth-child(15) { left: 52%; animation-duration: 14.5s; animation-delay: 2.8s; width: 2.5px; height: 2.5px; }
        .star:nth-child(16) { left: 55%; animation-duration: 15s; animation-delay: 3s; width: 3px; height: 3px; }
        .star:nth-child(17) { left: 58%; animation-duration: 16s; animation-delay: 3.2s; width: 2px; height: 2px; }
        .star:nth-child(18) { left: 62%; animation-duration: 14s; animation-delay: 3.4s; width: 2.5px; height: 2.5px; }
        .star:nth-child(19) { left: 65%; animation-duration: 15.5s; animation-delay: 3.6s; width: 3px; height: 3px; }
        .star:nth-child(20) { left: 68%; animation-duration: 14.5s; animation-delay: 3.8s; width: 2px; height: 2px; }
        .star:nth-child(21) { left: 72%; animation-duration: 15s; animation-delay: 4s; width: 2.5px; height: 2.5px; }
        .star:nth-child(22) { left: 75%; animation-duration: 16s; animation-delay: 4.2s; width: 3px; height: 3px; }
        .star:nth-child(23) { left: 78%; animation-duration: 14s; animation-delay: 4.4s; width: 2px; height: 2px; }
        .star:nth-child(24) { left: 82%; animation-duration: 15.5s; animation-delay: 4.6s; width: 2.5px; height: 2.5px; }
        .star:nth-child(25) { left: 85%; animation-duration: 14.5s; animation-delay: 4.8s; width: 3px; height: 3px; }
        .star:nth-child(26) { left: 88%; animation-duration: 15s; animation-delay: 5s; width: 2px; height: 2px; }
        .star:nth-child(27) { left: 92%; animation-duration: 16s; animation-delay: 5.2s; width: 2.5px; height: 2.5px; }
        .star:nth-child(28) { left: 95%; animation-duration: 14s; animation-delay: 5.4s; width: 3px; height: 3px; }
        .star:nth-child(29) { left: 7%; animation-duration: 15.5s; animation-delay: 5.6s; width: 2px; height: 2px; }
        .star:nth-child(30) { left: 10%; animation-duration: 14.5s; animation-delay: 5.8s; width: 2.5px; height: 2.5px; }
        .star:nth-child(31) { left: 13%; animation-duration: 15s; animation-delay: 6s; width: 3px; height: 3px; }
        .star:nth-child(32) { left: 16%; animation-duration: 16s; animation-delay: 6.2s; width: 2px; height: 2px; }
        .star:nth-child(33) { left: 19%; animation-duration: 14s; animation-delay: 6.4s; width: 2.5px; height: 2.5px; }
        .star:nth-child(34) { left: 23%; animation-duration: 15.5s; animation-delay: 6.6s; width: 3px; height: 3px; }
        .star:nth-child(35) { left: 26%; animation-duration: 14.5s; animation-delay: 6.8s; width: 2px; height: 2px; }
        .star:nth-child(36) { left: 29%; animation-duration: 15s; animation-delay: 7s; width: 2.5px; height: 2.5px; }
        .star:nth-child(37) { left: 33%; animation-duration: 16s; animation-delay: 7.2s; width: 3px; height: 3px; }
        .star:nth-child(38) { left: 36%; animation-duration: 14s; animation-delay: 7.4s; width: 2px; height: 2px; }
        .star:nth-child(39) { left: 39%; animation-duration: 15.5s; animation-delay: 7.6s; width: 2.5px; height: 2.5px; }
        .star:nth-child(40) { left: 43%; animation-duration: 14.5s; animation-delay: 7.8s; width: 3px; height: 3px; }
        .star:nth-child(41) { left: 46%; animation-duration: 15s; animation-delay: 8s; width: 2px; height: 2px; }
        .star:nth-child(42) { left: 49%; animation-duration: 16s; animation-delay: 8.2s; width: 2.5px; height: 2.5px; }
        .star:nth-child(43) { left: 53%; animation-duration: 14s; animation-delay: 8.4s; width: 3px; height: 3px; }
        .star:nth-child(44) { left: 56%; animation-duration: 15.5s; animation-delay: 8.6s; width: 2px; height: 2px; }
        .star:nth-child(45) { left: 59%; animation-duration: 14.5s; animation-delay: 8.8s; width: 2.5px; height: 2.5px; }
        .star:nth-child(46) { left: 63%; animation-duration: 15s; animation-delay: 9s; width: 3px; height: 3px; }
        .star:nth-child(47) { left: 66%; animation-duration: 16s; animation-delay: 9.2s; width: 2px; height: 2px; }
        .star:nth-child(48) { left: 69%; animation-duration: 14s; animation-delay: 9.4s; width: 2.5px; height: 2.5px; }
        .star:nth-child(49) { left: 73%; animation-duration: 15.5s; animation-delay: 9.6s; width: 3px; height: 3px; }
        .star:nth-child(50) { left: 76%; animation-duration: 14.5s; animation-delay: 9.8s; width: 2px; height: 2px; }

        /* Enhanced Fade-In Animation for Sections */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        /* Gradient Shift Animation for Headers */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Pulse Animation for Hover Effects */
        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        /* Rotate Animation for Icons on Hover */
        @keyframes rotateIcon {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* Border Glow Animation for Cards */
        @keyframes borderGlow {
          0% { border-color: rgba(55, 65, 81, 0.5); box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
          50% { border-color: rgba(229, 231, 235, 0.7); box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); }
          100% { border-color: rgba(55, 65, 81, 0.5); box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
        }
      `}</style>

      {/* Starfield Background with CSS Shapes */}
      <div className="starfield-container">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="star"></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeInUp_0.8s_ease-out]">
          <div className="flex items-center justify-center mb-8">
            <div className="relative group">
              <div className="bg-gradient-to-r from-gray-800 to-black p-4 rounded-full shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                <Briefcase className="w-10 h-10 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent mb-4 animate-[gradientShift_6s_ease_infinite] bg-[length:200%_200%]">
            Career Opportunities Analyzer
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out]">
            Discover trending job opportunities and market insights with AI-powered analysis. Get real-time data updated weekly to accelerate your career growth.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <OpportunitiesForm onSubmit={handleFormSubmit} loading={loading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-6 bg-red-900/30 border border-red-600/40 rounded-xl text-red-300 text-center shadow-lg animate-[fadeInUp_0.5s_ease-out] group hover:animate-[borderGlow_2s_ease-in-out_infinite]">
            <div className="flex items-center justify-center mb-2">
              <div className="w-5 h-5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              {error}
            </div>
          </div>
        )}

        {/* Results Section */}
        {opportunitiesData && (
          <div className="space-y-12">
            {/* Stats Header */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-transparent rounded-2xl blur-xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 sm:p-8 shadow-lg animate-[fadeInUp_0.6s_ease-out] group-hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-gray-800 to-black p-3 rounded-xl shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                      <BarChart3 className="w-6 h-6 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-200">Market Analysis Ready</h2>
                      <p className="text-sm sm:text-base text-gray-400">
                        {formData.specialization} in {formData.domain} • {formData.location || 'Global'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {lastUpdated && (
                      <div className="text-right animate-[fadeInUp_0.7s_ease-out]">
                        <p className="text-xs sm:text-sm text-gray-500">Last Updated</p>
                        <p className="text-sm sm:text-base text-gray-200 font-semibold">
                          {lastUpdated.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="relative group bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 disabled:opacity-50 px-4 py-2 rounded-xl text-gray-200 font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-gray-700/50 group-hover:animate-[borderGlow_2s_ease-in-out_infinite]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-transparent rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <RefreshCw className={`w-4 h-4 relative z-10 group-hover:animate-[rotateIcon_1s_ease-in-out] ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="relative z-10">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-transparent rounded-2xl blur-xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.7s_ease-out] group-hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-lg shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                      <TrendingUp className="w-5 h-5 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-200 ml-3">Job Demand Trends</h3>
                  </div>
                  <OpportunitiesChart data={opportunitiesData.opportunities} />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-transparent rounded-2xl blur-xl transition-all duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.7s_ease-out] group-hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-lg shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                      <DollarSign className="w-5 h-5 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-200 ml-3">Salary Ranges</h3>
                  </div>
                  <PricingChart data={opportunitiesData.opportunities} />
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-lg shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                  <Target className="w-5 h-5 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-200 ml-3 animate-[fadeInUp_0.8s_ease-out]">Top Career Opportunities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunitiesData.opportunities.map((opportunity, index) => (
                  <div key={index} className="group animate-[fadeInUp_0.9s_ease-out] hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                    <OpportunityCard opportunity={opportunity} rank={index + 1} />
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/15 to-transparent rounded-2xl blur-2xl"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/40 rounded-2xl p-6 sm:p-8 shadow-lg animate-[fadeInUp_0.8s_ease-out] group-hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-800/50 p-3 rounded-lg shadow-lg border border-gray-700/50 group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                    <Users className="w-6 h-6 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-200 ml-3">Market Insights</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center group animate-[fadeInUp_0.9s_ease-out]">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gray-200/10 rounded-2xl blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-gray-700/50 shadow-lg group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                        <TrendingUp className="w-8 h-8 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-2">Growth Rate</h4>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-200 mb-1">+{opportunitiesData.insights?.growthRate || '25'}%</p>
                    <p className="text-xs sm:text-sm text-gray-500">Year over year</p>
                  </div>
                  
                  <div className="text-center group animate-[fadeInUp_0.9s_ease-out]">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gray-200/10 rounded-2xl blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-gray-700/50 shadow-lg group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                        <DollarSign className="w-8 h-8 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-2">Avg. Salary</h4>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-200 mb-1">${opportunitiesData.insights?.avgSalary || '85,000'}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Annual median</p>
                  </div>
                  
                  <div className="text-center group animate-[fadeInUp_0.9s_ease-out]">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gray-200/10 rounded-2xl blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-gray-700/50 shadow-lg group-hover:animate-[pulseScale_1.5s_ease-in-out_infinite]">
                        <Users className="w-8 h-8 text-gray-200 group-hover:animate-[rotateIcon_1s_ease-in-out]" />
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-200 mb-2">Job Openings</h4>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-200 mb-1">{opportunitiesData.insights?.jobOpenings || '12,500'}+</p>
                    <p className="text-xs sm:text-sm text-gray-500">Available positions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="relative max-w-md mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/15 to-transparent rounded-2xl blur-2xl"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/40 rounded-2xl p-8 sm:p-12 shadow-lg animate-[fadeInUp_0.5s_ease-out] group-hover:animate-[borderGlow_2s_ease-in-out_infinite]">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-gray-600/40 border-t-gray-200 rounded-full mx-auto animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-gray-500/40 border-b-gray-300 rounded-full mx-auto animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3">Analyzing Market Data</h3>
                <p className="text-sm sm:text-base text-gray-400">AI is processing current market trends...</p>
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOpportunitiesAnalyzer;