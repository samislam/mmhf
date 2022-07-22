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

const archiveOne = (Model, filterObj, options) =>
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
      ...oneStuffDefaultOptions,
      queryOptions: {},
      statusCode: 204,
      sendArchivedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await archiveDoc(ModelValue, filterObjValue, {
      ...chosenOptions.queryOptions,
      notFoundErr: false,
    })
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)

    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = archiveOne

// TODO
