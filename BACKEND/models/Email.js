const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  mobileNumber: { type: String },
  emailId: { type: String, required: true },
  jobRole: { type: String, required: true },
  companyName: { type: String, required: true },
  category: { type: String, required: true },
  experience: { type: Number, required: true },
  jobDescription: { type: String },
  tone: { type: String, required: true },
  length: { type: String, required: true },
  skills: { type: String },
  generatedEmail: { type: String, required: true },
  subject: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', emailSchema);