/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const archiveDoc = require('../utils/archiveDoc')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const archiveOneById = (Model, id, options) =>
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
        sendArchivedDoc: false,
        queryOptions: undefined,
        chain: (query) => query,
      },
      optionsValue
    )
    const defaultResBody = {
      resBody: (doc) => (chosenOptions.sendArchivedDoc ? { data: doc } : { data: null }),
    }
    return sendDocMw(() => {
      let query = archiveDoc(ModelValue, { _id: idValue }, _.pick(chosenOptions, ['queryOptions', 'uniqueId', 'uniqueFields']))
      query = chosenOptions.chain(query)
      return query
    }, _.omit(Object.assign(defaultResBody, chosenOptions), ['queryOptions', 'sendArchivedDoc', 'uniqueId', 'uniqueFields']))
  })

/*----------  end of code, exporting  ----------*/

module.exports = archiveOneById

// options
// statusCode: 204,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// uniqueId: undefined,
// sendArchivedDoc: false,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// uniqueFields: undefined,
// queryOptions: undefined,
// chain: (query) => query,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
