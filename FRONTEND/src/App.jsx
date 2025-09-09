import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
// import Contact from './Components/Contact';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import InterviewPrep from './Components/InterviewPrep';
import CareerPath from './Components/Carrerpath';
// import EmailGenerator from './Components/EmailGenerator';
// import ResumeEmbed from './Components/ResumeEmbed';
import Footer from './Components/Footer';
import JobOpportunitiesAnalyzer from './Components/JobOpportunitiesAnalyzer';
// import LinkedIn from './Components/LinkedIn';
// import SkillAnalyzer from './Components/SkillAnalyzer';
import About from './Components/About';
import Assesment from './Components/Assesment';

// Layout component to include Navbar and Footer
const LayoutWithFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Layout component with only Navbar (no Footer)
const LayoutWithoutFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Footer */}
        <Route path="/" element={<LayoutWithFooter><Home /></LayoutWithFooter>} />
        <Route path="/login" element={<LayoutWithFooter><Login /></LayoutWithFooter>} />
        <Route path="/register" element={<LayoutWithFooter><Register /></LayoutWithFooter>} />
{/*         <Route path="/contact" element={<LayoutWithFooter><Contact /></LayoutWithFooter>} /> */}
{/*         <Route path="/skillanalyzer" element={<LayoutWithFooter><SkillAnalyzer /></LayoutWithFooter>} /> */}
        <Route path="/carreranalyzer" element={<LayoutWithFooter><JobOpportunitiesAnalyzer /></LayoutWithFooter>} />
        <Route path="/dashboard" element={<LayoutWithFooter><Dashboard /></LayoutWithFooter>} />

        {/* Routes without Footer */}
        <Route path="/interview-prep" element={<LayoutWithoutFooter><InterviewPrep /></LayoutWithoutFooter>} />
        <Route path="/career" element={<LayoutWithoutFooter><CareerPath /></LayoutWithoutFooter>} />
{/*         <Route path="/email" element={<LayoutWithoutFooter><EmailGenerator /></LayoutWithoutFooter>} /> */}
{/*         <Route path="/resume" element={<LayoutWithoutFooter><ResumeEmbed /></LayoutWithoutFooter>} /> */}
{/*         <Route path="/linkedin" element={<LayoutWithoutFooter><LinkedIn /></LayoutWithoutFooter>} /> */}
        <Route path="/about" element={<LayoutWithoutFooter><About /></LayoutWithoutFooter>} />
        <Route path="/assesment" element={<LayoutWithoutFooter><Assesment /></LayoutWithoutFooter>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
