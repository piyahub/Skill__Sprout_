import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Tries to parse strict JSON, removing common issues like trailing commas, comments, and markdown
const safeParseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Initial JSON parse failed:", err.message);
    // Clean text by removing markdown, comments, and trailing commas
    const cleanedText = text
      .replace(/```json\n?/g, "") // Remove ```json
      .replace(/```\n?/g, "") // Remove ```
      .replace(/\/\/.*?\n/g, "") // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
      .trim();
    try {
      return JSON.parse(cleanedText);
    } catch (cleanError) {
      console.error("Failed to parse cleaned JSON:", cleanError.message);
      throw new Error("Invalid JSON format after cleaning");
    }
  }
};

const CareerPath = () => {
  const [formData, setFormData] = useState({
    currentClass: "",
    desiredCareer: "",
    currentSubjects: "",
    interests: "",
    location: "",
    specificGoals: "",
    currentAge: "",
    workingStatus: "student",
    academicPerformance: "",
    familyBackground: "",
    financialConstraints: "",
    currentCollege: "",
    workExperience: "",
    currentJob: "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // WARNING: Hardcoding API keys in frontend code is insecure. Consider moving to a backend service.
  const genAI = new GoogleGenerativeAI("AIzaSyBPuoHFNOShuRM89rDDteWLXJKuC9KASTg");// new api key using ai coach email

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePrompt = () => {
    const userType = formData.workingStatus;
    const isStudent = userType === "student";
    const isGraduate =
      userType === "graduate" ||
      formData.currentClass === "graduation" ||
      formData.currentClass === "final-year" ||
      formData.currentClass === "postgraduation";
    const isProfessional = userType === "working";
    const isClass9or10 = formData.currentClass === "9" || formData.currentClass === "10";
    const isClass11or12 = formData.currentClass === "11" || formData.currentClass === "12";

    const existingPrompt = `
    You are an expert Indian career counselor. Create a COMPREHENSIVE, DETAILED, and ACTIONABLE career roadmap.

    USER PROFILE:
    - Status: ${isStudent ? `Student in Class ${formData.currentClass}` : isProfessional ? `Working Professional (${formData.currentJob || "Current Job"})` : `Graduate/College Student`}
    - Target Career: ${formData.desiredCareer || "Open to all suggestions"}
    - Current Background/Subjects: ${formData.currentSubjects}
    - Location: ${formData.location}
    ${!isProfessional ? `- Academic Performance: ${formData.academicPerformance}` : ""}
    ${!isProfessional ? `- Financial Budget: ${formData.financialConstraints}` : ""}
    - Current College: ${formData.currentCollege || "Not specified"}
    - Work Experience: ${formData.workExperience || "None"}
    - Interests: ${formData.interests}
    - Specific Goals: ${formData.specificGoals}

    SPECIAL INSTRUCTIONS FOR SCHOOL STUDENTS:

    ${
      isClass9or10
        ? `
    FOR CLASS 9-10 STUDENTS - COMPREHENSIVE CAREER EXPLORATION:
    Since you are in Class ${formData.currentClass}, provide ALL POSSIBLE career paths available in India:

    1. DEFENSE CAREERS (Available after Class 10/12):
       - NDA (National Defence Academy) - Army, Navy, Air Force Officers
       - CDS (Combined Defence Services) - Army, Navy, Air Force
       - Indian Army (Soldier, JCO, Officer ranks)
       - Indian Navy (Sailor, Petty Officer, Officer ranks)
       - Indian Air Force (Airman, NCO, Officer ranks)
       - Coast Guard
       - Para Military Forces (BSF, CRPF, CISF, ITBP, SSB)
       - State Police Forces
       - IPS (Indian Police Service)
       - Intelligence Agencies (RAW, IB)

    2. ENGINEERING CAREERS:
       - Computer Science Engineering
       - Electronics & Communication Engineering
       - Mechanical Engineering
       - Civil Engineering
       - Chemical Engineering
       - Electrical Engineering
       - Aerospace Engineering
       - Biotechnology Engineering
       - Environmental Engineering
       - Marine Engineering

    3. MEDICAL CAREERS:
       - MBBS (Doctor)
       - BDS (Dentist)
       - BAMS (Ayurvedic Doctor)
       - BHMS (Homeopathic Doctor)
       - BUMS (Unani Doctor)
       - Veterinary Doctor
       - Pharmacy (B.Pharm, D.Pharm)
       - Nursing (B.Sc Nursing, GNM)
       - Physiotherapy
       - Medical Laboratory Technology
       - Radiology Technology

    4. COMMERCE & FINANCE:
       - Chartered Accountant (CA)
       - Company Secretary (CS)
       - Cost & Management Accountant (CMA)
       - Banking & Finance
       - Investment Banking
       - Insurance
       - Stock Market Analyst
       - Financial Advisor
       - Business Management

    5. CIVIL SERVICES:
       - IAS (Indian Administrative Service)
       - IPS (Indian Police Service)
       - IFS (Indian Foreign Service)
       - IRS (Indian Revenue Service)
       - State Civil Services
       - Railway Services (UPSC/RRB)
       - Banking Services (IBPS, SBI)
       - SSC Services

    6. BUSINESS & ENTREPRENEURSHIP:
       - Starting Own Business
       - E-commerce Business
       - Digital Marketing
       - Import/Export Business
       - Manufacturing Business
       - Service Industry
       - Franchise Business
       - Tech Startup

    7. CREATIVE & ARTS:
       - Fashion Designing
       - Interior Designing
       - Graphic Designing
       - Animation & VFX
       - Film Making
       - Photography
       - Music & Dance
       - Fine Arts
       - Journalism & Mass Communication

    8. SCIENCE & RESEARCH:
       - Research Scientist
       - Space Research (ISRO)
       - Nuclear Research (BARC, DRDO)
       - Agricultural Research
       - Environmental Science
       - Forensic Science
       - Biotechnology Research

    9. LAW & JUDICIARY:
       - Lawyer (LLB)
       - Judge
       - Legal Advisor
       - Corporate Lawyer
       - Criminal Lawyer
       - Civil Lawyer

    10. TEACHING & EDUCATION:
        - School Teacher (B.Ed)
        - College Professor
        - Educational Administrator
        - Educational Technology
        - Online Teaching

    For each career path, provide:
    - Stream selection guidance for Class 11-12
    - Required entrance exams
    - Educational pathway
    - Salary expectations
    - Job opportunities
    - Government vs Private sector options
    `
        : ""
    }

    ${
      isClass11or12
        ? `
    FOR CLASS 11-12 STUDENTS - STREAM-SPECIFIC COMPREHENSIVE GUIDANCE:
    Based on your current stream/subjects "${formData.currentSubjects}", provide ALL POSSIBLE career paths:

    SCIENCE STREAM (PCM/PCB/PCMB):
    - All Engineering branches with entrance exams (JEE Main, JEE Advanced, State CETs)
    - All Medical courses (NEET, AIIMS, JIPMER)
    - Defense careers (NDA, CDS, AFCAT)
    - Research careers (ISRO, DRDO, BARC)
    - Teaching careers (B.Sc + B.Ed)
    - Pure Science careers

    COMMERCE STREAM:
    - CA, CS, CMA with complete pathway
    - BBA, B.Com with specializations
    - Banking and Finance careers
    - Business Management
    - Economics and Statistics
    - Hotel Management
    - Event Management

    ARTS/HUMANITIES STREAM:
    - Civil Services (UPSC, State PSC)
    - Law (CLAT, AILET)
    - Journalism & Mass Communication
    - Psychology
    - Social Work
    - Literature and Languages
    - History and Archaeology
    - Political Science
    - Philosophy

    VOCATIONAL STREAMS:
    - Technical courses
    - Skill-based careers
    - Diploma courses
    - ITI courses
    `
        : ""
    }

    ${
      isStudent && !formData.desiredCareer
        ? `
    SINCE NO SPECIFIC CAREER IS MENTIONED, PROVIDE COMPREHENSIVE OPTIONS FOR ALL CLASSES:

    IMMEDIATE OPPORTUNITIES (After Class 10):
    - ITI Courses (2 years) - Electrician, Fitter, Welder, etc.
    - Diploma Courses (3 years) - Engineering, Pharmacy, etc.
    - Defense Services - Army, Navy, Air Force (Soldier rank)
    - Police Constable
    - Railway Jobs (Group D)
    - Banking (Clerk level)

    AFTER CLASS 12 OPPORTUNITIES:
    - All Graduate courses (Engineering, Medical, Commerce, Arts)
    - Defense Officer ranks (NDA, CDS)
    - Civil Services preparation
    - Professional courses (CA, CS, CMA)
    - Skill-based courses

    LONG-TERM CAREER GOALS:
    - High-paying careers (Engineering, Medical, CA, IAS)
    - Government jobs with security
    - Business and entrepreneurship
    - Creative and artistic careers
    - Research and academia

    For each option, provide:
    - Educational requirements
    - Entrance exams with dates
    - Top colleges/institutes
    - Government job opportunities
    - Private sector opportunities
    - Salary ranges
    - Career growth prospects
    - Required skills and preparation
    `
        : ""
    }

    COMPREHENSIVE COVERAGE FOR ALL STUDENTS:

    1. GOVERNMENT JOBS AT DIFFERENT LEVELS:
       - Central Government (UPSC, SSC, Banking, Railways, Defense, PSUs)
       - State Government (State PSC, Police, Teaching, Health Department)
       - Local Government (Panchayat, Municipal Corporation)

    2. PRIVATE SECTOR OPPORTUNITIES:
       - Corporate jobs in MNCs
       - Startups and tech companies
       - Traditional businesses
       - Service industries

    3. ENTREPRENEURSHIP OPTIONS:
       - Technology startups
       - Manufacturing businesses
       - Service businesses
       - E-commerce and digital businesses

    4. SKILL-BASED CAREERS:
       - Digital marketing
       - Web development
       - Data science
       - Artificial intelligence
       - Cybersecurity
       - Content creation

    GENERAL INSTRUCTIONS:
    1. Create a STEP-BY-STEP roadmap that is EASY TO UNDERSTAND
    2. Use SIMPLE language, avoid jargon
    3. Include EXACT exam dates, college names, and website links
    4. Make each step ACTIONABLE with clear next steps
    5. Consider Indian education system (CBSE/ICSE/State boards)
    6. Provide STATE-SPECIFIC information when location is mentioned
    7. Include both GOVERNMENT and PRIVATE sector opportunities
    8. Mention SCHOLARSHIPS and FINANCIAL AID options
    9. Include BACKUP PLANS and alternative paths
    10. ABSOLUTELY NO trailing commas anywhere in the JSON
    11. For Class 9-10 students, focus on stream selection and early preparation
    12. For Class 11-12 students, focus on entrance exam preparation and college selection

    ${
      isGraduate || isProfessional
        ? `
    SPECIAL FOCUS FOR GRADUATES/PROFESSIONALS:
    - Recommend specific colleges for higher studies
    - Suggest skill development courses
    - Include professional certifications
    - Mention industry connections and networking
    - Consider career change strategies
    - Include online learning platforms
    `
        : ""
    }

    Respond in this EXACT JSON format:
    {
      "summary": "2-3 line simple summary of the career path options",
      "currentSituation": "Simple assessment of where they are now",
      "targetCareer": "Clear description of career options with salary expectations",
      "roadmap": [
        {
          "title": "Simple step title (e.g., 'Choose Your Stream', 'Prepare for Entrance Exams')",
          "timeframe": "How long this step takes (e.g., '1 year', '6 months')",
          "description": "Simple explanation of what to do in this step",
          "actions": [
            "Specific action 1",
            "Specific action 2",
            "Specific action 3"
          ],
          "subjects": ["Subject 1", "Subject 2"] or null,
          "exams": [
            {
              "name": "Exam name",
              "date": "Month/Year or Registration dates",
              "website": "Official website",
              "importance": "Must have/Good to have/Optional",
              "eligibility": "Eligibility criteria",
              "syllabus": "Brief syllabus overview"
            }
          ] or null,
          "colleges": [
            {
              "name": "College name",
              "location": "City, State",
              "type": "Government/Private",
              "fees": "Approximate fees",
              "cutoff": "Previous year cutoff if available"
            }
          ] or null,
          "skills": ["Skill 1", "Skill 2"] or null,
          "cost": "Estimated cost for this step",
          "tips": ["Tip 1", "Tip 2"],
          "governmentJobs": [
            {
              "position": "Job title",
              "organization": "Department/Ministry",
              "exam": "Exam name",
              "salary": "Salary range"
            }
          ] or null,
          "scholarships": ["Scholarship 1", "Scholarship 2"] or null,
          "streamOptions": [
            {
              "stream": "Stream name (PCM/PCB/Commerce/Arts)",
              "careers": ["Career 1", "Career 2"],
              "description": "What this stream leads to"
            }
          ] or null
        }
      ],
      "quickWins": ["Quick action 1", "Quick action 2", "Quick action 3"],
      "resources": [
        {
          "name": "Resource name",
          "type": "Website/Book/Course/App",
          "link": "URL if available",
          "description": "Why useful"
        }
      ],
      "timeline": "Total time needed to reach the goal",
      "alternatives": ["Alternative path 1", "Alternative path 2"],
      "nextSteps": ["Immediate next step 1", "Immediate next step 2"],
      "careerOptions": [
        {
          "field": "Career field name",
          "scope": "Career scope and opportunities",
          "salary": "Salary range",
          "growth": "Future prospects",
          "entryLevel": "How to start in this field",
          "governmentOpportunities": "Government job options in this field",
          "privateOpportunities": "Private sector options in this field"
        }
      ] or null,
      "defenseOptions": [
        {
          "service": "Service name (Army/Navy/Air Force/Police)",
          "ranks": ["Rank 1", "Rank 2"],
          "exams": ["Exam 1", "Exam 2"],
          "eligibility": "Age and qualification requirements",
          "salary": "Salary range",
          "benefits": "Additional benefits"
        }
      ] or null
    }
    `;

    return `
      ${existingPrompt}
      ADDITIONAL INSTRUCTIONS:
      - Respond ONLY with valid JSON. Do NOT include comments (// or /* */), markdown (e.g., \`\`\`json), or any text outside the JSON object.
      - Ensure the JSON is properly formatted with no trailing commas or invalid syntax.
      - The response must strictly follow the specified JSON structure.
    `;
  };

  const generateRoadmap = async () => {
    if (!formData.currentClass && !formData.currentAge) {
      setError("Please fill in your current status");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.6,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 8192,
        },
      });

      const prompt = generatePrompt();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();


      // Clean and extract JSON
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const jsonStart = cleanedText.indexOf("{");
      const jsonEnd = cleanedText.lastIndexOf("}") + 1;

      if (jsonStart === -1 || jsonEnd <= jsonStart) {
        console.error("No valid JSON found in response:", cleanedText);
        throw new Error("Invalid response format: No valid JSON found");
      }

      const jsonText = cleanedText.substring(jsonStart, jsonEnd);

      const roadmapData = safeParseJson(jsonText);
      setRoadmap(roadmapData);
    } catch (err) {
      console.error("Error generating roadmap:", err.message);
      setError("Failed to generate roadmap. Please try again with different inputs.");
    } finally {
      setLoading(false);
    }
  };

  const StepCard = ({ step }) => (
    <div className="relative mb-8 group">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-lg p-6 border border-white/10 hover:shadow-gray-500/25 transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-500/10 to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <StepContent step={step} />
        </div>
      </div>
    </div>
  );

  const StepContent = ({ step }) => (
    <>
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">{step.title || "Untitled Step"}</h3>
          <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
            {step.timeframe || "N/A"}
          </span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{step.description || "No description available"}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
          <span className="text-xl mr-3">✨</span>
          Action Steps:
        </h4>
        <div className="space-y-3">
          {(step.actions || []).map((action, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-gray-400 mt-1 text-lg">▶</span>
              <span className="text-gray-200 flex-1">{action}</span>
            </div>
          ))}
          {(!step.actions || step.actions.length === 0) && (
            <p className="text-gray-300">No actions specified</p>
          )}
        </div>
      </div>

      {step.streamOptions && step.streamOptions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">🎯</span>
            Stream Options for Class 11-12:
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {step.streamOptions.map((stream, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h5 className="font-bold text-gray-200 text-lg mb-2">{stream.stream || "Unnamed Stream"}</h5>
                <p className="text-gray-300 text-sm mb-3">{stream.description || "No description"}</p>
                <div className="flex flex-wrap gap-2">
                  {(stream.careers || []).map((career, careerIdx) => (
                    <span
                      key={careerIdx}
                      className="bg-white/10 text-gray-200 px-2 py-1 rounded text-xs border border-white/20"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {step.subjects && step.subjects.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">📚</span>
              Subjects:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.subjects.map((subject, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg text-sm font-medium border border-white/20"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {step.skills && step.skills.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Skills:
            </h4>
            <div className="flex flex-wrap gap-2">
              {step.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg text-sm font-medium border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {step.exams && step.exams.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">📝</span>
            Important Exams:
          </h4>
          <div className="space-y-4">
            {step.exams.map((exam, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                  <h5 className="font-bold text-gray-200 text-lg">{exam.name || "Unnamed Exam"}</h5>
                  <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                    <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">{exam.date || "N/A"}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full mt-2 ${
                        exam.importance === "Must have"
                          ? "bg-red-500/20 text-red-300 border border-red-400/30"
                          : exam.importance === "Good to have"
                            ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                            : "bg-green-500/20 text-green-300 border border-green-400/30"
                      }`}
                    >
                      {exam.importance || "Optional"}
                    </span>
                  </div>
                </div>
                {exam.eligibility && (
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Eligibility:</strong> {exam.eligibility}
                  </p>
                )}
                {exam.syllabus && (
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Syllabus:</strong> {exam.syllabus}
                  </p>
                )}
                {exam.website && (
                  <a
                    href={exam.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-sm underline transition-colors duration-300"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step.colleges && step.colleges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">🏫</span>
            Recommended Colleges:
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {step.colleges.map((college, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {typeof college === "string" ? (
                  <p className="text-gray-200">{college}</p>
                ) : (
                  <div>
                    <h5 className="font-bold text-gray-200 text-lg">{college.name || "Unnamed College"}</h5>
                    <p className="text-gray-300 text-sm">📍 {college.location || "N/A"}</p>
                    <p className="text-gray-300 text-sm">🏛️ {college.type || "N/A"}</p>
                    {college.fees && <p className="text-gray-300 text-sm">💰 Fees: {college.fees}</p>}
                    {college.cutoff && <p className="text-gray-300 text-sm">📊 Cutoff: {college.cutoff}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step.governmentJobs && step.governmentJobs.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">🏛️</span>
            Government Job Opportunities:
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {step.governmentJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h5 className="font-bold text-gray-200">{job.position || "Unnamed Position"}</h5>
                <p className="text-gray-300 text-sm">🏢 {job.organization || "N/A"}</p>
                <p className="text-gray-300 text-sm">📝 Exam: {job.exam || "N/A"}</p>
                <p className="text-gray-300 text-sm">💰 Salary: {job.salary || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step.scholarships && step.scholarships.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-200 mb-4 flex items-center text-lg">
            <span className="text-xl mr-3">🎓</span>
            Scholarships Available:
          </h4>
          <div className="flex flex-wrap gap-2">
            {step.scholarships.map((scholarship, idx) => (
              <span
                key={idx}
                className="bg-white/10 text-gray-200 px-3 py-1 rounded-lg text-sm font-medium border border-white/20"
              >
                {scholarship}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {step.cost && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💰</span>
              Estimated Cost:
            </h4>
            <p className="text-gray-200 bg-white/10 p-3 rounded-lg border border-white/20">{step.cost}</p>
          </div>
        )}

        {step.tips && step.tips.length > 0 && (
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-gray-200 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Pro Tips:
            </h4>
            <ul className="space-y-2">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="text-gray-200 text-sm flex items-start">
                  <span className="text-gray-400 mr-2 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "15px 15px",
            animation: "twinkle 4s infinite ease-in-out",
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

      <div
        className={`relative mt-10 mb-10 z-10 max-w-6xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${isMounted ? "animate-formEntrance" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-5xl font-bold text-center text-white mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text animate-fadeInUp">
          AI Career Path Generator
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-12 animate-fadeInUp">
          Get a comprehensive, step-by-step roadmap for your dream career. Powered by advanced AI and designed for the
          Indian education system.
        </p>

        {/* Form */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">Tell us about yourself</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Current Status
              </label>
              <select
                name="workingStatus"
                value={formData.workingStatus}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              >
                <option value="student" className="bg-gray-700 text-white">
                  School Student
                </option>
                <option value="graduate" className="bg-gray-700 text-white">
                  College Student/Graduate
                </option>
                <option value="working" className="bg-gray-700 text-white">
                  Working Professional
                </option>
              </select>
            </div>

            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                {formData.workingStatus === "student" ? "Current Class" : "Age"}
              </label>
              {formData.workingStatus === "student" ? (
                <select
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                >
                  <option value="" className="bg-gray-700 text-white">
                    Select Class
                  </option>
                  <option value="9" className="bg-gray-700 text-white">
                    Class 9
                  </option>
                  <option value="10" className="bg-gray-700 text-white">
                    Class 10
                  </option>
                  <option value="11" className="bg-gray-700 text-white">
                    Class 11
                  </option>
                  <option value="12" className="bg-gray-700 text-white">
                    Class 12
                  </option>
                </select>
              ) : (
                <input
                  type="number"
                  name="currentAge"
                  value={formData.currentAge}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              )}
            </div>

            {formData.workingStatus !== "working" && (
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  Academic Performance
                </label>
                <select
                  name="academicPerformance"
                  value={formData.academicPerformance}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                >
                  <option value="" className="bg-gray-700 text-white">
                    Select Performance
                  </option>
                  <option value="excellent" className="bg-gray-700 text-white">
                    Excellent (90%+)
                  </option>
                  <option value="good" className="bg-gray-700 text-white">
                    Good (75-90%)
                  </option>
                  <option value="average" className="bg-gray-700 text-white">
                    Average (60-75%)
                  </option>
                  <option value="below-average" className="bg-gray-700 text-white">
                    Below Average (50-60%)
                  </option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Desired Career (Optional)
              </label>
              <input
                type="text"
                name="desiredCareer"
                value={formData.desiredCareer}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Doctor, IAS Officer (or leave blank for comprehensive suggestions)"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Mumbai, Delhi, Bangalore"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>
          </div>

          {(formData.workingStatus === "graduate" || formData.workingStatus === "working") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  {formData.workingStatus === "graduate" ? "Current College/University" : "Current Job/Company"}
                </label>
                <input
                  type="text"
                  name={formData.workingStatus === "graduate" ? "currentCollege" : "currentJob"}
                  value={formData.workingStatus === "graduate" ? formData.currentCollege : formData.currentJob}
                  onChange={handleInputChange}
                  placeholder={
                    formData.workingStatus === "graduate"
                      ? "e.g., Delhi University, IIT Delhi"
                      : "e.g., Software Developer at TCS"
                  }
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  {formData.workingStatus === "graduate" ? "Current Course/Stream" : "Work Experience"}
                </label>
                <input
                  type="text"
                  name={formData.workingStatus === "graduate" ? "currentSubjects" : "workExperience"}
                  value={formData.workingStatus === "graduate" ? formData.currentSubjects : formData.workExperience}
                  onChange={handleInputChange}
                  placeholder={
                    formData.workingStatus === "graduate"
                      ? "e.g., B.Tech CSE, B.Com, BA Economics"
                      : "e.g., 2 years in IT, 5 years in Marketing"
                  }
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                />
              </div>
            </div>
          )}

          {formData.workingStatus === "student" && (
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Current Subjects/Stream{" "}
                {(formData.currentClass === "11" || formData.currentClass === "12") && "(Very Important)"}
              </label>
              <input
                type="text"
                name="currentSubjects"
                value={formData.currentSubjects}
                onChange={handleInputChange}
                placeholder={
                  formData.currentClass === "9" || formData.currentClass === "10"
                    ? "e.g., All subjects (Math, Science, Social Science, English, Hindi)"
                    : "e.g., PCM, PCB, Commerce, Arts, Biology, Physics, Chemistry, Mathematics"
                }
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Interests & Strengths
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Coding, Mathematics, Public Speaking, Research, Creative Writing, Sports"
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
              />
            </div>

            {formData.workingStatus !== "working" && (
              <div className="group relative">
                <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  Budget
                </label>
                <select
                  name="financialConstraints"
                  value={formData.financialConstraints}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                >
                  <option value="" className="bg-gray-700 text-white">
                    Select Budget
                  </option>
                  <option value="no-constraints" className="bg-gray-700 text-white">
                    No Budget Issues
                  </option>
                  <option value="moderate" className="bg-gray-700 text-white">
                    Moderate Budget (5-15 Lakhs)
                  </option>
                  <option value="limited" className="bg-gray-700 text-white">
                    Limited Budget (2-5 Lakhs)
                  </option>
                  <option value="very-limited" className="bg-gray-700 text-white">
                    Very Limited (Under 2 Lakhs)
                  </option>
                </select>
              </div>
            )}
          </div>

          <div className="group relative">
            <label className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
              Specific Goals or Questions
            </label>
            <textarea
              name="specificGoals"
              value={formData.specificGoals}
              onChange={handleInputChange}
              placeholder="Any specific goals, concerns, or questions about your career path..."
              rows="4"
              className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10 resize-none"
            ></textarea>
          </div>

          {error && <p className="text-red-400 text-center font-medium animate-fadeInUp">{error}</p>}

          <button
            onClick={generateRoadmap}
            disabled={loading}
            className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div
              className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
            ></div>
            <div className="relative flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Your Comprehensive Roadmap...</span>
                </>
              ) : (
                <span>Generate My Career Roadmap</span>
              )}
            </div>
          </button>
        </div>

        {/* Roadmap Display */}
        {roadmap && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:shadow-gray-500/25 transition-all duration-500">
            <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fadeInUp">Your Career Roadmap</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-3 flex items-center">
                  <span className="text-2xl mr-3">📍</span>
                  Where You Are Now
                </h3>
                <p className="text-gray-300">{roadmap.currentSituation || "No current situation provided"}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Your Career Options
                </h3>
                <p className="text-gray-300">{roadmap.targetCareer || "No career options provided"}</p>
              </div>
            </div>

            {roadmap.defenseOptions && roadmap.defenseOptions.length > 0 && (
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">
                  🛡️ Defense Career Options
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {roadmap.defenseOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500"
                    >
                      <h4 className="text-xl font-bold text-gray-200 mb-3">{option.service || "Unnamed Service"}</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Ranks:</strong> {(option.ranks || []).join(", ") || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Exams:</strong> {(option.exams || []).join(", ") || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Eligibility:</strong> {option.eligibility || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Salary:</strong> {option.salary || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Benefits:</strong> {option.benefits || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {roadmap.careerOptions && roadmap.careerOptions.length > 0 && (
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">
                  🌟 Career Options Based on Your Profile
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {roadmap.careerOptions.map((option, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500"
                    >
                      <h4 className="text-xl font-bold text-gray-200 mb-3">{option.field || "Unnamed Field"}</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Scope:</strong> {option.scope || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Salary:</strong> {option.salary || "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Growth:</strong> {option.growth || "N/A"}
                      </p>
                      {option.entryLevel && (
                        <p className="text-gray-300 text-sm mb-2">
                          <strong>How to Start:</strong> {option.entryLevel}
                        </p>
                      )}
                      {option.governmentOpportunities && (
                        <p className="text-gray-300 text-sm mb-2">
                          <strong>Government Jobs:</strong> {option.governmentOpportunities}
                        </p>
                      )}
                      {option.privateOpportunities && (
                        <p className="text-gray-300 text-sm">
                          <strong>Private Sector:</strong> {option.privateOpportunities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-white mb-8 animate-fadeInUp">
                📅 Step-by-Step Plan ({roadmap.timeline || "N/A"})
              </h3>
              <div className="space-y-6">
                {(roadmap.roadmap || []).map((step, index) => (
                  <StepCard key={index} step={step} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  Quick Wins (Start Today!)
                </h3>
                <ul className="space-y-3">
                  {(roadmap.quickWins || []).map((win, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">✓</span>
                      {win}
                    </li>
                  ))}
                  {(!roadmap.quickWins || roadmap.quickWins.length === 0) && (
                    <p className="text-gray-300">No quick wins specified</p>
                  )}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Immediate Next Steps
                </h3>
                <ul className="space-y-3">
                  {(roadmap.nextSteps || []).map((step, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">▶</span>
                      {step}
                    </li>
                  ))}
                  {(!roadmap.nextSteps || roadmap.nextSteps.length === 0) && (
                    <p className="text-gray-300">No next steps specified</p>
                  )}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  Useful Resources
                </h3>
                <div className="space-y-4">
                  {(roadmap.resources || []).map((resource, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <h4 className="font-medium text-gray-200 text-sm">{resource.name || "Unnamed Resource"}</h4>
                      <p className="text-gray-300 text-xs mb-2">{resource.description || "No description"}</p>
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-white text-xs underline transition-colors duration-300"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                  ))}
                  {(!roadmap.resources || roadmap.resources.length === 0) && (
                    <p className="text-gray-300">No resources specified</p>
                  )}
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  Alternative Paths
                </h3>
                <ul className="space-y-3">
                  {(roadmap.alternatives || []).map((alt, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-gray-400 mr-3 mt-1">•</span>
                      {alt}
                    </li>
                  ))}
                  {(!roadmap.alternatives || roadmap.alternatives.length === 0) && (
                    <p className="text-gray-300">No alternative paths specified</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
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
      `}</style>
    </section>
  );
};

export default CareerPath;