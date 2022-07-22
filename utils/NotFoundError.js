class NotFoundError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = 'factoryNotFoundError'
    this.statusCode = statusCode
    this.name = errName

    Error.captureStackTrace(this, this.constructor)
  }
}

/*----------  end of code, exporting  ----------*/

module.exports = NotFoundError
