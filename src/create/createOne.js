/*=============================================
=            importing dependencies            =
=============================================*/
const expressAsyncHandler = require('express-async-handler')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const { setDoc } = require('setdoc')
const getValue = require('../utils/getValue')
const { sharedDefaultOptions } = require('../utils/defaultOptions')
/*=====  End of importing dependencies  ======*/

const createOne = (Model, dataObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param dataObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const dataObjValue = await getValue(dataObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      ...sharedDefaultOptions,
      queryOptions: {},
      statusCode: 201,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    let doc = await setDoc(async () => {
      const query = ModelValue.create(dataObjValue)
      return (await chosenOptions.pre(query)) || query
    })
    doc = (await chosenOptions.post(doc)) || doc
    // sending the response ---------------
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = createOne
