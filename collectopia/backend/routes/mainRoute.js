const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const { body } = require('express-validator')

router.get('/findUser/:userId', mainController.fetchUser)



// 'Please enter a minimum value to bid!'



router.post('/createItem', [
  body("title")
    .notEmpty()
    .withMessage("Please enter a title!")
    .isLength({ min: 1 })
    .withMessage("Title should be at least 2 characters!"),
  body('minValue')
    .notEmpty()
    .withMessage({ field: 'minValue', message: 'Please enter a minimum value to bid!' }),
  body('buyout')
    .notEmpty()
    .withMessage('Please enter a minimum buyout value!'),
  body('lastDate')
    .notEmpty()
    .withMessage('Please choose a date!'),
  body('category')
    .notEmpty()
    .withMessage('Please choose a category!'),
  body('subcategory')
    .notEmpty()
    .withMessage('Please choose a subcategory!')
], mainController.createItem)

module.exports = router