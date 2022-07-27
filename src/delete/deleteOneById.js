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
        post(doc) {
          return this.sendArchivedDoc ? doc : null
        },
      },
      optionsValue
    )
    return sendDocMw(
      () => ModelValue.findByIdAndDelete(idValue, chosenOptions.queryOptions),
      _.omit(chosenOptions, ['queryOptions', 'sendDeletedDoc'])
    )
  })

/*----------  end of code, exporting  ----------*/
module.exports = deleteOneById

// options
// pre: undefined,
// post(doc) {
//   return this.sendArchivedDoc ? doc : null
// },
// statusCode: 204,
// sendDeletedDoc: false,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// queryOptions: undefined,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
