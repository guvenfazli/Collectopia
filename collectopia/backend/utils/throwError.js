exports.throwError = (errorMsg, statusCode) => {
  const error = new Error(errorMsg)
  error.statusCode = statusCode
  throw error
}