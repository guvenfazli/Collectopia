const { ObjectId } = require('mongodb')

const { validationResult } = require('express-validator')
const { throwError } = require('../utils/throwError')

// MODELS
const User = require('../models/userModel')
const Item = require('../models/itemModel')

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

    const newItem = new Item({
      title,
      minValue: convertedMinValue,
      buyout: convertedBuyout,
      tagList: convertedTagList,
      category,
      subCategory: subcategory,
      owner: ownerId
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

// USERS PROFILE
exports.fetchUser = async (req, res, next) => {
  const userId = req.params.userId

  try {
    const foundUser = await User.findById(userId).select({ name: 1, surname: 1, interests: 1, createdAt: 1, _id: 1, items: 1 }).populate({ path: 'items', select: { title: 1, minValue: 1, buyout: 1, category: 1, subCategory: 1, imageList: 1, createdAt: 1 } })

    if (foundUser.length === 0) {
      throwError('User could not found!', 404)
    }
    return res.status(200).json({ foundUser: foundUser })

  } catch (err) {
    next(err)
  }


}
