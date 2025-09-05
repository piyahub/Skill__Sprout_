import React from 'react';
import { TrendingUp, DollarSign, Users, Clock, Star, Zap, Briefcase } from 'lucide-react';

const OpportunityCard = ({ opportunity, rank }) => {
  const getRankColor = (rank) => {
    if (rank <= 3) return 'from-white to-gray-300';
    if (rank <= 6) return 'from-gray-400 to-gray-600';
    return 'from-gray-600 to-gray-800';
  };

  const getDemandLevel = (demand) => {
    if (demand >= 80) return { level: 'Very High', color: 'text-white', bg: 'bg-white/20' };
    if (demand >= 60) return { level: 'High', color: 'text-gray-300', bg: 'bg-gray-300/20' };
    if (demand >= 40) return { level: 'Medium', color: 'text-gray-400', bg: 'bg-gray-400/20' };
    return { level: 'Low', color: 'text-gray-500', bg: 'bg-gray-500/20' };
  };

  const demandInfo = getDemandLevel(opportunity.demand);

  return (
    <div className="relative group animate-slide-up" style={{animationDelay: `${rank * 0.1}s`}}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-300/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-gray-600/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl shadow-xl">
        
        {/* Rank Badge and Demand Level */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(rank)} rounded-full blur-lg opacity-30`}></div>
            <div className={`relative bg-gradient-to-r ${getRankColor(rank)} text-black px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center space-x-1`}>
              <Star className="w-3 h-3" />
              <span>#{rank}</span>
            </div>
          </div>
          <div className={`${demandInfo.color} font-bold text-sm ${demandInfo.bg} px-3 py-1 rounded-full border border-current/20`}>
            {demandInfo.level}
          </div>
        </div>

        {/* Opportunity Name */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="bg-white/10 p-2 rounded-lg mr-3 border border-gray-600">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
              {opportunity.name}
            </h3>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full transition-all duration-1000 shadow-lg"
              style={{ width: `${opportunity.demand}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3 border border-gray-600">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium">Demand Score</span>
            </div>
            <span className="text-white font-bold text-lg">{opportunity.demand}/100</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3 border border-gray-600">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium">Avg Salary</span>
            </div>
            <span className="text-white font-bold text-lg">${opportunity.salary?.toLocaleString() || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3 border border-gray-600">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium">Growth Rate</span>
            </div>
            <span className="text-white font-bold text-lg">+{opportunity.growth || Math.floor(Math.random() * 30 + 10)}%</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors duration-300">
            <div className="flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-3 border border-gray-600">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium">Experience Req.</span>
            </div>
            <span className="text-white font-bold text-lg">{opportunity.experienceReq || '2-4 years'}</span>
          </div>
        </div>

        {/* Market Penetration Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/30 to-black/30 rounded-xl border border-gray-600/20">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Market Penetration</span>
            <span>{opportunity.demand}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-white to-gray-400 h-3 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
                style={{ width: `${opportunity.demand}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;