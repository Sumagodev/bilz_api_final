const express = require('express');
const { loginUser } = require('../Controllers/User');
const authenticateToken = require('../middleware/auth');
const { validateLogin } = require('../Validations/loginvalidation.js');

const router = express.Router();

router.post('/login', validateLogin, loginUser);

module.exports = router;
