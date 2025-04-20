const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addAnswer, getAllAnswerbyQuestionId} = require('../controller/answerController');


router.post('/add', authMiddleware, addAnswer);
router.get('/:questionid', authMiddleware, getAllAnswerbyQuestionId);

module.exports = router;