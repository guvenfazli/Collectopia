const { ObjectId } = require('mongodb')
const path = require('path')
const fs = require('fs')
const { validationResult } = require('express-validator')
const { throwError } = require('../utils/throwError')
const dayjs = require('dayjs')

// MODELS
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const Auction = require('../models/auctionModel')
const Bid = require('../models/bidModel')
const AuctionBid = require('../models/auctionBidModel')
const MessageRoom = require('../models/messageRoomModel')
const PrivateMessage = require('../models/privateMessageModel')
const Offer = require('../models/offerModel')

// ITEM CREATION
exports.createItem = async (req, res, next) => {
  const { title, minValue, buyout, tagList, category, subcategory } = req.body
  const convertedMinValue = +minValue
  const convertedBuyout = +buyout
  const convertedTagList = JSON.parse(tagList)
  const errors = validationResult(req)

  const ownerId = req.session.userInfo.id

  const fileList = req.files

  try {
    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    } else if (req.files.length === 0) {
      throwError('Please choose at least 1 image!', 410)
    }

    if (isNaN(convertedBuyout) || isNaN(convertedMinValue)) {
      throwError('Please enter a numeric value!', 410)
    }

    if (convertedMinValue >= convertedBuyout) {
      throwError('Minimum Value can not be higher than buyout value!', 410)
    }

    const newItem = new Item({
      title,
      minValue: convertedMinValue,
      buyout: convertedBuyout,
      tagList: convertedTagList,
      category,
      subCategory: subcategory,
      owner: ownerId,
    })

    for (const image of fileList) {
      newItem.imageList.push(image.path)
    }


    await newItem.save()

    const owner = await User.findById(ownerId)
    owner.items.push(newItem)
    await owner.save()

    return res.status(201).json({ message: 'Item added to inventory successfully!' })

  } catch (err) {
    next(err)
  }
}

exports.editItem = async (req, res, next) => {
  const { title, minValue, buyout, tagList } = req.body
  const convertedMinValue = +minValue
  const convertedBuyout = +buyout
  const parsedTagList = JSON.parse(tagList)

  const userId = req.session.userInfo.id
  const editedItemId = req.params.itemId


  try {
    const foundItem = await Item.findOne({ _id: editedItemId })

    if (!foundItem) {
      throwError('Item could not found!', 404)
    }

    if (JSON.stringify(foundItem.owner._id) !== JSON.stringify(userId)) {
      throwError('Only the owner of the item can make changes', 410)
    }

    if (isNaN(convertedMinValue) || isNaN(convertedBuyout)) {
      throwError('Please enter a numeric value!', 410)
    }

    foundItem.title = title
    foundItem.minValue = convertedMinValue
    foundItem.buyout = convertedBuyout
    foundItem.tagList = parsedTagList

    await foundItem.save()

    return res.status(200).json({ message: 'Changes have been saved.' })

  } catch (err) {
    next(err)
  }

}

// USERS PROFILE
exports.fetchUser = async (req, res, next) => {
  const userId = req.params.userId

  try {
    const foundUser = await User.findById(userId).select({ name: 1, surname: 1, interests: 1, createdAt: 1, _id: 1, items: 1, auctions: 1, followers: 1 }).populate({ path: 'items', select: { title: 1, minValue: 1, buyout: 1, category: 1, subCategory: 1, imageList: 1, createdAt: 1, tagList: 1, owner: 1, isListed: 1 } }).populate({ path: 'auctions', select: { _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, isSold: 1 }, populate: { path: 'item' } })

    if (foundUser.length === 0) {
      throwError('User could not found!', 404)
    }

    return res.status(200).json({ foundUser: foundUser })

  } catch (err) {
    next(err)
  }
}

exports.fetchMyItems = async (req, res, next) => { // Fetching items in order to create a listing.
  const userId = req.session.userInfo.id

  try {
    const foundItems = await Item.find({ owner: userId, isListed: false }).select({ title: 1, minValue: 1, buyout: 1, category: 1, subCategory: 1, imageList: 1, createdAt: 1, tagList: 1 })

    if (foundItems.length === 0) {
      throwError('You have no items', 404)
    }

    return res.status(200).json({ foundItems })

  } catch (err) {
    next(err)
  }
}

exports.deleteMyItem = async (req, res, next) => {
  const itemId = req.params.itemId
  const today = dayjs(new Date()).startOf("day")
  const tomorrow = today.add(1, 'day').unix()

  try {

    const foundItem = await Item.findOne({ _id: itemId })
    const owner = await User.findById(foundItem.owner)
    const itemIndex = owner.items.findIndex((item) => item === foundItem)


    if (foundItem.isListed) {
      const activeAuction = await Auction.findOne({ item: foundItem._id })
      if (!activeAuction) {
        throwError('This item does not exist!', 404)
      }

      const isDeadlineTomorrow = activeAuction.deadline === tomorrow

      if (isDeadlineTomorrow) {
        throwError('There are less then 24 hours, it can not be deleted!', 410)
      }

      await activeAuction.deleteOne()
      await foundItem.deleteOne()
      owner.items.splice(itemIndex, 1)
      await owner.save()

      for (const img of foundItem.imageList) {
        try {
          fs.unlink(path.join(__dirname, '..', img), (err) => {
            console.log(err)
          })
        } catch (err) {
          next(err)
        }
      }
      return res.status(200).json({ message: 'Item and Its Auction Deleted Successfully' })

    }


    for (const img of foundItem.imageList) {
      try {
        fs.unlink(path.join(__dirname, '..', img), (err) => {
          console.log(err)
        })
      } catch (err) {
        next(err)
      }
    }

    await foundItem.deleteOne()
    owner.items.splice(itemIndex, 1)
    await owner.save()
    return res.status(201).json({ message: 'Item deleted successfully.' })

  } catch (err) {
    next(err)
  }
}

exports.filterUserInventory = async (req, res, next) => {
  const userId = req.params.userId
  const tagFilterList = req.query.filters
  const convertedTagList = JSON.parse(tagFilterList)

  try {
    const itemList = await Item.find({
      tagList: {
        $in: convertedTagList
      }
    }, { owner: userId }).select({ title: 1, minValue: 1, buyout: 1, category: 1, subCategory: 1, imageList: 1, createdAt: 1, tagList: 1 })

    return res.status(201).json({ filteredItems: itemList })

  } catch (err) {
    next(err)
  }
}

exports.filterUserAuction = async (req, res, next) => {
  const userId = req.params.userId
  const tagFilterList = req.query.filters
  const convertedTagList = JSON.parse(tagFilterList)

  try {

    const filteredAuctions = await Auction.find({ auctionTag: { $in: convertedTagList } }, { seller: userId }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })

    if (filteredAuctions.length === 0) {
      throwError('User has not listed any auctions with this tag!', 410)
    }

    return res.status(201).json({ filteredAuctions: filteredAuctions })

  } catch (err) {
    next(err)
  }
}


// AUCTIONS

exports.createAuction = async (req, res, next) => {
  const { itemId, minValue, buyout, deadline, auctionTag } = req.body
  const convertedMinValue = +minValue
  const convertedBuyout = +buyout
  const covertedDeadline = +deadline
  const parsedTagList = JSON.parse(auctionTag)
  const userId = req.session.userInfo.id
  const errors = validationResult(req)
  const todaysDate = dayjs(new Date()).startOf("day").unix()


  try {
    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    } else if (isNaN(convertedBuyout) || isNaN(convertedMinValue)) {
      throwError('Please enter a numeric value!', 410)
    } else if (convertedMinValue >= convertedBuyout) {
      throwError('Minimum Value can not be higher than buyout value!', 410)
    } else if (covertedDeadline <= todaysDate) {
      throwError('Minimum 24 hours difference required!', 410)
    }

    const alreadyListed = await Auction.findOne({ item: itemId })

    if (alreadyListed) {
      throwError('This item is already listed', 410)
    }

    const createdAuction = new Auction({
      item: itemId,
      seller: userId,
      minValue: convertedMinValue,
      buyout: convertedBuyout,
      auctionTag: parsedTagList,
      deadline: covertedDeadline
    })

    await createdAuction.save()


    const foundUser = await User.findById(userId)
    foundUser.auctions.push(createdAuction)
    foundUser.eventHistory.push({ event: "Created an Auction", interactionId: createdAuction })
    await foundUser.save()

    const foundOriginalItem = await Item.findById(itemId)
    foundOriginalItem.minValue = convertedMinValue
    foundOriginalItem.buyout = convertedBuyout
    foundOriginalItem.isListed = true
    await foundOriginalItem.save()



    return res.status(201).json({ message: "Auction created successfully!" })

  } catch (err) {
    next(err)
  }
}



exports.fetchLastAuctions = async (req, res, next) => {
  const todaysDate = new Date()
  const tomorrowsDate = new Date()
  const tomorrowsDateFixes = tomorrowsDate.setDate(todaysDate.getDate() + 1)

  try {
    const fetchedAuctions = await Auction.find({ isSold: false }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })
    const filteredAuctions = fetchedAuctions.filter((itm) => itm.createdAt.getDay() === todaysDate.getDay() && itm.createdAt < new Date(tomorrowsDateFixes))

    if (filteredAuctions.length === 0) {
      throwError('There is no auction created in last 24 hours!', 404)
    }

    return res.status(200).json({ fetchedLastAuctions: filteredAuctions })

  } catch (err) {
    next(err)
  }
}

exports.fetchAuctions = async (req, res, next) => {
  const todaysDate = new Date()
  const todaysTimestamp = dayjs(todaysDate).unix()
  const page = req.query.page
  const limit = 3

  try {
    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp }, isSold: false }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, }).skip(page * limit).limit(limit)

    if (fetchedAuctions.length === 0) {
      throwError('There is no active listing.', 404)
    }

    return res.status(200).json({ fetchedAuctions: fetchedAuctions })

  } catch (err) {
    next(err)
  }
}

exports.filterAuctions = async (req, res, next) => {
  const todaysTimestamp = dayjs(new Date()).unix()
  const category = req.query.category
  const subCategory = req.query.subCategory
  const deadline = +req.query.deadline
  const myInterests = req.session.userInfo.interests

  try {
    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp }, isSold: false }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })



    const filteredAuctions = fetchedAuctions.filter((auction) => {
      if (
        (category === "undefined" || auction.item.category === category) &&
        (subCategory === "undefined" || auction.item.subCategory === subCategory) &&
        (deadline === 0 || auction.deadline === deadline)) {
        return auction
      }
    })

    if (filteredAuctions.length === 0) {
      throwError('There is no auction with these settings! Please clear the filters to see all the auctions.', 404)
    }

    return res.status(200).json({ filteredAuctions: filteredAuctions })

  } catch (err) {
    next(err)
  }
}

exports.filterByMyInterest = async (req, res, next) => {
  const todaysTimestamp = dayjs(new Date()).unix()
  const myInterests = req.session.userInfo.interests

  try {

    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp }, isSold: false }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })

    // Wanted to filter it by pure JS, thats why did not use aggregate function by mongoose.

    const interestedAuctions = []

    fetchedAuctions.filter((auction) => {
      myInterests.forEach((interest) => {
        if (interest === auction.item.category) {
          interestedAuctions.push(auction)
        }
      })
    })

    if (interestedAuctions.length === 0) {
      throwError('There is no auction with your interests at the moment! Please try again later.', 404)
    }

    return res.status(200).json({ filteredAuctions: interestedAuctions })

  } catch (err) {
    next(err)
  }
}

exports.fetchSingleAuction = async (req, res, next) => {
  const auctionId = req.params.auctionId

  try {
    const foundAuction = await Auction.findById(auctionId).populate({ path: "item", populate: { path: "owner", select: { _id: 1, name: 1, surname: 1 } } }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, bidList: 1, isSold: 1, messages: 1 }).populate({ path: "bidList", select: { _id: 1, bidValue: 1, bidder: 1, createdAt: 1 }, populate: { path: "bidder", select: { name: 1, surname: 1 } } })

    const messageRoomOfAuction = await MessageRoom.findOne({ auctionRoom: auctionId }).populate({ path: "messages", populate: { path: "sender", select: { name: 1, _id: 1 } } })

    const bidList = await AuctionBid.findOne({ auctionId: auctionId }).populate({ path: "bidList", select: { _id: 1, bidValue: 1, bidder: 1, createdAt: 1 }, populate: { path: "bidder", select: { name: 1, surname: 1 } } })

    if (!foundAuction) {
      throwError('Auction could not found!', 404)
    }

    return res.status(200).json({ fetchedAuction: foundAuction, fetchedMessages: messageRoomOfAuction ? messageRoomOfAuction : [], fetchedBidlist: bidList ? bidList : [] })
  } catch (err) {
    next(err)
  }
}

exports.bidAuction = async (req, res, next) => {
  const { bid } = req.body
  const convertedBid = +bid
  const auctionId = req.params.auctionId
  const userId = req.session.userInfo.id
  const todaysTimestamp = dayjs(new Date()).startOf("day").unix()
  const errors = validationResult(req)

  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    }


    const foundAuction = await Auction.findById(auctionId).populate({ path: "bidList" }).populate({ path: "seller" })
    const BidList = await AuctionBid.findOne({ auctionId: auctionId }).populate({ path: "bidList", select: { _id: 1, bidValue: 1, bidder: 1, createdAt: 1 }, populate: { path: "bidder", select: { name: 1, surname: 1 } } })

    if (foundAuction.isSold) {
      throwError('Auction is already closed!', 410)
    } else if (foundAuction.deadline < todaysTimestamp) {
      throwError('Auction met the deadline!', 410)
    } else if (JSON.stringify(foundAuction.seller._id) === JSON.stringify(userId)) {
      throwError('You can not bid to your own auction!', 410)
    } else if (convertedBid < foundAuction.minValue) {
      throwError('Your bid must be bigger than minimum bid value!', 410)
    } else if (foundAuction.bidList.length !== 0 && foundAuction.bidList[0].bidValue >= convertedBid) {
      throwError('Your bid must be bigger than last bid!', 410)
    } else if (isNaN(convertedBid)) {
      throwError('Please enter a numeric value!', 410)
    }


    const foundUser = await User.findById(userId)
    const createdBid = new Bid({
      bidValue: convertedBid,
      bidder: foundUser._id,
      biddedTo: foundAuction._id
    })

    foundAuction.bidList.unshift(createdBid._id)

    await createdBid.save()
    await foundAuction.save()

    if (!BidList) {
      const createdBidRoom = new AuctionBid({
        auctionId: auctionId
      })

      createdBidRoom.bidList.unshift(createdBid)
      await createdBidRoom.save()
      return res.status(200).json({ message: 'Your bid settled successfully.' })
    }

    BidList.bidList.unshift(createdBid)
    foundUser.eventHistory.unshift({ event: "Bidded to an Auction", interactionId: foundAuction })
    await foundUser.save()
    await BidList.save()

    return res.status(200).json({ message: 'Your bid settled successfully.' })

  } catch (err) {
    next(err)
  }
}

exports.buyoutAuction = async (req, res, next) => {
  const { buyout } = req.body
  const convertedBuyout = +buyout
  const auctionId = req.params.auctionId
  const userId = req.session.userInfo.id
  const todaysTimestamp = dayjs(new Date()).startOf("day").unix()

  try {
    const foundAuction = await Auction.findById(auctionId).populate({ path: "bidList" }).populate({ path: "seller" })
    const foundUser = await User.findById({ userId })
    /*     const foundUser = await User.findById(userId)
    
        const createdBid = new Bid({
          bidValue: convertedBuyout,
          bidder: foundUser._id,
          biddedTo: foundAuction._id
        }) */

    if (foundAuction.isSold) {
      throwError('Auction is already closed!', 410)
    } else if (foundAuction.deadline < todaysTimestamp) {
      throwError('Auction met the deadline!', 410)
    } else if (JSON.stringify(foundAuction.seller._id) === JSON.stringify(userId)) {
      throwError('You can not buy your own auction!', 410)
    } else if (convertedBuyout < foundAuction.buyout) {
      throwError('Your buyout must be bigger than minimum buyout value of the auction!', 410)
    } else if (foundAuction.bidList.length !== 0 && foundAuction.bidList[0].bidValue >= convertedBuyout) {
      throwError('Your buyout must be bigger than minimum bid value of the auction!', 410)
    } else if (isNaN(convertedBuyout)) {
      throwError('Please enter a numeric value!', 410)
    }

    foundAuction.isSold = true
    foundUser.eventHistory.unshift({ event: "Bought an Auction!", interactionId: foundAuction })
    await foundUser.save()
    await foundAuction.save()
    return res.status(200).json({ message: 'Your buyout ended successfully.' })

  } catch (err) {
    next(err)
  }
}

exports.sendMessage = async (req, res, next) => {
  const { message } = req.body
  const auctionId = req.params.auctionId
  const userId = req.session.userInfo.id
  const todaysTimestamp = dayjs(new Date()).startOf("day").unix()

  try {
    const foundAuction = await Auction.findById(auctionId)
    const foundChatRoom = await MessageRoom.findOne({ auctionRoom: auctionId })
    const foundUser = await User.findOne(userId)


    if (!foundChatRoom) {
      const createdChat = new MessageRoom({
        auctionRoom: auctionId,
      })

      createdChat.messages.push({ message: message, sender: userId })
      await createdChat.save()
      return res.status(200).json({ message: 'Message sent' })
    }

    if (foundAuction.isSold) {
      throwError('Auction is already closed!', 410)
    } else if (foundAuction.deadline < todaysTimestamp) {
      throwError('Auction met the deadline!', 410)
    }

    foundChatRoom.messages.push({ message: message, sender: userId })
    foundUser.eventHistory.unshift({ event: "Sent a Message to an Auction!", interactionId: foundAuction })
    await foundUser.save()
    await foundChatRoom.save()
    return res.status(200).json({ message: 'Message sent' })

  } catch (err) {
    next(err)
  }
}

// USER FOLLOWS AND TRACKINGS

exports.trackAuction = async (req, res, next) => {
  const userId = req.session.userInfo.id
  const auctionId = req.params.auctionId

  const todaysDate = new Date()
  const converted = dayjs(todaysDate).startOf("day")
  const todaysTimestamp = converted.unix()


  try {
    const foundAuction = await Auction.findById(auctionId)
    const foundUser = await User.findById(userId)

    if (foundAuction.deadline < todaysTimestamp) {
      throwError('Auction is already finished.', 410)
    }

    const auctionCheck = foundUser.trackingAuctions.some((auction) => JSON.stringify(foundAuction._id) === JSON.stringify(auction))

    if (auctionCheck) {
      const chosenIndex = foundUser.trackingAuctions.findIndex((auction) => foundAuction === auction)
      foundUser.trackingAuctions.splice(chosenIndex, 1)

      const userIndex = foundAuction.followers.findIndex((user) => user === foundUser)
      foundAuction.followers.splice(userIndex, 1)
      await foundUser.save()
      await foundAuction.save()
      return res.status(200).json({ message: 'You are no longer following this auction.' })
    }

    foundUser.trackingAuctions.push(foundAuction)
    foundUser.eventHistory.unshift({ event: "Tracked an Auction!", interactionId: foundAuction })
    foundAuction.followers.push(foundUser)

    await foundUser.save()
    await foundAuction.save()

    return res.status(200).json({ message: 'You are now following this auction.' })

  } catch (err) {
    next(err)
  }

}

exports.followUser = async (req, res, next) => {
  const userId = req.params.userId
  const personWhoFollowsId = req.session.userInfo.id

  try {
    const followedUser = await User.findById(userId)
    const personWhoFollows = await User.findById(personWhoFollowsId)

    const followCheck = followedUser.followers.some((user) => JSON.stringify(personWhoFollows._id) === JSON.stringify(user))

    if (followCheck) {
      const chosenIndex = followedUser.followers.findIndex((user) => personWhoFollows === user)
      followedUser.followers.splice(chosenIndex, 1)

      const userIndex = personWhoFollows.following.findIndex((user) => user === followedUser)
      personWhoFollows.following.splice(userIndex, 1)
      await personWhoFollows.save()
      await followedUser.save()
      return res.status(200).json({ message: 'You are no longer following this auction.' })
    }

    followedUser.followers.push(personWhoFollows._id)
    personWhoFollows.following.push(followedUser._id)
    await followedUser.save()
    await personWhoFollows.save()

    return res.status(200).json({ message: 'You are now following this auction.' })

  } catch (err) {
    next(err)
  }

}

exports.trackingAuctions = async (req, res, next) => {
  const userId = req.session.userInfo.id
  const todaysTimestamp = dayjs(new Date()).unix()

  try {
    const foundAuctions = await User.findById(userId).populate({ path: 'trackingAuctions', select: { _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, }, match: { deadline: { $gt: todaysTimestamp } }, populate: { path: 'item' } })
    if (foundAuctions.trackingAuctions.length === 0) {
      throwError('You are not tracking any active auctions!', 404)
    }

    res.status(200).json({ tracking: foundAuctions.trackingAuctions })
  } catch (err) {
    next(err)
  }
}

exports.myActiveAuctions = async (req, res, next) => {
  const userId = req.session.userInfo.id
  const todaysTimestamp = dayjs(new Date()).unix()

  try {

    const foundAuctions = await User.findById(userId).populate({ path: 'auctions', select: { _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, }, match: { deadline: { $gt: todaysTimestamp } }, populate: { path: 'item' } })


    if (foundAuctions.auctions.length === 0) {
      throwError('You do not have any active listings!', 404)
    }

    return res.status(200).json({ foundAuctions: foundAuctions.auctions })
  } catch (err) {
    next(err)
  }
}

exports.fetchMyInbox = async (req, res, next) => {
  const userId = req.session.userInfo.id

  try {
    const foundInbox = await User.findById(userId).populate({ path: 'inbox', populate: { path: "sender", select: { name: 1, surname: 1, _id: 1 } } })

    if (foundInbox.length === 0) {
      throwError('Account or Inbox could not found!!', 404)
    }

    return res.status(200).json({ fetchedInbox: foundInbox.inbox })
  } catch (err) {
    next(err)
  }

}

exports.fetchMyHistory = async (req, res, next) => {
  const userId = req.session.userInfo.id
  try {
    const foundEventHistoryList = await User.findById(userId).populate({ path: "eventHistory", select: { createdAt: 1, _id: 0 }, populate: { path: "interactionId", select: { _id: 1 } } }).sort({ createdAt: -1 })

    return res.status(200).json({ fetchedEventHistory: foundEventHistoryList.eventHistory.length > 0 ? foundEventHistoryList.eventHistory : [] })
  } catch (err) {
    next(err)
  }
}

exports.sendMessageToUsersInbox = async (req, res, next) => {
  const { title, message } = req.body
  const userId = req.params.userId
  const senderId = req.session.userInfo.id
  const errors = validationResult(req)
  try {
    const recieverUser = await User.findOne({ _id: userId })

    if (!errors.isEmpty) {
      throwError(errors.array()[0].msg, 410)
    } else if (!recieverUser) {
      throwError('User could not found!', 404)
    }

    const sentMessage = new PrivateMessage({
      title,
      message,
      sender: senderId,
      reciever: recieverUser._id
    })

    await sentMessage.save()

    recieverUser.inbox.unshift(sentMessage._id)
    await recieverUser.save()

    return res.status(200).json({ message: "Message Sent Successfully!" })

  } catch (err) {
    next(err)
  }
}

// TRADE OFFER SYSTEM

exports.fetchMyItemsForOffer = async (req, res, next) => {
  const userId = req.session.userInfo.id
  try {
    const foundItems = await User.findById(userId).select({ items: 1 }).populate({ path: "items", match: { isListed: false }, select: { title: 1, _id: 1, imageList: 1 } })


    return res.status(200).json({ myItemsForOffer: foundItems })

  } catch (err) {
    next(err)
  }
}

exports.makeOffer = async (req, res, next) => {
  const { offer } = req.body
  const receiverId = req.params.receiverId
  const senderId = req.session.userInfo.id

  try {

    if (offer.userItems.length === 0 && offer.myItems.length === 0) {
      throwError("You can not send an empty offer!", 410)
    }

    const offerer = await User.findOne({ _id: senderId })
    const receiver = await User.findOne({ _id: receiverId })

    const alreadyListed = offer.userItems.some((item) => item.isListed === true)

    if (alreadyListed) {
      throwError("Item is already listed!", 410)
    }

    const createdOffer = new Offer({
      offerer: senderId,
      receiver: receiverId,
      offer: {
        offeredItems: offer.myItems,
        wantedItems: offer.userItems
      }
    })

    await createdOffer.save()
    offerer.sentOffers.unshift(createdOffer)
    receiver.receivedOffers.unshift(createdOffer)
    await offerer.save()
    await receiver.save()

    return res.status(200).json({ message: 'Offer sent successfully!' })

  } catch (err) {
    next(err)
  }

}

exports.fetchOffers = async (req, res, next) => {
  const userId = req.session.userInfo.id

  try {
    const foundUser = await User.findById(userId).select({ receivedOffers: 1, sentOffers: 1 })
      .populate({
        path: "receivedOffers", populate: {
          path: "offer", populate: { path: "offeredItems", select: { title: 1, imageList: 1, offerActive: 1, offerAccepted: 1 } },
        }
      }).populate({
        path: "receivedOffers", populate: {
          path: "offer", populate: { path: "wantedItems", select: { title: 1, imageList: 1, offerActive: 1, offerAccepted: 1 } },
        }
      })
      .populate({
        path: "receivedOffers", populate: {
          path: "offerer", select: { name: 1, surname: 1 }
        }
      })
      .populate({
        path: "sentOffers", populate: {
          path: "offer", populate: { path: "offeredItems", select: { title: 1, imageList: 1, offerActive: 1, offerAccepted: 1 } }
        }
      }).populate({
        path: "sentOffers", populate: {
          path: "offer", populate: { path: "wantedItems", select: { title: 1, imageList: 1, offerActive: 1, offerAccepted: 1 } }
        }
      }).populate({
        path: "sentOffers", populate: {
          path: "receiver", select: { name: 1, surname: 1 }
        }
      })

    if (!foundUser) {
      throwError("User could not found!", 404)
    }

    return res.status(200).json({ receivedOffers: foundUser.receivedOffers, sentOffers: foundUser.sentOffers })

  } catch (err) {
    next(err)
  }
}

exports.selectOption = async (req, res, next) => {

  const offerId = req.params.offerId
  const option = req.query.selectedOption

  try {
    const foundOffer = await Offer.findOne({ _id: offerId })

    if (!foundOffer) {
      throwError('Offer could not found!', 404)
    } else if (!foundOffer.offerActive) {
      throwError("You already made your choice!", 410)
    }

    if (option === "accept") {
      foundOffer.offerActive = false
      foundOffer.offerAccepted = true
      await foundOffer.save()
      return res.status(200).json({ message: "You accepted the offer!" })
    } else if (option === "decline") {
      foundOffer.offerActive = false
      await foundOffer.save()
      return res.status(200).json({ message: "You declined the offer!" })
    }
  } catch (err) {
    next(err)
  }

}

