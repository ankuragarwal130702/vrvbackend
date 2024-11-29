const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController');
const { signupSchema, loginSchema } = require('../validations/authValidation');
const validateRequest = require('../middleware/validateRequest');

router.post('/signup', validateRequest(signupSchema), signup); // Sign-Up with validation
router.post('/login', validateRequest(loginSchema), login);     // Login with validation

module.exports = router;
