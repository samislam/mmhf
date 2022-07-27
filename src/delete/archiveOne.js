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

const archiveOne = (Model, filterObj, options) =>
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
        sendArchivedDoc: false,
        queryOptions: undefined,
        post(doc) {
          return this.sendArchivedDoc ? doc : null
        },
      },
      optionsValue
    )
    return sendDocMw(
      () => archiveDoc(ModelValue, filterObjValue, _.pick(chosenOptions, ['queryOptions', 'uniqueId', 'uniqueFields'])),
      _.omit(chosenOptions, ['queryOptions', 'sendArchivedDoc', 'uniqueId', 'uniqueFields'])
    )
  })

/*----------  end of code, exporting  ----------*/

module.exports = archiveOne

// options
// pre: undefined,
// post(doc) {
//   return this.sendArchivedDoc ? doc : null
// },
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
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
