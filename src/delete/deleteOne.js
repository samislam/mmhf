/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const deleteOne = (Model, filterObj, options) =>
  // @param Model: MongooseModel | function
  // @param filterObj: object | function
  // @param options: object | function
  switcher(async (req) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    const chosenOptions = getChosenOptions(
      {
        statusCode: 204,
        queryOptions: undefined,
        sendDeletedDoc: false,
        chain: (query) => query,
      },
      optionsValue
    )
    const defaultResBody = {
      resBody: (doc) => (chosenOptions.sendDeletedDoc ? { data: doc } : { data: null }),
    }
    return sendDocMw(() => {
      let query = ModelValue.findOneAndDelete(filterObjValue, chosenOptions.queryOptions)
      query = chosenOptions.chain(query)
      return query
    }, _.omit(Object.assign(defaultResBody, chosenOptions), ['queryOptions', 'sendDeletedDoc']))
  })

/*----------  end of code, exporting  ----------*/
module.exports = deleteOne

// options
// statusCode: 204,
// sendRes: undefined,
// resBody: undefined,
// callNext: undefined,
// sendDeletedDoc: false,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// chain: (query) => query,
// queryOptions: undefined,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
