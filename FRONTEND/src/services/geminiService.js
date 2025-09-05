const GEMINI_API_KEY = 'AIzaSyDCDfMtzYLyIlO9f6ZLXIFY6TlzzGWkjpk'; // Replace with a valid API key from Google AI Studio
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'; // Updated endpoint for gemini-1.5-flash
const EXCHANGE_RATE = 83; // 1 USD = 83 INR (approximate 2024 rate)

export const getJobOpportunitiesAnalysis = async (formData) => {
  // Validate formData to prevent empty or invalid submissions
  if (!formData.domain || !formData.specialization) {
    console.error('Invalid form data:', formData);
    return generateFallbackData(formData);
  }

  const prompt = `
    As an expert career market analyst and data scientist, provide a comprehensive and actionable analysis of job opportunities for ${formData.specialization} in the ${formData.domain} domain for ${formData.experience} level professionals globally, with a focus on the Indian job market for salary data.

    CRITICAL REQUIREMENTS:
    1. Focus ONLY on JOB ROLES/OPPORTUNITIES within the ${formData.domain} domain and closely related to ${formData.specialization}
    2. Show detailed career progression paths for ${formData.specialization} (e.g., Junior → Senior → Lead → Manager → Director)
    3. Include both traditional and emerging job roles in ${formData.domain}, emphasizing high-demand and high-growth opportunities
    4. Base salary data on real 2024 market conditions, with salaries in Indian Rupees (INR) using an exchange rate of 1 USD = 83 INR
    5. Adjust salaries based on experience level and Indian market conditions
    6. Include growth potential, market demand, job stability, required skills, and geographic demand variations (e.g., high-demand cities in India like Bangalore, Mumbai, Delhi)
    7. NEVER suggest opportunities from other domains (e.g., if Healthcare is chosen, don't suggest Technology roles)
    8. Provide actionable recommendations for skills development, certifications, and networking strategies to enhance career prospects in ${formData.specialization}

    DOMAIN-SPECIFIC ANALYSIS FOR ${formData.domain.toUpperCase()}:
    ${getDomainSpecificGuidelines(formData.domain, formData.specialization)}

    SPECIALIZATION-SPECIFIC ANALYSIS FOR ${formData.specialization.toUpperCase()}:
    - Provide detailed market insights specific to ${formData.specialization} within ${formData.domain}
    - Include growth rate, average salary (in INR), estimated job openings, and key skills/certifications required
    - Highlight high-demand regions in India (e.g., Bangalore, Mumbai, Delhi) and global trends
    - Suggest 2-3 specific certifications or skills to boost employability in ${formData.specialization}
    - Recommend networking strategies (e.g., platforms, events, or communities) for ${formData.specialization}

    Please provide the response in the following EXACT JSON format (no additional text):
    {
      "opportunities": [
        {
          "name": "Specific Job Role/Opportunity",
          "demand": 85,
          "salary": 750000,
          "growth": 25,
          "experienceReq": "2-4 years",
          "stability": 80,
          "requiredSkills": ["Skill1", "Skill2"],
          "highDemandRegions": ["Bangalore", "Mumbai"]
        }
      ],
      "insights": {
        "domain": {
          "growthRate": 25,
          "avgSalary": "850000",
          "jobOpenings": "12500",
          "highDemandRegions": ["Bangalore", "Delhi"]
        },
        "specialization": {
          "growthRate": 30,
          "avgSalary": "900000",
          "jobOpenings": "5000",
          "recommendedCertifications": ["Cert1", "Cert2"],
          "networkingStrategies": ["Strategy1", "Strategy2"]
        }
      }
    }

    JOB OPPORTUNITIES ANALYSIS REQUIREMENTS:
    Opportunities Array (10-12 job roles):
    - Focus on job titles and career opportunities within ${formData.domain} closely related to ${formData.specialization}
    - Include detailed career progression paths (e.g., Junior → Senior → Lead → Manager → Director) for ${formData.specialization}
    - Include both traditional and emerging roles in ${formData.domain}
    - Demand scores should reflect real market conditions (0-100 scale)
    - Salary figures should be in INR, realistic for the experience level, and aligned with Indian market conditions
    - Growth percentages should reflect year-over-year market trends in ${formData.domain}
    - Stability scores (0-100) should reflect job security and market resilience
    - Include required skills and high-demand regions in India
    - Experience requirements should match typical job postings in ${formData.domain}

    Market Insights:
    - Domain insights:
      - Growth rate: Overall ${formData.domain} domain growth percentage
      - Average salary: Median salary across all opportunities in ${formData.domain} (in INR)
      - Job openings: Estimated number of available positions in ${formData.domain}
      - High-demand regions: Key cities in India with strong demand
    - Specialization insights:
      - Growth rate: Growth percentage specific to ${formData.specialization} within ${formData.domain}
      - Average salary: Median salary for roles related to ${formData.specialization} (in INR)
      - Job openings: Estimated number of available positions for ${formData.specialization}
      - Recommended certifications: 2-3 specific certifications to enhance employability
      - Networking strategies: 2-3 actionable strategies (e.g., LinkedIn groups, industry events)

    EXPERIENCE LEVEL SALARY ADJUSTMENTS (IN INR):
    - Entry level (0-2 years): Base salary range for ${formData.domain} in India
    - Mid level (3-5 years): 20-40% above entry level
    - Senior level (6-10 years): 50-80% above entry level
    - Executive (10+ years): 100-150% above entry level

    Ensure all data is current (2024), realistic, and actionable for career development decisions in India, with a focus on ${formData.specialization} within ${formData.domain}.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Lowered for more precise output
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 8192 // Increased for comprehensive response
        },
        safetySettings: [ // Added safety settings to comply with API requirements
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);

      // Validate and enhance the data
      if (parsedData.opportunities && Array.isArray(parsedData.opportunities)) {
        // Ensure we have at least 10 opportunities
        if (parsedData.opportunities.length < 10) {
          const additionalOpportunities = generateAdditionalOpportunities(formData, 10 - parsedData.opportunities.length);
          parsedData.opportunities = [...parsedData.opportunities, ...additionalOpportunities];
        }

        // Sort opportunities by demand score
        parsedData.opportunities.sort((a, b) => b.demand - a.demand);

        // Ensure specialization insights exist
        if (!parsedData.insights.specialization) {
          parsedData.insights.specialization = generateSpecializationInsights(formData, parsedData.opportunities);
        }

        return parsedData;
      }
    }

    // Fallback data in case parsing fails
    console.warn('Failed to parse valid JSON from API response, using fallback data');
    return generateFallbackData(formData);
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    if (error.message.includes('404')) {
      console.error('API endpoint not found. Verify the endpoint and model name (gemini-1.5-flash). Ensure the API key is valid via Google AI Studio.');
    } else if (error.message.includes('403')) {
      console.error('API key unauthorized or restricted. Generate a new key from Google AI Studio: https://aistudio.google.com/app/apikey');
    }
    return generateFallbackData(formData);
  }
};

// [Rest of the file remains unchanged: getDomainSpecificGuidelines, generateSpecializationInsights, generateAdditionalOpportunities, generateFallbackData]
const getDomainSpecificGuidelines = (domain, specialization) => {
  const guidelines = {
    'Technology': `
      For Technology domain with ${specialization} specialization:
      - Include roles closely related to ${specialization}, e.g., for Software Engineer: Junior Software Engineer, Senior Software Engineer, Lead Software Engineer, Software Development Manager, Director of Engineering
      - Other relevant roles: DevOps Engineer, Data Scientist, Cloud Architect, Cybersecurity Analyst, AI/ML Engineer, Full Stack Developer, Blockchain Developer, Quantum Computing Specialist
      - Focus on programming, software development, cloud computing, AI/ML, cybersecurity
      - Salary ranges (INR): Entry ₹50L-₹66L, Mid ₹66L-₹100L, Senior ₹100L-₹150L, Executive ₹150L-₹250L
      - High growth areas: AI/ML, Cloud Computing, Cybersecurity, Blockchain
      - Specialization insights: Growth rate ~35%, avg salary ~₹90L, job openings ~8000 in India
      - Recommended certifications: AWS Certified Solutions Architect, Google Cloud Professional, Certified Kubernetes Administrator
      - Networking: LinkedIn groups (e.g., "Tech India"), NASSCOM events, TechCrunch Disrupt
    `,
    'Healthcare': `
      For Healthcare domain with ${specialization} specialization:
      - Include roles closely related to ${specialization}, e.g., for Nurse: Registered Nurse, Nurse Practitioner, Clinical Nurse Specialist, Nurse Manager, Director of Nursing
      - Other relevant roles: Physician, Medical Technologist, Healthcare Administrator, Telemedicine Specialist, Healthcare Data Analyst
      - Focus on patient care, medical research, healthcare administration, telemedicine
      - Salary ranges (INR): Entry ₹37L-₹54L, Mid ₹54L-₹79L, Senior ₹79L-₹125L, Executive ₹125L-₹208L
      - High growth areas: Telemedicine, Healthcare Analytics, Precision Medicine
      - Specialization insights: Growth rate ~28%, avg salary ~₹75L, job openings ~6000 in India
      - Recommended certifications: Certified Healthcare Professional, Lean Six Sigma in Healthcare, Telemedicine Certification
      - Networking: Indian Medical Association events, Healthcare IT conferences, LinkedIn groups (e.g., "Healthcare India")
    `,
    'Finance': `
      For Finance domain with ${specialization} specialization:
      - Include roles closely related to ${specialization}, e.g., for Financial Analyst: Junior Financial Analyst, Senior Financial Analyst, Finance Manager, Director of Finance
      - Other relevant roles: Investment Banker, Risk Manager, FinTech Specialist, Quantitative Analyst, Compliance Officer
      - Focus on financial analysis, investment management, risk assessment, FinTech
      - Salary ranges (INR): Entry ₹41L-₹58L, Mid ₹58L-₹91L, Senior ₹91L-₹141L, Executive ₹141L-₹250L
      - High growth areas: FinTech, Quantitative Analysis, ESG Investing
      - Specialization insights: Growth rate ~25%, avg salary ~₹85L, job openings ~5000 in India
      - Recommended certifications: CFA, FRM, Certified FinTech Professional
      - Networking: CFA Society India, FinTech India events, LinkedIn groups (e.g., "Finance Professionals India")
    `,
    'Education': `
      For Education domain with ${specialization} specialization:
      - Include roles closely related to ${specialization}, e.g., for Teacher: Elementary Teacher, High School Teacher, Lead Teacher, Academic Coordinator, Director of Education
      - Other relevant roles: Professor, Educational Administrator, Instructional Designer, EdTech Specialist
      - Focus on teaching, curriculum development, educational technology, academic administration
      - Salary ranges (INR): Entry ₹29L-₹41L, Mid ₹41L-₹58L, Senior ₹58L-₹83L, Executive ₹83L-₹125L
      - High growth areas: EdTech, Online Learning, Curriculum Design
      - Specialization insights: Growth rate ~20%, avg salary ~₹60L, job openings ~4000 in India
      - Recommended certifications: Google Certified Educator, Instructional Design Certification, TESOL
      - Networking: India EdTech Forum, LinkedIn groups (e.g., "Education India"), academic conferences
    `,
    'Media': `
      For Media domain with ${specialization} specialization:
      - Include roles closely related to ${specialization}, e.g., for Content Creator: Junior Content Creator, Senior Content Creator, Content Strategist, Content Manager
      - Other relevant roles: Digital Marketing Specialist, Social Media Manager, Video Editor, AR/VR Content Developer
      - Focus on content creation, digital marketing, media production, immersive media
      - Salary ranges (INR): Entry ₹29L-₹46L, Mid ₹46L-₹66L, Senior ₹66L-₹100L, Executive ₹100L-₹166L
      - High growth areas: Digital Marketing, AR/VR Content, Social Media Strategy
      - Specialization insights: Growth rate ~40%, avg salary ~₹65L, job openings ~4500 in India
      - Recommended certifications: Google Analytics Certification, HubSpot Content Marketing, Meta Social Media Marketing
      - Networking: Digital Marketing Summit India, LinkedIn groups (e.g., "Media Professionals India"), Content Marketing World
    `
  };

  return guidelines[domain] || guidelines['Technology'];
};

const generateSpecializationInsights = (formData, opportunities) => {
  const relevantOpportunities = opportunities.filter(op =>
    op.name.toLowerCase().includes(formData.specialization.toLowerCase()) ||
    op.name.toLowerCase().includes('junior') ||
    op.name.toLowerCase().includes('senior') ||
    op.name.toLowerCase().includes('lead') ||
    op.name.toLowerCase().includes('manager') ||
    op.name.toLowerCase().includes('director')
  );

  const avgSalary = relevantOpportunities.length > 0
    ? Math.round(relevantOpportunities.reduce((sum, op) => sum + op.salary, 0) / relevantOpportunities.length)
    : 7500000; // Default fallback salary in INR

  const growthRate = relevantOpportunities.length > 0
    ? Math.round(relevantOpportunities.reduce((sum, op) => sum + op.growth, 0) / relevantOpportunities.length)
    : 30; // Default fallback growth rate

  const jobOpenings = relevantOpportunities.length > 0
    ? Math.round(relevantOpportunities.length * 1000).toString()
    : '5000'; // Default fallback job openings

  const certifications = formData.domain === 'Technology' ? ['AWS Certified Solutions Architect', 'Certified Kubernetes Administrator']
    : formData.domain === 'Healthcare' ? ['Certified Healthcare Professional', 'Telemedicine Certification']
    : formData.domain === 'Finance' ? ['CFA', 'FRM']
    : formData.domain === 'Education' ? ['Google Certified Educator', 'TESOL']
    : ['Google Analytics Certification', 'HubSpot Content Marketing'];

  const networking = formData.domain === 'Technology' ? ['LinkedIn Tech India', 'NASSCOM Events']
    : formData.domain === 'Healthcare' ? ['Indian Medical Association Events', 'Healthcare IT Conferences']
    : formData.domain === 'Finance' ? ['CFA Society India', 'FinTech India Events']
    : formData.domain === 'Education' ? ['India EdTech Forum', 'Academic Conferences']
    : ['Digital Marketing Summit India', 'Content Marketing World'];

  return {
    growthRate,
    avgSalary: avgSalary.toString(),
    jobOpenings,
    recommendedCertifications: certifications,
    networkingStrategies: networking
  };
};

const generateAdditionalOpportunities = (formData, count) => {
  const opportunitySets = {
    'Technology': [
      { name: `Junior ${formData.specialization}`, demand: 90, salary: 6225000, growth: 38, experienceReq: '0-2 years', stability: 85, requiredSkills: ['JavaScript', 'Python'], highDemandRegions: ['Bangalore', 'Hyderabad'] },
      { name: `Senior ${formData.specialization}`, demand: 87, salary: 8715000, growth: 33, experienceReq: '5-8 years', stability: 80, requiredSkills: ['Node.js', 'AWS'], highDemandRegions: ['Bangalore', 'Pune'] },
      { name: `Lead ${formData.specialization}`, demand: 84, salary: 10375000, growth: 28, experienceReq: '8-10 years', stability: 75, requiredSkills: ['System Architecture', 'Leadership'], highDemandRegions: ['Mumbai', 'Delhi'] },
      { name: `${formData.specialization} Manager`, demand: 81, salary: 12035000, growth: 23, experienceReq: '10+ years', stability: 70, requiredSkills: ['Project Management', 'Agile'], highDemandRegions: ['Bangalore', 'Gurgaon'] }
    ],
    'Healthcare': [
      { name: `Junior ${formData.specialization}`, demand: 89, salary: 4980000, growth: 32, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Patient Care', 'EMR Systems'], highDemandRegions: ['Delhi', 'Mumbai'] },
      { name: `Senior ${formData.specialization}`, demand: 86, salary: 7470000, growth: 27, experienceReq: '5-8 years', stability: 85, requiredSkills: ['Clinical Research', 'HIPAA'], highDemandRegions: ['Chennai', 'Bangalore'] },
      { name: `Lead ${formData.specialization}`, demand: 83, salary: 9130000, growth: 22, experienceReq: '8-10 years', stability: 80, requiredSkills: ['Team Leadership', 'Healthcare Analytics'], highDemandRegions: ['Hyderabad', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 80, salary: 10790000, growth: 18, experienceReq: '10+ years', stability: 75, requiredSkills: ['Healthcare Management', 'Compliance'], highDemandRegions: ['Mumbai', 'Delhi'] }
    ],
    'Finance': [
      { name: `Junior ${formData.specialization}`, demand: 91, salary: 5395000, growth: 30, experienceReq: '0-2 years', stability: 85, requiredSkills: ['Financial Modeling', 'Excel'], highDemandRegions: ['Mumbai', 'Gurgaon'] },
      { name: `Senior ${formData.specialization}`, demand: 88, salary: 7885000, growth: 25, experienceReq: '5-8 years', stability: 80, requiredSkills: ['Risk Analysis', 'SQL'], highDemandRegions: ['Bangalore', 'Delhi'] },
      { name: `Lead ${formData.specialization}`, demand: 85, salary: 9545000, growth: 20, experienceReq: '8-10 years', stability: 75, requiredSkills: ['Portfolio Management', 'Leadership'], highDemandRegions: ['Mumbai', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 82, salary: 11620000, growth: 15, experienceReq: '10+ years', stability: 70, requiredSkills: ['Strategic Planning', 'Compliance'], highDemandRegions: ['Delhi', 'Hyderabad'] }
    ],
    'Education': [
      { name: `Junior ${formData.specialization}`, demand: 87, salary: 3735000, growth: 28, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Teaching', 'Curriculum Design'], highDemandRegions: ['Delhi', 'Bangalore'] },
      { name: `Senior ${formData.specialization}`, demand: 84, salary: 5395000, growth: 23, experienceReq: '5-8 years', stability: 85, requiredSkills: ['Educational Technology', 'Assessment'], highDemandRegions: ['Mumbai', 'Chennai'] },
      { name: `Lead ${formData.specialization}`, demand: 81, salary: 7055000, growth: 18, experienceReq: '8-10 years', stability: 80, requiredSkills: ['Academic Leadership', 'EdTech'], highDemandRegions: ['Hyderabad', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 78, salary: 8300000, growth: 13, experienceReq: '10+ years', stability: 75, requiredSkills: ['Administration', 'Policy Development'], highDemandRegions: ['Delhi', 'Gurgaon'] }
    ],
    'Media': [
      { name: `Junior ${formData.specialization}`, demand: 92, salary: 4150000, growth: 45, experienceReq: '0-2 years', stability: 80, requiredSkills: ['Content Creation', 'SEO'], highDemandRegions: ['Mumbai', 'Bangalore'] },
      { name: `Senior ${formData.specialization}`, demand: 89, salary: 6225000, growth: 40, experienceReq: '5-8 years', stability: 75, requiredSkills: ['Digital Marketing', 'Analytics'], highDemandRegions: ['Delhi', 'Pune'] },
      { name: `Lead ${formData.specialization}`, demand: 86, salary: 7885000, growth: 35, experienceReq: '8-10 years', stability: 70, requiredSkills: ['Content Strategy', 'Leadership'], highDemandRegions: ['Hyderabad', 'Chennai'] },
      { name: `${formData.specialization} Manager`, demand: 83, salary: 9545000, growth: 30, experienceReq: '10+ years', stability: 65, requiredSkills: ['Brand Management', 'Campaign Planning'], highDemandRegions: ['Mumbai', 'Gurgaon'] }
    ]
  };

  const opportunities = opportunitySets[formData.domain] || opportunitySets['Technology'];
  return opportunities.slice(0, count);
};

const generateFallbackData = (formData) => {
  const opportunitySets = {
    'Technology': [
      { name: `Junior ${formData.specialization}`, demand: 94, salary: 6225000, growth: 38, experienceReq: '0-2 years', stability: 85, requiredSkills: ['JavaScript', 'Python'], highDemandRegions: ['Bangalore', 'Hyderabad'] },
      { name: `Senior ${formData.specialization}`, demand: 91, salary: 8715000, growth: 33, experienceReq: '5-8 years', stability: 80, requiredSkills: ['Node.js', 'AWS'], highDemandRegions: ['Bangalore', 'Pune'] },
      { name: `Lead ${formData.specialization}`, demand: 88, salary: 10375000, growth: 28, experienceReq: '8-10 years', stability: 75, requiredSkills: ['System Architecture', 'Leadership'], highDemandRegions: ['Mumbai', 'Delhi'] },
      { name: `${formData.specialization} Manager`, demand: 85, salary: 12035000, growth: 23, experienceReq: '10+ years', stability: 70, requiredSkills: ['Project Management', 'Agile'], highDemandRegions: ['Bangalore', 'Gurgaon'] },
      { name: `Director of ${formData.specialization}`, demand: 82, salary: 14950000, growth: 20, experienceReq: '12+ years', stability: 65, requiredSkills: ['Strategic Planning', 'Team Management'], highDemandRegions: ['Delhi', 'Hyderabad'] },
      { name: 'Cloud Engineer', demand: 89, salary: 8134000, growth: 45, experienceReq: '3-6 years', stability: 80, requiredSkills: ['AWS', 'Azure'], highDemandRegions: ['Bangalore', 'Pune'] },
      { name: 'Machine Learning Engineer', demand: 87, salary: 8964000, growth: 42, experienceReq: '4-7 years', stability: 75, requiredSkills: ['Python', 'TensorFlow'], highDemandRegions: ['Hyderabad', 'Delhi'] },
      { name: 'DevOps Engineer', demand: 85, salary: 7719000, growth: 35, experienceReq: '3-6 years', stability: 80, requiredSkills: ['Docker', 'Kubernetes'], highDemandRegions: ['Mumbai', 'Chennai'] },
      { name: 'Cybersecurity Analyst', demand: 82, salary: 7304000, growth: 35, experienceReq: '2-4 years', stability: 85, requiredSkills: ['Network Security', 'Penetration Testing'], highDemandRegions: ['Bangalore', 'Delhi'] },
      { name: 'Blockchain Developer', demand: 80, salary: 8300000, growth: 50, experienceReq: '3-5 years', stability: 70, requiredSkills: ['Solidity', 'Ethereum'], highDemandRegions: ['Pune', 'Hyderabad'] }
    ],
    'Healthcare': [
      { name: `Junior ${formData.specialization}`, demand: 92, salary: 4980000, growth: 32, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Patient Care', 'EMR Systems'], highDemandRegions: ['Delhi', 'Mumbai'] },
      { name: `Senior ${formData.specialization}`, demand: 89, salary: 7470000, growth: 27, experienceReq: '5-8 years', stability: 85, requiredSkills: ['Clinical Research', 'HIPAA'], highDemandRegions: ['Chennai', 'Bangalore'] },
      { name: `Lead ${formData.specialization}`, demand: 86, salary: 9130000, growth: 22, experienceReq: '8-10 years', stability: 80, requiredSkills: ['Team Leadership', 'Healthcare Analytics'], highDemandRegions: ['Hyderabad', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 83, salary: 10790000, growth: 18, experienceReq: '10+ years', stability: 75, requiredSkills: ['Healthcare Management', 'Compliance'], highDemandRegions: ['Mumbai', 'Delhi'] },
      { name: `Director of ${formData.specialization}`, demand: 80, salary: 13280000, growth: 15, experienceReq: '12+ years', stability: 70, requiredSkills: ['Strategic Planning', 'Policy Development'], highDemandRegions: ['Bangalore', 'Chennai'] },
      { name: 'Registered Nurse', demand: 92, salary: 6225000, growth: 15, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Nursing', 'Patient Assessment'], highDemandRegions: ['Delhi', 'Mumbai'] },
      { name: 'Physician Assistant', demand: 89, salary: 8964000, growth: 31, experienceReq: '2-4 years', stability: 85, requiredSkills: ['Diagnostics', 'Treatment Planning'], highDemandRegions: ['Bangalore', 'Hyderabad'] },
      { name: 'Medical Technologist', demand: 87, salary: 5395000, growth: 25, experienceReq: '1-3 years', stability: 80, requiredSkills: ['Lab Techniques', 'Data Analysis'], highDemandRegions: ['Chennai', 'Pune'] },
      { name: 'Healthcare Administrator', demand: 83, salary: 8134000, growth: 20, experienceReq: '4-6 years', stability: 75, requiredSkills: ['Administration', 'Budgeting'], highDemandRegions: ['Mumbai', 'Delhi'] },
      { name: 'Telemedicine Specialist', demand: 81, salary: 7055000, growth: 35, experienceReq: '3-5 years', stability: 70, requiredSkills: ['Telehealth Platforms', 'Patient Care'], highDemandRegions: ['Bangalore', 'Hyderabad'] }
    ],
    'Finance': [
      { name: `Junior ${formData.specialization}`, demand: 92, salary: 5395000, growth: 30, experienceReq: '0-2 years', stability: 85, requiredSkills: ['Financial Modeling', 'Excel'], highDemandRegions: ['Mumbai', 'Gurgaon'] },
      { name: `Senior ${formData.specialization}`, demand: 89, salary: 7885000, growth: 25, experienceReq: '5-8 years', stability: 80, requiredSkills: ['Risk Analysis', 'SQL'], highDemandRegions: ['Bangalore', 'Delhi'] },
      { name: `Lead ${formData.specialization}`, demand: 86, salary: 9545000, growth: 20, experienceReq: '8-10 years', stability: 75, requiredSkills: ['Portfolio Management', 'Leadership'], highDemandRegions: ['Mumbai', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 83, salary: 11620000, growth: 15, experienceReq: '10+ years', stability: 70, requiredSkills: ['Strategic Planning', 'Compliance'], highDemandRegions: ['Delhi', 'Hyderabad'] },
      { name: `Director of ${formData.specialization}`, demand: 80, salary: 14110000, growth: 12, experienceReq: '12+ years', stability: 65, requiredSkills: ['Executive Leadership', 'Risk Management'], highDemandRegions: ['Bangalore', 'Mumbai'] },
      { name: 'Financial Analyst', demand: 92, salary: 7221000, growth: 28, experienceReq: '2-4 years', stability: 80, requiredSkills: ['Data Analysis', 'Excel'], highDemandRegions: ['Mumbai', 'Delhi'] },
      { name: 'Investment Banker', demand: 89, salary: 10375000, growth: 15, experienceReq: '3-5 years', stability: 70, requiredSkills: ['Mergers & Acquisitions', 'Valuation'], highDemandRegions: ['Mumbai', 'Gurgaon'] },
      { name: 'Risk Manager', demand: 86, salary: 9545000, growth: 25, experienceReq: '5-8 years', stability: 75, requiredSkills: ['Risk Assessment', 'Statistics'], highDemandRegions: ['Bangalore', 'Delhi'] },
      { name: 'FinTech Specialist', demand: 84, salary: 8300000, growth: 35, experienceReq: '3-5 years', stability: 70, requiredSkills: ['Blockchain', 'APIs'], highDemandRegions: ['Hyderabad', 'Pune'] },
      { name: 'Compliance Officer', demand: 81, salary: 7387000, growth: 15, experienceReq: '3-5 years', stability: 80, requiredSkills: ['Regulatory Compliance', 'Auditing'], highDemandRegions: ['Mumbai', 'Delhi'] }
    ],
    'Education': [
      { name: `Junior ${formData.specialization}`, demand: 88, salary: 3735000, growth: 28, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Teaching', 'Curriculum Design'], highDemandRegions: ['Delhi', 'Bangalore'] },
      { name: `Senior ${formData.specialization}`, demand: 85, salary: 5395000, growth: 23, experienceReq: '5-8 years', stability: 85, requiredSkills: ['Educational Technology', 'Assessment'], highDemandRegions: ['Mumbai', 'Chennai'] },
      { name: `Lead ${formData.specialization}`, demand: 82, salary: 7055000, growth: 18, experienceReq: '8-10 years', stability: 80, requiredSkills: ['Academic Leadership', 'EdTech'], highDemandRegions: ['Hyderabad', 'Pune'] },
      { name: `${formData.specialization} Manager`, demand: 79, salary: 8300000, growth: 13, experienceReq: '10+ years', stability: 75, requiredSkills: ['Administration', 'Policy Development'], highDemandRegions: ['Delhi', 'Gurgaon'] },
      { name: `Director of ${formData.specialization}`, demand: 76, salary: 9960000, growth: 10, experienceReq: '12+ years', stability: 70, requiredSkills: ['Strategic Planning', 'Budgeting'], highDemandRegions: ['Bangalore', 'Mumbai'] },
      { name: 'Elementary Teacher', demand: 88, salary: 4814000, growth: 8, experienceReq: '0-2 years', stability: 90, requiredSkills: ['Classroom Management', 'Pedagogy'], highDemandRegions: ['Delhi', 'Chennai'] },
      { name: 'High School Teacher', demand: 85, salary: 5146000, growth: 10, experienceReq: '1-3 years', stability: 85, requiredSkills: ['Subject Expertise', 'Assessment'], highDemandRegions: ['Mumbai', 'Bangalore'] },
      { name: 'Educational Administrator', demand: 79, salary: 8134000, growth: 15, experienceReq: '5-8 years', stability: 80, requiredSkills: ['Administration', 'Leadership'], highDemandRegions: ['Hyderabad', 'Delhi'] },
      { name: 'Instructional Designer', demand: 76, salary: 5644000, growth: 30, experienceReq: '2-4 years', stability: 75, requiredSkills: ['E-Learning', 'Curriculum Design'], highDemandRegions: ['Pune', 'Bangalore'] },
      { name: 'EdTech Specialist', demand: 74, salary: 6225000, growth: 35, experienceReq: '3-5 years', stability: 70, requiredSkills: ['LMS', 'Digital Tools'], highDemandRegions: ['Chennai', 'Mumbai'] }
    ],
    'Media': [
      { name: `Junior ${formData.specialization}`, demand: 92, salary: 4150000, growth: 45, experienceReq: '0-2 years', stability: 80, requiredSkills: ['Content Creation', 'SEO'], highDemandRegions: ['Mumbai', 'Bangalore'] },
      { name: `Senior ${formData.specialization}`, demand: 89, salary: 6225000, growth: 40, experienceReq: '5-8 years', stability: 75, requiredSkills: ['Digital Marketing', 'Analytics'], highDemandRegions: ['Delhi', 'Pune'] },
      { name: `Lead ${formData.specialization}`, demand: 86, salary: 7885000, growth: 35, experienceReq: '8-10 years', stability: 70, requiredSkills: ['Content Strategy', 'Leadership'], highDemandRegions: ['Hyderabad', 'Chennai'] },
      { name: `${formData.specialization} Manager`, demand: 83, salary: 9545000, growth: 30, experienceReq: '10+ years', stability: 65, requiredSkills: ['Brand Management', 'Campaign Planning'], highDemandRegions: ['Mumbai', 'Gurgaon'] },
      { name: `Director of ${formData.specialization}`, demand: 80, salary: 11224000, growth: 25, experienceReq: '12+ years', stability: 60, requiredSkills: ['Strategic Planning', 'Media Production'], highDemandRegions: ['Bangalore', 'Delhi'] },
      { name: 'Content Creator', demand: 90, salary: 5395000, growth: 45, experienceReq: '1-3 years', stability: 75, requiredSkills: ['Video Editing', 'Storytelling'], highDemandRegions: ['Mumbai', 'Bangalore'] },
      { name: 'Digital Marketing Specialist', demand: 87, salary: 5644000, growth: 40, experienceReq: '2-4 years', stability: 70, requiredSkills: ['SEO', 'Google Analytics'], highDemandRegions: ['Delhi', 'Pune'] },
      { name: 'Social Media Manager', demand: 84, salary: 4565000, growth: 35, experienceReq: '1-3 years', stability: 65, requiredSkills: ['Social Media Strategy', 'Content Planning'], highDemandRegions: ['Hyderabad', 'Chennai'] },
      { name: 'Video Editor', demand: 81, salary: 5146000, growth: 30, experienceReq: '2-4 years', stability: 70, requiredSkills: ['Adobe Premiere', 'Final Cut Pro'], highDemandRegions: ['Mumbai', 'Bangalore'] },
      { name: 'AR/VR Content Developer', demand: 79, salary: 6225000, growth: 50, experienceReq: '3-5 years', stability: 65, requiredSkills: ['Unity', '3D Modeling'], highDemandRegions: ['Pune', 'Delhi'] }
    ]
  };

  const opportunities = opportunitySets[formData.domain] || opportunitySets['Technology'];

  // Adjust salaries based on experience level
  const experienceMultiplier = {
    'entry': 0.8,
    'mid': 1.0,
    'senior': 1.4,
    'executive': 1.8
  };

  const adjustedOpportunities = opportunities.map(opportunity => ({
    ...opportunity,
    salary: Math.round(opportunity.salary * experienceMultiplier[formData.experience])
  }));

  return {
    opportunities: adjustedOpportunities,
    insights: {
      domain: {
        growthRate: 32,
        avgSalary: Math.round(adjustedOpportunities.reduce((sum, opportunity) => sum + opportunity.salary, 0) / adjustedOpportunities.length).toString(),
        jobOpenings: '18400',
        highDemandRegions: ['Bangalore', 'Delhi', 'Mumbai']
      },
      specialization: generateSpecializationInsights(formData, adjustedOpportunities)
    }
  };
};