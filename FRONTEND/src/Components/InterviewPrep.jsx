import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const InterviewPrep = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [questions, setQuestions] = useState([]);
  const [explanation, setExplanation] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to access Interview Prep');
      navigate('/login');
      return;
    }
    setIsMounted(true);
  }, [navigate]);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    setQuestions([]);
    setExplanation(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to generate interview questions');
        setIsSubmitting(false);
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/ai/generate-questions`,
        {
          role: data.role,
          experience: data.experience,
          topicsToFocus: data.topicsToFocus,
          numberOfQuestions: parseInt(data.numberOfQuestions),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestions(response.data.questions);
      setSuccess('Questions generated successfully!');

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/sessions/create`,
        {
          role: data.role,
          experience: data.experience,
          topicsToFocus: data.topicsToFocus,
          description: `Interview prep for ${data.role}`,
          questions: response.data.questions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsSubmitting(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate questions');
      setIsSubmitting(false);
    }
  };

  const handleExplain = async (question) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    setExplanation(null);
    setSelectedQuestion(question);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/ai/generate-explanation`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExplanation(response.data.explanation);
      setSuccess('Explanation generated successfully!');
      setIsSubmitting(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate explanation');
      setIsSubmitting(false);
    }
  };

  if (error && !isMounted) {
    return (
      <div className="flex justify-center items-center min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <a href="/login" className="text-gray-300 hover:text-white hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen md:min-h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center pt-24">
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
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 animate-swirl"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 4}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className={`relative z-10 max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${isMounted ? 'animate-slideIn' : 'opacity-0 translate-x-10'}`}>
        <h2 className="text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text animate-fadeInUp">
          AI Interview Preparation
        </h2>
        {error && <p className="text-red-400 mb-4 text-center font-medium animate-fadeInUp">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center font-medium animate-fadeInUp">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group relative" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Role
              </label>
              <input
                type="text"
                id="role"
                {...register('role', { required: 'Role is required' })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="e.g., Software Engineer"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.role && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.role.message}</p>}
            </div>

            <div className="group relative" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Experience (Years)
              </label>
              <input
                type="number"
                id="experience"
                {...register('experience', {
                  required: 'Experience is required',
                  min: { value: 0, message: 'Experience cannot be negative' },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="e.g., 2"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.experience && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.experience.message}</p>}
            </div>

            <div className="group relative" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="topicsToFocus" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Topics to Focus
              </label>
              <input
                type="text"
                id="topicsToFocus"
                {...register('topicsToFocus', { required: 'Topics are required' })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.topicsToFocus && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.topicsToFocus.message}</p>}
            </div>

            <div className="group relative" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Number of Questions
              </label>
              <input
                type="number"
                id="numberOfQuestions"
                {...register('numberOfQuestions', {
                  required: 'Number of questions is required',
                  min: { value: 1, message: 'At least 1 question is required' },
                  max: { value: 10, message: 'Maximum 10 questions allowed' },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="e.g., 5"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.numberOfQuestions && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.numberOfQuestions.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden animate-pulseButton"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)' }}></div>
            <div className="relative flex items-center justify-center space-x-2">
              {isSubmitting ? (
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
                      d="M12 4a8 8 0 00-8 8h4a4 4 0 014-4V4zm0 16a8 8 0 008-8h-4a4 4 0 01-4 4v4z"
                    ></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Questions</span>
              )}
            </div>
          </button>
        </form>

        {questions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4 animate-fadeInUp">Generated Questions</h3>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <h4 className="text-lg font-medium text-white">{q.question}</h4>
                  <div className="text-gray-300 mt-2 prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.answer}</ReactMarkdown>
                  </div>
                  <button
                    onClick={() => handleExplain(q.question)}
                    disabled={isSubmitting && selectedQuestion === q.question}
                    className="mt-4 inline-block bg-gradient-to-r from-gray-600 to-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-300 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && selectedQuestion === q.question ? 'Explaining...' : 'Explain'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {explanation && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4 animate-fadeInUp">{explanation.title}</h3>
            <div className="bg-white/10 p-6 rounded-xl border border-white/10 animate-fadeInUp">
              <div className="text-gray-300 prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{explanation.explanation}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
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

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes swirl {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(50px, -50px) rotate(180deg) scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
            opacity: 0.2;
          }
        }

        @keyframes pulseButton {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out forwards;
        }

        .animate-swirl {
          animation: swirl linear infinite;
        }

        .animate-pulseButton {
          animation: pulseButton 2s ease-in-out infinite;
        }

        .prose pre {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
        }

        .prose code {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }

        .prose ul, .prose ol {
          margin-left: 1.5rem;
        }
      `}</style>
    </section>
  );
};

export default InterviewPrep;