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

    // querying the database ---------------
    let [err, doc] = await to(
      setDoc(
        async () => {
          // running the pre-query hook ---------------
          const query = archiveDoc(ModelValue, filterObjValue, {
            ...chosenOptions.queryOptions,
            notFoundErr: false,
          })
          return await chosenOptions.pre(query)
        },
        {
          notFoundErr: chosenOptions.notFoundErr,
          notFoundMsg: chosenOptions.notFoundMsg,
          notFoundStatusCode: chosenOptions.notFoundStatusCode,
        }
      )
    )
    // handling the not found logic ---------------
    if (err) {
      if (chosenOptions.notFoundErr && err.name === 'setDoc_notFound_error') return sendRes(err.statusCode, res, { message: err.message })
      else throw err
    }
    // running the post-query hook ---------------
    doc = await chosenOptions.post(doc)
    // sending the response ---------------
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/
module.exports = archiveOne

// TODO
