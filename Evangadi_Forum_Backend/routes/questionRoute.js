//routes/questionRoute.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addQuestion, getAllQuestion, getQuestionById} = require('../controller/questionController');


router.get('/all-questions', authMiddleware, getAllQuestion);
router.post('/ask', authMiddleware, addQuestion);
router.get('/:id', authMiddleware, getQuestionById)

module.exports = router;