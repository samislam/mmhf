/*=============================================
=            importing dependencies            =
=============================================*/
const expressAsyncHandler = require('express-async-handler')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const { setDoc } = require('setdoc')
const getValue = require('../../utils/getValue')
const archiveDoc = require('../../utils/archiveDoc')
const { sharedDefaultOptions, oneStuffDefaultOptions } = require('../../utils/defaultOptions')
const NotFoundError = require('../../utils/NotFoundError')
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
      uniqueId: undefined,
      uniqueFields: undefined,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    // querying the database ---------------
    let doc = setDoc(
      async () => {
        // running the pre-query hook ---------------
        const query = archiveDoc(ModelValue, filterObjValue, {
          queryOptions: chosenOptions.queryOptions,
          uniqueId: chosenOptions.uniqueId,
          uniqueFields: chosenOptions.uniqueFields,
        })
        return await chosenOptions.pre(query)
      },
      {
        notFoundErr: false,
      }
    )
    if (!doc && chosenOptions.notFoundErr) {
      if (chosenOptions.handleNotFoundErr) return sendRes(chosenOptions.notFoundStatusCode, res, { message: chosenOptions.notFoundMsg })
      else return next(new NotFoundError(chosenOptions.notFoundMsg, chosenOptions.notFoundStatusCode))
    }
    // running the post-query hook ---------------
    doc = await chosenOptions.post(doc)
    // sending the response ---------------
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = archiveOne
