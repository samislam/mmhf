/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { sendDocMw } = require('setdoc')
const getValue = require('../utils/getValue')
const switcher = require('@samislam/switcher')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const getOne = (Model, filterObj, options) =>
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
        statusCode: 200,
        projection: null,
        queryOptions: undefined,
      },
      optionsValue
    )
    return sendDocMw(
      () => ModelValue.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions),
      _.omit(chosenOptions, ['projection', 'queryOptions'])
    )
  })

/*----------  end of code, exporting  ----------*/
module.exports = getOne

// options
// pre: undefined,
// post: undefined,
// statusCode: 200,
// projection: null,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// notFoundMsg: undefined,
// notFoundErr: undefined,
// queryOptions: undefined,
// handleNotFoundErr: undefined,
// notFoundStatusCode: undefined,
