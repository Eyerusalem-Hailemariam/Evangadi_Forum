const express = require('express');
const router = express.Router();
//user controller
const { register, login, checkUser } = require('../controller/userController');

//register route;
router.post('/register', register);
router.post('/login', login);
//check user
router.get('check', checkUser);

module.exports = router; // export the router