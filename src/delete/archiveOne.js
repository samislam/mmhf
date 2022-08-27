/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const archiveDoc = require('../utils/archiveDoc')
const { switcher } = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const archiveOne = (Model, filterObj, options) =>
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
      let query = archiveDoc(ModelValue, filterObjValue, _.pick(chosenOptions, ['queryOptions', 'uniqueId', 'uniqueFields']))
      query = chosenOptions.chain(query)
      return query
    }, _.omit(Object.assign(defaultResBody, chosenOptions), ['queryOptions', 'sendArchivedDoc', 'uniqueId', 'uniqueFields']))
  })

/*----------  end of code, exporting  ----------*/

module.exports = archiveOne

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
