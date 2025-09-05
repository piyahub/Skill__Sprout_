const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { togglePinQuestion, updateQuestionNote, addQuestionsToSession} = require('../controllers/questionController');

const router = express.Router();
router.post('/add',protect, addQuestionsToSession);
router.post('/:id/toggle-pin', protect, togglePinQuestion);
router.post('/:id/note',protect, updateQuestionNote);

module.exports = router;
