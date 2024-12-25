// MODELS

const User = require('../models/userModel')

// UTILS
const { validationResult } = require('express-validator')
const { throwError } = require('../utils/throwError')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
  const { name, surname, email, password, interests } = req.body
  const parsedInterests = JSON.parse(interests)
  const errors = validationResult(req)

  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    } else if (parsedInterests.length === 0) {
      throwError('Please choose at least one topic', 410)
    }

    const alreadyExists = await User.findOne({ email: email })
    if (alreadyExists) {
      throwError('This account already exists!', 410)
    }

    const hashedPw = await bcrypt.hash(password, 12)

    const createdUser = new User({
      name,
      surname,
      email,
      password: hashedPw,
      interests: parsedInterests
    })

    await createdUser.save()
    res.status(201).json({ message: 'Account created successfully! Welcome!' })
  } catch (err) {
    next(err)
  }

}