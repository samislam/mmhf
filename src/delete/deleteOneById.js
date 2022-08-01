/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const deleteOneById = (Model, id, options) =>
  // @param Model: MongooseModel | function
  // @param id: ObjectId | string | function
  // @param options: object | function
  switcher(async (req) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const idValue = await getValue(id, req)
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
      let query = ModelValue.findByIdAndDelete(idValue, chosenOptions.queryOptions)
      query = chosenOptions.chain(query)
      return query
    }, _.omit(Object.assign(defaultResBody, chosenOptions), ['queryOptions', 'sendDeletedDoc']))
  })

/*----------  end of code, exporting  ----------*/
module.exports = deleteOneById

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
