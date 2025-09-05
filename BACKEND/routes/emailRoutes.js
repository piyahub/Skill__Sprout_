const express = require('express');
const router = express.Router();
const { generateEmail, getUserEmails } = require('../controllers/emailController');
const {protect} = require('../middleware/authMiddleware'); // Assumes existing auth middleware

router.post('/generate', protect, generateEmail);
router.get('/my-emails', protect, getUserEmails);

module.exports = router;