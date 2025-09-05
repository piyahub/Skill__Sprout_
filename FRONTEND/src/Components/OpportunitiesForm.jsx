import React, { useState } from 'react';
import { Search, MapPin, Briefcase, User, Sparkles, Zap } from 'lucide-react';

const OpportunitiesForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    domain: '',
    specialization: '',
    experience: 'entry'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.domain && formData.specialization) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset specialization when domain changes
      ...(name === 'domain' && { specialization: '' })
    });
  };

  const domains = [
    'Technology', 
    'Healthcare', 
    'Finance', 
    'Education', 
    'Media'
  ];

  const specializations = {
    'Technology': [
      'Software Developer',
      'Data Scientist',
      'DevOps Engineer',
      'Cybersecurity Specialist',
      'Cloud Architect',
      'Mobile App Developer',
      'AI/ML Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Database Administrator',
      'System Administrator',
      'Network Engineer',
      'Product Manager',
      'UX/UI Designer',
      'Quality Assurance Engineer',
      'Blockchain Developer'
    ],
    'Healthcare': [
      'Doctor/Physician',
      'Nurse',
      'Medical Technologist',
      'Healthcare Administrator',
      'Physical Therapist',
      'Pharmacist',
      'Medical Researcher',
      'Healthcare Data Analyst',
      'Medical Software Specialist',
      'Clinical Coordinator',
      'Healthcare Compliance Officer',
      'Medical Device Specialist',
      'Telemedicine Specialist',
      'Healthcare Quality Manager',
      'Medical Billing Specialist'
    ],
    'Finance': [
      'Financial Analyst',
      'Investment Banker',
      'Risk Manager',
      'Accountant',
      'Financial Advisor',
      'Credit Analyst',
      'Compliance Officer',
      'Auditor',
      'Portfolio Manager',
      'Quantitative Analyst',
      'Insurance Underwriter',
      'Tax Specialist',
      'Financial Planner',
      'Treasury Analyst',
      'FinTech Developer'
    ],
    'Education': [
      'Teacher',
      'Professor',
      'Educational Administrator',
      'Curriculum Developer',
      'Educational Technology Specialist',
      'School Counselor',
      'Instructional Designer',
      'Academic Advisor',
      'Education Researcher',
      'Training Coordinator',
      'Learning Experience Designer',
      'Educational Data Analyst',
      'Online Course Creator',
      'Educational Consultant'
    ],
    'Media': [
      'Content Creator',
      'Journalist',
      'Video Editor',
      'Graphic Designer',
      'Social Media Manager',
      'Digital Marketing Specialist',
      'Copywriter',
      'Photographer',
      'Videographer',
      'Audio Engineer',
      'Web Designer',
      'Brand Manager',
      'Public Relations Specialist',
      'Content Strategist',
      'Media Producer'
    ]
  };

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-300/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
        <div className="flex items-center mb-8">
          <div className="relative mr-6">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-gray-800 to-black p-4 rounded-2xl shadow-xl border border-gray-600">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Get AI Market Analysis</h2>
            <p className="text-gray-300 text-lg">Discover trending job opportunities and competitive salaries in your field</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Domain */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <Briefcase className="w-4 h-4 inline mr-2 text-white" />
                Domain
              </label>
              <div className="relative">
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 transition-all duration-300 text-lg backdrop-blur-lg hover:bg-gray-800/70 group-hover:border-white/30"
                >
                  <option value="" className="bg-gray-800">Select Domain</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain} className="bg-gray-800">
                      {domain}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Specialization */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <User className="w-4 h-4 inline mr-2 text-white" />
                Specialization
              </label>
              <div className="relative">
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  disabled={!formData.domain}
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 transition-all duration-300 text-lg backdrop-blur-lg hover:bg-gray-800/70 group-hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" className="bg-gray-800">
                    {formData.domain ? 'Select Specialization' : 'Select Domain First'}
                  </option>
                  {formData.domain && specializations[formData.domain]?.map(spec => (
                    <option key={spec} value={spec} className="bg-gray-800">
                      {spec}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="group md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                <Briefcase className="w-4 h-4 inline mr-2 text-white" />
                Experience Level
              </label>
              <div className="relative">
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 transition-all duration-300 text-lg backdrop-blur-lg hover:bg-gray-800/70 group-hover:border-white/30"
                >
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value} className="bg-gray-800">
                      {level.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.domain || !formData.specialization}
            className="relative w-full group overflow-hidden bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-6 rounded-2xl text-white font-bold text-xl transition-all duration-300 flex items-center justify-center space-x-4 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-white/10 border border-gray-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-300/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            {loading ? (
              <>
                <div className="relative z-10 w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="relative z-10">Analyzing Market...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6 relative z-10 animate-pulse" />
                <span className="relative z-10">Analyze Career Opportunities</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpportunitiesForm;