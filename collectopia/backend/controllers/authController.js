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

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  const errors = validationResult(req)

  try {
    const foundUser = await User.findOne({ email: email }).populate({ path: "inbox" }).populate({ path: "notifications" })
    const nonReadMessageCount = foundUser.inbox.filter((message) => message.isRead === false)
    const nonReadNotificationCount = foundUser.notifications.filter((notification) => notification.isRead === false)



    if (!errors.isEmpty()) {
      const errorObject = errors.array()[0].msg
      throw errorObject
    }


    if (!foundUser) {
      throwError('User can not found!', 404)
    }

    const passwordMatches = await bcrypt.compare(password, foundUser.password)

    if (!passwordMatches) {
      throwError('Username or Password is invalid!', 404)
    }

    req.session.userInfo = { id: foundUser._id, name: foundUser.name, interests: foundUser.interests }

    return res.status(200).json({ message: 'Successfully logged in!', userInfo: req.session.userInfo, inboxCount: nonReadMessageCount.length, notifyCount: nonReadNotificationCount.length })

  } catch (err) {
    next(err)
  }

}

exports.logout = async (req, res, next) => {
  await req.session.destroy(() => {
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out!' })
  })
}

exports.authCheck = async (req, res, next) => {
  try {
    const usersSession = await req.session.userInfo

    const foundUser = await User.findById(req.session.userInfo.id).populate({ path: "inbox" }).populate({ path: "notifications" })
    const nonReadMessageCount = foundUser.inbox.filter((message) => message.isRead === false)
    const nonReadNotifyCount = foundUser.notifications.filter((notification) => notification.isRead === false)

    if (!usersSession) {
      const error = new Error('Please log in first!')
      error.statusCode = 404
      throw error
    }
    
    return res.status(200).json({ userInfo: req.session.userInfo, inboxCount: nonReadMessageCount.length, notifyCount: nonReadNotifyCount.length })
  } catch (err) {
    next(err)
  }
}