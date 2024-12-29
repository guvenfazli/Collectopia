const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const { body } = require('express-validator')

router.get('/findUser/:userId', mainController.fetchUser)
router.get('/fetchMyItems', mainController.fetchMyItems)




// POSTS

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
  body('tagList')
    .isLength({ min: 1 })
    .notEmpty()
    .withMessage('Please at least add 1 tag for your item!'),
  body('category')
    .notEmpty()
    .withMessage('Please choose a category!'),
  body('subcategory')
    .notEmpty()
    .withMessage('Please choose a subcategory!')
], mainController.createItem)

router.post('/createAuction', [
  body("minValue")
    .notEmpty()
    .withMessage("Please enter a minimum value!"),
  body('buyout')
    .notEmpty()
    .withMessage("Please enter a buyout value!"),
  body('deadline')
    .notEmpty()
    .withMessage('Please choose a date!'),
], mainController.createAuction)

module.exports = router