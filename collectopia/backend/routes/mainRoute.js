const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const { body } = require('express-validator')

router.get('/findUser/:userId', mainController.fetchUser)
router.get('/fetchMyItems', mainController.fetchMyItems)
router.get('/filterUserInventory/:userId', mainController.filterUserInventory)
router.get('/filterUserAuction/:userId', mainController.filterUserAuction)
router.get('/fetchLastAuctions', mainController.fetchLastAuctions)
router.get('/fetchAuctions', mainController.fetchAuctions)
router.get('/filterAuctions', mainController.filterAuctions)
router.get('/filterByMyInterest', mainController.filterByMyInterest)
router.get('/myTrackings', mainController.trackingAuctions)


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

router.post('/trackAuction/:auctionId', mainController.trackAuction)

router.post('/followUser/:userId', mainController.followUser)

// PATCHES

router.patch('/editItem/:itemId', [
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
], mainController.editItem)

// DELETES

router.delete('/deleteMyItem/:itemId', mainController.deleteMyItem)

module.exports = router