import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FiUser, FiMail, FiTarget, FiEdit3, FiTrendingUp, FiMessageSquare, FiCopy, FiCheck } from 'react-icons/fi';

const LinkedIn = () => {
  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI('AIzaSyDa8pPuFZWAdLnqxo5zPLUovzlju5fC9-s');// new api key using linkedin email amangupta email se
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // State for Profile Optimization Form
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    section: 'header',
    role: '',
    existingContent: '',
    industry: '',
    experience: '',
    skills: '',
  });
  const [profileResult, setProfileResult] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileCopied, setProfileCopied] = useState(false);

  // State for Post Generation Form
  const [postForm, setPostForm] = useState({
    achievement: '',
    description: '',
    source: '',
    postType: 'achievement',
    tone: 'professional',
    targetAudience: '',
    callToAction: '',
  });
  const [postResult, setPostResult] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState('');
  const [postCopied, setPostCopied] = useState(false);

  // Handle Profile Form Input Changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Post Form Input Changes
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  // Enhanced Profile Optimization Prompt
  const generateProfilePrompt = () => `
    You are a world-class LinkedIn strategist and personal branding expert with 15+ years of experience helping C-suite executives, entrepreneurs, and industry leaders build magnetic LinkedIn profiles that attract opportunities, partnerships, and career advancement.

    PROFILE DETAILS:
    - Name: ${profileForm.name}
    - Email: ${profileForm.email}
    - Target Role: ${profileForm.role}
    - Industry: ${profileForm.industry || 'Not specified'}
    - Experience Level: ${profileForm.experience || 'Not specified'}
    - Key Skills: ${profileForm.skills || 'Not specified'}
    - Section to Optimize: ${profileForm.section}
    - Current Content: ${profileForm.existingContent || 'Starting from scratch'}

    OPTIMIZATION MISSION:
    Create compelling, results-driven content for the ${profileForm.section} section that positions the user as a top-tier professional in their field. The content must be:

    1. MAGNETIC & MEMORABLE: Instantly grab attention and make the profile unforgettable
    2. KEYWORD-OPTIMIZED: Strategically incorporate industry-specific keywords for LinkedIn algorithm visibility
    3. STORY-DRIVEN: Use powerful storytelling techniques to create emotional connection
    4. RESULTS-FOCUSED: Highlight quantifiable achievements and unique value propositions
    5. AUTHENTIC: Maintain genuine voice while elevating professional presence

    SECTION-SPECIFIC REQUIREMENTS:

    ${profileForm.section === 'header' ? `
    HEADER OPTIMIZATION:
    - Create a punchy, memorable headline (max 220 characters)
    - Include target role, key expertise, and unique value proposition
    - Use power words that convey authority and expertise
    - Make it scannable with strategic use of symbols (|, •, →)
    - End with a compelling hook that makes people want to learn more
    ` : ''}

    ${profileForm.section === 'about' ? `
    ABOUT SECTION OPTIMIZATION:
    - Start with a powerful hook that addresses the target audience's pain points
    - Tell a compelling professional story with clear narrative arc
    - Include 3-5 key achievements with quantifiable results
    - Weave in personality and passion to create human connection
    - End with a clear call-to-action for connection/collaboration
    - Use strategic line breaks and emojis for visual appeal
    - Keep paragraphs short (2-3 sentences max)
    ` : ''}

    ${profileForm.section === 'experience' ? `
    EXPERIENCE OPTIMIZATION:
    - Lead with impact-driven bullet points showing quantifiable results
    - Use action verbs and power words (spearheaded, transformed, accelerated)
    - Include specific metrics, percentages, and dollar amounts where possible
    - Highlight leadership, innovation, and problem-solving capabilities
    - Connect achievements to broader business impact
    - Use industry-specific keywords naturally throughout
    ` : ''}

    ${profileForm.section === 'education' ? `
    EDUCATION OPTIMIZATION:
    - Highlight relevant coursework, projects, and achievements
    - Include GPA if impressive (3.5+), honors, and distinctions
    - Mention relevant extracurricular activities and leadership roles
    - Connect education to current career goals and expertise
    - Include any certifications, special programs, or notable professors
    ` : ''}

    ${profileForm.section === 'skills' ? `
    SKILLS OPTIMIZATION:
    - Prioritize skills most relevant to target role
    - Mix hard technical skills with valuable soft skills
    - Include emerging/trending skills in the industry
    - Ensure skills align with job descriptions in target field
    - Balance breadth with depth of expertise
    ` : ''}

    TONE & STYLE:
    - Professional yet approachable
    - Confident without being arrogant
    - Industry-appropriate language and terminology
    - Clear, concise, and scannable formatting
    - Strategic use of white space and formatting

    OUTPUT REQUIREMENTS:
    - Provide ONLY the optimized content for the selected section
    - Format for direct copy-paste into LinkedIn
    - No explanations, tips, or additional commentary
    - Use proper formatting (line breaks, spacing) for LinkedIn
    - Maximum impact in minimum words
    - Ready-to-use professional content

    Create content that makes recruiters stop scrolling and competitors take notes.
  `;

  // Enhanced Post Generation Prompt
  const generatePostPrompt = () => `
    You are a viral LinkedIn content creator and social media strategist who has generated millions of views and thousands of leads for executives, entrepreneurs, and thought leaders. Your posts consistently achieve high engagement rates and drive meaningful professional conversations.

    POST DETAILS:
    - Achievement/Topic: ${postForm.achievement || 'Not provided'}
    - Description/Context: ${postForm.description || 'Not provided'}
    - Source/Background: ${postForm.source || 'Not provided'}
    - Post Type: ${postForm.postType}
    - Desired Tone: ${postForm.tone}
    - Target Audience: ${postForm.targetAudience || 'Professional network'}
    - Call-to-Action Goal: ${postForm.callToAction || 'Engagement and discussion'}

    CONTENT CREATION MISSION:
    Create a high-engagement LinkedIn post that stops the scroll, sparks conversation, and positions the author as a thought leader in their field.

    POST TYPE SPECIFICATIONS:

    ${postForm.postType === 'achievement' ? `
    ACHIEVEMENT POST:
    - Start with a humble-brag hook that creates curiosity
    - Share the journey, not just the destination
    - Include specific challenges overcome and lessons learned
    - Highlight the impact on others (team, clients, company)
    - End with actionable insights others can apply
    ` : ''}

    ${postForm.postType === 'insight' ? `
    INSIGHT POST:
    - Open with a contrarian or surprising statement
    - Share a unique perspective or industry observation
    - Back up claims with personal experience or data
    - Provide actionable takeaways for the audience
    - Challenge conventional thinking respectfully
    ` : ''}

    ${postForm.postType === 'story' ? `
    STORY POST:
    - Use narrative structure with clear beginning, middle, end
    - Include emotional elements that create connection
    - Share vulnerable moments and authentic struggles
    - Connect personal experience to broader professional lessons
    - Make it relatable to your target audience's experiences
    ` : ''}

    ${postForm.postType === 'tips' ? `
    TIPS POST:
    - Lead with a compelling promise or benefit
    - Provide 3-5 actionable, specific tips
    - Use numbers and bullet points for scannability
    - Include personal examples or case studies
    - End with encouragement to implement immediately
    ` : ''}

    ENGAGEMENT OPTIMIZATION:
    - Hook: First line must stop the scroll (question, bold statement, surprising fact)
    - Structure: Use short paragraphs (1-2 sentences) with strategic line breaks
    - Emotion: Include elements that evoke curiosity, inspiration, or relatability
    - Value: Provide genuine insights that benefit the reader
    - Conversation: End with a question or call-to-action that invites comments

    TONE SPECIFICATIONS:
    ${postForm.tone === 'professional' ? '- Authoritative yet approachable, industry-focused language' : ''}
    ${postForm.tone === 'inspirational' ? '- Motivational and uplifting, focus on growth and possibility' : ''}
    ${postForm.tone === 'conversational' ? '- Friendly and relatable, like talking to a colleague over coffee' : ''}
    ${postForm.tone === 'thought-leadership' ? '- Visionary and insightful, challenging status quo with expertise' : ''}

    FORMATTING REQUIREMENTS:
    - 150-300 words optimal length
    - Strategic use of line breaks for readability
    - Include 3-5 relevant hashtags (research trending ones in the industry)
    - End with a compelling question or call-to-action
    - Use emojis sparingly and professionally (1-2 max)

    HASHTAG STRATEGY:
    - Mix popular industry hashtags with niche-specific ones
    - Include 1-2 broad hashtags (#Leadership, #Innovation)
    - Add 2-3 specific hashtags related to the content
    - Ensure hashtags align with target audience interests

    OUTPUT REQUIREMENTS:
    - Provide ONLY the complete LinkedIn post content
    - Format for direct copy-paste into LinkedIn
    - Include strategic spacing and line breaks
    - End with relevant hashtags
    - No explanations or additional commentary
    - Ready-to-publish professional content

    Create a post that generates meaningful engagement and positions the author as someone worth following.
  `;

  // Copy to clipboard function
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'profile') {
        setProfileCopied(true);
        setTimeout(() => setProfileCopied(false), 2000);
      } else {
        setPostCopied(true);
        setTimeout(() => setPostCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle Profile Form Submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');
    setProfileResult('');

    if (!profileForm.name || !profileForm.email || !profileForm.role) {
      setProfileError('Please fill in Name, Email, and Desired Role.');
      setProfileLoading(false);
      return;
    }

    try {
      const prompt = generateProfilePrompt();
      const result = await model.generateContent(prompt);
      const optimizedContent = result.response.text().trim();
      setProfileResult(optimizedContent);
    } catch (error) {
      setProfileError('Failed to optimize profile content. Please try again.');
      console.error('Profile optimization error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Post Form Submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    setPostError('');
    setPostResult('');

    if (!postForm.achievement && !postForm.description) {
      setPostError('Please provide at least an achievement or description.');
      setPostLoading(false);
      return;
    }

    try {
      const prompt = generatePostPrompt();
      const result = await model.generateContent(prompt);
      const postContent = result.response.text().trim();
      setPostResult(postContent);
    } catch (error) {
      setPostError('Failed to generate post content. Please try again.');
      console.error('Post generation error:', error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LinkedIn Optimization Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your LinkedIn presence with AI-powered content that attracts opportunities and builds your professional brand
            </p>
          </div>

          {/* Profile Optimization Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Profile Optimization
              </h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-200">
                    <FiUser className="w-4 h-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-200">
                    <FiMail className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-200">
                    <FiTarget className="w-4 h-4" />
                    <span>Target Role</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={profileForm.role}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Senior Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={profileForm.industry}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Technology, Healthcare, Finance..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Experience Level</label>
                  <select
                    name="experience"
                    value={profileForm.experience}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className='bg-gray-600 text-white'>Select Experience</option>
                    <option value="entry" className='bg-gray-600 text-white'>Entry Level (0-2 years)</option>
                    <option value="mid" className='bg-gray-600 text-white'>Mid Level (3-5 years)</option>
                    <option value="senior" className='bg-gray-600 text-white'>Senior Level (6-10 years)</option>
                    <option value="executive" className='bg-gray-600 text-white'>Executive (10+ years)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">LinkedIn Section</label>
                  <select
                    name="section"
                    value={profileForm.section}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="header" className='bg-gray-600 text-white'>Header/Headline</option>
                    <option value="about" className='bg-gray-600 text-white'>About Section</option>
                    <option value="experience" className='bg-gray-600 text-white'>Experience</option>
                    <option value="education" className='bg-gray-600 text-white'>Education</option>
                    <option value="skills" className='bg-gray-600 text-white'>Skills</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Key Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={profileForm.skills}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="JavaScript, React, Node.js, Leadership, Project Management..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-200">
                  <FiEdit3 className="w-4 h-4" />
                  <span>Current Content (Optional)</span>
                </label>
                <textarea
                  name="existingContent"
                  value={profileForm.existingContent}
                  onChange={handleProfileChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Paste your current LinkedIn content here to enhance it, or leave blank to create from scratch..."
                />
              </div>

              {profileError && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                  {profileError}
                </div>
              )}

              <button
                type="submit"
                disabled={profileLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {profileLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Optimizing Profile...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <FiTrendingUp className="w-5 h-5" />
                    <span>Optimize My Profile</span>
                  </span>
                )}
              </button>
            </form>

            {profileResult && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-400">✨ Optimized Content</h3>
                  <button
                    onClick={() => copyToClipboard(profileResult, 'profile')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  >
                    {profileCopied ? <FiCheck className="w-4 h-4 text-green-400" /> : <FiCopy className="w-4 h-4" />}
                    <span className="text-sm">{profileCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <pre className="text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{profileResult}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Post Generation Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <FiMessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Post Generation
              </h2>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Post Type</label>
                  <select
                    name="postType"
                    value={postForm.postType}
                    onChange={handlePostChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="achievement" className='bg-gray-600 text-white'>Achievement/Success Story</option>
                    <option value="insight" className='bg-gray-600 text-white'>Industry Insight</option>
                    <option value="story" className='bg-gray-600 text-white'>Personal Story</option>
                    <option value="tips" className='bg-gray-600 text-white'>Tips & Advice</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Tone</label>
                  <select
                    name="tone"
                    value={postForm.tone}
                    onChange={handlePostChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="professional " className='bg-gray-600 text-white'>Professional</option>
                    <option value="inspirational" className='bg-gray-600 text-white'>Inspirational</option>
                    <option value="conversational" className='bg-gray-600 text-white'>Conversational</option>
                    <option value="thought-leadership" className='bg-gray-600 text-white'>Thought Leadership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Achievement/Topic</label>
                <textarea
                  name="achievement"
                  value={postForm.achievement}
                  onChange={handlePostChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="e.g., Completed a major project that increased revenue by 30%..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Description/Context</label>
                <textarea
                  name="description"
                  value={postForm.description}
                  onChange={handlePostChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="e.g., The challenges faced, lessons learned, impact on team..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Source/Background</label>
                  <input
                    type="text"
                    name="source"
                    value={postForm.source}
                    onChange={handlePostChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Current job, side project, course..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Target Audience</label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={postForm.targetAudience}
                    onChange={handlePostChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Software developers, entrepreneurs..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Call-to-Action Goal</label>
                <input
                  type="text"
                  name="callToAction"
                  value={postForm.callToAction}
                  onChange={handlePostChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Start a discussion, share experiences, connect..."
                />
              </div>

              {postError && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
                  {postError}
                </div>
              )}

              <button
                type="submit"
                disabled={postLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {postLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Post...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <FiMessageSquare className="w-5 h-5" />
                    <span>Generate Viral Post</span>
                  </span>
                )}
              </button>
            </form>

            {postResult && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-purple-400">🚀 Generated Post</h3>
                  <button
                    onClick={() => copyToClipboard(postResult, 'post')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  >
                    {postCopied ? <FiCheck className="w-4 h-4 text-green-400" /> : <FiCopy className="w-4 h-4" />}
                    <span className="text-sm">{postCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <pre className="text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">{postResult}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedIn;