

// nnew
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const SkillAnalyzer = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    jobDescription: '',
    experience: '',
    type: 'job',
    currentSkills: ''
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const genAI = new GoogleGenerativeAI('AIzaSyBnWJ8qiTLZrKvg25Y-JOOgcv1aiczzNdQ'); // new api key using skill analyzer email dipanjali

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enhanced JSON parsing with better error handling
  const cleanAndParseJSON = (text) => {
    try {
      // First, try to find JSON within code blocks
      let jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (!jsonMatch) {
        jsonMatch = text.match(/```\n([\s\S]*?)\n```/);
      }
      
      let jsonString = jsonMatch ? jsonMatch[1] : text;
      
      // Find JSON object boundaries more carefully
      const jsonStart = jsonString.indexOf('{');
      let jsonEnd = jsonString.lastIndexOf('}');
      
      if (jsonStart === -1) {
        throw new Error('No valid JSON structure found in AI response');
      }
      
      // If we can't find a proper closing brace, try to recover
      if (jsonEnd === -1 || jsonEnd <= jsonStart) {
        // Try to find where the JSON might have been cut off
        let braceCount = 0;
        let lastValidEnd = -1;
        
        for (let i = jsonStart; i < jsonString.length; i++) {
          if (jsonString[i] === '{') {
            braceCount++;
          } else if (jsonString[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              lastValidEnd = i;
              break;
            }
          }
        }
        
        if (lastValidEnd > jsonStart) {
          jsonEnd = lastValidEnd;
        } else {
          // If we still can't find a valid end, try to construct a minimal valid JSON
          throw new Error('Incomplete JSON response received from AI');
        }
      }
      
      jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
      
      // Enhanced JSON cleaning - handle quotes in values better
      jsonString = jsonString
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        // Fix unquoted keys
        .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
        // Handle multiline strings in JSON values
        .replace(/:\s*"([^"]*)\n([^"]*?)"/g, (match, p1, p2) => {
          return `:"${p1.replace(/\n/g, ' ')} ${p2.replace(/\n/g, ' ')}"`;
        })
        // Clean up extra whitespace
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Try to parse the cleaned JSON
      const parsed = JSON.parse(jsonString);
      
      // Validate required structure and provide defaults if missing
      const validatedData = {
        jobAnalysis: parsed.jobAnalysis || {
          title: formData.jobRole || 'Software Developer',
          description: 'Job analysis will be available after successful parsing',
          marketDemand: 'High',
          salaryRange: 'Competitive',
          industryTrends: 'Growing market demand',
          keyResponsibilities: ['Develop software applications', 'Collaborate with team', 'Maintain code quality'],
          requiredQualifications: ['Technical skills', 'Problem solving', 'Team collaboration']
        },
        skillsAnalysis: parsed.skillsAnalysis || {
          currentSkillsAssessed: [],
          skillGaps: [],
          overallAssessment: 'Analysis in progress'
        },
        learningRoadmap: parsed.learningRoadmap || [],
        careerGuidance: parsed.careerGuidance || {
          readinessLevel: 70,
          jobMatchPercentage: 75,
          competitiveAdvantages: ['Strong foundation'],
          weaknesses: ['Areas for improvement'],
          immediateActions: ['Continue learning', 'Build projects', 'Network with professionals'],
          mediumTermGoals: ['Advance skills', 'Gain experience'],
          interviewPreparation: ['Technical concepts', 'Problem solving', 'Communication skills'],
          certifications: ['Relevant certifications for your field'],
          networkingAdvice: 'Connect with industry professionals',
          portfolioSuggestions: 'Build diverse project portfolio'
        }
      };
      
      return validatedData;
      
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw text:', text);
      
      // Return a fallback structure instead of throwing
      return {
        jobAnalysis: {
          title: formData.jobRole || 'Software Developer',
          description: 'Unable to parse full job analysis. Please try again with a more specific job description.',
          marketDemand: 'High',
          salaryRange: 'Competitive salary range based on experience',
          industryTrends: 'Technology sector continues to grow',
          keyResponsibilities: [
            'Develop and maintain software applications',
            'Collaborate with cross-functional teams',
            'Write clean, maintainable code',
            'Participate in code reviews'
          ],
          requiredQualifications: [
            'Strong programming fundamentals',
            'Problem-solving skills',
            'Team collaboration abilities'
          ]
        },
        skillsAnalysis: {
          currentSkillsAssessed: formData.currentSkills ? [{
            skill: 'General Programming',
            currentLevel: 60,
            category: 'technical',
            marketRelevance: 'high',
            assessment: 'Based on your listed skills, you have a good foundation',
            strengths: 'Diverse skill set',
            improvementAreas: 'Deepen expertise in core technologies',
            marketValue: 'High'
          }] : [],
          skillGaps: [{
            skill: 'Advanced Problem Solving',
            currentLevel: 50,
            requiredLevel: 80,
            priority: 'high',
            category: 'technical',
            whyNeeded: 'Essential for software development roles',
            marketDemand: 'Very High',
            difficultyToLearn: 'intermediate',
            timeToLearn: '3-6 months with consistent practice'
          }],
          overallAssessment: 'You have a solid foundation. Focus on deepening your expertise in key areas.'
        },
        learningRoadmap: [{
          skill: 'Core Programming Concepts',
          priority: 1,
          estimatedTime: '4-8 weeks',
          difficulty: 'intermediate',
          importance: 'Strengthen your foundation in programming fundamentals',
          learningPath: {
            phase1: 'Week 1-2: Review fundamentals and data structures',
            phase2: 'Week 3-4: Practice algorithms and problem solving',
            phase3: 'Week 5-8: Build projects and apply concepts',
            practiceProjects: [
              'Build a portfolio website',
              'Create a small web application'
            ],
            resources: {
              free: [
                'freeCodeCamp',
                'Codecademy free courses',
                'YouTube programming tutorials'
              ],
              paid: [
                'Udemy courses',
                'Pluralsight subscription'
              ]
            },
            milestones: [
              'Complete 5 coding challenges',
              'Build 1 complete project',
              'Get code reviewed by peers'
            ]
          }
        }],
        careerGuidance: {
          readinessLevel: 70,
          jobMatchPercentage: 75,
          competitiveAdvantages: [
            'Willingness to learn and adapt',
            'Foundation in multiple technologies'
          ],
          weaknesses: [
            'May need more practical experience',
            'Could benefit from specialized expertise'
          ],
          immediateActions: [
            'Build a strong portfolio with 2-3 projects',
            'Practice coding problems daily',
            'Network with professionals in your field',
            'Keep learning and staying updated with technology trends'
          ],
          mediumTermGoals: [
            'Gain 6 months of practical experience',
            'Contribute to open source projects'
          ],
          interviewPreparation: [
            'Data structures and algorithms',
            'System design basics',
            'Behavioral questions and soft skills'
          ],
          certifications: [
            'Cloud platform certifications (AWS, Azure, GCP)',
            'Framework-specific certifications'
          ],
          networkingAdvice: 'Join developer communities, attend meetups, and connect with professionals on LinkedIn',
          portfolioSuggestions: 'Include diverse projects that showcase different skills and technologies'
        }
      };
    }
  };

  const analyzeSkills = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCurrentStep(1);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Enhanced and more detailed prompt with better JSON structure guidance
      const prompt = `
        You are a Senior Technical Career Analyst and Skills Assessment Expert. Your job is to provide comprehensive, accurate, and actionable career guidance.

        CANDIDATE INFORMATION:
        - Target Role: ${formData.jobRole}
        - Experience Level: ${formData.experience}
        - Position Type: ${formData.type}
        - Job Description: ${formData.jobDescription || 'Standard industry requirements for the role'}
        - Current Skills: ${formData.currentSkills}

        CRITICAL ANALYSIS REQUIREMENTS:
        1. Conduct a thorough analysis of the candidate's existing skills vs. market requirements
        2. Identify specific skill gaps with detailed explanations
        3. Provide realistic timelines and learning paths
        4. Give accurate market insights and salary expectations
        5. Offer actionable next steps

        IMPORTANT: You MUST return a complete, valid JSON object. Do not truncate the response. Ensure all JSON brackets are properly closed.

        RESPONSE FORMAT: Return ONLY a valid JSON object with this EXACT structure (make sure to complete the entire JSON structure):

        {
          "jobAnalysis": {
            "title": "${formData.jobRole}",
            "description": "Detailed role description tailored for ${formData.experience} level professionals",
            "marketDemand": "High/Medium/Low with brief explanation",
            "salaryRange": "Accurate salary range for ${formData.experience} level",
            "industryTrends": "Current market trends affecting this role",
            "keyResponsibilities": [
              "Primary responsibility 1",
              "Primary responsibility 2",
              "Primary responsibility 3",
              "Primary responsibility 4"
            ],
            "requiredQualifications": [
              "Must-have qualification 1",
              "Must-have qualification 2",
              "Must-have qualification 3"
            ]
          },
          "skillsAnalysis": {
            "currentSkillsAssessed": [
              {
                "skill": "Specific skill name from user input",
                "currentLevel": 75,
                "category": "frontend/backend/database/devops/soft-skills",
                "marketRelevance": "critical/high/medium/low",
                "assessment": "Detailed assessment of current proficiency",
                "strengths": "What they are doing well",
                "improvementAreas": "Specific areas to improve",
                "marketValue": "How valuable this skill is in current market"
              }
            ],
            "skillGaps": [
              {
                "skill": "Missing skill name",
                "currentLevel": 0,
                "requiredLevel": 80,
                "priority": "critical/high/medium/low",
                "category": "frontend/backend/database/devops/soft-skills",
                "whyNeeded": "Why this skill is important for the role",
                "marketDemand": "Very High/High/Medium/Low",
                "difficultyToLearn": "beginner/intermediate/advanced",
                "timeToLearn": "Realistic time estimate"
              }
            ],
            "overallAssessment": "Comprehensive assessment of technical readiness"
          },
          "learningRoadmap": [
            {
              "skill": "Priority skill to learn",
              "priority": 1,
              "estimatedTime": "4-6 weeks",
              "difficulty": "beginner/intermediate/advanced",
              "importance": "Why this skill should be learned first",
              "learningPath": {
                "phase1": "Week 1-2: Foundation concepts",
                "phase2": "Week 3-4: Intermediate concepts",
                "phase3": "Week 5-6: Advanced topics",
                "practiceProjects": [
                  "Specific project 1",
                  "Specific project 2"
                ],
                "resources": {
                  "free": [
                    "Free resource 1",
                    "Free resource 2"
                  ],
                  "paid": [
                    "Paid course 1",
                    "Paid course 2"
                  ]
                },
                "milestones": [
                  "Milestone 1",
                  "Milestone 2"
                ]
              }
            }
          ],
          "careerGuidance": {
            "readinessLevel": 75,
            "jobMatchPercentage": 80,
            "competitiveAdvantages": [
              "Advantage 1",
              "Advantage 2"
            ],
            "weaknesses": [
              "Weakness 1",
              "Weakness 2"
            ],
            "immediateActions": [
              "Action 1",
              "Action 2",
              "Action 3"
            ],
            "mediumTermGoals": [
              "3 month goal",
              "6 month goal"
            ],
            "interviewPreparation": [
              "Topic 1",
              "Topic 2"
            ],
            "certifications": [
              "Certification 1",
              "Certification 2"
            ],
            "networkingAdvice": "Specific networking strategies",
            "portfolioSuggestions": "Portfolio recommendations"
          }
        }

        CRITICAL: Ensure the JSON is complete and properly formatted. All objects must be closed with proper brackets.
      `;

      setCurrentStep(2);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setCurrentStep(3);
      const analysisData = cleanAndParseJSON(text);
      
      setAnalysis(analysisData);
      setCurrentStep(4);
      
    } catch (err) {
      console.error('Analysis Error:', err);
      setError(`Analysis failed: ${err.message}`);
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced responsive font sizes
  const getResponsiveFontSize = (baseSize) => {
    if (typeof window === 'undefined') return baseSize;
    const width = window.innerWidth;
    if (width < 640) return Math.max(8, baseSize - 8);
    if (width < 768) return Math.max(10, baseSize - 6);
    if (width < 1024) return Math.max(12, baseSize - 4);
    if (width < 1280) return Math.max(14, baseSize - 2);
    return baseSize;
  };

  const getSkillMatchChart = () => {
    if (!analysis?.careerGuidance?.jobMatchPercentage) return null;

    const jobMatch = analysis.careerGuidance.jobMatchPercentage;
    const data = {
      labels: ['Job Ready', 'Growth Area'],
      datasets: [{
        data: [jobMatch, 100 - jobMatch],
        backgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 3,
        hoverOffset: 15,
        cutout: '65%'
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: getResponsiveFontSize(14),
              weight: '600',
              family: 'Inter, sans-serif'
            },
            color: '#F9FAFB'
          }
        },
        title: {
          display: true,
          text: `Job Readiness: ${jobMatch}%`,
          font: {
            size: getResponsiveFontSize(18),
            weight: '700',
            family: 'Inter, sans-serif'
          },
          color: '#F9FAFB',
          padding: 25
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 12,
          titleFont: { size: getResponsiveFontSize(14), weight: '600' },
          bodyFont: { size: getResponsiveFontSize(12) }
        }
      }
    };

    return (
      <div className="h-64 sm:h-72 md:h-80 lg:h-96 relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">{jobMatch}%</div>
            <div className="text-xs sm:text-sm text-gray-300 font-medium">Ready</div>
          </div>
        </div>
      </div>
    );
  };

  const getSkillGapChart = () => {
    if (!analysis?.skillsAnalysis?.skillGaps || analysis.skillsAnalysis.skillGaps.length === 0) {
      return (
        <div className="h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/30">
          <div className="text-center p-8">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎉</div>
            <div className="text-green-400 text-lg sm:text-xl md:text-2xl font-bold mb-2">Excellent!</div>
            <div className="text-gray-300 text-sm sm:text-base">No major skill gaps detected</div>
          </div>
        </div>
      );
    }

    const topGaps = analysis.skillsAnalysis.skillGaps.slice(0, 8);
    
    const data = {
      labels: topGaps.map(gap => {
        const skill = gap.skill;
        return isMobile && skill.length > 12 ? skill.substring(0, 12) + '...' : skill;
      }),
      datasets: [
        {
          label: 'Current Level',
          data: topGaps.map(gap => gap.currentLevel || 0),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          borderRadius: 8,
        },
        {
          label: 'Required Level',
          data: topGaps.map(gap => gap.requiredLevel || 80),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8,
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        delay: (context) => context.dataIndex * 200,
        duration: 1200,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: getResponsiveFontSize(12),
              weight: '600',
              family: 'Inter, sans-serif'
            },
            color: '#F9FAFB'
          }
        },
        title: {
          display: true,
          text: 'Skills to Develop',
          font: {
            size: getResponsiveFontSize(16),
            weight: '700',
            family: 'Inter, sans-serif'
          },
          color: '#F9FAFB',
          padding: 20
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 12,
          titleFont: { size: getResponsiveFontSize(12), weight: '600' },
          bodyFont: { size: getResponsiveFontSize(11) }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            lineWidth: 1
          },
          ticks: {
            font: {
              size: getResponsiveFontSize(10),
              weight: '500',
              family: 'Inter, sans-serif'
            },
            color: '#D1D5DB',
            callback: function(value) {
              return value + '%';
            }
          },
          title: {
            display: !isMobile,
            text: 'Proficiency Level (%)',
            font: {
              size: getResponsiveFontSize(12),
              weight: '600',
              family: 'Inter, sans-serif'
            },
            color: '#F9FAFB'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: {
              size: getResponsiveFontSize(9),
              weight: '500',
              family: 'Inter, sans-serif'
            },
            color: '#D1D5DB',
            maxRotation: 45
          }
        }
      }
    };

    return <div className="h-64 sm:h-80 md:h-96 lg:h-[500px]"><Bar data={data} options={options} /></div>;
  };

  const getRadarChart = () => {
    if (!analysis?.skillsAnalysis?.currentSkillsAssessed || analysis.skillsAnalysis.currentSkillsAssessed.length === 0) {
      return (
        <div className="h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/30">
          <div className="text-center p-8">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">⚡</div>
            <div className="text-blue-400 text-lg sm:text-xl md:text-2xl font-bold mb-2">Skills Assessment</div>
            <div className="text-gray-300 text-sm sm:text-base">Will appear here after analysis</div>
          </div>
        </div>
      );
    }

    const topSkills = analysis.skillsAnalysis.currentSkillsAssessed.slice(0, 6);
    
    const data = {
      labels: topSkills.map(skill => {
        const skillName = skill.skill;
        return isMobile && skillName.length > 10 ? skillName.substring(0, 10) + '...' : skillName;
      }),
      datasets: [{
        label: 'Current Skills',
        data: topSkills.map(skill => skill.currentLevel || 50),
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        title: {
          display: true,
          text: 'Your Current Skills',
          font: {
            size: getResponsiveFontSize(16),
            weight: '700',
            family: 'Inter, sans-serif'
          },
          color: '#F9FAFB',
          padding: 20
        },
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 12,
          titleFont: { size: getResponsiveFontSize(12), weight: '600' },
          bodyFont: { size: getResponsiveFontSize(11) }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
            lineWidth: 1
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.3)',
            lineWidth: 1
          },
          pointLabels: {
            font: {
              size: getResponsiveFontSize(10),
              weight: '600',
              family: 'Inter, sans-serif'
            },
            color: '#F9FAFB'
          },
          ticks: {
            display: !isMobile,
            font: { size: getResponsiveFontSize(8), weight: '500' },
            color: '#D1D5DB',
            backdropColor: 'rgba(0, 0, 0, 0.6)',
            backdropPadding: 2
          }
        }
      }
    };

    return <div className="h-64 sm:h-72 md:h-80 lg:h-96"><Radar data={data} options={options} /></div>;
  };

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm">
      <div className="relative mb-8 sm:mb-12">
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-blue-300/30 rounded-full animate-spin"></div>
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0" style={{
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          animationDirection: 'reverse',
          animationDuration: '1.2s'
        }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
      
      <div className="text-center max-w-md sm:max-w-lg md:max-w-xl px-6">
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text ">
          {currentStep === 1 && '🚀 Initializing Analysis...'}
          {currentStep === 2 && '🧠 AI Processing Your Data...'}
          {currentStep === 3 && '📊 Generating Insights...'}
          {currentStep === 4 && '✨ Finalizing Report...'}
        </div>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 font-medium leading-relaxed">
          {currentStep === 1 && 'Preparing comprehensive skill analysis'}
          {currentStep === 2 && 'Comparing with industry standards and requirements'}
          {currentStep === 3 && 'Creating personalized learning roadmap'}
          {currentStep === 4 && 'Finalizing career guidance recommendations'}
        </p>
        
        <div className="w-80 sm:w-96 md:w-[500px] bg-gray-800 rounded-full h-3 sm:h-4 md:h-5 mx-auto mb-6 sm:mb-8 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-3 sm:h-4 md:h-5 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${currentStep * 25}%` }}
          ></div>
        </div>
        <div className="text-base sm:text-lg md:text-xl text-gray-400 font-semibold">
          Step {currentStep} of 4
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-2xl border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 pt-24">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 sm:mb-8 shadow-2xl">
                <span className="text-3xl sm:text-4xl md:text-5xl">🚀</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text mb-4 sm:mb-6 leading-tight">
                AI SKILL ANALYZER
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium max-w-4xl mx-auto leading-relaxed">
                Get personalized career insights with AI-powered skill assessment and learning roadmap
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* Enhanced Form */}
          <div className="bg-gradient-to-br from-gray-800/50 via-black/50 to-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden mb-12 sm:mb-16 md:mb-20">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 sm:px-12 md:px-16 py-8 sm:py-12 md:py-16">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4 md:mb-6">
                  🎯 Career Analysis
                </h2>
                <p className="text-blue-100 text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                  Provide your details for comprehensive AI-driven analysis
                </p>
              </div>
            </div>
            
            <form onSubmit={analyzeSkills} className="p-8 sm:p-12 md:p-16">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                  <div className="group">
                    <label className=" text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">🎯</span>
                      Target Job Role
                    </label>
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleInputChange}
                      className="w-full px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-white font-medium transition-all duration-300 placeholder-gray-400"
                      placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className=" text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">💼</span>
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 text-white font-medium transition-all duration-300"
                      required
                    >
                      <option value="" disabled>Select your experience level</option>
                      <option value="fresher">🌱 Fresher (0-1 years)</option>
                      <option value="junior">🚀 Junior (1-3 years)</option>
                      <option value="mid">⭐ Mid-level (3-5 years)</option>
                      <option value="senior">👑 Senior (5+ years)</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className=" text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">🏢</span>
                      Position Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        { value: 'job', label: 'Full-time Job', icon: '💼' },
                        { value: 'internship', label: 'Internship', icon: '🎓' }
                      ].map((type) => (
                        <label key={type.value} className="group/radio cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className={`p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
                            formData.type === type.value 
                              ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20' 
                              : 'border-gray-600 bg-gray-800/30 hover:border-purple-400 hover:bg-gray-700/30'
                          }`}>
                            <div className="flex items-center">
                              <span className="text-2xl sm:text-3xl mr-4">{type.icon}</span>
                              <span className="text-white font-bold text-lg sm:text-xl">{type.label}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8 sm:space-y-10 md:space-y-12">
                  <div className="group">
                    <label className=" text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">📝</span>
                      Job Description <span className="text-gray-400 text-base sm:text-lg font-normal">(Optional)</span>
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      className="w-full px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 rounded-2xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 resize-none text-white font-medium transition-all duration-300 placeholder-gray-400"
                      placeholder="Paste the job description here for more accurate analysis..."
                      rows={isMobile ? "4" : "6"}
                    />
                  </div>

                  <div className="group">
                    <label className=" text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">🛠️</span>
                      Your Current Skills
                    </label>
                    <textarea
                      name="currentSkills"
                      value={formData.currentSkills}
                      onChange={handleInputChange}
                      className="w-full px-6 sm:px-8 py-4 sm:py-6 text-lg sm:text-xl bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 resize-none text-white font-medium transition-all duration-300 placeholder-gray-400"
                      placeholder="List your technical skills, programming languages, frameworks, tools, soft skills, etc. Be specific and comprehensive."
                      rows={isMobile ? "5" : "7"}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 sm:mt-16 md:mt-20 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center px-12 sm:px-16 md:px-20 py-6 sm:py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-black text-lg sm:text-xl md:text-2xl rounded-2xl shadow-2xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 border-2 border-white/20 hover:border-white/40 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-4 sm:mr-6 h-6 w-6 sm:h-8 sm:w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Skills...
                    </span>
                  ) : (
                    <>
                      <span className="mr-3 sm:mr-4 text-xl sm:text-2xl">🚀</span>
                      Analyze My Skills
                    </>
                  )}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>

          {/* Loading Animation */}
          {loading && <LoadingAnimation />}

          {/* Enhanced Error Display */}
          {error && (
            <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-l-8  p-8 sm:p-12 rounded-3xl mb-12 sm:mb-16 shadow-2xl border border-red-500/30 backdrop-blur-sm">
              <div className="flex items-start">
                <div className="text-red-400 mr-6 sm:mr-8 flex-shrink-0">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-red-300 font-black text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-4">Analysis Error</h3>
                  <p className="text-red-200 text-base sm:text-lg md:text-xl font-medium mb-3 sm:mb-4 leading-relaxed">{error}</p>
                  <p className="text-red-300 text-sm sm:text-base md:text-lg font-medium">
                    Please check your internet connection and try again. If the problem persists, try simplifying your inputs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Results */}
          {analysis && (
            <div className="space-y-12 sm:space-y-16 md:space-y-20 animate-fadeIn">
              {/* Job Analysis Overview */}
              <div className="bg-gradient-to-br from-indigo-900/30 via-black/50 to-purple-900/30 backdrop-blur-xl rounded-3xl shadow-2xl text-white p-8 sm:p-12 md:p-16 border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                  <div className="lg:col-span-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {analysis.jobAnalysis?.title || formData.jobRole}
                    </h2>
                    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium">
                      {analysis.jobAnalysis?.description || 'Comprehensive career analysis for your target role'}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 sm:p-8 border border-yellow-500/30 backdrop-blur-sm">
                        <div className="flex items-center">
                          <span className="text-3xl sm:text-4xl mr-4 sm:mr-6">💰</span>
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-yellow-200 mb-1">Expected Salary</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300">
                              {analysis.jobAnalysis?.salaryRange || '₹3-8 LPA'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 sm:p-8 border border-green-500/30 backdrop-blur-sm">
                        <div className="flex items-center">
                          <span className="text-3xl sm:text-4xl mr-4 sm:mr-6">📈</span>
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-green-200 mb-1">Market Demand</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-300">
                              {analysis.jobAnalysis?.marketDemand || 'High'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {analysis.jobAnalysis?.keyResponsibilities && (
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 sm:p-8 border border-blue-500/30">
                        <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 flex items-center">
                          <span className="mr-3 text-xl sm:text-2xl">📋</span>
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {analysis.jobAnalysis.keyResponsibilities.slice(0, 4).map((responsibility, index) => (
                            <li key={index} className="text-gray-300 text-sm sm:text-base flex items-start">
                              <span className="text-blue-400 mr-3 mt-1">•</span>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-8 sm:p-10 border-2 border-blue-500/30 backdrop-blur-sm shadow-2xl">
                      <div className="text-5xl sm:text-6xl md:text-7xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {analysis.careerGuidance?.jobMatchPercentage || 75}%
                      </div>
                      <div className="text-white text-lg sm:text-xl font-bold mb-6 sm:mb-8">Job Match</div>
                      
                      <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {analysis.careerGuidance?.readinessLevel || 70}%
                      </div>
                      <div className="text-white font-bold text-base sm:text-lg">Ready to Apply</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
                <div className="bg-gradient-to-br from-gray-800/50 via-black/50 to-gray-800/50 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/10">
                  {getSkillMatchChart()}
                </div>
                <div className="bg-gradient-to-br from-gray-800/50 via-black/50 to-gray-800/50 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/10">
                  {getRadarChart()}
                </div>
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-3xl p-8 sm:p-10 md:p-12 border border-green-500/30">
                  <h3 className="text-2xl sm:text-3xl font-black text-green-300 mb-8 sm:mb-10 flex items-center">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl shadow-lg">📊</span>
                    Quick Stats
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center p-4 sm:p-6 bg-black/50 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                      <span className="text-green-200 font-bold text-sm sm:text-base lg:text-lg">Job Match:</span>
                      <span className="font-black text-xl sm:text-2xl text-green-400">
                        {analysis.careerGuidance?.jobMatchPercentage || 75}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 sm:p-6 bg-black/50 rounded-2xl border border-orange-400/30 backdrop-blur-sm">
                      <span className="text-orange-200 font-bold text-sm sm:text-base lg:text-lg">Skills to Learn:</span>
                      <span className="font-black text-xl sm:text-2xl text-orange-400">
                        {analysis.skillsAnalysis?.skillGaps?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 sm:p-6 bg-black/50 rounded-2xl border border-blue-400/30 backdrop-blur-sm">
                      <span className="text-blue-200 font-bold text-sm sm:text-base lg:text-lg">Current Skills:</span>
                      <span className="font-black text-xl sm:text-2xl text-blue-400">
                        {analysis.skillsAnalysis?.currentSkillsAssessed?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 sm:p-6 bg-black/50 rounded-2xl border border-purple-400/30 backdrop-blur-sm">
                      <span className="text-purple-200 font-bold text-sm sm:text-base lg:text-lg">Readiness:</span>
                      <span className="font-black text-xl sm:text-2xl text-purple-400">
                        {analysis.careerGuidance?.readinessLevel || 70}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Gap Chart */}
              <div className="bg-gradient-to-br from-gray-800/50 via-black/50 to-gray-800/50 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl border border-white/10">
                {getSkillGapChart()}
              </div>

              {/* Current Skills vs Skills to Learn */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
                {/* Current Skills */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/30 p-8 sm:p-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-green-400 mb-8 sm:mb-10 md:mb-12 flex items-center">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">✅</span>
                    Your Current Skills
                  </h3>
                  <div className="space-y-6 sm:space-y-8">
                    {analysis.skillsAnalysis?.currentSkillsAssessed?.length > 0 ? (
                      analysis.skillsAnalysis.currentSkillsAssessed.map((skill, index) => (
                        <div key={index} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-green-400/30 hover:border-green-400/50 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                            <span className="font-black text-lg sm:text-xl md:text-2xl text-white">{skill.skill}</span>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 ${
                                skill.marketRelevance === 'critical' ? 'bg-red-600/20 text-red-300 border-red-500/50' :
                                skill.marketRelevance === 'high' ? 'bg-orange-600/20 text-orange-300 border-orange-500/50' :
                                skill.marketRelevance === 'medium' ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50' :
                                'bg-green-600/20 text-green-300 border-green-500/50'
                              }`}>
                                {skill.marketRelevance?.toUpperCase() || 'HIGH'}
                              </span>
                              <span className="text-lg sm:text-xl font-black text-green-300 bg-green-800/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-green-400/50">
                                {skill.currentLevel || 75}%
                              </span>
                            </div>
                          </div>
                          <p className="text-green-100 leading-relaxed font-medium text-sm sm:text-base mb-3">{skill.assessment || 'Strong foundation in this technology'}</p>
                          {skill.improvementAreas && (
                            <p className="text-yellow-300 font-bold text-sm sm:text-base flex items-start">
                              <span className="mr-2 mt-1">🔧</span>
                              <span><strong>Improve:</strong> {skill.improvementAreas}</span>
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-8 sm:p-12 bg-black/50 rounded-2xl border-2 border-green-400/30 text-center">
                        <div className="text-4xl sm:text-5xl mb-4">📊</div>
                        <p className="text-green-300 text-lg sm:text-xl font-bold">Your existing skills will be analyzed here</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills to Learn */}
                <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/30 p-8 sm:p-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-red-400 mb-8 sm:mb-10 md:mb-12 flex items-center">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">📚</span>
                    Skills to Develop
                  </h3>
                  <div className="space-y-6 sm:space-y-8">
                    {analysis.skillsAnalysis?.skillGaps?.length > 0 ? (
                      analysis.skillsAnalysis.skillGaps.slice(0, 6).map((gap, index) => (
                        <div key={index} className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border-2 border-red-400/30 hover:border-red-400/50 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                            <span className="font-black text-lg sm:text-xl md:text-2xl text-white">{gap.skill}</span>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold border-2 ${
                                gap.priority === 'critical' ? 'bg-red-600/20 text-red-300 border-red-500/50' :
                                gap.priority === 'high' ? 'bg-orange-600/20 text-orange-300 border-orange-500/50' :
                                gap.priority === 'medium' ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50' :
                                'bg-green-600/20 text-green-300 border-green-500/50'
                              }`}>
                                {gap.priority?.toUpperCase() || 'HIGH'}
                              </span>
                              <span className="text-lg sm:text-xl font-black text-red-300 bg-red-800/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-400/50">
                                Need: {gap.requiredLevel || 80}%
                              </span>
                            </div>
                          </div>
                          <p className="text-red-100 leading-relaxed font-medium text-sm sm:text-base mb-3">{gap.whyNeeded || 'Important skill for this role'}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <p className="text-yellow-300 font-bold text-sm sm:text-base flex items-center">
                              <span className="mr-2">📈</span>
                              <span>Market Demand: {gap.marketDemand || 'High'}</span>
                            </p>
                            {gap.timeToLearn && (
                              <p className="text-blue-300 font-bold text-sm sm:text-base flex items-center">
                                <span className="mr-2">⏱️</span>
                                <span>{gap.timeToLearn}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 sm:p-12 bg-black/50 rounded-2xl border-2 border-red-400/30 text-center">
                        <div className="text-4xl sm:text-5xl mb-4">🎉</div>
                        <p className="text-green-300 text-lg sm:text-xl font-bold mb-2">Excellent! No major skill gaps found!</p>
                        <p className="text-white text-base">You seem well-prepared for this role!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Roadmap */}
              {analysis.learningRoadmap && analysis.learningRoadmap.length > 0 && (
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/30 p-8 sm:p-12 md:p-16">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-400 mb-8 sm:mb-12 md:mb-16 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">🗺️</span>
                    Your Learning Roadmap
                  </h3>
                  <div className="space-y-8 sm:space-y-12 md:space-y-16">
                    {analysis.learningRoadmap.map((item, index) => (
                      <div key={index} className={`relative ${!isMobile ? 'border-l-4 border-blue-500/50 pl-8 sm:pl-12 md:pl-16' : ''} pb-8 sm:pb-12`}>
                        {!isMobile && (
                          <div className="absolute w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -left-3 sm:-left-4 top-0 border-4 border-black shadow-2xl"></div>
                        )}
                        <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-3 sm:space-y-0">
                            <h4 className="font-black text-xl sm:text-2xl md:text-3xl text-white">{item.skill}</h4>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <span className="bg-blue-700/50 text-blue-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold border-2 border-blue-400/30">
                                Priority {item.priority || 1}
                              </span>
                              {item.importance && (
                                <span className="bg-purple-700/50 text-purple-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold border-2 border-purple-400/30">
                                  {item.difficulty || 'Intermediate'}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {item.importance && (
                            <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 font-medium leading-relaxed">{item.importance}</p>
                          )}
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="flex items-center bg-gray-900/50 rounded-2xl p-4 sm:p-6 border-2 border-blue-400/30">
                              <span className="text-blue-400 mr-3 sm:mr-4 text-2xl sm:text-3xl">⏱️</span>
                              <div>
                                <div className="text-sm sm:text-base font-bold text-gray-400">Duration</div>
                                <div className="font-black text-white text-base sm:text-lg">{item.estimatedTime || '2-4 weeks'}</div>
                              </div>
                            </div>
                            <div className="flex items-center bg-gray-900/50 rounded-2xl p-4 sm:p-6 border-2 border-purple-400/30">
                              <span className="text-purple-400 mr-3 sm:mr-4 text-2xl sm:text-3xl">📈</span>
                              <div>
                                <div className="text-sm sm:text-base font-bold text-gray-400">Difficulty</div>
                                <div className={`font-black text-base sm:text-lg ${
                                  item.difficulty === 'advanced' ? 'text-red-400' :
                                  item.difficulty === 'intermediate' ? 'text-yellow-400' :
                                  'text-green-400'
                                }`}>
                                  {item.difficulty?.charAt(0).toUpperCase() + item.difficulty?.slice(1) || 'Intermediate'}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center bg-gray-900/50 rounded-2xl p-4 sm:p-6 border-2 border-green-400/30">
                              <span className="text-green-400 mr-3 sm:mr-4 text-2xl sm:text-3xl">🎯</span>
                              <div>
                                <div className="text-sm sm:text-base font-bold text-gray-400">Track</div>
                                <div className="font-black text-green-400 text-base sm:text-lg">Progressive</div>
                              </div>
                            </div>
                          </div>

                          {/* Learning Path Phases */}
                          {item.learningPath && (
                            <div className="space-y-6 sm:space-y-8">
                              {item.learningPath.phase1 && (
                                <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-4 sm:p-6 border border-green-500/30">
                                  <h5 className="font-bold text-green-400 text-base sm:text-lg mb-2 flex items-center">
                                    <span className="mr-2 text-lg sm:text-xl">📚</span>Phase 1: Foundation
                                  </h5>
                                  <p className="text-green-100 text-sm sm:text-base">{item.learningPath.phase1}</p>
                                </div>
                              )}
                              
                              {item.learningPath.phase2 && (
                                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-2xl p-4 sm:p-6 border border-blue-500/30">
                                  <h5 className="font-bold text-blue-400 text-base sm:text-lg mb-2 flex items-center">
                                    <span className="mr-2 text-lg sm:text-xl">🔧</span>Phase 2: Practice
                                  </h5>
                                  <p className="text-blue-100 text-sm sm:text-base">{item.learningPath.phase2}</p>
                                </div>
                              )}
                              
                              {item.learningPath.phase3 && (
                                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-4 sm:p-6 border border-purple-500/30">
                                  <h5 className="font-bold text-purple-400 text-base sm:text-lg mb-2 flex items-center">
                                    <span className="mr-2 text-lg sm:text-xl">🚀</span>Phase 3: Mastery
                                  </h5>
                                  <p className="text-purple-100 text-sm sm:text-base">{item.learningPath.phase3}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Resources and Projects */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                            {item.learningPath?.resources?.free && (
                              <div>
                                <h5 className="font-bold text-green-400 text-base sm:text-lg mb-4 flex items-center">
                                  <span className="mr-2 text-lg sm:text-xl">🆓</span>Free Resources
                                </h5>
                                <div className="space-y-2">
                                  {item.learningPath.resources.free.map((resource, idx) => (
                                    <span key={idx} className="block px-4 py-2 bg-green-800/30 text-green-200 text-sm sm:text-base rounded-lg font-medium border border-green-400/30">
                                      {resource}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.learningPath?.practiceProjects && (
                              <div>
                                <h5 className="font-bold text-orange-400 text-base sm:text-lg mb-4 flex items-center">
                                  <span className="mr-2 text-lg sm:text-xl">💡</span>Practice Projects
                                </h5>
                                <div className="space-y-2">
                                  {item.learningPath.practiceProjects.map((project, idx) => (
                                    <p key={idx} className="text-orange-100 font-medium text-sm sm:text-base bg-orange-900/30 p-3 sm:p-4 rounded-lg border border-orange-400/30">
                                      {project}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Milestones */}
                          {item.learningPath?.milestones && (
                            <div className="mt-6 sm:mt-8">
                              <h5 className="font-bold text-yellow-400 text-base sm:text-lg mb-4 flex items-center">
                                <span className="mr-2 text-lg sm:text-xl">🎯</span>Key Milestones
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                {item.learningPath.milestones.map((milestone, idx) => (
                                  <div key={idx} className="bg-yellow-900/30 border border-yellow-400/30 rounded-lg p-3 sm:p-4 text-center">
                                    <div className="text-yellow-300 font-bold text-sm sm:text-base">{milestone}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Immediate Actions */}
              {analysis.careerGuidance?.immediateActions && (
                <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-xl rounded-3xl border border-yellow-500/30 p-8 sm:p-12 md:p-16 shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-300 mb-8 sm:mb-12 md:mb-16 flex items-center">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 text-lg sm:text-xl md:text-2xl shadow-lg">🚀</span>
                    Immediate Action Plan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {analysis.careerGuidance.immediateActions.map((action, index) => (
                      <div key={index} className="flex items-start p-6 sm:p-8 bg-black/50 rounded-2xl border-2 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-3 sm:p-4 mr-4 sm:mr-6 flex-shrink-0 border-2 border-yellow-400/50 shadow-lg">
                          <span className="text-black font-black text-base sm:text-lg">{index + 1}</span>
                        </div>
                        <p className="text-white leading-relaxed font-medium text-sm sm:text-base lg:text-lg">{action}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional Career Guidance */}
                  {(analysis.careerGuidance?.interviewPreparation || analysis.careerGuidance?.certifications) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
                      {analysis.careerGuidance.interviewPreparation && (
                        <div className="bg-blue-900/30 rounded-2xl p-6 sm:p-8 border border-blue-500/30">
                          <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-4 sm:mb-6 flex items-center">
                            <span className="mr-3 text-xl sm:text-2xl">💼</span>
                            Interview Preparation
                          </h4>
                          <ul className="space-y-2 sm:space-y-3">
                            {analysis.careerGuidance.interviewPreparation.map((topic, idx) => (
                              <li key={idx} className="text-blue-100 text-sm sm:text-base flex items-start">
                                <span className="text-blue-400 mr-3 mt-1">•</span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {analysis.careerGuidance.certifications && (
                        <div className="bg-purple-900/30 rounded-2xl p-6 sm:p-8 border border-purple-500/30">
                          <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-4 sm:mb-6 flex items-center">
                            <span className="mr-3 text-xl sm:text-2xl">🏆</span>
                            Recommended Certifications
                          </h4>
                          <ul className="space-y-2 sm:space-y-3">
                            {analysis.careerGuidance.certifications.map((cert, idx) => (
                              <li key={idx} className="text-purple-100 text-sm sm:text-base flex items-start">
                                <span className="text-purple-400 mr-3 mt-1">•</span>
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced CSS Styles - Fixed to remove jsx attribute */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out;
          }
          
          /* Form styling enhancements */
          input, select, textarea {
            transition: all 0.3s ease;
          }
          
          input:focus, select:focus, textarea:focus {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          input::placeholder, textarea::placeholder {
            color: #9CA3AF !important;
            opacity: 0.8;
          }
          
          option {
            background-color: #1F2937 !important;
            color: white !important;
            padding: 8px;
          }
          
          /* Chart responsiveness and styling */
          canvas {
            background-color: transparent !important;
            border-radius: 16px;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: linear-gradient(180deg, #1F2937, #111827);
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3B82F6, #6366F1);
            border-radius: 6px;
            border: 2px solid #1F2937;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563EB, #4F46E5);
          }
          
          /* Button hover effects */
          button {
            position: relative;
            overflow: hidden;
          }
          
          button:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s;
          }
          
          button:hover:before {
            left: 100%;
          }
          
          /* Responsive text scaling */
          @media (max-width: 640px) {
            .text-responsive-sm {
              font-size: clamp(0.75rem, 2vw, 1rem);
            }
            
            .text-responsive-base {
              font-size: clamp(0.875rem, 2.5vw, 1.125rem);
            }
            
            .text-responsive-lg {
              font-size: clamp(1rem, 3vw, 1.25rem);
            }
          }
          
          /* Glass morphism effects */
          .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          /* Gradient text effects */
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          /* Loading animation enhancements */
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            }
            50% {
              box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
            }
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          /* Mobile optimizations */
          @media (max-width: 768px) {
            .mobile-padding {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            
            .mobile-text {
              font-size: 0.9rem;
              line-height: 1.4;
            }
          }
          
          /* Dark mode enhancements */
          .dark-card {
            background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%);
            backdrop-filter: blur(16px);
          }
          
          /* Animation utilities */
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        `}
      </style>
    </>
  );
};

export default SkillAnalyzer;