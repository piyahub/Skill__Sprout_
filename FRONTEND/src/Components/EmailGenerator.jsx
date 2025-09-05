import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EmailGenerator = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [generatedSubject, setGeneratedSubject] = useState('');
  const [emailHistory, setEmailHistory] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [highContrast] = useState(false);
  const [disableAnimations] = useState(false);
  const [expandedEmails, setExpandedEmails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to access the email generator');
        navigate('/login');
        return;
      }

      setIsMounted(true);
      await fetchEmailHistory(isCancelled);
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [navigate]);

  const fetchEmailHistory = async (isCancelled) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/emails/my-emails`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!isCancelled) {
        const uniqueEmails = Array.from(
          new Map(response.data.emails.map(email => [email._id, email])).values()
        );
        setEmailHistory(uniqueEmails);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.response?.data?.message || 'Failed to fetch email history');
        setEmailHistory([]);
      }
    }
  };

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    setGeneratedEmail(null);
    setGeneratedSubject('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/emails/generate`,
        {
          name: data.name,
          githubUrl: data.githubUrl,
          linkedinUrl: data.linkedinUrl,
          mobileNumber: data.mobileNumber,
          emailId: data.emailId,
          jobRole: data.jobRole,
          companyName: data.companyName,
          category: data.category,
          experience: parseInt(data.experience),
          jobDescription: data.jobDescription,
          tone: data.tone,
          length: data.length,
          skills: data.skills,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { email: emailContent, subject } = response.data;
      if (!emailContent || typeof emailContent !== 'string') {
        console.warn('Invalid email content received:', emailContent);
        setGeneratedEmail('No valid email content was generated. Please try again.');
        setSuccess('Email generation attempted, but no content received.');
      } else {
        setGeneratedEmail(emailContent);
        setGeneratedSubject(subject || `Application for ${data.jobRole} at ${data.companyName}`);
        setSuccess('Email generated successfully!');
      }
      setIsSubmitting(false);
      reset();
      await fetchEmailHistory(false);
    } catch (err) {
      console.error('Error in onSubmit:', err);
      console.error('Error Response:', err.response);
      setError(err.response?.data?.message || 'Failed to generate email');
      setGeneratedEmail('Error: Could not generate email content.');
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedEmail && generatedEmail !== 'Error: Could not generate email content.' && generatedEmail !== 'No valid email content was generated. Please try again.') {
      const plainText = `Subject: ${generatedSubject}\n\n${generatedEmail.replace(/\*\*(.*?)\*\*/g, '$1')}`;
      navigator.clipboard.writeText(plainText);
      setSuccess('Email copied to clipboard!');
      setTimeout(() => setSuccess('Email generated successfully!'), 2000);
    }
  };

  const toggleEmailContent = (emailId) => {
    setExpandedEmails((prev) => ({
      ...prev,
      [emailId]: !prev[emailId],
    }));
  };

  // const toggleHighContrast = () => setHighContrast(!highContrast);
  // const toggleAnimations = () => setDisableAnimations(!disableAnimations);

  return (
    <section className={`relative min-h-screen md:min-h-[60vh] ${highContrast ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'} overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24`}>
      <div className="absolute inset-0">
        {!disableAnimations && (
          <>
            <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '15px 15px',
                animation: 'twinkle 4s infinite ease-in-out',
              }}
            ></div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full opacity-20 animate-swirl"
                  style={{
                    width: `${Math.random() * 3 + 2}px`,
                    height: `${Math.random() * 3 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 6 + 4}s`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={`relative mt-10 mb-10 z-10 w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl transition-all duration-500 transform ${isMounted ? 'animate-slideIn' : 'opacity-0 translate-x-10'}`}>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text animate-fadeInUp">
          Craft Your Professional Email
        </h2>
        {error && <p className="text-red-400 mb-4 text-center font-medium animate-fadeInUp">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center font-medium animate-fadeInUp">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group relative" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="emailId" className="block text-sm font-medium text-gray-300 mb-2">Email ID</label>
              <input
                type="email"
                id="emailId"
                {...register('emailId', {
                  required: 'Email is required',
                  pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email' },
                })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="Enter your email"
              />
              {errors.emailId && <p className="text-red-400 text-sm mt-1">{errors.emailId.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                id="githubUrl"
                {...register('githubUrl')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="Enter your GitHub URL (optional)"
              />
            </div>
            <div className="group relative" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
              <input
                type="url"
                id="linkedinUrl"
                {...register('linkedinUrl')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="Enter your LinkedIn URL (optional)"
              />
            </div>
            <div className="group relative" style={{ animationDelay: '0.5s' }}>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
              <input
                type="text"
                id="mobileNumber"
                {...register('mobileNumber', {
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid Indian mobile number' },
                })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="+91 1234567890 (optional)"
              />
              {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.6s' }}>
              <label htmlFor="jobRole" className="block text-sm font-medium text-gray-300 mb-2">Job Role</label>
              <input
                type="text"
                id="jobRole"
                {...register('jobRole', { required: 'Job role is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="e.g., Software Engineer"
              />
              {errors.jobRole && <p className="text-red-400 text-sm mt-1">{errors.jobRole.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.7s' }}>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                {...register('companyName', { required: 'Company name is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="e.g., Google"
              />
              {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.8s' }}>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                <option value="">Select Category</option>
                <option value="internship">Internship</option>
                <option value="job">Job</option>
                <option value="referral">Referral</option>
                <option value="thank you">Thank You</option>
                <option value="followup">Followup</option>
              </select>
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '0.9s' }}>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">Experience (Years)</label>
              <input
                type="number"
                id="experience"
                {...register('experience', {
                  required: 'Experience is required',
                  min: { value: 0, message: 'Experience cannot be negative' },
                })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="e.g., 2"
              />
              {errors.experience && <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '1.0s' }}>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
              <select
                id="tone"
                {...register('tone', { required: 'Tone is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                <option value="">Select Tone</option>
                <option value="formal">Formal</option>
                <option value="semi-formal">Semi-Formal</option>
                <option value="informal">Informal</option>
              </select>
              {errors.tone && <p className="text-red-400 text-sm mt-1">{errors.tone.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '1.1s' }}>
              <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">Length</label>
              <select
                id="length"
                {...register('length', { required: 'Length is required' })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                <option value="">Select Length</option>
                <option value="short">Short (~100 words)</option>
                <option value="medium">Medium (~200 words)</option>
                <option value="long">Long (~300 words)</option>
              </select>
              {errors.length && <p className="text-red-400 text-sm mt-1">{errors.length.message}</p>}
            </div>
            <div className="group relative" style={{ animationDelay: '1.2s' }}>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
              <input
                type="text"
                id="skills"
                {...register('skills')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="e.g., HTML, CSS, JavaScript"
              />
            </div>
            <div className="group relative sm:col-span-2" style={{ animationDelay: '1.3s' }}>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
              <textarea
                id="jobDescription"
                {...register('jobDescription')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
                placeholder="Enter job description (optional)"
                rows="4"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-300 text-black font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-400/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative flex items-center justify-center space-x-2">
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spi`n" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Email</span>
              )}
            </div>
          </button>
        </form>

        {generatedEmail && (
          <div className="mt-6 bg-white/15 p-4 sm:p-6 rounded-xl border border-white/20 shadow-md animate-fadeInUp">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Generated Email</h3>
            {generatedSubject && (
              <div className="mb-4">
                <span className="text-lg font-semibold text-gray-100 bg-gray-700/70 px-4 py-2 rounded-md shadow-sm">Subject: {generatedSubject}</span>
              </div>
            )}
            <div className="text-gray-100 prose prose-invert max-w-full break-words bg-gray-800/70 p-5 rounded-lg shadow-inner border border-gray-600/50">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedEmail}</ReactMarkdown>
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-4 inline-block bg-gradient-to-r from-gray-300 to-gray-100 text-black px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-200 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Copy email to clipboard"
              disabled={generatedEmail === 'Error: Could not generate email content.' || generatedEmail === 'No valid email content was generated. Please try again.'}
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {Array.isArray(emailHistory) && emailHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 animate-fadeInUp">Email History</h3>
            <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-wrap justify-center">
              {emailHistory.map((email, index) => (
                <div
                  key={email._id}
                  className="bg-white/15 p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fadeInUp w-full min-w-[250px] max-w-full"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <h4 className="text-base sm:text-lg font-medium text-white">{email.jobRole} - {email.companyName}</h4>
                  <p className="text-gray-300 text-sm">Category: {email.category}</p>
                  {expandedEmails[email._id] && (
                    <div className="mt-3 text-gray-100 prose prose-invert max-w-full break-words bg-gray-800/70 p-5 rounded-lg shadow-inner border border-gray-600/50">
                      {email.subject && (
                        <div className="mb-3">
                          <span className="text-base font-semibold text-gray-100 bg-gray-700/70 px-3 py-1.5 rounded-md shadow-sm">Subject: {email.subject}</span>
                        </div>
                      )}
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{email.generatedEmail}</ReactMarkdown>
                    </div>
                  )}
                  <button
                    onClick={() => toggleEmailContent(email._id)}
                    className="mt-3 inline-block bg-gray-700 text-white px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-all duration-300 text-sm shadow-sm"
                    aria-label={expandedEmails[email._id] ? 'Hide email content' : 'Show email content'}
                  >
                    {expandedEmails[email._id] ? 'Hide Content' : 'Show Content'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes swirl {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          50% { transform: translate(40px, -40px) rotate(180deg) scale(1.2); opacity: 0.5; }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); opacity: 0.2; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.6s ease-out forwards; }
        .animate-swirl { animation: swirl linear infinite; }
        .prose pre { background-color: rgba(0, 0, 0, 0.4); padding: 0.75rem; border-radius: 0.5rem; overflow-x: auto; }
        .prose code { background-color: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
        .prose ul, .prose ol { margin-left: 1.25rem; }
        .prose strong { font-weight: 700; }
        .prose { max-width: 100%; word-break: break-word; line-height: 1.6; }
        .break-words { word-break: break-word; }
        @media (max-width: 640px) {
          .prose { font-size: 0.95rem; line-height: 1.5; }
          .prose pre { padding: 0.5rem; }
          .prose ul, .prose ol { margin-left: 1rem; }
          .prose strong { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default EmailGenerator;