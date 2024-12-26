const { validationResult } = require('express-validator')
const { throwError } = require('../utils/throwError')

// MODELS
const User = require('../models/userModel')
const Item = require('../models/itemModel')


exports.createItem = async (req, res, next) => {
  const { title, minValue, buyout, lastDate, category, subcategory } = req.body
  const convertedMinValue = +minValue
  const convertedBuyout = +buyout
  const convertedLastDate = +lastDate
  const errors = validationResult(req)

  const ownerId = req.session._id

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
      lastDate: convertedLastDate,
      category,
      subCategory: subcategory,
      owner: ownerId
    })

    for (const image of fileList) {
      newItem.imageList.push(image.path)
    }

    await newItem.save()

    return res.status(201).json({ message: 'Item added to inventory successfully!' })

  } catch (err) {
    next(err)
  }

}