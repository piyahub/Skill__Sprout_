<h1 align="center" style="color:#4CAF50; font-size: 40px;">🌟 Your AI-Powered Career Companion 🌟</h1>
<h3 align="center" style="color:gray;">Empowering Your Career Journey with AI-Driven Guidance</h3>

<p align="center" style="font-size: 16px;">
Your AI-Powered Career Companion is a full-stack MERN web application leveraging the Gemini API to provide personalized career guidance, resume building, professional email drafting, and job opportunity analysis.
</p>
<li><a href="https://mindstep.netlify.app/">LIVE DEMO</a></li>

<hr>

<h2>📚 Table of Contents</h2>

<ul>
  <li><a href="#about">About the Project</a></li>
  <li><a href="#structure">Folder & File Structure</a></li>
  <li><a href="#tech">Tech Stack</a></li>
  <li><a href="#dependencies">All Dependencies</a></li>
  <li><a href="#setup">How to Use This Project</a></li>
  <li><a href="#features">Key Features</a></li>
  <li><a href="#enhancements">Future Enhancements</a></li>
  <li><a href="#contact">Contact Me</a></li>
  <li><a href="#creator">Created By</a></li>
  <li><a href="#screenshots">Preview</a></li>
</ul>

<hr>

<h2 id="about">🧭 About the Project</h2>

<p>
Your AI-Powered Career Companion is designed to empower job seekers and professionals with AI-driven tools for career advancement. Powered by the Gemini API, it offers personalized career path recommendations, smart resume generation, and professional email drafting, all within an intuitive MERN stack platform.
</p>

<ul>
  <li>Personalized career path recommendations based on interests, skills, and goals</li>
  <li>Smart resume creation with customizable templates</li>
  <li>AI-powered email drafting for job applications and follow-ups</li>
  <li>Real-time job market with advanced filtering options</li>
  <li>User participate in online quiz or in Exam mode</li>
</ul>

<hr>

<h2 id="structure">🗂️ Folder & File Structure</h2>

<pre>
AI_PROJECT/
├── BACKEND/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   ├── emailController.js
│   │   ├── questionController.js
│   │   ├── sessionController.js
│   │   ├── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── Email.js
│   │   ├── Question.js
│   │   ├── Session.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── emailRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── sessionRoutes.js
│   ├── tmp/
│   │   └── (user images, etc.)
│   ├── utils/
│   │   ├── emailPrompt.js
│   │   ├── otpGenerator.js
│   │   ├── prompt.js
│   │   ├── sendEmail.js
│   │   ├── validate.js
├── FRONTEND/
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── netlify.toml
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       ├── app.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── Components/
│       │   ├── CarrerPath.jsx
│       │   ├── Contact.jsx
│       │   ├── Assesment.jsx
│       │   ├── Dashboard.jsx
│       │   ├── EmailGenerator.jsx
│       │   ├── Footer.jsx
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── InterviewPrep.jsx
│       │   ├── JobOpportunitiesAnalyzer.jsx
│       │   ├── Navbar.jsx
│       │   ├── Login.jsx
│       │   ├── OpportunitiesChart.jsx
│       │   ├── OpportunitiesForm.jsx
│       │   ├── OpportunitiesCard.jsx
│       │   ├── PricingChart.jsx
│       │   ├── Register.jsx
│       │   ├── ResumeEmbed.jsx
|       |   ├── Linkedin.jsx
|       |   ├── SkilllAnalyzer.jsx
│       ├── services/
│       │   ├── geminiService.js
│       └── Styles/
│           ├── CarrerPath.css
│           ├── Home.css
</pre>

<hr>

<h2 id="tech">🧰 Tech Stack</h2>

<table>
  <tr><th>Part</th><th>Technology</th></tr>
  <tr><td>Frontend</td><td>React, Vite, Tailwind CSS</td></tr>
  <tr><td>Backend</td><td>Node.js, Express.js, MongoDB</td></tr>
  <tr><td>AI Integration</td><td>Gemini API</td></tr>
  <tr><td>Deployment</td><td>Netlify (Frontend), Render (Backend)</td></tr>
</table>

<hr>

<h2 id="dependencies">📦 All Dependencies</h2>

<h3>🔧 Backend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@google/genai</td><td>^1.10.0</td></tr>
<tr><td>@google/generative-ai</td><td>^0.24.1</td></tr>
<tr><td>bcrypt</td><td>^6.0.0</td></tr>
<tr><td>bcryptjs</td><td>^3.0.2</td></tr>
<tr><td>body-parser</td><td>^2.2.0</td></tr>
<tr><td>child_process</td><td>^1.0.2</td></tr>
<tr><td>cloudinary</td><td>^2.7.0</td></tr>
<tr><td>cors</td><td>^2.8.5</td></tr>
<tr><td>dotenv</td><td>^17.2.0</td></tr>
<tr><td>express</td><td>^5.1.0</td></tr>
<tr><td>express-fileupload</td><td>^1.5.2</td></tr>
<tr><td>express-openid-connect</td><td>^2.18.1</td></tr>
<tr><td>express-validator</td><td>^7.2.1</td></tr>
<tr><td>joi</td><td>^17.13.3</td></tr>
<tr><td>jsonwebtoken</td><td>^9.0.2</td></tr>
<tr><td>mongoose</td><td>^8.16.4</td></tr>
<tr><td>multer</td><td>^2.0.2</td></tr>
<tr><td>nodemailer</td><td>^7.0.5</td></tr>
<tr><td>nodemon</td><td>^3.1.10</td></tr>
<tr><td>sanitize-html</td><td>^2.17.0</td></tr>
<tr><td>util</td><td>^0.12.5</td></tr>
</table>

<h3>🎨 Frontend</h3>

<table>
<tr><th>Package</th><th>Version</th></tr>
<tr><td>@google/generative-ai</td><td>^0.24.1</td></tr>
<tr><td>@tailwindcss/vite</td><td>^4.1.11</td></tr>
<tr><td>axios</td><td>^1.10.0</td></tr>
<tr><td>chart.js</td><td>^4.5.0</td></tr>
<tr><td>date-fns</td><td>^4.1.0</td></tr>
<tr><td>lucide-react</td><td>^0.525.0</td></tr>
<tr><td>react</td><td>^19.1.0</td></tr>
<tr><td>react-chartjs-2</td><td>^5.3.0</td></tr>
<tr><td>react-dom</td><td>^19.1.0</td></tr>
<tr><td>react-hook-form</td><td>^7.60.0</td></tr>
<tr><td>react-icons</td><td>^5.5.0</td></tr>
<tr><td>react-intersection-observer</td><td>^9.16.0</td></tr>
<tr><td>react-markdown</td><td>^10.1.0</td></tr>
<tr><td>react-router-dom</td><td>^7.7.0</td></tr>
<tr><td>react-to-print</td><td>^3.1.1</td></tr>
<tr><td>recharts</td><td>^3.1.0</td></tr>
<tr><td>remark-gfm</td><td>^4.0.1</td></tr>
<tr><td>tailwindcss</td><td>^4.1.11</td></tr>
<tr><td>uuid</td><td>^11.1.0</td></tr>
<tr><td>gsap</td><td>^3.13.0</td></tr>
<tr><td>@mui/material</td><td>^7.2.0</td></tr>
<tr><td>@emotion/react</td><td>^11.14.0</td></tr>
<tr><td>@emotion/styled</td><td>^11.14.1</td></tr>
</table>


<hr>

<h2 id="setup">⚙️ How to Use This Project</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18 or higher)</li>
  <li>MongoDB (local or cloud instance)</li>
  <li>Gemini API key</li>
  <li>Cloudinary account for image uploads</li>
  <li>Email service credentials (e.g., Nodemailer)</li>
</ul>

<h3>🧩 Backend</h3>

```bash
cd BACKEND
npm install
# Create a .env file with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-jwt-secret>
# GEMINI_API_KEY=<your-gemini-api-key>
# CLOUDINARY_URL=<your-cloudinary-url>
# NODEMAILER_EMAIL=<your-email-service-email>
# NODEMAILER_PASS=<your-email-service-password>
npm run dev

🎨 Frontend

cd FRONTEND
npm install
# Create a .env file with:
# VITE_API_URL=<your-backend-api-url>
# VITE_GEMINI_API_KEY=<your-gemini-api-key>
npm run dev

🌐 Open Your Browser

http://localhost:5173

The backend typically runs on http://localhost:5000 (configurable in server.js).
```



<hr> 
<h2 id="features">✨ Key Features</h2>
 <ul>
  <li>🎯 Career Path Recommendation: Personalized suggestions based on interests, skills, and goals</li>
   <li>📝 Smart Resume Builder: Customizable templates for professional resumes</li>
    <li>📬 AI-Powered Email Generator: Craft job outreach and follow-up emails using Gemini API</li>
     <li>📊 Market Insights: Gain valuable insights into job market trends and opportunities</li>
      <li>🤝 Interview Prep: Prepare effectively for interviews with AI-powered guidance</li>
      <li>🤝 Linkedin Optemizer: Prepare your linkedin effectively for selecting with AI-powered guidance</li>
      <li>📝 Online Assessment: Take skill-based tests anytime, or try the <strong>Mock Exam Mode</strong> for a real exam-like experience.</li>

  </ul> 
        <hr> 
        <h2 id="enhancements">🚀 Future Enhancements</h2>
         <ul>
          <li>📱 Launch Android/iOS app</li>
           <li>🤖 Advanced AI features for enhanced interview preparation</li> 
           <li>🌍 Multilingual support for global accessibility</li> 
           <li>🔗 Blockchain traceability</li>
            </ul> 
            <hr> 
            <h2 id="contact">📬 Contact Me</h2>
             <ul>
              <li><strong>Name:</strong> Aman Gupta</li>
               <li><strong>Email:</strong>  <a href="ag0567688@gmail.com">Send me an email</a> </li>
                <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/amangupta9454">LINKEDIN</a></li>
                 <li><strong>GitHub:</strong> <a href="https://github.com/amangupta9454">GITHUB</a></li>
                 <li><strong>Portfolio:</strong> <a href="https://guptaaman.netlify.app/">PORTFOLIO</a></li>
                  </ul> 
                  <hr>
                   <h2 id="creator">👨‍💻 Created By</h2> 
                   <p><strong>Aman Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about building AI-driven solutions to empower career growth 🚀</p>
                   <p><strong>Himanshu Gupta</strong><br>B.Tech 3rd year Student | HIET Ghaziabad<br>Passionate about building AI-driven solutions to empower career growth 🚀</p>
                    <p align="center">⭐ If you found this project helpful, give it a star!</p>

<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 id="screenshots" style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">📸 Screenshots</h2>
    <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
        Explore the interface of Your AI-Powered Career Companion through the screenshots below, showcasing key features like the Home Page, Resume Builder, and Email Generator.
    </p>
    <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Home Page</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753290343/Screenshot_2025-07-21_103925_atbp20.png" alt="Home Page" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Career Path</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753290328/Screenshot_2025-07-23_223401_vqe4ou.png" alt="Resume Builder" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Market Insights</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753290425/Screenshot_2025-07-23_223648_xv229a.png" alt="Email Generator" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Resume Builder</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1753290885/Screenshot_2025-07-23_224324_zze1oh.png" alt="Email Generator" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Online Assesment</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1754278521/Screenshot_2025-08-04_090309_p20q1t.png" alt="Email Generator" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
        <div style="flex: 1 1 280px; background-color: #fff; padding: 15px; text-align: center; border: 1px solid #ddd;">
            <h3 style="color: #333; font-size: 20px; font-weight: bold; margin: 0 0 10px;">Skill Gap Analyzer</h3>
            <img src="https://res.cloudinary.com/dgtyqhtor/image/upload/v1754278522/Screenshot_2025-08-04_090459_cscttm.png" alt="Email Generator" style="max-width: 100%; height: auto; border: 1px solid #ddd;">
        </div>
    </div>
</div>

<hr>

