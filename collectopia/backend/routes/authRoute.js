const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { body } = require('express-validator')

router.post('/register', [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('surname')
    .notEmpty()
    .withMessage('Surname is required')
    .isLength({ min: 1 })
    .withMessage('Surname must be at least 2 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 1 })
    .withMessage('Email must be at least 2 characters long')
    .isEmail()
    .withMessage('Please provide a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('interests')
    .notEmpty()
    .withMessage('Password is required')
], authController.register)

router.post('/login', [
  body('email')
    .notEmpty()
    .withMessage('Please enter an Email.')
    .isLength({ min: 3 })
    .withMessage('Email can not be this short.')
    .isEmail()
    .withMessage('Please enter a valid Email.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
], authController.login)

module.exports = router