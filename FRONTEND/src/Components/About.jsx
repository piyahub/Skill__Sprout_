import React, { useEffect, useRef } from 'react';
// import st1 from "/st1.jpg";
// import st2 from "/st2.png";
// import st3 from "/st3.jpeg";
// import st4 from "/st5.jpeg";


const About = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white/10 animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      if (particlesRef.current) {
        particlesRef.current.appendChild(particle);
      }
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 300);

    return () => {
      clearInterval(particleInterval);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Particle Background */}
      <div 
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-white/5 to-gray-300/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-gray-400/8 to-white/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-white/6 to-gray-500/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-gray-300/7 to-white/7 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 py-12 md:py-20 lg:px-20 space-y-16 md:space-y-24 lg:space-y-32">
        
        {/* About the Project */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4 md:mb-6 lg:mb-8 tracking-tight animate-fade-in pt-16">
              About the Project
            </h2>
            <div className="w-20 h-1 md:w-32 md:h-2 lg:w-40 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full shadow-lg md:shadow-2xl shadow-white/30 animate-pulse"></div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl md:rounded-3xl border border-white/30 p-4 sm:p-6 md:p-10 lg:p-16 shadow-xl md:shadow-2xl hover:bg-white/15 transition-all duration-700 hover:shadow-white/20 hover:border-white/40 group hover:transform hover:scale-[1.02]">
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6 lg:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-white to-gray-300 rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-3xl shadow-lg md:shadow-2xl text-black">
                  🚀
                </div>
                <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white font-bold">
                  Introduction
                </h3>
              </div>
              <p className="text-gray-100 text-xl sm:text-base md:text-xl lg:text-xl xl:text-xl leading-relaxed font-light">
                <span className="text-white font-medium">SkillSprout</span> is an intelligent and interactive career development platform tailored to help job seekers, students, and professionals accelerate their career journeys. Using the power of AI, it delivers mock interviews, personalized resume feedback, LinkedIn insights, and career navigation tools—all in one place.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 lg:mt-16">
                <div className="space-y-4 md:space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-gray-300 to-white rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg md:shadow-2xl text-black">
                      🎯
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-200 font-bold">
                      Key Objectives
                    </h4>
                  </div>
                  <ul className="space-y-3 md:space-y-4 lg:space-y-6 text-gray-100 ml-0 sm:ml-12 md:ml-16 lg:ml-20 text-sm sm:text-base md:text-base lg:text-lg">
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Automate and simplify the job preparation process</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Provide mentorship and feedback using AI agents</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Enhance users' online presence through smart tools</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Bridge the gap between academic knowledge and market skills</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 md:space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-gray-400 to-gray-200 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg md:shadow-2xl text-black">
                      👨‍💻
                    </div>
                    <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-200 font-bold">
                      Target Users
                    </h4>
                  </div>
                  <ul className="space-y-3 md:space-y-4 lg:space-y-6 text-gray-100 ml-0 sm:ml-10 md:ml-12 lg:ml-16 text-sm sm:text-base md:text-base lg:text-lg">
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Final-year students preparing for placement seasons</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Professionals exploring a career shift</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Job seekers aiming to optimize their profiles</span>
                    </li>
                    <li className="flex items-start gap-2 md:gap-3 lg:gap-4">
                      <div className="w-1 h-1 md:w-2 md:h-2 bg-gray-300 rounded-full mt-1 md:mt-1 flex-shrink-0 shadow-sm md:shadow-lg shadow-gray-300/50"></div>
                      <span>Non-tech background users needing career clarity</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 md:mt-12 lg:mt-16 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-gray-800/40 to-black/40 rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-600/40 backdrop-blur-sm hover:bg-gray-700/40 transition-all duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 mb-3 md:mb-4 lg:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-white to-gray-300 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg md:shadow-2xl text-black">
                    🧠
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl text-white font-bold">
                    Why It Matters
                  </h4>
                </div>
                <p className="text-gray-100 leading-relaxed text-sm sm:text-base md:text-xl lg:text-xl font-light">
                  Many job seekers, especially fresh graduates and Tier-II/Tier-III city students, face challenges like lack of interview experience, poor resume structure, or no clear career roadmap. Our platform solves these by giving them real-time guidance and tailored support powered by cutting-edge AI technologies.
                </p>
              </div>

              <div className="mt-6 md:mt-8 lg:mt-10 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-black/40 to-gray-800/40 rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-500/40 backdrop-blur-sm hover:bg-gray-700/40 transition-all duration-500">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 mb-3 md:mb-4 lg:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-gray-400 to-white rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl shadow-lg md:shadow-2xl text-black">
                    🌐
                  </div>
                  <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl text-white font-bold">
                    Vision
                  </h4>
                </div>
                <p className="text-gray-100 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-light">
                  To become a go-to digital mentor for millions by creating an inclusive, data-driven, and scalable platform that levels the playing field for career advancement—irrespective of one's background or resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Motive */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Our Motive
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full shadow-lg md:shadow-2xl shadow-gray-400/50"></div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl md:rounded-3xl border border-white/30 p-4 sm:p-6 md:p-10 lg:p-16 shadow-xl md:shadow-2xl hover:bg-white/15 transition-all duration-700 hover:border-white/40">
            <p className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed mb-8 md:mb-12 lg:mb-16 font-normal">
              The motive behind building the AI Career Coach platform is to democratize access to career development tools, ensuring that every individual, regardless of their background or location, gets access to high-quality, AI-driven mentorship. In today's competitive job landscape, candidates often struggle with limited guidance, lack of interview practice, poorly optimized resumes, and minimal knowledge of evolving job roles.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              {[
                { icon: "🌍", title: "Democratize career growth", desc: "Enable access to intelligent career tools for everyone, everywhere." },
                { icon: "🧠", title: "AI as a career mentor", desc: "Provide smart guidance based on real-time data and user goals." },
                { icon: "💼", title: "Bridge the skills gap", desc: "Help users understand and close the gap between their current skills and market needs." },
                { icon: "📄", title: "Resume & LinkedIn readiness", desc: "Make users' profiles recruiter-ready with AI-enhanced suggestions." },
                { icon: "🧭", title: "Clarity in direction", desc: "Support users who feel lost in their career path with structured advice." },
                { icon: "🎯", title: "Empower first-gen professionals", desc: "Especially useful for students or freshers without strong mentorship access." }
              ].map((item, index) => (
                <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-800/20 to-black/20 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-600/40 hover:border-gray-400/60 transition-all duration-500 hover:transform hover:scale-105 md:hover:scale-110 hover:shadow-xl md:hover:shadow-2xl group">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 lg:mb-6 text-center group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-gray-200 font-bold mb-2 md:mb-3 lg:mb-4 text-center text-sm sm:text-base md:text-lg lg:text-lg">{item.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base text-center leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems We Solve */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Problems We Solve
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full shadow-lg md:shadow-2xl shadow-white/50"></div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl md:rounded-3xl border border-white/30 p-4 sm:p-6 md:p-10 lg:p-16 shadow-xl md:shadow-2xl hover:bg-white/15 transition-all duration-700 hover:border-white/40">
            <p className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed mb-8 md:mb-12 lg:mb-16 font-normal">
              This platform is designed to tackle major career challenges faced by job seekers and students in today's competitive landscape. Here's a breakdown of the specific problems it addresses:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {[
                { icon: "🧩", problem: "Lack of structured interview practice", desc: "Many aspirants lack access to proper mock interview environments, making them unprepared for real interviews." },
                { icon: "🔍", problem: "Unclear career progression paths", desc: "Without personalized guidance, users often feel confused about which roles to pursue based on their skills or interests." },
                { icon: "📄", problem: "Difficulty passing ATS filters", desc: "Traditional resumes often fail to pass through Applicant Tracking Systems used by recruiters, decreasing visibility." },
                { icon: "📉", problem: "No real-time job market feedback", desc: "Job seekers aren't informed about current in-demand roles, skills, or tech trends, limiting their growth potential." },
                { icon: "🔒", problem: "Limited access to mentorship", desc: "Students from non-metro or underserved regions don't have expert career coaches or alumni networks to rely on." },
                { icon: "📈", problem: "Poorly optimized online presence", desc: "Many lack the know-how to properly structure their LinkedIn profiles or approach recruiters via cold emails." }
              ].map((item, index) => (
                <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-black/20 to-gray-800/20 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-600/40 hover:border-gray-400/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl md:hover:shadow-2xl group">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
                    <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0 group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                    <div>
                      <h3 className="text-gray-200 font-bold mb-2 md:mb-3 lg:mb-4 text-sm sm:text-base md:text-lg lg:text-xl">{item.problem}</h3>
                      <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-base">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scope of the Application */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Scope of the Application
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-gray-300 to-white mx-auto rounded-full shadow-lg md:shadow-2xl shadow-gray-300/50"></div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl md:rounded-3xl border border-white/30 p-4 sm:p-6 md:p-10 lg:p-16 shadow-xl md:shadow-2xl hover:bg-white/15 transition-all duration-700 hover:border-white/40">
            <p className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl leading-relaxed mb-8 md:mb-12 lg:mb-16 font-normal">
              The scope of SkillSprout spans across multiple facets of the job-seeking and career development journey. It aims to support not just fresh graduates but also working professionals and career switchers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              {[
                { icon: "🎓", scope: "Empower college students for placement preparation and confidence-building through mock interviews." },
                { icon: "🔄", scope: "Help working professionals plan and execute career switches efficiently with AI-led recommendations." },
                { icon: "🌐", scope: "Enhance online presence and digital footprint of users with LinkedIn and resume optimization tools." },
                { icon: "📊", scope: "Provide real-time skill gap analysis and bridge planning based on current job market data." },
                { icon: "🌱", scope: "Assist individuals in continuous learning by recommending relevant courses and projects." },
                { icon: "🧑‍🎓", scope: "Enable non-metro and Tier-II/Tier-III students to access premium career tools at no cost." },
                { icon: "🤝", scope: "Partner with colleges and institutions to integrate into their career development cells." }
              ].map((item, index) => (
                <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-800/20 to-black/20 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-600/40 hover:border-gray-400/60 transition-all duration-500 hover:transform hover:scale-105 md:hover:scale-110 hover:shadow-xl md:hover:shadow-2xl group">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 lg:mb-6 text-center group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                  <p className="text-gray-200 leading-relaxed text-center text-xs sm:text-sm md:text-base lg:text-base font-medium">{item.scope}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="max-w-6xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-11 md:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Platform Features
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full shadow-lg md:shadow-2xl shadow-white/50"></div>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl mt-4 md:mt-6 lg:mt-10 max-w-5xl mx-auto leading-relaxed font-normal">
              Our platform is packed with a wide array of powerful, user-centric features designed to support every phase of the job search and career growth process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {[
              { icon: "📝", feature: "AI-Powered Resume Builder", desc: "Craft optimized resumes that pass ATS filters with intelligent suggestions." },
              { icon: "🎙️", feature: "Mock Interview System", desc: "Practice with real-time AI-driven interview simulations and feedback." },
              { icon: "📧", feature: "Cold Email Generator", desc: "Create impactful outreach emails to connect with recruiters effectively." },
              { icon: "🔗", feature: "LinkedIn Optimizer", desc: "Improve your profile visibility and professional appearance instantly." },
              { icon: "🧭", feature: "Career Path Generator", desc: "Get personalized career roadmap suggestions based on your goals." },
              { icon: "📊", feature: "Market Insights", desc: "Stay updated with trending roles, skills, and tech stacks in real-time." },
              { icon: "🧠", feature: "Skill Gap Analyzer", desc: "Identify and bridge your skill gaps based on specific job targets." },
              { icon: "🎓", feature: "Quiz Modules", desc: "Practice aptitude, reasoning, and more through interactive quizzes." },
              { icon: "📚", feature: "Interview Kit", desc: "Quick access to curated Q&A for last-minute preparation sessions." },
              { icon: "📈", feature: "Dashboard", desc: "Centralize all your activity and recommendations in one intuitive place." }
            ].map((item, index) => (
              <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-black/20 to-gray-800/20 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-600/40 hover:border-gray-400/60 transition-all duration-500 hover:transform hover:scale-105 md:hover:scale-110 hover:shadow-xl md:hover:shadow-2xl group">
                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl mb-3 md:mb-4 lg:mb-6 text-center group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-gray-200 font-bold mb-2 md:mb-3 lg:mb-4 text-center text-sm sm:text-base md:text-lg lg:text-lg">{item.feature}</h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              How It Works
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-gray-400 to-white mx-auto rounded-full shadow-lg md:shadow-2xl shadow-gray-400/50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              { step: "1", title: "Profile Setup", desc: "Sign up and fill in your academic, professional, and career preference details. This allows our AI to tailor recommendations specifically for your unique journey and goals." },
              { step: "2", title: "Skill Assessment", desc: "Take comprehensive quizzes or upload your resume. Our advanced engine analyzes your current strengths, identifies gaps, and provides actionable insights." },
              { step: "3", title: "Resume & LinkedIn Optimization", desc: "Build ATS-proof resumes and get instant, intelligent suggestions for optimizing your LinkedIn profile to attract recruiters and opportunities." },
              { step: "4", title: "Mock Interviews", desc: "Take AI-conducted mock interviews with instant, smart feedback on your performance, body language, and communication skills for improvement." },
              { step: "5", title: "Market-Ready Insights", desc: "Access comprehensive job trend reports, skill demands, salary insights, and curated resources relevant to your profile and career aspirations." },
              { step: "6", title: "Launch Your Career", desc: "Apply for jobs using personalized cold email templates, optimized resume, and interview readiness—all integrated in one powerful platform." }
            ].map((item, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/15 transition-all duration-700 hover:transform hover:scale-105 shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-white/40 group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 mb-4 md:mb-6 lg:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-gradient-to-r from-white to-gray-300 rounded-xl md:rounded-2xl lg:rounded-2xl flex items-center justify-center text-black font-bold text-xl sm:text-xl md:text-xl lg:text-2xl shadow-lg md:shadow-2xl group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl text-white font-normal">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-base lg:text-medium font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="max-w-7xl mx-auto transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Meet the Team
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full shadow-lg md:shadow-2xl shadow-white/50"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {[
              { name: "Rajdeep Chakraborty", role: "Backend Developer", image: st2, quote: "As the lead developer, I aimed to craft a seamless, responsive experience with complete Backend code of the project." },
              { name: "Pragati", role: "Full Stack Web Developer", image: st3, quote: "My focus was designing the AI interview and resume systems. " },
              { name: "Priya Saxena", role: "Frontend Developer", image: st1, quote: "I designed the platform with accessibility and simplicity in mind. " },
              { name: "Priya Darshini", role: "Prompt & Full Stack Web Developer", image: st4, quote: "This project is more than code—it's impact. I ensured we reach the right audience.I crafted the Prompt with more features. " }
            ].map((member, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/15 transition-all duration-700 hover:transform hover:scale-105 shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 text-center hover:border-white/40 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gradient-to-r from-white to-gray-300 rounded-full mx-auto mb-4 md:mb-6 lg:mb-8 p-1 shadow-lg md:shadow-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl text-white font-bold mb-2 md:mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 lg:mb-8 font-semibold text-sm sm:text-base md:text-medium lg:text-xl">
                  {member.role}
                </p>
                <p className="text-gray-200 leading-relaxed italic text-xs sm:text-sm md:text-base lg:text-base">
                  "{member.quote}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Tech Stack */}
        <section className="max-w-7xl mx-auto mb-12 md:mb-16 lg:mb-20 transform transition-all duration-1000 hover:scale-[1.01]">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent mb-3 md:mb-4 lg:mb-6 tracking-tight">
              Our Tech Stack
            </h2>
            <div className="w-18 h-1 md:w-28 md:h-2 lg:w-36 bg-gradient-to-r from-gray-300 to-white mx-auto rounded-full shadow-lg md:shadow-2xl shadow-gray-300/50"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              { tech: "React JS", desc: "A powerful front-end JavaScript library for building reusable UI components and single-page applications with high interactivity and performance optimization." },
              { tech: "Tailwind CSS", desc: "Utility-first CSS framework for rapid UI development with responsive design, custom themes, and beautiful components that scale perfectly." },
              { tech: "Node.js + Express", desc: "Used for building scalable back-end services and RESTful APIs that communicate efficiently with front-end components and handle complex operations." },
              { tech: "GeminiAI API", desc: "Powers AI interactions including mock interviews, resume suggestions, career guidance, and personalized recommendations using advanced language models." },
              { tech: "Express.js", desc: "Secure user authentication and authorization system with social login integration, real-time user management, and seamless security protocols." },
              { tech: "MongoDB", desc: "NoSQL database for storing user profiles, resume data, interview sessions, career progression analytics, and real-time application data management." }
            ].map((item, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/30 hover:bg-white/15 transition-all duration-700 hover:transform hover:scale-105 shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 text-center hover:border-white/40 group">
                <h3 className="text-lg sm:text-xl md:text-xl lg:text-xl text-white font-medium mb-4 md:mb-6 lg:mb-8 group-hover:text-gray-200 transition-colors duration-300">
                  {item.tech}
                </h3>
                <p className="text-gray-200 leading-relaxed text-xs sm:text-sm md:text-base lg:text-base font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* CSS for particle animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .particle {
          animation: float linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;
