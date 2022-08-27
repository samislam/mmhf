/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const getValue = require('../utils/getValue')
const { switcher } = require('@samislam/switcher')
const { sendDocMw } = require('setdoc')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const getOneById = (Model, id, options) =>
  // @param Model: MongooseModel | function
  // @param id: ObjectId | string | function
  // @param options: object | function
  switcher(async (req, res, next) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req, res, next)
    const idValue = await getValue(id, req, res, next)
    const optionsValue = await getValue(options, req, res, next)
    const chosenOptions = getChosenOptions(
      {
        statusCode: 200,
        projection: null,
        queryOptions: undefined,
        chain: (query) => query,
      },
      optionsValue
    )
    return sendDocMw(() => {
      let query = ModelValue.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions)
      query = chosenOptions.chain(query)
      return query
    }, _.omit(chosenOptions, ['projection', 'queryOptions']))
  })

/*----------  end of code, exporting  ----------*/

module.exports = getOneById

// options
// statusCode: 200,
// projection: null,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// queryOptions: undefined,
// chain: (query) => query,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
