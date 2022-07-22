/*=============================================
=            importing dependencies            =
=============================================*/
const expressAsyncHandler = require('express-async-handler')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const { setDoc } = require('setdoc')
const to = require('await-to-js').default
const getValue = require('../../utils/getValue')
const { sharedDefaultOptions, oneStuffDefaultOptions } = require('../../utils/defaultOptions')

/*=====  End of importing dependencies  ======*/

const updateOneWithSave = (Model, filterObj, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const filterObjValue = await getValue(filterObj, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      saveQueryOptions: {},
      callNext: false,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await ModelValue.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    const newDoc = await saveUpdate(doc, updateObjValue, chosenOptions.saveQueryOptions)
    sendRes(chosenOptions.statusCode, res, { data: newDoc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = updateOneWithSave
// TODO
