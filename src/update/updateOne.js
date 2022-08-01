/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('setdoc/src/utils/getChosenOptions')

/*=====  End of importing dependencies  ======*/

const updateOne = (Model, filterObj, updateObj, options) =>
  // @param Model: MongooseModel | function
  // @param filterObj: object | function
  // @param updateObj: object | function
  // @param options: object | function
  switcher(async (req) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const filterObjValue = await getValue(filterObj, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    const chosenOptions = getChosenOptions(
      {
        queryOptions: { new: true, runValidators: true },
        statusCode: 200,
        chain: (query) => query,
      },
      optionsValue
    )
    return sendDocMw(() => {
      let query = ModelValue.findOneAndUpdate(filterObjValue, updateObjValue, chosenOptions.queryOptions)
      query = chosenOptions.chain(query)
      return query
    }, _.omit(chosenOptions, ['queryOptions']))
  })

/*----------  end of code, exporting  ----------*/

module.exports = updateOne

// options
// statusCode: 200,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// chain: (query) => query,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
// queryOptions: { new: true, runValidators: true },
