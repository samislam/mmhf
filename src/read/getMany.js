/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const { switcher } = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const getMany = (Model, filterObj = {}, options) =>
  // @param Model: MongooseModel | function
  // @param filterObj: object | function
  // @param options: object | function
  switcher(async (req, res, next) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req, res, next)
    const filterObjValue = await getValue(filterObj, req, res, next)
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
      let query = ModelValue.find(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
      query = chosenOptions.chain(query)
      return query
    }, _.omit(chosenOptions, ['projection', 'queryOptions']))
  })

/*----------  end of code, exporting  ----------*/
module.exports = getMany

// options
// statusCode: 200,
// projection: null,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// queryOptions: undefined,
// chain: (query) => query,
