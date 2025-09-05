

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
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

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('mobile', data.mobile);
    formData.append('course', data.course);
    formData.append('year', data.year);
    formData.append('rollNumber', data.rollNumber);
    formData.append('address[street]', data.address.street);
    formData.append('address[city]', data.address.city);
    formData.append('address[state]', data.address.state);
    formData.append('address[pincode]', data.address.pincode);
    formData.append('password', data.password);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEmail(data.email);
      setOtpSent(true);
      setSuccess(response.data.message);
      setIsSubmitting(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/verify-otp`, {
        email,
        otp,
      });
      setSuccess(response.data.message);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
      setIsSubmitting(false);
    }
  };

  const image = watch('image');

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex items-center justify-center">
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

        {/* Swirling Particle Animation */}
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

      <div className={`pt-10 mt-25 mb-20 relative z-10 max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-gray-500/25 transition-all duration-500 transform ${isMounted ? 'animate-slideIn' : 'opacity-0 translate-x-10'}`}>
        <h2 className="text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text  animate-fadeInUp">
          Create Your Account
        </h2>
        {error && <p className="text-red-400 mb-4 text-center font-medium animate-fadeInUp">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center font-medium animate-fadeInUp">{success}</p>}

        {!otpSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div className="group relative" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your full name"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.name && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div className="group relative" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Email Address
              </label>
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
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your email"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.email && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.email.message}</p>}
            </div>

            {/* Mobile Number Input */}
            <div className="group relative" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Please enter a valid 10-digit Indian mobile number',
                  },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="+91 1234567890"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.mobile && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.mobile.message}</p>}
            </div>

            {/* Course Input */}
            <div className="group relative" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Course
              </label>
              <input
                type="text"
                id="course"
                {...register('course', { required: 'Course is required' })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your course"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.course && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.course.message}</p>}
            </div>

            {/* Year/Class Input */}
            <div className="group relative" style={{ animationDelay: '0.5s' }}>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Year/Class
              </label>
              <input
                type="text"
                id="year"
                {...register('year', { required: 'Year/Class is required' })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your year/class"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.year && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.year.message}</p>}
            </div>

            {/* Roll Number Input */}
            <div className="group relative" style={{ animationDelay: '0.6s' }}>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                {...register('rollNumber', { required: 'Roll number is required' })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your roll number"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.rollNumber && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.rollNumber.message}</p>}
            </div>

            {/* Address Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative" style={{ animationDelay: '0.7s' }}>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  {...register('address.street', { required: 'Street address is required' })}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter street address"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
                {errors.address?.street && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.address.street.message}</p>}
              </div>

              <div className="group relative" style={{ animationDelay: '0.8s' }}>
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  City
                </label>
                <input
                  type="text"
                  id="address.city"
                  {...register('address.city', { required: 'City is required' })}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter city"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
                {errors.address?.city && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.address.city.message}</p>}
              </div>

              <div className="group relative" style={{ animationDelay: '0.9s' }}>
                <label htmlFor="address.state" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  State
                </label>
                <input
                  type="text"
                  id="address.state"
                  {...register('address.state', { required: 'State is required' })}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter state"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
                {errors.address?.state && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.address.state.message}</p>}
              </div>

              <div className="group relative" style={{ animationDelay: '1s' }}>
                <label htmlFor="address.pincode" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                  Pincode
                </label>
                <input
                  type="text"
                  id="address.pincode"
                  {...register('address.pincode', {
                    required: 'Pincode is required',
                    pattern: { value: /^\d{6}$/, message: 'Please enter a valid 6-digit pincode' },
                  })}
                  className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                  placeholder="Enter pincode"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
                {errors.address?.pincode && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.address.pincode.message}</p>}
              </div>
            </div>

            {/* Password Input */}
            <div className="group relative" style={{ animationDelay: '1.1s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  })}
                  className="w-full pl-4 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
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
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.password.message}</p>}
            </div>

            {/* Profile Image Input */}
            <div className="group relative" style={{ animationDelay: '1.2s' }}>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Profile Image (max 1MB)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register('image', {
                  required: 'Image is required',
                  validate: {
                    size: (files) => files[0]?.size <= 1024 * 1024 || 'Image must be less than 1MB',
                  },
                })}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
              {errors.image && <p className="text-red-400 text-sm mt-1 animate-fadeInUp">{errors.image.message}</p>}
              {image && image[0] && (
                <div className="mt-2 animate-fadeInUp">
                  <img
                    src={URL.createObjectURL(image[0])}
                    alt="Profile preview"
                    className="w-24 h-24 object-cover rounded-full border border-white/10"
                  />
                  <p className="text-sm text-gray-400 mt-1">Selected: {image[0].name}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
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
                    <span>Registering...</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </div>
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className={`space-y-6 ${isMounted ? 'animate-otpFadeIn' : 'opacity-0'}`}>
            <div className="group relative">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2 transition-all duration-300 group-focus-within:text-gray-200">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp || ''}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full pl-4 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/10"
                placeholder="Enter 6-digit OTP"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-gray-600 to-gray-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300"></div>
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
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify OTP</span>
                )}
              </div>
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-gray-300 animate-fadeInUp">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:scale-105 inline-block">
            Login
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

        @keyframes otpFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-otpFadeIn {
          animation: otpFadeIn 0.6s ease-out forwards;
        }

        .animate-swirl {
          animation: swirl linear infinite;
        }

        .animate-pulseButton {
          animation: pulseButton 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Register;