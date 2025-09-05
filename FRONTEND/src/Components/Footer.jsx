import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaArrowUp, FaTimes,FaTwitter  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const teamMembers = [
    {
      name: "Rajdeep Chakraborty",
      role: "Backend DEVELOPER",
      linkedin: "https://www.linkedin.com/in//",
      photo: "#",
    },
    {
      name: "Praagti Aggarwal",
      role: "FullStack DEVELOPER",
      linkedin: "#",
      photo: "#",
    },
    {
      name: "Priya Darshini",
      role: "FULL STACK DEVELOPER",
      linkedin: "https://www.linkedin.com/in//",
      photo: "#",
    },
    {
      name: "Priya Saxena",
      role: "Frontend Developer",
      linkedin: "#",
      photo: "#",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* CSS Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent animate-[slide_20s_linear_infinite] bg-[length:200%_100%]" />
        <div className="absolute w-[600px] h-[600px] top-[-150px] left-[-150px] bg-gradient-to-br from-indigo-500/25 to-teal-400/25 blur-[100px] rounded-full animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute w-[500px] h-[500px] bottom-[-120px] right-[-120px] bg-gradient-to-tr from-rose-500/20 to-amber-400/20 blur-[90px] rounded-full animate-[pulse_12s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Scroll to Top Arrow Button (Fixed) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-teal-400/60 transition-all duration-300 hover:scale-110 group cursor-pointer"
      >
        <FaArrowUp className="text-xl group-hover:-translate-y-1.5 transition-transform duration-300" />
        <span className="absolute -inset-1.5 rounded-full bg-teal-400 blur-md opacity-0 group-hover:opacity-40 transition-all duration-400" />
      </button>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
        {/* Contact Info */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-800/90 border border-gray-700/30 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/50 group">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight group-hover:scale-105 transition-transform duration-300">Skill_Sprout</h3>
          <p className="text-sm sm:text-base leading-relaxed font-light text-gray-300">NIT Jalandhar</p>
          <p className="text-sm sm:text-base font-light text-gray-300">Email: priya@gmail.com</p>
          <p className="text-sm sm:text-base font-light text-gray-300">Phone: 9520476546</p>
        </div>

        {/* Navigation */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-800/90 border border-gray-700/30 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/50">
          <h4 className="text-xl sm:text-2xl font-semibold text-teal-400 mb-4 tracking-tight">Explore</h4>
          <ul className="space-y-3 text-sm sm:text-base">
            {[
              { text: "Home", path: "/" },
              { text: "Career Path", path: "/career" },
              { text: "Resume Builder", path: "/resume" },
              { text: "Login", path: "/login" },
              { text: "Contact", path: "/contact" },
            ].map(({ text, path }, i) => (
              <li key={i} className="relative group">
                <Link to={path} className="relative inline-block text-gray-200 hover:text-teal-300 transition-all duration-300 cursor-pointer">
                  {text}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-800/90 border border-gray-700/30 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/50">
          <h4 className="text-xl sm:text-2xl font-semibold text-rose-400 mb-4 tracking-tight">Connect</h4>
          <div className="flex gap-4 sm:gap-6 text-2xl sm:text-3xl">
            {[
              { href: "https://www.instagram.com//", icon: <FaInstagram />, color: "text-rose-400" },
              { href: "https://www.linkedin.com/in//", icon: <FaLinkedin />, color: "text-blue-400" },
              { href: "https://x.com/", icon: <FaTwitter  />, color: "text-blue-400" },
              { href: "https://wa.me/", icon: <FaWhatsapp />, color: "text-green-400" },
            ].map(({ href, icon, color }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className={`group relative hover:scale-115 hover:-translate-y-1 transition-all duration-400 ease-out ${color} cursor-pointer`}>
                {icon}
                <span className="absolute -inset-2 rounded-full bg-current opacity-0 group-hover:opacity-30 blur-lg transition-all duration-400" />
              </a>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-800/90 border border-gray-700/30 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/50">
          <h4 className="text-xl sm:text-2xl font-semibold text-amber-400 mb-4 tracking-tight">Join Us</h4>
          <p className="text-sm sm:text-base font-light text-gray-300 mb-4">Empower your career with our innovative tools and vibrant community.</p>
          
        </div>
      </div>

      {/* Divider */}
      <div className="my-12 w-full h-px bg-gradient-to-r from-transparent via-teal-400/80 to-transparent" />

      {/* Copyright */}
      <div className="text-center text-sm sm:text-base text-gray-400">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Skill_Sprout</span>. All rights reserved.
      </div>

      {/* Developer Credits */}
      <div className="mt-3 text-center text-sm sm:text-base">
        <button onClick={() => setIsModalOpen(true)}
          className="text-teal-400 hover:text-teal-300 transition-all duration-300 cursor-pointer">
          Crafted by <span className="font-semibold bg-gradient-to-r from-teal-400 via-indigo-500 to-rose-500 text-transparent bg-clip-text animate-[glimmer_10s_linear_infinite]">CodeVeda</span>
        </button>
      </div>

      {/* Team Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative bg-gray-900/95 rounded-2xl p-6 sm:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl transition-all duration-300">
            <button onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center tracking-tight animate-[fadeIn_0.5s_ease-out]">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {teamMembers.map(({ name, role, linkedin, photo }, i) => (
                <div key={i} className="relative p-4 rounded-xl bg-gray-800/90 border border-gray-700/50 backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:shadow-teal-400/50 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img src={photo} alt={name} className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl mx-auto object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white text-center mb-2 group-hover:text-teal-300 transition-colors duration-300">{name}</h4>
                  <p className="text-sm sm:text-base text-gray-300 text-center mb-3 font-light">{role}</p>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex justify-center items-center text-blue-400 hover:text-blue-300 transition-all duration-300 cursor-pointer">
                    <FaLinkedin size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Tailwind Keyframes */}
      <style>{`
        @keyframes slide {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes glimmer {
          0% { background-position: 0%; }
          100% { background-position: 600%; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;