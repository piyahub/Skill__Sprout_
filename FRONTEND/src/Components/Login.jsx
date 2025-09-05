import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  // Trigger entrance animation on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/login`, data);
     
      localStorage.setItem('token', response.data.token);
      
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen md:min-h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs with Animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Starry/Dot Pattern with Heavy Animation */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '15px 15px',
            animation: 'twinkle 4s infinite ease-in-out'
          }}
        ></div>

        {/* Particle Animation Layer */}
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

      <div className={`relative z-10 max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${isMounted ? 'animate-formEntrance' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text  animate-fadeInUp">
          Login to Your Account
        </h2>
        {error && <p className="text-red-400 mb-4 text-center font-medium animate-fadeInUp">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center font-medium animate-fadeInUp">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="group relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Please enter a valid email',
                  },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your email"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-500 to-gray-300 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="group relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-4 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-all duration-300 hover:scale-110"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-500 to-gray-300 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full py-4 px-6 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)' }}></div>
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </div>
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 animate-fadeInUp">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:scale-105 inline-block">
            Register
          </Link>
        </p>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
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

export default Login;