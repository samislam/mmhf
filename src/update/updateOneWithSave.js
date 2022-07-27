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

const updateOneWithSave = (Model, filterObj, updateObj, options) =>
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
        queryOptions: undefined,
        saveQueryOptions: undefined,
        statusCode: 200,
      },
      optionsValue
    )
    return [
      setDocMw(
        () => ModelValue.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions),
        _.omit(['queryOptions', 'saveQueryOptions', 'post', 'callNext'])
      ),
      sendDocMw(
        () => saveUpdate(req.mainDoc, updateObjValue, chosenOptions.saveQueryOptions),
        _.omit(['queryOptions', 'saveQueryOptions', 'pre'])
      ),
    ]
  })

/*----------  end of code, exporting  ----------*/

module.exports = updateOneWithSave

// options
// pre: undefined,
// post: undefined,
// statusCode: 200,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// saveQueryOptions: undefined
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
// queryOptions: { new: true, runValidators: true },
