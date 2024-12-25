const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { body } = require('express-validator')

router.post('/register', authController.register)

module.exports = router