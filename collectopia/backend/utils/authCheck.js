const { throwError } = require('./throwError')

exports.authCheck = async (req, res, next) => {
  try {
    if (req.session && req.session.userInfo.id) {
      next()
    } else {
      throwError("Please Login First!", 410)
    }
  } catch (err) {
    next(err)
  }
}