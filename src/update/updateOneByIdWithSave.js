/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { setDocMw, sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const saveUpdate = require('../utils/saveUpdate')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('setdoc/src/utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const updateOneByIdWithSave = (Model, id, updateObj, options) =>
  // @param Model: MongooseModel | function
  // @param id: object | function
  // @param updateObj: object | function
  // @param options: object | function
  switcher(async (req, res, next) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req, res, next)
    const idValue = await getValue(id, req, res, next)
    const updateObjValue = await getValue(updateObj, req, res, next)
    const optionsValue = await getValue(options, req, res, next)
    const chosenOptions = getChosenOptions(
      {
        statusCode: 200,
        queryOptions: undefined,
        saveQueryOptions: undefined,
        chain: (query) => query,
      },
      optionsValue
    )

    return sendDocMw(() => {
      let query = ModelValue.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions).transform(async function (doc) {
        if (!doc) return
        const updatedDoc = await saveUpdate(doc, updateObjValue, chosenOptions.saveQueryOptions)
        return updatedDoc
      })
      query = chosenOptions.chain(query)
      return query
    }, _.omit(chosenOptions, ['queryOptions', 'saveQueryOptions']))
  })

/*----------  end of code exporting  ----------*/

module.exports = updateOneByIdWithSave

// options
// statusCode: 200,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// chain: (query) => query,
// saveQueryOptions: undefined
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
// queryOptions: { new: true, runValidators: true },
