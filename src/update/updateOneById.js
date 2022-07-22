/*=============================================
=            importing dependencies            =
=============================================*/
const expressAsyncHandler = require('express-async-handler')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const { setDoc } = require('setdoc')
const getValue = require('../../utils/getValue')
const { sharedDefaultOptions, oneStuffDefaultOptions } = require('../../utils/defaultOptions')
/*=====  End of importing dependencies  ======*/

const updateOneById = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: ObjectId | string | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const idValue = await getValue(id, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      ...sharedDefaultOptions,
      ...oneStuffDefaultOptions,
      queryOptions: { new: true, runValidators: true },
      statusCode: 200,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    // querying the database ---------------
    let doc = await setDoc(
      async () => {
        // running the pre-query hook ---------------
        const query = ModelValue.findByIdAndUpdate(idValue, updateObjValue, chosenOptions.queryOptions)
        return await chosenOptions.pre(query)
      },
      {
        notFoundErr: chosenOptions.notFoundErr,
        notFoundMsg: chosenOptions.notFoundMsg,
        notFoundStatusCode: chosenOptions.notFoundStatusCode,
      }
    )
    // running the post-query hook ---------------
    doc = await chosenOptions.post(doc)
    // sending the response ---------------
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/

module.exports = updateOneById