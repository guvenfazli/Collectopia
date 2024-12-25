const { validationResult } = require('express-validator')
const { throwError } = require('../utils/throwError')

exports.register = (req, res, next) => {
  const { name, surname, email, password, interests } = req.body
  const parsedInterests = JSON.parse(interests)
  const errors = validationResult(req)

  try {
    if (name.length <= 5) {
      throwError(errors.array()[0].msg, 410)
    } else if (parsedInterests.length === 0) {
      throwError('Please choose at least one topic', 410)
    }

  } catch (err) {
    next(err)
  }


  // Array must be Parsed

}