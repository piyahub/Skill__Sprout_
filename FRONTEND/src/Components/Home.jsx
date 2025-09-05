import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { User, Rocket, FileText, TrendingUp, LogIn, Users, Book, Trophy, ChevronDown, Star, Quote, Building2, MessageCircle, Target, Bot, ArrowRight, CheckCircle, Sparkles, Zap, Play, Shield, Award, Brain, Code, Briefcase, Globe } from "lucide-react";
import st1 from "/st1.jpg";
import st2 from "/st2.png";
import st3 from "/st3.jpeg";
import st4 from "/st4.jpg";
import st5 from "/st5.jpeg";
import st6 from "/st6.jpeg";
import st7 from "/st7.jpg";

const Home = () => {
  const imageRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  // Custom intersection observer hook with performance optimization
  const useInView = (options = {}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options.triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!options.triggerOnce) {
            setInView(false);
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px',
        }
      );

      observer.observe(element);
      return () => observer.unobserve(element);
    }, [options.triggerOnce, options.threshold, options.rootMargin]);

    return { ref, inView };
  };

  // Enhanced smooth scroll with better performance
  useEffect(() => {
    // Set smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced scroll physics
    let isScrolling = false;
    let scrollTimeout;
    let ticking = false;
    
    const handleScroll = () => {
      if (!isScrolling) {
        document.body.style.pointerEvents = 'none';
        isScrolling = true;
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
        isScrolling = false;
      }, 100);

      // Throttled scroll handling
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const scrollThreshold = 100;
          
          if (imageRef.current) {
            const progress = Math.min(scrollPosition / scrollThreshold, 1);
            const translateY = progress * 15;
            const scale = 1 - (progress * 0.02);
            const rotateX = progress * 2;
            
            imageRef.current.style.transform = `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`;
            imageRef.current.style.filter = `drop-shadow(0 ${20 + progress * 5}px ${40 + progress * 10}px rgba(0, 0, 0, ${0.6 + progress * 0.2}))`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Fixed color schemes
  const colorSchemes = {
    blue: {
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      from: '#3b82f6',
      to: '#06b6d4'
    },
    purple: {
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      from: '#8b5cf6',
      to: '#ec4899'
    },
    green: {
      gradient: 'linear-gradient(135deg, #10b981, #34d399)',
      from: '#10b981',
      to: '#34d399'
    },
    orange: {
      gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
      from: '#f97316',
      to: '#ef4444'
    },
    indigo: {
      gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)',
      from: '#6366f1',
      to: '#3b82f6'
    },
    teal: {
      gradient: 'linear-gradient(135deg, #14b8a6, #10b981)',
      from: '#14b8a6',
      to: '#10b981'
    },
    violet: {
      gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
      from: '#8b5cf6',
      to: '#a855f7'
    },
    amber: {
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
      from: '#f59e0b',
      to: '#f97316'
    }
  };

  const features = [
    { 
      title: "AI Career Pathfinder", 
      description: "Discover personalized career trajectories powered by advanced AI algorithms that analyze market trends and your unique skillset.", 
      icon: <User className="w-6 h-6 text-white" />,
      colorKey: 'blue'
    },
    { 
      title: "Interview Excellence Hub", 
      description: "Master interviews with real-time AI feedback, industry-specific scenarios, and confidence-building practice sessions.", 
      icon: <Rocket className="w-6 h-6 text-white" />,
      colorKey: 'purple'
    },
    { 
      title: "Smart Resume Architect", 
      description: "Create ATS-optimized resumes with intelligent keyword suggestions and industry-specific formatting that gets noticed.", 
      icon: <FileText className="w-6 h-6 text-white" />,
      colorKey: 'green'
    },
    { 
      title: "Professional Email Craft", 
      description: "Generate compelling professional emails with AI-powered tone optimization and industry best practices.", 
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      colorKey: 'orange'
    },
    { 
      title: "AI Skill Assessment", 
      description: "Comprehensive skill evaluation with personalized learning recommendations and industry benchmarking.", 
      icon: <Brain className="w-6 h-6 text-white" />,
      colorKey: 'indigo'
    },
    { 
      title: "Linkedin Profile Optimizer", 
      description: "Enhance your LinkedIn presence with AI-driven profile analysis, keyword optimization, and engagement strategies.", 
      icon: <Code className="w-6 h-6 text-white" />,
      colorKey: 'teal'
    },
    
    { 
      title: "Global Job Insights", 
      description: "Access real-time job market data and salary insights across different regions and industries.", 
      icon: <Globe className="w-6 h-6 text-white" />,
      colorKey: 'amber'
    },
  ];

  const howItWorks = [
    { 
      title: "Quick Setup", 
      description: "Create your professional profile in under 3 minutes with our intelligent onboarding process.", 
      icon: <LogIn className="w-6 h-6 text-white" />,
      step: "01",
      colorKey: 'indigo'
    },
    { 
      title: "AI Analysis", 
      description: "Our advanced AI analyzes your profile and matches you with optimal career opportunities.", 
      icon: <Users className="w-6 h-6 text-white" />,
      step: "02",
      colorKey: 'teal'
    },
    { 
      title: "Skill Enhancement", 
      description: "Access personalized learning paths and practice tools designed for your career goals.", 
      icon: <Book className="w-6 h-6 text-white" />,
      step: "03",
      colorKey: 'violet'
    },
    { 
      title: "Career Success", 
      description: "Land your dream position with confidence, preparation, and our continuous support system.", 
      icon: <Trophy className="w-6 h-6 text-white" />,
      step: "04",
      colorKey: 'amber'
    },
  ];

  const testimonials = [
    { 
      author: "Khushi ", 
      role: " Frontend Developer", 
      company: "NITJ", 
      quote: "This platform revolutionized my career journey. The AI-driven insights were incredibly accurate and helped me secure my dream role within weeks!", 
      image: st1,
      rating: 5
    },
    { 
      author: "RAM Gupta", 
      role: "Full Stack Developer", 
      company: "NITJ", 
      quote: "The interview preparation module is outstanding. I went from nervous candidate to confident professional. Absolutely game-changing!", 
      image: st2,
      rating: 5
    },
    { 
      author: "Rajesh", 
      role: "Full Stack Developer", 
      company: "NITJ", 
      quote: "The market insights and personalized guidance transformed how I approach my career. Results speak for themselves - 40% salary increase!", 
      image: st3,
      rating: 5
    },
    { 
      author: "SashI", 
      role: "Frontend Specialist", 
      company: "Creative Solutions", 
      quote: "The resume builder is phenomenal! My application response rate increased by 300%. This platform is a career catalyst.", 
      image: st4,
      rating: 5
    },
    { 
      author: "Manish Dargan", 
      role: "Full Stack Developer", 
      company: "Tech Innovations", 
      quote: "The AI career matching is incredibly precise. Found my perfect role in just 2 weeks with a 50% salary bump!", 
      image: st5,
      rating: 5
    },
    { 
      author: "Anshu ", 
      role: "Data Analyst", 
      company: "Cloud Systems", 
      quote: "The skill assessment and learning paths are exceptional. Helped me transition from developer to DevOps seamlessly.", 
      image: st6,
      rating: 5
    },
    { 
      author: "Cheshta Sharma ", 
      role: "Data Scientist", 
      company: "Cloud Systems", 
      quote: "The skill assessment and learning paths are exceptional. Helped me transition from developer to DevOps seamlessly.", 
      image: st7,
      rating: 5
    },
  ];

  const faqs = [
    { 
      question: "What sets AI Career Coach apart from traditional career platforms?", 
      answer: "Our platform leverages cutting-edge artificial intelligence to provide hyper-personalized career guidance. Unlike static platforms, we continuously adapt to market changes, analyze real-time industry trends, and offer dynamic recommendations that evolve with your career journey." 
    },
    { 
      question: "How sophisticated is the AI career matching algorithm?", 
      answer: "Our proprietary AI engine processes over 10,000 data points including skills assessment, market demand, salary trends, company culture fit, and career progression patterns. It uses machine learning to continuously improve its recommendations based on successful career transitions." 
    },
    { 
      question: "What pricing options are available for different needs?", 
      answer: "We offer a comprehensive free tier with essential features,  with advanced AI insights. All plans include our core AI matching, with free offering unlimited resources and priority support." 
    },
    { 
      question: "How comprehensive is the career progress tracking system?", 
      answer: "Our analytics dashboard provides detailed insights into skill development velocity, application success rates, interview performance metrics, salary progression tracking, and career milestone achievements. Real-time feedback helps optimize your career strategy continuously." 
    },
    { 
      question: "What security measures protect my professional data?", 
      answer: "We employ bank-level encryption (AES-256), comply with GDPR and SOC 2 standards, and implement zero-knowledge architecture. Your data is encrypted at rest and in transit, with granular privacy controls and the option to delete all information at any time." 
    },
    { 
      question: "How does the AI interview preparation work?", 
      answer: "Our AI conducts realistic mock interviews using natural language processing, provides real-time feedback on your responses, analyzes your communication patterns, and offers personalized improvement suggestions based on industry standards and successful interview patterns." 
    },
  ];

  const stats = [
    { value: "75+", label: "Industries Covered", icon: <Building2 className="w-5 h-5" /> },
    { value: "50K+", label: "Practice Questions", icon: <MessageCircle className="w-5 h-5" /> },
    { value: "98%", label: "Success Rate", icon: <Target className="w-5 h-5" /> },
    { value: "24/7", label: "AI Assistant", icon: <Bot className="w-5 h-5" /> },
    { value: "1", label: "Countries Served", icon: <Globe className="w-5 h-5" /> },
    { value: "95%", label: "User Satisfaction", icon: <Star className="w-5 h-5" /> },
  ];

  const benefits = [
    "AI-powered career matching",
    "Real-time market insights",
    "Personalized learning paths",
    "Interview simulation",
    "Resume optimization",
    "Industry networking",
    "Skill gap analysis",
    "Career roadmap planning",
    "24/7 AI mentorship"
  ];

  // Scroll reveal hooks
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: faqRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <>
      <style jsx>{`
        /* Enhanced Professional Styling with Performance Optimizations */
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Enhanced smooth scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.9);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 5px;
          border: 2px solid rgba(15, 23, 42, 0.9);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        /* Enhanced gradient title */
        .gradient-title {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #ffffff 50%, #f1f5f9 75%, #ffffff 100%);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShimmer 8s ease-in-out infinite;
          will-change: background-position;
          text-shadow: none;
        }

        @keyframes titleShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Premium Background System with Dot Pattern */
        .cosmic-bg {
          background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #0f172a 50%, #020617 100%);
          position: relative;
          min-height: 100vh;
        }

        /* Increased Dot Pattern Size */
        .dot-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 2px, transparent 0);
          background-size: 120px 120px;
          pointer-events: none;
          z-index: 1;
        }

        /* Enhanced Glass Morphism without glow */
        .glass-card {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          will-change: transform, box-shadow;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .glass-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .glass-card:hover::before {
          opacity: 1;
        }

        /* Enhanced Icon Backgrounds without glow */
        .icon-gradient {
          background-size: 200% 200%;
          animation: iconFlow 6s ease-in-out infinite;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, background-position;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .icon-gradient:hover {
          transform: scale(1.2) rotate(12deg);
          animation-duration: 3s;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
        }

        @keyframes iconFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Enhanced Step Cards */
        .step-card {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          will-change: transform, box-shadow;
        }

        .step-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #3b82f6, transparent);
          transition: left 1.2s ease;
        }

        .step-card:hover {
          transform: translateY(-15px) scale(1.04);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .step-card:hover::after {
          left: 100%;
        }

        .step-number {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          opacity: 0.4;
          transition: all 0.7s ease;
          position: absolute;
          top: 1rem;
          right: 1rem;
          will-change: opacity, transform;
        }

        .step-card:hover .step-number {
          opacity: 0.9;
          transform: scale(1.3) rotate(12deg);
        }

        /* Premium FAQ Design */
        .faq-item {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.5s ease;
          overflow: hidden;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
          will-change: transform, border-color;
        }

        .faq-item:hover {
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 12px 50px rgba(0, 0, 0, 0.4);
          transform: translateY(-5px);
        }

        .faq-trigger {
          transition: all 0.4s ease;
          position: relative;
        }

        .faq-trigger:hover {
          background: rgba(59, 130, 246, 0.05);
        }

        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          will-change: max-height, opacity;
        }

        .faq-content.open {
          max-height: 600px;
          opacity: 1;
          padding-bottom: 1.5rem;
        }

        .faq-icon {
          transition: transform 0.5s ease;
          will-change: transform;
        }

        .faq-icon.open {
          transform: rotate(180deg);
        }

        /* Enhanced CTA Buttons without glow */
        .cta-button {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8, #1e40af);
          background-size: 200% 200%;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
          will-change: transform, box-shadow, background-position;
          border: none;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d4ed8, #1e40af, #3b82f6);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .cta-button:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.4);
          background-position: 100% 0;
        }

        .cta-button:hover::before {
          opacity: 1;
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.5s ease;
          color: #e2e8f0;
          will-change: transform, background-color, border-color;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }

        /* Enhanced Testimonial Cards */
        .testimonial-card {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          will-change: transform, box-shadow, border-color;
        }

        .testimonial-card:hover {
          transform: translateY(-15px) scale(1.04);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          border-color: rgba(59, 130, 246, 0.3);
        }

        /* Professional Badge */
        .floating-badge {
          animation: floatBadge 6s ease-in-out infinite;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(16px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
          will-change: transform;
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* Bright Section Headings */
        .section-heading-bright {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #dbeafe 60%, #ffffff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: headingShimmer 4s ease-in-out infinite;
          font-weight: 900;
          will-change: background-position;
        }

        @keyframes headingShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Animation Classes with Performance Optimization */
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 1.2s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1.2s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1.2s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 1.5s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Enhanced Text Readability */
        .text-primary {
          color: #ffffff;
        }

        .text-secondary {
          color: #e2e8f0;
        }

        .text-muted {
          color: #cbd5e1;
        }

        /* Responsive Grid System */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .how-it-works-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 2rem;
        }

        /* Interactive hover effects */
        .interactive-hover {
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .interactive-hover:hover {
          transform: translateY(-3px);
          color: #60a5fa;
        }

        .magnetic-button {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .magnetic-button:hover {
          transform: translateY(-3px);
        }

        /* Enhanced Mobile Optimizations */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }
          
          .testimonials-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }

          .dot-pattern {
            background-size: 80px 80px;
          }
        }

        @media (max-width: 768px) {
          .features-grid,
          .how-it-works-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .gradient-title {
            font-size: clamp(2rem, 8vw, 3rem);
            line-height: 1.1;
          }

          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 1.5rem;
          }

          .dot-pattern {
            background-size: 60px 60px;
          }
        }

        @media (max-width: 480px) {
          .features-grid,
          .how-it-works-grid,
          .testimonials-grid {
            gap: 1rem;
          }

          .glass-card,
          .step-card,
          .testimonial-card {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .dot-pattern {
            background-size: 60px 60px;
          }
        }

        /* Performance Optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Enhanced scroll behavior */
        @supports (scroll-behavior: smooth) {
          html {
            scroll-behavior: smooth;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen w-full pt-20 pb-16 cosmic-bg relative">
        {/* Fixed Dot Pattern */}
        <div className="dot-pattern"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full">
            <div className="text-center space-y-6 sm:space-y-8">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 floating-badge">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                <span className="hidden sm:inline font-medium">Trusted by 50,000+ professionals worldwide</span>
                <span className="sm:hidden font-medium">50,000+ professionals trust us</span>
              </div>

              {/* Hero Title */}
              <div className="space-y-6">
                <h1 className="gradient-title font-black leading-tight text-center px-4 sm:px-0 text-3xl md:text-5xl lg:text-6xl">
                  Transform Your Career
                  <br />
                  with AI-Powered Guidance
                </h1>
                
                <p className="mx-auto max-w-4xl text-lg md:text-xl lg:text-2xl text-secondary leading-relaxed px-4 sm:px-0 font-light">
                  Unlock your professional potential with personalized career insights, intelligent resume optimization, and interview mastery powered by cutting-edge artificial intelligence.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8 px-4 sm:px-0">
                <button 
                  onClick={handleGetStarted}
                  className="secondary-button px-8 py-4 text-lg font-semibold text-white rounded-2xl relative z-10 flex items-center justify-center gap-3 magnetic-button"
                >
                  <Play className="w-5 h-5" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={handleSignIn}
                  className="secondary-button px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center gap-3 magnetic-button"
                >
                  <Shield className="w-5 h-5" />
                  Sign In
                  <Zap className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-muted">
                <div className="flex items-center gap-3 interactive-hover">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-base font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-3 interactive-hover">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-base font-medium">50K+ Users</span>
                </div>
                <div className="flex items-center gap-3 interactive-hover">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span className="text-base font-medium">98% Success Rate</span>
                </div>
                <div className="flex items-center gap-3 interactive-hover">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-base font-medium">Award Winning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full cosmic-bg relative">
        {/* Fixed Dot Pattern */}
        <div className="dot-pattern"></div>
        
        <div className="relative z-10">
          {/* Enhanced Features Section */}
          <div ref={featuresRef} className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                  <Rocket className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="font-medium">Powerful AI Features</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6 px-4 sm:px-0">
                  Advanced Tools for Career Excellence
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                  Elevate your professional journey with our comprehensive suite of AI-powered career development tools designed for modern professionals.
                </p>
              </div>

              <div className="features-grid">
                {features.map((feature, index) => {
                  const colorScheme = colorSchemes[feature.colorKey] || colorSchemes.blue;
                  
                  return (
                    <div
                      key={index}
                      className={`glass-card rounded-3xl p-8 group ${
                        featuresInView ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div 
                        className="icon-gradient w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                        style={{ background: colorScheme.gradient }}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div ref={statsRef} className="py-16 bg-black/40 backdrop-blur-2xl border-y border-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center ${
                      statsInView ? "animate-bounce-in" : "opacity-0"
                    } group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-125 transition-transform duration-500">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {stat.value}
                    </h3>
                    <p className="text-base font-medium text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div ref={benefitsRef} className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  <span className="font-medium">Key Benefits</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6">
                  Why Choose Our Platform?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                  Experience the difference with our comprehensive career development ecosystem.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-6 glass-card rounded-2xl ${
                      benefitsInView ? "animate-slide-in-left" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-secondary font-medium text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced How It Works Section */}
          <div ref={howItWorksRef} className="py-24 bg-black/20 backdrop-blur-2xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                  <Book className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="font-medium">Simple 4-Step Process</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6 px-4 sm:px-0">
                  How It Works
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                  Transform your career in four simple steps with our AI-powered guidance system designed for rapid professional growth.
                </p>
              </div>

              <div className="how-it-works-grid">
                {howItWorks.map((item, index) => {
                  const colorScheme = colorSchemes[item.colorKey] || colorSchemes.blue;
                  
                  return (
                    <div
                      key={index}
                      className={`step-card rounded-3xl p-8 group relative ${
                        howItWorksInView ? "animate-slide-in-left" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="step-number">{item.step}</div>
                      <div 
                        className="icon-gradient w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                        style={{ background: colorScheme.gradient }}
                      >
                        {item.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:text-blue-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Testimonials Section */}
          <div ref={testimonialsRef} className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                  <Users className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="font-medium">Success Stories</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6 px-4 sm:px-0">
                  What Our Users Say
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                  Join thousands of professionals who have transformed their careers with our AI-powered platform and achieved remarkable success.
                </p>
              </div>

              <div className="testimonials-grid">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`testimonial-card rounded-3xl p-8 ${
                      testimonialsInView ? "animate-fade-in-scale" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <Quote className="w-8 h-8 text-blue-400 opacity-60 mb-6" />
                    
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      ))}
                    </div>
                    
                    <blockquote className="text-base md:text-lg text-secondary mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-14 h-14 rounded-full border-2 border-white/10 object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-primary">{testimonial.author}</p>
                        <p className="text-base text-muted">{testimonial.role}</p>
                        <p className="text-base text-muted opacity-80">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced FAQ Section */}
          <div ref={faqRef} className="py-24 bg-black/30 backdrop-blur-2xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                  <ChevronDown className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="font-medium">Frequently Asked Questions</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6 px-4 sm:px-0">
                  Got Questions?
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-muted max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                  Find comprehensive answers to common questions about our AI Career Coach platform.
                </p>
              </div>

              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item rounded-3xl overflow-hidden ${
                      faqInView ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      className="faq-trigger w-full text-left py-6 px-8 text-primary font-semibold flex justify-between items-center hover:bg-blue-500/5 transition-colors duration-300"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="text-lg pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`w-6 h-6 text-blue-400 faq-icon flex-shrink-0 ${
                          openFaq === index ? "open" : ""
                        }`} 
                      />
                    </button>
                    <div className={`faq-content ${openFaq === index ? "open" : ""}`}>
                      <div className="px-8 pb-6">
                        <p className="text-base md:text-lg text-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Final CTA Section */}
          <div ref={ctaRef} className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                className={`glass-card rounded-3xl p-12 text-center relative overflow-hidden ${
                  ctaInView ? "animate-fade-in-scale" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-sm text-gray-300 mb-8 floating-badge">
                    <Trophy className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="font-medium">Transform Your Career Today</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black section-heading-bright mb-6 px-4 sm:px-0">
                    Ready to Start Your Success Story?
                  </h2>
                  
                  <p className="text-base md:text-lg lg:text-xl text-secondary max-w-4xl mx-auto mb-8 leading-relaxed px-4 sm:px-0">
                    Join thousands of professionals who have accelerated their careers with our AI-powered platform. Your dream job is just one click away.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 px-4 sm:px-0">
                    <button 
                      onClick={handleGetStarted}
                      className="secondary-button px-10 py-4 text-lg font-semibold text-white rounded-2xl relative z-10 flex items-center justify-center gap-3 magnetic-button"
                    >
                      <Play className="w-5 h-5" />
                      Begin Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleSignIn}
                      className="secondary-button px-10 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center gap-3 magnetic-button"
                    >
                      <Shield className="w-5 h-5" />
                      Sign In
                      <Zap className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm text-muted">
                    <div className="flex items-center justify-center space-x-3 interactive-hover">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 interactive-hover">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">50,000+ Users</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 interactive-hover">
                      <Trophy className="w-5 h-5 text-green-400" />
                      <span className="font-medium">98% Success</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 interactive-hover">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="font-medium">Award Winning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
