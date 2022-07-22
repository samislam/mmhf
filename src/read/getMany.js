/*=============================================
=            importing dependencies            =
=============================================*/
const expressAsyncHandler = require('express-async-handler')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const { setDoc } = require('setdoc')
const getValue = require('../../utils/getValue')
const { sharedDefaultOptions } = require('../../utils/defaultOptions')
/*=====  End of importing dependencies  ======*/

const getMany = (Model, filterObj = {}, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      ...sharedDefaultOptions,
      queryOptions: {},
      statusCode: 200,
      projection: null,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    // querying the database ---------------
    let docs = await setDoc(async () => {
      // running the pre-query hook ---------------
      const query = ModelValue.find(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
      return await chosenOptions.pre(query)
    })
    // running the post-query hook ---------------
    docs = await chosenOptions.post(docs)
    // sending the response ---------------
    sendRes(chosenOptions.statusCode, res, { $$data: docs }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = getMany
