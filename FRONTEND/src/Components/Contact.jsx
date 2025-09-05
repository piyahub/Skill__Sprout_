import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send, User, MessageSquare, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('https://getform.io/f/bejlpxla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          gender: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate massive amount of dot particles
  const generateDotParticles = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full opacity-30 animate-float-random"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          backgroundColor: '#3b82f6',
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${Math.random() * 15 + 10}s`
        }}
      />
    ));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-400/12 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '8s' }}></div>

        {/* Massive Dot Particles */}
        <div className="absolute inset-0">
          {generateDotParticles(300)}
        </div>

        {/* Additional smaller dots for depth */}
        <div className="absolute inset-0">
          {Array.from({ length: 200 }, (_, i) => (
            <div
              key={`small-${i}`}
              className="absolute rounded-full opacity-20 animate-twinkle-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '1px',
                height: '1px',
                backgroundColor: '#60a5fa',
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 4 + 3}s`
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Mouse follower effect */}
        <div
          className="absolute w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>

        {/* Additional ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-blue-950/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20 space-y-4 sm:space-y-6 pt-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl mb-4 sm:mb-6 animate-bounce-slow border border-blue-400/20 ">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent mb-4 sm:mb-6 animate-gradient-x leading-tight px-4">
            Let's Create Together
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to bring your vision to life? I'm here to turn your ideas into reality with 
            cutting-edge solutions and exceptional design.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-4">
            {['Web Development', 'UI/UX Design', 'Full Stack', 'Mobile Apps'].map((skill, index) => (
              <span
                key={index}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 rounded-full text-blue-200 text-xs sm:text-sm hover:bg-blue-500/20 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-20 px-4 sm:px-0">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "ag0567688@gmail.com",
              href: "mailto:ag0567688@gmail.com"
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 9560472926",
              href: "tel:+919560472926"
            },
            {
              icon: MessageCircle,
              title: "WhatsApp",
              value: "+91 9560472926",
              href: "https://wa.me/919560472926"
            }
          ].map((contact, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 sm:p-6 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <contact.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                {contact.title}
              </h3>
              
              <a
                href={contact.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 group-hover:underline text-sm sm:text-base break-all"
              >
                {contact.value}
              </a>
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start px-4 sm:px-0">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-blue-500/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              {/* Form Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text ">
                  Send Your Message
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">Let's discuss your next big project</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400 animate-fadeInUp backdrop-blur-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-400 rounded-full animate-ping"></div>
                      <span className="text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</span>
                    </div>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl text-red-400 animate-fadeInUp backdrop-blur-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm sm:text-base">Failed to send message. Please try again.</span>
                    </div>
                  </div>
                )}

                {/* Name Input */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${focusedField === 'name' ? 'text-blue-400 scale-110' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your full name"
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-500/5 border border-blue-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-xl text-sm sm:text-base"
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'name' ? 'opacity-100' : ''}`}></div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${focusedField === 'email' ? 'text-blue-400 scale-110' : 'text-gray-500'}`} />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-500/5 border border-blue-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-xl text-sm sm:text-base"
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'email' ? 'opacity-100' : ''}`}></div>
                  </div>
                </div>

                {/* Mobile and Gender Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile Input */}
                  <div className="group">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${focusedField === 'mobile' ? 'text-blue-400 scale-110' : 'text-gray-500'}`} />
                      <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('mobile')}
                        onBlur={() => setFocusedField('')}
                        placeholder="+91 9560472926"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-500/5 border border-blue-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-xl text-sm sm:text-base"
                      />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'mobile' ? 'opacity-100' : ''}`}></div>
                    </div>
                  </div>

                  {/* Gender Select */}
                  <div className="group">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                      Gender *
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        id="gender"
                        required
                        value={formData.gender}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('gender')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-blue-500/5 border border-blue-400/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-xl text-sm sm:text-base"
                      >
                        <option value="" className="bg-gray-900">Select Gender</option>
                        <option value="male" className="bg-gray-900">Male</option>
                        <option value="female" className="bg-gray-900">Female</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'gender' ? 'opacity-100' : ''}`}></div>
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${focusedField === 'message' ? 'text-blue-400 scale-110' : 'text-gray-500'}`} />
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Tell me about your project ideas, requirements, or any questions you have..."
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-500/5 border border-blue-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:bg-blue-500/10 resize-none backdrop-blur-xl text-sm sm:text-base"
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'message' ? 'opacity-100' : ''}`}></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden backdrop-blur-xl border border-blue-400/20 text-sm sm:text-base"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                  
                  <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        <span>Send Message</span>
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Address and Map Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Address Card */}
            <div className="bg-blue-500/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02]">
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text ">
                  Visit Our Office
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">Come say hello at our headquarters</p>
              </div>
              
              <div className="text-center">
                <address className="text-gray-300 not-italic leading-relaxed text-sm sm:text-base">
                  <div className="space-y-1">
                    <div>Plot No. 766, 26th KM Milestone, NH-9</div>
                    <div>Ghaziabad, Uttar Pradesh – 201015</div>
                    <div className="text-blue-400 font-medium">India</div>
                  </div>
                </address>
              </div>

              {/* Office Hours */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-400/20">
                <h4 className="text-white font-semibold mb-3 text-center text-sm sm:text-base">Office Hours</h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-300 text-center">
                  <div className="flex justify-between items-center">
                    <span>Monday - Friday</span>
                    <span className="text-blue-400">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Saturday</span>
                    <span className="text-blue-300">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative bg-blue-500/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-2 sm:p-3 shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.545251972305!2d77.49128877566565!3d28.673331882226368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf2c4cac27f99%3A0xd9961659aee6d5b2!2sHi-Tech%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1739723721387!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl filter hover:brightness-110 hover:contrast-110 transition-all duration-500 border border-blue-400/10"
                  title="Office Location Map"
                  style={{ minHeight: '250px' }}
                />
                
                {/* Map Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-blue-500/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-blue-500/10 transition-all duration-300">
                <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-xs text-gray-400">Response Time</div>
              </div>
              <div className="bg-blue-500/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-3 sm:p-4 text-center hover:bg-blue-500/10 transition-all duration-300">
                <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">100+</div>
                <div className="text-xs text-gray-400">Projects Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
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
        
        @keyframes float-random {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateY(-15px) translateX(-20px) rotate(180deg);
          }
          75% {
            transform: translateY(-40px) translateX(8px) rotate(270deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes twinkle-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float-random {
          animation: float-random linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-twinkle-slow {
          animation: twinkle-slow ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        /* Enhanced Responsive Design */
        @media (max-width: 480px) {
          .text-3xl { font-size: 1.875rem; }
          .text-4xl { font-size: 2.25rem; }
          .text-5xl { font-size: 2.5rem; }
          .text-7xl { font-size: 3rem; }
          
          .space-y-6 > * + * {
            margin-top: 1rem;
          }
          
          .gap-6 {
            gap: 1rem;
          }
        }
        
        @media (max-width: 640px) {
          .lg\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .xl\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
          .text-7xl { font-size: 4rem; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        /* Enhanced focus states for accessibility */
        input:focus, textarea:focus, select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default Contact;