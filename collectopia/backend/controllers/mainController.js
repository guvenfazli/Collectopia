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
const Bid = require('../models/auctionModel')

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
    const foundUser = await User.findById(userId).select({ name: 1, surname: 1, interests: 1, createdAt: 1, _id: 1, items: 1, auctions: 1, followers: 1 }).populate({ path: 'items', select: { title: 1, minValue: 1, buyout: 1, category: 1, subCategory: 1, imageList: 1, createdAt: 1, tagList: 1, owner: 1, isListed: 1 } }).populate({ path: 'auctions', select: { _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, }, populate: { path: 'item' } })

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

  try {

    const foundItem = await Item.findOneAndDelete({ _id: itemId })
    const owner = await User.findById(foundItem.owner)
    const itemIndex = owner.items.findIndex((item) => item === foundItem)
    owner.items.splice(itemIndex, 1)
    await owner.save()

    if (foundItem.isListed) {
      const activeAuction = await Auction.findOneAndDelete({ item: foundItem._id })
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


  try {
    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    }

    if (isNaN(convertedBuyout) || isNaN(convertedMinValue)) {
      throwError('Please enter a numeric value!', 410)
    }

    if (convertedMinValue >= convertedBuyout) {
      throwError('Minimum Value can not be higher than buyout value!', 410)
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
    const fetchedAuctions = await Auction.find().populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })
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
    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp } }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, }).skip(page * limit).limit(limit)

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

    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp } }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })



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

    const fetchedAuctions = await Auction.find({ deadline: { $gt: todaysTimestamp } }).populate({ path: "item" }).select({ _id: 1, minValue: 1, buyout: 1, followers: 1, deadline: 1, createdAt: 1, })

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