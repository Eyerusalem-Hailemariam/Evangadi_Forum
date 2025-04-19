const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addQuestion, getAllQuestion } = require('../controller/questionController');


router.get('/all-questions', authMiddleware, getAllQuestion);
router.post('/ask', authMiddleware, addQuestion);

module.exports = router;