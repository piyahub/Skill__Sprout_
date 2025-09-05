// /backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, verifyOTP, login, getUser } = require('../controllers/authController');
const { registerValidationRules, loginValidationRules, otpValidationRules, validate } = require('../utils/validate');
const { fileUploadMiddleware, fileUploadErrorMiddleware, cloudinaryUploadMiddleware, protect } = require('../middleware/authMiddleware');

router.post(
  '/register',
  fileUploadMiddleware,
  fileUploadErrorMiddleware,
  cloudinaryUploadMiddleware, // Add this middleware
  registerValidationRules(),
  validate,
  register
);
router.post('/verify-otp', otpValidationRules(), validate, verifyOTP);
router.post('/login', loginValidationRules(), validate, login);
router.get('/user', protect, getUser);

module.exports = router;