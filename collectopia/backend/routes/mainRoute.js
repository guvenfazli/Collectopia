const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')
const { authCheck } = require('../utils/authCheck')
const { body } = require('express-validator')

router.get('/findUser/:userId', authCheck, mainController.fetchUser)
router.get('/fetchMyItems', authCheck, mainController.fetchMyItems)
router.get('/filterUserInventory/:userId', authCheck, mainController.filterUserInventory)
router.get('/filterUserAuction/:userId', authCheck, mainController.filterUserAuction)
router.get('/fetchLastAuctions', authCheck, mainController.fetchLastAuctions)
router.get('/fetchAuctions', authCheck, mainController.fetchAuctions)
router.get('/filterAuctions', authCheck, mainController.filterAuctions)
router.get('/filterByMyInterest', authCheck, mainController.filterByMyInterest)
router.get('/myTrackingList', authCheck, mainController.trackingAuctions)
router.get('/myActiveAuctionListing', authCheck, mainController.myActiveAuctions)
router.get('/fetchAuction/:auctionId', authCheck, mainController.fetchSingleAuction)
router.get('/inbox', authCheck, mainController.fetchMyInbox)
router.get('/notifications', authCheck, mainController.fetchMyNotifications)
router.get('/fetchUserHistory', authCheck, mainController.fetchMyHistory)
router.get('/fetchMyItemsForOffer', authCheck, mainController.fetchMyItemsForOffer)
router.get('/fetchOfferList', authCheck, mainController.fetchOffers)




// LIVE CHAT
router.get('/updateBids/:auctionId', authCheck, mainController.updateBids)
router.get('/updateMessages/:auctionId', authCheck, mainController.updateMessages)



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
], authCheck, mainController.createItem)

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
], authCheck, mainController.createAuction)

router.post('/trackAuction/:auctionId', authCheck, mainController.trackAuction)

router.post('/followUser/:userId', authCheck, mainController.followUser)

router.post('/bidAuction/:auctionId', [
  body("bid")
    .notEmpty()
    .withMessage("Please enter a value!"),
], authCheck, mainController.bidAuction)

router.post('/buyoutAuction/:auctionId', authCheck, mainController.buyoutAuction)
router.post('/sendMessage/:auctionId', authCheck, mainController.sendMessage)
router.post('/sendMessageToUsersInbox/:userId', [
  body("title")
    .notEmpty()
    .withMessage("Please enter a valid title!")
    .isLength({ min: 1 })
    .withMessage("Title must be minimum 1 character!"),
  body("message")
    .notEmpty()
    .withMessage("Please enter a valid message!")
    .isLength({ min: 5 })
    .withMessage("Message must be minimum 5 character!"),
], authCheck, mainController.sendMessageToUsersInbox)

router.post('/makeOffer/:receiverId', authCheck, mainController.makeOffer)

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
], authCheck, mainController.editItem)

router.patch('/selectOption/:offerId', authCheck, mainController.selectOption)
router.patch('/readMessage/:msgId', authCheck, mainController.readMessage)

// DELETES

router.delete('/deleteMyItem/:itemId', authCheck, mainController.deleteMyItem)

module.exports = router