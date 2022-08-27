/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const { switcher } = require('@samislam/switcher')
const getValue = require('../utils/getValue')
const { sendDocMw } = require('setdoc')
const getChosenOptions = require('../utils/getChosenOptions')
/*=====  End of importing dependencies  ======*/

const createOne = (Model, dataObj, options) =>
  // @param Model: MongooseModel | function
  // @param dataObj: object | function
  // @param options: object | function
  switcher(async (req, res, next) => {
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req, res, next)
    const dataObjValue = await getValue(dataObj, req, res, next)
    const optionsValue = await getValue(options, req, res, next)
    const chosenOptions = getChosenOptions(
      {
        statusCode: 201,
        queryOptions: undefined,
        resBody: (doc) => ({ data: doc[0] }),
      },
      optionsValue
    )
    return sendDocMw(() => ModelValue.create([dataObjValue], chosenOptions.queryOptions), _.omit(chosenOptions, ['queryOptions']))
  })

/*----------  end of code, exporting  ----------*/

module.exports = createOne

// options
// statusCode: 201,
// resBody: undefined,
// sendRes: undefined,
// callNext: undefined,
// queryOptions: undefined,
