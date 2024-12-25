const { validationResult } = require('express-validator')


exports.register = (req, res, next) => {
  const { name, surname, email, password, interests } = req.body
  console.log(req.body)
  // Array must be Parsed

}