// /backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const { generateInterviewQuestions, generateConceptExplanation } = require('./controllers/aiController');
const { protect } = require('./middleware/authMiddleware');
const emailRoutes = require('./routes/emailRoutes'); // Add this
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation );
app.use('/api/emails', emailRoutes); // Add this

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.use('/', (req,res)=>{
    res.send("Welcome to SkilLSprout Backend");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// require("dotenv").config(); // make sure this is there at the top

console.log("Loaded email:", process.env.EMAIL_USER);
