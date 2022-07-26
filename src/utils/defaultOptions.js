const sharedDefaultOptions = {
  callNext: false,
  sendRes: {},
  pre: (query) => query,
  post: (doc) => doc,
}

const oneStuffDefaultOptions = {
  notFoundMsg: 'The resource you requested was not found',
  notFoundStatusCode: 404,
  notFoundErr: true,
  handleNotFoundErr: true,
}

/*----------  end of code, exporting  ----------*/

module.exports = {
  sharedDefaultOptions,
  oneStuffDefaultOptions,
}
