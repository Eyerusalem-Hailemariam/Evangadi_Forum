const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/all-questions', authMiddleware, (req, res) => {
    res.json({ message: 'This is the questions route' });
});

module.exports = router;